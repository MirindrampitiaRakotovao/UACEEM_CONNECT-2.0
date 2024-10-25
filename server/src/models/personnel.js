'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Personnel extends Model {
    static associate(models) {
      // Association avec le modèle Publication (Un auteur peut avoir plusieurs publications)
      this.hasMany(models.Publication, { foreignKey: 'auteurId', as: 'publications' });

      // Association avec le modèle Reaction (Un utilisateur peut réagir à plusieurs publications)
      this.hasMany(models.ReactionPublication, { foreignKey: 'userId', as: 'reactions', onDelete: 'CASCADE' });

      // Association avec le modèle Commentaire
      this.hasMany(models.Commentaire, { foreignKey: 'auteurId', as: 'commentaires' });
    }
  }

  Personnel.init({
    // Ajout de l'UUID pour l'identifiant
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Génération automatique d'un UUID
      allowNull: false,
      primaryKey: true,
    },
    photoProfil: {
      type: DataTypes.STRING,
      allowNull: true, // Peut être null car la photo n'est pas obligatoire
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Le nom est obligatoire' },
        notEmpty: { msg: 'Le nom ne peut pas être vide' },
      },
    },
    prenom: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Le prénom est obligatoire' },
        notEmpty: { msg: 'Le prénom ne peut pas être vide' },
      },
    },
    nomUtilisateur: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Le nom d’utilisateur doit être unique',
      },
      validate: {
        notNull: { msg: 'Le nom d’utilisateur est obligatoire' },
        notEmpty: { msg: 'Le nom d’utilisateur ne peut pas être vide' },
      },
    },
    dateNaissance: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: { msg: 'La date de naissance doit être une date valide' },
        notNull: { msg: 'La date de naissance est obligatoire' },
      },
    },
    motDePasse: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Le mot de passe est obligatoire' },
        notEmpty: { msg: 'Le mot de passe ne peut pas être vide' },
      },
    },
    situationMatrimoniale: {
      type: DataTypes.ENUM('celibataire', 'marie', 'divorce', 'veuf'),
      allowNull: false,
      validate: {
        notNull: { msg: 'La situation matrimoniale est obligatoire' },
        isIn: {
          args: [['celibataire', 'marie', 'divorce', 'veuf']],
          msg: 'La situation matrimoniale doit être l’une de ces valeurs : celibataire, marie, divorce, veuf',
        },
      },
    },
    situationProfessionnelle: {
      type: DataTypes.ENUM('vacataire'),
      allowNull: false,
      validate: {
        notNull: { msg: 'La situation professionnelle est obligatoire' },
        isIn: {
          args: [['vacataire']],
          msg: 'La situation professionnelle doit être "vacataire"',
        },
      },
    },
    posteOccupe: {
      type: DataTypes.ENUM('professeur', 'ressourcehumaine', 'comptable', 'accueil', 'secretaire', 'securite'),
      allowNull: false,
      validate: {
        notNull: { msg: 'Le poste occupé est obligatoire' },
        isIn: {
          args: [['professeur', 'ressourcehumaine', 'comptable', 'accueil', 'secretaire', 'securite']],
          msg: 'Le poste occupé doit être l’une de ces valeurs : professeur, ressourcehumaine, comptable, accueil, secretaire, securite',
        },
      },
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Le contact est obligatoire' },
        notEmpty: { msg: 'Le contact ne peut pas être vide' },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: { msg: 'L’email doit être une adresse valide' },
        notNull: { msg: 'L’email est obligatoire' },
        notEmpty: { msg: 'L’email ne peut pas être vide' },
      },
    },
    adresse: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'L’adresse est obligatoire' },
        notEmpty: { msg: 'L’adresse ne peut pas être vide' },
      },
    },
    role: {
      type: DataTypes.ENUM('admin', 'professeur', 'president_club', 'president_association', 'utilisateur_simple'),
      allowNull: false,
      validate: {
        notNull: { msg: 'Le rôle est obligatoire' },
        isIn: {
          args: [['admin', 'professeur', 'president_club', 'president_association', 'utilisateur_simple']],
          msg: 'Le rôle doit être l’une de ces valeurs : admin, professeur, president_club, president_association, utilisateur_simple',
        },
      },
    },
  }, {
    sequelize,
    modelName: 'Personnel',
    tableName: 'personnel', // Assurez-vous que le nom de la table est 'personnel'
    timestamps: true, // Inclut les colonnes createdAt et updatedAt
  });

  return Personnel;
};
