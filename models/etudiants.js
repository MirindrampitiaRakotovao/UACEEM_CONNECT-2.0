const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Etudiants = sequelize.define('Etudiants', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    mention_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Mentions',
          key: 'id',
        },
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    matricule: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    sexe: {
      type: DataTypes.ENUM('M', 'F'),
      allowNull: true,
    },
    date_nais: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    lieu_nais: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    situation_matri: {
      type: DataTypes.ENUM('Célibataire', 'Marié(e)', 'Autre'),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });
  
  module.exports = Etudiants;
  