import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = false, className = '', ...props }, ref) => {
    return (
      <div className={`mb-4 ${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label 
            htmlFor={props.id} 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            {label}
          </label>
        )}
        
        <motion.div
          whileFocus={{ scale: 1.01 }}
          className="relative"
        >
          <input
            ref={ref}
            className={`
              w-full px-4 py-2 border rounded-md 
              text-gray-700 dark:text-gray-200
              bg-white dark:bg-gray-800
              border-gray-300 dark:border-gray-600
              focus:border-blue-500 dark:focus:border-blue-400
              focus:outline-none focus:ring-2 focus:ring-blue-500/50
              transition-all duration-200 ease-in-out
              ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : ''}
              ${className}
            `}
            {...props}
          />
        </motion.div>
        
        {error && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;