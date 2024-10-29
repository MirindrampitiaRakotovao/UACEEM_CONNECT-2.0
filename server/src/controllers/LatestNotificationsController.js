const Notification = require('../models').Notification;
const Personnel = require('../models').Personnel;
const Publication = require('../models').Publication;

class LatestNotificationsController {
    // Récupérer les trois dernières notifications, une de chaque type (réaction, commentaire, réponse)
    async getLatestNotifications(req, res) {
        try {
            const userId = req.personnel.id; // Récupérer l'ID de l'utilisateur connecté

            // Récupérer la notification la plus récente pour chaque type
            const types = ['reaction', 'commentaire', 'reponse'];
            const notificationsPromises = types.map(type =>
                Notification.findOne({
                    where: { userId, type },
                    include: [
                        {
                            model: Personnel,
                            as: 'utilisateur', // L'utilisateur qui reçoit la notification
                            attributes: ['nomUtilisateur', 'photoProfil']
                        },
                        {
                            model: Personnel,
                            as: 'creator', // L'utilisateur qui a déclenché la notification
                            attributes: ['nomUtilisateur', 'photoProfil']
                        },
                        {
                            model: Publication,
                            as: 'publication',
                            include: [
                                {
                                    model: Personnel,
                                    as: 'auteur',
                                    attributes: ['photoProfil']
                                }
                            ]
                        }
                    ],
                    order: [['createdAt', 'DESC']], // Trier pour obtenir la notification la plus récente de chaque type
                })
            );

            // Exécuter les requêtes en parallèle
            const notifications = await Promise.all(notificationsPromises);

            // Filtrer les notifications nulles et formater la réponse
            const formattedNotifications = notifications
                .filter(notification => notification) // Supprimer les valeurs nulles
                .map(notification => ({
                    id: notification.id,
                    type: notification.type,
                    message: notification.message,
                    createdAt: notification.createdAt,
                    isRead: notification.isRead,
                    profileImage: notification.publication?.auteur?.photoProfil || null,
                    utilisateurPhoto: notification.utilisateur.photoProfil,
                    creatorPhoto: notification.creator.photoProfil
                }));

            return res.status(200).json(formattedNotifications);
        } catch (error) {
            console.error('Erreur lors de la récupération des notifications:', error);
            return res.status(500).json({ message: 'Erreur lors de la récupération des notifications', error });
        }
    }
}

module.exports = new LatestNotificationsController();
