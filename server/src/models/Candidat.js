'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Candidat extends Model {
    static associate(models) {
      // Association avec Mention
      Candidat.belongsTo(models.Mention, {
        foreignKey: 'mention_id',
        as: 'mention'
      });

      // Association avec Serie
      Candidat.belongsTo(models.Serie, {
        foreignKey: 'serie_id',
        as: 'serie'
      });

      // Association avec Vague
      Candidat.belongsTo(models.Vague, {
        foreignKey: 'vagues_id',
        as: 'vague'
      });

      // Association avec Niveau
      Candidat.belongsTo(models.Niveau, {
        foreignKey: 'niveaux_id',
        as: 'niveau'
      });

      // Association avec Etudiant (si un candidat devient étudiant)
      Candidat.hasOne(models.Etudiant, {
        foreignKey: 'candidat_id',
        as: 'etudiant'
      });
    }
  }

  Candidat.init({
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    mention_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'mentions',
        key: 'id'
      }
    },
    serie_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'series',
        key: 'id'
      }
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: true
    },
    num_bacc: {
      type: DataTypes.STRING,
      allowNull: true
    },
    anne_bacc: {
      type: DataTypes.INTEGER, // Pour le type YEAR
      allowNull: true
    },
    tel: {
      type: DataTypes.STRING,
      allowNull: true
    },
    num_conc: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: {
          msg: "Format d'email invalide"
        }
      }
    },
    preuve_bacc: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('admis', 'recalé'),
      allowNull: true
    },
    ref_mvola: {
      type: DataTypes.STRING,
      allowNull: true
    },
    commentaire: {
      type: DataTypes.STRING,
      allowNull: true
    },
    mode_inscription: {
      type: DataTypes.ENUM('local', 'en_ligne'),
      allowNull: true
    },
    vagues_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'vagues',
        key: 'id'
      }
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
    modelName: 'Candidat',
    tableName: 'candidats',
    timestamps: true,
    paranoid: true, // Pour supporter soft deletes
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    
    // Hooks optionnels
    hooks: {
      beforeCreate: async (candidat) => {
        // Générer un numéro de concours unique si nécessaire
        if (!candidat.num_conc) {
          candidat.num_conc = `CONC-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        }
      }
    },

    // Méthodes d'instance
    instanceMethods: {
      // Exemple de méthode pour vérifier si le candidat est admissible
      isAdmissible() {
        return this.status === 'admis';
      }
    },

    // Méthodes de classe
    classMethods: {
      // Exemple de méthode pour trouver les candidats par vague
      async findByVague(vagueId) {
        return await this.findAll({
          where: { vagues_id: vagueId },
          include: [
            { 
              model: sequelize.models.Mention,
              as: 'mention'
            },
            {
              model: sequelize.models.Serie,
              as: 'serie'
            }
          ]
        });
      }
    }
  });

  // Méthodes de prototype
  Candidat.prototype.genererNumeroInscription = function() {
    return `INS-${this.id}-${new Date().getFullYear()}`;
  };

  // Méthodes statiques
  Candidat.getStatistiques = async function(vagueId) {
    const stats = await this.findAll({
      where: { vagues_id: vagueId },
      attributes: [
        'status',
        [sequelize.fn('COUNT', sequelize.col('id')), 'total']
      ],
      group: ['status']
    });
    return stats;
  };

  return Candidat;
};