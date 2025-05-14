export interface User {
  id: string;
  username: string;
  name: string;
  role: string;
  avatar?: string;
}

export interface Resident {
  id: string;
  name: string;
  age: number;
  city: string;
  email: string;
  joinDate: string;
  status: 'active' | 'inactive' | 'pending';
}

export interface CityData {
  name: string;
  value: number;
  fill: string;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}