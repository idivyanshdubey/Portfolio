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
    "hi": "Hello! How can I assist you today?",
    "hello": "Hi there! How can I help you?",
    "hey": "Hey! What would you like to know about my projects or skills?",
    "good morning": "Good morning! How can I assist you today?",
    "good afternoon": "Good afternoon! How can I help you?",
    "good evening": "Good evening! What would you like to discuss?",
    "who are you?": "I'm Jarvis, your AI assistant. Ask me about my projects, skills, or anything related to AI and data science!",
    "who are you": "I'm Jarvis, your AI assistant. Ask me about my projects, skills, or anything related to AI and data science!",
    "what can you do?": "I can answer questions about my portfolio, skills, projects, and more. Try asking about my AI projects or tech stack!",
    "what can you do": "I can answer questions about my portfolio, skills, projects, and more. Try asking about my AI projects or tech stack!",
    "tell me about your ai projects": "I have built several AI projects including chatbots, recommendation systems, and machine learning demos. Check out my Projects page for more details!",
    "what technologies do you use?": "I use Java, Python, React, TypeScript, Spring Boot, Docker, and more. My tech stack is full-stack and cloud-ready.",
    "show me your machine learning demos": "You can try my interactive AI demos on the Demos page!",
    "how can i contact you?": "You can contact me via the Contact page or email me at divyanshhdubey10@gmail.com.",
    "what's your experience with python?": "I have extensive experience with Python for data science, machine learning, and backend development.",
    "tell me about your data science work": "I have worked on data analysis, visualization, and predictive modeling projects using Python, Pandas, and scikit-learn.",
    "explain machine learning concepts": "Machine learning is about teaching computers to learn from data. I can explain concepts like supervised learning, regression, classification, and more.",
    "help me with web development": "I can help you with React, Angular, Node.js, and modern web development best practices.",
    "what are your career goals?": "My goal is to build intelligent, scalable solutions that make a positive impact.",
    "share learning resources": "Some great resources: Coursera, freeCodeCamp, Kaggle, and official docs for Python, React, and more."
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <GlitchText speed={0.7} enableShadows={true} enableOnHover={false} className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">Jarvis</GlitchText>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have a conversation with my AI assistant. Ask about my projects, skills, 
            or anything related to AI and data science!
          </p>
        </div>

        {/* Chat Interface */}
        <div className="card h-[600px] flex flex-col">
          {/* Messages Area */}
          <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-3 max-w-[80%] ${
                  message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === 'user' 
                      ? 'bg-primary-600' 
                      : 'bg-gradient-to-r from-primary-600 to-accent-600'
                  }`}>
                    {message.sender === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div className={`rounded-lg px-4 py-3 ${
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
                    <p className={`text-xs mt-2 ${
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
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-accent-600 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">Jarvis is thinking...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Suggestions - always visible */}
          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 dark:bg-gray-900/40">
            <p className="text-sm text-gray-600 mb-3 font-medium">Try asking about:</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-3 py-2 bg-white dark:bg-gray-800 hover:bg-primary-100 dark:hover:bg-primary-900 text-gray-700 dark:text-gray-200 text-sm rounded-full transition-all duration-200 shadow-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-400 scale-100 hover:scale-105"
                  style={{ transition: 'transform 0.15s' }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-6">
            <form onSubmit={handleSubmit} className="flex space-x-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent pr-12"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputText.trim()}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-primary-600 hover:text-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Send message"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="card p-6 text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered</h3>
            <p className="text-gray-600">
              Advanced natural language processing for intelligent conversations
            </p>
          </div>
          
          <div className="card p-6 text-center">
            <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-6 h-6 text-accent-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Context Aware</h3>
            <p className="text-gray-600">
              Remembers conversation context for more meaningful interactions
            </p>
          </div>
          
          <div className="card p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Bot className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Portfolio Expert</h3>
            <p className="text-gray-600">
              Specialized knowledge about my projects, skills, and experience
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot; 