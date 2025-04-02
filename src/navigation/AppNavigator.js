import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

const AppNavigator = () => {
  const { userToken } = useContext(AuthContext);
  
  // Return the appropriate navigator based on authentication status
  return userToken ? <MainNavigator /> : <AuthNavigator />;
};

export default AppNavigator;