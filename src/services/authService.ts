import { findUser, addUser } from '@/utils/auth-utils';
import type { AuthCredentials, User } from '@/types/auth';

const STORAGE_KEY = 'currentUser';

export const login = (credentials: AuthCredentials): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = findUser(credentials);
      if (user) {
        // Simulate JWT or session storage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        resolve(user);
      } else {
        reject(new Error('Invalid username or password.'));
      }
    }, 500);
  });
};

export const register = (credentials: AuthCredentials): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const newUser = addUser(credentials);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
        resolve(newUser);
      } catch (error) {
        reject(error);
      }
    }, 500);
  });
};

export const logout = (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.removeItem(STORAGE_KEY);
      resolve();
    }, 300);
  });
};

export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem(STORAGE_KEY);
  return userJson ? (JSON.parse(userJson) as User) : null;
};
