const { Sequelize, Op } = require('sequelize');
const express = require('express');
const http = require('http');
const cors = require('cors');
const path = require('path');
const { initSocket } = require('./socket');
const multer = require('multer');

const app = express();

// Configuration CORS améliorée
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Augmenter les limites pour les fichiers
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ 
  extended: true,
  limit: '50mb'
}));

// Connexion à la base de données
require('./connectDB');

// Configuration de multer pour la gestion des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// Configuration du middleware multer
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB max
  }
});

// Servir les fichiers statiques
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Importer les routes
const personnelRouter = require('./src/routes/personnel');
const authRoutes = require('./src/routes/authRoutes');
const informationPersonnelRoutes = require('./src/routes/informationpersonnelRoute');
const showUsers = require('./src/routes/showUsersRoutes');
const totalUsers = require('./src/routes/totalUserRoutes');
const deleteUser = require('./src/routes/deleteUserRoute');
const getUser = require('./src/routes/getPersonnelRoute');
const updateUser = require('./src/routes/modifierUserRoute');
const publicationRoutes = require('./src/routes/publicationRoutes');
const postRoutes = require('./src/routes/postsroutesUsers');
const countPostRoutes = require('./src/routes/countPublicationRoute');
const informationPublicationRoutes = require('./src/routes/informationPublicationRoutes');
const UserPostId = require('./src/routes/UserPostId');
const tousPersonnelRoutes = require('./src/routes/tousPersonnelRoutes');
const reactionRoutes = require('./src/routes/reactionRoutes');
const commentairesRoutes = require('./src/routes/commentairesRoutes');
const notificationsRoutes = require('./src/routes/notificationRoutes');
const messageRoutes = require('./src/routes/messageRoutes');
const forumRoutes = require('./src/routes/forumRoutes');
const importRoute = require('./src/routes/importRoute');
const coursRoute = require('./src/routes/coursRoutes');
const feedbackRoute = require('./src/routes/feedbackRoutes');
const EdtRoute = require('./src/routes/emploiDuTempsRoutes');

// Définir les routes
app.use('/api/personnel', personnelRouter);
app.use('/api/auth', authRoutes);
app.use('/api', informationPersonnelRoutes);
app.use('/api', showUsers);
app.use('/api', totalUsers);
app.use('/api/personnel', deleteUser);
app.use('/api/getUser', getUser);
app.use('/api/updateUser', updateUser);
app.use('/api', publicationRoutes);
app.use('/api', postRoutes);
app.use('/api', countPostRoutes);
app.use('/api', informationPublicationRoutes);
app.use('/api', UserPostId);
app.use('/api', tousPersonnelRoutes);
app.use('/api/reactions', reactionRoutes);
app.use('/api/commentaires', commentairesRoutes);
app.use('/api/notif', notificationsRoutes);
app.use('/api', forumRoutes);
app.use('/api', importRoute);
app.use('/api', coursRoute);
app.use('/api', feedbackRoute);
app.use('/api', EdtRoute);

// Créer le serveur HTTP
const server = http.createServer(app);

// Initialiser Socket.IO
const io = initSocket(server);

// Configuration des routes de messages avec Socket.IO
app.use('/api', messageRoutes(io));

// Gestion globale des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      message: "Erreur lors du téléchargement du fichier",
      error: err.message
    });
  }
  res.status(500).json({
    message: 'Une erreur est survenue',
    error: err.message
  });
});

// Créer le dossier uploads s'il n'existe pas
const fs = require('fs');
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Lancer le serveur
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Serveur en marche sur le port ${PORT}`);
  console.log('Socket.IO et gestion des fichiers configurés correctement.');
});

// Gestion propre de l'arrêt du serveur
process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Serveur arrêté proprement');
    process.exit(0);
  });
});