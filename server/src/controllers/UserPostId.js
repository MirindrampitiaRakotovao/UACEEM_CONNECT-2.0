const { Publication, Personnel } = require('../models');

// Fonction pour récupérer les publications d'un utilisateur spécifique
exports.UserPostId = async (req, res) => {
    const { userId } = req.params;

    try {
        // Récupérer les publications de l'utilisateur avec l'ID donné
        const publications = await Publication.findAll({
            where: { auteurId: userId },
            include: [
                {
                    model: Personnel,
                    as: 'auteur', // Assurez-vous que l'alias correspond à la relation définie dans votre modèle
                    attributes: ['id', 'nomUtilisateur', 'photoProfil'], // Inclure les informations nécessaires de l'auteur
                },
            ],
            order: [['createdAt', 'DESC']], // Trier par date de création (la plus récente en premier)
        });

        if (!publications || publications.length === 0) {
            return res.status(404).json({ message: "Aucune publication trouvée pour cet utilisateur." });
        }

        res.status(200).json(publications);
    } catch (error) {
        console.error("Erreur lors de la récupération des publications :", error);
        res.status(500).json({ message: "Erreur du serveur lors de la récupération des publications." });
    }
};
