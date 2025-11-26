import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const Home = () => {
  const { isAuthenticated, isLoading, user } = useAuth();

  return (
    <div className='container mx-auto p-4 sm:p-6 lg:p-8 text-center min-h-[calc(100vh-128px)] flex flex-col justify-center items-center'>
      <h1 className='text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 sm:mb-6'>
        Welcome to the Todo App
      </h1>
      <p className='text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto'>
        Organize your tasks and boost your productivity with our simple and intuitive todo application.
      </p>
      {!isLoading && (
        <div className='space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row justify-center'>
          {isAuthenticated ? (
            <Link to='/dashboard' className='bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 text-lg sm:text-xl'>
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link to='/login' className='bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 text-lg sm:text-xl'>
                Login
              </Link>
              <Link to='/register' className='bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold py-3 px-8 rounded-lg transition duration-200 text-lg sm:text-xl'>
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
