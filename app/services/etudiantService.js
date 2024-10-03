// services/etudiantService.js
const Etudiant = require('../models/etudiants'); // Assurez-vous d'importer le modèle correctement
const path = require('path');

exports.updateProfilePhoto = async (etudiantId, file) => {
  // Chemin du fichier que vous allez sauvegarder
  const photoPath = path.join(__dirname, '../uploads/photos', file.filename);

  // Mettre à jour le chemin de la photo dans la base de données
  const updatedEtudiant = await Etudiant.update(
    { photo: photoPath }, // Assurez-vous que le champ 'photo' existe dans votre modèle
    { where: { id: etudiantId } }
  );

  if (!updatedEtudiant) {
    throw new Error('Erreur lors de la mise à jour de la photo de profil.');
  }

  return updatedEtudiant; // Retournez les détails de l'utilisateur mis à jour
};
