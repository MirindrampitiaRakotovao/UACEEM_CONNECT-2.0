const { Personnel } = require('../models');

const getAllUsers = async (req, res) => {
  try {
    // Récupérer tous les utilisateurs sans limite
    const users = await Personnel.findAll({
      order: [['createdAt', 'DESC']], // Tri par date de création, ajustez si nécessaire
    });

    // Si aucun utilisateur n'est trouvé
    if (users.length === 0) {
      return res.status(404).json({ error: 'Aucun utilisateur trouvé' });
    }

    // Mapper les utilisateurs pour obtenir les données nécessaires
    const userData = users.map(user => ({
      id: user.id,
      nom: user.nom,
      prenom: user.prenom,
      nomUtilisateur: user.nomUtilisateur,
      photoProfil: user.photoProfil,
      role: user.role
    }));

    res.status(200).json(userData);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

module.exports = {
  getAllUsers
};
