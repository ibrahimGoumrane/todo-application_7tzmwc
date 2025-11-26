import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 lg:p-8'>
      <div className='w-full max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 sm:p-8 space-y-6'>
        {children}
      </div>
    </div>
  );
};
