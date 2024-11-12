'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Mention extends Model {
    static associate(models) {
      // Association avec Etudiant
      Mention.hasMany(models.Etudiant, {
        foreignKey: 'mention_id',
        as: 'etudiants'
      });

      // Association avec Candidat
      Mention.hasMany(models.Candidat, {
        foreignKey: 'mention_id',
        as: 'candidats'
      });
    }
  }

  Mention.init({
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    design: {
      type: DataTypes.STRING,
      allowNull: true
    },
    code: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dispo_l1: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Mention',
    tableName: 'mentions',
    timestamps: true,
    paranoid: true, // Pour supporter soft deletes
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',

    // Hooks
    hooks: {
      beforeCreate: (mention) => {
        if (!mention.code && mention.design) {
          // Générer un code à partir du design si non fourni
          mention.code = mention.design
            .substring(0, 3)
            .toUpperCase()
            .replace(/\s+/g, '');
        }
      }
    },

    // Scopes pour des requêtes courantes
    scopes: {
      disponibleL1: {
        where: {
          dispo_l1: true
        }
      },
      actif: {
        where: {
          deleted_at: null
        }
      }
    }
  });

  // Méthodes de classe
  Mention.getMentionsDisponibles = async function() {
    return await this.scope('actif').findAll({
      order: [['design', 'ASC']]
    });
  };

  Mention.getMentionsL1 = async function() {
    return await this.scope(['actif', 'disponibleL1']).findAll({
      order: [['design', 'ASC']]
    });
  };

  // Méthodes d'instance
  Mention.prototype.getStatistiques = async function() {
    const stats = {
      totalEtudiants: await this.countEtudiants(),
      totalCandidats: await this.countCandidats()
    };
    return stats;
  };

  Mention.prototype.toggleDispoL1 = async function() {
    this.dispo_l1 = !this.dispo_l1;
    await this.save();
    return this;
  };

  return Mention;
};