'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('fichiers', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      nom_fichier: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type_fichier: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id_publication: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'publications',
          key: 'id',
        },
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
    await queryInterface.dropTable('fichiers');
  }
};