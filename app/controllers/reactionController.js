const Reactions = require('../models/reactions');
const Publications = require('../models/publications');

exports.addOrRemoveReaction = async (req, res) => {
  try {
    const { publicationId } = req.params;
    const etudiantId = req.user.id; // ID of the authenticated student

    // Check if the student has already reacted to this publication
    const existingReaction = await Reactions.findOne({
      where: { publication_id: publicationId, etudiant_id: etudiantId },
    });

    if (existingReaction) {
      // Remove the reaction and decrement the reaction count
      await existingReaction.destroy();
      await Publications.decrement('nombre_reaction', { where: { id: publicationId } });

      return res.status(200).json({ message: 'Réaction supprimée.' });
    }

    // Add a new reaction and increment the reaction count
    await Reactions.create({ publication_id: publicationId, etudiant_id: etudiantId });
    await Publications.increment('nombre_reaction', { where: { id: publicationId } });

    res.status(200).json({ message: 'Réaction ajoutée.' });
  } catch (error) {
    console.error('Error in addOrRemoveReaction:', error); 
    res.status(500).json({ error: 'Erreur lors de la gestion de la réaction.' });
  }
};
