const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Fichiers = sequelize.define('fichiers', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  nom_fichier: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type_fichier: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_publication: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'publications',
      key: 'id',
    },
  }
});

module.exports = Fichiers;
