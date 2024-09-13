const { Sequelize } = require('sequelize');
const config = require('./config.json');

// Determine the environment (development, production, test)
const env = process.env.NODE_ENV || 'development';

// Get the configuration for the current environment
const dbConfig = config[env];

// Create the Sequelize instance using the configuration
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
});

module.exports = sequelize;
