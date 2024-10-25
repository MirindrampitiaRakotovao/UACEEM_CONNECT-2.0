'use strict';
const { Publication, Commentaire, Personnel, Notification } = require('../models');
const { getIO } = require('../../socket'); // Importez getIO pour les notifications en temps réel via WebSocket

// Créer un nouveau commentaire
exports.createCommentaire = async (req, res) => {
    try {
        const { text } = req.body;
        const { publicationId } = req.params;
        const personnelId = req.personnel.id;

        // Créer le commentaire
        const commentaire = await Commentaire.create({
            text: text,
            publicationId: publicationId,
            auteurId: personnelId,
            parentId: null, // Initialiser à null pour un nouveau commentaire (parent)
        });

        // Incrémenter le nombre de commentaires de la publication
        await Publication.increment('nombre_commentaire', { where: { id: publicationId } });

        // Récupérer l'auteur de la publication pour lui envoyer une notification
        const publication = await Publication.findOne({ where: { id: publicationId } });
        const auteurPublicationId = publication.auteurId;

        // Créer la notification
        const auteurCommentaire = await Personnel.findOne({ where: { id: personnelId } });
        const notification = await Notification.create({
            userId: auteurPublicationId,
            creatorId: personnelId,
            type: 'COMMENTAIRE',
            message: `${auteurCommentaire.nomUtilisateur} a commenté votre publication: "${text}"`,
            publicationId: publicationId,
            commentaireId: commentaire.id,
        });

        console.log(`Notification envoyée: ${auteurCommentaire.nomUtilisateur} a commenté la publication de l'utilisateur ${auteurPublicationId}. Message: "${notification.message}"`);

        res.status(201).json({ message: 'Commentaire créé avec succès', commentaire });
    } catch (error) {
        console.error('Erreur lors de la création du commentaire:', error);
        res.status(500).json({ message: error.message });
    }
};

// Récupérer tous les commentaires et leurs réponses
exports.getCommentairesEtReponses = async (req, res) => {
    try {
        const { publicationId } = req.params;

        // Récupérer tous les commentaires de la publication
        const commentaires = await Commentaire.findAll({
            where: { publicationId: publicationId },
            include: [
                {
                    model: Personnel,
                    as: 'auteur',
                    attributes: ['id', 'nom', 'nomUtilisateur', 'photoProfil'],
                },
            ],
        });

        // Construire la structure hiérarchique des commentaires
        const commentairesAvecReponses = construireArbreCommentaires(commentaires);

        res.status(200).json(commentairesAvecReponses);
    } catch (error) {
        console.error('Erreur lors de la récupération des commentaires:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des commentaires' });
    }
};

// Fonction récursive pour construire l'arbre des commentaires
const construireArbreCommentaires = (commentaires, parentId = null) => {
    const arbre = [];

    commentaires
        .filter(commentaire => commentaire.parentId === parentId)
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

        // Si c'est un commentaire parent (parentId est null), trouver toutes les réponses
        if (commentaire.parentId === null) {
            const reponses = await Commentaire.findAll({ where: { parentId: commentaireId } });

            // Supprimer toutes les réponses associées
            for (const reponse of reponses) {
                await reponse.destroy();
            }

            // Supprimer le commentaire parent
            await commentaire.destroy();

            // Décrémenter le nombre de commentaires de la publication en fonction du nombre de réponses et du commentaire parent
            const totalToDecrement = reponses.length + 1; // Nombre de réponses + 1 pour le commentaire parent
            await Publication.decrement('nombre_commentaire', { by: totalToDecrement, where: { id: commentaire.publicationId } });

            return res.status(200).json({ message: 'Commentaire et réponses supprimés avec succès.' });
        }

        // Si c'est une réponse (parentId n'est pas null), supprimer simplement la réponse
        await commentaire.destroy();

        // Décrémenter le nombre de commentaires de la publication
        await Publication.decrement('nombre_commentaire', { where: { id: commentaire.publicationId } });

        res.status(200).json({ message: 'Réponse supprimée avec succès.' });
    } catch (error) {
        console.error('Erreur lors de la suppression du commentaire:', error);
        res.status(500).json({ message: error.message });
    }
};

// Répondre à un commentaire
exports.createReponse = async (req, res) => {
    try {
        const { text } = req.body;
        const commentaireId = req.params.commentaireId;
        const personnelId = req.personnel.id;

        console.log(`ID du commentaire: ${commentaireId}`);

        // Vérifier si le commentaire auquel on veut répondre existe
        const commentaire = await Commentaire.findOne({ 
            where: { id: commentaireId },
            include: [{ model: Personnel, as: 'auteur' }]
        });

        if (!commentaire) {
            return res.status(404).json({ message: 'Commentaire non trouvé.' });
        }

        // Créer une nouvelle réponse
        const reponse = await Commentaire.create({
            text: text,
            parentId: commentaireId,
            publicationId: commentaire.publicationId,
            auteurId: personnelId,
        });

        // Incrémenter le nombre de commentaires de la publication d'origine
        await Publication.increment('nombre_commentaire', { where: { id: commentaire.publicationId } });

        // Vérifier si l'auteur de la réponse est différent de l'auteur du commentaire original
        if (personnelId !== commentaire.auteurId) {
            // Récupérer l'auteur de la réponse
            const auteurReponse = await Personnel.findOne({ where: { id: personnelId } });

            // Créer la notification pour l'auteur du commentaire original
            const notification = await Notification.create({
                userId: commentaire.auteurId,
                creatorId: personnelId,
                type: 'REPONSE',
                message: `${auteurReponse.nomUtilisateur} a répondu à votre commentaire: "${text}"`,
                publicationId: commentaire.publicationId,
                commentaireId: reponse.id,
            });

            console.log(`Notification envoyée: ${auteurReponse.nomUtilisateur} a répondu au commentaire de l'utilisateur ${commentaire.auteurId}. Message: "${notification.message}"`);

            // Vous pouvez ajouter ici la logique pour envoyer la notification en temps réel via WebSocket si nécessaire
            // const io = getIO();
            // io.to(`user_${commentaire.auteurId}`).emit('nouvelle_notification', notification);
        }

        res.status(201).json({ message: 'Réponse ajoutée avec succès', reponse });
    } catch (error) {
        console.error('Erreur lors de la création de la réponse:', error);
        res.status(500).json({ error: 'Erreur lors de la création de la réponse.' });
    }
};
