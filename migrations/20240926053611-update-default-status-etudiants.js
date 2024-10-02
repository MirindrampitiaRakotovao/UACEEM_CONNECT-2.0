'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('etudiants', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      nom: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
      },
      groupes_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'groupes',
            key: 'id',
          },
      },
      photo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      matricule: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      sexe: {
        type: DataTypes.ENUM('M', 'F'),
        allowNull: true,
      },
      date_nais: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      lieu_nais: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      situation_matri: {
        type: DataTypes.ENUM('Célibataire', 'Marié(e)', 'Autre'),
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      bio: {
        type: DataTypes.STRING,
        allowNull: true,
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
    await queryInterface.dropTable('etudiants');
  }
};
