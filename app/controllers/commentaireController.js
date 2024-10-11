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


exports.getCommentairesEtReponses = async (req, res) => {
  try {
    const { publicationId } = req.params;

    // Récupérer tous les commentaires de la publication
    const commentaires = await Commentaire.findAll({
      where: { publication_id: publicationId },
      include: [
        {
          model: Etudiant,
          attributes: ['id', 'nom', 'username'],
        }
      ]
    });

    // Construire la structure hiérarchique des commentaires
    const commentairesAvecReponses = construireArbreCommentaires(commentaires);

    res.status(200).json(commentairesAvecReponses);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des commentaires' });
  }
};

// Fonction récursive pour construire l'arbre des commentaires
const construireArbreCommentaires = (commentaires, parentId = null) => {
  const arbre = [];

  commentaires
    .filter(commentaire => commentaire.parent_id === parentId)
    .forEach(commentaire => {
      const enfants = construireArbreCommentaires(commentaires, commentaire.id);
      if (enfants.length) {
        commentaire.dataValues.reponses = enfants;
      }
      arbre.push(commentaire);
    });

  return arbre;
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

    // Si c'est un commentaire parent (parent_id est null), trouver toutes les réponses
    if (commentaire.parent_id === null) {
      const reponses = await Commentaire.findAll({ where: { parent_id: commentaireId } });

      // Supprimer toutes les réponses associées
      for (const reponse of reponses) {
        await reponse.destroy();
      }

      // Supprimer le commentaire parent
      await commentaire.destroy();

      // Décrémenter le nombre de commentaires de la publication en fonction du nombre de réponses et du commentaire parent
      const totalToDecrement = reponses.length + 1; // Nombre de réponses + 1 pour le commentaire parent
      await Publications.decrement('nombre_commentaire', { by: totalToDecrement, where: { id: commentaire.publication_id } });

      return res.status(200).json({ message: 'Commentaire et réponses supprimés avec succès.' });
    }

    // Si c'est une réponse (parent_id n'est pas null), supprimer simplement la réponse
    await commentaire.destroy();

    // Décrémenter le nombre de commentaires de la publication
    await Publications.decrement('nombre_commentaire', { where: { id: commentaire.publication_id } });

    res.status(200).json({ message: 'Réponse supprimée avec succès.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//reponse a un commentaire
exports.createReponse = async (req, res) => {
  try {
    const { contenu, commentaireId, etudiantId } = req.body;

    // Vérifier si le commentaire auquel on veut répondre existe
    const commentaire = await Commentaire.findOne({ where: { id: commentaireId } });

    if (!commentaire) {
      return res.status(404).json({ message: 'Commentaire non trouvé.' });
    }

    // Créer une nouvelle réponse
    const reponse = await Commentaire.create({
      contenu: contenu,
      parent_id: commentaireId,  // Indiquer que c'est une réponse
      publication_id: commentaire.publication_id, // Garder la référence à la publication d'origine
      etudiant_id: etudiantId
    });

    // Incrémenter le nombre de commentaires de la publication d'origine
    await Publications.increment('nombre_commentaire', { where: { id: commentaire.publication_id } });

    res.status(201).json({ message: 'Réponse ajoutée avec succès', reponse });
  } catch (error) {
    console.error('Erreur lors de la création de la réponse:', error); // Log the actual error
    res.status(500).json({ error: 'Erreur lors de la création de la réponse.' });
  }
};

