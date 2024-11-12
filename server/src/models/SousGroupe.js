'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SousGroupe extends Model {
    static associate(models) {
      SousGroupe.belongsTo(models.Groupe, {
        foreignKey: 'groupes_id',
        as: 'groupe'
      });
      SousGroupe.hasMany(models.Etudiant, {
        foreignKey: 'sous_groupes_id',
        as: 'etudiants'
      });
    }
  }

  SousGroupe.init({
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
    groupes_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'groupes',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'SousGroupe',
    tableName: 'sous_groupes',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return SousGroupe;
};