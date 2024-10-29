const express = require('express');
const router = express.Router();
const { UserPostId } = require('../controllers/UserPostId');

// Route pour obtenir les publications d'un utilisateur spécifique
router.get('/user/:userId', UserPostId);

module.exports = router;
