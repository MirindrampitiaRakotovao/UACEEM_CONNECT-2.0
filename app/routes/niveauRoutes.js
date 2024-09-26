const express = require('express');
const router = express.Router();
const niveauController = require('../controllers/niveauController');

// Route pour créer un niveau
router.post('/create', niveauController.createNiveau);

module.exports = router;
