const Publications = require('../models/publications');
const Groupes = require('../models/groupePartage'); // Modèle des groupes
const fs = require('fs');
const path = require('path');

// Vérifie si l'utilisateur est membre du groupe
const verifyGroupMembership = async (etudiant_id, design_groupe_partage) => {
  const groupe = await Groupes.findOne({ where: { design_groupe_partage: design_groupe_partage } });

  if (!groupe) {
    throw new Error('Le groupe spécifié n\'existe pas');
  }

  const isMember = await groupe.hasEtudiant(etudiant_id); // Vérifie si l'étudiant est membre du groupe
  if (!isMember) {
    throw new Error('Vous n\'êtes pas membre de ce groupe');
  }

  return groupe.id;
};

// Fonction pour créer une publication
const createPublication = async (data, files) => {
  const { etudiant_id, visibilite, legende, groupe_nom } = data;

  let groupe_partage_id = null;

  // Vérification de la visibilité
  if (visibilite === 'Groupe') {
    if (!groupe_nom) {
      throw new Error('Le nom du groupe est requis pour une publication de groupe');
    }
    groupe_partage_id = await verifyGroupMembership(etudiant_id, groupe_nom);
  }

  // Gestion des fichiers (contenu)
  let contenu = null;
  if (files && files.length > 0) {
    const uploadedFiles = files.map(file => file.filename);
    contenu = uploadedFiles.join(','); // Sauvegarde les fichiers comme liste de noms
  }

  // Création de la publication
  const publication = await Publications.create({
    etudiant_id,
    visibilite,
    legende: legende || null,
    contenu: contenu || null,
    groupe_partage_id
  });

  return publication;
};

module.exports = {
  createPublication,
};
