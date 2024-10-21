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
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  publication_id: {
    type: DataTypes.INTEGER,
    allowNull: true, // Peut être NULL si c'est une réaction à un commentaire
    references: {
      model: 'publications',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  commentaire_id: {
    type: DataTypes.INTEGER,
    allowNull: true, // Peut être NULL si c'est une réaction à une publication
    references: {
      model: 'commentaires',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  isReacted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true, // Par défaut, la réaction est "true" lors de la création
  },
});

module.exports = Reactions;
