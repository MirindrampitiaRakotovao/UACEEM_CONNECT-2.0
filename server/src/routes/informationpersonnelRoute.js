// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getUserProfile } = require('../controllers/informationPersonnelController');

// Protéger la route avec le middleware d'authentification
router.get('/profile', authMiddleware.authenticate, getUserProfile);

module.exports = router;
