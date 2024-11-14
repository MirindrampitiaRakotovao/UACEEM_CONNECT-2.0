'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class EmploiDuTemps extends Model {
    static associate(models) {
      this.belongsTo(models.Personnel, {
        foreignKey: {
          name: 'personnelId',
          allowNull: false
        },
        as: 'professeur'
      });
    }
  }

  EmploiDuTemps.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    nomMatiere: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Le nom de la matière est obligatoire' },
        notEmpty: { msg: 'Le nom de la matière ne peut pas être vide' }
      }
    },
    personnelId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Personnel',
        key: 'id'
      }
    },
    jour: {
      type: DataTypes.ENUM(
        'Lundi', 
        'Mardi', 
        'Mercredi', 
        'Jeudi', 
        'Vendredi', 
        'Samedi'
      ),
      allowNull: false,
      validate: {
        notNull: { msg: 'Le jour est obligatoire' }
      }
    },
    heureDebut: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        notNull: { msg: 'L\'heure de début est obligatoire' }
      }
    },
    heureFin: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        notNull: { msg: 'L\'heure de fin est obligatoire' },
        validateHeures(value) {
          if (new Date(`1970-01-01T${this.heureDebut}`) >= 
              new Date(`1970-01-01T${value}`)) {
            throw new Error('L\'heure de fin doit être après l\'heure de début');
          }
        }
      }
    },
    salle: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'La salle est obligatoire' },
        notEmpty: { msg: 'La salle ne peut pas être vide' }
      }
    },
    couleur: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'bg-[#FFAA00]',
      validate: {
        notNull: { msg: 'La couleur est obligatoire' },
        notEmpty: { msg: 'La couleur ne peut pas être vide' }
      }
    },
    mention: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'La mention est obligatoire' },
        notEmpty: { msg: 'La mention ne peut pas être vide' }
      }
    },
    niveau: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Le niveau est obligatoire' },
        notEmpty: { msg: 'Le niveau ne peut pas être vide' }
      }
    },
    parcours: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Le parcours est obligatoire' },
        notEmpty: { msg: 'Le parcours ne peut pas être vide' }
      }
    },
    anneeUniversitaire: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '2023-2024', // Valeur par défaut
      validate: {
        notEmpty: { msg: 'L\'année universitaire ne peut pas être une chaîne vide' }
      }
    },
    semestre: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: 'Le semestre doit être un nombre entier' },
        min: { args: [1], msg: 'Le semestre doit être au moins 1' }
        // La validation max a été supprimée
      }
    },
    statut: {
      type: DataTypes.ENUM('Actif', 'Inactif', 'Suspendu'),
      defaultValue: 'Actif',
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'EmploiDuTemps',
    tableName: 'emplois_du_temps',
    timestamps: true
  });

  return EmploiDuTemps;
};