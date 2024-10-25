const multer = require('multer');
const path = require('path');

// Configurer le stockage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Dossier où les fichiers seront stockés
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nom unique pour chaque fichier
  }
});

// Créer l'instance de multer
const upload = multer({ storage: storage });

// Exporter le middleware upload pour l'utiliser dans les routes
module.exports = upload;
