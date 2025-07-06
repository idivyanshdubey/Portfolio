#!/usr/bin/env python3
"""
Database initialization script
Creates the database and tables for the AI Portfolio application
"""

import os
import sys
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Add the current directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database import init_db, test_connection
from config import settings
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def main():
    """Initialize the database"""
    logger.info("Starting database initialization...")
    
    # Test connection first
    logger.info("Testing database connection...")
    if not test_connection():
        logger.error("Failed to connect to database. Please check your PostgreSQL configuration.")
        logger.info(f"Database URL: {settings.database_url}")
        return False
    
    # Initialize database tables
    logger.info("Creating database tables...")
    try:
        init_db()
        logger.info("Database initialization completed successfully!")
        return True
    except Exception as e:
        logger.error(f"Failed to initialize database: {e}")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1) 