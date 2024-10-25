'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ReactionPublication extends Model {
    static associate(models) {
      this.belongsTo(models.Publication, { foreignKey: 'publicationId', as: 'publication' });
      this.belongsTo(models.Personnel, { foreignKey: 'userId', as: 'user' });
    }
  }

  ReactionPublication.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    publicationId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'publications',
        key: 'id',
      },
      onDelete: 'CASCADE',  
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
    dateReaction: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'ReactionPublication',
    tableName: 'Reactions_Publication',
    timestamps: true,
  });

  return ReactionPublication;
};
