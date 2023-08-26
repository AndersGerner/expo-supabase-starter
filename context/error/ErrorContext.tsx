import React, { ReactNode, createContext, useState } from 'react';

interface ErrorContextProps {
  error: Error | null;
  setError: React.Dispatch<React.SetStateAction<Error | null>>;
  clearErrors: () => void;
}

interface ErrorProviderProps {
  children: ReactNode;
}

export const ErrorContext = createContext<ErrorContextProps>({
  error: null,
  setError: () => {},
  clearErrors: () => {},
});

export const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {
  const [error, setError] = useState<Error | null>(null);

  const clearErrors = () => {
    setError(null);
  };

  return (
    <ErrorContext.Provider value={{ error, setError, clearErrors }}>
      {children}
    </ErrorContext.Provider>
  );
};
