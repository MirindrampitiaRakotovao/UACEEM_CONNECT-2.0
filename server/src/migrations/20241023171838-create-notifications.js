'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('notifications', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'personnel', // Assurez-vous que ce modèle existe
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      creatorId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'personnel', // Assurez-vous que ce modèle existe
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      message: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isRead: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      publicationId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'publications',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      commentaireId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'commentaires',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      reactionPublicationId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Reactions_Publication',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      reactionCommentaireId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Reactions_Commentaires',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('notifications');
  },
};
