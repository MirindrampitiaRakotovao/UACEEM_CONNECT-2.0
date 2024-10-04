const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Reactions = sequelize.define('reactions', {
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
      model: 'etudiants', // Fait référence au modèle d'étudiant
      key: 'id',
    },
  },
  publication_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'publications', // Fait référence à ta table publication
      key: 'id',
    },
  },
  isReacted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true, // Par défaut, la réaction est "true" lors de la création
  },
});

module.exports = Reactions;
