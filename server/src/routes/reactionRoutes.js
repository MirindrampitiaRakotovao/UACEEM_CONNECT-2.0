const express = require('express');
const router = express.Router();
const reactionController = require('../controllers/reactionController');

// Route pour ajouter ou retirer une réaction
router.post('/publication/:publicationId/toggle-reaction', reactionController.toggleReaction);

// Route pour obtenir le nombre de réactions d'une publication
router.get('/publication/:publicationId/reactions-count', reactionController.getReactionsCount);

// (Facultatif) Route pour obtenir toutes les réactions d'une publication (qui a réagi)
router.get('/publication/:publicationId/reactions', reactionController.getReactions);

// Route pour obtenir la réaction d'un utilisateur spécifique sur une publication
router.get('/publication/:publicationId/user-reactions', reactionController.getUserReaction);


module.exports = router;
