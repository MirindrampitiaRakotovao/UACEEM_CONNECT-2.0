const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Utilisateurs = sequelize.define('Utilisateurs', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  etudiant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Etudiants',
      key: 'id',
    },
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Utilisateurs;
