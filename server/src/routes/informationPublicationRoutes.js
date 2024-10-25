// src/routes/informationPublicationRoutes.js
const express = require('express');
const { getPublications } = require('../controllers/informationsPublicationController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

// Route pour récupérer les publications
router.get('/getpublication', authenticate, getPublications);

module.exports = router;
