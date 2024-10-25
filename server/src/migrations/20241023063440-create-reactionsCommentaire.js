// migrations/xxxx-create-reactionCommentaire.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('reactions_commentaires', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      type: {
        type: Sequelize.ENUM('like', 'love', 'sad', 'angry'), // Types de réactions
        allowNull: false,
      },
      auteurId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'personnel', // Référence à la table personnel
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      commentaireId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'commentaires', // Référence à la table commentaires
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('reactions_commentaires');
  },
};
