const express = require('express');
const publicationController = require('../controllers/publicationController');
const upload = require('../middlewares/upload');  // Middleware d'upload
const authenticateToken = require('../middlewares/authenticateToken');  // Middleware d'authentification

const router = express.Router();

// Ajoute un middleware de débogage avant Multer pour afficher les informations de la requête
router.post('/create', authenticateToken, (req, res, next) => {
  console.log('Corps de la requête:', req.body);
  console.log('Fichiers reçus:', req.files);
  next();  // Passe à l'étape suivante (upload)
}, upload, publicationController.createPublication);

router.get('/liste/public', authenticateToken ,publicationController.getPublicPublications);

module.exports = router;

