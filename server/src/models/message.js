'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      // Association avec le modèle Personnel (Expéditeur)
      this.belongsTo(models.Personnel, { 
        foreignKey: 'expediteurId', 
        as: 'expediteur' 
      });
      // Association avec le modèle Personnel (Destinataire)
      this.belongsTo(models.Personnel, { 
        foreignKey: 'destinataireId', 
        as: 'destinataire' 
      });
    }
  }
  Message.init({
    // Identifiant UUID
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    // Type de message
    type: {
      type: DataTypes.ENUM(
        'texte', 
        'image', 
        'document', 
        'vocal', 
        'multimedia'
      ),
      allowNull: false,
      validate: {
        notNull: { msg: 'Le type de message est obligatoire' },
        isIn: {
          args: [['texte', 'image', 'document', 'vocal', 'multimedia']],
          msg: 'Type de message invalide'
        }
      }
    },
    // Contenu textuel du message
    contenu: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    // Fichiers multimédias
    fichiers: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
      validate: {
        isValidFichiers(value) {
          if (value && !Array.isArray(value)) {
            throw new Error('Les fichiers doivent être un tableau');
          }
        }
      }
    },
    // Métadonnées des fichiers
    metadonneesFichiers: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: {},
      validate: {
        isObject(value) {
          if (value && typeof value !== 'object') {
            throw new Error('Les métadonnées doivent être un objet');
          }
        }
      }
    },
    // Statut du message
    statut: {
      type: DataTypes.ENUM(
        'envoye', 
        'lu', 
        'livre', 
        'supprime'
      ),
      defaultValue: 'envoye',
      validate: {
        isIn: {
          args: [['envoye', 'lu', 'livre', 'supprime']],
          msg: 'Statut de message invalide'
        }
      }
    },
    // Informations de localisation (optionnel)
    localisation: {
      type: DataTypes.JSON,
      allowNull: true
    },
    // Horodatage de lecture
    dateEnvoi: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    // Horodatage de lecture
    dateLecture: {
      type: DataTypes.DATE,
      allowNull: true
    },
    // Expéditeur ID
    expediteurId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Personnel',
        key: 'id'
      }
    },
    // Destinataire ID
    destinataireId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Personnel',
        key: 'id'
      }
    },
    // Indicateur de message important/urgent
    estUrgent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Message',
    tableName: 'messages',
    timestamps: true,
    paranoid: true // Permet la suppression logique
  });
  return Message;
};