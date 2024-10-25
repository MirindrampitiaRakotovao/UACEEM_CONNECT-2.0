const { ReactionCommentaire, Commentaire, Personnel } = require('../models');

// Ajouter une réaction à un commentaire
const ajouterReaction = async (req, res) => {
  const { commentaireId, type } = req.body;
  const auteurId = req.personnel.id;

  try {
    const commentaire = await Commentaire.findByPk(commentaireId);
    if (!commentaire) {
      return res.status(404).json({ message: 'Commentaire non trouvé.' });
    }

    const reactionExistante = await Reaction.findOne({
      where: { commentaireId, auteurId }
    });

    if (reactionExistante) {
      // Si une réaction existe déjà, mettre à jour le type
      reactionExistante.type = type;
      await reactionExistante.save();
      return res.status(200).json(reactionExistante);
    }

    // Créer une nouvelle réaction
    const reaction = await Reaction.create({
      type,
      commentaireId,
      auteurId,
    });

    return res.status(201).json(reaction);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Une erreur est survenue lors de l\'ajout de la réaction.' });
  }
};

// Récupérer les réactions d'un commentaire
const recupererReactions = async (req, res) => {
  const { commentaireId } = req.params;

  try {
    const reactions = await ReactionCommentaire.findAll({
      where: { commentaireId },
      include: [
        {
          model: Personnel,
          as: 'auteur',
          attributes: ['nomUtilisateur', 'photoProfil'], // Inclure le nom d'utilisateur et la photo de profil
        },
      ],
    });

    return res.status(200).json(reactions);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des réactions.' });
  }
};

module.exports = { ajouterReaction, recupererReactions };
