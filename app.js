const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const sequelize = require('./config/database');
const etudiantRoutes = require('./app/routes/etudiantRoutes');
const mentionRoutes = require('./app/routes/mentionRoutes');
const niveauRoutes = require('./app/routes/niveauRoutes');
const parcoursRoutes = require('./app/routes/parcoursRoutes');
const groupeRoutes = require('./app/routes/groupeRoutes');
const groupePartageRoutes = require('./app/routes/groupePartageRoutes')
const publicationsRoutes = require('./app/routes/publicationRoutes');

const authenticateToken = require('./app/middlewares/authenticateToken')

/*association*/
require('./app/models/association');

const app = express();

app.use(cors());

app.use(cookieParser());

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