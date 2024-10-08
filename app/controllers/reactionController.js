const Reactions = require('../models/reactions');
const Publications = require('../models/publications');
const Commentaires = require('../models/commentaires');

// Ajouter ou retirer une réaction à une publication ou un commentaire
exports.addOrRemoveReaction = async (req, res) => {
  try {
    const { publicationId, commentaireId } = req.body;
    const etudiantId = req.user.id; // ID de l'étudiant authentifié

    // Vérifier si la réaction concerne une publication ou un commentaire
    if (!publicationId && !commentaireId) {
      return res.status(400).json({ error: 'ID de publication ou de commentaire requis.' });
    }

    let condition = { etudiant_id: etudiantId };

    if (publicationId) {
      condition.publication_id = publicationId;
    } else if (commentaireId) {
      condition.commentaire_id = commentaireId;
    }

    // Vérifier si l'étudiant a déjà réagi à cette publication ou commentaire
    const existingReaction = await Reactions.findOne({ where: condition });

    if (existingReaction) {
      // Supprimer la réaction
      await existingReaction.destroy();

      // Décrémenter le nombre de réactions de la publication ou du commentaire
      if (publicationId) {
        await Publications.decrement('nombre_reaction', { where: { id: publicationId } });
      } else if (commentaireId) {
        await Commentaires.decrement('nombre_reaction_commentaire', { where: { id: commentaireId } });
      }

      return res.status(200).json({ message: 'Réaction supprimée.' });
    }

    // Ajouter une nouvelle réaction
    await Reactions.create({ publication_id: publicationId || null, commentaire_id: commentaireId || null, etudiant_id: etudiantId });

    // Incrémenter le nombre de réactions de la publication ou du commentaire
    if (publicationId) {
      await Publications.increment('nombre_reaction', { where: { id: publicationId } });
    } else if (commentaireId) {
      await Commentaires.increment('nombre_reaction_commentaire', { where: { id: commentaireId } });
    }

    res.status(200).json({ message: 'Réaction ajoutée.' });
  } catch (error) {
    console.error('Error in addOrRemoveReaction:', error);
    res.status(500).json({ error: 'Erreur lors de la gestion de la réaction.' });
  }
};
