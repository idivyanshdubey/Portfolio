# Deployment Guide

This guide provides comprehensive instructions for deploying your AI Portfolio application.

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose installed
- Node.js 18+ and npm
- Python 3.11+
- PostgreSQL database (or use Docker)

### Local Development
```bash
# Clone the repository
git clone <your-repo-url>
cd ai-portfolio

# Start all services with Docker Compose
docker-compose up -d

# Or run services individually
cd backend && python -m uvicorn main:app --reload
cd frontend && npm start
```

## 📋 Deployment Checklist

### ✅ Pre-deployment Checks
- [ ] All tests pass (`npm test` and `python -m pytest`)
- [ ] Frontend builds successfully (`npm run build`)
- [ ] Backend API starts without errors
- [ ] Database connection works
- [ ] Environment variables are configured
- [ ] Docker images build successfully

### ✅ Environment Variables
Set these environment variables for production:

```bash
# Database
DATABASE_URL=postgresql://user:password@host:port/database

# Email Services (choose one)
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_id
EMAILJS_PUBLIC_KEY=your_public_key

# Alternative email services
RESEND_API_KEY=your_resend_key
SMTP_SERVER=smtp.gmail.com
SMTP_USERNAME=your_email@gmail.com
SMTP_PASSWORD=your_app_password
```

## 🐳 Docker Deployment

### Using Docker Compose
```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Manual Docker Build
```bash
# Build backend
docker build -f docker/Dockerfile.backend -t portfolio-backend .

# Build frontend
docker build -f docker/Dockerfile.frontend -t portfolio-frontend .

# Run containers
docker run -d -p 8000:8000 --name backend portfolio-backend
docker run -d -p 80:80 --name frontend portfolio-frontend
```

## ☁️ Cloud Deployment

### Railway Deployment
1. Connect your GitHub repository to Railway
2. Set environment variables in Railway dashboard
3. Deploy using the provided `railway.json` configuration

### Render Deployment
1. Create a new Web Service in Render
2. Connect your GitHub repository
3. Set build command: `cd frontend && npm install && npm run build`
4. Set start command: `cd backend && python -m uvicorn main:app --host 0.0.0.0 --port $PORT`

### Vercel Deployment (Frontend Only)
1. Connect your repository to Vercel
2. Set build command: `cd frontend && npm install && npm run build`
3. Set output directory: `frontend/build`
4. Configure environment variables

## 🧪 Testing

### Run All Tests
```bash
# Backend tests
cd backend && python -m pytest tests/ -v

# Frontend tests
cd frontend && npm test -- --watchAll=false

# Run deployment test script
chmod +x scripts/test-deployment.sh
./scripts/test-deployment.sh
```

### Health Checks
- Backend: `GET /api/health`
- Frontend: `GET /health`
- Database: `GET /api/health/db`

## 🔧 Configuration

### Production Settings
Update these files for production:

1. **CORS Configuration** (`backend/main.py`)
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://yourdomain.com"],  # Update with your domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

2. **API Base URL** (`frontend/src/config/api.ts`)
```typescript
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://your-api-domain.com';
```

3. **Nginx Configuration** (`docker/nginx.conf`)
Update the server_name and proxy_pass URLs for your domain.

## 📊 Monitoring

### Logs
- Backend logs: `docker-compose logs backend`
- Frontend logs: `docker-compose logs frontend`
- Database logs: `docker-compose logs postgres`

### Metrics
- Application metrics: `/api/analytics`
- Health status: `/api/health`
- Database status: `/api/health/db`

## 🔒 Security

### SSL/TLS
- Use a reverse proxy (Nginx) with SSL certificates
- Configure HTTPS redirects
- Set secure headers in nginx.conf

### Environment Variables
- Never commit sensitive data to version control
- Use environment variables for all secrets
- Rotate API keys regularly

### Database Security
- Use strong passwords for database
- Restrict database access to application only
- Enable SSL for database connections

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Clear npm cache
   npm cache clean --force
   
   # Clear Docker cache
   docker system prune -a
   ```

2. **Database Connection Issues**
   ```bash
   # Check database status
   docker-compose logs postgres
   
   # Test connection
   python -c "from database import test_connection; print(test_connection())"
   ```

3. **API Not Responding**
   ```bash
   # Check backend logs
   docker-compose logs backend
   
   # Test API directly
   curl http://localhost:8000/api/health
   ```

4. **Frontend Build Issues**
   ```bash
   # Clear node_modules
   rm -rf frontend/node_modules
   npm install
   
   # Check for TypeScript errors
   npm run build
   ```

### Performance Optimization

1. **Frontend**
   - Enable gzip compression
   - Optimize images
   - Use CDN for static assets

2. **Backend**
   - Enable connection pooling
   - Implement caching
   - Monitor database queries

3. **Database**
   - Add indexes for frequently queried columns
   - Optimize query performance
   - Regular maintenance

## 📈 Scaling

### Horizontal Scaling
- Use load balancers for multiple instances
- Implement session management
- Configure database read replicas

### Vertical Scaling
- Increase container resources
- Optimize application code
- Use caching strategies

## 🔄 CI/CD Pipeline

The project includes GitHub Actions workflow (`.github/workflows/deploy.yml`) that:
- Runs tests on every push
- Builds Docker images
- Deploys to production (configure your platform)

### Customizing CI/CD
1. Update deployment platform in workflow
2. Add environment variables to GitHub Secrets
3. Configure deployment scripts for your platform

## 📞 Support

For deployment issues:
1. Check the logs: `docker-compose logs`
2. Run the test script: `./scripts/test-deployment.sh`
3. Verify environment variables
4. Test locally before deploying

---

**Remember**: Always test in a staging environment before deploying to production! 