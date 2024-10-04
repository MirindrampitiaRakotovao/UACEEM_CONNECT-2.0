const express = require('express');
const router = express.Router();
const reactionController = require('../controllers/reactionController');
const authenticateToken = require('../middlewares/authenticateToken');

// Route pour ajouter ou retirer une réaction
router.post('/:publicationId', authenticateToken,reactionController.addOrRemoveReaction);

module.exports = router;
