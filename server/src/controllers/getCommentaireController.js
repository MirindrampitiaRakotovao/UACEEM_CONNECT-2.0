const { Commentaire, Personnel } = require('../models');

// Fonction pour récupérer les commentaires d'une publication
const getCommentaires = async (req, res) => {
    const publicationId = req.params.publicationId; // ID de la publication

    try {
        // Récupérer les commentaires de la publication avec leurs réponses et les réponses des réponses
        const commentaires = await Commentaire.findAll({
            where: { publicationId, parentId: null }, // Récupérer les commentaires sans parent (niveau 1)
            include: [
                {
                    model: Commentaire,
                    as: 'reponses', // Alias pour les réponses
                    include: [
                        {
                            model: Personnel,
                            as: 'auteur', // Utilisez l'alias défini dans le modèle Commentaire
                            attributes: ['nomUtilisateur', 'photoProfil'] // Inclure des informations sur l'auteur de la réponse
                        },
                        {
                            model: Commentaire,
                            as: 'reponses', // Alias pour les réponses des réponses
                            include: [
                                {
                                    model: Personnel,
                                    as: 'auteur', // Utilisez l'alias défini dans le modèle Commentaire
                                    attributes: ['nomUtilisateur', 'photoProfil'] // Inclure des informations sur l'auteur de la réponse
                                }
                            ]
                        }
                    ]
                },
                {
                    model: Personnel,
                    as: 'auteur', // Utilisez l'alias défini dans le modèle Commentaire
                    attributes: ['nomUtilisateur', 'photoProfil'] // Inclure des informations sur l'auteur du commentaire
                }
            ]
        });

        return res.status(200).json(commentaires);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des commentaires.', error });
    }
};

module.exports = { getCommentaires };
