const express = require('express');
const router = express.Router();
const { addPublication } = require('../controllers/publicationController');
const upload = require('../middleware/multer'); // Importer votre middleware multer

// Route pour ajouter une publication
router.post('/addPublication', upload.array('image', 10), addPublication); // 10 est le nombre maximum de fichiers

module.exports = router;
