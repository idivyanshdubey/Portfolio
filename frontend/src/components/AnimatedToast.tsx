import React from 'react';

interface AnimatedToastProps {
  message: string;
  icon?: React.ReactNode;
  type?: 'success' | 'error' | 'info';
}

const toastColors = {
  success: 'from-green-400 to-blue-500',
  error: 'from-red-500 to-pink-500',
  info: 'from-cyan-500 to-blue-500',
};

export const AnimatedToast: React.FC<AnimatedToastProps> = ({ message, icon, type = 'info' }) => (
  <div
    className={`
      flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl
      bg-gradient-to-r ${toastColors[type]}
      text-white font-semibold
      animate-toast-in
      backdrop-blur-md
      border border-white/10
      relative
      overflow-hidden
    `}
    style={{
      minWidth: 280,
      maxWidth: 400,
      boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
    }}
  >
    {icon && <span className="text-2xl">{icon}</span>}
    <span>{message}</span>
    <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-white/60 to-transparent animate-toast-progress" />
  </div>
); 