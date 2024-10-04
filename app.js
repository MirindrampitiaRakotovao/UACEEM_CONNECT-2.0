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

/*const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('Un utilisateur est connecté');

  socket.on('disconnect', () => {
    console.log('Utilisateur déconnecté');
  });

  socket.on('message', (data) => {
    console.log('Message reçu:', data);
    // Envoyer le message à tous les clients
    io.emit('message', data);
  });
});*/

/*association*/
require('./app/models/association');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',  // Specify the frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
  credentials: true // Enable credentials (cookies, etc.)
}));
app.use(cookieParser());

// Pour les données encodées dans l'URL (formulaires)
app.use(express.urlencoded({ extended: true }));

// Si tu utilises body-parser (optionnel)
app.use(bodyParser.json());

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Middleware pour servir les fichiers statiques (photos de profil, etc.)
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
    app.listen(PORT, () => {
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