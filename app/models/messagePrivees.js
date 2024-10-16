const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const MessagePrivee = sequelize.define('messagePrivees', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    expediteur_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'etudiants', // Fait référence à la table des étudiants
            key: 'id',
        },
    },
    destinataire_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'etudiants', 
            key: 'id',
        },
    },
    contenuMessage: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
});

module.exports = MessagePrivee;

