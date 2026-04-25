/**
 * Auth hooks using React Query
 */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/services/auth.service';
import { authApi } from '@/api/auth.api';
import type { User } from '@/types';

export const AUTH_QUERY_KEY = ['auth', 'user'];
export const SESSIONS_QUERY_KEY = ['auth', 'sessions'];

/**
 * Hook to get current user
 */
export function useCurrentUser() {
  return useQuery({
    queryKey: AUTH_QUERY_KEY,
    queryFn: () => authService.initializeAuth(),
    staleTime: Infinity, // Don't refetch automatically
    retry: false,
  });
}

/**
 * Hook for login mutation
 */
export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authService.login(email, password),
    onSuccess: ({ user }) => {
      queryClient.setQueryData<User | null>(AUTH_QUERY_KEY, user);
    },
  });
}

/**
 * Hook for signup mutation
 */
export function useSignup() {
  return useMutation({
    mutationFn: ({ email, firstName, lastName, password }: { email: string; firstName: string; lastName: string; password: string }) =>
      authService.register(email, firstName, lastName, password),
  });
}

/**
 * Hook for logout mutation
 */
export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.setQueryData<User | null>(AUTH_QUERY_KEY, null);
      queryClient.clear(); // Clear all cached data on logout
    },
  });
}

/**
 * Hook to get login sessions for current user
 */
export function useLoginSessions(limit = 50, offset = 0) {
  return useQuery({
    queryKey: [...SESSIONS_QUERY_KEY, limit, offset],
    queryFn: () => authApi.getSessions(limit, offset),
    staleTime: 30000, // 30 seconds
  });
}

/**
 * Hook to get all login sessions (admin)
 */
export function useAllLoginSessions(limit = 100, offset = 0) {
  return useQuery({
    queryKey: [...SESSIONS_QUERY_KEY, 'all', limit, offset],
    queryFn: () => authApi.getAllSessions(limit, offset),
    staleTime: 30000, // 30 seconds
  });
}

export const USERS_QUERY_KEY = ['users'];

/**
 * Hook to get all users (admin)
 */
export function useUsers(limit = 100, offset = 0) {
  return useQuery({
    queryKey: [...USERS_QUERY_KEY, limit, offset],
    queryFn: () => authApi.getUsers(limit, offset),
    staleTime: 30000, // 30 seconds
  });
}
