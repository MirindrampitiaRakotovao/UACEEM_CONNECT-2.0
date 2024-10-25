'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ReactionCommentaire extends Model {
    static associate(models) {
      this.belongsTo(models.Personnel, { foreignKey: 'auteurId', as: 'auteur' });
      this.belongsTo(models.Commentaire, { foreignKey: 'commentaireId', as: 'commentaire' });
    }
  }

  ReactionCommentaire.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM('like', 'love', 'sad', 'angry'),
      allowNull: false,
    },
    auteurId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'personnel',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    commentaireId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'commentaires',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  }, {
    sequelize,
    modelName: 'ReactionCommentaire',
    tableName: 'reactions_commentaires',
    timestamps: true,
  });

  return ReactionCommentaire;
};
