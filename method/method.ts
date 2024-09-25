import axios from 'axios';
import { useNavigate } from 'react-router-dom';

//pour le login

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
