const multer = require('multer');
const path = require('path');

// Configuration de multer pour enregistrer les fichiers dans le répertoire 'uploads'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Dossier où les fichiers seront stockés
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Générer un nom unique pour chaque fichier
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
