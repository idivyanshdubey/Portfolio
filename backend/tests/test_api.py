import pytest
from fastapi.testclient import TestClient
from main import app
import json

client = TestClient(app)

class TestAPIEndpoints:
    """Test suite for API endpoints"""
    
    def test_health_check(self):
        """Test health check endpoint"""
        response = client.get("/api/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        assert "message" in data
    
    def test_root_endpoint(self):
        """Test root endpoint"""
        response = client.get("/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        assert "docs" in data
    
    def test_database_health(self):
        """Test database health endpoint"""
        response = client.get("/api/health/db")
        assert response.status_code == 200
        data = response.json()
        assert "status" in data
        assert "database" in data
    
    def test_projects_endpoint(self):
        """Test projects endpoint"""
        response = client.get("/api/projects")
        assert response.status_code == 200
    
    def test_blog_endpoint(self):
        """Test blog endpoint"""
        response = client.get("/api/blog")
        assert response.status_code == 200
    
    def test_analytics_endpoint(self):
        """Test analytics endpoint"""
        response = client.get("/api/analytics")
        assert response.status_code == 200
    
    def test_chatbot_endpoint(self):
        """Test chatbot endpoint"""
        response = client.get("/api/chatbot")
        assert response.status_code == 200
    
    def test_contact_submission(self):
        """Test contact form submission"""
        contact_data = {
            "name": "Test User",
            "email": "test@example.com",
            "subject": "Test Subject",
            "message": "Test message content",
            "phone": "1234567890",
            "company": "Test Company",
            "source": "website"
        }
        response = client.post("/api/contact/submit", json=contact_data)
        assert response.status_code == 200
        data = response.json()
        assert "success" in data
        assert "message" in data
    
    def test_contact_submission_invalid_email(self):
        """Test contact form with invalid email"""
        contact_data = {
            "name": "Test User",
            "email": "invalid-email",
            "subject": "Test Subject",
            "message": "Test message content"
        }
        response = client.post("/api/contact/submit", json=contact_data)
        assert response.status_code == 422  # Validation error
    
    def test_contact_submission_missing_required_fields(self):
        """Test contact form with missing required fields"""
        contact_data = {
            "name": "Test User",
            # Missing email, subject, message
        }
        response = client.post("/api/contact/submit", json=contact_data)
        assert response.status_code == 422  # Validation error

class TestCORS:
    """Test CORS configuration"""
    
    def test_cors_headers(self):
        """Test that CORS headers are properly set"""
        response = client.get("/api/health")
        assert "access-control-allow-origin" in response.headers
        assert "access-control-allow-credentials" in response.headers

class TestErrorHandling:
    """Test error handling"""
    
    def test_404_endpoint(self):
        """Test 404 handling"""
        response = client.get("/api/nonexistent")
        assert response.status_code == 404
    
    def test_invalid_json(self):
        """Test invalid JSON handling"""
        response = client.post("/api/contact/submit", data="invalid json")
        assert response.status_code == 422

if __name__ == "__main__":
    pytest.main([__file__]) 