// routes/emploiDuTemps.js
const express = require('express');
const router = express.Router();
const emploiDuTempsController = require('../controllers/EmploiDuTempsController');

// Appliquer le middleware d'authentification à toutes les routes
router.use(emploiDuTempsController.verifyToken);

// Routes accessibles aux admins et professeurs
router.get('/list', emploiDuTempsController.lister);

// Routes réservées aux admins
router.get('/donnees-formulaire', emploiDuTempsController.checkAdmin, emploiDuTempsController.getDonneesFormulaire);
router.post('/emploi-du-temps', emploiDuTempsController.checkAdmin, emploiDuTempsController.creer);
router.put('/edit/:id', emploiDuTempsController.checkAdmin, emploiDuTempsController.modifier);
router.delete('/:id', emploiDuTempsController.checkAdmin, emploiDuTempsController.supprimer);

module.exports = router;