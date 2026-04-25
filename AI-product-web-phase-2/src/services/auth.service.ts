/**
 * Auth service - business logic
 */
import { authApi } from '@/api/auth.api';
import { apiClient } from '@/api/client';
import type { User, TokenResponse } from '@/types';

export class AuthService {
  private refreshTimeoutId: ReturnType<typeof setTimeout> | null = null;

  /**
   * Login user and set up token refresh
   */
  async login(email: string, password: string): Promise<{ user: User; expiresIn: number }> {
    const tokenResponse = await authApi.login({ email, password });
    apiClient.setAccessToken(tokenResponse.access_token);

    const user = await authApi.getMe();

    return { user, expiresIn: tokenResponse.expires_in };
  }

  /**
   * Register new user
   */
  async register(email: string, firstName: string, lastName: string, password: string): Promise<User> {
    return authApi.register({ email, first_name: firstName, last_name: lastName, password });
  }

  /**
   * Logout user and clear tokens
   */
  async logout(): Promise<void> {
    this.clearRefreshTimeout();
    try {
      await authApi.logout();
    } finally {
      apiClient.setAccessToken(null);
    }
  }

  /**
   * Try to refresh the access token
   */
  async refreshToken(): Promise<TokenResponse> {
    const response = await authApi.refresh();
    apiClient.setAccessToken(response.access_token);
    return response;
  }

  /**
   * Initialize auth state (called on app load)
   */
  async initializeAuth(): Promise<User | null> {
    try {
      await this.refreshToken();
      const user = await authApi.getMe();
      return user;
    } catch {
      apiClient.setAccessToken(null);
      return null;
    }
  }

  /**
   * Schedule token refresh before expiry
   */
  scheduleRefresh(expiresIn: number, onRefresh: () => void, onError: () => void): void {
    this.clearRefreshTimeout();

    // Refresh 1 minute before expiry
    const refreshTime = Math.max((expiresIn - 60) * 1000, 0);

    this.refreshTimeoutId = setTimeout(async () => {
      try {
        const response = await this.refreshToken();
        onRefresh();
        this.scheduleRefresh(response.expires_in, onRefresh, onError);
      } catch {
        onError();
      }
    }, refreshTime);
  }

  /**
   * Clear scheduled refresh
   */
  clearRefreshTimeout(): void {
    if (this.refreshTimeoutId) {
      clearTimeout(this.refreshTimeoutId);
      this.refreshTimeoutId = null;
    }
  }
}

// Singleton instance
export const authService = new AuthService();
