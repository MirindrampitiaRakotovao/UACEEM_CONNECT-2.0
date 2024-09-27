const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const PartageGroupeEtudiants = sequelize.define('partage_groupe_etudiants', {
  membre_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'etudiants',
      key: 'id',
    },
    allowNull: false,
  },
  groupe_partage_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'partageGroupes',
      key: 'id',
    },
    allowNull: false,
  },
  date_adhesion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  role_membre_groupe: {
    type: DataTypes.ENUM('membre', 'admin'),
    allowNull: false,
    defaultValue: 'membre',
  },
  publication_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'publications',
      key: 'id',
    },
  },
});

module.exports = PartageGroupeEtudiants;
