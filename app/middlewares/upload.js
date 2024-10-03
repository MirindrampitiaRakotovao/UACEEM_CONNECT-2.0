const multer = require('multer');
const path = require('path');

// Définir le stockage pour les fichiers
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/photos'); // Dossier où enregistrer les fichiers
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Filtrage des fichiers par type
const fileFilter = (req, file, cb) => {
  // Types de fichiers acceptés pour 'photo'
  const allowedImageTypes = /jpeg|jpg|png/;
  const allowedFileTypes = /jpeg|jpg|png|pdf|doc|docx|xls|xlsx|ppt|pptx/;

  if (file.fieldname === 'photo') {
    const isImage = allowedImageTypes.test(file.mimetype) && allowedImageTypes.test(path.extname(file.originalname).toLowerCase());
    if (isImage) {
      return cb(null, true);
    }
    return cb(new Error('Seuls les fichiers images (jpeg, jpg, png) sont acceptés pour le champ photo.'));
  }

  if (file.fieldname === 'fichiers') {
    const isAllowed = allowedFileTypes.test(file.mimetype) && allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    if (isAllowed) {
      return cb(null, true);
    }
    return cb(new Error('Seuls les fichiers images (jpeg, jpg, png) et documents (pdf, doc, xls, ppt) sont acceptés.'));
  }

  cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE'));
};

// Initialiser multer avec la configuration pour plusieurs champs
const upload = multer({
  storage: storage,
  limits: { fileSize: 200 * 1024 * 1024 }, // Limite à 200MB
  fileFilter: fileFilter
}).fields([
  { name: 'photo', maxCount: 1 },      // Accepter un seul fichier pour le champ 'photo'
  { name: 'fichiers', maxCount: 10 }   // Accepter jusqu'à 10 fichiers pour le champ 'fichiers'
]);

module.exports = upload;
