const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Commentaire = sequelize.define('commentaire', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  contenu: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  etudiant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'etudiants',
      key: 'id',
    },
  },
  publication_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'publications',
      key: 'id',
    },
  },
  parent_id: {
    type: DataTypes.INTEGER,
    allowNull: true, // Peut être NULL si c'est un commentaire principal
    references: {
      model: 'commentaires', // Référence à ce même modèle pour les réponses
      key: 'id',
    },
  },
  date_commentaire: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  nombre_reaction_commentaire: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

module.exports = Commentaire;
