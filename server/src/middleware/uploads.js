const multer = require('multer');
const path = require('path');
const fs = require('fs');
// Configuration du stockage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads/';
        // Créer le dossier s'il n'existe pas
        fs.mkdirSync(uploadDir, { recursive: true });
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
// Configuration des types de fichiers autorisés
const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'audio/mpeg',
        'audio/wav',
        'audio/webm',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    ];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Type de fichier non supporté'), false);
    }
};
// Configuration de Multer
const createMulterMiddleware = (options = {}) => {
    const config = {
        storage: storage,
        fileFilter: fileFilter,
        limits: {
            fileSize: 10 * 1024 * 1024, // 10 Mo
            ...options.limits
        }
    };
    return multer(config);
};
// Middleware de gestion des erreurs
const handleUploadError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        switch (err.code) {
            case 'LIMIT_FILE_SIZE':
                return res.status(400).json({
                    success: false,
                    message: 'Le fichier est trop volumineux. Taille maximum: 10 Mo'
                });
            case 'LIMIT_UNEXPECTED_FILE':
                return res.status(400).json({
                    success: false,
                    message: 'Nombre de fichiers incorrect'
                });
            default:
                return res.status(400).json({
                    success: false,
                    message: 'Erreur lors du téléchargement du fichier',
                    error: err.message
                });
        }
    } else if (err) {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
    next();
};
// Exportation des méthodes d'upload
module.exports = {
    createMulterMiddleware,
    // Upload d'un seul fichier
    uploadSingle: (fieldName) => {
        const upload = createMulterMiddleware();
        return [
            upload.single(fieldName),
            handleUploadError
        ];
    },
    // Upload de plusieurs fichiers
    uploadMultiple: (fieldName, maxCount = 5) => {
        const upload = createMulterMiddleware();
        return [
            upload.array(fieldName, maxCount),
            handleUploadError
        ];
    },
    // Upload de fichiers par champs
    uploadFields: (fields) => {
        const upload = createMulterMiddleware();
        return [
            upload.fields(fields),
            handleUploadError
        ];
    },
    // Middleware de gestion des erreurs
    handleUploadError
};