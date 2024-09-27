const express = require('express');
const router = express.Router();
const partageGroupeController = require('../controllers/groupePartageController');

// Routes pour la gestion des groupes de partage
router.post('/create', partageGroupeController.createGroupeEtudiant);
router.post('/addMember', partageGroupeController.addMember);
router.post('/removeMember', partageGroupeController.removeMember);
router.get('/membres/:groupe_nom', partageGroupeController.listMembers);

module.exports = router;
