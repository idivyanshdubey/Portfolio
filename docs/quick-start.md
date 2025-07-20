# Quick Start Guide

Get your AI Portfolio up and running in under 10 minutes!

## 🚀 Prerequisites

- **Docker & Docker Compose** (recommended)
- **Python 3.11+** and **Node.js 18+** (for local development)
- **Git** for cloning the repository

## 📦 Option 1: Docker (Recommended)

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd ai-portfolio
```

### 2. Start All Services
```bash
docker-compose up -d
```

### 3. Access Your Application
- **Frontend**: http://localhost:80
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## 🛠 Option 2: Local Development

### 1. Clone and Setup
```bash
git clone <your-repo-url>
cd ai-portfolio
```

### 2. Backend Setup
```bash
cd backend
pip install -r requirements.txt
python init_db.py
python -m uvicorn main:app --reload
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```

### 4. Access Your Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## ✅ Verify Everything Works

### Test Backend
```bash
curl http://localhost:8000/api/health
```
Expected: `{"status": "healthy"}`

### Test Frontend
Open http://localhost:80 (Docker) or http://localhost:3000 (local) in your browser

### Test AI Chatbot
```bash
curl -X POST "http://localhost:8000/api/chatbot/chat" \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello!", "session_id": "test-123"}'
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Database (if not using Docker)
DATABASE_URL=postgresql://user:password@localhost:5432/ai_portfolio

# Email Services (optional)
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_id
EMAILJS_PUBLIC_KEY=your_public_key

# AI Services (optional)
HUGGINGFACE_API_KEY=your_huggingface_key
OPENAI_API_KEY=your_openai_key
```

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Check what's using the port
   lsof -i :8000
   # Kill the process or change ports
   ```

2. **Database connection failed**
   ```bash
   # If using Docker, restart the database
   docker-compose restart postgres
   ```

3. **Frontend build errors**
   ```bash
   # Clear cache and reinstall
   cd frontend
   rm -rf node_modules package-lock.json
   npm install
   ```

### Health Checks

```bash
# Backend health
curl http://localhost:8000/api/health

# Database health
curl http://localhost:8000/api/health/db

# Frontend health (if configured)
curl http://localhost:80/health
```

## 📚 Next Steps

1. **Customize Content**: Update project data in the database
2. **Configure AI**: Set up API keys for enhanced AI features
3. **Deploy**: Follow the [Deployment Guide](deployment/README.md)
4. **Develop**: Check out the [Development Guide](development/README.md)

## 🆘 Need Help?

- **Documentation**: Check the [main docs](README.md)
- **Issues**: Create an issue on GitHub
- **Community**: Join our Discord/Telegram

---

**Time to complete**: ~10 minutes  
**Difficulty**: Beginner-friendly  
**Support**: Full documentation available 