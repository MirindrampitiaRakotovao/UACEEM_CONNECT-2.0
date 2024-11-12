// middlewares/upload.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configuration du stockage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads/';
        // Créer le dossier s'il n'existe pas
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Configuration de base de Multer
const multerConfig = {
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // Limite de 10 Mo par fichier
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = [
            'image/jpeg',
            'image/png',
            'image/gif',
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'audio/mpeg',
            'audio/wav',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-powerpoint',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation'
        ];

        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Type de fichier non supporté.'), false);
        }
    }
};

// Créer l'instance multer
const uploadInstance = multer(multerConfig);

// Middleware de gestion des erreurs
const handleUploadError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                message: 'Le fichier est trop volumineux. Taille maximum: 10 Mo'
            });
        }
        return res.status(400).json({
            success: false,
            message: 'Erreur lors du téléchargement du fichier',
            error: err.message
        });
    } else if (err) {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
    next();
};

// Exportation des différentes configurations d'upload
module.exports = {
    // Pour un seul fichier
    uploadSingle: (fieldName) => uploadInstance.single(fieldName),

    // Pour plusieurs fichiers
    uploadMultiple: (fieldName, maxCount = 5) => uploadInstance.array(fieldName, maxCount),

    // Pour différents champs de fichiers
    uploadFields: (fields) => uploadInstance.fields(fields),

    // Upload de base
    upload: uploadInstance,

    // Gestionnaire d'erreurs
    handleUploadError
};