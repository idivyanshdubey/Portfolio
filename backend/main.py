from fastapi import FastAPI, HTTPException, APIRouter
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import logging
import sys
from pathlib import Path

# Ensure backend is in sys.path so imports work on Railway
BASE_DIR = Path(__file__).resolve().parent
BACKEND_DIR = BASE_DIR / "backend"
if BACKEND_DIR.exists() and str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create fallback/dummy routers
projects = APIRouter()
demos = APIRouter()
blog = APIRouter()
analytics = APIRouter()
chatbot = APIRouter()
contact = APIRouter()
verification = APIRouter()  # ✅ always defined

# Try to import actual route modules from backend/api/routes
try:
    import backend.api.routes.projects as projects_module
    import backend.api.routes.demos as demos_module
    import backend.api.routes.blog as blog_module
    import backend.api.routes.analytics as analytics_module
    import backend.api.routes.chatbot as chatbot_module
    import backend.api.routes.contact as contact_module
    import backend.api.routes.verification as verification_module
    
    projects = projects_module.router
    demos = demos_module.router
    blog = blog_module.router
    analytics = analytics_module.router
    chatbot = chatbot_module.router
    contact = contact_module.router
    verification = verification_module.router
    print("✓ All route modules imported successfully")
except ImportError as e:
    print(f"Warning: Could not import some routes: {e}")
    print("Using basic routers with sample endpoints")
    
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
    
    @contact.post("/submit")
    async def submit_contact():
        return {"success": True, "message": "Contact form submitted successfully!"}
    
    @verification.get("/")
    async def verify_fallback():
        return {"verification": "not implemented yet"}

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
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
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
app.include_router(contact, prefix="/api/contact", tags=["contact"])
app.include_router(verification, prefix="/api/verify", tags=["verification"])  # ✅ safe now

# Health check endpoint
@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "message": "AI Portfolio API is running!"}

# Debug endpoint
@app.get("/api/debug/routers")
async def debug_routers():
    return {
        "contact_router": str(contact),
        "verification_router": str(verification),
        "app_routes": [str(route) for route in app.routes]
    }

# DB health check
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
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True, log_level="info")
