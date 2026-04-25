/**
 * Auth context provider
 */
import React, { createContext, useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser, useLogin, useLogout, useSignup } from '@/hooks/useAuth';
import { authService } from '@/services/auth.service';
import type { AuthContextType } from '@/types';

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  const { data: user, isLoading } = useCurrentUser();
  const loginMutation = useLogin();
  const signupMutation = useSignup();
  const logoutMutation = useLogout();

  const handleRefreshError = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  // Set up token refresh when user is authenticated
  useEffect(() => {
    if (user) {
      authService.scheduleRefresh(
        14 * 60, // 14 minutes (assuming 15 min token)
        () => {}, // onRefresh - token already updated in service
        handleRefreshError
      );
    }

    return () => {
      authService.clearRefreshTimeout();
    };
  }, [user, handleRefreshError]);

  const login = async (email: string, password: string): Promise<void> => {
    const { expiresIn } = await loginMutation.mutateAsync({ email, password });
    authService.scheduleRefresh(expiresIn, () => {}, handleRefreshError);
  };

  const signup = async (email: string, firstName: string, lastName: string, password: string): Promise<void> => {
    await signupMutation.mutateAsync({ email, firstName, lastName, password });
    await login(email, password);
  };

  const logout = async (): Promise<void> => {
    await logoutMutation.mutateAsync();
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
