import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { Resident } from '../../types';

interface ResidentTableProps {
  residents: Resident[];
}

type SortField = 'name' | 'age' | 'city' | 'joinDate';
type SortDirection = 'asc' | 'desc';

const ResidentTable: React.FC<ResidentTableProps> = ({ residents }) => {
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [searchTerm, setSearchTerm] = useState('');

  // Handle sorting
  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Status badge component
  const StatusBadge: React.FC<{ status: Resident['status'] }> = ({ status }) => {
    const statusStyles = {
      active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      inactive: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
    };

    return (
      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Filter and sort residents
  const filteredAndSortedResidents = useMemo(() => {
    return [...residents]
      .filter(resident => 
        resident.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resident.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resident.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (sortField === 'age') {
          return sortDirection === 'asc' 
            ? a.age - b.age 
            : b.age - a.age;
        } else if (sortField === 'name') {
          return sortDirection === 'asc'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        } else if (sortField === 'city') {
          return sortDirection === 'asc'
            ? a.city.localeCompare(b.city)
            : b.city.localeCompare(a.city);
        } else if (sortField === 'joinDate') {
          return sortDirection === 'asc'
            ? new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime()
            : new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
        }
        return 0;
      });
  }, [residents, searchTerm, sortField, sortDirection]);

  // Get sort icon component based on current sort state
  const SortIcon: React.FC<{ field: SortField }> = ({ field }) => {
    if (field !== sortField) return null;
    return sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
  };

  return (
    <div className="w-full">
      {/* Search Bar */}
      <div className="mb-4 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search residents..."
          className="pl-10 pr-4 py-2 w-full border rounded-md border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center space-x-1">
                  <span>Name</span>
                  <SortIcon field="name" />
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('age')}
              >
                <div className="flex items-center space-x-1">
                  <span>Age</span>
                  <SortIcon field="age" />
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('city')}
              >
                <div className="flex items-center space-x-1">
                  <span>City</span>
                  <SortIcon field="city" />
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('joinDate')}
              >
                <div className="flex items-center space-x-1">
                  <span>Join Date</span>
                  <SortIcon field="joinDate" />
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
            {filteredAndSortedResidents.length > 0 ? (
              filteredAndSortedResidents.map((resident, index) => (
                <motion.tr 
                  key={resident.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {resident.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {resident.age}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {resident.city}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(resident.joinDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {resident.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <StatusBadge status={resident.status} />
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                  No residents found matching your search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResidentTable;