import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Mail, Code, Heart, MapPin, Phone, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/idivyanshdubey',
      icon: Github,
      color: 'hover:text-gray-300 hover:bg-gray-800'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/divyansh-dubey-48101025d/',
      icon: Linkedin,
      color: 'hover:text-blue-400 hover:bg-blue-900/20'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com',
      icon: Twitter,
      color: 'hover:text-blue-400 hover:bg-blue-900/20'
    },
    {
      name: 'Email',
      url: 'mailto:divyanshhdubey10@gmail.com',
      icon: Mail,
      color: 'hover:text-red-400 hover:bg-red-900/20'
    }
  ];

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'AI Demos', path: '/demos' },
    { name: 'Blog', path: '/blog' },
    { name: 'Analytics', path: '/analytics' },
    { name: 'Chatbot', path: '/chatbot' }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden animate-fade-in" style={{ paddingLeft: 0 }}>
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.02%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12" style={{ paddingLeft: 0 }}>
          {/* Enhanced Brand Section */}
          <div className="lg:col-span-2 animate-slide-up">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                <Code className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  AI Portfolio
                </span>
                <p className="text-xs text-gray-400 mt-1">Data Science & AI Solutions</p>
              </div>
            </div>
            <p className="text-gray-300 mb-8 leading-relaxed max-w-lg text-lg">
              A showcase of AI-powered projects, data science insights, and machine learning demos. 
              Exploring the intersection of technology and innovation to create intelligent solutions.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 bg-gray-800/50 backdrop-blur-sm rounded-xl text-gray-400 transition-all duration-300 border border-gray-700/50 ${social.color} hover:scale-110 hover:shadow-lg focus-ring`}
                    title={social.name}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Enhanced Quick Links */}
          <div className="animate-slide-up animate-stagger-1">
            <h3 className="text-xl font-semibold mb-4 text-white text-left">
              Quick Links
            </h3>
            <div className="flex flex-col gap-2 text-left">
              {quickLinks.map((link, index) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-gray-300 hover:text-white transition-all duration-300 text-base hover:translate-x-1 focus-ring"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Enhanced Contact Info */}
          <div className="animate-slide-up animate-stagger-2">
            <h3 className="text-xl font-semibold mb-4 text-white text-left">
              Contact
            </h3>
            <div className="flex flex-col gap-3 text-left">
              <div className="flex items-center hover:translate-x-1 transition-transform duration-300">
                <MapPin className="w-4 h-4 text-cyan-400 mr-2 flex-shrink-0" />
                <div>
                  <span className="font-medium text-white text-sm block">Location</span>
                  <span className="text-xs text-gray-300 block">New Delhi, India</span>
                </div>
              </div>
              <div className="flex items-center hover:translate-x-1 transition-transform duration-300">
                <Mail className="w-4 h-4 text-cyan-400 mr-2 flex-shrink-0" />
                <div>
                  <span className="font-medium text-white text-sm block">Email</span>
                  <a href="mailto:divyanshhdubey10@gmail.com" className="text-xs text-gray-300 hover:text-cyan-400 transition-colors duration-300 block">
                    divyanshhdubey10@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center hover:translate-x-1 transition-transform duration-300">
                <Phone className="w-4 h-4 text-cyan-400 mr-2 flex-shrink-0" />
                <div>
                  <span className="font-medium text-white text-sm block">Phone</span>
                  <a href="tel:+918368959173" className="text-xs text-gray-300 hover:text-cyan-400 transition-colors duration-300 block">
                    +91 8368959173
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Bottom Bar */}
        <div className="border-t border-gray-700/50 mt-12 pt-8 flex flex-col lg:flex-row justify-between items-center animate-fade-in">
          <p className="text-gray-400 text-sm">
            © {currentYear} <span className="text-cyan-400 font-medium">AI Portfolio</span>. All rights reserved.
          </p>
          <div className="flex items-center space-x-2 text-gray-400 text-sm mt-4 lg:mt-0">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 animate-pulse" />
            <span>using</span>
            <span className="text-cyan-400 font-medium hover:text-cyan-300 transition-colors duration-300">React</span>
            <span>&</span>
            <span className="text-cyan-400 font-medium hover:text-cyan-300 transition-colors duration-300">FastAPI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 