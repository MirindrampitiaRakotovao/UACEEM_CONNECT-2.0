const express = require('express');
const { getAllUsers } = require('../controllers/showUserController'); // Importation du nouveau contrôleur

const router = express.Router();

// Route pour récupérer tous les utilisateurs
router.get('/showusers', getAllUsers);

module.exports = router;
