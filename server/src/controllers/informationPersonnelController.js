// controllers/informationPersonnelController.js
const { Personnel } = require('../models');

const getUserProfile = async (req, res) => {
  try {
    const userId = req.personnel.id; // ID de l'utilisateur récupéré du token
    const personnel = await Personnel.findByPk(userId);

    if (!personnel) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    res.status(200).json({
      nom: personnel.nom,
      prenom: personnel.prenom,
      nomUtilisateur: personnel.nomUtilisateur,
      photoProfil: personnel.photoProfil, // URL de la photo de profil
      role: personnel.role // Assurez-vous d'inclure le rôle ici
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du profil utilisateur :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

module.exports = {
  getUserProfile
};
