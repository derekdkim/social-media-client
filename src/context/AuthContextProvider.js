import React, { useState } from 'react';
import AuthContext from './AuthContext';

const AuthContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [JWT, setJWT] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        loggedIn: loggedIn,
        setLoggedIn: setLoggedIn,
        JWT: JWT,
        setJWT: setJWT
      }}
    >
      { children }
    </AuthContext.Provider>
  );
}

const useAuthContext = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within AuthContextProvider');
  }
  return context;
}

export { AuthContextProvider, useAuthContext };