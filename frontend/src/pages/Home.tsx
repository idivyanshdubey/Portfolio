import React from 'react';
import { 
  Brain, 
  Code, 
  Database, 
  BarChart3, 
  ArrowRight, 
  Github, 
  Linkedin, 
  Mail,
  Star,
  TrendingUp,
  Users,
  Award
} from 'lucide-react';
import DecryptedText from '../components/DecryptedText';
import InfiniteScroll from '../components/InfiniteScroll';

const Home: React.FC = () => {
  const skills = [
    {
      icon: Brain,
      title: 'Machine Learning',
      description: 'Deep learning, NLP, computer vision, and predictive modeling',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Code,
      title: 'Full-Stack Development',
      description: 'React, Python, FastAPI, and modern web technologies',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Database,
      title: 'Data Engineering',
      description: 'ETL pipelines, data warehousing, and big data processing',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: BarChart3,
      title: 'Data Science',
      description: 'Statistical analysis, visualization, and business intelligence',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const stats = [
    { icon: Star, label: 'Projects Completed', value: '50+' },
    { icon: TrendingUp, label: 'Years Experience', value: '5+' },
    { icon: Users, label: 'Happy Clients', value: '25+' },
    { icon: Award, label: 'Awards Won', value: '10+' }
  ];

  const featuredProjects = [
    {
      title: 'Vegetable Selling Website',
      description: 'A modern e-commerce platform for selling fresh vegetables with user-friendly interface and secure payment integration.',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=250&fit=crop',
      tags: ['JavaScript', 'E-commerce', 'Web'],
      link: 'https://github.com/idivyanshdubey/vegetable-selling-website'
    },
    {
      title: 'FullStack Insight Hub',
      description: 'Comprehensive full-stack application showcasing modern web development practices and data insights.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
      tags: ['Java', 'Full-Stack', 'Analytics'],
      link: 'https://github.com/idivyanshdubey/FullStack-Insight-Hub'
    },
    {
      title: 'Car Rental Management System',
      description: 'Complete car rental management solution with booking, inventory, and customer management features.',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=250&fit=crop',
      tags: ['Java', 'Management', 'System'],
      link: 'https://github.com/idivyanshdubey/Car-Rental-Management-System'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 bg-hero-pattern opacity-5 dark:opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="gradient-text">
                  <DecryptedText 
                    text="AI-Powered"
                    speed={100}
                    maxIterations={15}
                    sequential={true}
                    revealDirection="start"
                    className="gradient-text"
                    encryptedClassName="text-gray-400 dark:text-gray-500"
                    animateOn="view"
                  />
                </span>
                <br />
                <span className="text-gray-900 dark:text-gray-100">Data Science</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                <DecryptedText 
                  text="Transforming data into intelligent insights through cutting-edge machine learning and innovative AI solutions. Building the future, one algorithm at a time."
                  speed={50}
                  maxIterations={20}
                  sequential={true}
                  revealDirection="start"
                  className="text-gray-600 dark:text-gray-300"
                  encryptedClassName="text-gray-300 dark:text-gray-600"
                  animateOn="view"
                />
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <a href="/projects" className="btn-primary inline-flex items-center">
                View Projects
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
              <a href="/demos" className="btn-secondary">
                Try AI Demos
              </a>
            </div>

            <div className="flex justify-center space-x-6">
              <a href="https://github.com/idivyanshdubey" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <Github className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </a>
              <a href="https://www.linkedin.com/in/divyansh-dubey-48101025d/" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <Linkedin className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </a>
              <a href="mailto:divyanshhdubey10@gmail.com" className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <Mail className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Expertise & Skills</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Specialized in cutting-edge technologies and methodologies that drive innovation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div
                  key={skill.title}
                  className="card card-hover p-6 text-center"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${skill.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    <DecryptedText 
                      text={skill.title}
                      speed={80}
                      maxIterations={8}
                      sequential={false}
                      className="text-xl font-semibold text-gray-900 dark:text-gray-100"
                      encryptedClassName="text-xl font-semibold text-gray-400 dark:text-gray-500"
                      animateOn="hover"
                    />
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">{skill.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-accent-600 dark:from-cyan-600 dark:to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="text-center text-white"
                >
                  <Icon className="w-12 h-12 mx-auto mb-4 opacity-80" />
                  <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-lg opacity-90">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Featured Projects</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Showcasing innovative solutions that demonstrate technical excellence and creativity
            </p>
          </div>

          <div style={{height: '400px', position: 'relative'}}>
            <InfiniteScroll
              items={featuredProjects.map(project => ({
                content: (
                  <div className="h-full flex flex-col justify-between">
                    <div className="h-48 bg-gray-200 dark:bg-gray-600 overflow-hidden rounded-lg mb-4 flex-shrink-0">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
                        <DecryptedText 
                          text={project.title}
                          speed={70}
                          maxIterations={6}
                          sequential={false}
                          className="text-xl font-semibold text-gray-900 dark:text-gray-100"
                          encryptedClassName="text-xl font-semibold text-gray-400 dark:text-gray-500"
                          animateOn="hover"
                        />
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm line-clamp-3 flex-1">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 bg-primary-100 dark:bg-cyan-500/20 text-primary-700 dark:text-cyan-400 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <a href={project.link} className="text-primary-600 dark:text-cyan-400 hover:text-primary-700 dark:hover:text-cyan-300 font-medium text-sm">
                        Learn More →
                      </a>
                    </div>
                  </div>
                )
              }))}
              isTilted={false}
              autoplay={true}
              autoplaySpeed={0.02}
              autoplayDirection="left"
              pauseOnHover={true}
            />
          </div>

          <div className="text-center mt-24">
            <a href="/projects" className="btn-primary inline-flex items-center">
              View All Projects
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 