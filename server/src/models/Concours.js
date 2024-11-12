'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Concours extends Model {
    static associate(models) {
      // Association avec Vague
      Concours.hasMany(models.Vague, {
        foreignKey: 'concours_id',
        as: 'vagues'
      });
    }
  }

  Concours.init({
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Concours',
    tableName: 'concours',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',

    // Methods de classe
    classMethods: {
      // Obtenir les concours actifs avec leurs vagues
      async getConcoursActifs() {
        return await this.findAll({
          include: [{
            model: sequelize.models.Vague,
            as: 'vagues',
            where: {
              is_published: true
            }
          }]
        });
      }
    },

    // Méthodes d'instance
    instanceMethods: {
      // Vérifier si le concours a des vagues actives
      async hasActiveVagues() {
        const vagues = await this.getVagues({
          where: {
            is_published: true
          }
        });
        return vagues.length > 0;
      }
    }
  });

  // Méthodes statiques supplémentaires
  Concours.getStatistiques = async function() {
    const stats = await this.findAll({
      include: [{
        model: sequelize.models.Vague,
        as: 'vagues',
        include: [{
          model: sequelize.models.Candidat,
          as: 'candidats'
        }]
      }],
      attributes: [
        'id',
        'type',
        [sequelize.fn('COUNT', sequelize.col('vagues.candidats.id')), 'totalCandidats']
      ],
      group: ['Concours.id']
    });
    return stats;
  };

  // Méthodes de prototype
  Concours.prototype.getVaguesActives = async function() {
    return await sequelize.models.Vague.findAll({
      where: {
        concours_id: this.id,
        is_published: true
      }
    });
  };

  return Concours;
};