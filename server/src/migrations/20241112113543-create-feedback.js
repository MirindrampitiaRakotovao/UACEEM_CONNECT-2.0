'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('feedbacks', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      personnel_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'personnel',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      cours_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'cours',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      notation: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      commentaire: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      date_publication: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    // Ajouter l'index unique
    await queryInterface.addIndex('feedbacks', ['personnel_id', 'cours_id'], {
      unique: true,
      name: 'unique_personnel_cours'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('feedbacks');
  }
};