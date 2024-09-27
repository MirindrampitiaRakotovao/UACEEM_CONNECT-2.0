const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const GroupePartages = sequelize.define('groupePartages', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  design_groupe_partage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  admin_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'etudiants',
      key: 'id',
    },
  },
  date_creation: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = GroupePartages;
