
import React from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    // Show loading state while checking authentication
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-finance-accent"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-1 container px-4 py-6">
        {children}
      </div>
      <footer className="bg-white border-t py-4">
        <div className="container px-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Asset Advisor Aide. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default DashboardLayout;
