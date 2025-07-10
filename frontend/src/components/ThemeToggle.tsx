import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative group theme-toggle-btn focus-ring"
      aria-label="Toggle theme"
    >
      {/* Enhanced background ring with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm scale-110 group-hover:scale-125" />
      
      {/* Enhanced main button container */}
      <div className="relative bg-white dark:bg-gray-900 rounded-full p-3 shadow-lg border border-gray-200 dark:border-gray-700 group-hover:shadow-xl transition-all duration-500 group-hover:scale-110 hover-lift">
        
        {/* Enhanced icon container with glow effect */}
        <div className="relative">
          {/* Enhanced glow effect */}
          <div className={`absolute inset-0 rounded-full transition-all duration-500 ${
            isDark 
              ? 'bg-blue-500/20 shadow-lg shadow-blue-500/50 group-hover:shadow-xl group-hover:shadow-blue-500/70' 
              : 'bg-yellow-500/20 shadow-lg shadow-yellow-500/50 group-hover:shadow-xl group-hover:shadow-yellow-500/70'
          }`} />
          
          {/* Enhanced icon with improved animations */}
          <div className="relative z-10">
            {isDark ? (
              <Sun className="w-5 h-5 text-yellow-400 transition-all duration-500 group-hover:rotate-90 group-hover:scale-110" />
            ) : (
              <Moon className="w-5 h-5 text-blue-600 transition-all duration-500 group-hover:-rotate-12 group-hover:scale-110" />
            )}
          </div>
        </div>
        
        {/* Enhanced animated particles */}
        <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
          <div className={`absolute inset-0 transition-opacity duration-500 ${
            isDark ? 'opacity-100' : 'opacity-0'
          }`}>
            {/* Enhanced dark mode particles */}
            <div className="particle particle-1" />
            <div className="particle particle-2" />
            <div className="particle particle-3" />
            <div className="particle particle-4" />
          </div>
        </div>
      </div>
      
      {/* Enhanced ripple effect on click */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 opacity-0 group-active:opacity-30 transition-all duration-300 scale-0 group-active:scale-125" />
    </button>
  );
};

export default ThemeToggle; 