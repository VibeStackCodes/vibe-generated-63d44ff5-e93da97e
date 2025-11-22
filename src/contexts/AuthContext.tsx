import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';

export type User = {
  id: string;
  name: string;
  role: 'Manager' | 'Director' | 'IT';
};

type AuthContextValue = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Mock login after mount for demo
  useEffect(() => {
    const t = setTimeout(() => {
      setUser({ id: 'u-100', name: 'Alex Kim', role: 'Manager' });
    }, 600);
    return () => clearTimeout(t);
  }, []);

  const login = (u: User) => setUser(u);
  const logout = () => setUser(null);

  const value = useMemo(() => ({ user, login, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
