const { Personnel } = require('../models'); // Assurez-vous d'importer votre modèle

// Fonction pour récupérer un utilisateur par ID
const getPersonnelById = async (req, res) => {
  try {
    const id = req.params.id;
    const personnel = await Personnel.findOne({ where: { id } });

    if (!personnel) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.json(personnel);
  } catch (error) {
    console.error('Erreur lors de la récupération des données de l\'utilisateur:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = {
  getPersonnelById,
};
