const multer = require('multer');
const path = require('path');

// Définir le stockage pour les fichiers
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Dossier où enregistrer les fichiers
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Filtrage des fichiers par type (exemple: uniquement images)
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|pdf|doc|docx|xls|xlsx|ppt|pptx/;
  const mimeType = allowedFileTypes.test(file.mimetype);
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());

  if (mimeType && extname) {
    return cb(null, true);
  }
  cb(new Error('Seuls les fichiers images (jpeg, jpg, png) et documents (pdf, doc, xls, ppt) sont acceptés.'));
};

// Initialiser multer avec les configurations
const upload = multer({
  storage: storage,
  limits: { fileSize: 200 * 1024 * 1024 }, // Limite à 200MB
  fileFilter: fileFilter
});

module.exports = upload;
