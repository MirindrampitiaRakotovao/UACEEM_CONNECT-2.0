'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

// Initialisation de Sequelize
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    ...config,
    logging: console.log
  });
}

// Chargement synchrone des modèles
const modelFiles = fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  });

// Chargement des modèles
for (const file of modelFiles) {
  try {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
    console.log(`Modèle chargé avec succès : ${model.name}`);
  } catch (error) {
    console.error(`Erreur lors du chargement du modèle ${file}:`, error);
  }
}

// Configuration des associations
for (const modelName of Object.keys(db)) {
  if (db[modelName].associate) {
    try {
      db[modelName].associate(db);
      console.log(`Associations configurées avec succès pour : ${modelName}`);
    } catch (error) {
      console.error(`Erreur lors de la configuration des associations pour ${modelName}:`, error);
    }
  }
}

// Export des modèles et de Sequelize
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;