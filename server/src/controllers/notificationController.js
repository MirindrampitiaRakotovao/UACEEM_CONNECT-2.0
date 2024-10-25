const { Notification, Personnel, Publication } = require('../models');

class NotificationsController {
    // Récupérer toutes les notifications d'un utilisateur
    async getNotifications(req, res) {
        try {
            const userId = req.personnel.id; // Récupérer l'ID de l'utilisateur connecté
            const notifications = await Notification.findAll({
                where: { userId },
                include: [
                    {
                        model: Personnel,
                        as: 'utilisateur', // Utilisateur qui reçoit la notification
                        attributes: ['nomUtilisateur', 'photoProfil'], // Inclut le nom d'utilisateur et la photo de profil
                    },
                    {
                        model: Personnel,
                        as: 'creator',
                        attributes: ['nomUtilisateur', 'photoProfil'],
                    },
                    {
                        model: Publication,
                        as: 'publication',
                        include: [
                            {
                                model: Personnel,
                                as: 'auteur',
                                attributes: ['photoProfil'],
                            },
                        ],
                    },
                ],
                order: [['createdAt', 'DESC']],
            });


            const formattedNotifications = notifications.map(notification => ({
                id: notification.id,
                message: notification.message,
                createdAt: notification.createdAt,
                isRead: notification.isRead,
                profileImage: notification.publication?.auteur?.photoProfil || null,
                utilisateurPhoto: notification.utilisateur.photoProfil,
                creatorPhoto: notification.creator.photoProfil,
            }));

            return res.status(200).json(formattedNotifications);
        } catch (error) {
            console.error('Erreur lors de la récupération des notifications:', error);
            return res.status(500).json({ message: 'Erreur lors de la récupération des notifications', error });
        }
    }

    // Marquer une notification comme lue
    async markAsRead(req, res) {
        try {
            const { notificationId } = req.params;

            const notification = await Notification.findByPk(notificationId);
            if (!notification) {
                return res.status(404).json({ message: 'Notification non trouvée' });
            }

            notification.isRead = true;
            await notification.save();

            return res.status(200).json(notification);
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la notification:', error);
            return res.status(500).json({ message: 'Erreur lors de la mise à jour de la notification', error });
        }
    }

    // Créer une nouvelle notification (utilisée lors de l'événement d'une action)
    async createNotification(req, res) {
        try {
            const { userId, creatorId, type, message, publicationId, commentaireId, reactionPublicationId, reactionCommentaireId } = req.body;

            const notification = await Notification.create({
                userId,
                creatorId, // Inclure creatorId lors de la création de la notification
                type,
                message,
                publicationId,
                commentaireId,
                reactionPublicationId,
                reactionCommentaireId,
            });

            return res.status(201).json(notification);
        } catch (error) {
            console.error('Erreur lors de la création de la notification:', error);
            return res.status(500).json({ message: 'Erreur lors de la création de la notification', error });
        }
    }
}

module.exports = new NotificationsController();
