const express = require('express');
const router = express.Router();
const groupeController = require('../controllers/partageGroupeController');

// Routes pour la gestion des groupes de partage
router.post('/create', groupeController.createGroupe);
router.post('/addMember', groupeController.addMember);
router.post('/removeMember', groupeController.removeMember);
router.get('/:groupeId/members', groupeController.listMembers);
router.post('/:groupeId/publish', groupeController.createPostInGroup);

module.exports = router;
