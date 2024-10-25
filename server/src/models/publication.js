'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Publication extends Model {
    static associate(models) {
      // Association avec le modèle Personnel (Auteur de la publication)
      this.belongsTo(models.Personnel, { foreignKey: 'auteurId', as: 'auteur' });

      // Association avec le modèle Reaction (Une publication peut avoir plusieurs réactions)
      this.hasMany(models.ReactionPublication, { foreignKey: 'publicationId', as: 'reactions', onDelete: 'CASCADE' });

      // Association avec le modèle Commentaire
      this.hasMany(models.Commentaire, { foreignKey: 'publicationId', as: 'commentaires' });
    }
  }

  Publication.init({
    id: {
      type: DataTypes.UUID,  // Utilisation d'un UUID pour garantir un identifiant unique
      defaultValue: DataTypes.UUIDV4,  // Génération automatique d'un UUID
      allowNull: false,
      primaryKey: true,
    },
    audience: {
      type: DataTypes.ENUM('public', 'etudiants'),  // L'audience peut être "public" ou "etudiants"
      allowNull: false,
      validate: {
        notNull: { msg: 'L’audience est obligatoire' },
        isIn: {
          args: [['public', 'etudiants']],
          msg: 'L’audience doit être "public" ou "etudiants"',
        },
      },
    },
    type: {
      type: DataTypes.ENUM('annonce', 'forum'),  // Le type de publication peut être "annonce" ou "forum"
      allowNull: false,
      validate: {
        notNull: { msg: 'Le type de publication est obligatoire' },
        isIn: {
          args: [['annonce', 'forum']],
          msg: 'Le type de publication doit être "annonce" ou "forum"',
        },
      },
    },
    description: {
      type: DataTypes.TEXT,  // Description de la publication
      allowNull: false,
      validate: {
        notNull: { msg: 'La description est obligatoire' },
        notEmpty: { msg: 'La description ne peut pas être vide' },
      },
    },
    image: {
      type: DataTypes.STRING,  // Chemin ou URL de l'image de la publication (facultatif)
      allowNull: true,
    },
    datePublication: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,  // La date actuelle par défaut
    },
    heurePublication: {
      type: DataTypes.TIME,
      defaultValue: sequelize.literal('CURRENT_TIME'),  // L'heure actuelle par défaut
    },
    // Ajout de la clé étrangère pour l'auteur
    auteurId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'personnel',  // Référence à la table 'personnel'
        key: 'id',  // Utilisation de la clé primaire 'id' de la table 'personnel'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    // Ajout du nombre de commentaires
    nombre_commentaire: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0, // Valeur par défaut
    },
  }, {
    sequelize,
    modelName: 'Publication',
    tableName: 'publications',  // Assurez-vous que le nom de la table est "publications"
    timestamps: true,  // Inclut les colonnes createdAt et updatedAt
  });

  return Publication;
};
