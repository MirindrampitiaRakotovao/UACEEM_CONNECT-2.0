const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const cookieParser = require('cookie-parser');
const sequelize = require('./config/database');
const bodyParser = require('body-parser');
const etudiantRoutes = require('./app/routes/etudiantRoutes');
const mentionRoutes = require('./app/routes/mentionRoutes');
const niveauRoutes = require('./app/routes/niveauRoutes');
const parcoursRoutes = require('./app/routes/parcoursRoutes');
const groupeRoutes = require('./app/routes/groupeRoutes');
const groupePartageRoutes = require('./app/routes/groupePartageRoutes')
const publicationsRoutes = require('./app/routes/publicationRoutes');
const reactionRoutes = require('./app/routes/reactionRoutes');
const commentaireRoutes = require('./app/routes/commentaireRoutes');
const messagePriveeRoutes = require('./app/routes/messagePriveeRoutes');

/*association*/
require('./app/models/association');

// Initialisation de l'application express
const app = express();

// Création du serveur HTTP
const server = http.createServer(app);

// Initialisation de Socket.io avec le serveur HTTP
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',  // Ton front-end
    methods: ['GET', 'POST'], // Méthodes HTTP autorisées
    credentials: true
  }
});

// Middleware pour injecter io dans les requêtes
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Configuration de cors et des middlewares
app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true 
}));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Gestion des erreurs globales
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.message);
  console.error(err.stack);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Test de connexion à la base de données et synchronisation des modèles
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Connexion à la base de données réussie');
    
    //await sequelize.sync({ alter: true }); // Synchronise les modèles avec la base de données
    console.log('Synchronisation des modèles avec la base de données réussie.');
    
    const PORT = process.env.PORT || 4000;
    server.listen(PORT, () => {
      console.log(`Le serveur tourne sur le port ${PORT}`);
    });
    
  } catch (err) {
    console.error('Erreur lors de la connexion ou de la synchronisation avec la base de données:', err);
    process.exit(1); // Arrête le processus en cas d'erreur critique
  }
}
//sequelize.sync({ force: true });


// Démarrer le serveur
startServer();

/*ROUTES*/
app.use('/etudiant' , etudiantRoutes);
app.use('/mention' , mentionRoutes);
app.use('/niveau' , niveauRoutes);
app.use('/parcours' , parcoursRoutes);
app.use('/groupe' , groupeRoutes);
app.use('/partageGroupe' , groupePartageRoutes);
app.use('/publication', publicationsRoutes);
app.use('/reaction' , reactionRoutes);
app.use('/commentaire' , commentaireRoutes);
app.use('/messagePrivee' , messagePriveeRoutes);

