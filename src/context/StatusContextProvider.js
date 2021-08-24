import React, { useState } from 'react';
import StatusContext from './StatusContext';

const StatusContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [updateEntries, setUpdateEntries] = useState(false);
  const [updateComments, setUpdateComments] = useState(false);

  return (
    <StatusContext.Provider
      value={{
        isLoading: isLoading,
        setIsLoading: setIsLoading,
        updateEntries: updateEntries,
        setUpdateEntries: setUpdateEntries,
        updateComments: updateComments,
        setUpdateComments: setUpdateComments
      }}
    >
      { children }
    </StatusContext.Provider>
  );
}

const useStatusContext = () => {
  const context = React.useContext(StatusContext);
  if (context === undefined) {
    throw new Error('useStatusContext must be used within StatusContextProvider');
  }
  return context;
}

export { StatusContextProvider, useStatusContext };