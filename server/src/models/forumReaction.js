// models/forumReaction.js
'use strict';
const { Model } = require('sequelize'); // Ajoutez cette ligne

module.exports = (sequelize, DataTypes) => {
  class ForumReaction extends Model {
    static associate(models) {
      this.belongsTo(models.Forum, {
        foreignKey: 'forumId',
        as: 'forum'
      });
      this.belongsTo(models.ForumReponse, {
        foreignKey: 'reponseId',
        as: 'reponse'
      });
      this.belongsTo(models.Personnel, {
        foreignKey: 'utilisateurId',
        as: 'utilisateur'
      });
    }
  }

  ForumReaction.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    utilisateurId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'personnel',
        key: 'id'
      }
    },
    forumId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'forums',
        key: 'id'
      }
    },
    reponseId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'forum_reponses',
        key: 'id'
      }
    },
    type: {
      type: DataTypes.ENUM('reaction', 'partage'),
      allowNull: false,
      defaultValue: 'reaction'
    }
  }, {
    sequelize,
    modelName: 'ForumReaction',
    tableName: 'forum_reactions',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['utilisateurId', 'forumId', 'reponseId', 'type']
      }
    ]
  });

  return ForumReaction;
};