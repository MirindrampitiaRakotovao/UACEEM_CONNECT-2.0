const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const etudiantController = require('../controllers/etudiantController');
const authenticateToken = require('../middlewares/authenticateToken');
const multer = require('../middlewares/upload')

//Route pour login
router.post('/login', etudiantController.login);

// Route pour créer un étudiant
router.post('/create', etudiantController.createEtudiant);

// Route pour consulter le profil
router.get('/me' , authenticateToken , etudiantController.getProfil);

module.exports = router;

//Route pour logout
router.post('/logout', authenticateToken, etudiantController.logout);

router.post('/photo', authenticateToken, upload.single('photo'), etudiantController.updatePhoto);


module.exports = router;
