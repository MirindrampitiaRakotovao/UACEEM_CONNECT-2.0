// routes/userRoutes.js
const express = require('express');
const { deleteUser } = require('../controllers/deleteUserController'); // Importez la fonction deleteUser du contrôleur

const router = express.Router();

// Route pour supprimer un utilisateur par ID
router.delete('/:id', deleteUser);

module.exports = router;
