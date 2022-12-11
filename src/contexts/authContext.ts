import { createContext } from 'react';

export interface User {
  isAuthenticated: boolean;
  avatar_url: string;
  email: string;
  login: string;
  name: string;
  id: number;
}

export const defaultUser: User = {
  isAuthenticated: false,
  avatar_url: '',
  email: '',
  login: '',
  name: '',
  id: 0,
};

const UserContext = createContext<User>(defaultUser);

export default UserContext;
