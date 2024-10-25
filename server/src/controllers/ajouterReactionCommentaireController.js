const { ReactionCommentaire, Commentaire, Personnel } = require('../models');

// Fonction pour ajouter une réaction à un commentaire
const ajouterReactionCommentaire = async (req, res) => {
    const { commentaireId } = req.params; // ID du commentaire depuis les paramètres
    const { type } = req.body; // Type de réaction (like, love, sad, angry)
    const auteurId = req.personnel.id; // ID de l'utilisateur connecté (présent dans req)

    try {
        // Vérifiez si le commentaire existe
        const commentaire = await Commentaire.findByPk(commentaireId);
        if (!commentaire) {
            return res.status(404).json({ message: 'Commentaire non trouvé.' });
        }

        // Vérifiez si l'utilisateur a déjà réagi à ce commentaire
        const [reaction, created] = await ReactionCommentaire.findOrCreate({
            where: { commentaireId, auteurId },
            defaults: {
                commentaireId,
                auteurId,
                type,
            }
        });

        if (!created) {
            // Si une réaction existe déjà, mettez-la à jour
            reaction.type = type;
            await reaction.save();
        }

        return res.status(201).json(reaction);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erreur lors de l\'ajout de la réaction.', error });
    }
};

module.exports = { ajouterReactionCommentaire };
