const { Op } = require('sequelize');
const Groupe = require('../models/groupes');

const createGroupe = async (req, res) => {
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

    res.status(201).json({ message: 'Groupe créé avec succès', groupe });
    console.log(req.body);

  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du groupe', error });
  }
};

module.exports = { createGroupe };
