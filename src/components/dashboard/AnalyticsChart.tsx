import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { CityData } from '../../types';
import Card, { CardHeader, CardTitle, CardContent } from '../ui/Card';

interface AnalyticsChartProps {
  data: CityData[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded shadow-lg">
        <p className="font-medium text-gray-900 dark:text-white">{label}</p>
        <p className="text-blue-600 dark:text-blue-400">
          {`Residents: ${payload[0].value}`}
        </p>
      </div>
    );
  }
  return null;
};

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full h-80"
    >
      <Card>
        <CardHeader>
          <CardTitle>Residents by City</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar 
                dataKey="value" 
                name="Residents"
                fill="#3B82F6" 
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AnalyticsChart;