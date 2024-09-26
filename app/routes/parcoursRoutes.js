const express = require('express');
const router = express.Router();
const parcoursController = require('../controllers/parcoursController');

// Route pour créer un parcours
router.post('/create', parcoursController.createParcours);

module.exports = router;
