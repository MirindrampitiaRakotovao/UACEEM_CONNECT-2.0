require('../models/association');
const Publications = require('../models/publications');
const GroupePartages = require('../models/groupePartage'); // Modèle des groupes
const fs = require('fs');
const path = require('path');


// Vérifie si l'utilisateur est membre du groupe
const verifyGroupMembership = async (etudiant_id, design_groupe_partage) => {
  const groupePartage = await GroupePartages.findOne({ where: { design_groupe_partage } });

  if (!groupePartage) {
    throw new Error('Le groupe spécifié n\'existe pas');
  }

  // Utiliser getEtudiants pour vérifier l'appartenance au groupe
  const etudiants = await groupePartage.getEtudiants({ where: { id: etudiant_id } });

  if (etudiants.length === 0) {
    throw new Error('Vous n\'êtes pas membre de ce groupe');
  }

  return groupePartage.id;
};


// Fonction pour créer une publication
const createPublication = async (req, files) => {
  const { visibilite, legende, groupe_nom } = req.body;

  // Ensure user is authenticated
  if (!req.user || !req.user.id) {
    throw new Error("L'utilisateur doit être authentifié pour créer une publication.");
  }

  const etudiant_id = req.user.id;

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
