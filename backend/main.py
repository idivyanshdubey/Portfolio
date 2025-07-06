from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import uvicorn
from pathlib import Path
import os
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Import routers
from fastapi import APIRouter

# Create routers
projects = APIRouter()
demos = APIRouter()
blog = APIRouter()
analytics = APIRouter()
chatbot = APIRouter()

# Try to import actual route modules
try:
    import api.routes.projects as projects_module
    import api.routes.demos as demos_module
    import api.routes.blog as blog_module
    import api.routes.analytics as analytics_module
    import api.routes.chatbot as chatbot_module
    
    # Use the actual routers if import successful
    projects = projects_module.router
    demos = demos_module.router
    blog = blog_module.router
    analytics = analytics_module.router
    chatbot = chatbot_module.router
    print("✓ All route modules imported successfully")
    
except ImportError as e:
    print(f"Warning: Could not import some routes: {e}")
    print("Using basic routers with sample endpoints")
    
    # Add basic endpoints to dummy routers
    @projects.get("/")
    async def get_projects():
        return {"projects": []}
    
    @demos.get("/")
    async def get_demos():
        return {"demos": []}
    
    @blog.get("/")
    async def get_blog():
        return {"posts": []}
    
    @analytics.get("/")
    async def get_analytics():
        return {"analytics": "disabled"}
    
    @chatbot.get("/")
    async def get_chatbot():
        return {"chatbot": "AI assistant ready to help!"}

# Create FastAPI app
app = FastAPI(
    title="AI-Powered Data Science Portfolio",
    description="A modern portfolio showcasing data science and AI skills with interactive demos",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(projects, prefix="/api/projects", tags=["projects"])
app.include_router(demos, prefix="/api/demos", tags=["demos"])
app.include_router(blog, prefix="/api/blog", tags=["blog"])
app.include_router(analytics, prefix="/api/analytics", tags=["analytics"])
app.include_router(chatbot, prefix="/api/chatbot", tags=["chatbot"])

# Health check endpoint
@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "message": "AI Portfolio API is running!"}

# Database health check endpoint
@app.get("/api/health/db")
async def database_health_check():
    try:
        from database import test_connection
        if test_connection():
            return {"status": "healthy", "database": "connected"}
        else:
            return {"status": "unhealthy", "database": "disconnected"}
    except Exception as e:
        logger.error(f"Database health check failed: {e}")
        return {"status": "unhealthy", "database": "error", "message": str(e)}

# Root endpoint
@app.get("/")
async def root():
    return {
        "message": "Welcome to AI-Powered Data Science Portfolio API",
        "docs": "/api/docs",
        "health": "/api/health",
        "database_health": "/api/health/db"
    }

# Startup event
@app.on_event("startup")
async def startup_event():
    """Initialize database on startup"""
    try:
        from database import init_db, test_connection
        logger.info("Testing database connection...")
        if test_connection():
            logger.info("Database connection successful")
            logger.info("Initializing database tables...")
            init_db()
            logger.info("Database initialization completed")
        else:
            logger.warning("Database connection failed - some features may not work")
    except Exception as e:
        logger.error(f"Database initialization failed: {e}")

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    ) 