const express = require('express');
const router = express.Router();
const NotificationsController = require('../controllers/notificationController');
const latestNotificationsController = require('../controllers/latestNotificationsController');
const authMiddleware = require('../middleware/authMiddleware');


// Récupérer toutes les notifications d'un utilisateur
router.get('/getNotifications', authMiddleware.authenticate, NotificationsController.getNotifications);

// Marquer une notification comme lue
router.put('/:notificationId/read', authMiddleware.authenticate, NotificationsController.markAsRead);

// Créer une nouvelle notification (à appeler lors des actions pertinentes)
router.post('/newNotifications', authMiddleware.authenticate, NotificationsController.createNotification);

// Afficher les 3 dernieres notifications
router.get('/latest-notifications', authMiddleware.authenticate, latestNotificationsController.getLatestNotifications);

module.exports = router;
