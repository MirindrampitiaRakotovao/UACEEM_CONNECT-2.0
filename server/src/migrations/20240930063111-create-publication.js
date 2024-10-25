'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('publications', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      audience: {
        type: Sequelize.ENUM('public', 'etudiants'),
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM('annonce', 'forum'),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      datePublication: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      heurePublication: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      auteurId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'personnel',  // Référence à la table 'personnel'
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      // Ajout du champ nombre_commentaire
      nombre_commentaire: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0, // Valeur par défaut
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
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('publications');
  }
};
