import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import type { AuthCredentials } from '@/types/auth';

interface AuthFormProps {
  type: 'login' | 'register';
  onSubmit: (credentials: AuthCredentials) => void;
  isLoading: boolean;
  error: string | null;
}

export const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit, isLoading, error }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ username, password });
  };

  const title = type === 'login' ? 'Login' : 'Register';
  const buttonText = type === 'login' ? 'Sign In' : 'Sign Up';

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <h2 className='text-2xl font-bold text-center text-gray-900 dark:text-white'>
        {title}
      </h2>
      {error && (
        <p className='text-red-500 text-sm text-center'>
          {error}
        </p>
      )}
      <div>
        <label htmlFor='username-input' className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
          Username
        </label>
        <input
          id='username-input'
          type='text'
          value={username}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
          className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
          required
          disabled={isLoading}
        />
      </div>
      <div>
        <label htmlFor='password-input' className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
          Password
        </label>
        <input
          id='password-input'
          type='password'
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
          required
          disabled={isLoading}
        />
      </div>
      <Button type='submit' className='w-full' disabled={isLoading} variant='primary' size='md'>
        {isLoading ? 'Loading...' : buttonText}
      </Button>
    </form>
  );
};
