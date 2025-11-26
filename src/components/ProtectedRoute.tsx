import React, { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate, Outlet } from 'react-router-dom';

export const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-[calc(100vh-128px)] text-xl text-gray-700 dark:text-gray-300'>
        Loading authentication...
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : null; // Render nothing if not authenticated and not loading (will be redirected)
};
