const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messagePriveeController');
const authenticateToken = require('../middlewares/authenticateToken'); // Middleware pour vérifier le JWT

// Route pour envoyer un message privé
router.post('/', authenticateToken, messageController.envoyerMessage);

// Route pour récupérer les messages entre deux utilisateurs
router.get('/:destinataire_id', authenticateToken, messageController.getMessages);

// Route pour marquer un message comme lu
router.put('/:id/lu', authenticateToken, messageController.marquerCommeLu);

module.exports = router;
