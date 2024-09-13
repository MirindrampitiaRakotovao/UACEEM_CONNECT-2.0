const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Candidats = sequelize.define('Candidats', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
  });
  
  module.exports = Candidats;
  