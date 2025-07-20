# AI-Powered Data Science Portfolio

A modern, interactive portfolio website showcasing data science and AI skills with live demos and project showcases.

## 🚀 Features

- **Interactive AI Demos**: Live machine learning models (image classification, sentiment analysis, data visualization)
- **Project Showcase**: Detailed portfolio of data science projects
- **Blog Section**: Technical write-ups and tutorials
- **Modern UI**: Responsive design with beautiful animations
- **Real-time Analytics**: User interaction tracking and insights
- **AI-Powered Chatbot**: Intelligent conversational agent with memory, tools, and context awareness

## 🛠 Tech Stack

- **Frontend**: React.js + TypeScript + Tailwind CSS
- **Backend**: FastAPI (Python) + SQLAlchemy
- **Database**: PostgreSQL
- **AI/ML**: scikit-learn, pandas, numpy, matplotlib, seaborn
- **Deployment**: Docker + GitHub Actions
- **Hosting**: Render/Vercel

## 📁 Project Structure

```
ai-portfolio/
├── frontend/          # React.js frontend
├── backend/           # FastAPI backend
│   └── ai_agent/      # AI agent system with memory and tools
├── ml_models/         # Machine learning models
├── data/              # Sample datasets
├── docs/              # Documentation
└── docker/            # Docker configuration
```

## 🚀 Quick Start

1. Clone the repository
2. Set up the backend: `cd backend && pip install -r requirements.txt`
3. Set up the frontend: `cd frontend && npm install`
4. Run the development servers
5. Open http://localhost:3000

## 🤖 AI Agent System

The portfolio features an advanced AI chatbot powered by a sophisticated agent system:

### **Core Capabilities**
- **🧠 Memory System**: Remembers conversations, user preferences, and context
- **🔧 Tool Integration**: Weather, news, calculator, time/date, URL shortening
- **🎯 Context Awareness**: Sentiment analysis, topic tracking, personalized responses
- **🤖 Reasoning Chain**: Multi-step analysis with confidence scoring

### **API Endpoints**
- `POST /api/chatbot/chat` - Main chat with AI agent
- `GET /api/chatbot/agent/status` - Agent status and capabilities
- `GET /api/chatbot/tools` - Available tools
- `POST /api/chatbot/tools/execute` - Execute external tools

### **Features**
- **Persistent Memory**: Remembers conversations across sessions
- **External APIs**: Real-time weather, news, and utility tools
- **Personalization**: Adapts to user technical level and preferences
- **Scalability**: Supports multiple concurrent users

## 📝 Development Roadmap

- [x] Project structure setup
- [x] Backend API development
- [x] Frontend UI components
- [x] AI agent system integration
- [ ] ML model integration
- [ ] Interactive demos
- [ ] Deployment setup

## 🤝 Contributing

This is a personal portfolio project showcasing data science and AI skills.

## 📄 License

MIT License 