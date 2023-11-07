import router from 'next/router';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface TokenContextType {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

const UserContext = createContext<TokenContextType | undefined>(undefined);

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string>('');
  
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    storedToken ? setToken(storedToken) : setToken('');
    
    if (!storedToken) {
      router.push("/auth/login");
    }
  }, []);
  
  return (
    <UserContext.Provider value={{ token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

export const useToken = (): TokenContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useToken must be used within a UserContextProvider');
  }
  return context;
};