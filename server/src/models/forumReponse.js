// models/forumReponse.js
'use strict';
const { Model } = require('sequelize'); // Ajoutez cette ligne

module.exports = (sequelize, DataTypes) => {
  class ForumReponse extends Model {
    static associate(models) {
      this.belongsTo(models.Forum, {
        foreignKey: 'forumId',
        as: 'forum'
      });
      this.belongsTo(models.Personnel, {
        foreignKey: 'auteurId',
        as: 'auteur'
      });
      this.hasMany(models.ForumReaction, {
        foreignKey: 'reponseId',
        as: 'reactions'
      });
    }
  }

  ForumReponse.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    forumId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'forums',
        key: 'id'
      }
    },
    auteurId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'personnel',
        key: 'id'
      }
    },
    contenu: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    nombreReactions: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'ForumReponse',
    tableName: 'forum_reponses',
    timestamps: true
  });

  return ForumReponse;
};