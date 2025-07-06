from sqlalchemy import Column, String, Text, JSON
from models.base import BaseModel

class ChatSession(BaseModel):
    """Chat session model"""
    __tablename__ = "chat_sessions"
    
    session_id = Column(String(255), unique=True, index=True)
    user_id = Column(String(255), index=True)
    metadata = Column(JSON, default={})

class ChatMessage(BaseModel):
    """Chat message model"""
    __tablename__ = "chat_messages"
    
    session_id = Column(String(255), index=True)
    message = Column(Text, nullable=False)
    response = Column(Text, nullable=False)
    user_id = Column(String(255), index=True)
    metadata = Column(JSON, default={})
    
    def __repr__(self):
        return f"<ChatMessage(id={self.id}, session_id='{self.session_id}')>" 