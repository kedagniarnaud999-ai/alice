import { apiClient } from './api.client';

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  role: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export class AuthService {
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post<{ data: AuthResponse }>('/auth/register', data);
    // Ne pas stocker le token lors de l'inscription
    // L'utilisateur doit d'abord vérifier son email avant d'être connecté
    return response.data.data;
  }

  async login(data: LoginData): Promise<AuthResponse> {
    const response = await apiClient.post<{ data: AuthResponse }>('/auth/login', data);
    if (response.data.data.token) {
      localStorage.setItem('token', response.data.data.token);
    }
    return response.data.data;
  }

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout');
    localStorage.removeItem('token');
  }

  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<{ data: { user: User } }>('/users/me');
    return response.data.data.user;
  }

  async updateProfile(data: { name?: string; avatar?: string }): Promise<User> {
    const response = await apiClient.patch<{ data: { user: User } }>('/users/me', data);
    return response.data.data.user;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}

export const authService = new AuthService();
