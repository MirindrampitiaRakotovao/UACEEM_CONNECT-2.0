const PartageGroupe = require('../models/groupePartage');
const PartageGroupeEtudiant = require('../models/partageGroupeEtudiant');
const Publication = require('../models/publications');
const Etudiant = require('../models/etudiants');

//creer groupe de partage
exports.createGroupeEtudiant = async (req, res) => {
  const { design_groupe_partage } = req.body;
  const admin_id = req.user.id;

  try {
    const nouveauGroupe = await PartageGroupe.create({
      design_groupe_partage,
      admin_id,
      date_creation: new Date(),
    });

    // Ajouter l'admin comme membre du groupe
    await PartageGroupeEtudiant.create({
      membre_id: admin_id,
      groupe_partage_id: nouveauGroupe.id,
      role_membre_groupe: 'admin',
      date_adhesion: new Date(),
    });

    res.status(201).json({ message: 'Groupe créé avec succès', groupe: nouveauGroupe });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du groupe', error });
  }
};


//ajouter des membres au groupe de partage
exports.addMember = async (req, res) => {
    const { groupe_partage_id, membre_id } = req.body;
    const admin_id = req.user.id;
  
    try {
      // Vérifier que l'utilisateur est l'admin du groupe
      const isAdmin = await PartageGroupeEtudiant.findOne({
        where: { groupe_partage_id, membre_id: admin_id, role_membre_groupe: 'admin' },
      });
  
      if (!isAdmin) {
        return res.status(403).json({ message: 'Seul l\'admin peut ajouter des membres' });
      }
  
      const newMember = await PartageGroupeEtudiant.create({
        membre_id,
        groupe_partage_id,
        role_membre_groupe: 'membre',
        date_adhesion: new Date(),
      });
  
      res.status(201).json({ message: 'Membre ajouté avec succès', member: newMember });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de l\'ajout du membre', error });
    }
  };

  //lister membre de groupe partage 
  exports.listMembers = async (req, res) => {
    const { groupe_partage_id } = req.params;
    const etudiant_id = req.user.id;
  
    try {
      // Vérifier que l'étudiant fait partie du groupe
      const isMember = await PartageGroupeEtudiant.findOne({
        where: { membre_id: etudiant_id, groupe_partage_id },
      });
  
      if (!isMember) {
        return res.status(403).json({ message: 'Vous devez être membre du groupe pour voir cette liste.' });
      }
  
      const membres = await PartageGroupeEtudiants.findAll({
        where: { groupe_partage_id },
        include: ['etudiant'], // Inclure les informations de l'étudiant
      });
  
      res.status(200).json({ membres });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération des membres', error });
    }
  };
  