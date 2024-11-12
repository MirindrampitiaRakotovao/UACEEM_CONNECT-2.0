'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Serie extends Model {
    static associate(models) {
      Serie.hasMany(models.Candidat, {
        foreignKey: 'serie_id',
        as: 'candidats'
      });
    }
  }

  Serie.init({
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    design: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Serie',
    tableName: 'series',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return Serie;
};