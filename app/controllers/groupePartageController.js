const GroupePartage = require('../models/groupePartage');
const GroupePartageEtudiant = require('../models/groupePartageEtudiant');
const Etudiant = require('../models/etudiants');

//creer groupe de partage
exports.createGroupeEtudiant = async (req, res) => {
  const { design_groupe_partage } = req.body;
  const admin_id = req.user.id;

  try {
    const nouveauGroupe = await GroupePartage.create({
      design_groupe_partage,
      admin_id,
      date_creation: new Date(),
    });

    // Ajouter l'admin comme membre du groupe
    await GroupePartageEtudiant.create({
      membre_id: admin_id,
      groupe_partage_id: nouveauGroupe.id,
      role_membre_groupe: 'admin',
      date_adhesion: new Date(),
    });

    res.status(200).json({ message: 'Groupe créé avec succès', groupe: nouveauGroupe });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du groupe', error });
  }
};


//ajouter des membres au groupe de partage
exports.addMember = async (req, res) => {
    const { groupe_nom, membre_username } = req.body;
    const admin_id = req.user.id;
  
    try {
      // Trouver le groupe par son nom
      const groupe = await GroupePartage.findOne({ where: { design_groupe_partage: groupe_nom } });

      if (!groupe) {
        return res.status(404).json({ message: 'Groupe non trouvé' });
      }
  

      // Vérifier que l'utilisateur est l'admin du groupe
      const isAdmin = await GroupePartageEtudiant.findOne({
        where: { groupe_partage_id: groupe.id, membre_id: admin_id, role_membre_groupe: 'admin' },
      });
  
      if (!isAdmin) {
        return res.status(403).json({ message: 'Action réservée aux administrateurs du groupe' });
      }
  
     // Trouver l'étudiant par son username
    const membre = await Etudiant.findOne({ where: { username: membre_username } });

    if (!membre) {
      return res.status(404).json({ message: 'Étudiant non trouvé' });
    }

    // Ajouter l'étudiant au groupe en utilisant son ID
    const newMember = await GroupePartageEtudiant.create({
      membre_id: membre.id,
      groupe_partage_id: groupe.id,
      role_membre_groupe: 'membre',
      date_adhesion: new Date(),
    });
  
      res.status(200).json({ message: 'Membre ajouté avec succès', member: newMember });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de l\'ajout du membre', error: error.message });
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
      const isMember = await GroupePartageEtudiant.findOne({
        where: { membre_id: etudiant_id, groupe_partage_id },
      });
  
      if (!isMember) {
        return res.status(403).json({ message: 'Vous devez être membre du groupe pour voir cette liste.' });
      }
  
      // Récupérer les membres du groupe
      const membres = await GroupePartageEtudiant.findAll({
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
    const estAdmin = await GroupePartageEtudiant.findOne({
      where: { groupe_partage_id: groupe.id, membre_id: etudiant_id, role_membre_groupe: 'admin' }
    });

    if (!estAdmin) {
      return res.status(403).json({ message: 'Action réservée aux administrateurs du groupe' });
    }

    // Supprimer le membre du groupe
    await GroupePartageEtudiant.destroy({
      where: { groupe_partage_id: groupe.id, membre_id }
    });

    res.status(200).json({ message: 'Membre supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du membre', error: error.message });
  }
};

// Liste des groupes où l'utilisateur connecté est administrateur
exports.getGroupesAdministres = async (req, res) => {
  const admin_id = req.user.id; // ID de l'utilisateur connecté

  try {
    // Récupérer les groupes où l'utilisateur est administrateur
    const groupes = await GroupePartage.findAll({
      where: { admin_id },
    });

    if (groupes.length === 0) {
      return res.status(404).json({ message: 'Aucun groupe trouvé.' });
    }

    res.status(200).json({ groupes });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des groupes', error: error.message });
  }
};

// Modifier la couverture d'un groupe (admin uniquement)
exports.changeCouverture = async (req, res) => {
  const { groupe_nom } = req.body; // On récupère le nom du groupe depuis le body
  const admin_id = req.user.id; // ID de l'admin connecté

  try {
    // Trouver le groupe par son nom
    const groupe = await GroupePartage.findOne({ where: { design_groupe_partage: groupe_nom } });

    if (!groupe) {
      return res.status(404).json({ message: 'Groupe non trouvé' });
    }

    // Vérifier que l'utilisateur est l'administrateur du groupe
    const estAdmin = await GroupePartageEtudiant.findOne({
      where: { groupe_partage_id: groupe.id, membre_id: admin_id, role_membre_groupe: 'admin' },
    });

    if (!estAdmin) {
      return res.status(403).json({ message: 'Seul l\'admin peut changer la couverture' });
    }

    // Vérifier que le fichier a bien été envoyé
    if (!req.file) {
      return res.status(400).json({ message: 'Aucun fichier de couverture fourni' });
    }

    // Mettre à jour la couverture avec le chemin du fichier uploadé
    const couverturePath = req.file.path; // Le chemin du fichier est défini par multer
    groupe.couverture = couverturePath;

    // Sauvegarder les modifications dans la base de données
    await groupe.save();

    console.log(groupe); // Vérifier si la couverture a bien été modifiée

    res.status(200).json({ message: 'Couverture modifiée avec succès', groupe });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la modification de la couverture', error: error.message });
  }
};

// Récupérer un groupe de partage avec sa couverture par son ID
exports.getGroupeByIdWithCouverture = async (req, res) => {
  try {
    const { id } = req.params;
    const groupe = await GroupePartage.findOne({
      where: { id },
      attributes: ['id', 'design_groupe_partage', 'couverture'],
    });

    if (!groupe) {
      return res.status(404).json({ message: 'Groupe de partage non trouvé' });
    }

    res.status(200).json({ groupe });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du groupe de partage', error });
  }
};


// Lister tous les groupes où l'étudiant connecté est membre
exports.getGroupesMembre = async (req, res) => {
  const etudiant_id = req.user.id;

  try {
    // Récupérer les groupes où l'étudiant est membre
    const groupes = await GroupePartage.findAll({
      include: {
        model: GroupePartageEtudiant,
        as: 'membres',
        where: { membre_id: etudiant_id },
        attributes: [], // On n'a pas besoin des champs de GroupePartageEtudiant ici
      },
    });

    if (groupes.length === 0) {
      return res.status(404).json({ message: 'Aucun groupe trouvé.' });
    }

    res.status(200).json({ groupes });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des groupes', error: error.message });
  }
};
