import os
from typing import Optional

class Settings:
    """Simple settings class without pydantic dependency"""
    
    def __init__(self):
        # API Configuration
        self.api_title: str = "AI-Powered Data Science Portfolio"
        self.api_version: str = "1.0.0"
        self.api_description: str = "A modern portfolio showcasing data science and AI skills with interactive demos"
        
        # Server Configuration
        self.host: str = "0.0.0.0"
        self.port: int = 8000
        self.debug: bool = True
        
        # CORS Configuration
        self.allowed_origins: list = ["http://localhost:3000", "http://127.0.0.1:3000"]
        
        # Database Configuration (PostgreSQL)
        self.db_host: str = os.getenv("DB_HOST", "localhost")
        self.db_port: int = int(os.getenv("DB_PORT", "5432"))
        self.db_name: str = os.getenv("DB_NAME", "ai_portfolio")
        self.db_user: str = os.getenv("DB_USER", "postgres")
        self.db_password: str = os.getenv("DB_PASSWORD", "postgres")
        
        # Construct database URLs
        self.database_url: str = f"postgresql://{self.db_user}:{self.db_password}@{self.db_host}:{self.db_port}/{self.db_name}"
        self.async_database_url: str = f"postgresql+asyncpg://{self.db_user}:{self.db_password}@{self.db_host}:{self.db_port}/{self.db_name}"
        
        # Security
        self.secret_key: str = "your-secret-key-change-in-production"
        self.algorithm: str = "HS256"
        self.access_token_expire_minutes: int = 30
        
        # File Upload
        self.max_file_size: int = 10 * 1024 * 1024  # 10MB
        self.allowed_image_types: list = ["image/jpeg", "image/png", "image/gif"]
        
        # ML Model Configuration
        self.model_cache_dir: str = "./ml_models/cache"

# Create settings instance
settings = Settings() 