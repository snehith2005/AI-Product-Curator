/**
 * Auth-related type definitions
 */

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  is_active: boolean;
  created_at: string;
  last_login: string | null;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

export interface UsersListResponse {
  users: User[];
  total: number;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, firstName: string, lastName: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export interface LoginSession {
  id: string;
  user_id: string;
  user_email: string | null;
  login_at: string;
  logout_at: string | null;
  ip_address: string | null;
  user_agent: string | null;
  is_active: boolean;
}

export interface LoginSessionsResponse {
  sessions: LoginSession[];
  total: number;
  active_count: number;
}
