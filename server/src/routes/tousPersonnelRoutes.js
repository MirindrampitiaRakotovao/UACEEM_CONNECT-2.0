const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../controllers/tousPersonnelController');

// Route pour récupérer les utilisateurs
router.get('/users', getAllUsers);

module.exports = router;
