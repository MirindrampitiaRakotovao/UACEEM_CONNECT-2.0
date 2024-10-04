const Reactions = require('../models/reactions');
const Publications = require('../models/publications');

exports.addOrRemoveReaction = async (req, res) => {
  try {
    const { publicationId } = req.params;
    const etudiantId = req.user.id; // ID de l'étudiant connecté

    // Vérifie si l'étudiant a déjà réagi à cette publication
    const existingReaction = await Reactions.findOne({
      where: { publication_id: publicationId, etudiant_id: etudiantId },
    });

    if (existingReaction) {
      // Si la réaction existe déjà, on la retire et on décrémente le compteur
      await existingReaction.destroy();
      await Publications.increment({ nombre_reaction: -1 }, { where: { id: publicationId } });

      return res.status(200).json({ message: 'Réaction supprimée.' });
    }

    // Sinon, on crée une nouvelle réaction et on incrémente le compteur
    await Reactions.create({ publication_id: publicationId, etudiant_id: etudiantId });
    await Publications.increment({ nombre_reaction: 1 }, { where: { id: publicationId } });

    res.status(200).json({ message: 'Réaction ajoutée.' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la gestion de la réaction.' });
  }
};
