import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';

export const Header = () => {
  const { isAuthenticated, logout, user, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className='bg-white dark:bg-gray-800 shadow-md p-4 sticky top-0 z-10'>
      <nav className='container mx-auto flex items-center justify-between'>
        <Link to='/' className='text-2xl font-bold text-purple-600 dark:text-purple-400'>
          Todo App
        </Link>
        <div className='flex items-center space-x-4 md:space-x-6'>
          {!isAuthenticated && !isLoading && (
            <>
              <Link
                to='/login'
                className='text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors'
              >
                Login
              </Link>
              <Link
                to='/register'
                className='text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors'
              >
                Register
              </Link>
            </>
          )}

          {isAuthenticated && !isLoading && (
            <>
              {user && (
                <span className='text-gray-700 dark:text-gray-300 hidden sm:inline'>
                  Hello, {user.username}
                </span>
              )}
              <Link
                to='/dashboard'
                className='text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors'
              >
                Dashboard
              </Link>
              <Button variant='outline' size='sm' onClick={handleLogout} disabled={isLoading}>
                Logout
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};
