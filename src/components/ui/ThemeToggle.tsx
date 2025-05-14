import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

const ThemeToggle: React.FC = () => {
  // Check for user preference or system preference
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      // Check localStorage first
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) {
        return storedTheme === 'dark';
      }
      // Check system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  
  // Apply theme when component mounts and when theme changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);
  
  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  return (
    <motion.button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none"
      whileTap={{ scale: 0.9 }}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? (
        <Sun size={20} />
      ) : (
        <Moon size={20} />
      )}
    </motion.button>
  );
};

export default ThemeToggle;