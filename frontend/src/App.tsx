import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { initAllAnimations, ensureAnimationVisibility } from './utils/scrollAnimation';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Demos from './pages/Demos';
import Blog from './pages/Blog';
import Analytics from './pages/Analytics';
import Chatbot from './pages/Chatbot';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';

// Particle Background Component - IMPROVED
const ParticleBackground = () => {
  return (
    <div className="particles-bg">
      {[...Array(10)].map((_, i) => (
        <div key={i} className="particle" style={{ opacity: '0.3', zIndex: '0' }}></div>
      ))}
    </div>
  );
};

// Enhanced App Component with Modern Effects - IMPROVED
const EnhancedApp = () => {
  const { isDark } = useTheme();
  
  useEffect(() => {
    // Initialize all animations with delay to ensure DOM is ready
    const cleanup = initAllAnimations();
    
    // Ensure animations are visible after a short delay
    setTimeout(() => {
      ensureAnimationVisibility();
    }, 200);
    
    return cleanup;
  }, []);
  
  return (
    <div className={`App min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden`}>
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Gradient Overlay - IMPROVED */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 dark:from-blue-900/20 dark:to-purple-900/20 pointer-events-none z-0"></div>
      
      {/* Main Content */}
      <div className="relative z-10">
        <Navbar />
        <main className="flex-1">
          <AnimatedRoutes />
        </main>
        <Footer />
        <ScrollToTop />
        <Toaster
          position="top-right"
          toastOptions={{
            style: { 
              fontSize: '1.1rem', 
              borderRadius: '12px',
              background: isDark ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
            },
          }}
        />
      </div>
    </div>
  );
};

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fade-in-up"
          >
            <Home />
          </motion.div>
        } />
        <Route path="/projects" element={
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fade-in-up"
          >
            <Projects />
          </motion.div>
        } />
        <Route path="/demos" element={
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fade-in-up"
          >
            <Demos />
          </motion.div>
        } />
        <Route path="/blog" element={
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fade-in-up"
          >
            <Blog />
          </motion.div>
        } />
        <Route path="/analytics" element={
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fade-in-up"
          >
            <Analytics />
          </motion.div>
        } />
        <Route path="/chatbot" element={
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fade-in-up"
          >
            <Chatbot />
          </motion.div>
        } />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <EnhancedApp />
    </Router>
  );
}

const AppWithProvider = () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);

export default AppWithProvider; 