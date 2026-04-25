/**
 * Auth API endpoint definitions
 */
import { apiClient } from './client';
import type { User, TokenResponse, LoginRequest, RegisterRequest, LoginSessionsResponse, UsersListResponse } from '@/types';

export const authApi = {
  register: (data: RegisterRequest): Promise<User> => {
    return apiClient.post<User>('/auth/register', data, { skipAuth: true });
  },

  login: (data: LoginRequest): Promise<TokenResponse> => {
    return apiClient.post<TokenResponse>('/auth/login', data, { skipAuth: true });
  },

  refresh: (): Promise<TokenResponse> => {
    return apiClient.post<TokenResponse>('/auth/refresh', undefined, { skipAuth: true });
  },

  logout: (): Promise<{ message: string }> => {
    return apiClient.post<{ message: string }>('/auth/logout');
  },

  getMe: (): Promise<User> => {
    return apiClient.get<User>('/auth/me');
  },

  getSessions: (limit = 50, offset = 0): Promise<LoginSessionsResponse> => {
    return apiClient.get<LoginSessionsResponse>(`/auth/sessions?limit=${limit}&offset=${offset}`);
  },

  getAllSessions: (limit = 100, offset = 0): Promise<LoginSessionsResponse> => {
    return apiClient.get<LoginSessionsResponse>(`/auth/sessions/all?limit=${limit}&offset=${offset}`);
  },

  getUsers: (limit = 100, offset = 0): Promise<UsersListResponse> => {
    return apiClient.get<UsersListResponse>(`/auth/users?limit=${limit}&offset=${offset}`);
  },
};
