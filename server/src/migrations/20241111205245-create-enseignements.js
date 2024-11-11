'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('enseignements', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      anneeUniversitaire: {
        type: Sequelize.STRING,
        allowNull: false
      },
      niveau: {
        type: Sequelize.STRING,
        allowNull: false
      },
      mention: {
        type: Sequelize.STRING,
        allowNull: false
      },
      semestre: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      typeUE: {
        type: Sequelize.ENUM('Fondamentale', 'Découverte', 'Méthodologie'),
        allowNull: false
      },
      nomMatiere: {
        type: Sequelize.STRING,
        allowNull: false
      },
      coursmagistraux: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      travauxDiriges: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      volumeHoraireTotal: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      credits: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      coefficient: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      nomEnseignant: {
        type: Sequelize.STRING,
        allowNull: true
      },
      prenomEnseignant: {
        type: Sequelize.STRING,
        allowNull: true
      },
      titreEnseignant: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('enseignements');
  }
};