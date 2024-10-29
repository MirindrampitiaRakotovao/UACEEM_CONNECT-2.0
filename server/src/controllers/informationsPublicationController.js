// src/controllers/informationsPublicationController.js
const { Publication, Personnel } = require('../models');

// Contrôleur pour récupérer les publications
const getPublications = async (req, res) => {
    try {
        const publications = await Publication.findAll({
            include: [{
                model: Personnel,
                as: 'auteur', // Assurez-vous que cet alias correspond à celui défini dans votre modèle
                attributes: ['id', 'nomUtilisateur', 'photoProfil', 'nom', 'prenom', 'role', 'posteOccupe'], // Inclure uniquement les informations nécessaires
            }],
        });

        res.status(200).json(publications);
    } catch (error) {
        console.error('Erreur lors de la récupération des publications :', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

// Assurez-vous d'exporter correctement la fonction
module.exports = {
    getPublications,
};
