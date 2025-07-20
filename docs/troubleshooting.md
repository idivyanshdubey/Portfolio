# Troubleshooting Guide

Common issues and solutions for the AI Portfolio application.

## 🚨 Quick Fixes

### **Application Won't Start**

#### **Docker Issues**
```bash
# Stop all containers
docker-compose down

# Remove volumes (WARNING: This will delete data)
docker-compose down -v

# Rebuild images
docker-compose build --no-cache

# Start fresh
docker-compose up -d
```

#### **Port Conflicts**
```bash
# Check what's using the port
lsof -i :8000
lsof -i :80
lsof -i :3000

# Kill the process
kill -9 <PID>
```

#### **Permission Issues**
```bash
# Fix file permissions
chmod +x scripts/*.sh
chmod 755 frontend/build
chmod 755 backend/
```

## 🔧 Backend Issues

### **Database Connection Errors**

#### **PostgreSQL Not Running**
```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql

# Start PostgreSQL
sudo systemctl start postgresql

# Or with Docker
docker-compose restart postgres
```

#### **Connection Refused**
```bash
# Check database credentials in .env
DATABASE_URL=postgresql://user:password@localhost:5432/ai_portfolio

# Test connection manually
psql -U postgres -h localhost -p 5432 -d ai_portfolio

# Reset database
python init_db.py
```

#### **Common Database Errors**

**"password authentication failed"**
```bash
# Check .env file
cat .env | grep DATABASE

# Verify PostgreSQL authentication
sudo -u postgres psql -c "ALTER USER your_user PASSWORD 'your_password';"
```

**"database does not exist"**
```sql
-- Connect to PostgreSQL
psql -U postgres

-- Create database
CREATE DATABASE ai_portfolio;

-- Verify
\l
```

### **FastAPI Issues**

#### **Import Errors**
```bash
# Install dependencies
pip install -r requirements.txt

# Check Python version
python --version  # Should be 3.11+

# Virtual environment issues
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows
```

#### **Module Not Found**
```bash
# Check PYTHONPATH
echo $PYTHONPATH

# Add current directory to path
export PYTHONPATH=$PYTHONPATH:$(pwd)

# Or run from project root
cd backend
python -m uvicorn main:app --reload
```

#### **CORS Errors**
```python
# Check CORS configuration in main.py
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:80"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### **AI Agent Issues**

#### **API Key Problems**
```bash
# Check environment variables
echo $HUGGINGFACE_API_KEY
echo $OPENAI_API_KEY

# Set API keys
export HUGGINGFACE_API_KEY=your_key_here
export OPENAI_API_KEY=your_key_here
```

#### **Memory System Errors**
```bash
# Clear agent memory
curl -X DELETE "http://localhost:8000/api/chatbot/session/test-session"

# Check agent status
curl "http://localhost:8000/api/chatbot/agent/status"
```

## 🎨 Frontend Issues

### **Build Errors**

#### **Node Modules Issues**
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

#### **TypeScript Errors**
```bash
# Check TypeScript config
npx tsc --noEmit

# Fix common issues
npm install @types/react @types/react-dom
```

#### **Tailwind CSS Issues**
```bash
# Rebuild Tailwind
npx tailwindcss -i ./src/index.css -o ./dist/output.css --watch

# Check configuration
cat tailwind.config.js
```

### **Runtime Errors**

#### **API Connection Issues**
```typescript
// Check API URL configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Test API connection
fetch(`${API_BASE_URL}/api/health`)
  .then(response => response.json())
  .then(data => console.log(data));
```

#### **Component Errors**
```bash
# Check React Developer Tools
# Look for error boundaries
# Check console for detailed errors
```

## 🐳 Docker Issues

### **Container Won't Start**

#### **Image Build Failures**
```bash
# Clear Docker cache
docker system prune -a

# Rebuild without cache
docker-compose build --no-cache

# Check Docker logs
docker-compose logs
```

#### **Volume Issues**
```bash
# Check volume permissions
docker volume ls
docker volume inspect project_postgres_data

# Reset volumes (WARNING: Data loss)
docker-compose down -v
docker-compose up -d
```

#### **Network Issues**
```bash
# Check Docker network
docker network ls
docker network inspect project_default

# Restart Docker daemon
sudo systemctl restart docker
```

### **Performance Issues**

#### **High Memory Usage**
```bash
# Check container resources
docker stats

# Limit memory usage in docker-compose.yml
services:
  backend:
    deploy:
      resources:
        limits:
          memory: 512M
```

#### **Slow Build Times**
```bash
# Use multi-stage builds
# Optimize Dockerfile
# Use .dockerignore
```

## 🔍 Debugging Tools

### **Backend Debugging**

#### **Logging**
```python
import logging

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

logger.debug("Debug message")
logger.info("Info message")
logger.error("Error message")
```

#### **Health Checks**
```bash
# Test backend health
curl http://localhost:8000/api/health

# Test database health
curl http://localhost:8000/api/health/db

# Test AI agent
curl http://localhost:8000/api/chatbot/agent/status
```

### **Frontend Debugging**

#### **React Developer Tools**
- Install React Developer Tools browser extension
- Use Components tab for component inspection
- Use Profiler tab for performance analysis

#### **Console Debugging**
```javascript
// Add debug logging
console.log('Debug info:', data);
console.error('Error:', error);

// Use debugger statement
debugger;
```

### **Network Debugging**

#### **API Testing**
```bash
# Test API endpoints
curl -X GET "http://localhost:8000/api/projects"
curl -X POST "http://localhost:8000/api/chatbot/chat" \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello", "session_id": "test"}'
```

#### **CORS Testing**
```bash
# Test CORS headers
curl -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -X OPTIONS http://localhost:8000/api/chatbot/chat
```

## 📊 Performance Issues

### **Slow Loading Times**

#### **Frontend Optimization**
```bash
# Analyze bundle size
npm run build
npx webpack-bundle-analyzer build/static/js/*.js

# Optimize images
npm install imagemin imagemin-webp
```

#### **Backend Optimization**
```python
# Enable connection pooling
from sqlalchemy import create_engine

engine = create_engine(
    DATABASE_URL,
    pool_size=10,
    max_overflow=20,
    pool_pre_ping=True
)
```

### **Memory Leaks**

#### **Frontend Memory Issues**
```javascript
// Clean up event listeners
useEffect(() => {
  const handleResize = () => { /* ... */ };
  window.addEventListener('resize', handleResize);
  
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
```

#### **Backend Memory Issues**
```python
# Use async/await properly
# Close database connections
# Implement proper error handling
```

## 🔒 Security Issues

### **Environment Variables**
```bash
# Check for exposed secrets
grep -r "password\|secret\|key" . --exclude-dir=node_modules

# Use .env file properly
cp .env.example .env
# Edit .env with your values
```

### **CORS Configuration**
```python
# Secure CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://yourdomain.com"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)
```

## 📞 Getting Help

### **Before Asking for Help**

1. **Check the logs**
   ```bash
   docker-compose logs
   npm run build
   python -m pytest
   ```

2. **Verify your setup**
   ```bash
   # Check versions
   node --version
   python --version
   docker --version
   ```

3. **Test basic functionality**
   ```bash
   # Health checks
   curl http://localhost:8000/api/health
   curl http://localhost:80
   ```

### **Useful Commands**

```bash
# System information
uname -a
docker version
node --version
python --version

# Process information
ps aux | grep python
ps aux | grep node
docker ps

# Network information
netstat -tulpn | grep :8000
netstat -tulpn | grep :80
```

### **Common Error Messages**

| Error | Solution |
|-------|----------|
| `ModuleNotFoundError` | Install missing dependencies |
| `Connection refused` | Check if service is running |
| `Permission denied` | Fix file permissions |
| `Port already in use` | Kill process or change port |
| `Database connection failed` | Check database credentials |
| `CORS error` | Update CORS configuration |

## 🚀 Recovery Procedures

### **Complete Reset**
```bash
# Stop everything
docker-compose down -v

# Clear all data
rm -rf node_modules package-lock.json
rm -rf backend/__pycache__
rm -rf .env

# Reinstall everything
npm install
pip install -r requirements.txt

# Start fresh
docker-compose up -d
```

### **Database Reset**
```sql
-- Connect to PostgreSQL
psql -U postgres

-- Drop and recreate database
DROP DATABASE ai_portfolio;
CREATE DATABASE ai_portfolio;

-- Exit psql
\q
```

Then run:
```bash
python init_db.py
```

---

**Need more help?** Check the [main documentation](README.md) or create an issue on GitHub. 