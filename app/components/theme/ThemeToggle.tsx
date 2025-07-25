'use client';

import { motion } from 'framer-motion';
import { useTheme } from './ThemeProvider';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <motion.button
      onClick={toggleTheme}
      className={`p-2 ml-4 rounded-full transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-[var(--neon-purple)]/30 border-2 border-[var(--neon-purple)]/80 hover:border-[var(--neon-purple)] text-yellow-300 shadow-[0_0_20px_rgba(168,85,247,0.8)] hover:shadow-[0_0_30px_rgba(168,85,247,1)]'
          : 'bg-blue-500/30 border-2 border-blue-500/80 hover:border-blue-500 text-blue-300 shadow-[0_0_20px_rgba(59,130,246,0.8)] hover:shadow-[0_0_30px_rgba(59,130,246,1)]'
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
          />
        </svg>
      ) : (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
          />
        </svg>
      )}
    </motion.button>
  );
};

export default ThemeToggle;