from fastapi import APIRouter, HTTPException
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime
import json
import re

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
    """Chat with the AI assistant"""
    try:
        # Analyze the message
        category, confidence = analyze_message(request.message)
        
        # Generate response
        response = generate_response(category, request.message, confidence)
        
        # Get suggestions
        suggestions = get_suggestions(category)
        
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
                "ai_response": response,
                "timestamp": datetime.now().isoformat()
            })
        
        return ChatResponse(
            message=request.message,
            response=response,
            timestamp=datetime.now(),
            confidence=confidence,
            suggestions=suggestions
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing chat: {str(e)}")

@router.get("/suggestions")
async def get_chat_suggestions():
    """Get initial chat suggestions"""
    return {
        "suggestions": [
            "Tell me about your projects",
            "Show me the AI demos",
            "What skills do you have?",
            "How can I contact you?",
            "Try the sentiment analysis demo"
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
    return {"message": "Session cleared successfully"}

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