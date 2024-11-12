// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { updateUser } = require('../controllers/modifierUserController'); // Remplacez par le chemin de votre contrôleur
const {uploadSingle} = require('../middleware/uploads'); // Middleware pour gérer le téléchargement de fichiers

// Route pour mettre à jour un utilisateur
router.put('/:id', uploadSingle('photoProfil'), updateUser);

module.exports = router;
