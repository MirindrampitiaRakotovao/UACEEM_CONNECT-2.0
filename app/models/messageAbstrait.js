const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const MessageAbstrait = sequelize.define('messageAbstraits', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
  contenuType: {
    type: DataTypes.ENUM('texte', 'image', 'fichier', 'audio', 'video'),
    allowNull: false
  },
  texte: {
    type: DataTypes.STRING(255),
    allowNull: true,
    trim: true
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true // URL ou chemin d'accès au fichier image
  },
  fichier: {
    type: DataTypes.STRING,
    allowNull: true // URL ou chemin d'accès au fichier
  },
  audio: {
    type: DataTypes.STRING,
    allowNull: true // URL ou chemin d'accès au fichier audio
  },
  video: {
    type: DataTypes.STRING,
    allowNull: true // URL ou chemin d'accès au fichier vidéo
  },
  dateEnvoi: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  reponseAId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'messageAbstraits',
      key: 'id'
    }
  }
});

module.exports = MessageAbstrait;
