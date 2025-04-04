import { createContext } from 'react';

export const AuthContext = createContext({
  signIn: () => {},
  signOut: () => {},
  signUp: () => {},
  userToken: null,
});