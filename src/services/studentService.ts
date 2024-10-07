import axios from 'axios';

export const getAllStudentsWithPhotos = async () => {
  try {
    const response = await axios.get('http://localhost:4000/etudiant/toutPhotodeProfil');
    return response.data;  // Supposons que cette réponse renvoie un tableau d'étudiants
  } catch (error) {
    console.error("Erreur lors de la récupération des étudiants :", error);
    throw error;
  }
};
