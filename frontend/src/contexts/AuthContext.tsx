import { createContext, useState, useEffect, ReactNode } from 'react';
import type { AuthUser } from '../types';
import { loginRequest, logoutRequest, getMeRequest } from '../services/authService';

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      const token = localStorage.getItem('ems_token');
      const cachedUser = localStorage.getItem('ems_user');

      if (token && cachedUser) {
        try {
          setUser(JSON.parse(cachedUser));
          // Revalidate against the server in the background
          const freshUser = await getMeRequest();
          setUser(freshUser);
          localStorage.setItem('ems_user', JSON.stringify(freshUser));
        } catch {
          localStorage.removeItem('ems_token');
          localStorage.removeItem('ems_user');
          setUser(null);
        }
      }
      setIsLoading(false);
    };
    bootstrap();
  }, []);

  const login = async (email: string, password: string) => {
    const { token, user: loggedInUser } = await loginRequest(email, password);
    localStorage.setItem('ems_token', token);
    localStorage.setItem('ems_user', JSON.stringify(loggedInUser));
    setUser(loggedInUser);
  };

  const logout = async () => {
    try {
      await logoutRequest();
    } finally {
      localStorage.removeItem('ems_token');
      localStorage.removeItem('ems_user');
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
