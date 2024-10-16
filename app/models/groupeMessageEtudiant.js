const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Utilisateur = require('./etudiants'); // Assurez-vous d'avoir ce modèle

class Groupe extends Model {
  // Méthodes personnalisées
  async ajouterMembre(etudiantId) {
    try {
      if (this.membres.includes(etudiantId)) {
        throw new Error('L\'etudiant est déjà membre du groupe.');
      }

      const nouveaumembre = await etudiant.findByPk(etudiantId);
      if (!nouveaumembre) {
        throw new Error('L\'etudiant non trouvé.');
      }

      this.membres.push(etudiantId);
      await this.save();

      // Ajoutez le membre au groupe et mettez à jour les messages non lus
      // Continuez avec la logique sequelize...
    } catch (error) {
      console.error('Erreur lors de l\'ajout d\'un etudiant au groupe :', error);
      throw error;
    }
  }

  async supprimerMembre(etudiantId) {
    // Implémentation similaire à ajouterMembre mais pour la suppression
  }

  async changePhoto(newPhotoUrl) {
    // Logique pour changer la photo et gérer les fichiers
  }
}

Groupe.init({
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 50]
    }
  },
  photo: {
    type: DataTypes.STRING,
    defaultValue: null
  },
  description: {
    type: DataTypes.STRING,
  },
  createurId: {
    type: DataTypes.INTEGER,
    references: {
      model: Utilisateur,
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'Groupe',
  hooks: {
    beforeUpdate: async (groupe, options) => {
      // Empêcher les mises à jour des champs immuables
      // Logique Sequelize pour bloquer les modifications de certains champs
    },
    afterSave: async (groupe, options) => {
      // Ajouter automatiquement des membres au groupe après sa création
    }
  }
});

module.exports = Groupe;
