const express = require('express');
const router = express.Router();
const { getPersonnelById } = require('../controllers/getPersonnelController'); // Importation de la fonction

// Route pour récupérer un utilisateur par ID
router.get('/:id', getPersonnelById); // Utilisation de la fonction de contrôleur

module.exports = router;
