import React, { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { UserCircle, Lock, ArrowRight, UserPlus } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (isRegistering) {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        setIsLoading(false);
        return;
      }
      
      // Here you would typically make an API call to register
      // For demo, we'll just show success and switch to login
      setTimeout(() => {
        setIsRegistering(false);
        setIsLoading(false);
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setName('');
      }, 1500);
    } else {
      try {
        await login(username, password);
      } catch (err) {
        setError('Invalid username or password');
        setIsLoading(false);
      }
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <motion.div
        className="w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden"
        >
          {/* Login/Register header */}
          <div className="p-6 sm:p-8 bg-blue-600 dark:bg-blue-700">
            <h1 className="text-2xl font-bold text-white text-center">
              {isRegistering ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="text-blue-100 mt-2 text-center">
              {isRegistering ? 'Sign up for a new account' : 'Sign in to your account'}
            </p>
          </div>
          
          {/* Form */}
          <div className="p-6 sm:p-8 space-y-6">
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-md text-sm"
              >
                {error}
              </motion.div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {isRegistering && (
                <motion.div variants={itemVariants}>
                  <Input
                    type="text"
                    id="name"
                    label="Full Name"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={isRegistering}
                    fullWidth
                    className="pl-10"
                  />
                </motion.div>
              )}
              
              <motion.div variants={itemVariants}>
                <Input
                  type="text"
                  id="username"
                  label="Username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  fullWidth
                  autoComplete="username"
                  className="pl-10"
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Input
                  type="password"
                  id="password"
                  label="Password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  fullWidth
                  autoComplete={isRegistering ? 'new-password' : 'current-password'}
                  className="pl-10"
                />
              </motion.div>

              {isRegistering && (
                <motion.div variants={itemVariants}>
                  <Input
                    type="password"
                    id="confirmPassword"
                    label="Confirm Password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required={isRegistering}
                    fullWidth
                    autoComplete="new-password"
                    className="pl-10"
                  />
                </motion.div>
              )}
              
              <motion.div variants={itemVariants} className="mt-6">
                <Button
                  type="submit"
                  fullWidth
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  <span>{isRegistering ? 'Create Account' : 'Sign In'}</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </form>
            
            {/* Toggle between login and register */}
            <motion.div variants={itemVariants} className="mt-4 text-center">
              <button
                onClick={() => {
                  setIsRegistering(!isRegistering);
                  setError('');
                  setUsername('');
                  setPassword('');
                  setConfirmPassword('');
                  setName('');
                }}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline focus:outline-none"
              >
                {isRegistering ? 'Already have an account? Sign in' : 'Need an account? Sign up'}
              </button>
            </motion.div>

            {/* Demo credentials - only show on login */}
            {!isRegistering && (
              <motion.div 
                variants={itemVariants}
                className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-md"
              >
                <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">Login Credentials:</p>
                <div className="mt-1 grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-500 dark:text-gray-400">Username:</div>
                  <div className="font-mono text-gray-800 dark:text-gray-200">jashu</div>
                  <div className="text-gray-500 dark:text-gray-400">Password:</div>
                  <div className="font-mono text-gray-800 dark:text-gray-200">1234</div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;