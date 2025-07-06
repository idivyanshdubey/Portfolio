import React, { useState } from 'react';
import { Calendar, Clock, User, Tag, Search, Filter, X, Share2, Bookmark } from 'lucide-react';

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

In this comprehensive guide, we'll explore the fundamentals of deep learning and how to implement them using PyTorch. We'll start with the basics of neural networks, then move on to more advanced concepts like convolutional neural networks (CNNs) and recurrent neural networks (RNNs).

Key topics covered:
• Understanding neural network architecture and backpropagation
• Setting up PyTorch environment with CUDA support
• Building your first neural network for image classification
• Training and optimization techniques with Adam optimizer
• Real-world applications including computer vision and NLP
• Model deployment strategies for production environments

Practical Implementation:
We'll build a complete image classification model using PyTorch, covering data preprocessing, model architecture design, training loops, and evaluation metrics. The tutorial includes code examples for building CNNs, implementing data augmentation, and using transfer learning with pre-trained models.

Whether you're a beginner or an experienced developer, this guide will provide you with the knowledge and practical skills needed to start building deep learning models with PyTorch.`,
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
      content: `Real-time analytics dashboards are essential for modern businesses that need to make data-driven decisions quickly. In this article, we'll explore how to build interactive dashboards that provide real-time insights into your data.

We'll cover various technologies and frameworks including React for the frontend, FastAPI for the backend, and various visualization libraries like Chart.js and D3.js. You'll learn how to set up real-time data streaming, implement responsive design, and create engaging user interfaces.

Key features we'll implement:
• Real-time data streaming with WebSockets and Server-Sent Events
• Interactive charts and graphs with Plotly and Chart.js
• Responsive design for mobile devices and tablets
• Data filtering and search capabilities with advanced queries
• Export and sharing functionality with PDF generation
• User authentication and role-based access control

Technical Architecture:
The dashboard will use a microservices architecture with React frontend, FastAPI backend, PostgreSQL database, and Redis for caching. We'll implement real-time updates using WebSocket connections and create a scalable system that can handle thousands of concurrent users.

This tutorial is perfect for developers who want to create professional-grade analytics dashboards that can handle large volumes of data and provide meaningful insights to users.`,
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
      content: `Spring Boot has become the go-to framework for building enterprise-grade Java applications. Its convention-over-configuration approach and extensive ecosystem make it ideal for developing robust, scalable applications.

In this comprehensive guide, we'll explore advanced Spring Boot concepts including dependency injection, AOP (Aspect-Oriented Programming), security, and database integration. We'll also cover best practices for testing, deployment, and monitoring.

Key topics covered:
• Spring Boot architecture and component lifecycle management
• RESTful API development with proper HTTP status codes
• Database integration with JPA/Hibernate and connection pooling
• Security implementation with Spring Security and JWT tokens
• Testing strategies with JUnit 5, Mockito, and TestContainers
• Deployment and containerization with Docker and Kubernetes
• Monitoring and observability with Spring Boot Actuator

Enterprise Features:
We'll build a complete enterprise application including user management, role-based access control, audit logging, and integration with external services. The application will follow microservices architecture patterns and include proper error handling, validation, and documentation.

Whether you're preparing for the Oracle Java certification or building production applications, this guide will help you master Spring Boot and enterprise Java development.`,
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
      content: `Artificial Intelligence is rapidly evolving, with new breakthroughs happening almost daily. In this article, we'll explore the cutting-edge developments in AI and how they're transforming the field of data science.

From large language models like GPT-4 to advanced computer vision systems, we'll examine the technologies that are pushing the boundaries of what's possible. We'll also discuss the ethical implications and challenges that come with these advancements.

Emerging trends covered:
• Large Language Models and their applications in business
• Federated learning and privacy-preserving AI techniques
• Quantum computing and its impact on AI algorithms
• Edge AI and IoT integration for real-time processing
• Explainable AI and model interpretability frameworks
• AI governance and responsible AI development

Industry Impact:
We'll analyze how these technologies are transforming industries like healthcare, finance, and manufacturing. The article includes case studies of successful AI implementations and discusses the skills data scientists need to stay competitive in this rapidly evolving field.

This article provides insights into where AI is headed and how data scientists can prepare for the future of the field.`,
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
      content: `Microservices architecture has become the standard for building scalable, maintainable applications. Docker provides the perfect platform for containerizing and deploying these services.

In this tutorial, we'll walk through the process of designing, building, and deploying a microservices application using Docker. We'll cover service discovery, load balancing, and monitoring strategies.

Key concepts covered:
• Microservices design principles and domain-driven design
• Docker containerization with multi-stage builds
• Service communication patterns with REST and gRPC
• Database design for microservices with event sourcing
• Monitoring and logging strategies with ELK stack
• CI/CD pipeline implementation with GitHub Actions
• Service mesh implementation with Istio

Production Deployment:
We'll build a complete microservices application including user service, order service, and payment service. The application will include proper error handling, circuit breakers, and distributed tracing for production readiness.

This guide is essential for developers who want to understand modern application architecture and deployment practices.`,
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
      content: `The data science and AI industry offers diverse career opportunities for professionals with different backgrounds and interests. From data analysts to machine learning engineers, there are numerous paths to explore.

In this comprehensive guide, we'll explore various career roles, required skills, salary expectations, and growth opportunities. We'll also provide tips for transitioning into the field and building a successful career.

Career paths covered:
• Data Analyst and Business Intelligence with SQL and visualization tools
• Data Scientist and Machine Learning Engineer with Python and ML frameworks
• AI Research Scientist with advanced mathematics and research skills
• Data Engineer and MLOps Engineer with cloud and infrastructure expertise
• Product Manager for AI/ML products with business and technical knowledge

Skills and Certifications:
We'll discuss essential skills for each role, recommended certifications, and learning paths. The guide includes salary ranges, job market trends, and tips for building a strong portfolio and networking in the industry.

Whether you're just starting your career or looking to transition into data science, this guide will help you understand the landscape and plan your professional development.`,
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
      content: `React has evolved significantly since its introduction, with new patterns and best practices emerging regularly. In this article, we'll explore advanced React patterns that can help you build more maintainable and performant applications.

We'll cover topics like custom hooks, context optimization, performance optimization, and state management patterns. We'll also discuss how to integrate React with TypeScript for better type safety.

Advanced patterns covered:
• Custom hooks and composition patterns for reusable logic
• Context optimization and performance with useMemo and useCallback
• State management with Redux Toolkit and Zustand
• TypeScript integration best practices with strict typing
• Testing strategies with React Testing Library and Jest
• Server-side rendering with Next.js and performance optimization

Code Examples:
We'll build a complete React application demonstrating these patterns, including form handling, API integration, error boundaries, and accessibility features. The application will showcase modern React development practices and performance optimization techniques.

This article is perfect for React developers who want to take their skills to the next level and build enterprise-grade applications.`,
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

We'll cover different deployment patterns including batch processing, real-time inference, and edge deployment. We'll also discuss monitoring, versioning, and scaling strategies.

Deployment strategies covered:
• Batch processing vs real-time inference with performance comparison
• Model serving with REST APIs and gRPC for high-performance applications
• Containerization with Docker and orchestration with Kubernetes
• Cloud deployment on AWS SageMaker, GCP AI Platform, and Azure ML
• Model monitoring and A/B testing with MLflow and Kubeflow
• Edge deployment for IoT applications with TensorFlow Lite

Production Considerations:
We'll discuss model versioning, rollback strategies, and monitoring for model drift. The guide includes practical examples of deploying models using different cloud platforms and on-premise solutions.

This guide is essential for ML engineers and data scientists who need to deploy models in production environments.`,
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
              className="card card-hover overflow-hidden group"
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
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <button 
                  onClick={() => openModal(post)}
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
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/20">
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
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {selectedPost.content}
                </p>
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