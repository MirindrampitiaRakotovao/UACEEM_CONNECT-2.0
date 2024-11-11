'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    // Création de la table des forums
    await queryInterface.createTable('forums', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      auteurId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'personnel',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      titre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      contenu: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      categorie: {
        type: Sequelize.STRING,
        allowNull: false
      },
      motsCles: {
        type: Sequelize.TEXT, // Stockage JSON pour les mots-clés
        get() {
          return JSON.parse(this.getDataValue('motsCles') || '[]');
        },
        set(val) {
          this.setDataValue('motsCles', JSON.stringify(val));
        },
        defaultValue: '[]'
      },
      fichierAudio: {
        type: Sequelize.STRING,
        allowNull: true
      },
      pieceJointes: {
        type: Sequelize.TEXT, // Stockage JSON pour les pièces jointes
        get() {
          return JSON.parse(this.getDataValue('pieceJointes') || '[]');
        },
        set(val) {
          this.setDataValue('pieceJointes', JSON.stringify(val));
        },
        defaultValue: '[]'
      },
      nombreReactions: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      nombrePartages: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      estEtendu: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });
    // Création de la table des réponses aux forums
    await queryInterface.createTable('forum_reponses', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      forumId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'forums',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      auteurId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'personnel',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      contenu: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      nombreReactions: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
    // Création de la table des réactions
    await queryInterface.createTable('forum_reactions', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      utilisateurId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'personnel',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      forumId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'forums',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      reponseId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'forum_reponses',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      type: {
        type: Sequelize.ENUM('reaction', 'partage'),
        allowNull: false,
        defaultValue: 'reaction'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
    // Création des index
    await queryInterface.addIndex('forums', ['auteurId']);
    await queryInterface.addIndex('forums', ['categorie']);
    await queryInterface.addIndex('forum_reponses', ['forumId']);
    await queryInterface.addIndex('forum_reponses', ['auteurId']);
    await queryInterface.addIndex('forum_reactions', ['forumId']);
    await queryInterface.addIndex('forum_reactions', ['reponseId']);
    await queryInterface.addIndex('forum_reactions', ['utilisateurId']);
    
    // Index unique pour éviter les doubles réactions
    await queryInterface.addIndex('forum_reactions', {
      fields: ['utilisateurId', 'forumId', 'reponseId', 'type'],
      unique: true,
      name: 'unique_forum_reaction'
    });
  },
  async down(queryInterface, Sequelize) {
    // Suppression des tables dans l'ordre inverse
    await queryInterface.dropTable('forum_reactions');
    await queryInterface.dropTable('forum_reponses');
    await queryInterface.dropTable('forums');
  }
};