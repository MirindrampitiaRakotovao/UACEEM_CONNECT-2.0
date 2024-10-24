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

export const getPublicationGroup = async () => {
  const token = localStorage.getItem('token'); // Récupère le token du localStorage
  if (!token) {
    throw new Error('Utilisateur non authentifié');
  }

  try {
    const response = await axios.get('http://localhost:4000/publication/liste/groupe/me', {
      headers: {
        Authorization: `Bearer ${token}`, // Inclut le token dans l'en-tête Authorization
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Erreur lors de la récupération des publications');
  }
};


// Fetch user reactions (likes)
export const fetchUserReactions = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get('http://localhost:4000/reaction', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.map((reaction: any) => reaction.publication_id);
};

// Fetch commentaires for a publication
export const fetchCommentaires = async (publicationId: number) => {
  const response = await axios.get(`http://localhost:4000/commentaire/${publicationId}`);
  return response.data;
};

// Handle like/unlike
export const handleLikeToggle = async (publicationId: number, likedPublications: number[]) => {
  const token = localStorage.getItem('token');
  await axios.post(
    'http://localhost:4000/reaction',
    { publicationId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  
  return likedPublications.includes(publicationId)
    ? likedPublications.filter((id) => id !== publicationId)
    : [...likedPublications, publicationId];
};

// Send comment
export const sendComment = async (publicationId: number, content: string) => {
  const token = localStorage.getItem('token');
  const etudiantId = localStorage.getItem('etudiantId');
  await axios.post(
    'http://localhost:4000/commentaire',
    { contenu: content, publicationId, etudiantId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

