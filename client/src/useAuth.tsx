import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';


interface User {
  nom: string;
  prenom: string;
  nomUtilisateur: string;
  photoProfil: string;
  role: string;
  id: string;  // Optionnel car pas présent dans la réponse API
}

interface AuthError {
  message: string;
}

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AuthError | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get('token');
      if (!token) {
        setLoading(false);
        navigate('/');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const personnel = response.data;
        // Vérification de base des données utilisateur
        if (!personnel.nomUtilisateur) {
          console.error('Invalid user data received:', personnel);
          throw new Error('Invalid user data');
        }

        setUser(personnel);
      } catch (err) {
        console.error('Auth error:', err);
        setError({ message: 'Erreur lors de la récupération de l\'utilisateur.' });
        Cookies.remove('token');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const getToken = () => {
    return Cookies.get('token') || null;
  };

  return { user, loading, error, getToken };
};

export default useAuth;