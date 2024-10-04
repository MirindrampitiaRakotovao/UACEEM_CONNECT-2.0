import axios from 'axios';

export const getPublicPublications = async () => {
  const token = localStorage.getItem('token'); // Récupère le token du localStorage
  if (!token) {
    throw new Error('Utilisateur non authentifié');
  }

  try {
    const response = await axios.get('http://localhost:4000/publication/liste/public', {
      headers: {
        Authorization: `Bearer ${token}`, // Inclut le token dans l'en-tête Authorization
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Erreur lors de la récupération des publications');
  }
};

export const getPublicPublicationMe = async () => {
  const token = localStorage.getItem('token'); // Récupère le token du localStorage
  if (!token) {
    throw new Error('Utilisateur non authentifié');
  }

  try {
    const response = await axios.get('http://localhost:4000/publication/liste/public/me', {
      headers: {
        Authorization: `Bearer ${token}`, // Inclut le token dans l'en-tête Authorization
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Erreur lors de la récupération des publications');
  }
};

