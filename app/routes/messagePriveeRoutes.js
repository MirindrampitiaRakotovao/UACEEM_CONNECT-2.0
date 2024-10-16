const express = require('express');
const router = express.Router();
const messagePriveeController = require('../controllers/messagePriveeController');
const authenticateToken = require('../middlewares/authenticateToken'); // Middleware pour vérifier le JWT

// Route pour envoyer un message privé
router.post('/',authenticateToken, messagePriveeController.sendMessage);

// Route pour récupérer les messages entre deux utilisateurs
router.get('/me/:destinataire_id', authenticateToken ,messagePriveeController.getMessagesBetween);

// Récupérer tous les messages pour un utilisateur
router.get('/', authenticateToken ,messagePriveeController.getMessagesForUser);

// Route pour obtenir les discussions récentes et les autres utilisateurs
router.get('/discussions', authenticateToken, messagePriveeController.getUsersWithDiscussions);

module.exports = router;
