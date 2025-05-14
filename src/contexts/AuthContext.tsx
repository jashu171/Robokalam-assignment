import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContextType, User } from '../types';
import { mockUser } from '../data/mockData';

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Login function - in a real app, this would make an API call
  const login = async (username: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple validation - in a real app, this would validate with a backend
    if (username === 'jashu' && password === '1234') {
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      navigate('/dashboard');
    } else {
      throw new Error('Invalid credentials');
    }
    
    setIsLoading(false);
  };

  // Logout function
  const logout = (): void => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};