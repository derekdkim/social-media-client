import React, { useState } from 'react';
import AuthContext from './AuthContext';

const AuthContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [JWT, setJWT] = useState(null);
  const [UUID, setUUID] = useState(null);
  const [id, setId] = useState(null);
  const [firstName, setFirstName] = useState('User');

  return (
    <AuthContext.Provider
      value={{
        loggedIn: loggedIn,
        setLoggedIn: setLoggedIn,
        JWT: JWT,
        setJWT: setJWT,
        UUID: UUID,
        setUUID: setUUID,
        id,
        setId,
        firstName,
        setFirstName
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