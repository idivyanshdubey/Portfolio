import React from 'react';

interface AnimatedToastProps {
  message: string;
  icon?: React.ReactNode;
  type?: 'success' | 'error' | 'info';
}

const toastColors = {
  success: 'from-green-400/80 to-blue-500/80',
  error: 'from-red-500/80 to-pink-500/80',
  info: 'from-cyan-500/80 to-blue-500/80',
};

const accentColors = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  info: 'bg-cyan-500',
};

export const AnimatedToast: React.FC<AnimatedToastProps> = ({ message, icon, type = 'info' }) => (
  <div
    className={`
      flex items-center min-w-[220px] max-w-[340px] rounded-xl shadow-xl
      bg-gradient-to-r ${toastColors[type]}
      text-white font-normal
      backdrop-blur-lg border border-white/10 relative overflow-hidden
      px-0 py-0
      transition-all duration-500 ease-in-out
      opacity-100 translate-y-0 animate-toast-fade-in
    `}
    style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.10)' }}
  >
    {/* Left accent bar */}
    <div className={`h-full w-1.5 ${accentColors[type]} rounded-l-xl`} />
    {/* Content area with gap for icon and message */}
    <div className="flex items-center gap-2 py-2 px-4 w-full">
      {icon && (
        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 text-lg shadow-sm">
          {icon}
        </span>
      )}
      <span className="flex-1 text-base leading-snug tracking-tight break-words">
        {message}
      </span>
    </div>
    {/* Progress bar */}
    <div className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-white/60 to-transparent animate-toast-progress" />
    <style>{`
      @keyframes toast-fade-in {
        0% { opacity: 0; transform: translateY(20px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      .animate-toast-fade-in {
        animation: toast-fade-in 0.7s cubic-bezier(0.4,0,0.2,1);
      }
    `}</style>
  </div>
); 