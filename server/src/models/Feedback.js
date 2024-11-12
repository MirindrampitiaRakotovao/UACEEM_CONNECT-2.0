'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    static associate(models) {
      Feedback.belongsTo(models.Personnel, {
        foreignKey: 'personnel_id',
        as: 'personnel'
      });

      Feedback.belongsTo(models.Cours, {
        foreignKey: 'cours_id',
        as: 'cours'
      });
    }
  }

  Feedback.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    personnel_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    cours_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    notation: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    },
    commentaire: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    date_publication: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Feedback',
    tableName: 'feedbacks',
    underscored: true,
    timestamps: true
  });

  return Feedback;
};