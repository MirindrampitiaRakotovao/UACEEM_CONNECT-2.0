'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Forum extends Model {
    static associate(models) {
      this.belongsTo(models.Personnel, {
        foreignKey: 'auteurId',
        as: 'auteur'
      });
      this.hasMany(models.ForumReponse, {
        foreignKey: 'forumId',
        as: 'reponses'
      });
      this.hasMany(models.ForumReaction, {
        foreignKey: 'forumId',
        as: 'reactions'
      });
    }
  }
  
  Forum.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    auteurId: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notNull: {
          msg: "L'ID de l'auteur est requis"
        }
      }
    },
    titre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Le titre est obligatoire'
        },
        len: {
          args: [3, 255],
          msg: 'Le titre doit contenir entre 3 et 255 caractères'
        }
      }
    },
    contenu: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Le contenu est obligatoire'
        },
        len: {
          args: [10, 10000],
          msg: 'Le contenu doit contenir entre 10 et 10000 caractères'
        }
      }
    },
    categorie: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Général',
      validate: {
        notNull: {
          msg: 'La catégorie est obligatoire'
        },
        isIn: {
          args: [['Général', 'Technique', 'Académique', 'Social']],
          msg: 'Catégorie invalide'
        }
      }
    },
    motsCles: {
      type: DataTypes.TEXT,
      get() {
        const rawValue = this.getDataValue('motsCles');
        try {
          return rawValue ? JSON.parse(rawValue) : [];
        } catch (error) {
          return [];
        }
      },
      set(value) {
        const motsCles = Array.isArray(value) ? value : (typeof value === 'string' ? JSON.parse(value) : []);
        this.setDataValue('motsCles', JSON.stringify(motsCles));
      },
      validate: {
        isValidMotsCles(value) {
          const motsCles = this.getDataValue('motsCles');
          try {
            const parsed = JSON.parse(motsCles);
            if (!Array.isArray(parsed)) {
              throw new Error('Mots-clés doivent être un tableau');
            }
            if (parsed.length > 10) {
              throw new Error('Maximum 10 mots-clés autorisés');
            }
          } catch (error) {
            throw new Error(error.message);
          }
        }
      }
    },
    pieceJointes: {
      type: DataTypes.TEXT,
      get() {
        const rawValue = this.getDataValue('pieceJointes');
        try {
          return rawValue ? JSON.parse(rawValue) : [];
        } catch (error) {
          return [];
        }
      },
      set(value) {
        const pieceJointes = Array.isArray(value) ? value : (typeof value === 'string' ? JSON.parse(value) : []);
        this.setDataValue('pieceJointes', JSON.stringify(pieceJointes));
      },
      validate: {
        isValidPieceJointes(value) {
          const pieceJointes = this.getDataValue('pieceJointes');
          try {
            const parsed = JSON.parse(pieceJointes);
            if (!Array.isArray(parsed)) {
              throw new Error('Pièces jointes doivent être un tableau');
            }
            if (parsed.length > 5) {
              throw new Error('Maximum 5 pièces jointes autorisées');
            }
          } catch (error) {
            throw new Error(error.message);
          }
        }
      }
    },
    audio: {
      type: DataTypes.TEXT, // ou JSON selon votre besoin
      allowNull: true,
      validate: {
        isValidAudio(value) {
          if (value && typeof value !== 'string') {
            throw new Error('L\'audio doit être une chaîne de caractères');
          }
        }
      }
    },
    nombreReactions: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: {
          args: [0],
          msg: 'Le nombre de réactions ne peut pas être négatif'
        }
      }
    },
    nombrePartages: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: {
          args: [0],
          msg: 'Le nombre de partages ne peut pas être négatif'
        }
      }
    },
    estEtendu: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Forum',
    tableName: 'forums',
    timestamps: true,
    paranoid: true,
    hooks: {
      beforeValidate: (forum, options) => {
        if (typeof forum.motsCles === 'string') {
          try {
            forum.motsCles = JSON.parse(forum.motsCles);
          } catch (error) {
            forum.motsCles = [];
          }
        }
        if (typeof forum.pieceJointes === 'string') {
          try {
            forum.pieceJointes = JSON.parse(forum.pieceJointes);
          } catch (error) {
            forum.pieceJointes = [];
          }
        }
        if (!forum.categorie) {
          forum.categorie = 'Général';
        }
      }
    }
  });
  
  return Forum;
};