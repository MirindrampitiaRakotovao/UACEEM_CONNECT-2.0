const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploads'); // Importer multer pour l'upload de fichiers
const personnelController = require('../controllers/personnelController'); // Importer le contrôleur correctement
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');



// Route POST pour créer un personnel avec photo de profil
router.post('/', upload.single('photoProfil'), personnelController.createPersonnel);

module.exports = router;
