const express = require('express');
const router = express.Router();
const { getTotalUsersByDay } = require('../controllers/totalUsersController'); // Assurez-vous de l'importation correcte

// Route pour récupérer le total des utilisateurs par année
router.get('/totalUsers', getTotalUsersByDay);

module.exports = router;
