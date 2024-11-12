'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Enseignement extends Model {
    static associate(models) {
      this.hasMany(models.Cours, {
        foreignKey: 'enseignementId',
        as: 'cours'
      });

      this.belongsTo(models.Personnel, { 
        foreignKey: {
          name: 'personnelId',
          allowNull: true
        }, 
        as: 'personnel' 
      });
    }
  }

  Enseignement.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    anneeUniversitaire: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "L'année universitaire ne peut pas être vide" }
      }
    },
    niveau: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Le niveau ne peut pas être vide" }
      }
    },
    mention: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "La mention ne peut pas être vide" }
      }
    },
    semestre: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: "Le semestre doit être un nombre entier" },
        min: { args: [1], msg: "Le semestre doit être au moins 1" },
        max: { args: [6], msg: "Le semestre ne peut pas dépasser 6" }
      }
    },
    typeUE: {
      type: DataTypes.ENUM('Fondamentale', 'Découverte', 'Méthodologie'),
      allowNull: false,
      validate: {
        isIn: {
          args: [['Fondamentale', 'Découverte', 'Méthodologie']],
          msg: "Le type d'UE doit être Fondamentale, Découverte ou Méthodologie"
        }
      }
    },
    nomMatiere: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Le nom de la matière ne peut pas être vide" }
      }
    },
    coursmagistraux: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: { args: [0], msg: "Les cours magistraux ne peuvent pas être négatifs" }
      }
    },
    travauxDiriges: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: { args: [0], msg: "Les travaux dirigés ne peuvent pas être négatifs" }
      }
    },
    volumeHoraireTotal: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: { args: [0], msg: "Le volume horaire total doit être positif" }
      }
    },
    credits: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: { args: [0], msg: "Les crédits doivent être positifs" }
      }
    },
    coefficient: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: { args: [0], msg: "Le coefficient doit être positif" }
      }
    },
    personnelId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Personnel',
        key: 'id'
      }
    },
    nomEnseignant: {
      type: DataTypes.STRING,
      allowNull: true
    },
    prenomEnseignant: {
      type: DataTypes.STRING,
      allowNull: true
    },
    titreEnseignant: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Enseignement',
    tableName: 'enseignements',
    timestamps: true
  });

  return Enseignement;
};