const { ReactionPublication, Publication, Personnel, Notification } = require('../models'); // Ajoutez Notification ici
const jwt = require('jsonwebtoken');
const { getIO } = require('../../socket'); // Importez getIO pour les notifications en temps réel via WebSocket

// Méthode pour ajouter ou retirer une réaction
exports.toggleReaction = async (req, res) => {
  const { publicationId } = req.params;
  const token = req.headers.authorization?.split(' ')[1];
  let userId;

  // Vérifiez si le token est fourni
  if (!token) {
    return res.status(401).json({ message: 'Token manquant ou invalide.' });
  }

  try {
    // Vérifiez et décodez le token JWT
    const decoded = jwt.verify(token, 'votre_clé_secrète_pour_jwt'); // Remplacez par votre clé secrète
    userId = decoded.id; // Récupérez l'ID de l'utilisateur depuis le payload
  } catch (error) {
    return res.status(401).json({ message: 'Token invalide.' });
  }

  try {
    // Vérifiez si la publication existe
    const publication = await Publication.findByPk(publicationId, {
      include: [{ model: Personnel, as: 'auteur', attributes: ['id', 'nomUtilisateur'] }] // Inclure l'auteur de la publication
    });
    if (!publication) {
      return res.status(404).json({ message: 'Publication non trouvée.' });
    }

    // Vérifiez si l'utilisateur a déjà réagi à cette publication
    const reaction = await ReactionPublication.findOne({
      where: { publicationId, userId }
    });

    let reactionCount;

    if (reaction) {
      // Si une réaction existe déjà, on la supprime
      await reaction.destroy();
      // Émettre un événement de suppression de réaction à tous les clients
      getIO().emit('reactionRemoved', { publicationId, userId });
    } else {
      // Sinon, on ajoute une nouvelle réaction
      const newReaction = await ReactionPublication.create({
        publicationId,
        userId
      });
      // Émettre un événement d'ajout de réaction à tous les clients
      getIO().emit('reactionAdded', { publicationId, userId });

      // Créer la notification pour l'auteur de la publication si ce n'est pas l'auteur lui-même
      if (userId !== publication.auteur.id) {
        // Récupérez le nom de l'utilisateur connecté
        const connectedUser = await Personnel.findByPk(userId, {
          attributes: ['nomUtilisateur'] // On suppose que le modèle Personnel a un attribut nomUtilisateur
        });

        const notificationMessage = `${connectedUser.nomUtilisateur} a réagi à votre publication`;
        await Notification.create({
          userId: publication.auteur.id, // ID de l'auteur de la publication
          creatorId: userId, // ID de l'utilisateur qui a déclenché la notification
          type: 'reaction',
          message: notificationMessage,
          publicationId: publicationId,
          reactionPublicationId: newReaction.id // Référence à la réaction nouvellement créée
        });

        // Log que l'auteur de la publication a reçu la notification
        console.log(`L'auteur de la publication (${publication.auteur.id}) a reçu la notification.`);
        
        // Log de notification créée
        console.log(`Notification créée par l'utilisateur connecté (${userId}): ${notificationMessage}`);
      }
    }

    // Compter le nombre total de réactions après modification
    reactionCount = await ReactionPublication.count({
      where: { publicationId }
    });

    // Émettre le nombre de réactions mis à jour à tous les clients
    getIO().emit('reactionCountUpdated', { publicationId, count: reactionCount });

    // Retournez une réponse au client
    return res.status(reaction ? 200 : 201).json({
      message: reaction ? 'Réaction retirée.' : 'Réaction ajoutée.',
      count: reactionCount // Retournez le nombre de réactions dans la réponse
    });
  } catch (error) {
    console.error('Erreur lors de la gestion de la réaction:', error);
    return res.status(500).json({ message: 'Erreur du serveur.' });
  }
};

// Méthode pour obtenir le nombre de réactions d'une publication
exports.getReactionsCount = async (req, res) => {
  const { publicationId } = req.params;

  try {
    const count = await ReactionPublication.count({
      where: { publicationId }
    });
    return res.status(200).json({ count });
  } catch (error) {
    console.error('Erreur lors du comptage des réactions:', error);
    return res.status(500).json({ message: 'Erreur du serveur.' });
  }
};

// Méthode pour obtenir toutes les réactions d'une publication (liste des utilisateurs ayant réagi)
exports.getReactions = async (req, res) => {
  const { publicationId } = req.params;

  try {
    const reactions = await ReactionPublication.findAll({
      where: { publicationId },
      include: [{
        model: Personnel, // Assume que Personnel est le modèle de l'utilisateur
        as: 'user',
        attributes: ['id', 'nom', 'prenom', 'nomUtilisateur'] // Ajustez les champs selon votre modèle
      }]
    });

    return res.status(200).json({ reactions });
  } catch (error) {
    console.error('Erreur lors de la récupération des réactions:', error);
    return res.status(500).json({ message: 'Erreur du serveur.' });
  }
};

// Méthode pour obtenir si l'utilisateur connecté a réagi à une publication spécifique
exports.getUserReaction = async (req, res) => {
  const { publicationId } = req.params;
  const token = req.headers.authorization?.split(' ')[1];
  let userId;

  // Vérifiez si le token est fourni
  if (!token) {
    return res.status(401).json({ message: 'Token manquant ou invalide.' });
  }

  try {
    // Vérifiez et décodez le token JWT
    const decoded = jwt.verify(token, 'votre_clé_secrète_pour_jwt'); // Remplacez par votre clé secrète
    userId = decoded.id; // Récupérez l'ID de l'utilisateur depuis le payload
  } catch (error) {
    return res.status(401).json({ message: 'Token invalide.' });
  }

  try {
    // Vérifiez si la publication existe
    const publication = await Publication.findByPk(publicationId);
    if (!publication) {
      return res.status(404).json({ message: 'Publication non trouvée.' });
    }

    // Vérifiez si l'utilisateur a déjà réagi à cette publication
    const reaction = await ReactionPublication.findOne({
      where: { publicationId, userId }
    });

    // Retournez true ou false selon la présence de la réaction
    return res.status(200).json({ reacted: !!reaction });
  } catch (error) {
    console.error('Erreur lors de la vérification de la réaction de l\'utilisateur:', error);
    return res.status(500).json({ message: 'Erreur du serveur.' });
  }
};
