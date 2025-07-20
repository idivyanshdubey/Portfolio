# AI-Powered Data Science Portfolio

A modern, interactive portfolio website showcasing data science and AI skills with live demos and project showcases.

## 🚀 Quick Start

```bash
# Clone the repository
git clone <your-repo-url>
cd ai-portfolio

# Start with Docker (recommended)
docker-compose up -d

# Or run locally
cd backend && pip install -r requirements.txt && python -m uvicorn main:app --reload
cd frontend && npm install && npm start
```

**Access your application:**
- **Frontend**: http://localhost:80 (Docker) or http://localhost:3000 (local)
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## 🎯 Features

- **🤖 AI-Powered Chatbot**: Intelligent conversational agent with memory and tools
- **📊 Interactive Demos**: Live machine learning models and data visualization
- **💼 Project Showcase**: Detailed portfolio of data science projects
- **📝 Blog Section**: Technical write-ups and tutorials
- **🎨 Modern UI**: Responsive design with beautiful animations
- **📈 Real-time Analytics**: User interaction tracking and insights

## 🛠 Tech Stack

- **Frontend**: React.js + TypeScript + Tailwind CSS
- **Backend**: FastAPI (Python) + SQLAlchemy
- **Database**: PostgreSQL
- **AI/ML**: Custom agent system with memory and tools
- **Deployment**: Docker + GitHub Actions
- **Hosting**: Railway/Render

## 📚 Documentation

**📖 [Complete Documentation](docs/README.md)** - Start here for comprehensive guides

### Quick Links
- **[🚀 Quick Start Guide](docs/quick-start.md)** - Get running in 10 minutes
- **[🏗 System Architecture](docs/architecture.md)** - Technical overview
- **[🤖 AI Agent System](docs/ai-agent/README.md)** - AI chatbot capabilities
- **[🚀 Deployment Guide](docs/deployment/README.md)** - Production deployment
- **[📊 API Documentation](docs/api/README.md)** - Complete API reference
- **[🗄️ Database Setup](docs/database/README.md)** - Database configuration

## 🎯 AI Features

The portfolio features an advanced AI chatbot with:

- **🧠 Memory System**: Remembers conversations and user preferences
- **🔧 Tool Integration**: Weather, news, calculator, time/date, URL shortening
- **🎯 Context Awareness**: Sentiment analysis and topic tracking
- **🤖 Reasoning Chain**: Multi-step analysis with confidence scoring

## 📁 Project Structure

```
ai-portfolio/
├── frontend/          # React.js frontend
├── backend/           # FastAPI backend
│   └── ai_agent/      # AI agent system
├── docs/              # 📚 Comprehensive documentation
├── ml_models/         # Machine learning models
├── data/              # Sample datasets
└── docker/            # Docker configuration
```

## 🚀 Deployment

**Recommended Platforms:**
- **Railway** - Easy setup with PostgreSQL included
- **Render** - Generous free tier with auto-scaling
- **Vercel** - Great for frontend deployment

See the **[Deployment Guide](docs/deployment/README.md)** for detailed instructions.

## 🤝 Contributing

This is a personal portfolio project showcasing data science and AI skills.

## 📄 License

MIT License

---

**📖 [View Full Documentation](docs/README.md)** | **🚀 [Quick Start](docs/quick-start.md)** | **🤖 [AI Features](docs/ai-agent/README.md)** 