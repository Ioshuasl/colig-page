import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService, getAuthToken, clearAuthSession } from '../services';
import type { User } from '../types';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => Promise<void>;
  syncSession: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const syncSession = () => {
    const token = getAuthToken();
    const storedUser = authService.getStoredUser();

    if (token) {
      setIsAuthenticated(true);
      setUser(storedUser);
      return;
    }

    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    syncSession();
  }, []);

  const login = async (email: string, pass: string) => {
    try {
      const response = await authService.login({
        identifier: email,
        password: pass,
      });

      setIsAuthenticated(true);
      setUser(response.user);
      return true;
    } catch {
      clearAuthSession();
      setIsAuthenticated(false);
      setUser(null);
      return false;
    }
  };

  const logout = async () => {
    await authService.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, syncSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
