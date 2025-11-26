import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthLayout } from '@/components/AuthLayout';
import { AuthForm } from '@/components/AuthForm';
import { useAuth } from '@/hooks/useAuth';
import type { AuthCredentials } from '@/types/auth';

const RegisterPage: React.FC = () => {
  const { register, isLoading, error, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleRegister = async (credentials: AuthCredentials) => {
    try {
      await register(credentials);
    } catch (err) {
      // Error handled by useAuth, displayed by AuthForm
    }
  };

  return (
    <AuthLayout>
      <AuthForm type='register' onSubmit={handleRegister} isLoading={isLoading} error={error} />
      <p className='text-center text-sm text-gray-600 dark:text-gray-300 mt-4'>
        Already have an account?{' '}
        <Link to='/login' className='text-purple-600 hover:underline dark:text-purple-400'>
          Login
        </Link>
      </p>
    </AuthLayout>
  );
};

export default RegisterPage;
