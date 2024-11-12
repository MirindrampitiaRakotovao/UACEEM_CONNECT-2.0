'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Groupe extends Model {
    static associate(models) {
      Groupe.belongsTo(models.Niveau, {
        foreignKey: 'niveaux_id',
        as: 'niveau'
      });
      Groupe.hasMany(models.SousGroupe, {
        foreignKey: 'groupes_id',
        as: 'sousGroupes'
      });
      Groupe.hasMany(models.Etudiant, {
        foreignKey: 'groupes_id',
        as: 'etudiants'
      });
    }
  }

  Groupe.init({
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    design: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    niveaux_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'niveaux',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Groupe',
    tableName: 'groupes',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return Groupe;
};