const express = require('express');
const router = express.Router();
const multer = require('multer');
const importController = require('../controllers/importController');
const authMiddleware = require('../middleware/authMiddleware');
// Configuration de Multer
const upload = multer({ 
  dest: 'uploads/',
  limits: { fileSize: 50 * 1024 * 1024 } // 50 Mo
});
// Route d'importation
router.post(
  '/import', 
  upload.single('fichier'),
  importController.importCSV
);
module.exports = router;