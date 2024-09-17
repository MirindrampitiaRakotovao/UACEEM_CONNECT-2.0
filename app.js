const express = require('express');
const sequelize = require('./config/database');
const etudiantRoutes = require('./app/routes/etudiantRoutes');
const mentionRoutes = require('./app/routes/mentionRoutes');
const loginRoute = require('./app/routes/login');
const profilRoute = require('./app/routes/profil');

const app = express();

// Middleware pour parser les requêtes JSON
app.use(express.json());

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
    
    await sequelize.sync({ alter: true }); // Synchronise les modèles avec la base de données
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

// Démarrer le serveur
startServer();

// Route de test pour vérifier que le serveur fonctionne
app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API de réseau social étudiant');
});


// Etudiants
const Etudiants = require('./app/models/etudiants'); 



app.post('/etudiants/create', async (req, res) => {
  try {
    const etudiant = await Etudiants.create(req.body);
    res.status(201).json({ message: 'Utilisateur créé avec succès', etudiant });
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error);
    res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur', error });
  }
});


//Mentions
const Mentions = require('./app/models/mentions');


app.post('/mentions/create', async (req, res) => {
  try {
    const mention = await Mentions.create(req.body);
    res.status(201).json({ message: 'Mention créé avec succès', mention });
  } catch (error) {
    console.error('Erreur lors de la création de la mention:', error);
    res.status(500).json({ message: 'Erreur lors de la création de la mention', error });
  }
});



app.use('/api', loginRoute);
app.use('/api', profilRoute);
