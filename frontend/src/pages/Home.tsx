import React, { useState } from 'react';
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
  Award,
  Globe,
  Server,
  Layers,
  X,
  Download
} from 'lucide-react';
import DecryptedText from '../components/DecryptedText';
import InfiniteScroll from '../components/InfiniteScroll';

const Home: React.FC = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const skills = [
    {
      icon: Code,
      title: 'Programming Languages',
      description: 'Java, Python, C++, TypeScript, JavaScript with strong OOP and functional programming',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Globe,
      title: 'Web Development',
      description: 'React, Angular, HTML, CSS, Bootstrap, Node.js with modern frameworks and responsive design',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Server,
      title: 'Backend & DevOps',
      description: 'Spring Boot, FastAPI, Docker, Git, GitHub, PostgreSQL, MongoDB, RabbitMQ',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: BarChart3,
      title: 'Data Science',
      description: 'Statistical analysis, visualization, and business intelligence',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const stats = [
    { icon: Star, label: 'Projects Completed', value: '10+' },
    { icon: TrendingUp, label: 'Years Experience', value: '1+' },
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

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <a href="/projects" className="btn-primary inline-flex items-center">
                View Projects
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
              <a href="/demos" className="btn-secondary">
                Try AI Demos
              </a>
            </div>

            <div className="flex justify-center space-x-6 items-center mb-8">
              <a href="https://github.com/idivyanshdubey" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <Github className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </a>
              <a href="https://www.linkedin.com/in/divyansh-dubey-48101025d/" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <Linkedin className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </a>
              <a href="mailto:divyanshhdubey10@gmail.com" className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <Mail className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </a>
              <button
                onClick={() => setIsResumeOpen(true)}
                className="ml-4 px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                View Resume
              </button>
            </div>

            {/* Resume Modal */}
            {isResumeOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop with blur effect */}
                <div 
                  className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
                  onClick={() => setIsResumeOpen(false)}
                ></div>
                {/* Modal Card with Glassmorphism */}
                <div className="relative w-full max-w-4xl mx-auto bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/20 flex flex-col md:flex-row overflow-hidden animate-fadeInScale">
                  {/* Resume Image */}
                  <div className="md:w-1/2 w-full flex items-center justify-center bg-gradient-to-br from-cyan-100/40 to-blue-100/40 dark:from-cyan-900/40 dark:to-blue-900/40 p-4">
                    <img 
                      src="/resume.jpg" 
                      alt="Divyansh Dubey Resume" 
                      className="rounded-xl shadow-lg max-h-[70vh] object-contain border border-gray-200 dark:border-gray-700"
                    />
                  </div>
                  {/* Intro and Download */}
                  <div className="md:w-1/2 w-full flex flex-col justify-between p-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Divyansh Dubey</h2>
                      <div className="inline-block mb-2 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold rounded-full shadow">Oracle Certified Java SE 11 Professional</div>
                      <p className="text-gray-700 dark:text-gray-300 mb-2 font-medium">Full Stack Developer & Data Science Enthusiast</p>
                      <p className="text-gray-700 dark:text-gray-300 mb-2">Currently working as a <span className="font-semibold text-blue-600 dark:text-cyan-400">Software Engineer at LTIMindtree</span>.</p>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">Passionate about building robust, scalable web applications and intelligent AI solutions. Experienced in Java, Python, Spring Boot, Angular, and cloud-native technologies.</p>
                    </div>
                    <div className="flex items-center gap-4 mt-4">
                      <a
                        href="/resume.pdf"
                        download
                        className="inline-flex items-center px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold shadow hover:scale-105 transition-transform"
                      >
                        <Download className="w-5 h-5 mr-2" /> Download as PDF
                      </a>
                      <button
                        onClick={() => setIsResumeOpen(false)}
                        className="ml-auto p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 transition-colors"
                        aria-label="Close Resume Modal"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </div>
                <style>{`
                  @keyframes fadeInScale {
                    0% { opacity: 0; transform: scale(0.95); }
                    100% { opacity: 1; transform: scale(1); }
                  }
                  .animate-fadeInScale {
                    animation: fadeInScale 0.3s cubic-bezier(0.4,0,0.2,1);
                  }
                `}</style>
              </div>
            )}
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