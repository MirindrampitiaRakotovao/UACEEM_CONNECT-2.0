const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Groupes = sequelize.define('groupes', {
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
    niveaux_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'niveaux',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    couverture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  
  module.exports = Groupes;
  
