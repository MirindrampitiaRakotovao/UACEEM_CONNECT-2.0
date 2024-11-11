'use strict';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database, 
    config.username, 
    config.password, 
    {
      ...config,
      logging: console.log // Activer les logs SQL pour le débogage
    }
  );
}
// Fonction de chargement des modèles avec gestion des erreurs
function loadModels() {
  fs.readdirSync(__dirname)
    .filter(file => {
      return (
        file.indexOf('.') !== 0 &&
        file !== basename &&
        file.slice(-3) === '.js' &&
        file.indexOf('.test.js') === -1
      );
    })
    .forEach(file => {
      try {
        const modelPath = path.join(__dirname, file);
        const modelModule = require(modelPath);
        
        // Vérifier si c'est une fonction ou un objet
        const model = typeof modelModule === 'function' 
          ? modelModule(sequelize, Sequelize.DataTypes) 
          : modelModule;
        // Enregistrer le modèle
        if (model.name) {
          db[model.name] = model;
          console.log(`Modèle chargé : ${model.name}`);
        }
      } catch (error) {
        console.error(`Erreur lors du chargement du modèle ${file}:`, error);
      }
    });
}
// Charger les modèles
loadModels();
// Établissement des associations
function setupAssociations() {
  try {
    Object.keys(db).forEach(modelName => {
      if (db[modelName].associate) {
        console.log(`Configuration des associations pour : ${modelName}`);
        db[modelName].associate(db);
      }
    });
  } catch (error) {
    console.error('Erreur lors de la configuration des associations :', error);
  }
}
// Configurer les associations
setupAssociations();
// Ajouter sequelize et Sequelize à db
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;