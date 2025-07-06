from fastapi import APIRouter, HTTPException, Depends
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime

router = APIRouter()

# Pydantic models for request/response
class ProjectBase(BaseModel):
    title: str
    description: str
    technologies: List[str]
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    image_url: Optional[str] = None
    category: str  # e.g., "machine-learning", "data-analysis", "nlp", "computer-vision"

class ProjectCreate(ProjectBase):
    pass

class Project(ProjectBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# Sample projects data (in a real app, this would come from a database)
sample_projects = [
    {
        "id": 1,
        "title": "House Price Prediction Model",
        "description": "A machine learning model that predicts house prices based on various features like location, size, and amenities. Achieved 92% accuracy using Random Forest algorithm.",
        "technologies": ["Python", "scikit-learn", "pandas", "matplotlib", "Flask"],
        "github_url": "https://github.com/yourusername/house-price-prediction",
        "live_url": "https://house-price-demo.herokuapp.com",
        "image_url": "/images/house-price-prediction.jpg",
        "category": "machine-learning",
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    {
        "id": 2,
        "title": "Sentiment Analysis API",
        "description": "Real-time sentiment analysis of text using Natural Language Processing. Built with FastAPI and deployed on cloud infrastructure.",
        "technologies": ["Python", "FastAPI", "NLTK", "TextBlob", "Docker"],
        "github_url": "https://github.com/yourusername/sentiment-analysis-api",
        "live_url": "https://sentiment-api.herokuapp.com",
        "image_url": "/images/sentiment-analysis.jpg",
        "category": "nlp",
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    },
    {
        "id": 3,
        "title": "Data Visualization Dashboard",
        "description": "Interactive dashboard for analyzing sales data with real-time charts and insights. Built with React and D3.js.",
        "technologies": ["React", "D3.js", "Python", "FastAPI", "PostgreSQL"],
        "github_url": "https://github.com/yourusername/data-dashboard",
        "live_url": "https://data-dashboard.vercel.app",
        "image_url": "/images/data-dashboard.jpg",
        "category": "data-analysis",
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    }
]

@router.get("/", response_model=List[Project])
async def get_projects(category: Optional[str] = None):
    """Get all projects, optionally filtered by category"""
    if category:
        filtered_projects = [p for p in sample_projects if p["category"] == category]
        return filtered_projects
    return sample_projects

@router.get("/{project_id}", response_model=Project)
async def get_project(project_id: int):
    """Get a specific project by ID"""
    for project in sample_projects:
        if project["id"] == project_id:
            return project
    raise HTTPException(status_code=404, detail="Project not found")

@router.post("/", response_model=Project)
async def create_project(project: ProjectCreate):
    """Create a new project"""
    new_project = {
        "id": len(sample_projects) + 1,
        **project.dict(),
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    }
    sample_projects.append(new_project)
    return new_project

@router.get("/categories/list")
async def get_categories():
    """Get all available project categories"""
    categories = list(set(project["category"] for project in sample_projects))
    return {"categories": categories} 