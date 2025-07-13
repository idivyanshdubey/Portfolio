import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Code, Brain, BarChart3, MessageSquare, Home, FolderOpen, FileText } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/projects', label: 'Projects', icon: FolderOpen },
    { path: '/demos', label: 'AI Demos', icon: Brain },
    { path: '/blog', label: 'Blog', icon: FileText },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
    { path: '/chatbot', label: 'Chatbot', icon: MessageSquare },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'glass-effect shadow-lg border-b border-gray-200/20 dark:border-gray-700/20' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Enhanced Logo with Modern Effects */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-accent-600 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg shadow-md pulse-glow">
              <Code className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text transition-all duration-300 group-hover:scale-105 neon-glow">Portfolio</span>
          </Link>

          {/* Enhanced Desktop Navigation with Glassmorphism */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 focus-ring card-hover text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-cyan-400 hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
            <div className="ml-4">
              <ThemeToggle />
            </div>
          </div>

          {/* Enhanced Mobile menu button with Modern Effects */}
          <div className="md:hidden flex items-center space-x-3">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-cyan-400 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all duration-300 focus-ring card-hover"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <div className={`absolute inset-0 transition-all duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
                  {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation with Glassmorphism */}
        <div className={`md:hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <div className="glass-effect rounded-2xl shadow-xl border border-gray-200/20 dark:border-gray-700/20 mt-2 overflow-hidden">
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => handleNavClick(item.path)}
                    className="flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 focus-ring card-hover text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-cyan-400 hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 