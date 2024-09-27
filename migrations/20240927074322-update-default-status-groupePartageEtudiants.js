'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('groupePartageEtudiants', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      membre_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'etudiants',
          key: 'id',
        },
        allowNull: false,
      },
      groupe_partage_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'groupePartages',
          key: 'id',
        },
        allowNull: false,
      },
      date_adhesion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      role_membre_groupe: {
        type: DataTypes.ENUM('membre', 'admin'),
        allowNull: false,
        defaultValue: 'membre',
      },

      //Autres colonnes 
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

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('groupePartageEtudiants');
  }
};
