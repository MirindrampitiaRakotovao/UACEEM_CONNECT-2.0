const express = require('express');
const router = express.Router();
const groupeController = require('../controllers/groupeController');

// Route pour créer un groupe
router.post('/create', groupeController.createGroupe);

module.exports = router;
