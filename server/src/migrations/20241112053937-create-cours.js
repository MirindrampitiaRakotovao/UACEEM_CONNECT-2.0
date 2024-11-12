'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cours', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      enseignementId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'enseignements',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      titre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      contenu: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      fichiers: {
        type: Sequelize.TEXT,
        defaultValue: '[]'
      },
      datePublication: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      estPublie: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.addIndex('cours', ['enseignementId']);
    await queryInterface.addIndex('cours', ['titre']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('cours');
  }
};