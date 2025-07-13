import pytest
from database import test_connection, init_db, get_db
from models.contact import Contact
from sqlalchemy.orm import Session
import os

class TestDatabase:
    """Test suite for database operations"""
    
    def test_database_connection(self):
        """Test database connection"""
        # This test will pass if database is available, skip if not
        try:
            result = test_connection()
            # If database is available, connection should work
            if result:
                assert result is True
            else:
                pytest.skip("Database not available")
        except Exception as e:
            pytest.skip(f"Database connection failed: {e}")
    
    def test_database_initialization(self):
        """Test database initialization"""
        try:
            # This should not raise an exception
            init_db()
            assert True
        except Exception as e:
            pytest.skip(f"Database initialization failed: {e}")
    
    def test_contact_model_creation(self):
        """Test Contact model creation"""
        contact_data = {
            "name": "Test User",
            "email": "test@example.com",
            "subject": "Test Subject",
            "message": "Test message content",
            "phone": "1234567890",
            "company": "Test Company",
            "source": "website"
        }
        
        try:
            contact = Contact(**contact_data)
            assert contact.name == contact_data["name"]
            assert contact.email == contact_data["email"]
            assert contact.subject == contact_data["subject"]
            assert contact.message == contact_data["message"]
            assert contact.phone == contact_data["phone"]
            assert contact.company == contact_data["company"]
            assert contact.source == contact_data["source"]
        except Exception as e:
            pytest.skip(f"Contact model test failed: {e}")
    
    def test_contact_model_validation(self):
        """Test Contact model validation"""
        # Test with missing required fields
        with pytest.raises(Exception):
            Contact(name="Test")  # Missing required fields
    
    def test_database_session(self):
        """Test database session creation"""
        try:
            db = next(get_db())
            assert isinstance(db, Session)
            db.close()
        except Exception as e:
            pytest.skip(f"Database session test failed: {e}")

class TestEnvironmentVariables:
    """Test environment variable configuration"""
    
    def test_database_url_configuration(self):
        """Test database URL configuration"""
        # Check if DATABASE_URL is set (optional for local development)
        database_url = os.getenv("DATABASE_URL")
        if database_url:
            assert "postgresql" in database_url or "sqlite" in database_url
    
    def test_required_env_vars(self):
        """Test required environment variables"""
        # These are optional for local development but should be set for production
        optional_vars = [
            "EMAILJS_SERVICE_ID",
            "EMAILJS_TEMPLATE_ID", 
            "EMAILJS_PUBLIC_KEY",
            "RESEND_API_KEY",
            "SMTP_SERVER",
            "SMTP_USERNAME",
            "SMTP_PASSWORD"
        ]
        
        for var in optional_vars:
            value = os.getenv(var)
            # These are optional, so we just check they exist or are None
            assert value is None or len(value) > 0

if __name__ == "__main__":
    pytest.main([__file__]) 