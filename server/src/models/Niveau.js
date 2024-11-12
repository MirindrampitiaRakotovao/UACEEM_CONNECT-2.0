'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Niveau extends Model {
    static associate(models) {
      Niveau.belongsTo(models.Parcours, {
        foreignKey: 'parcours_id',
        as: 'parcours'
      });
      Niveau.hasMany(models.Groupe, {
        foreignKey: 'niveaux_id',
        as: 'groupes'
      });
      Niveau.hasMany(models.Candidat, {
        foreignKey: 'niveaux_id',
        as: 'candidats'
      });
    }
  }

  Niveau.init({
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    design: {
      type: DataTypes.ENUM('L1', 'L2', 'L3', 'M1', 'M2'),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    parcours_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'parcours',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Niveau',
    tableName: 'niveaux',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return Niveau;
};