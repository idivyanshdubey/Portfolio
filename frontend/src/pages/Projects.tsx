import React, { useState } from 'react';
import { Search, Filter, ExternalLink, Github, Eye } from 'lucide-react';

const Projects: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'machine-learning', 'web-development', 'data-science', 'ai', 'mobile'];

  const projects = [
    {
      id: 0,
      title: 'AI Portfolio',
      description: 'A modern, AI-powered data science portfolio featuring interactive demos, analytics, a chatbot, and a blog. Built with React, FastAPI, PostgreSQL, and advanced UI/UX for showcasing machine learning and full-stack projects.',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop',
      category: 'ai',
      tags: ['React', 'FastAPI', 'AI', 'Portfolio', 'Data Science'],
      github: '#', // Replace with actual GitHub repo if available
      live: '#', // Replace with actual live link if available
      featured: true
    },
    {
      id: 1,
      title: 'Vegetable Selling Website',
      description: 'A modern e-commerce platform for selling fresh vegetables with user-friendly interface and secure payment integration.',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=250&fit=crop',
      category: 'web-development',
      tags: ['JavaScript', 'E-commerce', 'Web Development'],
      github: 'https://github.com/idivyanshdubey/vegetable-selling-website',
      live: 'https://github.com/idivyanshdubey/vegetable-selling-website',
      featured: true
    },
    {
      id: 2,
      title: 'FullStack Insight Hub',
      description: 'Comprehensive full-stack application showcasing modern web development practices and data insights.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
      category: 'web-development',
      tags: ['Java', 'Full-Stack', 'Analytics'],
      github: 'https://github.com/idivyanshdubey/FullStack-Insight-Hub',
      live: 'https://github.com/idivyanshdubey/FullStack-Insight-Hub',
      featured: true
    },
    {
      id: 3,
      title: 'Car Rental Management System',
      description: 'Complete car rental management solution with booking, inventory, and customer management features.',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=250&fit=crop',
      category: 'web-development',
      tags: ['Java', 'Management', 'System'],
      github: 'https://github.com/idivyanshdubey/Car-Rental-Management-System',
      live: 'https://github.com/idivyanshdubey/Car-Rental-Management-System',
      featured: true
    },
    {
      id: 4,
      title: 'IPL Cricket Management',
      description: 'Cricket tournament management system for IPL with player statistics and match scheduling.',
      image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=250&fit=crop',
      category: 'web-development',
      tags: ['Java', 'Cricket', 'Management'],
      github: 'https://github.com/idivyanshdubey/IPL-',
      live: 'https://github.com/idivyanshdubey/IPL-',
      featured: false
    },
    {
      id: 5,
      title: 'Angular Form with Spring Boot',
      description: 'Modern web application demonstrating Angular frontend integration with Spring Boot backend.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop',
      category: 'web-development',
      tags: ['Angular', 'Spring Boot', 'Java'],
      github: 'https://github.com/idivyanshdubey/angular-form-using-springboot',
      live: 'https://github.com/idivyanshdubey/angular-form-using-springboot',
      featured: false
    },
    {
      id: 6,
      title: 'Expenditure Manager',
      description: 'Personal finance management application for tracking expenses and budgeting.',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop',
      category: 'web-development',
      tags: ['CSS', 'Finance', 'Management'],
      github: 'https://github.com/idivyanshdubey/Expenditure-Manager',
      live: 'https://github.com/idivyanshdubey/Expenditure-Manager',
      featured: false
    },
    {
      id: 7,
      title: 'iOS Calendar App',
      description: 'Native iOS calendar application built with Swift for efficient time management.',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop',
      category: 'mobile',
      tags: ['Swift', 'iOS', 'Calendar'],
      github: 'https://github.com/idivyanshdubey/Calendar',
      live: 'https://github.com/idivyanshdubey/Calendar',
      featured: false
    },
    {
      id: 8,
      title: 'DAA Algorithm Assignments',
      description: 'Collection of Design and Analysis of Algorithms implementations in C++.',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop',
      category: 'data-science',
      tags: ['C++', 'Algorithms', 'DAA'],
      github: 'https://github.com/idivyanshdubey/DAA_Assignments',
      live: 'https://github.com/idivyanshdubey/DAA_Assignments',
      featured: false
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">My Projects</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A collection of innovative projects showcasing expertise in AI, machine learning, 
            and full-stack development
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-cyan-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="text-gray-400 dark:text-gray-500 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-cyan-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="card card-hover overflow-hidden group"
            >
              {/* Project Image */}
              <div className="relative h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {project.featured && (
                  <div className="absolute top-4 left-4 bg-primary-600 dark:bg-cyan-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </div>
                )}
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{project.description}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-primary-100 dark:bg-cyan-500/20 text-primary-700 dark:text-cyan-400 text-sm rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                  >
                    <Github className="w-5 h-5" />
                    <span>Code</span>
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-primary-600 dark:text-cyan-400 hover:text-primary-700 dark:hover:text-cyan-300 transition-colors"
                  >
                    <Eye className="w-5 h-5" />
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No projects found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects; 