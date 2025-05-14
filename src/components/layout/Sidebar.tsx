import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users, BarChart, Settings, Menu, X } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const { user, logout } = useAuth();
  
  // Animation variants
  const sidebarVariants = {
    open: { 
      x: 0,
      transition: { 
        type: 'spring', 
        stiffness: 300, 
        damping: 30 
      }
    },
    closed: { 
      x: '-100%',
      transition: { 
        type: 'spring', 
        stiffness: 300, 
        damping: 30 
      }
    }
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Residents', path: '/residents', icon: <Users size={20} /> },
    { name: 'Analytics', path: '/analytics', icon: <BarChart size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-30">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md bg-white dark:bg-gray-800 shadow-md text-gray-700 dark:text-gray-200"
          aria-label="Menu"
        >
          <Menu size={24} />
        </button>
      </div>
      
      {/* Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <motion.div
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-xl z-30 
                   flex flex-col lg:translate-x-0`}
      >
        {/* Close button - mobile only */}
        <div className="lg:hidden absolute top-4 right-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Logo and header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">Admin</span>
            <span className="text-xl font-bold text-gray-900 dark:text-white">Dashboard</span>
          </div>
        </div>
        
        {/* User profile */}
        {user && (
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden mr-3">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-lg font-medium text-gray-700 dark:text-gray-200">
                    {user.name.charAt(0)}
                  </span>
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{user.role}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center px-4 py-3 rounded-md text-sm font-medium
                    ${isActive 
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' 
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800'}
                  `}
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      toggleSidebar();
                    }
                  }}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Bottom section */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <ThemeToggle />
            <button
              onClick={logout}
              className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
            >
              Logout
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;