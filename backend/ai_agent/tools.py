import requests
import json
from typing import Dict, Any, List, Optional
from datetime import datetime
import re

class ToolRegistry:
    """Registry for AI agent tools"""
    
    def __init__(self):
        self.tools = {}
        self._register_default_tools()
    
    def register_tool(self, name: str, function: callable, description: str, parameters: Dict[str, Any]):
        """Register a new tool"""
        self.tools[name] = {
            "function": function,
            "description": description,
            "parameters": parameters
        }
    
    def get_tool(self, name: str):
        """Get a tool by name"""
        return self.tools.get(name)
    
    def list_tools(self) -> List[str]:
        """List all available tools"""
        return list(self.tools.keys())
    
    def _register_default_tools(self):
        """Register default tools"""
        
        # Weather API tool
        def get_weather(city: str) -> Dict[str, Any]:
            """Get weather information for a city"""
            try:
                # Using a free weather API (you can replace with your preferred API)
                url = f"http://api.openweathermap.org/data/2.5/weather"
                params = {
                    "q": city,
                    "appid": "YOUR_API_KEY",  # Replace with actual API key
                    "units": "metric"
                }
                
                # For demo purposes, return mock data
                return {
                    "city": city,
                    "temperature": "22°C",
                    "description": "Partly cloudy",
                    "humidity": "65%",
                    "wind_speed": "12 km/h",
                    "status": "mock_data"
                }
            except Exception as e:
                return {"error": f"Could not fetch weather data: {str(e)}"}
        
        # News API tool
        def get_news(topic: str = "technology", limit: int = 5) -> Dict[str, Any]:
            """Get latest news on a topic"""
            try:
                # Mock news data for demo
                mock_news = {
                    "technology": [
                        {"title": "AI Breakthrough in Natural Language Processing", "summary": "New model achieves human-level understanding"},
                        {"title": "Machine Learning in Healthcare", "summary": "AI helps diagnose diseases with 95% accuracy"}
                    ],
                    "data_science": [
                        {"title": "Big Data Analytics Trends 2024", "summary": "New tools and techniques emerging"},
                        {"title": "Python Dominates Data Science", "summary": "Survey shows Python as top choice"}
                    ]
                }
                
                return {
                    "topic": topic,
                    "articles": mock_news.get(topic, mock_news["technology"])[:limit],
                    "status": "mock_data"
                }
            except Exception as e:
                return {"error": f"Could not fetch news: {str(e)}"}
        
        # Calculator tool
        def calculate(expression: str) -> Dict[str, Any]:
            """Evaluate mathematical expressions"""
            try:
                # Safe evaluation of mathematical expressions
                allowed_chars = set('0123456789+-*/(). ')
                if not all(c in allowed_chars for c in expression):
                    return {"error": "Invalid characters in expression"}
                
                result = eval(expression)
                return {
                    "expression": expression,
                    "result": result,
                    "status": "success"
                }
            except Exception as e:
                return {"error": f"Calculation error: {str(e)}"}
        
        # Time and date tool
        def get_time_info(timezone: str = "UTC") -> Dict[str, Any]:
            """Get current time and date information"""
            try:
                now = datetime.now()
                return {
                    "current_time": now.strftime("%H:%M:%S"),
                    "current_date": now.strftime("%Y-%m-%d"),
                    "timezone": timezone,
                    "day_of_week": now.strftime("%A"),
                    "status": "success"
                }
            except Exception as e:
                return {"error": f"Time error: {str(e)}"}
        
        # URL shortener tool
        def shorten_url(url: str) -> Dict[str, Any]:
            """Shorten a URL (mock implementation)"""
            try:
                # Mock URL shortening
                short_code = f"short_{hash(url) % 10000}"
                return {
                    "original_url": url,
                    "short_url": f"https://short.ly/{short_code}",
                    "status": "mock_data"
                }
            except Exception as e:
                return {"error": f"URL shortening error: {str(e)}"}
        
        # Register the tools
        self.register_tool(
            "get_weather",
            get_weather,
            "Get weather information for a city",
            {"city": "string"}
        )
        
        self.register_tool(
            "get_news",
            get_news,
            "Get latest news on a topic",
            {"topic": "string", "limit": "integer"}
        )
        
        self.register_tool(
            "calculate",
            calculate,
            "Evaluate mathematical expressions",
            {"expression": "string"}
        )
        
        self.register_tool(
            "get_time_info",
            get_time_info,
            "Get current time and date information",
            {"timezone": "string"}
        )
        
        self.register_tool(
            "shorten_url",
            shorten_url,
            "Shorten a URL",
            {"url": "string"}
        )

# Global tool registry
tool_registry = ToolRegistry()

def execute_tool(tool_name: str, **kwargs) -> Dict[str, Any]:
    """Execute a tool by name with given parameters"""
    tool = tool_registry.get_tool(tool_name)
    if not tool:
        return {"error": f"Tool '{tool_name}' not found"}
    
    try:
        result = tool["function"](**kwargs)
        return result
    except Exception as e:
        return {"error": f"Tool execution error: {str(e)}"}

def get_available_tools() -> List[Dict[str, Any]]:
    """Get list of all available tools with their descriptions"""
    tools = []
    for name, tool in tool_registry.tools.items():
        tools.append({
            "name": name,
            "description": tool["description"],
            "parameters": tool["parameters"]
        })
    return tools 