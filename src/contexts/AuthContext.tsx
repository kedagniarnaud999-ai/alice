import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  authService,
  type LoginData,
  type RegisterData,
  type RegisterResponse,
  type User,
} from '@/services/auth.api';
import { checkSupabaseHealth, type SupabaseHealth } from '@/lib/supabaseHealth';
import { isMissingSession } from '@/utils/authErrors';

const SESSION_RESTORE_GRACE_MS = 8000;

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: LoginData) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: (data: RegisterData) => Promise<RegisterResponse>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  isAuthenticated: boolean;
  serviceHealth: SupabaseHealth | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [serviceHealth, setServiceHealth] = useState<SupabaseHealth | null>(null);

  useEffect(() => {
    let isMounted = true;

    checkSupabaseHealth().then((health) => {
      if (isMounted) {
        setServiceHealth(health);
      }
    });

    const initAuth = async () => {
      const restore = authService.getCurrentUser().catch((error) => {
        if (!isMissingSession(error)) {
          console.error('Failed to restore the Supabase session:', error);
        }
        return null;
      });

      // `getUser` est un appel réseau sans délai maximal : sans période de grâce, un Supabase
      // qui traîne laisse `loading` à true et ProtectedRoute figé en plein écran.
      let timer: ReturnType<typeof setTimeout> | undefined;
      const gracePeriod = new Promise<null>((resolve) => {
        timer = setTimeout(() => resolve(null), SESSION_RESTORE_GRACE_MS);
      });

      try {
        const currentUser = await Promise.race([restore, gracePeriod]);
        if (isMounted) {
          setUser(currentUser);
        }
      } finally {
        clearTimeout(timer);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    const unsubscribe = authService.onAuthStateChange((nextUser) => {
      if (isMounted) {
        setUser(nextUser);
        setLoading(false);
      }
    });

    initAuth();

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const login = async (data: LoginData) => {
    const response = await authService.login(data);
    setUser(response.user);
  };

  const loginWithGoogle = async () => {
    await authService.loginWithGoogle();
  };

  const register = async (data: RegisterData) => {
    return authService.register(data);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const refreshUser = async () => {
    const nextUser = await authService.getCurrentUser();
    setUser(nextUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        loginWithGoogle,
        register,
        logout,
        refreshUser,
        isAuthenticated: !!user,
        serviceHealth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
