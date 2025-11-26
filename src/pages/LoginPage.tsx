import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthLayout } from '@/components/AuthLayout';
import { AuthForm } from '@/components/AuthForm';
import { useAuth } from '@/hooks/useAuth';
import type { AuthCredentials } from '@/types/auth';

const LoginPage: React.FC = () => {
  const { login, isLoading, error, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (credentials: AuthCredentials) => {
    try {
      await login(credentials);
    } catch (err) {
      // Error handled by useAuth, displayed by AuthForm
    }
  };

  return (
    <AuthLayout>
      <AuthForm type='login' onSubmit={handleLogin} isLoading={isLoading} error={error} />
      <p className='text-center text-sm text-gray-600 dark:text-gray-300 mt-4'>
        Don't have an account?{' '}
        <Link to='/register' className='text-purple-600 hover:underline dark:text-purple-400'>
          Register
        </Link>
      </p>
    </AuthLayout>
  );
};

export default LoginPage;
