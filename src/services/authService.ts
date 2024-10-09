import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = 'http://localhost:4000/etudiant';

interface DecodedToken {
  username: string;
  role: string;
}

// Méthode de connexion
export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });

    const data = response.data;
    localStorage.setItem('token', data.token);

    const decodedToken = jwtDecode<DecodedToken>(data.token);

    return decodedToken.role;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erreur serveur');
  }
};

// Méthode de déconnexion
export const logout = async () => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
      throw new Error('Erreur lors de la déconnexion');
    }
  }
  
};

// Récupérer les informations de l'utilisateur à partir du token
export const getUserInfoFromToken = (): { username: string | null; role: string | null } => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      const decodedToken = jwtDecode<DecodedToken>(token);
      return {
        username: decodedToken.username,
        role: decodedToken.role,
      };
    } catch (error) {
      console.error('Erreur lors du décodage du token JWT', error);
    }
  }

  return { username: null, role: null };
};

// Récupérer le profil de l'étudiant connecté
export const fetchStudentProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data.etudiant;
  } catch (error: any) {
    throw new Error('Erreur lors du chargement du profil');
  }
};

// Mise à jour du profil étudiant
export const updateStudentProfile = async (bio: string) => {
  try {
    const response = await axios.put(
      `${API_URL}/update-profile`, // Assurez-vous que ce soit le bon endpoint dans votre API
      { bio },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error('Erreur lors de la mise à jour du profil');
  }
};
