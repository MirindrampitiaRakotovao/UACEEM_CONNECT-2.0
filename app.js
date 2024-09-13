const express = require('express');
const sequelize = require('./config/database');

const app = express();

// Test de connexion
sequelize.authenticate()
  .then(() => {
    console.log('Connexion à la base de données réussie');
  })
  .catch(err => {
    console.error('Impossible de se connecter à la base de données:', err);
  });

  const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Le serveur tourne sur le port ${PORT}`);
});
