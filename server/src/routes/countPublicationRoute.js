const express = require('express');
const router = express.Router();
const { countUserPublications } = require('../controllers/publicationCountController');
const authenticateToken = require('../middleware/authMiddleware'); // Middleware pour vérifier le token JWT

// Route pour compter les publications de l'utilisateur connecté
router.get('/count', authenticateToken.authenticate, countUserPublications);

module.exports = router;
