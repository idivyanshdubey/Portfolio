# API Documentation

Complete API reference for the AI Portfolio backend.

## 🚀 Quick Start

### Base URL
- **Development**: `http://localhost:8000`
- **Production**: `https://your-domain.com`

### Authentication
Most endpoints are public, but some require authentication:
```bash
Authorization: Bearer <your-jwt-token>
```

## 📚 API Endpoints

### **Health & Status**
- `GET /api/health` - Application health check
- `GET /api/health/db` - Database health check

### **Projects**
- `GET /api/projects` - List all projects
- `GET /api/projects/{id}` - Get specific project
- `POST /api/projects` - Create new project (admin)
- `PUT /api/projects/{id}` - Update project (admin)
- `DELETE /api/projects/{id}` - Delete project (admin)

### **Blog**
- `GET /api/blog` - List all blog posts
- `GET /api/blog/{slug}` - Get specific blog post
- `POST /api/blog` - Create new blog post (admin)
- `PUT /api/blog/{id}` - Update blog post (admin)
- `DELETE /api/blog/{id}` - Delete blog post (admin)

### **AI Chatbot**
- `POST /api/chatbot/chat` - Send message to AI agent
- `GET /api/chatbot/suggestions` - Get chat suggestions
- `GET /api/chatbot/agent/status` - Get agent status
- `GET /api/chatbot/tools` - List available tools
- `POST /api/chatbot/tools/execute` - Execute a tool

### **Analytics**
- `GET /api/analytics/visits` - Get visit analytics
- `POST /api/analytics/track` - Track user interaction

## 🔧 Request/Response Examples

### **Get Projects**
```bash
curl "http://localhost:8000/api/projects"
```

**Response:**
```json
{
  "projects": [
    {
      "id": 1,
      "title": "AI Portfolio",
      "description": "Modern portfolio with AI features",
      "image_url": "https://example.com/image.jpg",
      "github_url": "https://github.com/user/repo",
      "live_url": "https://example.com",
      "technologies": ["React", "Python", "FastAPI"],
      "category": "web-development",
      "featured": true,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### **Chat with AI**
```bash
curl -X POST "http://localhost:8000/api/chatbot/chat" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Tell me about your projects",
    "session_id": "user-123"
  }'
```

**Response:**
```json
{
  "response": "I have several interesting projects...",
  "session_id": "user-123",
  "confidence": 0.95,
  "tools_used": ["memory", "knowledge_base"]
}
```

### **Execute Tool**
```bash
curl -X POST "http://localhost:8000/api/chatbot/tools/execute" \
  -H "Content-Type: application/json" \
  -d '{
    "tool_name": "get_weather",
    "parameters": {
      "city": "New York"
    }
  }'
```

**Response:**
```json
{
  "result": {
    "temperature": 72,
    "description": "Partly cloudy",
    "humidity": 65
  },
  "success": true
}
```

## 📊 Data Models

### **Project Model**
```typescript
interface Project {
  id: number;
  title: string;
  description: string;
  image_url?: string;
  github_url?: string;
  live_url?: string;
  technologies: string[];
  category: string;
  featured: boolean;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}
```

### **Blog Post Model**
```typescript
interface BlogPost {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  author: string;
  tags: string[];
  featured_image?: string;
  published: boolean;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}
```

### **Chat Message Model**
```typescript
interface ChatMessage {
  id: number;
  session_id: string;
  message: string;
  response: string;
  confidence: number;
  tools_used: string[];
  created_at: string;
}
```

## 🔐 Authentication

### **JWT Token Format**
```bash
# Request header
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### **Token Response**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "expires_in": 3600
}
```

## 🚨 Error Handling

### **Standard Error Response**
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "field": "title",
      "issue": "Field is required"
    }
  }
}
```

### **Common Error Codes**
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found (resource doesn't exist)
- `422` - Unprocessable Entity (validation failed)
- `500` - Internal Server Error

## 📈 Rate Limiting

- **Public endpoints**: 100 requests/minute
- **Authenticated endpoints**: 1000 requests/minute
- **AI chatbot**: 50 requests/minute per session

## 🔍 Testing

### **Interactive API Documentation**
Visit `http://localhost:8000/docs` for interactive Swagger UI documentation.

### **Test with curl**
```bash
# Health check
curl http://localhost:8000/api/health

# Get projects
curl http://localhost:8000/api/projects

# Test chatbot
curl -X POST "http://localhost:8000/api/chatbot/chat" \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello", "session_id": "test"}'
```

## 📚 Additional Resources

- **[Database Schema](database/README.md)** - Database models and relationships
- **[AI Agent System](ai-agent/README.md)** - AI chatbot capabilities
- **[Deployment Guide](deployment/README.md)** - Production deployment
- **[Security Guide](security/README.md)** - Security best practices 