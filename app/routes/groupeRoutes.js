const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authenticateToken');
const hasRole = require('../middlewares/hasRole')
const groupeController = require('../controllers/groupeController');
const upload = require('../middlewares/multerpdp');

// Route pour créer un groupe
router.post('/create', groupeController.createGroupe);

// Route pour lister les étudiants d'un groupe
router.get('/membres', authenticateToken ,groupeController.getEtudiantsByGroupe);

// Route pour mettre à jour la couverture d'un groupe
router.put('/:id/couverture' , authenticateToken, hasRole , upload.single('couverture'), groupeController.updatecouverture);



module.exports = router;
