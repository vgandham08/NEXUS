import React, { createContext, useContext, useState } from 'react';
import { User, INITIAL_USERS } from '../services/mockData';
import { getSavedUser, clearAuth, saveUser, saveToken, login as apiLogin, clearSavedUser } from '../services/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (role: User['role'], email?: string) => Promise<void>;
  logout: () => void;
  switchRole: (role: User['role']) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = getSavedUser();
    if (!saved) return INITIAL_USERS[0];
    const match = INITIAL_USERS.find(u => u.role === saved.role);
    return match || saved;
  });

  const login = async (role: User['role'], email?: string) => {
    try {
      const result = await apiLogin(role, email);
      const match = INITIAL_USERS.find(u => u.role === role) || result.user;
      setUser(match);
      saveToken(result.token);
      saveUser(match);
    } catch {
      const fallback = INITIAL_USERS.find(u => u.role === role) || INITIAL_USERS[0];
      setUser(fallback);
      saveUser(fallback);
    }
  };

  const logout = () => {
    setUser(null);
    clearAuth();
    clearSavedUser();
  };

  const switchRole = async (role: User['role']) => {
    await login(role);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
