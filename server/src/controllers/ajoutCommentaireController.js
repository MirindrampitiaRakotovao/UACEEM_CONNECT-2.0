'use strict';
const { Publication, Commentaire, Personnel, Notification } = require('../models');
const { getIO } = require('../../socket');
const moment = require('moment');
moment.locale('fr'); // Pour utiliser les formats en français

// Fonction pour construire l'arbre des commentaires
const construireArbreCommentaires = (commentaires) => {
    const commentairesMap = new Map();
    const racine = [];

    commentaires.forEach(commentaire => {
        commentaire.reponses = [];
        commentairesMap.set(commentaire.id, commentaire);
    });

    commentaires.forEach(commentaire => {
        if (commentaire.parentId) {
            const parentCommentaire = commentairesMap.get(commentaire.parentId);
            if (parentCommentaire) {
                parentCommentaire.reponses.push(commentaire);
            } else {
                racine.push(commentaire);
            }
        } else {
            racine.push(commentaire);
        }
    });

    return racine;
};

// Créer un nouveau commentaire
exports.createCommentaire = async (req, res) => {
    try {
        const { text } = req.body;
        const { publicationId } = req.params;
        const personnelId = req.personnel.id;

        const commentaire = await Commentaire.create({
            text: text,
            publicationId: publicationId,
            auteurId: personnelId,
            parentId: null,
        });

        const auteur = await Personnel.findByPk(personnelId, {
            attributes: ['id', 'nom', 'nomUtilisateur', 'photoProfil']
        });

        await Publication.increment('nombre_commentaire', { where: { id: publicationId } });

        const publication = await Publication.findOne({ where: { id: publicationId } });
        const auteurPublicationId = publication.auteurId;

        const notification = await Notification.create({
            userId: auteurPublicationId,
            creatorId: personnelId,
            type: 'COMMENTAIRE',
            message: `${auteur.nomUtilisateur} a commenté votre publication: "${text}"`,
            publicationId: publicationId,
            commentaireId: commentaire.id,
        });

        console.log(`Notification envoyée: ${auteur.nomUtilisateur} a commenté la publication de l'utilisateur ${auteurPublicationId}. Message: "${notification.message}"`);

        const commentaireComplet = {
            ...commentaire.toJSON(),
            auteur: auteur.toJSON(),
            indicationTemps: "À l'instant"
        };

        res.status(201).json({
            message: 'Commentaire créé avec succès',
            commentaire: commentaireComplet
        });
    } catch (error) {
        console.error('Erreur lors de la création du commentaire:', error);
        res.status(500).json({ message: error.message });
    }
};

// Récupérer tous les commentaires et leurs réponses
exports.getCommentairesEtReponses = async (req, res) => {
    try {
        const { publicationId } = req.params;
        const commentaires = await Commentaire.findAll({
            where: { publicationId: publicationId },
            include: [
                {
                    model: Personnel,
                    as: 'auteur',
                    attributes: ['id', 'nom', 'nomUtilisateur', 'photoProfil'],
                },
            ],
            order: [['createdAt', 'DESC']]
        });

        const maintenant = moment();
        const commentairesTraites = commentaires.map(commentaire => {
            const commentaireJSON = commentaire.toJSON();
            const dateCreation = moment(commentaire.createdAt);
            const diffMinutes = maintenant.diff(dateCreation, 'minutes');

            if (diffMinutes < 1) {
                commentaireJSON.indicationTemps = "À l'instant";
            } else if (diffMinutes < 60) {
                commentaireJSON.indicationTemps = `Il y a ${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`;
            } else if (diffMinutes < 1440) {
                const heures = Math.floor(diffMinutes / 60);
                commentaireJSON.indicationTemps = `Il y a ${heures} heure${heures > 1 ? 's' : ''}`;
            } else if (diffMinutes < 2880) {
                commentaireJSON.indicationTemps = "Hier";
            } else {
                const jours = Math.floor(diffMinutes / 1440);
                commentaireJSON.indicationTemps = `Il y a ${jours} jour${jours > 1 ? 's' : ''}`;
            }

            return commentaireJSON;
        });

        const commentairesAvecReponses = construireArbreCommentaires(commentairesTraites);
        res.status(200).json(commentairesAvecReponses);
    } catch (error) {
        console.error('Erreur lors de la récupération des commentaires:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des commentaires' });
    }
};

// Supprimer un commentaire
exports.deleteCommentaire = async (req, res) => {
    try {
        const { commentaireId } = req.params;
        const commentaire = await Commentaire.findOne({ where: { id: commentaireId } });

        if (!commentaire) {
            return res.status(404).json({ message: 'Commentaire non trouvé' });
        }

        if (commentaire.parentId === null) {
            const reponses = await Commentaire.findAll({ where: { parentId: commentaireId } });
            for (const reponse of reponses) {
                await reponse.destroy();
            }
            await commentaire.destroy();
            const totalToDecrement = reponses.length + 1;
            await Publication.decrement('nombre_commentaire', { by: totalToDecrement, where: { id: commentaire.publicationId } });
            return res.status(200).json({ message: 'Commentaire et réponses supprimés avec succès.' });
        }

        await commentaire.destroy();
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

        const commentaire = await Commentaire.findOne({
            where: { id: commentaireId },
            include: [{ model: Personnel, as: 'auteur' }]
        });

        if (!commentaire) {
            return res.status(404).json({ message: 'Commentaire non trouvé.' });
        }

        const reponse = await Commentaire.create({
            text: text,
            parentId: commentaireId,
            publicationId: commentaire.publicationId,
            auteurId: personnelId,
        });

        await Publication.increment('nombre_commentaire', { where: { id: commentaire.publicationId } });

        if (personnelId !== commentaire.auteurId) {
            const auteurReponse = await Personnel.findOne({ where: { id: personnelId } });
            const notification = await Notification.create({
                userId: commentaire.auteurId,
                creatorId: personnelId,
                type: 'REPONSE',
                message: `${auteurReponse.nomUtilisateur} a répondu à votre commentaire: "${text}"`,
                publicationId: commentaire.publicationId,
                commentaireId: reponse.id,
            });

            console.log(`Notification envoyée: ${auteurReponse.nomUtilisateur} a répondu au commentaire de l'utilisateur ${commentaire.auteurId}. Message: "${notification.message}"`);
        }

        // Récupérer les informations complètes de l'auteur de la réponse
        const auteur = await Personnel.findByPk(personnelId, {
            attributes: ['id', 'nom', 'nomUtilisateur', 'photoProfil']
        });

        const reponseComplete = {
            ...reponse.toJSON(),
            auteur: auteur.toJSON(),
            indicationTemps: "À l'instant"
        };

        res.status(201).json({ message: 'Réponse ajoutée avec succès', reponse: reponseComplete });
    } catch (error) {
        console.error('Erreur lors de la création de la réponse:', error);
        res.status(500).json({ error: 'Erreur lors de la création de la réponse.' });
    }
};