'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('messages', {
      // Identifiant UUID
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },

      // Type de message
      type: {
        type: Sequelize.ENUM('texte', 'image', 'document', 'vocal', 'multimedia'),
        allowNull: false
      },

      // Contenu textuel
      contenu: {
        type: Sequelize.TEXT,
        allowNull: true
      },

      // Fichiers multimédias
      fichiers: {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: []
      },

      // Métadonnées des fichiers
      metadonneesFichiers: {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: {}
      },

      // Statut du message
      statut: {
        type: Sequelize.ENUM('envoye', 'lu', 'livre', 'supprime'),
        defaultValue: 'envoye'
      },

      // Localisation
      localisation: {
        type: Sequelize.JSON,
        allowNull: true
      },

      // Date d'envoi
      dateEnvoi: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },

      // Date de lecture
      dateLecture: {
        type: Sequelize.DATE,
        allowNull: true
      },

      // Expéditeur ID
      expediteurId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'personnel',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      // Destinataire ID
      destinataireId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'personnel',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      // Indicateur d'urgence
      estUrgent: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },

      // Timestamps automatiques
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });

    // Ajout des index pour améliorer les performances
    await queryInterface.addIndex('messages', ['expediteurId']);
    await queryInterface.addIndex('messages', ['destinataireId']);
    await queryInterface.addIndex('messages', ['dateEnvoi']);
    await queryInterface.addIndex('messages', ['statut']);
  },

  async down(queryInterface, Sequelize) {
    // Suppression des ENUMs personnalisés
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_messages_type";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_messages_statut";');
    
    // Suppression de la table
    await queryInterface.dropTable('messages');
  }
};