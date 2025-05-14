import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DashboardLayout from './components/layout/DashboardLayout';
import MenuBar from './components/layout/MenuBar';
import { Helmet } from 'react-helmet';

// Protected route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
};

// AppRoutes component separated from App to access AuthContext
const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <>
      <MenuBar />
      <div className="pt-16"> {/* Add padding to account for fixed MenuBar */}
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />
            
            {/* Protected dashboard routes */}
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="residents" element={<Dashboard />} /> {/* Using Dashboard for now */}
              <Route path="analytics" element={<Dashboard />} /> {/* Using Dashboard for now */}
              <Route path="settings" element={<Dashboard />} /> {/* Using Dashboard for now */}
            </Route>
            
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </div>
    </>
  );
};

// Main App component
const App: React.FC = () => {
  // Set document title
  useEffect(() => {
    document.title = "Admin Dashboard";
  }, []);
  
  return (
    <>
      <Helmet>
        <meta name="theme-color" content="#3B82F6" />
      </Helmet>
      
      <Router>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Router>
    </>
  );
};

export default App;