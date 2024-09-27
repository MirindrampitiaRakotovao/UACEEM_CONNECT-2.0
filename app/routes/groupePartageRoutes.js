const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authenticateToken');
const groupePartageController = require('../controllers/groupePartageController');

// Routes pour la gestion des groupes de partage
router.post('/create', authenticateToken ,groupePartageController.createGroupeEtudiant);
router.post('/addMember', authenticateToken ,groupePartageController.addMember);
router.post('/removeMember', authenticateToken ,groupePartageController.removeMember);
router.get('/membres/:groupe_nom', authenticateToken ,groupePartageController.listMembers);

module.exports = router;
