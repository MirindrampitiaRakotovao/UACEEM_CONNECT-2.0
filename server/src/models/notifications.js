'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    static associate(models) {
      // Association avec l'utilisateur qui reçoit la notification
      this.belongsTo(models.Personnel, { foreignKey: 'userId', as: 'utilisateur' });

      // Association avec l'utilisateur qui déclenche la notification
      this.belongsTo(models.Personnel, { foreignKey: 'creatorId', as: 'creator' });

      // Autres associations
      this.belongsTo(models.Publication, { foreignKey: 'publicationId', as: 'publication', allowNull: true });
      this.belongsTo(models.Commentaire, { foreignKey: 'commentaireId', as: 'commentaire', allowNull: true });
      this.belongsTo(models.ReactionPublication, { foreignKey: 'reactionPublicationId', as: 'reactionPublication', allowNull: true });
      this.belongsTo(models.ReactionCommentaire, { foreignKey: 'reactionCommentaireId', as: 'reactionCommentaire', allowNull: true });
    }
  }

  Notification.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'personnel',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    creatorId: {  // Nouvelle colonne pour l'utilisateur qui a déclenché la notification
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'personnel',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    publicationId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'publications',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    commentaireId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'commentaires',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    reactionPublicationId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Reactions_Publication',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    reactionCommentaireId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Reactions_Commentaires',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  }, {
    sequelize,
    modelName: 'Notification',
    tableName: 'notifications',
    timestamps: true,
  });

  return Notification;
};
