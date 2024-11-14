import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';


interface User {
  id: string;
  nom: string;
  role: string;  // Assurez-vous que le champ role est bien là
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
    const token = Cookies.get('token');
    if (token) {
      // Si le token existe, envoyer une requête au serveur pour valider le token
      axios.get('http://localhost:5000/api/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        console.log('Réponse API :', response.data); // Log pour débogage
        const personnel = response.data; // Utilisez ici response.data directement

        if (personnel.role) { // Vérifiez si le rôle existe
          setUser(personnel); // Stocker les informations utilisateur

          // Rediriger l'utilisateur en fonction de son rôle
          switch (personnel.role) {
            case 'admin':
              navigate('/acceuilAdmin');
              break;
            case 'professeur':
              navigate('/acceuilProfesseur');
              break;
            case 'etudiant':
              navigate('/acceuilClub');
              break;
            case 'president_association':
              navigate('/acceuilAssociation');
              break;
            default:
              navigate('/acceuilUser');
              break;
          }
        } else {
          console.error('Rôle manquant dans la réponse utilisateur');
        }
      })
      .catch(err => {
        console.error('Erreur lors de la récupération de l\'utilisateur :', err);
        setError({ message: 'Erreur lors de la récupération de l\'utilisateur.' });
        Cookies.remove('token'); // Supprimer le token s'il est invalide
        navigate('/'); // Rediriger vers la page de connexion
      })
      .finally(() => {
        setLoading(false);
      });
    } else {
      setLoading(false); // Aucun token trouvé
      navigate('/'); // Redirigez vers la page de connexion
    }
  }, [navigate]);

  return { user, loading, error };
};

export default useAuth;
