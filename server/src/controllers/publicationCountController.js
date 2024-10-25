const { Publication } = require('../models'); // Assurez-vous d'avoir importé correctement le modèle Publication

exports.countUserPublications = async (req, res) => {
  try {
    // Récupérer l'ID de l'utilisateur connecté depuis req.personnel
    const userId = req.personnel.id; // Utilisez req.personnel.id car c'est là où l'ID est stocké par authMiddleware

    // Vérifiez si l'ID est défini
    if (!userId) {
      return res.status(400).json({ message: "L'ID de l'utilisateur est manquant." });
    }

    // Compter les publications de l'utilisateur
    const publicationsCount = await Publication.count({
      where: { auteurId: userId }, // Utilisation de l'ID de l'utilisateur connecté
    });

    res.status(200).json({
      success: true,
      message: 'Nombre de publications récupéré avec succès',
      count: publicationsCount,
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du nombre de publications:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du nombre de publications',
    });
  }
};
