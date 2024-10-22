const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authenticateToken');
const groupePartageController = require('../controllers/groupePartageController');
const upload = require('../middlewares/multerpdp');

// Routes pour la gestion des groupes de partage
router.post('/create', authenticateToken ,groupePartageController.createGroupeEtudiant);
router.post('/addMember', authenticateToken ,groupePartageController.addMember);
router.post('/removeMember', authenticateToken ,groupePartageController.removeMember);
router.get('/membres/:groupe_nom', authenticateToken ,groupePartageController.listMembers);

router.get('/admin/me', authenticateToken ,groupePartageController.getGroupesAdministres);

router.post('/couverture', authenticateToken,upload.single('couverture'), groupePartageController.changeCouverture);
router.get('/couverture/:id', authenticateToken, groupePartageController.getGroupeByIdWithCouverture);

module.exports = router;
