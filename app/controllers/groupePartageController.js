const PartageGroupe = require('../models/groupePartage');
const PartageGroupeEtudiant = require('../models/groupePartageEtudiant');

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
    const { groupe_nom, membre_id } = req.body;
    const admin_id = req.user.id;
  
    try {
      // Trouver le groupe par son nom
      const groupe = await GroupePartage.findOne({ where: { design_groupe_partage: groupe_nom } });

      if (!groupe) {
        return res.status(404).json({ message: 'Groupe non trouvé' });
      }
  

      // Vérifier que l'utilisateur est l'admin du groupe
      const isAdmin = await PartageGroupeEtudiant.findOne({
        where: { groupe_partage_id, membre_id: admin_id, role_membre_groupe: 'admin' },
      });
  
      if (!isAdmin) {
        return res.status(403).json({ message: 'Action réservée aux administrateurs du groupe' });
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
    const { groupe_nom } = req.params;
    const etudiant_id = req.user.id;
  
    try {
        // Trouver le groupe par son nom
      const groupe = await GroupePartage.findOne({ where: { design_groupe_partage: groupe_nom } });

      if (!groupe) {
        return res.status(404).json({ message: 'Groupe non trouvé' });
      }

      // Vérifier que l'étudiant fait partie du groupe
      const isMember = await PartageGroupeEtudiant.findOne({
        where: { membre_id: etudiant_id, groupe_partage_id },
      });
  
      if (!isMember) {
        return res.status(403).json({ message: 'Vous devez être membre du groupe pour voir cette liste.' });
      }
  
      // Récupérer les membres du groupe
      const membres = await PartageGroupeEtudiant.findAll({
        where: { groupe_partage_id },
        include: ['etudiant'], // Inclure les informations de l'étudiant
      });
  
      res.status(200).json({ membres });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération des membres', error });
    }
  };

  // Supprimer un membre d'un groupe
exports.removeMember = async (req, res) => {
  const { groupe_nom, membre_id } = req.body;
  const etudiant_id = req.user.id; // ID de l'admin qui supprime un membre

  try {
    // Trouver le groupe par son nom
    const groupe = await GroupePartage.findOne({ where: { design_groupe_partage: groupe_nom } });

    if (!groupe) {
      return res.status(404).json({ message: 'Groupe non trouvé' });
    }

    // Vérifier si l'utilisateur est admin du groupe
    const estAdmin = await PartageGroupeEtudiants.findOne({
      where: { groupe_partage_id: groupe.id, membre_id: etudiant_id, role_membre_groupe: 'admin' }
    });

    if (!estAdmin) {
      return res.status(403).json({ message: 'Action réservée aux administrateurs du groupe' });
    }

    // Supprimer le membre du groupe
    await PartageGroupeEtudiants.destroy({
      where: { groupe_partage_id: groupe.id, membre_id }
    });

    res.status(200).json({ message: 'Membre supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du membre', error: error.message });
  }
};
  