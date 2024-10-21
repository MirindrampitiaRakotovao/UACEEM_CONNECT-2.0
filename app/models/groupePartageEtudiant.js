const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const GroupePartageEtudiants = sequelize.define('groupePartageEtudiants', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  membre_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'etudiants',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  groupe_partage_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'groupePartages',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  date_adhesion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  role_membre_groupe: {
    type: DataTypes.ENUM('membre', 'admin'),
    allowNull: false,
    defaultValue: 'membre',
  }
});


module.exports = GroupePartageEtudiants;
