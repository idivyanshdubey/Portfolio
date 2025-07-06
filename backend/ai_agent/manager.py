from typing import Dict, Optional
from datetime import datetime, timedelta
import asyncio
from .agent import AIAgent

class AgentManager:
    def __init__(self):
        self.agents: Dict[str, AIAgent] = {}
        self.session_agents: Dict[str, str] = {}  # session_id -> agent_id
        self.last_activity: Dict[str, datetime] = {}
        
        # Create default agent
        self.default_agent = AIAgent("Jarvis")
        self.agents["default"] = self.default_agent
    
    def get_or_create_agent(self, session_id: str) -> AIAgent:
        """Get existing agent for session or create a new one"""
        if session_id in self.session_agents:
            agent_id = self.session_agents[session_id]
            if agent_id in self.agents:
                self.last_activity[session_id] = datetime.now()
                return self.agents[agent_id]
        
        # Create new agent for session
        agent_id = f"agent_{session_id}_{datetime.now().timestamp()}"
        agent = AIAgent(f"Jarvis-{session_id[:8]}")
        self.agents[agent_id] = agent
        self.session_agents[session_id] = agent_id
        self.last_activity[session_id] = datetime.now()
        
        return agent
    
    def get_agent_status(self, session_id: str) -> Dict:
        """Get agent status for a session"""
        agent = self.get_or_create_agent(session_id)
        status = agent.get_agent_status()
        status["session_id"] = session_id
        status["last_activity"] = self.last_activity.get(session_id, datetime.now())
        return status
    
    def cleanup_inactive_agents(self, max_age_hours: int = 24):
        """Clean up agents that haven't been active for a while"""
        cutoff_time = datetime.now() - timedelta(hours=max_age_hours)
        sessions_to_remove = []
        
        for session_id, last_activity in self.last_activity.items():
            if last_activity < cutoff_time:
                sessions_to_remove.append(session_id)
        
        for session_id in sessions_to_remove:
            if session_id in self.session_agents:
                agent_id = self.session_agents[session_id]
                if agent_id in self.agents and agent_id != "default":
                    del self.agents[agent_id]
                del self.session_agents[session_id]
            del self.last_activity[session_id]
    
    def get_all_agents_status(self) -> Dict:
        """Get status of all agents"""
        return {
            "total_agents": len(self.agents),
            "active_sessions": len(self.session_agents),
            "agents": {agent_id: agent.get_agent_status() for agent_id, agent in self.agents.items()}
        }

# Global agent manager instance
agent_manager = AgentManager() 