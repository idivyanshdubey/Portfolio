import React, { useState, useEffect } from 'react';
import { ArrowRight, Download, Mail, Github, Linkedin, Award, Clock, Users, Code, Database, Globe, Zap, Shield, Rocket, Star, TrendingUp, CheckCircle, ArrowUpRight, ExternalLink, FileText, MessageSquare, BarChart3, Settings, Palette, Moon, Sun, ChevronDown, ChevronUp, Plus, Minus, X, Search, Filter, Calendar, User, Tag, Share2, Bookmark, Heart, Eye, MousePointer, Download as DownloadIcon, TrendingUp as TrendingUpIcon, Users as UsersIcon, Eye as EyeIcon, Clock as ClockIcon, Globe as GlobeIcon, Smartphone, Mail as MailIcon, BarChart3 as BarChart3Icon, PieChart, Activity, Download as DownloadIcon2, TrendingUp as TrendingUpIcon2, Users as UsersIcon2, Eye as EyeIcon2, MousePointer as MousePointerIcon, Clock as ClockIcon2, BarChart3 as BarChart3Icon2, PieChart as PieChartIcon, Activity as ActivityIcon, GraduationCap, BookOpen, Briefcase, UserIcon, Server, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import ContactForm from '../components/ContactForm';
import InfiniteScroll from '../components/InfiniteScroll';
import DecryptedText from '../components/DecryptedText';

const timelineIcons = {
  university: GraduationCap,
  sports: Star,
  project: BookOpen,
  internship: Briefcase,
  graduation: GraduationCap,
  job: Briefcase,
  research: BookOpen,
  certification: Award,
  default: UserIcon
};

// Fix: Define a type for timeline items
interface TimelineItem {
  year: number;
  event: string;
}

function getTimelineIcon(event: string) {
  if (event.includes('B.Tech')) return GraduationCap;
  if (event.includes('Sports') || event.includes('Olympiad')) return Star;
  if (event.includes('project')) return BookOpen;
  if (event.includes('Interned') || event.includes('Analyst')) return Briefcase;
  if (event.includes('Graduated')) return GraduationCap;
  if (event.includes('Software Engineer')) return Briefcase;
  if (event.includes('research')) return BookOpen;
  if (event.includes('Oracle Certified')) return Award;
  return UserIcon;
}

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
    { icon: Users, label: 'Happy Clients', value: '2+' },
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

  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [timelineError, setTimelineError] = useState(false);
  useEffect(() => {
    fetch('/data/career_timeline.json')
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then((data) => {
        // Sort by year ascending
        data.sort((a: TimelineItem, b: TimelineItem) => a.year - b.year);
        setTimeline(data);
      })
      .catch(() => setTimelineError(true));
  }, []);

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section with Modern Effects */}
      <section className="relative pt-20 pb-16 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl float-animation"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl float-animation" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl float-animation" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8 animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="gradient-text neon-glow">
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
                <span className="text-gray-900 dark:text-gray-100">Portfolio</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed animate-slide-up animate-stagger-1">
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

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6 animate-slide-up animate-stagger-2">
              <a href="/projects" className="btn-modern inline-flex items-center hover-lift pulse-glow">
                View Projects
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="/demos" className="btn-secondary hover-lift glass-effect">
                Try AI Demos
              </a>
            </div>

            <div className="flex justify-center space-x-6 items-center mb-8 animate-slide-up animate-stagger-3">
              <a href="https://github.com/idivyanshdubey" target="_blank" rel="noopener noreferrer" className="p-3 glass-effect rounded-xl hover:scale-110 hover:shadow-lg transition-all duration-300 card-hover">
                <Github className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </a>
              <a href="https://www.linkedin.com/in/divyansh-dubey-48101025d/" target="_blank" rel="noopener noreferrer" className="p-3 glass-effect rounded-xl hover:scale-110 hover:shadow-lg transition-all duration-300 card-hover">
                <Linkedin className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </a>
              <a href="mailto:divyanshhdubey10@gmail.com" className="p-3 glass-effect rounded-xl hover:scale-110 hover:shadow-lg transition-all duration-300 card-hover">
                <Mail className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </a>
              <button
                onClick={() => setIsResumeOpen(true)}
                className="ml-4 px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-xl focus-ring pulse-glow"
              >
                View Resume
              </button>
            </div>

            {/* Enhanced Resume Modal */}
            {isResumeOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
                {/* Enhanced Backdrop with blur effect */}
                <div 
                  className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
                  onClick={() => setIsResumeOpen(false)}
                ></div>
                {/* Enhanced Modal Card with Glassmorphism */}
                <div className="relative w-full max-w-4xl mx-auto bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/20 flex flex-col md:flex-row overflow-hidden animate-scale-in" style={{ maxHeight: '90vh' }}>
                  {/* Enhanced Resume Image */}
                  <div className="md:w-1/2 w-full flex items-center justify-center bg-gradient-to-br from-cyan-100/40 to-blue-100/40 dark:from-cyan-900/40 dark:to-blue-900/40 p-4">
                    <img 
                      src="/resume.jpg" 
                      alt="Divyansh Dubey Resume" 
                      className="rounded-xl shadow-lg max-h-[85vh] object-contain border border-gray-200 dark:border-gray-700 hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  {/* Enhanced Intro and Download */}
                  <div className="md:w-1/2 w-full flex flex-col justify-between p-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Divyansh Dubey</h2>
                      <div className="inline-block mb-2 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold rounded-full shadow-lg">Oracle Certified Java SE 11 Professional</div>
                      <p className="text-gray-700 dark:text-gray-300 mb-2 font-medium">Full Stack Developer & Data Science Enthusiast</p>
                      <p className="text-gray-700 dark:text-gray-300 mb-2">Currently working as a <span className="font-semibold text-blue-600 dark:text-cyan-400">Software Engineer at LTIMindtree</span>.</p>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">Passionate about building robust, scalable web applications and intelligent AI solutions. Experienced in Java, Python, Spring Boot, Angular, and cloud-native technologies.</p>
                    </div>
                    <div className="flex items-center gap-4 mt-4">
                      <a
                        href="/resume.pdf"
                        download
                        className="inline-flex items-center px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-xl focus-ring"
                      >
                        <Download className="w-5 h-5 mr-2" /> Download as PDF
                      </a>
                      <button
                        onClick={() => setIsResumeOpen(false)}
                        className="ml-auto p-2 rounded-xl bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 transition-all duration-300 hover:scale-110 focus-ring"
                        aria-label="Close Resume Modal"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Enhanced Skills Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
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
                  className="card card-hover p-6 text-center animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${skill.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg hover:scale-110 transition-transform duration-300`}>
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

      {/* Enhanced Stats Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-accent-600 dark:from-cyan-600 dark:to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="text-center text-white animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Icon className="w-12 h-12 mx-auto mb-4 opacity-80 hover:scale-110 transition-transform duration-300" />
                  <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-lg opacity-90">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Featured Projects */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Featured Projects</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Showcasing innovative solutions that demonstrate technical excellence and creativity
            </p>
          </div>

          <div style={{height: '400px', position: 'relative'}} className="animate-slide-up">
            <InfiniteScroll
              items={featuredProjects.map(project => ({
                content: (
                  <div className="h-full flex flex-col justify-between">
                    <div className="h-48 bg-gray-200 dark:bg-gray-600 overflow-hidden rounded-xl mb-4 flex-shrink-0 hover:shadow-lg transition-all duration-300">
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
                      <a href={project.link} className="text-primary-600 dark:text-cyan-400 hover:text-primary-700 dark:hover:text-cyan-300 font-medium text-sm transition-colors duration-300">
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

          <div className="text-center mt-24 animate-fade-in">
            <a href="/projects" className="btn-primary inline-flex items-center hover-lift">
              View All Projects
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      {/* Enhanced Career Timeline Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Career Timeline</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A journey through my academic, extracurricular, and professional milestones
            </p>
          </div>
          {timelineError ? (
            <div className="text-center text-red-500 dark:text-red-400 text-lg py-8">
              Timeline data not found. Please ensure <code>data/career_timeline.json</code> exists in the public folder.
            </div>
          ) : (
            <div className="relative">
              <div className="border-l-4 border-cyan-500 dark:border-cyan-400 absolute h-full left-6 top-0"></div>
              <ul className="space-y-12">
                {timeline.map((item: TimelineItem, idx) => {
                  const Icon = getTimelineIcon(item.event);
                  return (
                    <li key={idx} className="relative flex items-start group animate-fadeInTimeline">
                      <span className="absolute -left-2.5 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 text-white shadow-lg group-hover:scale-110 transition-transform ring-4 ring-white dark:ring-gray-900">
                        <Icon className="w-7 h-7" />
                      </span>
                      <div className="ml-16 w-full">
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">{item.year}</span>
                          <span className="text-xs px-2 py-1 bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-300 rounded-full shadow">Milestone</span>
                        </div>
                        <div className="mt-2 bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-lg p-5 border border-cyan-100 dark:border-cyan-900 transition-all duration-300 group-hover:shadow-2xl">
                          <span className="block text-gray-700 dark:text-gray-300 text-base max-w-xl">
                            {item.event}
                          </span>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <style>{`
                @keyframes fadeInTimeline {
                  0% { opacity: 0; transform: translateY(30px); }
                  100% { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeInTimeline {
                  animation: fadeInTimeline 0.7s cubic-bezier(0.4,0,0.2,1);
                }
              `}</style>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Let's Connect</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Ready to start a project or have a question? I'd love to hear from you!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Stylish Animated Design */}
            <div className="relative overflow-hidden animate-slide-up">
              <div className="relative z-10">
                <div className="bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-3xl p-8 border border-cyan-200/20 dark:border-cyan-800/20 backdrop-blur-sm">
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg animate-float">
                      <MessageSquare className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                      Start a Conversation
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      Whether you have a project idea, want to collaborate, or just want to say hello, 
                      I'm always excited to hear from fellow developers and innovators.
                    </p>
                  </div>

                  {/* Animated Stats */}
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm hover:scale-105 transition-transform duration-300">
                      <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400 mb-1">24h</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Response Time</div>
                    </div>
                    <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm hover:scale-105 transition-transform duration-300">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">100%</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Project Success</div>
                    </div>
                  </div>

                  {/* Quick Contact Info */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-center space-x-3 p-3 bg-white/30 dark:bg-gray-800/30 rounded-xl backdrop-blur-sm">
                      <Mail className="w-5 h-5 text-cyan-500" />
                      <span className="text-gray-700 dark:text-gray-300">divyanshhdubey10@gmail.com</span>
                    </div>
                    <div className="flex items-center justify-center space-x-3 p-3 bg-white/30 dark:bg-gray-800/30 rounded-xl backdrop-blur-sm">
                      <Phone className="w-5 h-5 text-blue-500" />
                      <span className="text-gray-700 dark:text-gray-300">+91 8368959173</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Animated Background Elements */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-20 h-20 bg-cyan-400/20 rounded-full animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-16 h-16 bg-blue-400/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-purple-400/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-10 left-1/3 w-8 h-8 bg-cyan-400/20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="animate-slide-up animate-stagger-1">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 