const { Personnel } = require('../models');
const sequelize = require('sequelize');

// Fonction pour récupérer le nombre de personnels par jour
const getTotalUsersByDay = async (req, res) => {
  try {
    // Récupérer le nombre total de personnels groupés par jour
    const personnelCounts = await Personnel.findAll({
      attributes: [
        // Extraire la date uniquement (sans l'heure) depuis createdAt
        [sequelize.fn('DATE', sequelize.col('createdAt')), 'date'],
        // Compter le nombre de personnels
        [sequelize.fn('COUNT', sequelize.col('id')), 'total'],
      ],
      group: [
        // Grouper par date
        sequelize.fn('DATE', sequelize.col('createdAt'))
      ],
      order: [[sequelize.fn('DATE', sequelize.col('createdAt')), 'ASC']], // Trier par date croissante
    });

    // Si aucun personnel trouvé
    if (personnelCounts.length === 0) {
      return res.status(404).json({ error: 'Aucun personnel trouvé' });
    }

    res.status(200).json(personnelCounts); // Retourner les données des personnels par jour
  } catch (error) {
    console.error('Erreur lors de la récupération des personnels par jour :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

module.exports = { getTotalUsersByDay };
