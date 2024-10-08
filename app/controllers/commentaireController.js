const Commentaire = require('../models/commentaires');
const Etudiant = require('../models/etudiants');

// Créer un nouveau commentaire
const Publications = require('../models/publications'); // Assure-toi d'importer le modèle Publication

exports.createCommentaire = async (req, res) => {
  try {
    const { contenu, publicationId, etudiantId } = req.body;

    // Créer le commentaire
    const commentaire = await Commentaire.create({
      contenu: contenu,
      publication_id: publicationId,
      etudiant_id: etudiantId
    });

    // Incrémenter le nombre de commentaires de la publication
    await Publications.increment('nombre_commentaire', { where: { id: publicationId } });

    res.status(201).json({ message: 'Commentaire créé avec succès', commentaire });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Récupérer tous les commentaires d'une publication
exports.getCommentairesByPublication = async (req, res) => {
  try {
    const { publicationId } = req.params;

    const commentaires = await Commentaire.findAll({
      where: { publication_id: publicationId },
      include: [
        {
          model: Etudiant,
          attributes: ['nom', 'username'],
        }
      ]
    });

    res.status(200).json(commentaires);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supprimer un commentaire
exports.deleteCommentaire = async (req, res) => {
  try {
    const { commentaireId } = req.params;

    // Trouver le commentaire à supprimer
    const commentaire = await Commentaire.findOne({ where: { id: commentaireId } });

    if (!commentaire) {
      return res.status(404).json({ message: 'Commentaire non trouvé' });
    }

    // Supprimer le commentaire
    await commentaire.destroy();

    // Décrémenter le nombre de commentaires de la publication
    await Publications.decrement('nombre_commentaire', { where: { id: commentaire.publication_id } });

    res.status(200).json({ message: 'Commentaire supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};