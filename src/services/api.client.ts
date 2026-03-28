import axios, { AxiosInstance, AxiosError } from 'axios';

// Fonction robuste pour déterminer l'URL de l'API
const getApiBaseUrl = () => {
  // 1. Vérifier si une variable d'environnement est définie
  const envUrl = import.meta.env.VITE_API_URL;
  
  if (envUrl) {
    // Nettoyer les espaces et slashes inutiles
    return envUrl.trim().replace(/\/+$/, '');
  }
  
  // 2. Fallback : Utiliser un chemin relatif pour Vercel
  // Cela pointe automatiquement vers le backend hébergé sur le même domaine
  return '/api';
};

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    const baseURL = getApiBaseUrl();
    console.log('[v0] API Client initialized with baseURL:', baseURL);
    
    this.client = axios.create({
      baseURL: baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
      // Important pour envoyer les cookies d'authentification
      withCredentials: true,
    });

    // Intercepteur pour ajouter le token JWT aux requêtes
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Intercepteur pour gérer le rafraîchissement du token (401)
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        if (error.response?.status === 401) {
          try {
            const { data } = await this.client.post('/auth/refresh');
            localStorage.setItem('token', data.data.token);
            
            if (error.config) {
              error.config.headers.Authorization = `Bearer ${data.data.token}`;
              return this.client.request(error.config);
            }
          } catch (refreshError) {
            // Échec du refresh : déconnexion
            localStorage.removeItem('token');
            window.location.href = '/login';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  get<T>(url: string, config = {}) {
    return this.client.get<T>(url, config);
  }

  post<T>(url: string, data = {}, config = {}) {
    return this.client.post<T>(url, data, config);
  }

  patch<T>(url: string, data = {}, config = {}) {
    return this.client.patch<T>(url, data, config);
  }

  delete<T>(url: string, config = {}) {
    return this.client.delete<T>(url, config);
  }
}

export const apiClient = new ApiClient();
