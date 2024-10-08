const express = require('express');
const router = express.Router();
const reactionController = require('../controllers/reactionController');
const authenticateToken = require('../middlewares/authenticateToken');

// Route pour ajouter ou retirer une réaction (sur publication ou commentaire)
router.post('/', authenticateToken, reactionController.addOrRemoveReaction);

module.exports = router;
