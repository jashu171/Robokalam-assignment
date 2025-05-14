import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, LogOut, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import ThemeToggle from '../ui/ThemeToggle';

const MenuBar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-md z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">Admin</span>
            <span className="text-xl font-bold text-gray-900 dark:text-white">Dashboard</span>
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {isAuthenticated ? (
              <>
                {/* User info */}
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    {user?.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="w-full h-full rounded-full"
                      />
                    ) : (
                      <User className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    )}
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-200">
                    {user?.name}
                  </span>
                </div>
                
                {/* Logout button */}
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate('/')}
                className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuBar;