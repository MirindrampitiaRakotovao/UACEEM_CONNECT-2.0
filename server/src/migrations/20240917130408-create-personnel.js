'use strict';
/** @type {import('sequelize-cli').Migration} */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('personnel', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      photoProfil: {
        type: Sequelize.STRING,
        allowNull: true
      },
      nom: {
        type: Sequelize.STRING,
        allowNull: false
      },
      prenom: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nomUtilisateur: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      dateNaissance: {
        type: Sequelize.DATE,
        allowNull: false
      },
      motDePasse: {
        type: Sequelize.STRING,
        allowNull: false
      },
      situationMatrimoniale: {
        type: Sequelize.ENUM('celibataire', 'marie', 'divorce', 'veuf'),
        allowNull: false
      },
      situationProfessionnelle: {
        type: Sequelize.ENUM('vacataire'),
        allowNull: false
      },
      posteOccupe: {
        type: Sequelize.ENUM('professeur', 'ressourcehumaine', 'comptable', 'accueil', 'secretaire', 'securite'),
        allowNull: false
      },
      contact: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      adresse: {
        type: Sequelize.STRING,
        allowNull: false
      },
      role: {
        type: Sequelize.ENUM('admin', 'professeur', 'etudiant', 'president_association', 'utilisateur_simple'),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Personnel');
  }
};
