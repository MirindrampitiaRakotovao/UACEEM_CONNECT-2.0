'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cours extends Model {
    static associate(models) {
      // Vérifier si le modèle Enseignement existe avant de créer l'association
      if (models && models.Enseignement) {
        this.belongsTo(models.Enseignement, {
          foreignKey: 'enseignementId',
          as: 'enseignement'
        });
      }
    }
  }

  Cours.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    enseignementId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    titre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Le titre du cours ne peut pas être vide" }
      }
    },
    contenu: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fichiers: {
      type: DataTypes.TEXT,
      defaultValue: '[]',
      get() {
        const rawValue = this.getDataValue('fichiers');
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(value) {
        this.setDataValue('fichiers', JSON.stringify(value));
      }
    },
    datePublication: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    estPublie: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Cours',
    tableName: 'cours',
    timestamps: true
  });

  return Cours;
};