const { DataTypes } = require('sequelize');

const sequelize = require('../../config/database');

const Publications = sequelize.define('publications', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  etudiant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'etudiants',
      key: 'id',
    },
  },
  visibilite: {
    type: DataTypes.ENUM('Public', 'Groupe'),
    allowNull: false,
  },
  nombre_reaction: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  date_publication: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  legende: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  contenu: {
    type: DataTypes.STRING, 
    allowNull: true,
  },
  groupe_partage_id: {
    type: DataTypes.INTEGER,
    allowNull: true, 
    references: {
      model: 'groupePartages',
      key: 'id'
    }
  }
});

module.exports = Publications;
