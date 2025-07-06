from sqlalchemy import Column, String, Text, ARRAY, JSON, Boolean
from models.base import BaseModel

class Project(BaseModel):
    """Project model for portfolio projects"""
    __tablename__ = "projects"
    
    title = Column(String(255), nullable=False, index=True)
    description = Column(Text, nullable=False)
    image_url = Column(String(500))
    github_url = Column(String(500))
    live_url = Column(String(500))
    technologies = Column(ARRAY(String), default=[])
    category = Column(String(100), index=True)
    featured = Column(Boolean, default=False)
    metadata = Column(JSON, default={})
    
    def __repr__(self):
        return f"<Project(id={self.id}, title='{self.title}')>" 