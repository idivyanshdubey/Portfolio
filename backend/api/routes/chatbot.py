from fastapi import APIRouter, HTTPException
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime
import json
import re
import sys
import os

# Add the parent directory to the path to import the ai_agent module
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))

from ai_agent.manager import agent_manager
from ai_agent.tools import execute_tool, get_available_tools
from ai_agent.ai_integration import get_ai_integration

router = APIRouter()

# Pydantic models
class ChatMessage(BaseModel):
    message: str
    user_id: Optional[str] = None
    session_id: Optional[str] = None

class ChatResponse(BaseModel):
    message: str
    response: str
    timestamp: datetime
    confidence: float
    suggestions: List[str] = []

class ChatSession(BaseModel):
    session_id: str
    user_id: Optional[str]
    messages: List[dict]
    created_at: datetime

# Knowledge base for the chatbot
KNOWLEDGE_BASE = {
    "portfolio": {
        "keywords": ["portfolio", "projects", "work", "experience", "skills"],
        "responses": [
            "I'm an AI portfolio assistant! I can help you explore my creator's data science projects, AI demos, and blog posts. What would you like to know?",
            "My creator has built several interesting projects including house price prediction models, sentiment analysis APIs, and data visualization dashboards. Which area interests you?",
            "You can explore projects in machine learning, NLP, computer vision, and data analysis. I can also help you try out live AI demos!"
        ]
    },
    "projects": {
        "keywords": ["project", "house price", "sentiment", "visualization", "dashboard"],
        "responses": [
            "Here are some key projects:\n• House Price Prediction Model (92% accuracy)\n• Sentiment Analysis API (Real-time NLP)\n• Data Visualization Dashboard (Interactive charts)\n\nWould you like details on any specific project?",
            "The projects showcase skills in Python, scikit-learn, FastAPI, React, and various data science libraries. Which technology stack interests you?",
            "You can view detailed project descriptions, technologies used, and even try live demos. What type of project would you like to explore?"
        ]
    },
    "demos": {
        "keywords": ["demo", "try", "test", "sentiment", "visualization", "image", "classification"],
        "responses": [
            "Great! You can try these live AI demos:\n• Sentiment Analysis: Analyze text sentiment\n• Data Visualization: Create interactive charts\n• Image Classification: Analyze uploaded images\n\nWhich demo would you like to try?",
            "The demos are fully functional and showcase real AI/ML capabilities. You can upload your own data or use sample data provided.",
            "Each demo demonstrates different aspects of AI and data science. The sentiment analysis uses NLP, visualization uses plotly, and image classification uses computer vision techniques."
        ]
    },
    "skills": {
        "keywords": ["skill", "technology", "python", "machine learning", "ai", "data science"],
        "responses": [
            "My creator specializes in:\n• Python (FastAPI, Flask, Django)\n• Machine Learning (scikit-learn, TensorFlow)\n• Data Science (pandas, numpy, matplotlib)\n• Web Development (React, TypeScript)\n• Cloud & DevOps (Docker, AWS)\n\nWhich area would you like to know more about?",
            "The tech stack includes modern tools for full-stack development, with a focus on AI/ML applications and data visualization.",
            "Skills range from traditional software development to cutting-edge AI techniques. There's also experience with cloud deployment and CI/CD pipelines."
        ]
    },
    "contact": {
        "keywords": ["contact", "email", "linkedin", "github", "hire", "job"],
        "responses": [
            "You can connect through:\n• LinkedIn: [Your LinkedIn Profile]\n• GitHub: [Your GitHub Profile]\n• Email: [Your Email]\n\nI'm happy to discuss collaboration opportunities!",
            "My creator is always interested in new opportunities, especially in data science and AI roles. Feel free to reach out!",
            "For business inquiries or collaboration, please use the contact information provided. I can also answer questions about availability and project timelines."
        ]
    },
    "general": {
        "keywords": ["hello", "hi", "help", "what can you do"],
        "responses": [
            "Hello! I'm an AI assistant for this data science portfolio. I can help you:\n• Explore projects and demos\n• Learn about skills and technologies\n• Try interactive AI features\n• Get contact information\n\nWhat would you like to know?",
            "Hi there! I'm here to help you navigate this portfolio and answer questions about data science, AI projects, and my creator's work. How can I assist you today?",
            "Welcome! I can provide information about projects, help you try demos, answer technical questions, and connect you with my creator. What interests you?"
        ]
    }
}

# Chat history storage (in a real app, this would be in a database)
chat_sessions = {}

def analyze_message(message: str) -> tuple[str, float]:
    """Analyze user message and return best matching category and confidence"""
    message_lower = message.lower()
    
    best_category = "general"
    best_confidence = 0.0
    
    for category, data in KNOWLEDGE_BASE.items():
        keyword_matches = sum(1 for keyword in data["keywords"] if keyword in message_lower)
        confidence = keyword_matches / len(data["keywords"]) if data["keywords"] else 0
        
        if confidence > best_confidence:
            best_confidence = confidence
            best_category = category
    
    return best_category, best_confidence

def generate_response(category: str, message: str, confidence: float) -> str:
    """Generate appropriate response based on category and confidence"""
    import random
    
    if confidence < 0.1:
        return "I'm not sure I understand. Could you rephrase that? I can help you explore projects, try demos, or answer questions about data science and AI."
    
    responses = KNOWLEDGE_BASE[category]["responses"]
    base_response = random.choice(responses)
    
    # Add contextual suggestions
    if category == "portfolio":
        base_response += "\n\n💡 Try asking about: projects, demos, skills, or contact info"
    elif category == "projects":
        base_response += "\n\n💡 Try asking about: specific technologies, live demos, or project details"
    elif category == "demos":
        base_response += "\n\n💡 Try asking about: how to use demos, what they demonstrate, or technical details"
    
    return base_response

def get_suggestions(category: str) -> List[str]:
    """Get relevant suggestions based on conversation context"""
    suggestions_map = {
        "portfolio": ["Tell me about projects", "Show me demos", "What skills do you have?", "How can I contact you?"],
        "projects": ["House price prediction", "Sentiment analysis", "Data visualization", "Technologies used"],
        "demos": ["Try sentiment analysis", "Create a chart", "Upload an image", "Sample data"],
        "skills": ["Python expertise", "Machine learning", "Web development", "Cloud deployment"],
        "contact": ["LinkedIn profile", "GitHub projects", "Email contact", "Availability"],
        "general": ["Explore projects", "Try demos", "Learn about skills", "Get contact info"]
    }
    return suggestions_map.get(category, ["Explore projects", "Try demos", "Learn about skills"])

@router.post("/chat", response_model=ChatResponse)
async def chat_with_ai(request: ChatMessage):
    """Chat with the AI assistant using the enhanced AI agent"""
    try:
        print(f"🔍 Processing chat request: '{request.message}'")
        
        # Get or create agent for this session
        session_id = request.session_id or "default-session"
        print(f"📋 Session ID: {session_id}")
        
        agent = agent_manager.get_or_create_agent(session_id)
        print(f"🤖 Agent created: {agent.name}")
        
        # Process message with AI agent
        print("🔄 Processing message with AI agent...")
        result = await agent.process_message(request.message, session_id)
        print(f"✅ AI response generated: {result.get('category', 'unknown')} category")
        
        # Store in session if session_id provided
        if request.session_id:
            if request.session_id not in chat_sessions:
                chat_sessions[request.session_id] = {
                    "session_id": request.session_id,
                    "user_id": request.user_id,
                    "messages": [],
                    "created_at": datetime.now()
                }
            
            chat_sessions[request.session_id]["messages"].append({
                "user_message": request.message,
                "ai_response": result["response"],
                "timestamp": datetime.now().isoformat(),
                "agent_data": {
                    "category": result.get("category"),
                    "confidence": result.get("confidence"),
                    "sentiment": result.get("sentiment")
                }
            })
        
        response = ChatResponse(
            message=request.message,
            response=result["response"],
            timestamp=datetime.now(),
            confidence=result.get("confidence", 0.8),
            suggestions=result.get("suggestions", [])
        )
        
        print(f"🎯 Returning response with {len(result['response'])} characters")
        return response
        
    except Exception as e:
        print(f"❌ Error in chat_with_ai: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Error processing chat: {str(e)}")

@router.get("/suggestions")
async def get_chat_suggestions():
    """Get initial chat suggestions"""
    return {
        "suggestions": [
            "Tell me about your projects",
            "Tell me about your AI projects",
            "What technologies do you use?",
            "Show me your machine learning demos",
            "How can I contact you?",
            "What's your experience with Python?",
            "Tell me about your data science work",
            "Career advice for tech",
            "Learning resources"
        ]
    }

@router.get("/session/{session_id}")
async def get_chat_session(session_id: str):
    """Get chat session history"""
    if session_id in chat_sessions:
        return chat_sessions[session_id]
    else:
        return {"session_id": session_id, "messages": [], "created_at": datetime.now().isoformat()}

@router.delete("/session/{session_id}")
async def clear_chat_session(session_id: str):
    """Clear chat session history"""
    if session_id in chat_sessions:
        del chat_sessions[session_id]
    
    # Also clear agent session
    if session_id in agent_manager.session_agents:
        agent_id = agent_manager.session_agents[session_id]
        if agent_id in agent_manager.agents and agent_id != "default":
            del agent_manager.agents[agent_id]
        del agent_manager.session_agents[session_id]
        if session_id in agent_manager.last_activity:
            del agent_manager.last_activity[session_id]
    
    return {"message": "Session cleared successfully"}

@router.get("/agent/status/{session_id}")
async def get_agent_status(session_id: str):
    """Get AI agent status for a session"""
    try:
        status = agent_manager.get_agent_status(session_id)
        return status
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting agent status: {str(e)}")

@router.get("/agent/status")
async def get_all_agents_status():
    """Get status of all AI agents"""
    try:
        # Clean up inactive agents first
        agent_manager.cleanup_inactive_agents()
        return agent_manager.get_all_agents_status()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting agents status: {str(e)}")

@router.post("/agent/memory/{session_id}")
async def add_agent_memory(session_id: str, memory_data: dict):
    """Add a memory to the AI agent"""
    try:
        agent = agent_manager.get_or_create_agent(session_id)
        agent.add_memory(
            content=memory_data.get("content", ""),
            importance=memory_data.get("importance", 0.5),
            memory_type=memory_data.get("memory_type", "conversation"),
            context=memory_data.get("context", {})
        )
        return {"message": "Memory added successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error adding memory: {str(e)}")

@router.get("/agent/memory/{session_id}")
async def get_agent_memories(session_id: str, query: str = "", limit: int = 5):
    """Get relevant memories from the AI agent"""
    try:
        agent = agent_manager.get_or_create_agent(session_id)
        memories = agent.get_relevant_memories(query, limit)
        return {
            "memories": [
                {
                    "content": memory.content,
                    "timestamp": memory.timestamp.isoformat(),
                    "importance": memory.importance,
                    "memory_type": memory.memory_type,
                    "context": memory.context
                }
                for memory in memories
            ]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting memories: {str(e)}")

@router.get("/tools")
async def get_tools():
    """Get list of available tools"""
    try:
        tools = get_available_tools()
        return {"tools": tools}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting tools: {str(e)}")

@router.post("/tools/execute")
async def execute_tool_endpoint(tool_request: dict):
    """Execute a tool"""
    try:
        tool_name = tool_request.get("tool_name")
        parameters = tool_request.get("parameters", {})
        
        if not tool_name:
            raise HTTPException(status_code=400, detail="Tool name is required")
        
        result = execute_tool(tool_name, **parameters)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error executing tool: {str(e)}")

@router.get("/ai/status")
async def get_ai_status():
    """Get AI integration status and capabilities"""
    try:
        ai_integration = get_ai_integration()
        return {
            "status": "available",
            "model_info": ai_integration.get_model_info(),
            "message": "AI integration is ready to use"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error checking AI status: {str(e)}")

@router.post("/ai/generate-code")
async def generate_code(request: dict):
    """Generate code using AI"""
    try:
        prompt = request.get("prompt")
        language = request.get("language", "python")
        
        if not prompt:
            raise HTTPException(status_code=400, detail="Prompt is required")
        
        ai_integration = get_ai_integration()
        result = await ai_integration.generate_code(prompt, language)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating code: {str(e)}")



@router.get("/capabilities")
async def get_chatbot_capabilities():
    """Get information about what the chatbot can do"""
    return {
        "capabilities": [
            "Answer questions about portfolio projects",
            "Explain data science and AI concepts",
            "Guide users through interactive demos",
            "Provide information about skills and technologies",
            "Share contact and professional information",
            "Maintain conversation context across sessions"
        ],
        "topics": list(KNOWLEDGE_BASE.keys()),
        "features": [
            "Natural language understanding",
            "Contextual responses",
            "Interactive suggestions",
            "Session management",
            "Real-time chat"
        ]
    } 