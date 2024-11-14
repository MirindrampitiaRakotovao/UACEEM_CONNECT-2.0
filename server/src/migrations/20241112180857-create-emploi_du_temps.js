'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('emplois_du_temps', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      nomMatiere: {
        type: Sequelize.STRING,
        allowNull: false
      },
      personnelId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'personnel',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      jour: {
        type: Sequelize.ENUM(
          'Lundi', 
          'Mardi', 
          'Mercredi', 
          'Jeudi', 
          'Vendredi', 
          'Samedi'
        ),
        allowNull: false
      },
      heureDebut: {
        type: Sequelize.TIME,
        allowNull: false
      },
      heureFin: {
        type: Sequelize.TIME,
        allowNull: false
      },
      salle: {
        type: Sequelize.STRING,
        allowNull: false
      },
      couleur: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'bg-[#FFAA00]'
      },
      mention: {
        type: Sequelize.STRING,
        allowNull: false
      },
      niveau: {
        type: Sequelize.STRING,
        allowNull: false
      },
      parcours: {
        type: Sequelize.STRING,
        allowNull: false
      },
      anneeUniversitaire: {
        type: Sequelize.STRING,
        allowNull: false
      },
      semestre: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      statut: {
        type: Sequelize.ENUM('Actif', 'Inactif', 'Suspendu'),
        defaultValue: 'Actif',
        allowNull: false
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
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('emplois_du_temps');
  }
};