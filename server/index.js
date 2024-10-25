const express = require('express');
const http = require('http'); // Importer le module http
const cors = require('cors');
const path = require('path');
const { initSocket } = require('./socket'); // Importer initSocket

const app = express();

// Middleware CORS
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware pour parser le JSON du corps des requêtes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connexion à la base de données
require('./connectDB');

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
const tousPersonnelRoutes = require('./src/routes/tousPersonnelRoutes');
const reactionRoutes = require('./src/routes/reactionRoutes');
const commentairesRoutes = require('./src/routes/commentairesRoutes');
const notificationsRoutes = require('./src/routes/notificationRoutes');

// Servir le répertoire 'uploads' comme fichiers statiques
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
app.use('/api', tousPersonnelRoutes);
app.use('/api/reactions', reactionRoutes);
app.use('/api/commentaires', commentairesRoutes);
app.use('/api/notif', notificationsRoutes);

// Créer le serveur HTTP et initialiser Socket.IO
const server = http.createServer(app);
initSocket(server);

// Lancer le serveur
server.listen(5000, () => {
  console.log('Serveur en marche sur le port 5000');
  console.log('Socket.IO fonctionne correctement.'); // Log pour confirmer le bon fonctionnement de Socket.IO
});
