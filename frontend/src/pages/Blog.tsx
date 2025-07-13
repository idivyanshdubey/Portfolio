import React, { useState } from 'react';
import { Calendar, Clock, User, Tag, Search, Filter, X, Share2, Bookmark, ArrowRight, ExternalLink, MessageSquare, Heart } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = ['all', 'machine-learning', 'data-science', 'ai', 'tutorial', 'insights', 'web-development', 'career'];

  const blogPosts = [
    {
      id: 1,
      title: 'Introduction to Deep Learning with PyTorch',
      excerpt: 'A comprehensive guide to getting started with deep learning using PyTorch framework.',
      content: `Deep learning has revolutionized the field of artificial intelligence, enabling machines to learn complex patterns from data. PyTorch, developed by Facebook's AI Research lab, has become one of the most popular frameworks for deep learning due to its dynamic computational graph and intuitive Python interface.

## What is Deep Learning?
Deep learning is a subset of machine learning that uses neural networks with many layers (hence 'deep') to model complex relationships in data. It powers applications like image recognition, natural language processing, and autonomous vehicles.

## Why PyTorch?
PyTorch is favored for its:
- Dynamic computation graph (eager execution)
- Pythonic and intuitive API
- Strong community and ecosystem
- Seamless integration with CUDA for GPU acceleration

## Getting Started with PyTorch
1. **Installation**
   \`\`\`bash
   pip install torch torchvision
   \`\`\`
2. **Basic Tensor Operations**
   \`\`\`python
   import torch
   x = torch.rand(5, 3)
   print(x)
   \`\`\`

## Building Your First Neural Network
Let's build a simple feedforward neural network for image classification using the MNIST dataset.

\`\`\`python
import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import datasets, transforms

# Data loading
transform = transforms.Compose([transforms.ToTensor()])
trainset = datasets.MNIST(root='./data', train=True, download=True, transform=transform)
trainloader = torch.utils.data.DataLoader(trainset, batch_size=64, shuffle=True)

# Model definition
class Net(nn.Module):
    def __init__(self):
        super(Net, self).__init__()
        self.fc = nn.Sequential(
            nn.Flatten(),
            nn.Linear(28*28, 128),
            nn.ReLU(),
            nn.Linear(128, 10)
        )
    def forward(self, x):
        return self.fc(x)

model = Net()
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# Training loop
for epoch in range(5):
    for images, labels in trainloader:
        optimizer.zero_grad()
        output = model(images)
        loss = criterion(output, labels)
        loss.backward()
        optimizer.step()
\`\`\`

## Advanced Topics
- **Convolutional Neural Networks (CNNs):** For image data
- **Recurrent Neural Networks (RNNs):** For sequential data
- **Transfer Learning:** Using pre-trained models for new tasks

## Best Practices
- Use GPU acceleration for faster training
- Monitor training/validation loss to avoid overfitting
- Use data augmentation for better generalization

## Real-World Applications
- Computer vision (object detection, segmentation)
- Natural language processing (text classification, translation)
- Healthcare (disease prediction, medical imaging)

## FAQs
**Q: Is PyTorch better than TensorFlow?**
A: Both are powerful; PyTorch is more pythonic and dynamic, while TensorFlow is more production-oriented.

**Q: How do I deploy a PyTorch model?**
A: Use TorchScript for model serialization, or ONNX for interoperability.

## Conclusion
Whether you're a beginner or an experienced developer, PyTorch provides the tools and flexibility to build state-of-the-art deep learning models. Start experimenting today and join the vibrant PyTorch community!`,
      author: 'Divyansh Dubey',
      date: '2025-03-22',
      readTime: '12 min read',
      category: 'machine-learning',
      tags: ['PyTorch', 'Deep Learning', 'Neural Networks'],
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
      featured: true
    },
    {
      id: 2,
      title: 'Building Real-time Analytics Dashboards',
      excerpt: 'Learn how to create interactive dashboards for real-time data visualization.',
      content: `Real-time analytics dashboards are essential for modern businesses that need to make data-driven decisions quickly. In this comprehensive guide, we'll explore how to build interactive dashboards that provide real-time insights into your data.

## What is a Real-time Analytics Dashboard?
A real-time analytics dashboard is a web application that displays live data with minimal latency, allowing users to monitor key metrics and make informed decisions. These dashboards typically include charts, graphs, tables, and interactive elements that update automatically.

## Key Technologies We'll Use
- **Frontend**: React with TypeScript for type safety
- **Backend**: FastAPI for high-performance API development
- **Database**: PostgreSQL for structured data, Redis for caching
- **Real-time Updates**: WebSocket connections and Server-Sent Events
- **Visualization**: Chart.js, D3.js, and Plotly for interactive charts
- **Styling**: Tailwind CSS for responsive design

## Architecture Overview
Our dashboard will follow a microservices architecture with three main components:

**Frontend (React + TypeScript)**
- Real-time UI with interactive charts
- Responsive design for all devices
- WebSocket connections for live updates

**Backend (FastAPI + Python)**
- REST APIs for data retrieval
- WebSocket endpoints for real-time communication
- Authentication and authorization

**Database (PostgreSQL + Redis)**
- PostgreSQL for structured data storage
- Redis for caching and session management
- Analytics and reporting capabilities

## Setting Up the Project Structure

### 1. Frontend Setup
\`\`\`bash
npx create-react-app analytics-dashboard --template typescript
cd analytics-dashboard
npm install chart.js react-chartjs-2 @types/chart.js
npm install socket.io-client
npm install tailwindcss @tailwindcss/forms
\`\`\`

### 2. Backend Setup
\`\`\`bash
pip install fastapi uvicorn sqlalchemy psycopg2-binary redis
pip install websockets python-socketio
\`\`\`

## Building the Dashboard Components

### Real-time Chart Component
\`\`\`typescript
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { io } from 'socket.io-client';

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
}

const RealTimeChart: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [{
      label: 'Real-time Data',
      data: [],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)'
    }]
  });

  useEffect(() => {
    const socket = io('http://localhost:8000');
    
    socket.on('data-update', (newData) => {
      setChartData(prev => ({
        labels: [...prev.labels, new Date().toLocaleTimeString()],
        datasets: [{
          ...prev.datasets[0],
          data: [...prev.datasets[0].data, newData.value]
        }]
      }));
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Real-time Metrics</h3>
      <Line data={chartData} options={{
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }} />
    </div>
  );
};
\`\`\`

### Backend API with WebSocket Support
\`\`\`python
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import json
from datetime import datetime

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)

manager = ConnectionManager()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            # Process real-time data
            await manager.broadcast(json.dumps({
                "timestamp": datetime.now().isoformat(),
                "value": float(data)
            }))
    except WebSocketDisconnect:
        manager.disconnect(websocket)

@app.get("/api/metrics")
async def get_metrics():
    return {
        "total_users": 1250,
        "active_sessions": 89,
        "data_points": 45678
    }
\`\`\`

## Advanced Features

### 1. Data Filtering and Search
\`\`\`typescript
const DashboardFilters: React.FC = () => {
  const [filters, setFilters] = useState({
    dateRange: '7d',
    metric: 'all',
    region: 'global'
  });

  return (
    <div className="flex gap-4 mb-6">
      <select 
        value={filters.dateRange}
        onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
        className="px-4 py-2 border rounded-lg"
      >
        <option value="1d">Last 24 hours</option>
        <option value="7d">Last 7 days</option>
        <option value="30d">Last 30 days</option>
      </select>
      
      <input 
        type="text"
        placeholder="Search metrics..."
        className="px-4 py-2 border rounded-lg flex-1"
      />
    </div>
  );
};
\`\`\`

### 2. Export Functionality
\`\`\`typescript
const exportData = async (format: 'csv' | 'json' | 'pdf') => {
  const response = await fetch('/api/export', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ format, filters })
  });
  
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = \`analytics-\${format}-\${Date.now()}.\${format}\`;
  a.click();
};
\`\`\`

## Performance Optimization

### 1. Data Caching
\`\`\`python
import redis
from functools import lru_cache

redis_client = redis.Redis(host='localhost', port=6379, db=0)

@lru_cache(maxsize=128)
def get_cached_metrics(time_range: str):
    cache_key = f"metrics:{time_range}"
    cached_data = redis_client.get(cache_key)
    
    if cached_data:
        return json.loads(cached_data)
    
    # Fetch from database
    data = fetch_metrics_from_db(time_range)
    redis_client.setex(cache_key, 300, json.dumps(data))  # Cache for 5 minutes
    return data
\`\`\`

### 2. Responsive Design
\`\`\`css
/* Tailwind CSS classes for responsive design */
.dashboard-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6;
}

.chart-container {
  @apply bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow;
}
\`\`\`

## Best Practices

### 1. Error Handling
- Implement retry mechanisms for failed API calls
- Show user-friendly error messages
- Log errors for debugging

### 2. Security
- Implement authentication and authorization
- Validate all user inputs
- Use HTTPS in production
- Implement rate limiting

### 3. Monitoring
- Set up application performance monitoring (APM)
- Monitor WebSocket connections
- Track dashboard usage metrics

## Deployment Strategy

### 1. Frontend Deployment (Netlify/Vercel)
\`\`\`bash
npm run build
# Deploy to Netlify or Vercel
\`\`\`

### 2. Backend Deployment (Docker)
\`\`\`dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
\`\`\`

## Conclusion
Building real-time analytics dashboards requires careful consideration of architecture, performance, and user experience. By following the patterns and code examples in this guide, you'll be able to create robust, scalable dashboards that provide valuable insights to your users.

## Next Steps
- Implement user authentication and role-based access
- Add more advanced visualizations (heatmaps, 3D charts)
- Set up automated testing and CI/CD pipelines
- Monitor and optimize performance based on usage patterns`,
      author: 'Divyansh Dubey',
      date: '2025-02-14',
      readTime: '15 min read',
      category: 'data-science',
      tags: ['Analytics', 'Dashboard', 'Real-time'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
      featured: false
    },
    {
      id: 3,
      title: 'Mastering Spring Boot for Enterprise Applications',
      excerpt: 'A deep dive into building scalable enterprise applications with Spring Boot framework.',
      content: `Spring Boot has become the go-to framework for building enterprise-grade Java applications. Its convention-over-configuration approach and extensive ecosystem make it ideal for developing robust, scalable applications that can handle the demands of modern business environments.

## What is Spring Boot?
Spring Boot is an opinionated framework that simplifies the development of Spring-based applications. It provides auto-configuration, embedded servers, and production-ready features out of the box, making it perfect for microservices and cloud-native applications.

## Key Features of Spring Boot
- **Auto-configuration**: Automatically configures beans based on classpath
- **Embedded servers**: Built-in Tomcat, Jetty, or Undertow
- **Starter dependencies**: Simplified dependency management
- **Actuator**: Production-ready monitoring and metrics
- **Externalized configuration**: Environment-specific properties
- **No code generation**: No XML configuration required

## Project Structure and Setup

### 1. Creating a Spring Boot Project
\`\`\`bash
# Using Spring Initializr
curl https://start.spring.io/starter.zip \
  -d type=maven-project \
  -d language=java \
  -d bootVersion=3.2.0 \
  -d baseDir=enterprise-app \
  -d groupId=com.example \
  -d artifactId=enterprise-app \
  -d name=enterprise-app \
  -d description="Enterprise Spring Boot Application" \
  -d packageName=com.example.enterprise \
  -d packaging=jar \
  -d javaVersion=17 \
  -d dependencies=web,data-jpa,security,actuator \
  -o enterprise-app.zip
\`\`\`

### 2. Maven Dependencies
\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0">
    <modelVersion>4.0.0</modelVersion>
    
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.0</version>
    </parent>
    
    <groupId>com.example</groupId>
    <artifactId>enterprise-app</artifactId>
    <version>1.0.0</version>
    
    <properties>
        <java.version>17</java.version>
    </properties>
    
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <dependency>
            <groupId>org.postgresql</groupId>
            <artifactId>postgresql</artifactId>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-api</artifactId>
            <version>0.11.5</version>
        </dependency>
    </dependencies>
</project>
\`\`\`

## Core Application Structure

### 1. Main Application Class
\`\`\`java
package com.example.enterprise;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableAsync
@EnableCaching
public class EnterpriseApplication {
    public static void main(String[] args) {
        SpringApplication.run(EnterpriseApplication.class, args);
    }
}
\`\`\`

### 2. Entity Classes
\`\`\`java
package com.example.enterprise.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String email;
    
    @Column(nullable = false)
    private String password;
    
    @Column(name = "full_name")
    private String fullName;
    
    @Enumerated(EnumType.STRING)
    private UserRole role;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    // Getters and setters
}
\`\`\`

### 3. Repository Layer
\`\`\`java
package com.example.enterprise.repository;

import com.example.enterprise.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    
    @Query("SELECT u FROM User u WHERE u.role = :role")
    List<User> findByRole(@Param("role") UserRole role);
    
    boolean existsByEmail(String email);
}
\`\`\`

### 4. Service Layer
\`\`\`java
package com.example.enterprise.service;

import com.example.enterprise.entity.User;
import com.example.enterprise.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    public User createUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new UserAlreadyExistsException("User with email already exists");
        }
        
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }
    
    public User getUserById(Long id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new UserNotFoundException("User not found"));
    }
    
    public User updateUser(Long id, User userDetails) {
        User user = getUserById(id);
        user.setFullName(userDetails.getFullName());
        user.setEmail(userDetails.getEmail());
        return userRepository.save(user);
    }
    
    public void deleteUser(Long id) {
        User user = getUserById(id);
        userRepository.delete(user);
    }
}
\`\`\`

### 5. REST Controller
\`\`\`java
package com.example.enterprise.controller;

import com.example.enterprise.entity.User;
import com.example.enterprise.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User createdUser = userService.createUser(user);
        return ResponseEntity.ok(createdUser);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        User updatedUser = userService.updateUser(id, user);
        return ResponseEntity.ok(updatedUser);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
\`\`\`

## Security Configuration

### 1. JWT Security Configuration
\`\`\`java
package com.example.enterprise.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/public/**").permitAll()
                .requestMatchers("/actuator/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
        
        return http.build();
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter();
    }
}
\`\`\`

### 2. JWT Utility Class
\`\`\`java
package com.example.enterprise.util;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.util.Date;

@Component
public class JwtTokenUtil {
    
    @Value("\${jwt.secret}")
    private String secret;
    
    @Value("\${jwt.expiration}")
    private Long expiration;
    
    public String generateToken(String username) {
        return Jwts.builder()
            .setSubject(username)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + expiration))
            .signWith(SignatureAlgorithm.HS512, secret)
            .compact();
    }
    
    public String getUsernameFromToken(String token) {
        return Jwts.parser()
            .setSigningKey(secret)
            .parseClaimsJws(token)
            .getBody()
            .getSubject();
    }
    
    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(secret).parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
}
\`\`\`

## Database Configuration

### 1. Application Properties
\`\`\`properties
# Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/enterprise_db
spring.datasource.username=postgres
spring.datasource.password=password
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.properties.hibernate.format_sql=true

# JWT Configuration
jwt.secret=your-secret-key-here
jwt.expiration=86400000

# Actuator Configuration
management.endpoints.web.exposure.include=health,info,metrics,prometheus
management.endpoint.health.show-details=always

# Logging Configuration
logging.level.com.example.enterprise=DEBUG
logging.level.org.springframework.security=DEBUG
\`\`\`

### 2. Database Migration with Flyway
\`\`\`sql
-- V1__Create_users_table.sql
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    role VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- V2__Create_audit_logs_table.sql
CREATE TABLE audit_logs (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    details TEXT,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

## Testing Strategy

### 1. Unit Tests
\`\`\`java
package com.example.enterprise.service;

import com.example.enterprise.entity.User;
import com.example.enterprise.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    
    @Mock
    private UserRepository userRepository;
    
    @Mock
    private PasswordEncoder passwordEncoder;
    
    @InjectMocks
    private UserService userService;
    
    @Test
    void createUser_Success() {
        // Given
        User user = new User();
        user.setEmail("test@example.com");
        user.setPassword("password");
        
        when(userRepository.existsByEmail("test@example.com")).thenReturn(false);
        when(passwordEncoder.encode("password")).thenReturn("encoded_password");
        when(userRepository.save(any(User.class))).thenReturn(user);
        
        // When
        User result = userService.createUser(user);
        
        // Then
        assertNotNull(result);
        verify(userRepository).save(user);
        verify(passwordEncoder).encode("password");
    }
}
\`\`\`

### 2. Integration Tests
\`\`\`java
package com.example.enterprise.controller;

import com.example.enterprise.entity.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureWebMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureWebMvc
class UserControllerIntegrationTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    @Test
    void createUser_Success() throws Exception {
        User user = new User();
        user.setEmail("test@example.com");
        user.setPassword("password");
        user.setFullName("Test User");
        
        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(user)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.email").value("test@example.com"));
    }
}
\`\`\`

## Performance Optimization

### 1. Caching Configuration
\`\`\`java
package com.example.enterprise.config;

import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.concurrent.ConcurrentMapCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableCaching
public class CacheConfig {
    
    @Bean
    public CacheManager cacheManager() {
        return new ConcurrentMapCacheManager("users", "products");
    }
}
\`\`\`

### 2. Async Processing
\`\`\`java
package com.example.enterprise.service;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import java.util.concurrent.CompletableFuture;

@Service
public class AsyncService {
    
    @Async
    public CompletableFuture<String> processAsyncTask(String data) {
        // Simulate long-running task
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        return CompletableFuture.completedFuture("Processed: " + data);
    }
}
\`\`\`

## Monitoring and Observability

### 1. Custom Metrics
\`\`\`java
package com.example.enterprise.metrics;

import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import org.springframework.stereotype.Component;

@Component
public class CustomMetrics {
    
    private final Counter userCreationCounter;
    
    public CustomMetrics(MeterRegistry meterRegistry) {
        this.userCreationCounter = Counter.builder("user.creation")
            .description("Number of users created")
            .register(meterRegistry);
    }
    
    public void incrementUserCreation() {
        userCreationCounter.increment();
    }
}
\`\`\`

### 2. Health Checks
\`\`\`java
package com.example.enterprise.health;

import org.springframework.boot.actuator.health.Health;
import org.springframework.boot.actuator.health.HealthIndicator;
import org.springframework.stereotype.Component;

@Component
public class CustomHealthIndicator implements HealthIndicator {
    
    @Override
    public Health health() {
        // Add custom health check logic
        return Health.up()
            .withDetail("database", "connected")
            .withDetail("cache", "available")
            .build();
    }
}
\`\`\`

## Deployment and DevOps

### 1. Docker Configuration
\`\`\`dockerfile
FROM openjdk:17-jdk-slim
VOLUME /tmp
COPY target/enterprise-app-1.0.0.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
\`\`\`

### 2. Kubernetes Deployment
\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: enterprise-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: enterprise-app
  template:
    metadata:
      labels:
        app: enterprise-app
    spec:
      containers:
      - name: enterprise-app
        image: enterprise-app:1.0.0
        ports:
        - containerPort: 8080
        env:
        - name: SPRING_PROFILES_ACTIVE
          value: "production"
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: url
---
apiVersion: v1
kind: Service
metadata:
  name: enterprise-app-service
spec:
  selector:
    app: enterprise-app
  ports:
  - port: 80
    targetPort: 8080
  type: LoadBalancer
\`\`\`

## Best Practices

### 1. Exception Handling
- Use @ControllerAdvice for global exception handling
- Create custom exceptions for business logic
- Implement proper logging and monitoring
- Return appropriate HTTP status codes

### 2. Validation
- Use Bean Validation annotations
- Implement custom validators
- Validate input at multiple layers
- Sanitize user inputs

### 3. Security
- Implement proper authentication and authorization
- Use HTTPS in production
- Validate JWT tokens
- Implement rate limiting
- Use secure headers

### 4. Performance
- Use connection pooling
- Implement caching strategies
- Optimize database queries
- Use async processing where appropriate
- Monitor application metrics

## Conclusion
Spring Boot provides a robust foundation for building enterprise applications. By following the patterns and best practices outlined in this guide, you can create scalable, maintainable, and secure applications that meet the demands of modern business environments.

## Next Steps
- Implement advanced security features (OAuth2, SAML)
- Add more comprehensive testing strategies
- Implement event-driven architecture with Spring Cloud Stream
- Set up CI/CD pipelines with GitHub Actions or Jenkins
- Monitor application performance with APM tools`,
      author: 'Divyansh Dubey',
      date: '2025-05-08',
      readTime: '18 min read',
      category: 'web-development',
      tags: ['Spring Boot', 'Java', 'Enterprise'],
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=250&fit=crop',
      featured: true
    },
    {
      id: 4,
      title: 'The Future of AI in Data Science',
      excerpt: 'Exploring emerging trends and technologies shaping the future of artificial intelligence.',
      content: `Artificial Intelligence is rapidly evolving, with new breakthroughs happening almost daily. In this comprehensive exploration, we'll dive deep into the cutting-edge developments in AI and how they're fundamentally transforming the field of data science.

From large language models like GPT-4 to advanced computer vision systems, we'll examine the technologies that are pushing the boundaries of what's possible. We'll also discuss the ethical implications, challenges, and opportunities that come with these advancements.

## The AI Revolution: Current State and Future Trajectory

### Large Language Models (LLMs) and Their Impact
Large Language Models have revolutionized how we interact with AI systems. Models like GPT-4, Claude, and LLaMA are not just text generators—they're becoming the foundation for a new paradigm of AI applications.

**Key Developments:**
- **Multimodal Capabilities**: Modern LLMs can process text, images, audio, and video
- **Reasoning Abilities**: Advanced reasoning and problem-solving capabilities
- **Code Generation**: Sophisticated code generation and debugging assistance
- **Context Understanding**: Improved understanding of context and nuance

**Business Applications:**
\`\`\`python
# Example: AI-powered customer service chatbot
import openai
from typing import Dict, Any

class AICustomerService:
    def __init__(self, api_key: str):
        self.client = openai.OpenAI(api_key=api_key)
    
    def generate_response(self, user_query: str, context: Dict[str, Any]) -> str:
        prompt = f"""
        Context: {context}
        User Query: {user_query}
        
        Provide a helpful, accurate response based on the context.
        """
        
        response = self.client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a helpful customer service representative."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=500,
            temperature=0.7
        )
        
        return response.choices[0].message.content
\`\`\`

### Federated Learning and Privacy-Preserving AI
Federated learning enables AI models to learn from decentralized data without compromising privacy. This is crucial for industries like healthcare and finance.

**Benefits:**
- **Privacy Protection**: Data never leaves the local device
- **Regulatory Compliance**: Meets GDPR and other privacy regulations
- **Scalability**: Can work with massive distributed datasets
- **Cost Efficiency**: Reduces data transfer and storage costs

**Implementation Example:**
\`\`\`python
import torch
import torch.nn as nn
from typing import List, Dict

class FederatedLearning:
    def __init__(self, model: nn.Module):
        self.global_model = model
        self.client_models = []
    
    def train_client(self, client_data: torch.Tensor, client_labels: torch.Tensor) -> Dict[str, torch.Tensor]:
        """Train model on client data and return gradients"""
        model = self.global_model.clone()
        optimizer = torch.optim.Adam(model.parameters())
        criterion = nn.CrossEntropyLoss()
        
        # Local training
        for epoch in range(10):
            optimizer.zero_grad()
            outputs = model(client_data)
            loss = criterion(outputs, client_labels)
            loss.backward()
            optimizer.step()
        
        # Return model parameters for aggregation
        return {name: param.data.clone() for name, param in model.named_parameters()}
    
    def aggregate_models(self, client_updates: List[Dict[str, torch.Tensor]]):
        """Aggregate client model updates"""
        with torch.no_grad():
            for name, param in self.global_model.named_parameters():
                # Simple averaging of parameters
                avg_param = torch.stack([update[name] for update in client_updates]).mean(0)
                param.data.copy_(avg_param)
\`\`\`

## Quantum Computing and AI

### Quantum Machine Learning
Quantum computing promises to revolutionize AI by solving problems that are intractable for classical computers.

**Quantum Algorithms for AI:**
- **Quantum Neural Networks**: Leveraging quantum superposition for parallel processing
- **Quantum Support Vector Machines**: Exponential speedup for certain problems
- **Quantum Generative Models**: Creating quantum-enhanced generative AI

**Implementation with Qiskit:**
\`\`\`python
from qiskit import QuantumCircuit, Aer, execute
from qiskit.circuit.library import ZZFeatureMap
from qiskit_machine_learning.algorithms import VQC
from qiskit_machine_learning.neural_networks import CircuitQNN

class QuantumNeuralNetwork:
    def __init__(self, num_qubits: int, num_layers: int):
        self.num_qubits = num_qubits
        self.num_layers = num_layers
        self.circuit = self._create_circuit()
    
    def _create_circuit(self) -> QuantumCircuit:
        """Create a parameterized quantum circuit"""
        qc = QuantumCircuit(self.num_qubits)
        
        # Feature map
        feature_map = ZZFeatureMap(self.num_qubits)
        qc.compose(feature_map, inplace=True)
        
        # Variational layers
        for layer in range(self.num_layers):
            # Rotation gates
            for i in range(self.num_qubits):
                qc.rx(f"theta_{layer}_{i}", i)
                qc.ry(f"phi_{layer}_{i}", i)
            
            # Entangling gates
            for i in range(self.num_qubits - 1):
                qc.cx(i, i + 1)
        
        return qc
    
    def predict(self, input_data: np.ndarray, parameters: np.ndarray) -> float:
        """Make prediction using quantum circuit"""
        # Bind parameters to circuit
        bound_circuit = self.circuit.bind_parameters(parameters)
        
        # Execute on quantum simulator
        backend = Aer.get_backend('qasm_simulator')
        job = execute(bound_circuit, backend, shots=1000)
        result = job.result()
        
        # Process results
        counts = result.get_counts()
        return self._process_counts(counts)
\`\`\`

## Edge AI and IoT Integration

### Real-time AI Processing
Edge AI brings intelligence to devices at the network edge, enabling real-time processing without cloud dependency.

**Applications:**
- **Autonomous Vehicles**: Real-time object detection and decision making
- **Smart Cities**: Traffic optimization and environmental monitoring
- **Healthcare**: Wearable devices with AI-powered diagnostics
- **Manufacturing**: Predictive maintenance and quality control

**Edge AI Implementation:**
\`\`\`python
import tensorflow as tf
import numpy as np
from typing import Tuple

class EdgeAISystem:
    def __init__(self, model_path: str):
        # Load optimized model for edge deployment
        self.model = tf.lite.Interpreter(model_path=model_path)
        self.model.allocate_tensors()
        
        # Get input and output details
        self.input_details = self.model.get_input_details()
        self.output_details = self.model.get_output_details()
    
    def preprocess_data(self, raw_data: np.ndarray) -> np.ndarray:
        """Preprocess data for edge inference"""
        # Normalize and resize data
        processed_data = raw_data.astype(np.float32) / 255.0
        processed_data = np.expand_dims(processed_data, axis=0)
        return processed_data
    
    def predict(self, input_data: np.ndarray) -> Tuple[np.ndarray, float]:
        """Make prediction with timing"""
        import time
        
        # Preprocess
        processed_data = self.preprocess_data(input_data)
        
        # Set input tensor
        self.model.set_tensor(self.input_details[0]['index'], processed_data)
        
        # Measure inference time
        start_time = time.time()
        self.model.invoke()
        inference_time = time.time() - start_time
        
        # Get output
        output_data = self.model.get_tensor(self.output_details[0]['index'])
        
        return output_data, inference_time
    
    def optimize_for_edge(self, model: tf.keras.Model) -> bytes:
        """Convert model to TensorFlow Lite for edge deployment"""
        converter = tf.lite.TFLiteConverter.from_keras_model(model)
        converter.optimizations = [tf.lite.Optimize.DEFAULT]
        converter.target_spec.supported_types = [tf.float16]
        tflite_model = converter.convert()
        return tflite_model
\`\`\`

## Explainable AI and Model Interpretability

### Understanding AI Decisions
As AI systems become more complex, understanding their decision-making process becomes crucial for trust and accountability.

**Techniques for Explainable AI:**
- **SHAP (SHapley Additive exPlanations)**: Game theory-based feature importance
- **LIME (Local Interpretable Model-agnostic Explanations)**: Local linear approximations
- **Grad-CAM**: Gradient-based class activation mapping
- **Counterfactual Explanations**: "What-if" scenarios

**Implementation Example:**
\`\`\`python
import shap
import lime
import lime.lime_tabular
import numpy as np
from sklearn.ensemble import RandomForestClassifier

class ExplainableAI:
    def __init__(self, model, feature_names: List[str]):
        self.model = model
        self.feature_names = feature_names
        self.explainer = shap.TreeExplainer(model)
    
    def explain_prediction(self, instance: np.ndarray) -> Dict[str, Any]:
        """Generate multiple explanations for a prediction"""
        explanations = {}
        
        # SHAP explanation
        shap_values = self.explainer.shap_values(instance)
        explanations['shap'] = {
            'values': shap_values,
            'feature_importance': dict(zip(self.feature_names, shap_values[0]))
        }
        
        # LIME explanation
        lime_explainer = lime.lime_tabular.LimeTabularExplainer(
            training_data=np.random.rand(100, len(self.feature_names)),
            feature_names=self.feature_names,
            class_names=['class_0', 'class_1'],
            mode='classification'
        )
        
        lime_exp = lime_explainer.explain_instance(
            instance[0], 
            self.model.predict_proba,
            num_features=len(self.feature_names)
        )
        
        explanations['lime'] = {
            'explanation': lime_exp,
            'feature_weights': lime_exp.as_list()
        }
        
        return explanations
    
    def generate_counterfactual(self, instance: np.ndarray, target_class: int) -> np.ndarray:
        """Generate counterfactual explanation"""
        # Simple counterfactual generation
        counterfactual = instance.copy()
        
        # Find most important feature and modify it
        shap_values = self.explainer.shap_values(instance)
        most_important_idx = np.argmax(np.abs(shap_values[0]))
        
        # Modify the most important feature
        counterfactual[0, most_important_idx] *= 1.5
        
        return counterfactual
\`\`\`

## AI Governance and Responsible AI

### Ethical AI Development
As AI systems become more powerful, ensuring they are developed and deployed responsibly is paramount.

**Key Principles:**
- **Fairness**: Ensuring AI systems don't discriminate
- **Transparency**: Making AI decisions understandable
- **Accountability**: Establishing clear responsibility for AI outcomes
- **Privacy**: Protecting user data and privacy
- **Safety**: Ensuring AI systems are safe and secure

**AI Governance Framework:**
\`\`\`python
from typing import Dict, List, Any
import json
import logging

class AIGovernance:
    def __init__(self):
        self.ethical_guidelines = self._load_guidelines()
        self.bias_detection_tools = self._setup_bias_detection()
    
    def _load_guidelines(self) -> Dict[str, Any]:
        """Load ethical AI guidelines"""
        return {
            "fairness_threshold": 0.8,
            "privacy_requirements": ["data_minimization", "purpose_limitation"],
            "transparency_requirements": ["model_documentation", "decision_explanation"],
            "safety_requirements": ["robustness_testing", "adversarial_training"]
        }
    
    def audit_model(self, model, test_data: np.ndarray, 
                   demographic_data: Dict[str, np.ndarray]) -> Dict[str, Any]:
        """Comprehensive AI model audit"""
        audit_results = {}
        
        # Fairness audit
        audit_results['fairness'] = self._audit_fairness(model, test_data, demographic_data)
        
        # Privacy audit
        audit_results['privacy'] = self._audit_privacy(model, test_data)
        
        # Safety audit
        audit_results['safety'] = self._audit_safety(model, test_data)
        
        return audit_results
    
    def _audit_fairness(self, model, test_data: np.ndarray, 
                        demographic_data: Dict[str, np.ndarray]) -> Dict[str, float]:
        """Audit model for fairness across demographic groups"""
        fairness_metrics = {}
        
        for group_name, group_indices in demographic_data.items():
            group_data = test_data[group_indices]
            group_predictions = model.predict(group_data)
            
            # Calculate fairness metrics
            fairness_metrics[f'{group_name}_accuracy'] = np.mean(group_predictions)
            fairness_metrics[f'{group_name}_precision'] = self._calculate_precision(group_predictions)
            fairness_metrics[f'{group_name}_recall'] = self._calculate_recall(group_predictions)
        
        return fairness_metrics
    
    def generate_compliance_report(self, audit_results: Dict[str, Any]) -> str:
        """Generate compliance report for regulatory requirements"""
        report = {
            "audit_date": datetime.now().isoformat(),
            "compliance_status": "PASS" if self._check_compliance(audit_results) else "FAIL",
            "audit_results": audit_results,
            "recommendations": self._generate_recommendations(audit_results)
        }
        
        return json.dumps(report, indent=2)
\`\`\`

## Industry Transformations

### Healthcare AI
AI is revolutionizing healthcare with applications in diagnosis, drug discovery, and personalized medicine.

**Key Applications:**
- **Medical Imaging**: AI-powered radiology and pathology analysis
- **Drug Discovery**: Accelerating pharmaceutical research
- **Personalized Medicine**: Tailoring treatments to individual patients
- **Predictive Analytics**: Forecasting disease outbreaks and patient outcomes

### Financial Services AI
The financial industry is leveraging AI for risk assessment, fraud detection, and algorithmic trading.

**Applications:**
- **Credit Scoring**: More accurate risk assessment
- **Fraud Detection**: Real-time transaction monitoring
- **Algorithmic Trading**: Automated trading strategies
- **Customer Service**: AI-powered chatbots and virtual assistants

### Manufacturing AI
Smart manufacturing is using AI for predictive maintenance, quality control, and supply chain optimization.

**Use Cases:**
- **Predictive Maintenance**: Preventing equipment failures
- **Quality Control**: Automated inspection systems
- **Supply Chain Optimization**: Demand forecasting and inventory management
- **Robotics**: Collaborative robots and autonomous systems

## Skills for the Future

### Technical Skills
- **Deep Learning**: PyTorch, TensorFlow, and advanced neural network architectures
- **Natural Language Processing**: Transformers, BERT, and language models
- **Computer Vision**: CNN architectures, object detection, and image segmentation
- **Reinforcement Learning**: Q-learning, policy gradients, and multi-agent systems
- **Quantum Computing**: Quantum algorithms and quantum machine learning

### Soft Skills
- **Ethical Reasoning**: Understanding AI ethics and bias
- **Communication**: Explaining complex AI concepts to non-technical stakeholders
- **Problem Solving**: Creative approaches to AI challenges
- **Collaboration**: Working in interdisciplinary teams

## Challenges and Opportunities

### Current Challenges
- **Data Quality**: Ensuring high-quality, diverse training data
- **Computational Resources**: Managing the cost of AI model training
- **Regulatory Compliance**: Navigating evolving AI regulations
- **Talent Shortage**: Finding skilled AI professionals

### Future Opportunities
- **Democratization of AI**: Making AI tools accessible to more people
- **AI-Augmented Intelligence**: Enhancing human capabilities with AI
- **Sustainable AI**: Developing energy-efficient AI systems
- **AI for Social Good**: Addressing global challenges with AI

## Conclusion
The future of AI in data science is incredibly promising, with new breakthroughs happening at an unprecedented pace. As we move forward, it's crucial to balance innovation with responsibility, ensuring that AI technologies benefit society while addressing potential risks and challenges.

The key to success in this rapidly evolving field is continuous learning, ethical development practices, and a commitment to using AI for positive impact. Whether you're a seasoned data scientist or just starting your journey, the opportunities in AI are vast and exciting.

## Next Steps
- Stay updated with the latest AI research and developments
- Develop expertise in emerging AI technologies
- Contribute to open-source AI projects
- Engage with the AI community through conferences and meetups
- Consider pursuing advanced degrees or certifications in AI`,
      author: 'Divyansh Dubey',
      date: '2025-01-28',
      readTime: '14 min read',
      category: 'ai',
      tags: ['AI', 'Future Tech', 'Trends'],
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop',
      featured: false
    },
    {
      id: 5,
      title: 'Building Scalable Microservices with Docker',
      excerpt: 'Learn how to design and deploy microservices architecture using Docker containers.',
      content: `Microservices architecture has become the standard for building scalable, maintainable applications. Docker provides the perfect platform for containerizing and deploying these services. In this comprehensive guide, we'll explore how to design, build, and deploy a production-ready microservices application.

## Understanding Microservices Architecture

### What are Microservices?
Microservices is an architectural style that structures an application as a collection of loosely coupled, independently deployable services. Each service is responsible for a specific business capability and can be developed, deployed, and scaled independently.

**Key Characteristics:**
- **Single Responsibility**: Each service has one specific business function
- **Independence**: Services can be developed and deployed independently
- **Technology Diversity**: Different services can use different technologies
- **Data Isolation**: Each service manages its own database
- **Fault Isolation**: Failure in one service doesn't bring down the entire system

### Benefits of Microservices
- **Scalability**: Scale individual services based on demand
- **Maintainability**: Easier to understand and modify smaller services
- **Technology Flexibility**: Choose the best technology for each service
- **Team Autonomy**: Teams can work independently on different services
- **Fault Tolerance**: Isolated failures don't affect the entire system

## Domain-Driven Design for Microservices

### Bounded Contexts
Domain-Driven Design (DDD) provides a framework for identifying service boundaries based on business domains.

**Example: E-commerce Domain**
\`\`\`typescript
// User Service - User Management Domain
interface UserService {
  createUser(user: CreateUserRequest): Promise<User>;
  getUserById(id: string): Promise<User>;
  updateUser(id: string, updates: UpdateUserRequest): Promise<User>;
  deleteUser(id: string): Promise<void>;
}

// Order Service - Order Management Domain
interface OrderService {
  createOrder(order: CreateOrderRequest): Promise<Order>;
  getOrderById(id: string): Promise<Order>;
  updateOrderStatus(id: string, status: OrderStatus): Promise<Order>;
  getOrdersByUserId(userId: string): Promise<Order[]>;
}

// Payment Service - Payment Processing Domain
interface PaymentService {
  processPayment(payment: PaymentRequest): Promise<PaymentResult>;
  refundPayment(paymentId: string, amount: number): Promise<RefundResult>;
  getPaymentHistory(userId: string): Promise<Payment[]>;
}
\`\`\`

## Docker Implementation

### Multi-Stage Docker Builds
Multi-stage builds help create optimized, production-ready containers.

**User Service Dockerfile:**
\`\`\`dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS production
WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy built application
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001
USER nodejs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Start application
CMD ["node", "dist/server.js"]
\`\`\`

### Docker Compose for Local Development
\`\`\`yaml
version: '3.8'

services:
  # User Service
  user-service:
    build: ./user-service
    ports:
      - "3001:3000"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://user:password@user-db:5432/userdb
      - REDIS_URL=redis://redis:6379
    depends_on:
      - user-db
      - redis
    networks:
      - microservices-network

  # Order Service
  order-service:
    build: ./order-service
    ports:
      - "3002:3000"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://user:password@order-db:5432/orderdb
      - REDIS_URL=redis://redis:6379
    depends_on:
      - order-db
      - redis
    networks:
      - microservices-network

  # Payment Service
  payment-service:
    build: ./payment-service
    ports:
      - "3003:3000"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://user:password@payment-db:5432/paymentdb
      - REDIS_URL=redis://redis:6379
    depends_on:
      - payment-db
      - redis
    networks:
      - microservices-network

  # API Gateway
  api-gateway:
    build: ./api-gateway
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
    depends_on:
      - user-service
      - order-service
      - payment-service
    networks:
      - microservices-network

  # Databases
  user-db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=userdb
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - user-data:/var/lib/postgresql/data
    networks:
      - microservices-network

  order-db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=orderdb
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - order-data:/var/lib/postgresql/data
    networks:
      - microservices-network

  payment-db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=paymentdb
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - payment-data:/var/lib/postgresql/data
    networks:
      - microservices-network

  # Redis for caching
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    networks:
      - microservices-network

  # Monitoring
  prometheus:
    image: prom/prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml
    networks:
      - microservices-network

  grafana:
    image: grafana/grafana
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    volumes:
      - grafana-data:/var/lib/grafana
    networks:
      - microservices-network

volumes:
  user-data:
  order-data:
  payment-data:
  grafana-data:

networks:
  microservices-network:
    driver: bridge
\`\`\`

## Service Communication Patterns

### REST API Implementation
\`\`\`typescript
// User Service - Express.js with TypeScript
import express from 'express';
import { createUser, getUserById, updateUser, deleteUser } from './services/userService';
import { validateUserInput } from './middleware/validation';
import { authenticateToken } from './middleware/auth';

const app = express();
app.use(express.json());

// User routes
app.post('/users', validateUserInput, async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/users/:id', authenticateToken, async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/users/:id', authenticateToken, validateUserInput, async (req, res) => {
  try {
    const user = await updateUser(req.params.id, req.body);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/users/:id', authenticateToken, async (req, res) => {
  try {
    await deleteUser(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`User service running on port \${PORT}\`);
});
\`\`\`

### gRPC Implementation
\`\`\`protobuf
// user.proto
syntax = "proto3";

package user;

service UserService {
  rpc CreateUser(CreateUserRequest) returns (User);
  rpc GetUser(GetUserRequest) returns (User);
  rpc UpdateUser(UpdateUserRequest) returns (User);
  rpc DeleteUser(DeleteUserRequest) returns (DeleteUserResponse);
}

message CreateUserRequest {
  string email = 1;
  string name = 2;
  string password = 3;
}

message GetUserRequest {
  string id = 1;
}

message UpdateUserRequest {
  string id = 1;
  string email = 2;
  string name = 3;
}

message DeleteUserRequest {
  string id = 1;
}

message DeleteUserResponse {
  bool success = 1;
}

message User {
  string id = 1;
  string email = 2;
  string name = 3;
  string created_at = 4;
  string updated_at = 5;
}
\`\`\`

\`\`\`typescript
// gRPC Server Implementation
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { UserService } from './services/userService';

const PROTO_PATH = './protos/user.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const userProto = grpc.loadPackageDefinition(packageDefinition) as any;

const server = new grpc.Server();

server.addService(userProto.user.UserService.service, {
  createUser: async (call: any, callback: any) => {
    try {
      const user = await UserService.createUser(call.request);
      callback(null, user);
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error.message
      });
    }
  },

  getUser: async (call: any, callback: any) => {
    try {
      const user = await UserService.getUserById(call.request.id);
      if (!user) {
        callback({
          code: grpc.status.NOT_FOUND,
          message: 'User not found'
        });
        return;
      }
      callback(null, user);
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: error.message
      });
    }
  }
});

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
  server.start();
  console.log('gRPC server running on port 50051');
});
\`\`\`

## Database Design for Microservices

### Event Sourcing Pattern
\`\`\`typescript
// Event Store Implementation
interface Event {
  id: string;
  aggregateId: string;
  type: string;
  data: any;
  timestamp: Date;
  version: number;
}

class EventStore {
  private events: Event[] = [];

  async appendEvents(aggregateId: string, events: Event[]): Promise<void> {
    for (const event of events) {
      event.id = this.generateId();
      event.timestamp = new Date();
      event.version = await this.getNextVersion(aggregateId);
      this.events.push(event);
    }
  }

  async getEvents(aggregateId: string): Promise<Event[]> {
    return this.events.filter(event => event.aggregateId === aggregateId);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private async getNextVersion(aggregateId: string): Promise<number> {
    const existingEvents = await this.getEvents(aggregateId);
    return existingEvents.length + 1;
  }
}

// User Aggregate
class UserAggregate {
  private id: string;
  private email: string;
  private name: string;
  private version: number = 0;
  private uncommittedEvents: Event[] = [];

  constructor(id: string) {
    this.id = id;
  }

  createUser(email: string, name: string): void {
    this.apply(new UserCreatedEvent(this.id, email, name));
  }

  updateUser(email: string, name: string): void {
    this.apply(new UserUpdatedEvent(this.id, email, name));
  }

  private apply(event: Event): void {
    this.uncommittedEvents.push(event);
    this.handleEvent(event);
  }

  private handleEvent(event: Event): void {
    switch (event.type) {
      case 'UserCreated':
        this.email = event.data.email;
        this.name = event.data.name;
        break;
      case 'UserUpdated':
        this.email = event.data.email;
        this.name = event.data.name;
        break;
    }
    this.version++;
  }

  getUncommittedEvents(): Event[] {
    return this.uncommittedEvents;
  }

  markEventsAsCommitted(): void {
    this.uncommittedEvents = [];
  }
}
\`\`\`

## API Gateway Implementation

### Express Gateway Configuration
\`\`\`typescript
// API Gateway with Express Gateway
import { ExpressGateway } from 'express-gateway';

const gateway = new ExpressGateway();

gateway.config({
  http: {
    port: 3000
  },
  apiEndpoints: {
    api: {
      host: 'localhost',
      port: 3000
    }
  },
  serviceEndpoints: {
    userService: {
      url: 'http://user-service:3000'
    },
    orderService: {
      url: 'http://order-service:3000'
    },
    paymentService: {
      url: 'http://payment-service:3000'
    }
  },
  pipelines: {
    userPipeline: {
      apiEndpoints: ['api'],
      policies: [
        {
          proxy: {
            action: {
              serviceEndpoint: 'userService',
              changeOrigin: true
            }
          }
        },
        {
          jwt: {
            secret: process.env.JWT_SECRET
          }
        }
      ]
    },
    orderPipeline: {
      apiEndpoints: ['api'],
      policies: [
        {
          proxy: {
            action: {
              serviceEndpoint: 'orderService',
              changeOrigin: true
            }
          }
        },
        {
          jwt: {
            secret: process.env.JWT_SECRET
          }
        }
      ]
    }
  }
});

gateway.run();
\`\`\`

## Monitoring and Observability

### Prometheus Configuration
\`\`\`yaml
# prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

rule_files:
  - "alert.rules"

alerting:
  alertmanagers:
    - static_configs:
        - targets:
          - alertmanager:9093

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  - job_name: 'user-service'
    static_configs:
      - targets: ['user-service:3000']
    metrics_path: '/metrics'

  - job_name: 'order-service'
    static_configs:
      - targets: ['order-service:3000']
    metrics_path: '/metrics'

  - job_name: 'payment-service'
    static_configs:
      - targets: ['payment-service:3000']
    metrics_path: '/metrics'
\`\`\`

### Custom Metrics with Prometheus
\`\`\`typescript
// Metrics implementation
import { register, Counter, Histogram, Gauge } from 'prom-client';

// Custom metrics
const httpRequestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code']
});

const httpRequestsTotal = new Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});

const activeConnections = new Gauge({
  name: 'active_connections',
  help: 'Number of active connections'
});

// Middleware to collect metrics
export const metricsMiddleware = (req: any, res: any, next: any) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    
    httpRequestDuration
      .labels(req.method, req.route?.path || req.path, res.statusCode.toString())
      .observe(duration);
    
    httpRequestsTotal
      .labels(req.method, req.route?.path || req.path, res.statusCode.toString())
      .inc();
  });
  
  next();
};

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});
\`\`\`

## CI/CD Pipeline with GitHub Actions

### GitHub Actions Workflow
\`\`\`yaml
# .github/workflows/deploy.yml
name: Deploy Microservices

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: |
        cd user-service && npm ci
        cd ../order-service && npm ci
        cd ../payment-service && npm ci
    
    - name: Run tests
      run: |
        cd user-service && npm test
        cd ../order-service && npm test
        cd ../payment-service && npm test

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v2
    
    - name: Login to Docker Hub
      uses: docker/login-action@v2
      with:
        username: 'your-docker-username'
        password: 'your-docker-password'
    
    - name: Build and push user-service
      uses: docker/build-push-action@v4
      with:
        context: ./user-service
        push: true
        tags: 'your-docker-username/user-service:latest'
    
    - name: Build and push order-service
      uses: docker/build-push-action@v4
      with:
        context: ./order-service
        push: true
        tags: 'your-docker-username/order-service:latest'
    
    - name: Build and push payment-service
      uses: docker/build-push-action@v4
      with:
        context: ./payment-service
        push: true
        tags: 'your-docker-username/payment-service:latest'

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
    - uses: actions/checkout@v3
    
    - name: Deploy to Kubernetes
      uses: steebchen/kubectl@v2
      with:
        config: 'your-kube-config-data'
        command: apply -f k8s/
    
    - name: Update deployment images
      run: |
        kubectl set image deployment/user-service user-service='your-docker-username/user-service:latest'
        kubectl set image deployment/order-service order-service='your-docker-username/order-service:latest'
        kubectl set image deployment/payment-service payment-service='your-docker-username/payment-service:latest'
\`\`\`

## Kubernetes Deployment

### Kubernetes Manifests
\`\`\`yaml
# k8s/user-service.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: user-service
  labels:
    app: user-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: user-service
  template:
    metadata:
      labels:
        app: user-service
    spec:
      containers:
      - name: user-service
        image: your-registry/user-service:latest
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: user-db-url
        - name: REDIS_URL
          value: "redis://redis-service:6379"
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "200m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: user-service
spec:
  selector:
    app: user-service
  ports:
  - port: 80
    targetPort: 3000
  type: ClusterIP
\`\`\`

## Service Mesh with Istio

### Istio Configuration
\`\`\`yaml
# istio/virtual-service.yaml
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: user-service
spec:
  hosts:
  - user-service
  http:
  - route:
    - destination:
        host: user-service
        port:
          number: 80
      weight: 100
    retries:
      attempts: 3
      perTryTimeout: 2s
    timeout: 10s
---
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: user-service
spec:
  host: user-service
  trafficPolicy:
    loadBalancer:
      simple: ROUND_ROBIN
    connectionPool:
      tcp:
        maxConnections: 100
      http:
        http1MaxPendingRequests: 1024
        maxRequestsPerConnection: 10
    outlierDetection:
      consecutiveErrors: 5
      interval: 10s
      baseEjectionTime: 30s
      maxEjectionPercent: 10
\`\`\`

## Best Practices

### 1. Service Design
- **Single Responsibility**: Each service should have one clear purpose
- **Loose Coupling**: Services should be independent of each other
- **High Cohesion**: Related functionality should be in the same service
- **API-First Design**: Design APIs before implementing services

### 2. Data Management
- **Database per Service**: Each service owns its data
- **Event-Driven Communication**: Use events for service communication
- **Eventual Consistency**: Accept eventual consistency for better performance
- **CQRS Pattern**: Separate read and write operations

### 3. Security
- **Service-to-Service Authentication**: Use JWT or mTLS
- **API Gateway Security**: Implement rate limiting and authentication
- **Secrets Management**: Use Kubernetes secrets or external secret managers
- **Network Policies**: Restrict network communication between services

### 4. Monitoring
- **Distributed Tracing**: Use Jaeger or Zipkin for request tracing
- **Centralized Logging**: Aggregate logs with ELK stack or similar
- **Metrics Collection**: Use Prometheus for metrics
- **Health Checks**: Implement proper health check endpoints

### 5. Deployment Strategies
- **Blue-Green Deployment**: Zero-downtime deployments
- **Canary Releases**: Gradual rollout of new versions
- **Rolling Updates**: Update services one by one
- **Feature Flags**: Use feature flags for gradual feature releases

## Conclusion
Building scalable microservices with Docker requires careful planning and implementation of various patterns and practices. By following the guidelines and examples provided in this guide, you can create robust, scalable, and maintainable microservices applications.

The key to success is understanding the trade-offs involved in microservices architecture and choosing the right patterns for your specific use case. Start small, iterate, and gradually add complexity as your application grows.

## Next Steps
- Implement service discovery with Consul or etcd
- Add distributed tracing with Jaeger
- Set up centralized logging with ELK stack
- Implement circuit breakers with Hystrix or Resilience4j
- Add API versioning strategies
- Implement blue-green deployment pipelines`,
      author: 'Divyansh Dubey',
      date: '2025-06-15',
      readTime: '16 min read',
      category: 'tutorial',
      tags: ['Docker', 'Microservices', 'DevOps'],
      image: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400&h=250&fit=crop',
      featured: false
    },
    {
      id: 6,
      title: 'Career Paths in Data Science and AI',
      excerpt: 'A comprehensive guide to different career opportunities in the data science and AI industry.',
      content: `The data science and AI industry offers diverse career opportunities for professionals with different backgrounds and interests. From data analysts to machine learning engineers, there are numerous paths to explore. In this comprehensive guide, we'll explore various career roles, required skills, salary expectations, and growth opportunities.

## Understanding the Data Science Landscape

### What is Data Science?
Data science is an interdisciplinary field that combines statistics, computer science, and domain expertise to extract meaningful insights from data. It encompasses everything from data collection and cleaning to advanced machine learning and AI model development.

**Key Components:**
- **Statistics & Mathematics**: Probability, hypothesis testing, regression analysis
- **Programming**: Python, R, SQL, and other programming languages
- **Machine Learning**: Supervised and unsupervised learning algorithms
- **Data Visualization**: Creating compelling visual representations of data
- **Domain Knowledge**: Understanding the business context and industry

## Career Paths in Data Science

### 1. Data Analyst
**Role Overview:**
Data analysts are the foundation of data-driven decision making. They collect, clean, and analyze data to help organizations make informed business decisions.

**Key Responsibilities:**
- Collect and clean data from various sources
- Perform exploratory data analysis
- Create reports and dashboards
- Identify trends and patterns in data
- Present findings to stakeholders

**Required Skills:**
\`\`\`python
# Example: Data Analysis with Python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Data cleaning and preprocessing
def clean_data(df):
    # Remove duplicates
    df = df.drop_duplicates()
    
    # Handle missing values
    df = df.fillna(df.mean())
    
    # Remove outliers using IQR method
    Q1 = df.quantile(0.25)
    Q3 = df.quantile(0.75)
    IQR = Q3 - Q1
    df = df[~((df < (Q1 - 1.5 * IQR)) | (df > (Q3 + 1.5 * IQR))).any(axis=1)]
    
    return df

# Exploratory data analysis
def perform_eda(df):
    # Summary statistics
    print("Summary Statistics:")
    print(df.describe())
    
    # Correlation analysis
    plt.figure(figsize=(12, 8))
    sns.heatmap(df.corr(), annot=True, cmap='coolwarm')
    plt.title('Correlation Matrix')
    plt.show()
    
    # Distribution plots
    for column in df.select_dtypes(include=[np.number]).columns:
        plt.figure(figsize=(10, 6))
        sns.histplot(df[column], kde=True)
        plt.title(f'Distribution of {column}')
        plt.show()
\`\`\`

**Tools & Technologies:**
- **Programming**: Python, R, SQL
- **Visualization**: Tableau, Power BI, Matplotlib, Seaborn
- **Databases**: PostgreSQL, MySQL, MongoDB
- **Statistics**: Hypothesis testing, regression analysis

**Salary Range:** $60,000 - $90,000 (Entry level)
**Growth Path:** Senior Data Analyst → Data Scientist → Analytics Manager

### 2. Data Scientist
**Role Overview:**
Data scientists build predictive models and develop machine learning solutions to solve complex business problems.

**Key Responsibilities:**
- Develop machine learning models
- Perform statistical analysis
- Build predictive models
- Optimize model performance
- Deploy models to production

**Required Skills:**
\`\`\`python
# Example: Machine Learning Pipeline
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix
import joblib

class DataSciencePipeline:
    def __init__(self):
        self.model = None
        self.scaler = None
    
    def preprocess_data(self, X, y=None):
        """Preprocess data for machine learning"""
        # Handle missing values
        X = X.fillna(X.mean())
        
        # Feature scaling
        if y is None:  # Test data
            X = self.scaler.transform(X)
        else:  # Training data
            from sklearn.preprocessing import StandardScaler
            self.scaler = StandardScaler()
            X = self.scaler.fit_transform(X)
        
        return X
    
    def train_model(self, X, y):
        """Train machine learning model"""
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )
        
        # Preprocess
        X_train = self.preprocess_data(X_train, y_train)
        X_test = self.preprocess_data(X_test)
        
        # Train model
        self.model = RandomForestClassifier(n_estimators=100, random_state=42)
        self.model.fit(X_train, y_train)
        
        # Evaluate
        y_pred = self.model.predict(X_test)
        print("Classification Report:")
        print(classification_report(y_test, y_pred))
        
        return self.model
    
    def deploy_model(self, model_path):
        """Deploy model to production"""
        joblib.dump(self.model, model_path)
        print(f"Model saved to {model_path}")
\`\`\`

**Tools & Technologies:**
- **Programming**: Python, R, Julia
- **ML Libraries**: Scikit-learn, TensorFlow, PyTorch
- **Big Data**: Spark, Hadoop, AWS
- **Statistics**: Advanced statistical modeling

**Salary Range:** $80,000 - $130,000 (Mid-level)
**Growth Path:** Senior Data Scientist → Lead Data Scientist → Director of Data Science

### 3. Machine Learning Engineer
**Role Overview:**
ML engineers focus on building scalable machine learning systems and deploying models to production environments.

**Key Responsibilities:**
- Design ML infrastructure
- Deploy models to production
- Optimize model performance
- Build data pipelines
- Monitor model performance

**Required Skills:**
\`\`\`python
# Example: ML Model Deployment
import mlflow
import docker
from kubernetes import client, config
import tensorflow as tf

class MLModelDeployment:
    def __init__(self):
        self.model = None
        self.mlflow_client = mlflow.tracking.MlflowClient()
    
    def train_and_log_model(self, model, X_train, y_train, model_name):
        """Train and log model with MLflow"""
        with mlflow.start_run():
            # Train model
            model.fit(X_train, y_train)
            
            # Log parameters
            mlflow.log_params(model.get_params())
            
            # Log metrics
            y_pred = model.predict(X_train)
            accuracy = accuracy_score(y_train, y_pred)
            mlflow.log_metric("accuracy", accuracy)
            
            # Log model
            mlflow.sklearn.log_model(model, model_name)
            
            self.model = model
            return mlflow.active_run().info.run_id
    
    def deploy_to_kubernetes(self, model_uri, deployment_name):
        """Deploy model to Kubernetes"""
        # Create Docker image
        dockerfile = f"""
        FROM python:3.9-slim
        WORKDIR /app
        COPY requirements.txt .
        RUN pip install -r requirements.txt
        COPY model_service.py .
        EXPOSE 8080
        CMD ["python", "model_service.py"]
        """
        
        # Build and push Docker image
        client = docker.from_env()
        image = client.images.build(path=".", dockerfile=dockerfile)
        
        # Deploy to Kubernetes
        config.load_kube_config()
        apps_v1 = client.AppsV1Api()
        
        deployment = client.V1Deployment(
            metadata=client.V1ObjectMeta(name=deployment_name),
            spec=client.V1DeploymentSpec(
                replicas=3,
                selector=client.V1LabelSelector(
                    match_labels={"app": deployment_name}
                ),
                template=client.V1PodTemplateSpec(
                    metadata=client.V1ObjectMeta(
                        labels={"app": deployment_name}
                    ),
                    spec=client.V1PodSpec(
                        containers=[
                            client.V1Container(
                                name=deployment_name,
                                image=image.tags[0],
                                ports=[client.V1ContainerPort(container_port=8080)]
                            )
                        ]
                    )
                )
            )
        )
        
        apps_v1.create_namespaced_deployment(
            namespace="default", body=deployment
        )
\`\`\`

**Tools & Technologies:**
- **Programming**: Python, Java, Scala
- **MLOps**: MLflow, Kubeflow, Airflow
- **Cloud**: AWS, GCP, Azure
- **Containerization**: Docker, Kubernetes

**Salary Range:** $100,000 - $160,000 (Senior level)
**Growth Path:** Senior ML Engineer → ML Architect → VP of Engineering

### 4. AI Research Scientist
**Role Overview:**
AI research scientists work on cutting-edge AI research, developing new algorithms and advancing the field of artificial intelligence.

**Key Responsibilities:**
- Conduct original research
- Develop new AI algorithms
- Publish research papers
- Collaborate with academic institutions
- Patent new technologies

**Required Skills:**
\`\`\`python
# Example: Custom Neural Network Implementation
import torch
import torch.nn as nn
import torch.nn.functional as F

class CustomTransformer(nn.Module):
    def __init__(self, d_model=512, n_heads=8, n_layers=6, vocab_size=30000):
        super(CustomTransformer, self).__init__()
        self.d_model = d_model
        self.n_heads = n_heads
        
        # Embeddings
        self.embedding = nn.Embedding(vocab_size, d_model)
        self.pos_encoding = self.create_positional_encoding(5000, d_model)
        
        # Transformer layers
        self.transformer_layers = nn.ModuleList([
            TransformerLayer(d_model, n_heads) for _ in range(n_layers)
        ])
        
        # Output layer
        self.output_layer = nn.Linear(d_model, vocab_size)
    
    def create_positional_encoding(self, max_len, d_model):
        """Create positional encoding for transformer"""
        pe = torch.zeros(max_len, d_model)
        position = torch.arange(0, max_len).unsqueeze(1)
        
        div_term = torch.exp(torch.arange(0, d_model, 2) * 
                           -(torch.log(torch.tensor(10000.0)) / d_model))
        
        pe[:, 0::2] = torch.sin(position * div_term)
        pe[:, 1::2] = torch.cos(position * div_term)
        
        return pe.unsqueeze(0)
    
    def forward(self, x):
        # Embedding and positional encoding
        x = self.embedding(x) * torch.sqrt(torch.tensor(self.d_model))
        x = x + self.pos_encoding[:, :x.size(1), :].to(x.device)
        
        # Pass through transformer layers
        for layer in self.transformer_layers:
            x = layer(x)
        
        # Output layer
        output = self.output_layer(x)
        return output

class TransformerLayer(nn.Module):
    def __init__(self, d_model, n_heads):
        super(TransformerLayer, self).__init__()
        self.attention = nn.MultiheadAttention(d_model, n_heads)
        self.feed_forward = nn.Sequential(
            nn.Linear(d_model, d_model * 4),
            nn.ReLU(),
            nn.Linear(d_model * 4, d_model)
        )
        self.norm1 = nn.LayerNorm(d_model)
        self.norm2 = nn.LayerNorm(d_model)
    
    def forward(self, x):
        # Self-attention
        attn_output, _ = self.attention(x, x, x)
        x = self.norm1(x + attn_output)
        
        # Feed-forward
        ff_output = self.feed_forward(x)
        x = self.norm2(x + ff_output)
        
        return x
\`\`\`

**Tools & Technologies:**
- **Programming**: Python, C++, CUDA
- **Deep Learning**: PyTorch, TensorFlow, JAX
- **Research**: LaTeX, Git, Jupyter
- **Mathematics**: Linear algebra, calculus, probability

**Salary Range:** $120,000 - $200,000+ (Research level)
**Growth Path:** Research Scientist → Senior Research Scientist → Research Director

### 5. Data Engineer
**Role Overview:**
Data engineers build and maintain the infrastructure that enables data collection, storage, and processing at scale.

**Key Responsibilities:**
- Design data pipelines
- Build data warehouses
- Optimize data processing
- Ensure data quality
- Maintain data infrastructure

**Required Skills:**
\`\`\`python
# Example: Data Pipeline with Apache Airflow
from airflow import DAG
from airflow.operators.python_operator import PythonOperator
from airflow.providers.postgres.hooks.postgres import PostgresHook
from airflow.providers.amazon.aws.hooks.s3 import S3Hook
import pandas as pd
from datetime import datetime, timedelta

default_args = {
    'owner': 'data_engineer',
    'depends_on_past': False,
    'start_date': datetime(2024, 1, 1),
    'email_on_failure': True,
    'email_on_retry': False,
    'retries': 1,
    'retry_delay': timedelta(minutes=5)
}

dag = DAG(
    'data_pipeline',
    default_args=default_args,
    description='ETL pipeline for user data',
    schedule_interval=timedelta(hours=1)
)

def extract_data():
    """Extract data from source systems"""
    # Extract from PostgreSQL
    pg_hook = PostgresHook(postgres_conn_id='postgres_default')
    query = "SELECT * FROM users WHERE updated_at >= NOW() - INTERVAL '1 hour'"
    df = pg_hook.get_pandas_df(query)
    
    # Save to S3
    s3_hook = S3Hook(aws_conn_id='aws_default')
    df.to_csv('/tmp/users.csv', index=False)
    s3_hook.load_file(
        filename='/tmp/users.csv',
        key='raw/users.csv',
        bucket_name='data-lake'
    )
    
    return df.shape[0]

def transform_data():
    """Transform and clean data"""
    # Read from S3
    s3_hook = S3Hook(aws_conn_id='aws_default')
    s3_hook.download_file(
        key='raw/users.csv',
        bucket_name='data-lake',
        local_path='/tmp/users.csv'
    )
    
    df = pd.read_csv('/tmp/users.csv')
    
    # Data cleaning
    df = df.dropna(subset=['email'])
    df['created_date'] = pd.to_datetime(df['created_at']).dt.date
    df['is_active'] = df['status'] == 'active'
    
    # Save transformed data
    df.to_csv('/tmp/users_transformed.csv', index=False)
    s3_hook.load_file(
        filename='/tmp/users_transformed.csv',
        key='transformed/users.csv',
        bucket_name='data-lake'
    )
    
    return df.shape[0]

def load_data():
    """Load data to data warehouse"""
    # Read transformed data
    s3_hook = S3Hook(aws_conn_id='aws_default')
    s3_hook.download_file(
        key='transformed/users.csv',
        bucket_name='data-lake',
        local_path='/tmp/users_transformed.csv'
    )
    
    df = pd.read_csv('/tmp/users_transformed.csv')
    
    # Load to data warehouse
    pg_hook = PostgresHook(postgres_conn_id='warehouse_default')
    pg_hook.run("DELETE FROM users WHERE created_date = CURRENT_DATE")
    
    for _, row in df.iterrows():
        pg_hook.run("""
            INSERT INTO users (id, email, created_date, is_active)
            VALUES (%s, %s, %s, %s)
        """, parameters=(row['id'], row['email'], row['created_date'], row['is_active']))
    
    return df.shape[0]

# Define tasks
extract_task = PythonOperator(
    task_id='extract_data',
    python_callable=extract_data,
    dag=dag
)

transform_task = PythonOperator(
    task_id='transform_data',
    python_callable=transform_data,
    dag=dag
)

load_task = PythonOperator(
    task_id='load_data',
    python_callable=load_data,
    dag=dag
)

# Set task dependencies
extract_task >> transform_task >> load_task
\`\`\`

**Tools & Technologies:**
- **Programming**: Python, Java, Scala
- **Big Data**: Spark, Hadoop, Kafka
- **Databases**: PostgreSQL, MongoDB, Cassandra
- **Cloud**: AWS, GCP, Azure

**Salary Range:** $90,000 - $150,000 (Senior level)
**Growth Path:** Senior Data Engineer → Data Engineering Manager → Director of Data Engineering

### 6. MLOps Engineer
**Role Overview:**
MLOps engineers focus on automating and streamlining the machine learning lifecycle, from development to deployment and monitoring.

**Key Responsibilities:**
- Automate ML workflows
- Deploy and monitor models
- Manage model versioning
- Implement CI/CD for ML
- Optimize model performance

**Required Skills:**
\`\`\`python
# Example: MLOps Pipeline with Kubeflow
import kfp
from kfp import dsl
from kfp.components import create_component_from_func
import mlflow
import tensorflow as tf

@create_component_from_func
def data_preprocessing_op():
    """Data preprocessing component"""
    import pandas as pd
    from sklearn.preprocessing import StandardScaler
    
    # Load data
    df = pd.read_csv('data/raw_data.csv')
    
    # Preprocess
    scaler = StandardScaler()
    X = scaler.fit_transform(df.drop('target', axis=1))
    y = df['target']
    
    # Save preprocessed data
    pd.DataFrame(X).to_csv('data/preprocessed_X.csv', index=False)
    pd.DataFrame(y).to_csv('data/preprocessed_y.csv', index=False)
    
    return X.shape

@create_component_from_func
def model_training_op():
    """Model training component"""
    import pandas as pd
    from sklearn.model_selection import train_test_split
    from sklearn.ensemble import RandomForestClassifier
    import mlflow
    
    # Load preprocessed data
    X = pd.read_csv('data/preprocessed_X.csv')
    y = pd.read_csv('data/preprocessed_y.csv')
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
    
    # Train model
    with mlflow.start_run():
        model = RandomForestClassifier(n_estimators=100)
        model.fit(X_train, y_train)
        
        # Log metrics
        accuracy = model.score(X_test, y_test)
        mlflow.log_metric("accuracy", accuracy)
        
        # Log model
        mlflow.sklearn.log_model(model, "model")
        
        # Save model
        import joblib
        joblib.dump(model, 'model.pkl')
    
    return accuracy

@create_component_from_func
def model_deployment_op():
    """Model deployment component"""
    import mlflow
    from kubernetes import client, config
    
    # Load model from MLflow
    model = mlflow.sklearn.load_model("runs:/latest/model")
    
    # Create deployment configuration
    deployment = client.V1Deployment(
        metadata=client.V1ObjectMeta(name="ml-model"),
        spec=client.V1DeploymentSpec(
            replicas=3,
            selector=client.V1LabelSelector(match_labels={"app": "ml-model"}),
            template=client.V1PodTemplateSpec(
                metadata=client.V1ObjectMeta(labels={"app": "ml-model"}),
                spec=client.V1PodSpec(
                    containers=[
                        client.V1Container(
                            name="ml-model",
                            image="ml-model:latest",
                            ports=[client.V1ContainerPort(container_port=8080)]
                        )
                    ]
                )
            )
        )
    )
    
    # Deploy to Kubernetes
    config.load_kube_config()
    apps_v1 = client.AppsV1Api()
    apps_v1.create_namespaced_deployment(
        namespace="default", body=deployment
    )
    
    return "deployed"

@dsl.pipeline(
    name="ML Pipeline",
    description="End-to-end ML pipeline"
)
def ml_pipeline():
    """Complete ML pipeline"""
    # Data preprocessing
    preprocess_task = data_preprocessing_op()
    
    # Model training
    train_task = model_training_op().after(preprocess_task)
    
    # Model deployment
    deploy_task = model_deployment_op().after(train_task)

# Compile and run pipeline
kfp.compiler.Compiler().compile(ml_pipeline, 'ml_pipeline.yaml')
\`\`\`

**Tools & Technologies:**
- **MLOps**: Kubeflow, MLflow, Airflow
- **Containerization**: Docker, Kubernetes
- **Monitoring**: Prometheus, Grafana
- **CI/CD**: Jenkins, GitHub Actions

**Salary Range:** $110,000 - $170,000 (Senior level)
**Growth Path:** Senior MLOps Engineer → MLOps Manager → Director of ML Engineering

### 7. AI Product Manager
**Role Overview:**
AI product managers bridge the gap between technical teams and business stakeholders, ensuring AI products meet user needs and business objectives.

**Key Responsibilities:**
- Define AI product strategy
- Gather and prioritize requirements
- Work with cross-functional teams
- Analyze market trends
- Measure product success

**Required Skills:**
\`\`\`python
# Example: Product Analytics Dashboard
import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go

class AIProductAnalytics:
    def __init__(self):
        self.data = None
    
    def load_data(self, file_path):
        """Load product analytics data"""
        self.data = pd.read_csv(file_path)
    
    def create_dashboard(self):
        """Create interactive dashboard"""
        st.title("AI Product Analytics Dashboard")
        
        # Key metrics
        col1, col2, col3, col4 = st.columns(4)
        
        with col1:
            st.metric("Total Users", self.data['user_id'].nunique())
        
        with col2:
            st.metric("Active Users", self.data[self.data['is_active']]['user_id'].nunique())
        
        with col3:
            st.metric("Model Accuracy", f"{self.data['accuracy'].mean():.2%}")
        
        with col4:
            st.metric("User Satisfaction", f"{self.data['satisfaction_score'].mean():.1f}/5")
        
        # User engagement over time
        st.subheader("User Engagement Over Time")
        engagement_data = self.data.groupby('date')['user_id'].nunique().reset_index()
        fig = px.line(engagement_data, x='date', y='user_id', title='Daily Active Users')
        st.plotly_chart(fig)
        
        # Model performance by feature
        st.subheader("Model Performance by Feature")
        feature_performance = self.data.groupby('feature')['accuracy'].mean().reset_index()
        fig = px.bar(feature_performance, x='feature', y='accuracy', title='Accuracy by Feature')
        st.plotly_chart(fig)
        
        # User feedback analysis
        st.subheader("User Feedback Analysis")
        feedback_data = self.data.groupby('feedback_type')['user_id'].count().reset_index()
        fig = px.pie(feedback_data, values='user_id', names='feedback_type', title='Feedback Distribution')
        st.plotly_chart(fig)
        
        # A/B testing results
        st.subheader("A/B Testing Results")
        ab_test_data = self.data.groupby('variant')['conversion_rate'].mean().reset_index()
        fig = px.bar(ab_test_data, x='variant', y='conversion_rate', title='Conversion Rate by Variant')
        st.plotly_chart(fig)

# Usage
if __name__ == "__main__":
    analytics = AIProductAnalytics()
    analytics.load_data('product_analytics.csv')
    analytics.create_dashboard()
\`\`\`

**Tools & Technologies:**
- **Analytics**: Google Analytics, Mixpanel, Amplitude
- **Product Management**: Jira, Asana, Notion
- **Data Analysis**: SQL, Python, R
- **Communication**: Slack, Zoom, Confluence

**Salary Range:** $100,000 - $180,000 (Senior level)
**Growth Path:** Senior Product Manager → Director of Product → VP of Product

## Skills Development Roadmap

### Entry Level (0-2 years)
**Technical Skills:**
- Python programming fundamentals
- SQL for data querying
- Basic statistics and mathematics
- Data visualization tools (Tableau, Power BI)

**Soft Skills:**
- Problem-solving abilities
- Communication skills
- Attention to detail
- Time management

**Recommended Certifications:**
- Google Data Analytics Professional Certificate
- IBM Data Science Professional Certificate
- Microsoft Azure Data Scientist Associate

### Mid Level (2-5 years)
**Technical Skills:**
- Advanced machine learning algorithms
- Big data technologies (Spark, Hadoop)
- Cloud platforms (AWS, GCP, Azure)
- MLOps and model deployment

**Soft Skills:**
- Project management
- Team collaboration
- Stakeholder communication
- Mentoring junior team members

**Recommended Certifications:**
- AWS Machine Learning Specialty
- Google Cloud Professional Data Engineer
- Microsoft Azure AI Engineer Associate

### Senior Level (5+ years)
**Technical Skills:**
- Advanced AI/ML research
- System architecture design
- Leadership in technical teams
- Strategic thinking

**Soft Skills:**
- Team leadership
- Strategic planning
- Business acumen
- Executive communication

**Recommended Certifications:**
- AWS Solutions Architect Professional
- Google Cloud Professional Cloud Architect
- Microsoft Azure Solutions Architect Expert

## Salary Expectations by Role and Experience

### Entry Level (0-2 years)
- **Data Analyst**: $50,000 - $75,000
- **Junior Data Scientist**: $70,000 - $95,000
- **Data Engineer**: $65,000 - $90,000

### Mid Level (2-5 years)
- **Data Scientist**: $85,000 - $130,000
- **Machine Learning Engineer**: $100,000 - $150,000
- **Data Engineer**: $90,000 - $140,000
- **MLOps Engineer**: $110,000 - $160,000

### Senior Level (5+ years)
- **Senior Data Scientist**: $120,000 - $180,000
- **Senior ML Engineer**: $130,000 - $200,000
- **AI Research Scientist**: $140,000 - $250,000+
- **Director of Data Science**: $150,000 - $250,000+

## Industry Trends and Future Outlook

### Emerging Technologies
- **Large Language Models**: GPT, BERT, and their applications
- **Computer Vision**: Advanced image and video analysis
- **Edge AI**: AI processing on edge devices
- **Quantum Machine Learning**: Quantum computing for ML
- **Federated Learning**: Privacy-preserving AI

### Industry Growth
- **Market Size**: The global AI market is expected to reach $1.8 trillion by 2030
- **Job Growth**: AI and ML jobs are growing 3x faster than other tech jobs
- **Investment**: Venture capital investment in AI startups continues to grow
- **Adoption**: 85% of companies are investing in AI/ML initiatives

### Future Skills
- **AI Ethics**: Understanding bias, fairness, and responsible AI
- **Explainable AI**: Making AI decisions interpretable
- **AutoML**: Automated machine learning tools
- **Edge Computing**: AI deployment on edge devices
- **Quantum Computing**: Quantum algorithms for AI

## Building Your Career

### Networking and Community
- **Conferences**: NeurIPS, ICML, KDD, AAAI
- **Meetups**: Local data science and AI meetups
- **Online Communities**: Reddit r/datascience, Kaggle, GitHub
- **Professional Organizations**: ACM, IEEE, AAAI

### Portfolio Development
- **GitHub**: Share your code and projects
- **Kaggle**: Participate in competitions
- **Blog**: Write about your work and insights
- **Open Source**: Contribute to AI/ML projects

### Continuous Learning
- **Online Courses**: Coursera, edX, Udacity
- **Books**: Stay updated with latest publications
- **Research Papers**: Read papers from top conferences
- **Podcasts**: AI/ML focused podcasts

## Conclusion
The data science and AI industry offers exciting career opportunities with strong growth potential. Success in this field requires a combination of technical skills, domain knowledge, and continuous learning.

The key to building a successful career is to:
1. **Start with fundamentals** - Master the basics of programming, statistics, and machine learning
2. **Choose your specialization** - Focus on a specific area that interests you
3. **Build practical experience** - Work on real projects and contribute to open source
4. **Network actively** - Connect with professionals in the field
5. **Stay updated** - Keep learning about new technologies and trends

Whether you're just starting your journey or looking to advance your career, the opportunities in data science and AI are vast and rewarding. The field is constantly evolving, offering new challenges and exciting possibilities for those willing to learn and adapt.

## Next Steps
- Assess your current skills and identify areas for improvement
- Choose a career path that aligns with your interests and goals
- Start building your portfolio with practical projects
- Network with professionals in your target role
- Pursue relevant certifications and education
- Stay updated with industry trends and emerging technologies`,
      author: 'Divyansh Dubey',
      date: '2025-04-03',
      readTime: '13 min read',
      category: 'career',
      tags: ['Career', 'Data Science', 'AI Jobs'],
      image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=250&fit=crop',
      featured: false
    },
    {
      id: 7,
      title: 'Advanced React Patterns for Modern Applications',
      excerpt: 'Explore advanced React patterns and techniques for building scalable frontend applications.',
      content: `React has evolved significantly since its introduction, with new patterns and best practices emerging regularly. In this comprehensive guide, we'll explore advanced React patterns that can help you build more maintainable, performant, and scalable applications.

## Understanding Modern React Architecture

### What Makes React "Modern"?
Modern React development focuses on functional components, hooks, and declarative programming patterns. The shift from class components to functional components has opened up new possibilities for code organization and reusability.

**Key Principles:**
- **Functional Components**: Pure functions with hooks for state and side effects
- **Declarative Programming**: Describe what you want, not how to do it
- **Composition over Inheritance**: Build complex UIs from simple components
- **Unidirectional Data Flow**: Predictable state management
- **Performance Optimization**: Automatic and manual optimization techniques

## Advanced Component Patterns

### 1. Compound Components Pattern
Compound components allow you to create flexible, reusable component APIs that share implicit state.

\`\`\`typescript
// Compound Components Example
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AccordionContextType {
  isOpen: boolean;
  toggle: () => void;
}

const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion components must be used within Accordion');
  }
  return context;
};

interface AccordionProps {
  children: ReactNode;
  defaultOpen?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  const toggle = () => setIsOpen(!isOpen);
  
  return (
    <AccordionContext.Provider value={{ isOpen, toggle }}>
      <div className="border rounded-lg overflow-hidden">
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

const AccordionHeader: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { toggle, isOpen } = useAccordion();
  
  return (
    <button
      onClick={toggle}
      className="w-full px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
    >
      {children}
      <span className={\`transform transition-transform \${isOpen ? 'rotate-180' : ''}\`}>
        ▼
      </span>
    </button>
  );
};

const AccordionContent: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isOpen } = useAccordion();
  
  if (!isOpen) return null;
  
  return (
    <div className="px-4 py-3 border-t bg-white">
      {children}
    </div>
  );
};

// Usage
const App = () => (
  <Accordion defaultOpen={true}>
    <AccordionHeader>Advanced React Patterns</AccordionHeader>
    <AccordionContent>
      Learn about compound components, render props, and more!
    </AccordionContent>
  </Accordion>
);
\`\`\`

### 2. Render Props Pattern
Render props allow you to share code between components using a prop whose value is a function.

\`\`\`typescript
// Render Props Example
import React, { useState, useEffect } from 'react';

interface DataFetcherProps<T> {
  url: string;
  children: (data: T | null, loading: boolean, error: string | null) => React.ReactNode;
}

const DataFetcher = <T,>({ url, children }: DataFetcherProps<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return <>{children(data, loading, error)}</>;
};

// Usage
const UserList = () => (
  <DataFetcher url="/api/users">
    {(users, loading, error) => {
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error: {error}</div>;
      if (!users) return <div>No users found</div>;
      
      return (
        <ul>
          {users.map((user: any) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      );
    }}
  </DataFetcher>
);
\`\`\`

### 3. Custom Hooks Pattern
Custom hooks allow you to extract component logic into reusable functions.

\`\`\`typescript
// Custom Hooks Examples
import { useState, useEffect, useCallback, useRef } from 'react';

// Form handling hook
interface UseFormOptions<T> {
  initialValues: T;
  onSubmit: (values: T) => void;
  validate?: (values: T) => Partial<Record<keyof T, string>>;
}

const useForm = <T extends Record<string, any>>({
  initialValues,
  onSubmit,
  validate
}: UseFormOptions<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((name: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }, [errors]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate) {
      const validationErrors = validate(values);
      setErrors(validationErrors);
      
      if (Object.keys(validationErrors).length > 0) {
        return;
      }
    }
    
    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validate, onSubmit]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    reset
  };
};

// Local storage hook
const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue] as const;
};

// Intersection Observer hook
const useIntersectionObserver = (
  options: IntersectionObserverInit = {}
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return [setRef, isIntersecting] as const;
};

// Usage examples
const LoginForm = () => {
  const form = useForm({
    initialValues: { email: '', password: '' },
    onSubmit: async (values) => {
      console.log('Submitting:', values);
      // API call here
    },
    validate: (values) => {
      const errors: any = {};
      if (!values.email) errors.email = 'Email is required';
      if (!values.password) errors.password = 'Password is required';
      return errors;
    }
  });

  return (
    <form onSubmit={form.handleSubmit}>
      <input
        type="email"
        value={form.values.email}
        onChange={(e) => form.handleChange('email', e.target.value)}
        placeholder="Email"
      />
      {form.errors.email && <span>{form.errors.email}</span>}
      
      <input
        type="password"
        value={form.values.password}
        onChange={(e) => form.handleChange('password', e.target.value)}
        placeholder="Password"
      />
      {form.errors.password && <span>{form.errors.password}</span>}
      
      <button type="submit" disabled={form.isSubmitting}>
        {form.isSubmitting ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};
\`\`\`

## Performance Optimization Patterns

### 1. React.memo and useMemo
Optimize component re-renders with memoization.

\`\`\`typescript
// Performance Optimization Examples
import React, { useMemo, useCallback, useState } from 'react';

// Memoized component
interface ExpensiveComponentProps {
  data: number[];
  onItemClick: (item: number) => void;
}

const ExpensiveComponent = React.memo<ExpensiveComponentProps>(({ data, onItemClick }) => {
  // Expensive calculation
  const processedData = useMemo(() => {
    return data.map(item => item * 2).filter(item => item > 10);
  }, [data]);

  return (
    <div>
      {processedData.map((item, index) => (
        <div key={index} onClick={() => onItemClick(item)}>
          {item}
        </div>
      ))}
    </div>
  );
});

// Parent component with optimized callbacks
const ParentComponent = () => {
  const [data, setData] = useState([1, 2, 3, 4, 5]);
  const [count, setCount] = useState(0);

  // Memoized callback to prevent unnecessary re-renders
  const handleItemClick = useCallback((item: number) => {
    console.log('Clicked:', item);
  }, []);

  // Memoized expensive data
  const expensiveData = useMemo(() => {
    return data.map(item => ({
      id: item,
      value: item * Math.PI,
      processed: item > 3
    }));
  }, [data]);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      <ExpensiveComponent data={expensiveData} onItemClick={handleItemClick} />
    </div>
  );
};
\`\`\`

### 2. Virtual Scrolling for Large Lists
Handle large datasets efficiently with virtual scrolling.

\`\`\`typescript
// Virtual Scrolling Implementation
import React, { useState, useEffect, useRef, useCallback } from 'react';

interface VirtualListProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
}

const VirtualList = <T,>({ items, itemHeight, containerHeight, renderItem }: VirtualListProps<T>) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalHeight = items.length * itemHeight;
  const visibleItemCount = Math.ceil(containerHeight / itemHeight);
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(startIndex + visibleItemCount + 1, items.length);

  const visibleItems = items.slice(startIndex, endIndex);
  const offsetY = startIndex * itemHeight;

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ transform: \`translateY(\${offsetY}px)\` }}>
          {visibleItems.map((item, index) => (
            <div key={startIndex + index} style={{ height: itemHeight }}>
              {renderItem(item, startIndex + index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Usage
const LargeList = () => {
  const items = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    name: \`Item \${i}\`,
    description: \`This is item number \${i}\`
  }));

  return (
    <VirtualList
      items={items}
      itemHeight={50}
      containerHeight={400}
      renderItem={(item, index) => (
        <div className="p-3 border-b hover:bg-gray-50">
          <div className="font-semibold">{item.name}</div>
          <div className="text-sm text-gray-600">{item.description}</div>
        </div>
      )}
    />
  );
};
\`\`\`

## State Management Patterns

### 1. Context API with useReducer
Manage complex state with Context API and useReducer.

\`\`\`typescript
// Advanced State Management
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// State types
interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

interface TodoState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
  searchTerm: string;
}

// Action types
type TodoAction =
  | { type: 'ADD_TODO'; payload: Omit<Todo, 'id'> }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'DELETE_TODO'; payload: string }
  | { type: 'SET_FILTER'; payload: TodoState['filter'] }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'CLEAR_COMPLETED' };

// Reducer
const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            ...action.payload,
            id: Date.now().toString()
          }
        ]
      };
    
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    
    case 'SET_SEARCH':
      return { ...state, searchTerm: action.payload };
    
    case 'CLEAR_COMPLETED':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed)
      };
    
    default:
      return state;
  }
};

// Context
const TodoContext = createContext<{
  state: TodoState;
  dispatch: React.Dispatch<TodoAction>;
} | undefined>(undefined);

const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within TodoProvider');
  }
  return context;
};

// Provider
interface TodoProviderProps {
  children: ReactNode;
}

const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [],
    filter: 'all',
    searchTerm: ''
  });

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

// Custom hooks for derived state
const useFilteredTodos = () => {
  const { state } = useTodoContext();
  
  return state.todos.filter(todo => {
    const matchesFilter = 
      state.filter === 'all' ||
      (state.filter === 'active' && !todo.completed) ||
      (state.filter === 'completed' && todo.completed);
    
    const matchesSearch = todo.text
      .toLowerCase()
      .includes(state.searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });
};

// Components
const TodoList = () => {
  const { dispatch } = useTodoContext();
  const filteredTodos = useFilteredTodos();

  return (
    <div>
      {filteredTodos.map(todo => (
        <div key={todo.id} className="flex items-center p-2 border-b">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
          />
          <span className={todo.completed ? 'line-through' : ''}>
            {todo.text}
          </span>
          <button
            onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}
            className="ml-auto text-red-500"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

const TodoFilters = () => {
  const { state, dispatch } = useTodoContext();

  return (
    <div className="flex gap-2 p-4">
      <button
        onClick={() => dispatch({ type: 'SET_FILTER', payload: 'all' })}
        className={state.filter === 'all' ? 'bg-blue-500 text-white' : ''}
      >
        All
      </button>
      <button
        onClick={() => dispatch({ type: 'SET_FILTER', payload: 'active' })}
        className={state.filter === 'active' ? 'bg-blue-500 text-white' : ''}
      >
        Active
      </button>
      <button
        onClick={() => dispatch({ type: 'SET_FILTER', payload: 'completed' })}
        className={state.filter === 'completed' ? 'bg-blue-500 text-white' : ''}
      >
        Completed
      </button>
      <input
        type="text"
        placeholder="Search todos..."
        value={state.searchTerm}
        onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
        className="border px-2 py-1"
      />
    </div>
  );
};
\`\`\`

### 2. Zustand for Lightweight State Management
Simple and scalable state management with Zustand.

\`\`\`typescript
// Zustand State Management
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        token: null,
        isLoading: false,
        
        login: async (email: string, password: string) => {
          set({ isLoading: true });
          try {
            // Simulate API call
            const response = await fetch('/api/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, password })
            });
            
            const data = await response.json();
            
            set({
              user: data.user,
              token: data.token,
              isLoading: false
            });
          } catch (error) {
            set({ isLoading: false });
            throw error;
          }
        },
        
        logout: () => {
          set({ user: null, token: null });
        },
        
        updateProfile: (updates: Partial<User>) => {
          const { user } = get();
          if (user) {
            set({ user: { ...user, ...updates } });
          }
        }
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({ user: state.user, token: state.token })
      }
    )
  )
);

// Usage in components
const LoginForm = () => {
  const { login, isLoading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

const UserProfile = () => {
  const { user, updateProfile } = useAuthStore();
  
  if (!user) return <div>Please log in</div>;
  
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <button onClick={() => updateProfile({ name: 'New Name' })}>
        Update Name
      </button>
    </div>
  );
};
\`\`\`

## TypeScript Integration Patterns

### 1. Generic Components
Create flexible, type-safe components with generics.

\`\`\`typescript
// Generic Components
import React from 'react';

// Generic Select component
interface SelectOption<T> {
  value: T;
  label: string;
  disabled?: boolean;
}

interface SelectProps<T> {
  options: SelectOption<T>[];
  value: T | null;
  onChange: (value: T) => void;
  placeholder?: string;
  disabled?: boolean;
}

const Select = <T extends string | number>({
  options,
  value,
  onChange,
  placeholder,
  disabled
}: SelectProps<T>) => {
  return (
    <select
      value={value || ''}
      onChange={(e) => onChange(e.target.value as T)}
      disabled={disabled}
      className="border rounded px-3 py-2"
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          disabled={option.disabled}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

// Generic Data Table
interface Column<T> {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onSort?: (key: keyof T) => void;
  sortKey?: keyof T;
  sortDirection?: 'asc' | 'desc';
}

const DataTable = <T extends Record<string, any>>({
  data,
  columns,
  onSort,
  sortKey,
  sortDirection
}: DataTableProps<T>) => {
  return (
    <table className="w-full border-collapse border">
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={String(column.key)}
              className="border p-2 text-left"
              onClick={() => column.sortable && onSort?.(column.key)}
            >
              {column.header}
              {column.sortable && sortKey === column.key && (
                <span>{sortDirection === 'asc' ? ' ↑' : ' ↓'}</span>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td key={String(column.key)} className="border p-2">
                {column.render
                  ? column.render(row[column.key], row)
                  : String(row[column.key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Usage
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: Date;
}

const UserManagement = () => {
  const users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', createdAt: new Date() },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', createdAt: new Date() }
  ];

  const columns: Column<User>[] = [
    { key: 'id', header: 'ID', sortable: true },
    { key: 'name', header: 'Name', sortable: true },
    { key: 'email', header: 'Email' },
    {
      key: 'role',
      header: 'Role',
      render: (value) => (
        <span className={\`px-2 py-1 rounded \${value === 'admin' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}\`}>
          {value}
        </span>
      )
    },
    {
      key: 'createdAt',
      header: 'Created',
      render: (value) => new Date(value).toLocaleDateString()
    }
  ];

  return (
    <div>
      <h2>User Management</h2>
      <DataTable
        data={users}
        columns={columns}
        onSort={(key) => console.log('Sort by:', key)}
      />
    </div>
  );
};
\`\`\`

### 2. Advanced Type Utilities
Create reusable type utilities for better type safety.

\`\`\`typescript
// Advanced Type Utilities
import React from 'react';

// Utility types
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type ComponentProps<T> = T extends React.ComponentType<infer P> ? P : never;

type EventHandler<T extends HTMLElement> = React.EventHandler<React.SyntheticEvent<T>>;

// Form utilities
type FormField<T> = {
  value: T;
  error?: string;
  touched: boolean;
};

type FormState<T> = {
  [K in keyof T]: FormField<T[K]>;
};

// API response types
type ApiResponse<T> = {
  data: T;
  message: string;
  success: boolean;
};

type PaginatedResponse<T> = ApiResponse<T[]> & {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

// Hook utilities
type UseStateReturn<T> = [T, React.Dispatch<React.SetStateAction<T>>];

type UseAsyncReturn<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
  execute: (...args: any[]) => Promise<void>;
};

// Component utilities
type WithChildren<T = {}> = T & {
  children?: React.ReactNode;
};

type WithClassName<T = {}> = T & {
  className?: string;
};

// Event utilities
type InputEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
type ButtonEvent = React.MouseEvent<HTMLButtonElement>;
type FormEvent = React.FormEvent<HTMLFormElement>;

// Usage examples
interface UserFormData {
  name: string;
  email: string;
  age: number;
}

const useFormField = <T>(initialValue: T) => {
  const [value, setValue] = React.useState<T>(initialValue);
  const [error, setError] = React.useState<string>();
  const [touched, setTouched] = React.useState(false);

  return {
    value,
    setValue,
    error,
    setError,
    touched,
    setTouched,
    field: {
      value,
      onChange: (e: InputEvent) => setValue(e.target.value as T),
      onBlur: () => setTouched(true)
    }
  };
};

const useAsync = <T>(asyncFunction: (...args: any[]) => Promise<T>): UseAsyncReturn<T> => {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const execute = React.useCallback(async (...args: any[]) => {
    setLoading(true);
    setError(null);
    try {
      const result = await asyncFunction(...args);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [asyncFunction]);

  return { data, loading, error, execute };
};
\`\`\`

## Testing Patterns

### 1. Component Testing with React Testing Library
Write maintainable tests for React components.

\`\`\`typescript
// Testing Examples
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

// Mock service worker setup
const server = setupServer(
  rest.get('/api/users', (req, res, ctx) => {
    return res(
      ctx.json([
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
      ])
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Component to test
const UserList = () => {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id} data-testid={\`user-\${user.id}\`}>
          {user.name} ({user.email})
        </li>
      ))}
    </ul>
  );
};

// Tests
describe('UserList', () => {
  it('renders loading state initially', () => {
    render(<UserList />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders users after successful fetch', async () => {
    render(<UserList />);
    
    await waitFor(() => {
      expect(screen.getByTestId('user-1')).toBeInTheDocument();
      expect(screen.getByTestId('user-2')).toBeInTheDocument();
    });
    
    expect(screen.getByText('John Doe (john@example.com)')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith (jane@example.com)')).toBeInTheDocument();
  });

  it('renders error state on fetch failure', async () => {
    server.use(
      rest.get('/api/users', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<UserList />);
    
    await waitFor(() => {
      expect(screen.getByText(/Error:/)).toBeInTheDocument();
    });
  });
});

// Form testing
const LoginForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const [formData, setFormData] = React.useState({ email: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
        placeholder="Email"
        data-testid="email-input"
      />
      <input
        type="password"
        value={formData.password}
        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
        placeholder="Password"
        data-testid="password-input"
      />
      <button type="submit" data-testid="submit-button">
        Login
      </button>
    </form>
  );
};

describe('LoginForm', () => {
  it('submits form data correctly', async () => {
    const mockOnSubmit = jest.fn();
    render(<LoginForm onSubmit={mockOnSubmit} />);

    const user = userEvent.setup();

    await user.type(screen.getByTestId('email-input'), 'test@example.com');
    await user.type(screen.getByTestId('password-input'), 'password123');
    await user.click(screen.getByTestId('submit-button'));

    expect(mockOnSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    });
  });

  it('validates required fields', async () => {
    const mockOnSubmit = jest.fn();
    render(<LoginForm onSubmit={mockOnSubmit} />);

    await userEvent.click(screen.getByTestId('submit-button'));

    expect(mockOnSubmit).toHaveBeenCalledWith({
      email: '',
      password: ''
    });
  });
});
\`\`\`

## Best Practices and Patterns

### 1. Error Boundaries
Handle errors gracefully with error boundaries.

\`\`\`typescript
// Error Boundary Pattern
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-4 border border-red-300 bg-red-50 rounded">
          <h2 className="text-red-800 font-semibold">Something went wrong</h2>
          <p className="text-red-600 mt-2">
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: undefined })}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage
const App = () => (
  <ErrorBoundary
    fallback={<div>Custom error message</div>}
    onError={(error, errorInfo) => {
      // Log to error reporting service
      console.error('App error:', error, errorInfo);
    }}
  >
    <ComponentThatMightError />
  </ErrorBoundary>
);
\`\`\`

### 2. Code Splitting and Lazy Loading
Optimize bundle size with code splitting.

\`\`\`typescript
// Code Splitting Examples
import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy load components
const Dashboard = lazy(() => import('./pages/Dashboard'));
const UserProfile = lazy(() => import('./pages/UserProfile'));
const Settings = lazy(() => import('./pages/Settings'));

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
);

// Route-based code splitting
const AppRoutes = () => (
  <Suspense fallback={<LoadingSpinner />}>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  </Suspense>
);

// Conditional lazy loading
const useLazyComponent = (importFn: () => Promise<any>) => {
  const [Component, setComponent] = React.useState<React.ComponentType | null>(null);
  const [loading, setLoading] = React.useState(false);

  const loadComponent = React.useCallback(async () => {
    setLoading(true);
    try {
      const module = await importFn();
      setComponent(() => module.default);
    } catch (error) {
      console.error('Failed to load component:', error);
    } finally {
      setLoading(false);
    }
  }, [importFn]);

  return { Component, loading, loadComponent };
};

// Usage
const LazyComponent = () => {
  const { Component, loading, loadComponent } = useLazyComponent(
    () => import('./HeavyComponent')
  );

  React.useEffect(() => {
    loadComponent();
  }, [loadComponent]);

  if (loading) return <LoadingSpinner />;
  if (!Component) return null;

  return <Component />;
};
\`\`\`

## Conclusion
Advanced React patterns enable you to build more maintainable, performant, and scalable applications. By mastering these patterns, you can create better user experiences and more robust codebases.

The key to success is understanding when and how to apply these patterns appropriately. Start with the fundamentals, then gradually incorporate more advanced patterns as your application grows in complexity.

## Next Steps
- Practice implementing these patterns in your projects
- Explore additional patterns like render props and higher-order components
- Learn about React 18 features like concurrent rendering
- Study performance optimization techniques
- Contribute to open-source React projects`,
      author: 'Divyansh Dubey',
      date: '2025-02-08',
      readTime: '15 min read',
      category: 'web-development',
      tags: ['React', 'TypeScript', 'Frontend'],
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
      featured: false
    },
    {
      id: 8,
      title: 'Machine Learning Model Deployment Strategies',
      excerpt: 'Learn different approaches to deploying machine learning models in production environments.',
      content: `Deploying machine learning models to production is a critical step in the ML lifecycle. In this comprehensive guide, we'll explore various deployment strategies and best practices for serving ML models in production environments.

## Understanding ML Model Deployment

### What is Model Deployment?
Model deployment is the process of making trained machine learning models available for real-world use. It involves serving predictions through APIs, managing model versions, monitoring performance, and ensuring reliability at scale.

**Key Challenges:**
- **Scalability**: Handling varying load demands
- **Latency**: Meeting real-time inference requirements
- **Reliability**: Ensuring 99.9%+ uptime
- **Monitoring**: Tracking model performance and drift
- **Versioning**: Managing model updates safely

## Deployment Patterns

### 1. Batch Processing vs Real-time Inference

**Batch Processing:**
\`\`\`python
# Batch Processing Example
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib
from datetime import datetime, timedelta

class BatchPredictor:
    def __init__(self, model_path: str):
        self.model = joblib.load(model_path)
        self.predictions = []
    
    def process_batch(self, data: pd.DataFrame) -> pd.DataFrame:
        """Process data in batches for predictions"""
        # Preprocess data
        processed_data = self.preprocess(data)
        
        # Make predictions
        predictions = self.model.predict(processed_data)
        probabilities = self.model.predict_proba(processed_data)
        
        # Add metadata
        results = data.copy()
        results['prediction'] = predictions
        results['confidence'] = probabilities.max(axis=1)
        results['processed_at'] = datetime.now()
        
        return results
    
    def preprocess(self, data: pd.DataFrame) -> pd.DataFrame:
        """Preprocess data for model input"""
        # Handle missing values
        data = data.fillna(data.mean())
        
        # Feature engineering
        data['feature_1_squared'] = data['feature_1'] ** 2
        data['feature_ratio'] = data['feature_1'] / (data['feature_2'] + 1e-8)
        
        return data

# Usage
predictor = BatchPredictor('model.pkl')
batch_data = pd.read_csv('daily_data.csv')
results = predictor.process_batch(batch_data)
results.to_csv('predictions.csv', index=False)
\`\`\`

**Real-time Inference:**
\`\`\`python
# Real-time Inference with FastAPI
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import numpy as np
import joblib
import time
from typing import Dict, Any

app = FastAPI(title="ML Model API")

class PredictionRequest(BaseModel):
    features: Dict[str, float]
    request_id: str = None

class PredictionResponse(BaseModel):
    prediction: int
    confidence: float
    processing_time: float
    request_id: str

class RealTimePredictor:
    def __init__(self, model_path: str):
        self.model = joblib.load(model_path)
        self.preprocessing_pipeline = self.load_preprocessor()
    
    def predict(self, features: Dict[str, float]) -> Dict[str, Any]:
        start_time = time.time()
        
        # Preprocess features
        processed_features = self.preprocess_features(features)
        
        # Make prediction
        prediction = self.model.predict([processed_features])[0]
        confidence = self.model.predict_proba([processed_features]).max()
        
        processing_time = time.time() - start_time
        
        return {
            'prediction': int(prediction),
            'confidence': float(confidence),
            'processing_time': processing_time
        }
    
    def preprocess_features(self, features: Dict[str, float]) -> np.ndarray:
        """Preprocess features for model input"""
        # Convert to array and apply preprocessing
        feature_array = np.array([list(features.values())])
        return self.preprocessing_pipeline.transform(feature_array)

# Initialize predictor
predictor = RealTimePredictor('model.pkl')

@app.post("/predict", response_model=PredictionResponse)
async def predict(request: PredictionRequest):
    try:
        result = predictor.predict(request.features)
        return PredictionResponse(
            prediction=result['prediction'],
            confidence=result['confidence'],
            processing_time=result['processing_time'],
            request_id=request.request_id
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "healthy", "model_loaded": True}
\`\`\`

### 2. Model Serving with REST APIs and gRPC

**REST API Implementation:**
\`\`\`python
# REST API with Flask
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import joblib
import logging
from functools import wraps
import time

app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load model
model = joblib.load('model.pkl')

def timing_decorator(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        start_time = time.time()
        result = f(*args, **kwargs)
        end_time = time.time()
        logger.info(f"Request processed in {end_time - start_time:.4f} seconds")
        return result
    return decorated_function

@app.route('/predict', methods=['POST'])
@timing_decorator
def predict():
    try:
        data = request.get_json()
        features = np.array(data['features']).reshape(1, -1)
        
        # Make prediction
        prediction = model.predict(features)[0]
        confidence = model.predict_proba(features).max()
        
        return jsonify({
            'prediction': int(prediction),
            'confidence': float(confidence),
            'timestamp': time.time()
        })
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
\`\`\`

**gRPC Implementation for High Performance:**
\`\`\`python
# gRPC Model Serving
import grpc
from concurrent import futures
import numpy as np
import joblib
import time
from typing import Iterator

# Import generated protobuf
import prediction_pb2
import prediction_pb2_grpc

class PredictionService(prediction_pb2_grpc.PredictionServiceServicer):
    def __init__(self):
        self.model = joblib.load('model.pkl')
        self.preprocessor = joblib.load('preprocessor.pkl')
    
    def Predict(self, request, context):
        try:
            # Convert request to numpy array
            features = np.array(request.features).reshape(1, -1)
            
            # Preprocess
            processed_features = self.preprocessor.transform(features)
            
            # Predict
            prediction = self.model.predict(processed_features)[0]
            confidence = self.model.predict_proba(processed_features).max()
            
            return prediction_pb2.PredictionResponse(
                prediction=int(prediction),
                confidence=float(confidence),
                timestamp=time.time()
            )
        except Exception as e:
            context.abort(grpc.StatusCode.INTERNAL, str(e))
    
    def PredictStream(self, request_iterator, context):
        """Stream predictions for batch processing"""
        for request in request_iterator:
            try:
                features = np.array(request.features).reshape(1, -1)
                processed_features = self.preprocessor.transform(features)
                prediction = self.model.predict(processed_features)[0]
                confidence = self.model.predict_proba(processed_features).max()
                
                yield prediction_pb2.PredictionResponse(
                    prediction=int(prediction),
                    confidence=float(confidence),
                    timestamp=time.time()
                )
            except Exception as e:
                context.abort(grpc.StatusCode.INTERNAL, str(e))

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    prediction_pb2_grpc.add_PredictionServiceServicer_to_server(
        PredictionService(), server
    )
    server.add_insecure_port('[::]:50051')
    server.start()
    server.wait_for_termination()

if __name__ == '__main__':
    serve()
\`\`\`

## Containerization and Orchestration

### 1. Docker Containerization

**Dockerfile for ML Models:**
\`\`\`dockerfile
# Multi-stage build for ML model serving
FROM python:3.9-slim as base

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy model files
COPY models/ ./models/
COPY app.py .

# Create non-root user
RUN useradd -m -u 1000 appuser && chown -R appuser:appuser /app
USER appuser

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

# Run the application
CMD ["python", "app.py"]
\`\`\`

**Requirements.txt:**
\`\`\`txt
fastapi==0.104.1
uvicorn==0.24.0
scikit-learn==1.3.2
numpy==1.24.3
pandas==2.0.3
joblib==1.3.2
pydantic==2.5.0
python-multipart==0.0.6
\`\`\`

### 2. Kubernetes Deployment

**Kubernetes Deployment YAML:**
\`\`\`yaml
# ml-model-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ml-model-deployment
  labels:
    app: ml-model
spec:
  replicas: 3
  selector:
    matchLabels:
      app: ml-model
  template:
    metadata:
      labels:
        app: ml-model
    spec:
      containers:
      - name: ml-model
        image: your-registry/ml-model:latest
        ports:
        - containerPort: 8000
        resources:
          requests:
            memory: "512Mi"
            cpu: "250m"
          limits:
            memory: "1Gi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 8000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 8000
          initialDelaySeconds: 5
          periodSeconds: 5
        env:
        - name: MODEL_PATH
          value: "/app/models/model.pkl"
        - name: LOG_LEVEL
          value: "INFO"
---
apiVersion: v1
kind: Service
metadata:
  name: ml-model-service
spec:
  selector:
    app: ml-model
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8000
  type: LoadBalancer
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: ml-model-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: ml-model-deployment
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
\`\`\`

## Cloud Platform Deployment

### 1. AWS SageMaker

**SageMaker Deployment Script:**
\`\`\`python
# AWS SageMaker Deployment
import sagemaker
from sagemaker.sklearn import SKLearn
from sagemaker import get_execution_role
import boto3

def deploy_to_sagemaker(model_path, role_arn):
    """Deploy model to AWS SageMaker"""
    
    # Initialize SageMaker session
    sagemaker_session = sagemaker.Session()
    role = get_execution_role()
    
    # Create SKLearn estimator
    sklearn_estimator = SKLearn(
        entry_point='inference.py',
        role=role,
        instance_type='ml.m5.large',
        framework_version='0.23-1',
        py_version='py3',
        sagemaker_session=sagemaker_session
    )
    
    # Train the model (or load pre-trained)
    sklearn_estimator.fit()
    
    # Deploy the model
    predictor = sklearn_estimator.deploy(
        initial_instance_count=1,
        instance_type='ml.m5.large',
        endpoint_name='ml-model-endpoint'
    )
    
    return predictor

# Inference script for SageMaker
\`\`\`python
# inference.py
import os
import joblib
import json
import numpy as np
from sklearn.preprocessing import StandardScaler

def model_fn(model_dir):
    """Load the model from disk"""
    model_path = os.path.join(model_dir, 'model.pkl')
    preprocessor_path = os.path.join(model_dir, 'preprocessor.pkl')
    
    model = joblib.load(model_path)
    preprocessor = joblib.load(preprocessor_path)
    
    return model, preprocessor

def input_fn(request_body, request_content_type):
    """Parse input data"""
    if request_content_type == 'application/json':
        input_data = json.loads(request_body)
        features = np.array(input_data['features'])
        return features
    else:
        raise ValueError(f"Unsupported content type: {request_content_type}")

def predict_fn(input_data, model_tuple):
    """Make predictions"""
    model, preprocessor = model_tuple
    
    # Preprocess input
    processed_data = preprocessor.transform(input_data.reshape(1, -1))
    
    # Make prediction
    prediction = model.predict(processed_data)[0]
    confidence = model.predict_proba(processed_data).max()
    
    return prediction, confidence

def output_fn(prediction, accept):
    """Format output"""
    if accept == 'application/json':
        return json.dumps({
            'prediction': int(prediction[0]),
            'confidence': float(prediction[1])
        })
    else:
        raise ValueError(f"Unsupported accept type: {accept}")
\`\`\`

### 2. Google Cloud AI Platform

**GCP AI Platform Deployment:**
\`\`\`python
# Google Cloud AI Platform Deployment
from google.cloud import aiplatform
from google.cloud.aiplatform import Model, Endpoint
import joblib
import os

def deploy_to_gcp(model_path, project_id, region):
    """Deploy model to Google Cloud AI Platform"""
    
    # Initialize AI Platform
    aiplatform.init(project=project_id, location=region)
    
    # Upload model to Cloud Storage
    bucket_name = f"{project_id}-ml-models"
    model_gcs_path = f"gs://{bucket_name}/models/model"
    
    # Create and deploy model
    model = Model.upload(
        display_name="ml-model",
        artifact_uri=model_gcs_path,
        serving_container_image_uri="gcr.io/cloud-aiplatform/prediction/sklearn-cpu.0-23:latest"
    )
    
    # Create endpoint
    endpoint = model.deploy(
        machine_type="n1-standard-2",
        accelerator_type=None,
        accelerator_count=None,
        min_replica_count=1,
        max_replica_count=10,
        traffic_split={"0": 100}
    )
    
    return endpoint

# Prediction client
def predict_gcp(endpoint, features):
    """Make predictions using GCP endpoint"""
    response = endpoint.predict(instances=[features])
    return response.predictions[0]
\`\`\`

## Model Monitoring and A/B Testing

### 1. Model Performance Monitoring

**MLflow Integration:**
\`\`\`python
# MLflow Model Monitoring
import mlflow
import mlflow.sklearn
from mlflow.tracking import MlflowClient
import pandas as pd
import numpy as np
from datetime import datetime, timedelta

class ModelMonitor:
    def __init__(self, model_name: str, experiment_name: str):
        self.model_name = model_name
        self.experiment_name = experiment_name
        self.client = MlflowClient()
        
        # Set experiment
        mlflow.set_experiment(experiment_name)
    
    def log_prediction(self, features: dict, prediction: float, 
                      actual: float = None, model_version: str = "latest"):
        """Log prediction for monitoring"""
        with mlflow.start_run():
            # Log features
            for key, value in features.items():
                mlflow.log_metric(f"feature_{key}", value)
            
            # Log prediction
            mlflow.log_metric("prediction", prediction)
            
            if actual is not None:
                mlflow.log_metric("actual", actual)
                mlflow.log_metric("error", abs(prediction - actual))
    
    def detect_drift(self, window_days: int = 30) -> dict:
        """Detect model drift using statistical tests"""
        # Get recent predictions
        end_date = datetime.now()
        start_date = end_date - timedelta(days=window_days)
        
        # Query MLflow for recent runs
        runs = self.client.search_runs(
            experiment_ids=[self.experiment_name],
            filter_string=f"start_time >= '{start_date}' AND start_time <= '{end_date}'"
        )
        
        # Analyze feature distributions
        drift_metrics = {}
        for run in runs:
            # Calculate drift metrics
            pass
        
        return drift_metrics
    
    def generate_monitoring_report(self) -> dict:
        """Generate comprehensive monitoring report"""
        return {
            "model_performance": self.get_performance_metrics(),
            "data_drift": self.detect_drift(),
            "prediction_latency": self.get_latency_stats(),
            "error_rates": self.get_error_rates()
        }

# Usage
monitor = ModelMonitor("fraud-detection", "fraud-detection-prod")
monitor.log_prediction(
    features={"amount": 1000, "location": "NYC"},
    prediction=0.8,
    actual=0.9
)
\`\`\`

### 2. A/B Testing Framework

**A/B Testing Implementation:**
\`\`\`python
# A/B Testing for ML Models
import random
import numpy as np
from typing import Dict, Any, List
from dataclasses import dataclass
from datetime import datetime, timedelta

@dataclass
class ExperimentConfig:
    name: str
    model_a: str
    model_b: str
    traffic_split: float  # Percentage of traffic to model B
    start_date: datetime
    end_date: datetime
    success_metric: str

class ABTestManager:
    def __init__(self):
        self.experiments: Dict[str, ExperimentConfig] = {}
        self.results: Dict[str, List[Dict]] = {}
    
    def create_experiment(self, config: ExperimentConfig):
        """Create a new A/B test experiment"""
        self.experiments[config.name] = config
        self.results[config.name] = []
    
    def get_model_for_request(self, experiment_name: str, user_id: str) -> str:
        """Determine which model to use for a request"""
        if experiment_name not in self.experiments:
            return "default"
        
        config = self.experiments[experiment_name]
        
        # Check if experiment is active
        now = datetime.now()
        if now < config.start_date or now > config.end_date:
            return config.model_a
        
        # Deterministic assignment based on user_id
        hash_value = hash(user_id) % 100
        if hash_value < config.traffic_split * 100:
            return config.model_b
        else:
            return config.model_a
    
    def log_result(self, experiment_name: str, user_id: str, 
                  model_used: str, prediction: float, actual: float = None):
        """Log experiment result"""
        if experiment_name not in self.experiments:
            return
        
        result = {
            "user_id": user_id,
            "model_used": model_used,
            "prediction": prediction,
            "actual": actual,
            "timestamp": datetime.now(),
            "error": abs(prediction - actual) if actual else None
        }
        
        self.results[experiment_name].append(result)
    
    def analyze_experiment(self, experiment_name: str) -> Dict[str, Any]:
        """Analyze A/B test results"""
        if experiment_name not in self.experiments:
            return {}
        
        results = self.results[experiment_name]
        config = self.experiments[experiment_name]
        
        # Separate results by model
        model_a_results = [r for r in results if r["model_used"] == config.model_a]
        model_b_results = [r for r in results if r["model_used"] == config.model_b]
        
        # Calculate metrics
        analysis = {
            "experiment_name": experiment_name,
            "total_requests": len(results),
            "model_a_requests": len(model_a_results),
            "model_b_requests": len(model_b_results),
            "model_a_avg_error": np.mean([r["error"] for r in model_a_results if r["error"] is not None]),
            "model_b_avg_error": np.mean([r["error"] for r in model_b_results if r["error"] is not None]),
            "statistical_significance": self.calculate_significance(model_a_results, model_b_results)
        }
        
        return analysis
    
    def calculate_significance(self, model_a_results: List, model_b_results: List) -> float:
        """Calculate statistical significance using t-test"""
        from scipy import stats
        
        a_errors = [r["error"] for r in model_a_results if r["error"] is not None]
        b_errors = [r["error"] for r in model_b_results if r["error"] is not None]
        
        if len(a_errors) < 2 or len(b_errors) < 2:
            return 1.0
        
        t_stat, p_value = stats.ttest_ind(a_errors, b_errors)
        return p_value

# Usage
ab_manager = ABTestManager()

# Create experiment
config = ExperimentConfig(
    name="fraud-detection-v2",
    model_a="fraud-model-v1",
    model_b="fraud-model-v2",
    traffic_split=0.1,  # 10% traffic to new model
    start_date=datetime.now(),
    end_date=datetime.now() + timedelta(days=30),
    success_metric="accuracy"
)

ab_manager.create_experiment(config)

# In prediction service
def predict_with_ab_test(user_id: str, features: dict):
    model_to_use = ab_manager.get_model_for_request("fraud-detection-v2", user_id)
    
    # Make prediction with selected model
    prediction = make_prediction(model_to_use, features)
    
    # Log result for analysis
    ab_manager.log_result("fraud-detection-v2", user_id, model_to_use, prediction)
    
    return prediction
\`\`\`

## Edge Deployment

### 1. TensorFlow Lite for Mobile/IoT

**TensorFlow Lite Model Conversion:**
\`\`\`python
# TensorFlow Lite Conversion
import tensorflow as tf
import numpy as np

def convert_to_tflite(model_path: str, output_path: str):
    """Convert TensorFlow model to TensorFlow Lite"""
    
    # Load the model
    model = tf.keras.models.load_model(model_path)
    
    # Convert to TensorFlow Lite
    converter = tf.lite.TFLiteConverter.from_keras_model(model)
    
    # Optimize for size and speed
    converter.optimizations = [tf.lite.Optimize.DEFAULT]
    converter.target_spec.supported_types = [tf.float16]
    
    # Convert
    tflite_model = converter.convert()
    
    # Save the model
    with open(output_path, 'wb') as f:
        f.write(tflite_model)
    
    print(f"Model converted and saved to {output_path}")

# TensorFlow Lite Inference
class TFLitePredictor:
    def __init__(self, model_path: str):
        self.interpreter = tf.lite.Interpreter(model_path=model_path)
        self.interpreter.allocate_tensors()
        
        # Get input and output details
        self.input_details = self.interpreter.get_input_details()
        self.output_details = self.interpreter.get_output_details()
    
    def predict(self, input_data: np.ndarray) -> np.ndarray:
        """Make prediction using TensorFlow Lite model"""
        # Set input tensor
        self.interpreter.set_tensor(self.input_details[0]['index'], input_data)
        
        # Run inference
        self.interpreter.invoke()
        
        # Get output tensor
        output_data = self.interpreter.get_tensor(self.output_details[0]['index'])
        
        return output_data

# Usage
convert_to_tflite('model.h5', 'model.tflite')
predictor = TFLitePredictor('model.tflite')
prediction = predictor.predict(np.array([[1.0, 2.0, 3.0]]))
\`\`\`

### 2. ONNX Runtime for Cross-Platform Deployment

**ONNX Model Conversion and Inference:**
\`\`\`python
# ONNX Model Conversion
import onnx
import onnxruntime as ort
import numpy as np
from sklearn.ensemble import RandomForestClassifier
import joblib

def convert_to_onnx(model_path: str, output_path: str):
    """Convert scikit-learn model to ONNX"""
    from skl2onnx import convert_sklearn
    from skl2onnx.common.data_types import FloatTensorType
    
    # Load the model
    model = joblib.load(model_path)
    
    # Define input type
    initial_type = [('float_input', FloatTensorType([None, model.n_features_in_]))]
    
    # Convert to ONNX
    onx = convert_sklearn(model, initial_types=initial_type)
    
    # Save the model
    with open(output_path, "wb") as f:
        f.write(onx.SerializeToString())
    
    print(f"Model converted and saved to {output_path}")

class ONNXPredictor:
    def __init__(self, model_path: str):
        self.session = ort.InferenceSession(model_path)
        self.input_name = self.session.get_inputs()[0].name
        self.output_name = self.session.get_outputs()[0].name
    
    def predict(self, input_data: np.ndarray) -> np.ndarray:
        """Make prediction using ONNX model"""
        # Run inference
        result = self.session.run([self.output_name], {self.input_name: input_data})
        return result[0]

# Usage
convert_to_onnx('model.pkl', 'model.onnx')
predictor = ONNXPredictor('model.onnx')
prediction = predictor.predict(np.array([[1.0, 2.0, 3.0]], dtype=np.float32))
\`\`\`

## Production Considerations

### 1. Model Versioning and Rollback

**Model Version Management:**
\`\`\`python
# Model Version Management
import os
import shutil
from datetime import datetime
from typing import Dict, List
import json

class ModelVersionManager:
    def __init__(self, model_registry_path: str):
        self.registry_path = model_registry_path
        self.versions_file = os.path.join(model_registry_path, "versions.json")
        self.load_versions()
    
    def load_versions(self):
        """Load version information"""
        if os.path.exists(self.versions_file):
            with open(self.versions_file, 'r') as f:
                self.versions = json.load(f)
        else:
            self.versions = {}
    
    def save_versions(self):
        """Save version information"""
        os.makedirs(self.registry_path, exist_ok=True)
        with open(self.versions_file, 'w') as f:
            json.dump(self.versions, f, indent=2)
    
    def register_model(self, model_path: str, model_name: str, 
                      version: str, metadata: Dict = None) -> str:
        """Register a new model version"""
        # Create version directory
        version_dir = os.path.join(self.registry_path, model_name, version)
        os.makedirs(version_dir, exist_ok=True)
        
        # Copy model file
        model_filename = os.path.basename(model_path)
        new_model_path = os.path.join(version_dir, model_filename)
        shutil.copy2(model_path, new_model_path)
        
        # Store metadata
        version_info = {
            "version": version,
            "path": new_model_path,
            "created_at": datetime.now().isoformat(),
            "metadata": metadata or {},
            "status": "active"
        }
        
        if model_name not in self.versions:
            self.versions[model_name] = {}
        
        self.versions[model_name][version] = version_info
        self.save_versions()
        
        return new_model_path
    
    def get_latest_version(self, model_name: str) -> str:
        """Get the latest version of a model"""
        if model_name not in self.versions:
            raise ValueError(f"Model {model_name} not found")
        
        versions = self.versions[model_name]
        active_versions = [v for v in versions.values() if v["status"] == "active"]
        
        if not active_versions:
            raise ValueError(f"No active versions for model {model_name}")
        
        # Return the most recent version
        latest = max(active_versions, key=lambda x: x["created_at"])
        return latest["version"]
    
    def rollback_to_version(self, model_name: str, version: str):
        """Rollback to a specific version"""
        if model_name not in self.versions:
            raise ValueError(f"Model {model_name} not found")
        
        if version not in self.versions[model_name]:
            raise ValueError(f"Version {version} not found for model {model_name}")
        
        # Deactivate all versions
        for v in self.versions[model_name].values():
            v["status"] = "inactive"
        
        # Activate the target version
        self.versions[model_name][version]["status"] = "active"
        self.save_versions()
    
    def list_versions(self, model_name: str) -> List[Dict]:
        """List all versions of a model"""
        if model_name not in self.versions:
            return []
        
        return list(self.versions[model_name].values())

# Usage
manager = ModelVersionManager("/path/to/model/registry")

# Register a new model version
manager.register_model(
    model_path="model_v2.pkl",
    model_name="fraud-detection",
    version="2.0.0",
    metadata={
        "accuracy": 0.95,
        "training_data_size": 100000,
        "features": ["amount", "location", "time"]
    }
)

# Rollback if needed
manager.rollback_to_version("fraud-detection", "1.0.0")
\`\`\`

### 2. Performance Monitoring and Alerting

**Comprehensive Monitoring System:**
\`\`\`python
# Model Performance Monitoring
import time
import threading
from collections import deque
from typing import Dict, List, Optional
import logging
from dataclasses import dataclass
from datetime import datetime, timedelta

@dataclass
class PredictionRecord:
    timestamp: datetime
    prediction_time: float
    input_size: int
    success: bool
    error_message: Optional[str] = None

class ModelMonitor:
    def __init__(self, window_size: int = 1000):
        self.window_size = window_size
        self.predictions = deque(maxlen=window_size)
        self.lock = threading.Lock()
        self.logger = logging.getLogger(__name__)
        
        # Alert thresholds
        self.latency_threshold = 1.0  # seconds
        self.error_rate_threshold = 0.05  # 5%
        self.throughput_threshold = 100  # requests per minute
    
    def record_prediction(self, prediction_time: float, input_size: int, 
                         success: bool, error_message: str = None):
        """Record a prediction for monitoring"""
        record = PredictionRecord(
            timestamp=datetime.now(),
            prediction_time=prediction_time,
            input_size=input_size,
            success=success,
            error_message=error_message
        )
        
        with self.lock:
            self.predictions.append(record)
        
        # Check for alerts
        self.check_alerts()
    
    def get_latency_stats(self) -> Dict[str, float]:
        """Get latency statistics"""
        with self.lock:
            if not self.predictions:
                return {}
            
            times = [p.prediction_time for p in self.predictions]
            return {
                "mean": sum(times) / len(times),
                "median": sorted(times)[len(times) // 2],
                "p95": sorted(times)[int(len(times) * 0.95)],
                "p99": sorted(times)[int(len(times) * 0.99)],
                "max": max(times),
                "min": min(times)
            }
    
    def get_error_rate(self) -> float:
        """Get current error rate"""
        with self.lock:
            if not self.predictions:
                return 0.0
            
            errors = sum(1 for p in self.predictions if not p.success)
            return errors / len(self.predictions)
    
    def get_throughput(self, window_minutes: int = 1) -> float:
        """Get requests per minute"""
        cutoff = datetime.now() - timedelta(minutes=window_minutes)
        
        with self.lock:
            recent = [p for p in self.predictions if p.timestamp >= cutoff]
            return len(recent) / window_minutes
    
    def check_alerts(self):
        """Check for performance alerts"""
        latency_stats = self.get_latency_stats()
        error_rate = self.get_error_rate()
        throughput = self.get_throughput()
        
        alerts = []
        
        # Check latency
        if latency_stats.get("p95", 0) > self.latency_threshold:
            alerts.append(f"High latency: P95 = {latency_stats['p95']:.3f}s")
        
        # Check error rate
        if error_rate > self.error_rate_threshold:
            alerts.append(f"High error rate: {error_rate:.2%}")
        
        # Check throughput
        if throughput < self.throughput_threshold:
            alerts.append(f"Low throughput: {throughput:.1f} req/min")
        
        # Log alerts
        for alert in alerts:
            self.logger.warning(f"Model Performance Alert: {alert}")
    
    def generate_report(self) -> Dict[str, any]:
        """Generate comprehensive monitoring report"""
        return {
            "latency_stats": self.get_latency_stats(),
            "error_rate": self.get_error_rate(),
            "throughput": self.get_throughput(),
            "total_predictions": len(self.predictions),
            "timestamp": datetime.now().isoformat()
        }

# Usage in prediction service
monitor = ModelMonitor()

def predict_with_monitoring(features: np.ndarray) -> float:
    start_time = time.time()
    
    try:
        # Make prediction
        prediction = model.predict(features)
        
        # Record successful prediction
        monitor.record_prediction(
            prediction_time=time.time() - start_time,
            input_size=len(features),
            success=True
        )
        
        return prediction
    
    except Exception as e:
        # Record failed prediction
        monitor.record_prediction(
            prediction_time=time.time() - start_time,
            input_size=len(features),
            success=False,
            error_message=str(e)
        )
        raise
\`\`\`

## Conclusion
Machine learning model deployment is a complex process that requires careful consideration of performance, reliability, and monitoring. By understanding different deployment patterns and implementing proper monitoring and versioning strategies, you can successfully deploy ML models to production.

The key to successful deployment is choosing the right approach for your specific use case, implementing proper monitoring and alerting, and having robust rollback strategies in place.

## Next Steps
- Implement monitoring dashboards for real-time model performance
- Set up automated model retraining pipelines
- Explore advanced deployment patterns like canary deployments
- Consider implementing model explainability and fairness monitoring`,
      author: 'Divyansh Dubey',
      date: '2025-06-28',
      readTime: '17 min read',
      category: 'machine-learning',
      tags: ['MLOps', 'Deployment', 'Production'],
      image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=250&fit=crop',
      featured: true
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const openModal = (post: any) => {
    setSelectedPost(post);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">Blog & Insights</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Exploring the latest trends in AI, machine learning, and data science. 
            Sharing knowledge and insights from the field.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <article
              key={post.id}
              className="card card-hover overflow-hidden group cursor-pointer"
              onClick={() => openModal(post)}
            >
              <div className="h-48 bg-gray-200 dark:bg-gray-600 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-primary-600 dark:group-hover:text-cyan-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 overflow-hidden" style={{ 
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical'
                }}>{post.excerpt}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(post);
                  }}
                  className="text-primary-600 dark:text-cyan-400 hover:text-primary-700 dark:hover:text-cyan-300 font-medium transition-colors"
                >
                  Read More →
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No articles found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop with blur effect */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
          ></div>
          
          {/* Modal Card with Glassmorphism */}
          <div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/20">
            {/* Modal Header */}
            <div className="sticky top-0 p-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-t-2xl">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(selectedPost.date)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{selectedPost.readTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{selectedPost.author}</span>
                    </div>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                    {selectedPost.title}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {selectedPost.tags.map((tag: string) => (
                      <span key={tag} className="px-3 py-1 bg-primary-100 dark:bg-cyan-500/20 text-primary-700 dark:text-cyan-400 text-sm rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
                    <Bookmark className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={closeModal}
                    className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="mb-6">
                <img 
                  src={selectedPost.image} 
                  alt={selectedPost.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <ReactMarkdown
                  children={selectedPost.content}
                  components={{
                    code({node, inline, className, children, ...props}: {node?: any, inline?: boolean, className?: string, children?: React.ReactNode, [key: string]: any}) {
                      const match = /language-(\w+)/.exec(className || '');
                      return !inline ? (
                        <SyntaxHighlighter
                          style={oneDark}
                          language={match ? match[1] : 'python'}
                          PreTag="div"
                          {...props}
                        >{String(children).replace(/\n$/, '')}</SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>{children}</code>
                      );
                    }
                  }}
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 p-6 border-t border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-b-2xl">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Published on {formatDate(selectedPost.date)}
                </div>
                <button 
                  onClick={closeModal}
                  className="px-6 py-2 bg-primary-600 dark:bg-cyan-600 text-white rounded-lg hover:bg-primary-700 dark:hover:bg-cyan-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog; 