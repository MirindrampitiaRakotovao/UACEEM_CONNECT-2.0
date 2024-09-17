const express = require('express');
const router = express.Router();
const etudiantController = require('../controllers/etudiantController');

// Route pour créer un étudiant
router.post('/create', etudiantController.createEtudiant);

module.exports = router;
