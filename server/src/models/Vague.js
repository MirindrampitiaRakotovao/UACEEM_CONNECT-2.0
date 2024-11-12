'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Vague extends Model {
    static associate(models) {
      Vague.belongsTo(models.Concours, {
        foreignKey: 'concours_id',
        as: 'concours'
      });
      Vague.hasMany(models.Candidat, {
        foreignKey: 'vagues_id',
        as: 'candidats'
      });
    }
  }

  Vague.init({
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    designation: {
      type: DataTypes.STRING,
      allowNull: true
    },
    commentaire: {
      type: DataTypes.STRING,
      allowNull: true
    },
    deb_insc: {
      type: DataTypes.DATE,
      allowNull: true
    },
    fin_insc: {
      type: DataTypes.DATE,
      allowNull: true
    },
    deb_conc: {
      type: DataTypes.DATE,
      allowNull: true
    },
    fin_conc: {
      type: DataTypes.DATE,
      allowNull: true
    },
    concours_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'concours',
        key: 'id'
      }
    },
    is_published: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Vague',
    tableName: 'vagues',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    
    // Méthodes d'instance
    instanceMethods: {
      isActive() {
        const now = new Date();
        return now >= this.deb_insc && now <= this.fin_insc;
      },
      isInscriptionPeriod() {
        const now = new Date();
        return now >= this.deb_insc && now <= this.fin_insc;
      },
      isConcoursPeriod() {
        const now = new Date();
        return now >= this.deb_conc && now <= this.fin_conc;
      }
    }
  });

  return Vague;
};