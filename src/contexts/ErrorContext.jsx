// src/contexts/ErrorContext.js
import React, { createContext, useState, useContext } from 'react';

const ErrorContext = createContext();

export const useError = () => useContext(ErrorContext);

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);

  const toggleErrorState = (message) => {
    setError(message);
  };

  return (
    <ErrorContext.Provider value={{ error, toggleErrorState }}>
      {children}
    </ErrorContext.Provider>
  );
};
