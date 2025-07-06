#!/usr/bin/env python3
"""
Startup script for the AI Portfolio Backend
"""
import uvicorn
import os
import sys

# Add the current directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

if __name__ == "__main__":
    print("🚀 Starting AI Portfolio Backend...")
    print("📍 API Documentation: http://localhost:8000/api/docs")
    print("📍 Health Check: http://localhost:8000/api/health")
    
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    ) 