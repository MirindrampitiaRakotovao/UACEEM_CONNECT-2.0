'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Commentaire extends Model {
    static associate(models) {
      // Un commentaire appartient à un auteur (Personnel)
      this.belongsTo(models.Personnel, { foreignKey: 'auteurId', as: 'auteur' });

      // Un commentaire appartient à une publication
      this.belongsTo(models.Publication, { foreignKey: 'publicationId', as: 'publication' });

      // Association pour les réponses aux commentaires
      this.hasMany(models.Commentaire, { foreignKey: 'parentId', as: 'reponses' });

      // Association pour récupérer les réactions d'un commentaire
      this.hasMany(models.ReactionCommentaire, { foreignKey: 'commentaireId', as: 'reactions' });
    }
  }

  Commentaire.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: 'Le texte du commentaire est obligatoire' },
        notEmpty: { msg: 'Le texte du commentaire ne peut pas être vide' },
      },
    },
    auteurId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'personnel',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    publicationId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'publications',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    parentId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'commentaires',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    nombre_commentaire: { // Ajout de l'attribut nombre_commentaire
      type: DataTypes.INTEGER,
      allowNull: true, // Peut être nul pour les commentaires principaux
      defaultValue: 0, // Valeur par défaut
    },
  }, {
    sequelize,
    modelName: 'Commentaire',
    tableName: 'commentaires',
    timestamps: true,
  });

  return Commentaire;
};
