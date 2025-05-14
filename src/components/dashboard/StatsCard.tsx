import React from 'react';
import { motion } from 'framer-motion';
import { Users, UserCheck, Clock as UserClock } from 'lucide-react';
import Card from '../ui/Card';

interface StatsCardProps {
  title: string;
  value: number;
  icon: 'users' | 'active' | 'pending';
  colorClass: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, colorClass }) => {
  const getIcon = () => {
    switch (icon) {
      case 'users':
        return <Users className={`w-8 h-8 ${colorClass}`} />;
      case 'active':
        return <UserCheck className={`w-8 h-8 ${colorClass}`} />;
      case 'pending':
        return <UserClock className={`w-8 h-8 ${colorClass}`} />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <Card className="p-6 h-full">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-opacity-10 mr-4" style={{ backgroundColor: `${colorClass}20` }}>
            {getIcon()}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default StatsCard;