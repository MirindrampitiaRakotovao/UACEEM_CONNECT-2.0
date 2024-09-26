const { Op } = require('sequelize');
const Niveau = require('../models/niveaux');

const createNiveau = async (req, res) => {
  try {
    const { design , description , parcours_id } = req.body;

    // Vérifier si le niveau existe
    const existingNiveau = await Niveau.findOne({ where: { [Op.or]: [{ design }, { description }] } });
    if (existingNiveau) {
      return res.status(400).json({ message: 'Ce niveau existe déjà.' });
    }

    // Création de l'étudiant
    const niveau = await Niveau.create({
      design ,
      description,
      parcours_id
    });

    res.status(201).json({ message: 'Niveau créé avec succès', niveau });
    console.log(req.body);

  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du niveau', error });
  }
};

module.exports = { createNiveau };
