import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { login as authLogin, register as authRegister, logout as authLogout, getCurrentUser } from '@/services/authService';
import type { AuthCredentials, User } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: AuthCredentials) => Promise<void>;
  register: (credentials: AuthCredentials) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const handleAuthAction = useCallback(async (action: (credentials: AuthCredentials) => Promise<User>, credentials: AuthCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const authUser = await action(credentials);
      setUser(authUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setUser(null);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (credentials: AuthCredentials) => {
    await handleAuthAction(authLogin, credentials);
  }, [handleAuthAction]);

  const register = useCallback(async (credentials: AuthCredentials) => {
    await handleAuthAction(authRegister, credentials);
  }, [handleAuthAction]);

  const logout = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      await authLogout();
      setUser(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const isAuthenticated = !!user;

  const value = {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
