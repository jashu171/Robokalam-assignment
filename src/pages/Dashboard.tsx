import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useAuth } from '../contexts/AuthContext';
import ResidentTable from '../components/dashboard/ResidentTable';
import AnalyticsChart from '../components/dashboard/AnalyticsChart';
import StatsCard from '../components/dashboard/StatsCard';
import { 
  mockResidents, 
  cityData, 
  getTotalResidents, 
  getActiveResidents, 
  getPendingResidents 
} from '../data/mockData';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
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
      opacity: 1
    }
  };

  return (
    <>
      <Helmet>
        <title>Dashboard | Admin Panel</title>
      </Helmet>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div
          className="mb-8"
          variants={itemVariants}
        >
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user?.name || 'User'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Here's what's happening with your residents today.
          </p>
        </motion.div>
        
        {/* Stats cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          variants={itemVariants}
        >
          <StatsCard
            title="Total Residents"
            value={getTotalResidents()}
            icon="users"
            colorClass="text-blue-500"
          />
          <StatsCard
            title="Active Residents"
            value={getActiveResidents()}
            icon="active"
            colorClass="text-green-500"
          />
          <StatsCard
            title="Pending Approval"
            value={getPendingResidents()}
            icon="pending"
            colorClass="text-yellow-500"
          />
        </motion.div>
        
        {/* Analytics chart */}
        <motion.div
          className="mb-8"
          variants={itemVariants}
        >
          <AnalyticsChart data={cityData} />
        </motion.div>
        
        {/* Residents table */}
        <motion.div
          variants={itemVariants}
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Resident Data
          </h2>
          <ResidentTable residents={mockResidents} />
        </motion.div>
      </motion.div>
    </>
  );
};

export default Dashboard;