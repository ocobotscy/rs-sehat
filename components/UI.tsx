import React from 'react';

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' | 'ghost' }> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) => {
  const baseStyle = "px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/40 focus:ring-emerald-500 border border-transparent",
    secondary: "bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 text-white focus:ring-slate-500 border border-transparent",
    outline: "border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 focus:ring-emerald-500",
    ghost: "text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 focus:ring-gray-500"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode; className?: string; title?: string }> = ({ children, className = '', title, ...props }) => (
  <div className={`bg-white dark:bg-slate-800/60 dark:backdrop-blur-md rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700/50 overflow-hidden transition-all duration-300 ${className}`} {...props}>
    {title && (
      <div className="px-6 py-4 border-b border-gray-100 dark:border-slate-700/50">
        <h3 className="text-lg font-bold text-gray-800 dark:text-slate-100">{title}</h3>
      </div>
    )}
    <div className="p-6 text-gray-900 dark:text-slate-200">{children}</div>
  </div>
);

export const Badge: React.FC<{ children: React.ReactNode; color?: 'green' | 'red' | 'yellow' | 'blue' }> = ({ children, color = 'green' }) => {
  const colors = {
    green: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20',
    red: 'bg-red-100 text-red-800 dark:bg-red-500/10 dark:text-red-400 border border-red-200 dark:border-red-500/20',
    yellow: 'bg-amber-100 text-amber-800 dark:bg-amber-500/10 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20',
    blue: 'bg-blue-100 text-blue-800 dark:bg-blue-500/10 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-bold ${colors[color]}`}>
      {children}
    </span>
  );
};

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label?: string }> = ({ label, className = '', ...props }) => (
  <div className="mb-4">
    {label && <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">{label}</label>}
    <input
      className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 dark:focus:border-emerald-400 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-slate-500 ${className}`}
      {...props}
    />
  </div>
);