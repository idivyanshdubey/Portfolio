import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, MessageSquare } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import GlitchText from '../components/GlitchText';
import '../components/GlitchText.css';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "## 🤖 **Hello! I'm Jarvis**\n\nI'm your AI assistant and I can help you with:\n\n• **Projects**: Explore my data science and AI projects\n• **Skills**: Learn about my technical expertise\n• **Demos**: Try interactive AI demonstrations\n• **Contact**: Get in touch for collaboration\n\n**What would you like to know?**",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "Tell me about your AI projects",
    "What technologies do you use?",
    "Show me your machine learning demos",
    "How can I contact you?",
    "What's your experience with Python?",
    "Tell me about your data science work",
    "Explain machine learning concepts",
    "Help me with web development",
    "What are your career goals?",
    "Share learning resources"
  ];

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/chatbot/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text.trim(),
          session_id: 'default-session'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      console.log('Failed to send message. Please try again.');
      const lowerText = text.trim().toLowerCase();
      const fallback = fallbackAnswers[lowerText];
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: fallback
          ? fallback
          : "I'm sorry, I don't have an answer for that right now, but you can ask about my projects, skills, or AI demos!",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputText);
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Fallback answers for common questions if backend is down
  const fallbackAnswers: { [key: string]: string } = {
    // Greetings
    "hi": "Hello! 👋 I'm Jarvis, Divyansh's AI assistant. Ask me about his projects, skills, experience, or anything tech-related!",
    "hello": "Hi there! I'm Jarvis. How can I help you explore Divyansh's portfolio today?",
    "hey": "Hey! What would you like to know — projects, skills, experience, or AI demos?",
    "good morning": "Good morning! ☀️ Ready to explore some amazing projects and AI demos?",
    "good afternoon": "Good afternoon! How can I help you today?",
    "good evening": "Good evening! Feel free to ask me anything about Divyansh's work and experience.",
    "thanks": "You're welcome! Feel free to ask anything else. 😊",
    "thank you": "Happy to help! Is there anything else you'd like to know?",

    // Identity
    "who are you": "I'm **Jarvis** — an AI assistant built by Divyansh Dubey. I can answer questions about his portfolio, projects, skills, and career. Ask away!",
    "who are you?": "I'm **Jarvis** — an AI assistant built by Divyansh Dubey. I can answer questions about his portfolio, projects, skills, and career. Ask away!",
    "what can you do": "I can answer questions about Divyansh's:\n\n• 💼 **Experience** at LTIMindtree\n• 🚀 **Projects** (Fraud Detection, IPL, Car Rental, etc.)\n• 🛠️ **Skills** (Java, Python, Spring Boot, React, Angular, Docker...)\n• 🎓 **Certifications** (Oracle Java SE 11)\n• 📬 **Contact Info**\n\nWhat would you like to explore?",
    "what can you do?": "I can answer questions about Divyansh's projects, skills, experience, education, and contact info. Ask me anything!",

    // About Divyansh
    "who is divyansh": "**Divyansh Dubey** is a Full Stack Developer and Data Science enthusiast. He currently works as a **Software Engineer at LTIMindtree**, India's leading IT services company. He is an **Oracle Certified Java SE 11 Professional** and has a B.Tech in Computer Science from MAIT, Delhi.",
    "who is divyansh dubey": "**Divyansh Dubey** is a Full Stack Developer & Software Engineer at LTIMindtree. Oracle Java SE 11 certified. Passionate about building intelligent, scalable web applications.",
    "tell me about yourself": "Hi! I'm Divyansh Dubey — a passionate **Full Stack Developer** and **Data Science Enthusiast**. I'm currently a **Software Engineer at LTIMindtree**, working on robust, scalable enterprise applications. I'm an **Oracle Certified Java SE 11 Professional** and love building AI-powered solutions. My tech stack spans Java, Python, Spring Boot, React, Angular, Docker, and more!",
    "about you": "Divyansh Dubey is a Full Stack Developer at LTIMindtree. Oracle Java SE 11 Certified, B.Tech from MAIT Delhi, passionate about AI and scalable web architecture.",
    "about divyansh": "Divyansh Dubey is a Software Engineer at LTIMindtree, Oracle Certified Java SE 11 Professional, B.Tech (CSE) from MAIT Delhi. Specializes in full-stack development and data science.",

    // Work Experience
    "where do you work": "Divyansh currently works as a **Software Engineer at LTIMindtree** — one of India's leading IT services and consulting companies. He builds robust, scalable web applications focused on data security and performance.",
    "where do you work?": "Divyansh currently works as a **Software Engineer at LTIMindtree**. He focuses on full-stack development, building enterprise-grade applications using Java, Spring Boot, and Angular.",
    "current job": "Divyansh is a **Software Engineer at LTIMindtree**. His work involves creating full-stack solutions and optimizing application performance with a strong focus on data security and integrity.",
    "what is ltimindtree": "**LTIMindtree** is a global technology consulting and services company formed by the merger of Larsen & Toubro Infotech and Mindtree. It's one of India's top IT firms. Divyansh works there as a Software Engineer.",
    "experience": "Divyansh has **1+ year** of professional software engineering experience at LTIMindtree. He has worked on full-stack applications, microservices architecture, and enterprise software solutions using Java, Spring Boot, Angular, and cloud technologies.",

    // Education
    "education": "Divyansh completed his **B.Tech in Computer Science & Engineering** from **MAIT (Maharaja Agrasen Institute of Technology), Delhi**. He was also active in sports and won multiple academic and extra-curricular awards.",
    "college": "Divyansh studied at **MAIT (Maharaja Agrasen Institute of Technology), New Delhi** — completing his B.Tech in CSE.",
    "where did you study": "Divyansh studied **Computer Science & Engineering** at **MAIT (Maharaja Agrasen Institute of Technology), Delhi**.",
    "university": "Divyansh studied at MAIT Delhi — Maharaja Agrasen Institute of Technology — for his B.Tech in Computer Science.",

    // Certifications
    "certifications": "Divyansh holds several certifications:\n\n🏆 **Oracle Certified Java SE 11 Professional**\n☁️ **Microsoft Azure AI Essentials**\n📋 **Atlassian Agile Project Management**\n🎓 **TCS iON Career Edge**\n🤖 **Generative AI Specialization**\n📊 **Mastering Data Analysis with Pandas**\n🐍 **Udemy Python Bootcamp**\n📈 **Streamlit with Python**\n🔍 **SQL Subqueries (Advanced)**",
    "oracle certification": "Divyansh is an **Oracle Certified Java SE 11 Professional** — one of the most prestigious Java certifications globally. This validates his deep expertise in Java programming.",
    "azure certification": "Divyansh holds the **Microsoft Azure AI Essentials** certification, demonstrating cloud computing and AI knowledge on the Azure platform.",

    // Skills
    "what technologies do you use": "Divyansh's full tech stack:\n\n**Languages:** Java, Python, C++, TypeScript, JavaScript\n**Frontend:** React, Angular, HTML5, CSS3, Bootstrap\n**Backend:** Spring Boot, FastAPI, Node.js\n**Databases:** PostgreSQL, MongoDB\n**DevOps:** Docker, Git, GitHub\n**Messaging:** RabbitMQ, ActiveMQ, Apache Kafka\n**Big Data:** Apache Spark, PySpark\n**Cloud:** Microsoft Azure\n**Tools:** Postman, Jira, Maven",
    "what technologies do you use?": "Divyansh's stack: Java, Python, Spring Boot, React, Angular, TypeScript, Docker, PostgreSQL, MongoDB, Apache Kafka, Azure, and more!",
    "skills": "Divyansh's key skills:\n\n• 💻 **Programming** — Java, Python, C++, TypeScript\n• 🌐 **Frontend** — React, Angular, HTML/CSS\n• ⚙️ **Backend** — Spring Boot, FastAPI, Node.js\n• 🗄️ **Databases** — PostgreSQL, MongoDB\n• 🐳 **DevOps** — Docker, Git, CI/CD\n• 📨 **Messaging** — Kafka, ActiveMQ, RabbitMQ\n• ☁️ **Cloud** — Microsoft Azure",
    "java": "Divyansh has deep expertise in **Java** — he's an **Oracle Certified Java SE 11 Professional**. He uses Java daily at LTIMindtree with Spring Boot for enterprise backend development.",
    "python": "Divyansh is proficient in **Python** for data science, machine learning (scikit-learn, pandas, numpy), and backend APIs (FastAPI). He has built several ML projects using Python.",
    "spring boot": "Divyansh uses **Spring Boot** extensively at LTIMindtree for building robust REST APIs and microservices. He pairs it with Angular and PostgreSQL for full-stack enterprise apps.",
    "react": "Divyansh built this entire portfolio using **React** with TypeScript and TailwindCSS! He also has experience building data dashboards and interactive UI components in React.",
    "docker": "Divyansh uses **Docker** for containerizing applications and has experience with Docker Compose for local multi-service development setups.",
    "angular": "Divyansh has built full-stack applications using **Angular** as the frontend framework, paired with Spring Boot backends and MySQL/PostgreSQL databases.",

    // Projects
    "projects": "Here are Divyansh's key projects:\n\n🌍 **BelVoyage** — React/Vite marketing site for a luxury travel house\n🔍 **AI-Powered Fraud Detection System** — ML fraud detection with Python & FastAPI\n🏏 **IPL Cricket Management** — Full-stack IPL tournament system\n🚗 **Car Rental Management System** — Java, Spring Boot, Angular\n🥦 **Vegetable Selling Website** — E-commerce platform in JavaScript\n📊 **FullStack Insight Hub** — Full-stack analytics app with PySpark & Kafka\n💼 **AI Portfolio** — This very portfolio!\n💸 **Expenditure Manager** — Personal finance tracker\n\nVisit the /projects page for full details!",
    "tell me about your projects": "Divyansh has worked on:\n\n• **BelVoyage** (React, Vite, Framer Motion, EmailJS)\n• **Fraud Detection** (ML + Python + FastAPI)\n• **IPL Management System** (Java, Spring Boot, Angular)\n• **Car Rental System** (Java, Spring Boot, Angular, MySQL)\n• **Vegetable E-commerce** (JavaScript)\n• **FullStack Insight Hub** (Java, PySpark, Kafka, PostgreSQL)\n• **Expenditure Manager** (HTML, CSS, JavaScript, Bootstrap)\n\nCheck out the Projects page for more!",
    "belvoyage": "The **BelVoyage** project is a modern, responsive, multi\u2011page marketing site for a boutique luxury travel house. It's built as a React Single Page Application using Vite, React Router, Framer Motion for animations, and EmailJS for the consultation form. It showcases a highly polished UI with a signature experiences carousel and scroll-triggered animations.",
    "fraud detector": "The **Fraud Detector** project uses Python, PySpark, FastAPI, and ML algorithms including ensemble methods and anomaly detection to identify fraudulent financial transactions in real-time.",
    "ipl project": "The **IPL Cricket Management System** is a full-stack web app for managing IPL tournament data — player statistics, match scheduling, and team management. Built with Java, Spring Boot (backend), Angular (frontend), and MySQL.",
    "car rental": "The **Car Rental Management System** is a complete rental solution with booking, inventory management, and customer management. Built with Java, Spring Boot, Angular, and MySQL. GitHub: github.com/idivyanshdubey/Car-Rental-Management-System",
    "vegetable website": "The **Vegetable Selling Website** is a modern JavaScript e-commerce platform for selling fresh vegetables online with user-friendly UI and payment integration. GitHub: github.com/idivyanshdubey/vegetable-selling-website",
    "fullstack insight hub": "The **FullStack Insight Hub** is a comprehensive data insights application built with Java, PySpark, Apache Kafka, and PostgreSQL. It showcases modern full-stack development with real-time data streaming. GitHub: github.com/idivyanshdubey/FullStack-Insight-Hub",

    // Contact
    "how can i contact you": "You can reach Divyansh through:\n\n📧 **Email:** divyanshhdubey10@gmail.com\n💼 **LinkedIn:** linkedin.com/in/divyansh-dubey-48101025d\n🐙 **GitHub:** github.com/idivyanshdubey\n📞 **Phone:** +91 8368959173\n📍 **Location:** New Delhi, India",
    "how can i contact you?": "📧 divyanshhdubey10@gmail.com | 💼 LinkedIn: divyansh-dubey-48101025d | 🐙 GitHub: idivyanshdubey | 📍 New Delhi, India",
    "email": "Divyansh's email is **divyanshhdubey10@gmail.com** — feel free to reach out for collaboration or opportunities!",
    "linkedin": "Divyansh's LinkedIn: **linkedin.com/in/divyansh-dubey-48101025d/** — connect with him for professional networking!",
    "github": "Divyansh's GitHub: **github.com/idivyanshdubey** — explore all his open-source projects there!",
    "location": "Divyansh is based in **New Delhi, India** 📍.",

    // Career
    "what are your career goals": "Divyansh's goal is to build **intelligent, scalable solutions** that make a real-world impact — combining full-stack engineering with AI/ML to solve meaningful problems. He's also passionate about open-source and mentoring.",
    "career goals": "Divyansh aims to grow as a senior full-stack engineer while deepening expertise in AI/ML systems, cloud-native architectures, and distributed data platforms.",

    // General Tech
    "tell me about your ai projects": "Divyansh has built several AI/ML projects including:\n\n• **Fraud Detection** — anomaly detection, ensemble ML\n• **Chatbot (Jarvis)** — this very AI assistant!\n• **AI Portfolio** — an entire AI-powered portfolio with chatbot, demos, analytics, and blog\n\nVisit /demos for interactive AI experiences!",
    "show me your machine learning demos": "Head to the **AI Demos** page (/demos) to try interactive demos including sentiment analysis, data visualization, and AI chatbot experiences!",
    "what is spring boot": "**Spring Boot** is a Java framework that simplifies building production-ready REST APIs and microservices. Divyansh uses it extensively at LTIMindtree for enterprise backend development.",
    "what is apache kafka": "**Apache Kafka** is a distributed event streaming platform used for real-time data pipelines and streaming applications. Divyansh has used it in the FullStack Insight Hub project.",
    "what is docker": "**Docker** is a containerization platform that allows applications to run consistently across different environments. Divyansh uses Docker for packaging and deploying his applications.",
    "tell me about your data science work": "Divyansh has worked on data analysis, fraud detection ML models, and data visualization projects using Python, Pandas, PySpark, scikit-learn, and Plotly. He also built an analytics dashboard in this very portfolio!",
    "explain machine learning concepts": "**Machine Learning** teaches computers to learn from data without being explicitly programmed. Key concepts:\n\n• **Supervised Learning** — classification & regression\n• **Unsupervised Learning** — clustering & anomaly detection\n• **Deep Learning** — neural networks for complex patterns\n• **NLP** — understanding human language\n\nDivyansh used ML in his Fraud Detector project!",
    "help me with web development": "Divyansh is full-stack! Key web dev tips:\n\n• **Frontend** — React or Angular + TypeScript\n• **Backend** — Spring Boot (Java) or FastAPI (Python)\n• **Database** — PostgreSQL for relational, MongoDB for NoSQL\n• **Deploy** — Docker + cloud (Azure/AWS)\n\nFeel free to ask about any specific technology!",
    "what is your experience with python": "Divyansh uses Python for data science (Pandas, NumPy, scikit-learn), machine learning (ML models), big data processing (PySpark), and backend development (FastAPI). He has built the backend of this portfolio with FastAPI!",
    "what's your experience with python?": "Divyansh uses Python for ML models, data analysis with Pandas/NumPy, FastAPI backends, and PySpark for big data. He built the Fraud Detector and this portfolio's AI backend with Python!",
    "share learning resources": "Great resources Divyansh recommends:\n\n📚 **Programming** — Official Java/Python docs, GeeksForGeeks\n🤖 **Machine Learning** — Coursera (Andrew Ng), Kaggle, fast.ai\n⚛️ **React** — React official docs, Scrimba\n🐍 **Python** — Automate the Boring Stuff, Real Python\n☁️ **Cloud** — Microsoft Learn (Azure), AWS Training\n🎓 **Certifications** — Oracle University, Udemy",
  };

  return (
    <div className="min-h-screen pt-16 pb-4 sm:pt-20 sm:pb-16">
      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 h-full flex flex-col">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-8">
          <div className="flex items-center justify-center space-x-3 mb-2 sm:mb-4">
            <GlitchText speed={0.7} enableShadows={true} enableOnHover={false} className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white">Jarvis</GlitchText>
          </div>
          <p className="text-sm sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-2">
            Have a conversation with my AI assistant. Ask about my projects, skills, 
            or anything related to AI and data science!
          </p>
        </div>

        {/* Chat Interface */}
        <div className="card flex flex-col" style={{ height: 'calc(100dvh - 13rem)', minHeight: '400px' }}>
          {/* Messages Area */}
          <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 sm:space-x-3 max-w-[90%] sm:max-w-[80%] ${
                  message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === 'user' 
                      ? 'bg-primary-600' 
                      : 'bg-gradient-to-r from-primary-600 to-accent-600'
                  }`}>
                    {message.sender === 'user' ? (
                      <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    ) : (
                      <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    )}
                  </div>
                  <div className={`rounded-lg px-3 py-2 sm:px-4 sm:py-3 ${
                    message.sender === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-200'
                  }`}>
                    <div className="text-sm prose prose-sm max-w-none dark:prose-invert">
                      <ReactMarkdown
                        components={{
                          h1: ({children}) => <h1 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{children}</h1>,
                          h2: ({children}) => <h2 className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-100">{children}</h2>,
                          h3: ({children}) => <h3 className="text-base font-semibold mb-2 text-gray-700 dark:text-gray-200">{children}</h3>,
                          p: ({children}) => <p className="mb-3 text-gray-700 dark:text-gray-300 leading-relaxed">{children}</p>,
                          ul: ({children}) => <ul className="list-disc list-inside mb-3 space-y-1 text-gray-700 dark:text-gray-300">{children}</ul>,
                          ol: ({children}) => <ol className="list-decimal list-inside mb-3 space-y-1 text-gray-700 dark:text-gray-300">{children}</ol>,
                          li: ({children}) => <li className="text-sm leading-relaxed">{children}</li>,
                          strong: ({children}) => <strong className="font-semibold text-gray-900 dark:text-white">{children}</strong>,
                          em: ({children}) => <em className="italic text-gray-800 dark:text-gray-200">{children}</em>,
                          code: ({children}) => <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-xs font-mono text-gray-800 dark:text-gray-200">{children}</code>,
                          pre: ({children}) => <pre className="bg-gray-200 dark:bg-gray-700 p-3 rounded text-xs overflow-x-auto mb-3 font-mono text-gray-800 dark:text-gray-200">{children}</pre>,
                          hr: () => <hr className="my-4 border-gray-300 dark:border-gray-600" />,
                          blockquote: ({children}) => <blockquote className="border-l-4 border-primary-500 pl-4 italic text-gray-600 dark:text-gray-400 mb-3">{children}</blockquote>,
                          a: ({href, children}) => <a href={href} className="text-primary-600 dark:text-primary-400 hover:underline" target="_blank" rel="noopener noreferrer">{children}</a>,
                          table: ({children}) => <div className="overflow-x-auto mb-3"><table className="min-w-full border border-gray-300 dark:border-gray-600">{children}</table></div>,
                          th: ({children}) => <th className="border border-gray-300 dark:border-gray-600 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-left font-semibold">{children}</th>,
                          td: ({children}) => <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">{children}</td>,
                          tr: ({children}) => <tr className="hover:bg-gray-50 dark:hover:bg-gray-800">{children}</tr>
                        }}
                      >
                        {message.text}
                      </ReactMarkdown>
                    </div>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-primary-100' : 'text-gray-500'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-primary-600 to-accent-600 rounded-full flex items-center justify-center">
                    <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2 sm:px-4 sm:py-3">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Jarvis is thinking...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Suggestions - scrollable on mobile */}
          <div className="border-t border-gray-200 dark:border-gray-700 px-3 sm:px-6 py-2 sm:py-4 bg-gray-50 dark:bg-gray-900/40">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 font-medium">Try asking about:</p>
            <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-x-visible scrollbar-hide">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="flex-shrink-0 px-3 py-1.5 bg-white dark:bg-gray-800 hover:bg-primary-100 dark:hover:bg-primary-900 text-gray-700 dark:text-gray-200 text-xs sm:text-sm rounded-full transition-all duration-200 shadow-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-400 whitespace-nowrap"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-3 sm:p-6">
            <form onSubmit={handleSubmit} className="flex space-x-2 sm:space-x-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent pr-10 sm:pr-12"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputText.trim()}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 sm:p-2 text-primary-600 hover:text-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Send message"
                >
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-8">
          <div className="card p-4 sm:p-6 text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">AI-Powered</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Advanced natural language processing for intelligent conversations
            </p>
          </div>
          
          <div className="card p-4 sm:p-6 text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent-100 dark:bg-accent-900/30 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-accent-600" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Context Aware</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Remembers conversation context for more meaningful interactions
            </p>
          </div>
          
          <div className="card p-4 sm:p-6 text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Portfolio Expert</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Specialized knowledge about my projects, skills, and experience
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot; 