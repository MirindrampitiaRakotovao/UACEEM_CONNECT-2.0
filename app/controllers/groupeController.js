const { Op } = require('sequelize');
const Groupe = require('../models/groupes');
const Etudiant = require('../models/etudiants');

/*création groupe*/
exports.createGroupe = async (req, res) => {
  try {
    const { design , description , niveaux_id } = req.body;

    // Vérifier si le groupe existe
    const existingGroupe = await Groupe.findOne({ where: { [Op.or]: [{ design }, { description }] } });
    if (existingGroupe) {
      return res.status(400).json({ message: 'Ce groupe existe déjà.' });
    }

    // Création de l'étudiant
    const groupe = await Groupe.create({
      design ,
      description,
      niveaux_id
    });

    res.status(200).json({ message: 'Groupe créé avec succès', groupe });
    console.log(req.body);

  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du groupe', error });
  }
};

/*liste des étudiants de meme groupe (le groupe par defaut)*/
exports.getEtudiantsByGroupe = async (req, res) => {
  try {
    // Vérifier si le token contient groupes_id
    if (!req.user.groupes_id) {
      return res.status(400).json({ message: 'Aucun groupe associé à cet étudiant.' });
    }

    const groupes_id = req.user.groupes_id;

    // Rechercher le groupe et inclure les étudiants associés
    const groupe = await Groupe.findOne({
      where: { id: groupes_id },
      include: [
        {
          model: Etudiant,
          as: 'etudiants',
          attributes: { exclude: ['password'] }, // Exclure le mot de passe des étudiants
        },
      ],
    });

    if (!groupe) {
      return res.status(404).json({ message: 'Groupe non trouvé.' });
    }

    res.status(200).json(groupe.etudiants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

exports.updatecouverture = async (req, res) => {
  try {
    const groupeId = req.params.id;
    const userId = req.user.id;
    const userRole = req.user.role;


    // Vérifier si l'utilisateur est un étudiant et a le rôle de délégué
    if (userRole !== 'Délegué') {
      return res.status(403).json({ error: 'Accès refusé. Seuls les délégués peuvent changer la photo de couverture.' });
    }

    // Vérifier si l'étudiant appartient bien au groupe
    const etudiant = await Etudiant.findOne({ where: { id: userId, groupes_id: groupeId } });
    if (!etudiant) {
      return res.status(403).json({ error: 'Accès refusé. Vous ne faites pas partie de ce groupe.' });
    }

    // Rechercher le groupe auquel l'étudiant appartient
    const groupe = await Groupe.findByPk(groupeId);
    if (!groupe) {
      return res.status(404).json({ error: 'Groupe non trouvé.' });
    }

    // Mettre à jour le chemin de la couverture dans la base de données
    groupe.couverture = `../uploads/${req.file.filename}`;
    await groupe.save();

    res.status(200).json({ message: 'couverture mise à jour avec succès', couverture: groupe.couverture });
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue' });
  }
};