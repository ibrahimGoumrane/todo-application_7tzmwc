export interface User {
  id: string;
  username: string;
  password: string; // In a real app, never store plain password
}

export interface AuthCredentials extends Pick<User, 'username' | 'password'> {}
