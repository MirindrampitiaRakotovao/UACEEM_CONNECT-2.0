// services/api.ts
import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';


const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Intercepteur pour les requêtes
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token'); // Utiliser Cookies au lieu de localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    console.error('Erreur lors de la requête:', error);
    return Promise.reject(error);
  }
);

// Intercepteur pour les réponses
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Non authentifié
          Cookies.remove('token'); // Utiliser Cookies.remove au lieu de localStorage.removeItem
          window.location.href = '/';
          break;
        case 403:
          // Non autorisé
          console.error('Accès non autorisé');
          const role = Cookies.get('role'); // Optionnel : récupérer le rôle depuis les cookies
          if (role) {
            switch (role) {
              case 'admin':
                window.location.href = '/acceuilAdmin';
                break;
              case 'professeur':
                window.location.href = '/acceuilProfesseur';
                break;
              case 'etudiant':
                window.location.href = '/acceuilClub';
                break;
              case 'president_association':
                window.location.href = '/acceuilAssociation';
                break;
              default:
                window.location.href = '/acceuilUser';
                break;
            }
          } else {
            window.location.href = '/';
          }
          break;
        case 404:
          console.error('Ressource non trouvée');
          break;
        case 500:
          console.error('Erreur serveur');
          break;
        default:
          console.error('Erreur non gérée:', error.response.status);
      }
    } else if (error.request) {
      console.error('Pas de réponse du serveur');
    } else {
      console.error('Erreur:', error.message);
    }
    return Promise.reject(error);
  }
);

// Types pour les réponses API
export interface ApiResponse<T> {
  message: string;
  data: T;
  error?: boolean;
}

// Méthodes API typées avec gestion d'erreur
const apiService = {
  get: async <T>(url: string) => {
    try {
      const response = await api.get<ApiResponse<T>>(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  post: async <T>(url: string, data: any) => {
    try {
      const response = await api.post<ApiResponse<T>>(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  put: async <T>(url: string, data: any) => {
    try {
      const response = await api.put<ApiResponse<T>>(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  delete: async <T>(url: string) => {
    try {
      const response = await api.delete<ApiResponse<T>>(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Méthodes utilitaires pour la gestion des tokens
  isAuthenticated: () => {
    return !!Cookies.get('token');
  },

  getToken: () => {
    return Cookies.get('token');
  },

  logout: () => {
    Cookies.remove('token');
    Cookies.remove('role');
    window.location.href = '/';
  },

  // Méthode pour vérifier les permissions
  hasPermission: (requiredRole: string) => {
    const role = Cookies.get('role');
    return role === requiredRole;
  }
};

export default apiService;