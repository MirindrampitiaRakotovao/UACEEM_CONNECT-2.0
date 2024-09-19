const express = require('express');
const router = express.Router();
const etudiantController = require('../controllers/etudiantController');
const authenticateToken = require('../middlewares/authenticateToken');

//Route pour login
router.post('/login', etudiantController.login);

// Route pour créer un étudiant
router.post('/create', etudiantController.createEtudiant);

// Route pour consulter le profil
router.get('/me' , authenticateToken , etudiantController.getProfil);

module.exports = router;
