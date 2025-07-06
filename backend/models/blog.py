from sqlalchemy import Column, String, Text, ARRAY, JSON, Boolean
from models.base import BaseModel

class BlogPost(BaseModel):
    """Blog post model"""
    __tablename__ = "blog_posts"
    
    title = Column(String(255), nullable=False, index=True)
    content = Column(Text, nullable=False)
    excerpt = Column(Text)
    slug = Column(String(255), unique=True, index=True)
    author = Column(String(100), default="Admin")
    tags = Column(ARRAY(String), default=[])
    featured_image = Column(String(500))
    published = Column(Boolean, default=False)
    metadata = Column(JSON, default={})
    
    def __repr__(self):
        return f"<BlogPost(id={self.id}, title='{self.title}')>" 