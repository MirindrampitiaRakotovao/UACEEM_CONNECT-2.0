'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Reactions_Publication', {
      id: {
        type: Sequelize.UUID,  // Utilisation de l'UUID pour garantir des IDs uniques
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      publicationId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'publications',  // Nom de la table des publications
          key: 'id',
        },
        onDelete: 'CASCADE'  // Si la publication est supprimée, supprimer les réactions associées
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'personnel',  // Nom de la table des utilisateurs (personnel)
          key: 'id',
        },
        onDelete: 'CASCADE'  // Si l'utilisateur est supprimé, supprimer les réactions associées
      },
      // Date de la réaction
      dateReaction: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      }
    });

    // Ajouter une contrainte unique pour éviter que le même utilisateur réagisse plusieurs fois à la même publication
    await queryInterface.addConstraint('Reactions_Publication', {
      fields: ['publicationId', 'userId'],
      type: 'unique',
      name: 'unique_reaction_user_publication'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Reactions_Publication');
  }
};
