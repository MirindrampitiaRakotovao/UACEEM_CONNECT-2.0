'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Parcours extends Model {
    static associate(models) {
      // Association avec Mention
      Parcours.belongsTo(models.Mention, {
        foreignKey: 'mention_id',
        as: 'mention'
      });

      // Association avec Niveau
      Parcours.hasMany(models.Niveau, {
        foreignKey: 'parcours_id',
        as: 'niveaux'
      });
    }
  }

  Parcours.init({
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    design: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [2, 255],
          msg: "Le design doit contenir entre 2 et 255 caractères"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    mention_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'mentions',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Parcours',
    tableName: 'parcours',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',

    // Hooks
    hooks: {
      beforeValidate: (parcours) => {
        if (parcours.design) {
          parcours.design = parcours.design.trim();
        }
      }
    },

    // Scopes pour des requêtes courantes
    scopes: {
      avecMention: {
        include: [{
          model: sequelize.models.Mention,
          as: 'mention',
          attributes: ['id', 'design', 'code']
        }]
      },
      avecNiveaux: {
        include: [{
          model: sequelize.models.Niveau,
          as: 'niveaux',
          attributes: ['id', 'design']
        }]
      }
    }
  });

  // Méthodes de classe
  Parcours.getParcoursParMention = async function(mentionId) {
    return await this.findAll({
      where: { mention_id: mentionId },
      include: [{
        model: sequelize.models.Niveau,
        as: 'niveaux',
        attributes: ['id', 'design']
      }],
      order: [['design', 'ASC']]
    });
  };

  // Méthodes d'instance
  Parcours.prototype.getNiveauxDisponibles = async function() {
    return await sequelize.models.Niveau.findAll({
      where: { parcours_id: this.id },
      attributes: ['id', 'design'],
      order: [['design', 'ASC']]
    });
  };

  Parcours.prototype.getInfosCompletes = async function() {
    const parcours = await Parcours.findByPk(this.id, {
      include: [
        {
          model: sequelize.models.Mention,
          as: 'mention',
          attributes: ['id', 'design', 'code']
        },
        {
          model: sequelize.models.Niveau,
          as: 'niveaux',
          attributes: ['id', 'design']
        }
      ]
    });

    return {
      id: parcours.id,
      design: parcours.design,
      description: parcours.description,
      mention: parcours.mention,
      niveaux: parcours.niveaux,
      created_at: parcours.created_at,
      updated_at: parcours.updated_at
    };
  };

  return Parcours;
};