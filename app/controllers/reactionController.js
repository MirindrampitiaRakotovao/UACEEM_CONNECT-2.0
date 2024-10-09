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


// Lister les réactions pour un étudiant
exports.listReactions = async (req, res) => {
  try {
    const etudiantId = req.user.id; // ID de l'étudiant authentifié
    const { publicationId, commentaireId } = req.query; // Permet de filtrer par publication ou commentaire

    let condition = { etudiant_id: etudiantId };

    // Filtrer par publication ou commentaire si un ID est fourni
    if (publicationId) {
      condition.publication_id = publicationId;
    }
    if (commentaireId) {
      condition.commentaire_id = commentaireId;
    }

    // Récupérer les réactions de l'étudiant
    const reactions = await Reactions.findAll({
      where: condition,
      include: [
        { model: Publications, attributes: ['id', 'legende'] }, // Inclure les informations de la publication
        { model: Commentaires, attributes: ['id', 'contenu'] }   // Inclure les informations du commentaire
      ]
    });

    // Si aucune réaction trouvée
    if (reactions.length === 0) {
      return res.status(404).json({ message: 'Aucune réaction trouvée.' });
    }

    // Retourner la liste des réactions
    res.status(200).json(reactions);
  } catch (error) {
    console.error('Error in listReactions:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des réactions.' });
  }
};

