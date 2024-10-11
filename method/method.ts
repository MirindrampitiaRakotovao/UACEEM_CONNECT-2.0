import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';


//pour le login
export const handleLogin = async (
    username: string,
    password: string,
    setError: React.Dispatch<React.SetStateAction<string>>
  ) => {
    //const navigate = useNavigate(); // Note que tu dois appeler cela dans un composant React
  
    try {
      const response = await axios.post('http://localhost:4000/login', {
        username,
        password,
      });
  
      const data = response.data;
      console.log(data.etudiant.id);
  
      // Stocker le token JWT dans le localStorage ou dans un state manager comme Redux
      localStorage.setItem('token', data.token);
  
      // Décoder le token JWT pour obtenir le rôle
      const decodedToken = jwtDecode<{ role: string }>(data.token);

      // Vérifier si la réponse contient également l'identifiant de l'étudiant
      if (data.etudiant && data.etudiant.id) {
        localStorage.setItem('etudiantId', data.etudiant.id); // Stocker l'ID de l'étudiant
      }
  
      // Rediriger en fonction du rôle de l'utilisateur
      switch (decodedToken.role) {
        case 'admin':
          //navigate('/DashboardAdmin');
          break;
        case 'delegue':
          //navigate('/homeDelegue');
          break;
        case 'etudiant':
          //navigate('/homeEtudiant');
          break;
        default:
          setError('Rôle utilisateur inconnu');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Erreur serveur');
    }
  };
  
//pour la deconnexion
export const handleLogout = async (navigate: any) => {
    try {
      const response = await axios.post('http://localhost:4000/logout', {}, { withCredentials: true });

      if (response.status === 200) {
        // Si la déconnexion a réussi, rediriger vers la page de login
        navigate('/login');  // Redirige vers /login
      } else {
        console.error('Erreur lors de la déconnexion : ', response.status);
      }
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };
