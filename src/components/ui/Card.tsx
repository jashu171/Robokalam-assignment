import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <motion.div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export const CardHeader: React.FC<{ className?: string; children: React.ReactNode }> = ({ 
  className = '', 
  children 
}) => {
  return (
    <div className={`px-6 py-4 border-b border-gray-200 dark:border-gray-700 ${className}`}>
      {children}
    </div>
  );
};

export const CardTitle: React.FC<{ className?: string; children: React.ReactNode }> = ({ 
  className = '', 
  children 
}) => {
  return (
    <h3 className={`text-lg font-medium text-gray-900 dark:text-white ${className}`}>
      {children}
    </h3>
  );
};

export const CardContent: React.FC<{ className?: string; children: React.ReactNode }> = ({ 
  className = '', 
  children 
}) => {
  return (
    <div className={`px-6 py-4 ${className}`}>
      {children}
    </div>
  );
};

export const CardFooter: React.FC<{ className?: string; children: React.ReactNode }> = ({ 
  className = '', 
  children 
}) => {
  return (
    <div className={`px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 ${className}`}>
      {children}
    </div>
  );
};

export default Card;