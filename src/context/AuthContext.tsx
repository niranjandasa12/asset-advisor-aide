
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { currentUser } from '@/lib/mockData';

interface User {
  id: number;
  fullName: string;
  email: string;
  profileImage: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (fullName: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check for saved auth in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);
  
  const login = async (email: string, password: string): Promise<boolean> => {
    // For demo purposes, we'll accept any non-empty email/password
    // and return the mock user
    if (email && password) {
      setUser(currentUser);
      localStorage.setItem('user', JSON.stringify(currentUser));
      return true;
    }
    return false;
  };
  
  const signup = async (fullName: string, email: string, password: string): Promise<boolean> => {
    // For demo purposes, we'll accept any valid inputs
    if (fullName && email && password && password.length >= 6) {
      const newUser = {
        ...currentUser,
        fullName,
        email,
      };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      return true;
    }
    return false;
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
  
  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        login, 
        signup, 
        logout,
        loading 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
