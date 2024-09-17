const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Niveaux = sequelize.define('niveaux', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    design: {
      type: DataTypes.ENUM('L1', 'L2', 'L3', 'M1', 'M2'),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parcours_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'parcours',
        key: 'id',
      },
    },
  });
  
  module.exports = Niveaux;
  