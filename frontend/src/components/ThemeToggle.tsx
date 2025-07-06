import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative group theme-toggle-btn"
      aria-label="Toggle theme"
    >
      {/* Background ring with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm scale-110" />
      
      {/* Main button container */}
      <div className="relative bg-white dark:bg-gray-900 rounded-full p-3 shadow-lg border border-gray-200 dark:border-gray-700 group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
        
        {/* Icon container with glow effect */}
        <div className="relative">
          {/* Glow effect */}
          <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
            isDark 
              ? 'bg-blue-500/20 shadow-lg shadow-blue-500/50' 
              : 'bg-yellow-500/20 shadow-lg shadow-yellow-500/50'
          }`} />
          
          {/* Icon */}
          <div className="relative z-10">
            {isDark ? (
              <Sun className="w-5 h-5 text-yellow-400 transition-all duration-300 group-hover:rotate-90" />
            ) : (
              <Moon className="w-5 h-5 text-blue-600 transition-all duration-300 group-hover:-rotate-12" />
            )}
          </div>
        </div>
        
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
          <div className={`absolute inset-0 transition-opacity duration-300 ${
            isDark ? 'opacity-100' : 'opacity-0'
          }`}>
            {/* Dark mode particles */}
            <div className="particle particle-1" />
            <div className="particle particle-2" />
            <div className="particle particle-3" />
            <div className="particle particle-4" />
          </div>
        </div>
      </div>
      
      {/* Ripple effect on click */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 opacity-0 group-active:opacity-20 transition-opacity duration-150 scale-0 group-active:scale-100" />
    </button>
  );
};

export default ThemeToggle; 