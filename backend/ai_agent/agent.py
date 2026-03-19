import json
import re
from typing import Dict, List, Optional, Any, Callable
from datetime import datetime, timedelta
from dataclasses import dataclass, asdict
from enum import Enum
import asyncio
import requests
from .ai_integration import get_ai_integration

# Simple text processing functions (no external dependencies)
def simple_tokenize(text: str) -> List[str]:
    """Simple tokenization without NLTK"""
    return text.lower().split()

def simple_sentiment(text: str) -> Dict[str, Any]:
    """Simple sentiment analysis without TextBlob"""
    positive_words = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'love', 'like', 'happy', 'nice', 'awesome']
    negative_words = ['bad', 'terrible', 'awful', 'hate', 'dislike', 'sad', 'angry', 'horrible', 'worst', 'disappointing']
    
    words = simple_tokenize(text)
    positive_count = sum(1 for word in words if word in positive_words)
    negative_count = sum(1 for word in words if word in negative_words)
    
    if positive_count > negative_count:
        sentiment = "positive"
        polarity = 0.3
    elif negative_count > positive_count:
        sentiment = "negative"
        polarity = -0.3
    else:
        sentiment = "neutral"
        polarity = 0.0
    
    return {
        "polarity": polarity,
        "subjectivity": 0.5,  # Default subjectivity
        "sentiment": sentiment
    }

class AgentState(Enum):
    IDLE = "idle"
    THINKING = "thinking"
    EXECUTING = "executing"
    RESPONDING = "responding"

@dataclass
class Memory:
    """Represents a memory entry in the agent's memory"""
    content: str
    timestamp: datetime
    importance: float  # 0.0 to 1.0
    context: Dict[str, Any]
    memory_type: str  # "conversation", "fact", "preference", "action"

@dataclass
class Tool:
    """Represents a tool that the agent can use"""
    name: str
    description: str
    function: Callable
    parameters: Dict[str, Any]
    required_params: List[str]

@dataclass
class ReasoningStep:
    """Represents a step in the agent's reasoning process"""
    step_type: str  # "analysis", "planning", "execution", "evaluation"
    content: str
    confidence: float
    timestamp: datetime

class AIAgent:
    def __init__(self, agent_name: str = "Jarvis"):
        self.name = agent_name
        self.state = AgentState.IDLE
        self.memory: List[Memory] = []
        self.tools: Dict[str, Tool] = {}
        self.conversation_history: List[Dict[str, Any]] = []
        self.context: Dict[str, Any] = {}
        self.reasoning_chain: List[ReasoningStep] = []
        
        # Initialize default tools
        self._initialize_default_tools()
        
        # Load knowledge base
        self.knowledge_base = self._load_knowledge_base()
    
    def _load_knowledge_base(self) -> Dict[str, Any]:
        """Load the knowledge base with enhanced information"""
        return {
            "portfolio": {
                "keywords": ["portfolio", "projects", "work", "experience", "skills", "background", "about", "who", "creator", "divyansh"],
                "responses": [
                    "I'm Jarvis, Divyansh's AI assistant! I can help you explore his data science and full-stack projects, AI demos, and experience. What would you like to know?",
                    "Divyansh has built several robust projects including an AI Fraud Detection System, an IPL Management System, and a FullStack Insight Hub. Which area interests you?",
                    "You can explore his projects in full-stack development, machine learning, and data engineering. I can also help you try out live AI demos!"
                ],
                "facts": [
                    "Creator is Divyansh Dubey, a Software Engineer at LTIMindtree",
                    "Holds an Oracle Certified Java SE 11 Professional certification",
                    "Has a B.Tech in CSE from MAIT, Delhi",
                    "Specializes in full-stack enterprise applications and AI/ML solutions"
                ]
            },
            "projects": {
                "keywords": ["project", "fraud detection", "ipl", "car rental", "insight hub", "dashboard", "model", "application", "work", "build", "create", "vegetable"],
                "responses": [
                    "Here are some key projects:\n• BelVoyage (React, Vite, Framer Motion)\n• AI-Powered Fraud Detection System (ML, Python, FastAPI)\n• IPL Cricket Management System (Java, Spring Boot, Angular)\n• Car Rental Management (Spring Boot, MySQL)\n• FullStack Insight Hub (Java, PySpark, Kafka, PostgreSQL)\n• Vegetable E-commerce Website (JS)\n\nWould you like details on any specific project?",
                    "The projects showcase skills in Java, Spring Boot, Python, scikit-learn, React, Angular, and various cloud/data libraries. Which technology stack interests you?",
                    "You can view detailed project descriptions, technologies used, and GitHub links. What type of project would you like to explore?"
                ],
                "facts": [
                    "BelVoyage is a modern, responsive React/Vite single-page marketing site for a luxury travel house with EmailJS integration",
                    "Fraud detection system uses ensemble methods and PySpark for high-throughput anomaly detection",
                    "IPL and Car Rental projects are robust full-stack apps built with Java, Spring Boot, and Angular",
                    "FullStack Insight Hub demonstrates data streaming with Kafka and PySpark",
                    "All projects are accessible on GitHub at github.com/idivyanshdubey"
                ]
            },
            "demos": {
                "keywords": ["demo", "try", "test", "sentiment", "visualization", "image", "classification", "interactive", "play", "experiment"],
                "responses": [
                    "Great! You can try these live AI demos:\n• Sentiment Analysis: Analyze text sentiment\n• Data Visualization: Create interactive charts\n• Image Classification: Analyze uploaded images\n• Chatbot Demo: Interactive AI conversation\n\nWhich demo would you like to try?",
                    "The demos are fully functional and showcase real AI/ML capabilities. You can upload your own data or use sample data provided.",
                    "Each demo demonstrates different aspects of AI and data science. The sentiment analysis uses NLP, visualization uses plotly, and image classification uses computer vision techniques."
                ],
                "facts": [
                    "Sentiment analysis demo uses advanced NLP techniques",
                    "Visualization demo supports multiple chart types",
                    "Image classification demo can identify objects in images",
                    "All demos are interactive and user-friendly",
                    "Chatbot demo shows real-time AI conversation"
                ]
            },
            "skills": {
                "keywords": ["skill", "technology", "java", "python", "spring boot", "react", "angular", "machine learning", "ai", "data science", "expertise", "frameworks", "stack"],
                "responses": [
                    "Divyansh specializes in:\n• Programming (Java, Python, TypeScript)\n• Frontend (React, Angular, Bootstrap)\n• Backend (Spring Boot, FastAPI, Node.js)\n• Database (PostgreSQL, MongoDB)\n• DevOps & Cloud (Docker, Microsoft Azure)\n• Big Data & Messaging (Kafka, PySpark)\n\nWhich area would you like to know more about?",
                    "The tech stack includes robust enterprise tools like Java/Spring Boot alongside modern web tools like React/Angular and AI/ML frameworks.",
                    "Skills range from building distributed microservices using Kafka to developing real-time fraud detection ML models."
                ],
                "facts": [
                    "Oracle Certified Java SE 11 Professional",
                    "Expert in Java and Spring Boot for enterprise backend development",
                    "Proficient in Python for machine learning and data engineering",
                    "Full-stack development experience with both React and Angular",
                    "Experience with Microsoft Azure and Docker"
                ]
            },
            "contact": {
                "keywords": ["contact", "email", "linkedin", "github", "hire", "job", "collaboration", "reach out", "connect", "message"],
                "responses": [
                    "You can connect with Divyansh through:\n• Email: divyanshhdubey10@gmail.com\n• LinkedIn: linkedin.com/in/divyansh-dubey-48101025d\n• GitHub: github.com/idivyanshdubey\n• Location: New Delhi, India\n\nHe's happy to discuss collaboration opportunities!",
                    "Divyansh is active on LinkedIn and GitHub. Feel free to reach out via email for any inquiries!",
                    "For business inquiries or networking, please use his email (divyanshhdubey10@gmail.com) or connect on LinkedIn."
                ],
                "facts": [
                    "Currently employed as a Software Engineer at LTIMindtree",
                    "Based in New Delhi, India",
                    "Email: divyanshhdubey10@gmail.com",
                    "Open to open-source collaboration and networking"
                ]
            },
            "coding": {
                "keywords": ["code", "programming", "algorithm", "function", "script", "debug", "python", "javascript", "react", "fastapi", "write", "generate", "create"],
                "responses": [
                    "I can help you with programming questions and code generation! I'm experienced with Python, JavaScript, React, FastAPI, and various data science libraries. What specific coding challenge are you working on?",
                    "I can generate code examples, explain algorithms, help with debugging, and provide best practices. Just ask me to write code for any programming task!",
                    "Whether you need Python functions, React components, API endpoints, or data science code, I can help. What would you like me to code for you?"
                ],
                "facts": [
                    "Expert in Python with FastAPI, Flask, and Django",
                    "Proficient in JavaScript, React, and TypeScript",
                    "Experience with machine learning and data science libraries",
                    "Can generate working code examples and explain concepts"
                ]
            },
            "machine_learning": {
                "keywords": ["machine learning", "ml", "ai", "artificial intelligence", "neural network", "deep learning", "model", "algorithm", "prediction", "classification"],
                "responses": [
                    "Machine learning is fascinating! I can help you understand:\n• Supervised Learning (Classification, Regression)\n• Unsupervised Learning (Clustering, Dimensionality Reduction)\n• Deep Learning (Neural Networks, CNN, RNN)\n• Natural Language Processing (NLP)\n• Computer Vision\n\nWhat specific ML topic interests you?",
                    "My creator has experience with various ML frameworks including scikit-learn, TensorFlow, PyTorch, and specialized libraries for NLP and computer vision.",
                    "I can explain ML concepts, help you understand algorithms, and even generate code examples for machine learning projects."
                ],
                "facts": [
                    "Experience with supervised and unsupervised learning",
                    "Proficient in deep learning frameworks",
                    "Knowledge of NLP and computer vision",
                    "Understanding of model evaluation and optimization",
                    "Experience with MLOps and model deployment"
                ]
            },
            "data_science": {
                "keywords": ["data science", "data analysis", "statistics", "pandas", "numpy", "matplotlib", "seaborn", "visualization", "eda", "exploratory"],
                "responses": [
                    "Data science is the foundation of AI! I can help you with:\n• Data Cleaning and Preprocessing\n• Exploratory Data Analysis (EDA)\n• Statistical Analysis\n• Data Visualization\n• Feature Engineering\n• Model Building and Evaluation\n\nWhat aspect of data science would you like to explore?",
                    "My creator uses tools like pandas, numpy, matplotlib, seaborn, and plotly for comprehensive data analysis and visualization.",
                    "I can explain data science concepts, show you code examples, and help you understand the data science workflow."
                ],
                "facts": [
                    "Expert in data cleaning and preprocessing",
                    "Proficient in statistical analysis",
                    "Experience with data visualization tools",
                    "Knowledge of feature engineering techniques",
                    "Understanding of data science workflow"
                ]
            },
            "web_development": {
                "keywords": ["web development", "frontend", "backend", "react", "javascript", "typescript", "fastapi", "flask", "django", "api", "rest"],
                "responses": [
                    "Web development is crucial for modern applications! I can help you with:\n• Frontend Development (React, TypeScript, HTML/CSS)\n• Backend Development (FastAPI, Flask, Django)\n• API Design and Development\n• Database Integration\n• Deployment and DevOps\n\nWhat area of web development interests you?",
                    "My creator has built full-stack applications using React for frontend and FastAPI for backend, with expertise in API design and database management.",
                    "I can explain web development concepts, show you code examples, and help you understand modern web architecture."
                ],
                "facts": [
                    "Full-stack development experience",
                    "Proficient in React and TypeScript",
                    "Expert in FastAPI and Python web frameworks",
                    "Experience with API design and development",
                    "Knowledge of modern web architecture"
                ]
            },
            "cloud_devops": {
                "keywords": ["cloud", "devops", "docker", "aws", "azure", "deployment", "ci/cd", "kubernetes", "container", "infrastructure"],
                "responses": [
                    "Cloud and DevOps are essential for modern applications! I can help you with:\n• Cloud Platforms (AWS, Azure, GCP)\n• Containerization (Docker, Kubernetes)\n• CI/CD Pipelines\n• Infrastructure as Code\n• Monitoring and Logging\n\nWhat aspect of cloud/DevOps interests you?",
                    "My creator has experience deploying applications to cloud platforms, using Docker for containerization, and implementing CI/CD pipelines.",
                    "I can explain cloud concepts, show you deployment strategies, and help you understand modern DevOps practices."
                ],
                "facts": [
                    "Experience with AWS and Azure",
                    "Proficient in Docker and containerization",
                    "Knowledge of CI/CD pipelines",
                    "Understanding of infrastructure as code",
                    "Experience with monitoring and logging"
                ]
            },
            "career_advice": {
                "keywords": ["career", "job", "interview", "resume", "cv", "portfolio", "skills", "learning", "path", "advice"],
                "responses": [
                    "Career development is important! I can help you with:\n• Building a Strong Portfolio\n• Resume/CV Optimization\n• Interview Preparation\n• Skill Development Paths\n• Industry Trends and Opportunities\n\nWhat aspect of career development would you like advice on?",
                    "My creator has experience in the tech industry and can provide insights into building a successful career in data science and AI.",
                    "I can share tips on portfolio development, interview strategies, and staying current with industry trends."
                ],
                "facts": [
                    "Experience in tech industry",
                    "Knowledge of portfolio development",
                    "Understanding of interview processes",
                    "Awareness of industry trends",
                    "Insights into skill development"
                ]
            },
            "learning_resources": {
                "keywords": ["learn", "study", "course", "tutorial", "book", "resource", "education", "training", "certification"],
                "responses": [
                    "Learning is a journey! I can recommend resources for:\n• Online Courses (Coursera, edX, Udemy)\n• Books and Documentation\n• Practice Projects\n• Communities and Forums\n• Certifications\n\nWhat would you like to learn about?",
                    "My creator has curated a list of excellent learning resources for data science, AI, and web development.",
                    "I can recommend specific courses, books, and projects based on your interests and skill level."
                ],
                "facts": [
                    "Knowledge of online learning platforms",
                    "Familiarity with educational resources",
                    "Understanding of learning paths",
                    "Experience with various learning methods",
                    "Insights into effective study strategies"
                ]
            }
        }
    
    def _initialize_default_tools(self):
        """Initialize default tools that the agent can use"""
        
        # Tool: Search knowledge base
        def search_knowledge(query: str) -> Dict[str, Any]:
            """Search the knowledge base for relevant information"""
            query_lower = query.lower()
            results = {}
            
            for category, data in self.knowledge_base.items():
                relevance = 0
                for keyword in data["keywords"]:
                    if keyword in query_lower:
                        relevance += 1
                
                if relevance > 0:
                    results[category] = {
                        "relevance": relevance,
                        "facts": data.get("facts", []),
                        "responses": data.get("responses", [])
                    }
            
            return results
        
        # Tool: Analyze sentiment
        def analyze_sentiment(text: str) -> Dict[str, Any]:
            """Analyze the sentiment of text"""
            return simple_sentiment(text)
        
        # Tool: Extract key information
        def extract_key_info(text: str) -> Dict[str, Any]:
            """Extract key information from text"""
            try:
                tokens = simple_tokenize(text)
                # Simple stop words list
                stop_words = {'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'can', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them'}
                keywords = [token for token in tokens if token not in stop_words and len(token) > 2]
                
                return {
                    "keywords": keywords[:10],
                    "word_count": len(tokens),
                    "sentences": len(text.split('.'))
                }
            except:
                return {
                    "keywords": [],
                    "word_count": len(text.split()),
                    "sentences": len(text.split('.'))
                }
        
        # Tool: Get current context
        def get_context() -> Dict[str, Any]:
            """Get current conversation context"""
            return {
                "conversation_length": len(self.conversation_history),
                "recent_topics": self._get_recent_topics(),
                "user_preferences": self._get_user_preferences(),
                "current_session": self.context.get("session_id", "unknown")
            }
        
        # Register tools
        self.tools["search_knowledge"] = Tool(
            name="search_knowledge",
            description="Search the knowledge base for relevant information",
            function=search_knowledge,
            parameters={"query": "string"},
            required_params=["query"]
        )
        
        self.tools["analyze_sentiment"] = Tool(
            name="analyze_sentiment",
            description="Analyze the sentiment of text",
            function=analyze_sentiment,
            parameters={"text": "string"},
            required_params=["text"]
        )
        
        self.tools["extract_key_info"] = Tool(
            name="extract_key_info",
            description="Extract key information from text",
            function=extract_key_info,
            parameters={"text": "string"},
            required_params=["text"]
        )
        
        self.tools["get_context"] = Tool(
            name="get_context",
            description="Get current conversation context",
            function=get_context,
            parameters={},
            required_params=[]
        )
    
    def add_memory(self, content: str, importance: float = 0.5, memory_type: str = "conversation", context: Dict[str, Any] = None):
        """Add a memory entry"""
        memory = Memory(
            content=content,
            timestamp=datetime.now(),
            importance=importance,
            context=context or {},
            memory_type=memory_type
        )
        self.memory.append(memory)
        
        # Keep only recent memories (last 100)
        if len(self.memory) > 100:
            self.memory = sorted(self.memory, key=lambda x: x.importance, reverse=True)[:50]
    
    def get_relevant_memories(self, query: str, limit: int = 5) -> List[Memory]:
        """Get memories relevant to the current query"""
        query_lower = query.lower()
        relevant_memories = []
        
        for memory in self.memory:
            relevance = 0
            for word in query_lower.split():
                if word in memory.content.lower():
                    relevance += 1
            
            if relevance > 0:
                relevant_memories.append((memory, relevance))
        
        # Sort by relevance and importance
        relevant_memories.sort(key=lambda x: (x[1], x[0].importance), reverse=True)
        return [memory for memory, _ in relevant_memories[:limit]]
    
    def add_reasoning_step(self, step_type: str, content: str, confidence: float = 0.8):
        """Add a reasoning step to the chain"""
        step = ReasoningStep(
            step_type=step_type,
            content=content,
            confidence=confidence,
            timestamp=datetime.now()
        )
        self.reasoning_chain.append(step)
    
    def _get_recent_topics(self) -> List[str]:
        """Get recent conversation topics"""
        recent_messages = self.conversation_history[-10:] if self.conversation_history else []
        topics = []
        
        for msg in recent_messages:
            if "category" in msg:
                topics.append(msg["category"])
        
        return list(set(topics))
    
    def _get_user_preferences(self) -> Dict[str, Any]:
        """Extract user preferences from conversation history"""
        preferences = {
            "interests": [],
            "technical_level": "beginner",
            "preferred_topics": []
        }
        
        # Analyze recent messages for preferences
        recent_messages = self.conversation_history[-20:] if self.conversation_history else []
        
        for msg in recent_messages:
            if msg.get("sender") == "user":
                text = msg.get("message", "").lower()
                
                # Detect technical level
                technical_terms = ["api", "model", "algorithm", "deployment", "architecture"]
                if any(term in text for term in technical_terms):
                    preferences["technical_level"] = "advanced"
                elif any(term in text for term in ["basic", "simple", "explain", "how"]):
                    preferences["technical_level"] = "beginner"
        
        return preferences
    
    async def process_message(self, message: str, session_id: str = None) -> Dict[str, Any]:
        """Process a user message and generate a response"""
        self.state = AgentState.THINKING
        
        # Add to conversation history
        self.conversation_history.append({
            "sender": "user",
            "message": message,
            "timestamp": datetime.now(),
            "session_id": session_id
        })
        
        # Step 1: Analyze the message
        self.add_reasoning_step("analysis", f"Analyzing user message: {message[:50]}...")
        sentiment = self.tools["analyze_sentiment"].function(message)
        key_info = self.tools["extract_key_info"].function(message)
        context = self.tools["get_context"].function()
        
        # Step 2: Check if this is a code generation request
        message_lower = message.lower()
        code_keywords = ["write", "generate", "create", "code", "program", "function", "algorithm", "script"]
        is_code_request = any(keyword in message_lower for keyword in code_keywords)
        
        if is_code_request:
            self.add_reasoning_step("code_generation", "Detected code generation request")
            ai_integration = get_ai_integration()
            if ai_integration:
                # Generate code
                code_result = await ai_integration.generate_code(message, "python")
                if code_result.get("code"):
                    response_data = {
                        "response": f"Here's the code you requested:\n\n```python\n{code_result['code']}\n```\n\nThis code demonstrates the concept you asked for. You can copy and run it in your Python environment!",
                        "category": "coding",
                        "confidence": 0.9,
                        "suggestions": ["Try another algorithm", "Explain the code", "Show more examples", "Help with debugging"],
                        "sentiment": sentiment,
                        "context": context,
                        "model": code_result.get("model", "code-generator"),
                        "code": code_result.get("code")
                    }
                else:
                    # Fallback for code generation
                    response_data = {
                        "response": "I can help you with code generation! Here's a simple example:\n\n```python\ndef example_function():\n    \"\"\"Example function\"\"\"\n    return \"Hello, World!\"\n\nprint(example_function())\n```\n\nWhat specific code would you like me to generate?",
                        "category": "coding",
                        "confidence": 0.7,
                        "suggestions": ["Fibonacci sequence", "Sorting algorithms", "Machine learning example", "API endpoint"],
                        "sentiment": sentiment,
                        "context": context
                    }
            else:
                # No AI available for code generation
                response_data = {
                    "response": "I can help you with code examples! Here's a simple Python function:\n\n```python\ndef hello_world():\n    return \"Hello, World!\"\n\nprint(hello_world())\n```\n\nWhat specific code would you like me to show you?",
                    "category": "coding",
                    "confidence": 0.7,
                    "suggestions": ["Fibonacci sequence", "Sorting algorithms", "Machine learning example", "API endpoint"],
                    "sentiment": sentiment,
                    "context": context
                }
        else:
            # Step 3: Regular conversation - Try AI integration first, fallback to knowledge base
            ai_integration = get_ai_integration()
            if ai_integration:
                self.add_reasoning_step("ai_generation", "Using AI for response generation")
                
                # Prepare context for AI
                ai_context = {
                    "conversation_history": self.conversation_history[-10:],  # Last 10 messages
                    "user_preferences": context.get("user_preferences", {}),
                    "session_id": session_id
                }
                
                # Generate response with AI
                ai_result = await ai_integration.generate_response(message, ai_context)
                
                # Use AI response if successful
                if ai_result.get("response") and not ai_result.get("error"):
                    response_data = {
                        "response": ai_result["response"],
                        "category": ai_result.get("category", "general"),
                        "confidence": ai_result.get("confidence", 0.8),
                        "suggestions": self._generate_suggestions(ai_result.get("category", "general"), context),
                        "sentiment": sentiment,
                        "context": context,
                        "model": ai_result.get("model", "ai-integration")
                    }
                else:
                    # Fallback to knowledge base
                    self.add_reasoning_step("fallback", "AI failed, using knowledge base")
                    knowledge_results = self.tools["search_knowledge"].function(message)
                    relevant_memories = self.get_relevant_memories(message)
                    response_data = self._generate_response(message, knowledge_results, sentiment, relevant_memories, context)
            else:
                # No AI available, use knowledge base
                self.add_reasoning_step("knowledge_base", "Using knowledge base for response")
                knowledge_results = self.tools["search_knowledge"].function(message)
                relevant_memories = self.get_relevant_memories(message)
                response_data = self._generate_response(message, knowledge_results, sentiment, relevant_memories, context)
        
        # Step 3: Add to memory
        self.add_memory(
            f"User asked: {message}. I responded about: {response_data.get('category', 'general')}",
            importance=0.6,
            memory_type="conversation",
            context={"sentiment": sentiment, "category": response_data.get('category')}
        )
        
        # Add response to conversation history
        self.conversation_history.append({
            "sender": "assistant",
            "message": response_data["response"],
            "timestamp": datetime.now(),
            "session_id": session_id,
            "category": response_data.get("category")
        })
        
        self.state = AgentState.IDLE
        
        return response_data
    
    def _generate_response(self, message: str, knowledge_results: Dict, sentiment: Dict, memories: List[Memory], context: Dict) -> Dict[str, Any]:
        """Generate a response based on analysis"""
        
        # Determine best category
        best_category = "general"
        best_score = 0
        
        for category, data in knowledge_results.items():
            score = data["relevance"]
            if score > best_score:
                best_score = score
                best_category = category
        
        # Get response from knowledge base
        if best_category in self.knowledge_base:
            responses = self.knowledge_base[best_category]["responses"]
            import random
            base_response = random.choice(responses)
        else:
            base_response = "I'm not sure I understand. Could you rephrase that? I can help you explore projects, try demos, or answer questions about data science and AI."
        
        # Personalize response based on context
        personalized_response = self._personalize_response(base_response, sentiment, context, memories)
        
        # Generate suggestions
        suggestions = self._generate_suggestions(best_category, context)
        
        return {
            "response": personalized_response,
            "category": best_category,
            "confidence": best_score / 10,  # Normalize confidence
            "suggestions": suggestions,
            "sentiment": sentiment,
            "context": context
        }
    
    def _personalize_response(self, base_response: str, sentiment: Dict, context: Dict, memories: List[Memory]) -> str:
        """Personalize the response based on context"""
        
        # Adjust tone based on sentiment
        if sentiment.get("polarity", 0) < -0.3:
            # User seems frustrated, be more helpful
            base_response = "I understand your concern. " + base_response
        elif sentiment.get("polarity", 0) > 0.3:
            # User seems positive, be enthusiastic
            base_response = "Great! " + base_response
        
        # Add context from memories if relevant
        if memories:
            memory_context = f" Based on our previous conversation, "
            base_response = memory_context + base_response
        
        # Adjust technical level
        if context.get("user_preferences", {}).get("technical_level") == "beginner":
            base_response += "\n\n💡 Tip: I can explain technical concepts in simpler terms if needed!"
        
        return base_response
    
    def _generate_suggestions(self, category: str, context: Dict) -> List[str]:
        """Generate contextual suggestions"""
        base_suggestions = {
            "portfolio": ["Tell me about projects", "Show me demos", "What skills do you have?", "How can I contact you?", "Learn about my background"],
            "projects": ["House price prediction", "Sentiment analysis", "Data visualization", "Image classification", "Technologies used"],
            "demos": ["Try sentiment analysis", "Create a chart", "Upload an image", "Chat with AI", "Sample data"],
            "skills": ["Python expertise", "Machine learning", "Web development", "Cloud deployment", "Data science"],
            "contact": ["LinkedIn profile", "GitHub projects", "Email contact", "Availability", "Collaboration"],
            "coding": ["Write Fibonacci code", "Create a sorting algorithm", "Build a React component", "Make a FastAPI endpoint", "ML pipeline"],
            "machine_learning": ["Explain neural networks", "Show ML code examples", "Compare algorithms", "Discuss deep learning", "NLP concepts"],
            "data_science": ["Data cleaning techniques", "Statistical analysis", "Visualization examples", "Feature engineering", "EDA process"],
            "web_development": ["React components", "API design", "Database integration", "Deployment strategies", "Full-stack architecture"],
            "cloud_devops": ["Docker containers", "AWS services", "CI/CD pipelines", "Kubernetes", "Infrastructure as code"],
            "career_advice": ["Portfolio tips", "Interview preparation", "Resume optimization", "Skill development", "Industry trends"],
            "learning_resources": ["Online courses", "Recommended books", "Practice projects", "Certifications", "Learning paths"],
            "general": ["Explore projects", "Try demos", "Learn about skills", "Get contact info", "Ask about AI"]
        }
        
        suggestions = base_suggestions.get(category, base_suggestions["general"])
        
        # Add contextual suggestions based on conversation history
        if context.get("conversation_length", 0) > 5:
            suggestions.append("What else would you like to know?")
        
        return suggestions[:5]  # Limit to 5 suggestions
    
    def get_agent_status(self) -> Dict[str, Any]:
        """Get current agent status and capabilities"""
        return {
            "name": self.name,
            "state": self.state.value,
            "memory_count": len(self.memory),
            "conversation_count": len(self.conversation_history),
            "tools_available": list(self.tools.keys()),
            "reasoning_steps": len(self.reasoning_chain),
            "context": self.context
        } 