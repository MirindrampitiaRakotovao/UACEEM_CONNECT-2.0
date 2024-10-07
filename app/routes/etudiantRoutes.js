const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multerpdp');
const etudiantController = require('../controllers/etudiantController');
const authenticateToken = require('../middlewares/authenticateToken');

//Route pour login
router.post('/login', etudiantController.login);

// Route pour créer un étudiant
router.post('/create', etudiantController.createEtudiant);

// Route pour consulter le profil
router.get('/me' , authenticateToken , etudiantController.getProfil);

// Route pour voir photo de profil
router.get('/photo', authenticateToken, etudiantController.photoDeProfil);


//Route pour logout
router.post('/logout', authenticateToken, etudiantController.logout);

//Route pour editer profil
router.post('/photo', authenticateToken, upload.single('photo'), etudiantController.updatePhoto);

//Route pour obtenir tout les utilisateurs
router.get('/contact', authenticateToken , etudiantController.getAllUsers);

//Route pour modifier le bio
router.put('/modifierBio', authenticateToken, etudiantController.updateBio);

//Route pour afficher le bio
router.get('/afficherBio', authenticateToken, etudiantController.getBio);

//afficher tout les photo de profil des etudiants
router.get('/toutPhotodeProfil' , etudiantController.getAllUsersWithPhotos);



module.exports = router;
    