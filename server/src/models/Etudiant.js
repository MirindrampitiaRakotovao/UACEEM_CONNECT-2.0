'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Etudiant extends Model {
    static associate(models) {
      // Associations
      Etudiant.belongsTo(models.Candidat, {
        foreignKey: 'candidat_id',
        as: 'candidat'
      });
      
      Etudiant.belongsTo(models.Groupe, {
        foreignKey: 'groupes_id',
        as: 'groupe'
      });

      Etudiant.belongsTo(models.Mention, {
        foreignKey: 'mention_id',
        as: 'mention'
      });

      Etudiant.belongsTo(models.SousGroupe, {
        foreignKey: 'sous_groupes_id',
        as: 'sousGroupe'
      });

      
    }
  }

  Etudiant.init({
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    candidat_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'candidats',
        key: 'id'
      }
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    matricule: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sexe: {
      type: DataTypes.ENUM('M', 'F'),
      allowNull: true
    },
    date_nais: {
      type: DataTypes.DATE,
      allowNull: true
    },
    lieu_nais: {
      type: DataTypes.STRING,
      allowNull: true
    },
    situation_matri: {
      type: DataTypes.ENUM('celibataire', 'marier', 'autre'),
      defaultValue: 'celibataire'
    },
    num_cin: {
      type: DataTypes.STRING,
      allowNull: true
    },
    date_cin: {
      type: DataTypes.DATE,
      allowNull: true
    },
    lieu_cin: {
      type: DataTypes.STRING,
      allowNull: true
    },
    adresse: {
      type: DataTypes.STRING,
      allowNull: true
    },
    quartier: {
      type: DataTypes.STRING,
      allowNull: true
    },
    facebook: {
      type: DataTypes.STRING,
      allowNull: true
    },
    etablissement_origine: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email_parent: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nom_parent: {
      type: DataTypes.STRING,
      allowNull: true
    },
    adresse_parent: {
      type: DataTypes.STRING,
      allowNull: true
    },
    profession_parent: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tel_parent: {
      type: DataTypes.STRING,
      allowNull: true
    },
    num_mvola: {
      type: DataTypes.STRING,
      allowNull: true
    },
    province_parent: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nom_parent_2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    profession_parent_2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tel_parent_2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    centre_interet: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password_changed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    groupes_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'groupes',
        key: 'id'
      }
    },
    mention_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'mentions',
        key: 'id'
      }
    },
    sous_groupes_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'sous_groupes',
        key: 'id'
      }
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tel: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nb_frere_soeurs: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    etat_domicile: {
      type: DataTypes.ENUM('seul', 'avec_personne'),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Etudiant',
    tableName: 'etudiants',
    timestamps: true,
    paranoid: true, // Pour supporter soft deletes (deleted_at)
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
  });

  return Etudiant;
};