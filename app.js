const express = require('express');
const sequelize = require('./config/database');
const etudiantRoutes = require('./app/routes/etudiantRoutes');

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
    
    await sequelize.sync(); // Synchronise les modèles avec la base de données
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

// Exemple de route pour créer un étudiant (à tester avec Postman)
const Etudiants = require('./models/etudiants'); // Assure-toi d'importer ton modèle

app.post('/etudiants/create', async (req, res) => {
  try {
    const etudiant = await Etudiants.create(req.body);
    res.status(201).json({ message: 'Utilisateur créé avec succès', etudiant });
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error);
    res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur', error });
  }
});
