import type { User, AuthCredentials } from '@/types/auth';

let mockUsers: User[] = [
  { id: 'user-1', username: 'testuser', password: 'password123' },
  { id: 'user-2', username: 'admin', password: 'adminpassword' },
];

export const findUser = (credentials: AuthCredentials): User | undefined => {
  return mockUsers.find(
    (u) =>
      u.username === credentials.username && u.password === credentials.password
  );
};

export const addUser = (credentials: AuthCredentials): User => {
  if (mockUsers.some((u) => u.username === credentials.username)) {
    throw new Error('Username already exists.');
  }
  const newUser: User = {
    id: `user-${mockUsers.length + 1}`,
    username: credentials.username,
    password: credentials.password,
  };
  mockUsers.push(newUser);
  return newUser;
};
