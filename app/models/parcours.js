const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Parcours = sequelize.define('parcours', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    design: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mention_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'mentions',
        key: 'id',
      },
    },
  });
  
  module.exports = Parcours;
  