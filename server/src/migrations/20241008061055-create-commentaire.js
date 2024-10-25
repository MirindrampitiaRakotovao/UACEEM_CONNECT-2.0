'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('commentaires', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      text: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      auteurId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'personnel', // Référence à la table 'personnel'
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      publicationId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'publications', // Référence à la table 'publications'
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      parentId: { // Pour gérer les réponses aux commentaires
        type: Sequelize.UUID,
        allowNull: true, // Peut être nul pour les commentaires principaux
        references: {
          model: 'commentaires', // Référence à la même table
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      nombre_commentaire: { // Champ pour le nombre de commentaires
        type: Sequelize.INTEGER,
        allowNull: true, // Peut être nul au départ
        defaultValue: 0, // Valeur par défaut
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
    await queryInterface.dropTable('commentaires');
  }
};
