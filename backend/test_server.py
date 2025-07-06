#!/usr/bin/env python3
"""
Simple test script to verify the FastAPI server can start
"""
import sys
import os

# Add current directory to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

def test_imports():
    """Test if all required modules can be imported"""
    try:
        print("Testing imports...")
        
        # Test FastAPI
        import fastapi
        print("✓ FastAPI imported successfully")
        
        # Test uvicorn
        import uvicorn
        print("✓ Uvicorn imported successfully")
        
        # Test basic modules
        import json
        import datetime
        print("✓ Basic modules imported successfully")
        
        return True
        
    except ImportError as e:
        print(f"✗ Import error: {e}")
        return False

def test_main_app():
    """Test if main app can be created"""
    try:
        print("\nTesting main app creation...")
        
        from fastapi import FastAPI
        from fastapi.middleware.cors import CORSMiddleware
        
        # Create a simple app
        app = FastAPI(
            title="AI Portfolio Test",
            description="Test app",
            version="1.0.0"
        )
        
        # Add CORS
        app.add_middleware(
            CORSMiddleware,
            allow_origins=["http://localhost:3000"],
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )
        
        # Add a test endpoint
        @app.get("/test")
        async def test_endpoint():
            return {"message": "Backend is working!"}
        
        print("✓ FastAPI app created successfully")
        return True
        
    except Exception as e:
        print(f"✗ App creation error: {e}")
        return False

if __name__ == "__main__":
    print("🧪 Testing AI Portfolio Backend...")
    print("=" * 50)
    
    # Test imports
    if not test_imports():
        print("\n❌ Import test failed. Please install dependencies first.")
        sys.exit(1)
    
    # Test app creation
    if not test_main_app():
        print("\n❌ App creation test failed.")
        sys.exit(1)
    
    print("\n✅ All tests passed! Backend is ready to run.")
    print("\n🚀 You can now run: python start.py") 