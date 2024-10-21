require('../models/association');
const Publications = require('../models/publications');
const Fichiers = require('../models/fichier');
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
exports.createPublication = async (req, fichiers, photo) => {
  const { visibilite, legende, groupe_nom } = req.body;

  if (!req.user || !req.user.id) {
    throw new Error("L'utilisateur doit être authentifié pour créer une publication.");
  }

  const etudiant_id = req.user.id;
  let groupe_partage_id = null;

  if (visibilite === 'Groupe') {
    if (!groupe_nom) {
      throw new Error('Le nom du groupe est requis pour une publication de groupe');
    }
    groupe_partage_id = await verifyGroupMembership(etudiant_id, groupe_nom);
  }

  // Création de la publication
  const publication = await Publications.create({
    etudiant_id,
    visibilite,
    legende: legende || null,
    groupe_partage_id
  });

  // Sauvegarder les fichiers uploadés dans la table "Fichiers"
  if (req.files && req.files['fichiers']) {
    await Promise.all(req.files['fichiers'].map(async (file) => {
      const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
      
      await Fichiers.create({
        nom_fichier: file.filename,
        type_fichier: file.mimetype,
        url_fichier: fileUrl,
        id_publication: publication.id
      });
    }));
  }

  return publication;
};

//publication public de tout les utilisateurs
exports.getPublicPublications = async () => {
  try {
    // Récupérer toutes les publications avec visibilité "Public"
    const publications = await Publications.findAll({
      where: { visibilite: 'Public' },
      include: [
        {
          model: require('../models/etudiants'),
          attributes: ['id','nom', 'username'],
        },
        {
          model: Fichiers,
          as: 'fichiers', // Inclure les fichiers liés à la publication
          attributes: ['nom_fichier', 'url_fichier'], // Renvoyer le nom et l'URL des fichiers
        },
      ],
    });

    return publications;
  } catch (error) {
    throw new Error(error.message);
  }
};

//publication public de tout les utilisateurs
exports.getGroupePublications = async () => {
  try {
    // Récupérer toutes les publications avec visibilité "Public"
    const publications = await Publications.findAll({
      where: { visibilite: 'Groupe' },
      include: [
        {
          model: require('../models/etudiants'),
          attributes: ['id','nom', 'username'],
        },
        {
          model: Fichiers,
          as: 'fichiers', // Inclure les fichiers liés à la publication
          attributes: ['nom_fichier', 'url_fichier'], // Renvoyer le nom et l'URL des fichiers
        },
      ],
    });

    return publications;
  } catch (error) {
    throw new Error(error.message);
  }
};

//publication public de la personne 
exports.getPublicPublicationsByUser = async (etudiant_id) => {
  try {
    // Récupérer toutes les publications avec visibilité "Public" créées par l'utilisateur authentifié
    const publications = await Publications.findAll({
      where: {
        visibilite: 'Public',
        etudiant_id: etudiant_id // Filtrer par l'utilisateur authentifié
      },
      include: [
        {
          model: require('../models/etudiants'),
          attributes: ['id','nom', 'username'],
        },
        {
          model: Fichiers,
          as: 'fichiers', // Inclure les fichiers liés à la publication
          attributes: ['nom_fichier', 'url_fichier'], // Renvoyer le nom et l'URL des fichiers
        },
      ],
    });

    return publications;
  } catch (error) {
    throw new Error(error.message);
  }
};
