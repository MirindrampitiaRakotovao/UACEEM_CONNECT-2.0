const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authenticateToken');
const groupeController = require('../controllers/groupeController');

// Route pour créer un groupe
router.post('/create', groupeController.createGroupe);

// Route pour lister les étudiants d'un groupe
router.get('/membres', authenticateToken ,groupeController.getEtudiantsByGroupe);

module.exports = router;
