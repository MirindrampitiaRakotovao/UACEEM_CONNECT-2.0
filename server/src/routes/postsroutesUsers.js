// routes/postRoutes.js
const express = require('express');
const { getUserPosts } = require('../controllers/getPostUser');
const authMiddleware = require('../middleware/authMiddleware'); // Chemin vers votre middleware

const router = express.Router();

// Route pour récupérer les posts de l'utilisateur connecté
router.get('/userPosts', authMiddleware.authenticate, getUserPosts); // Modifiez ici pour utiliser la bonne route

module.exports = router;
