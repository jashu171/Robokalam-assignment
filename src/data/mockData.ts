import { Resident, CityData, User } from '../types';

// Chart colors
const chartColors = [
  '#3B82F6', // blue-500
  '#6366F1', // indigo-500
  '#8B5CF6', // violet-500
  '#A855F7', // purple-500
  '#D946EF', // fuchsia-500
];

export const mockUser: User = {
  id: '1',
  username: 'admin',
  name: 'Admin User',
  role: 'Administrator',
  avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100'
};

export const mockResidents: Resident[] = [
  { 
    id: '1', 
    name: 'Rahul Kumar', 
    age: 32, 
    city: 'Bangalore', 
    email: 'rahul.k@example.com',
    joinDate: '2023-06-15',
    status: 'active'
  },
  { 
    id: '2', 
    name: 'Priya Sharma', 
    age: 28, 
    city: 'Hyderabad', 
    email: 'priya.s@example.com',
    joinDate: '2023-08-22',
    status: 'active'
  },
  { 
    id: '3', 
    name: 'Amit Patel', 
    age: 45, 
    city: 'Mumbai', 
    email: 'amit.p@example.com',
    joinDate: '2023-04-10',
    status: 'inactive'
  },
  { 
    id: '4', 
    name: 'Sneha Reddy', 
    age: 24, 
    city: 'Chennai', 
    email: 'sneha.r@example.com',
    joinDate: '2023-11-05',
    status: 'active'
  },
  { 
    id: '5', 
    name: 'Karthik Menon', 
    age: 37, 
    city: 'Pune', 
    email: 'karthik.m@example.com',
    joinDate: '2023-09-18',
    status: 'pending'
  },
  { 
    id: '6', 
    name: 'Ananya Singh', 
    age: 29, 
    city: 'Delhi', 
    email: 'ananya.s@example.com',
    joinDate: '2023-07-30',
    status: 'active'
  },
  { 
    id: '7', 
    name: 'Rajesh Verma', 
    age: 41, 
    city: 'Kolkata', 
    email: 'rajesh.v@example.com',
    joinDate: '2023-05-12',
    status: 'inactive'
  },
  { 
    id: '8', 
    name: 'Deepika Nair', 
    age: 33, 
    city: 'Hyderabad', 
    email: 'deepika.n@example.com',
    joinDate: '2023-10-07',
    status: 'active'
  },
  { 
    id: '9', 
    name: 'Arjun Rao', 
    age: 39, 
    city: 'Bangalore', 
    email: 'arjun.r@example.com',
    joinDate: '2023-03-25',
    status: 'pending'
  },
  { 
    id: '10', 
    name: 'Meera Iyer', 
    age: 26, 
    city: 'Chennai', 
    email: 'meera.i@example.com',
    joinDate: '2023-12-01',
    status: 'active'
  }
];

// Generate city data for chart
export const generateCityData = (): CityData[] => {
  const cities = [...new Set(mockResidents.map(resident => resident.city))];
  
  return cities.map((city, index) => {
    const count = mockResidents.filter(resident => resident.city === city).length;
    return {
      name: city,
      value: count,
      fill: chartColors[index % chartColors.length]
    };
  });
};

export const cityData = generateCityData();

// Calculate stats
export const getTotalResidents = (): number => mockResidents.length;

export const getActiveResidents = (): number => 
  mockResidents.filter(resident => resident.status === 'active').length;

export const getPendingResidents = (): number => 
  mockResidents.filter(resident => resident.status === 'pending').length;