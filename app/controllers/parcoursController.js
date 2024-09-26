const { Op } = require('sequelize');
const Parcours = require('../models/parcours');

const createParcours = async (req, res) => {
  try {
    const { design , description , mention_id } = req.body;

    // Vérifier si le parcours existe
    const existingParcours = await Parcours.findOne({ where: { [Op.or]: [{ design }, { description }] } });
    if (existingParcours) {
      return res.status(400).json({ message: 'Ce parcours existe déjà.' });
    }

    // Création de l'étudiant
    const parcours = await Parcours.create({
      design ,
      description,
      mention_id
    });

    res.status(201).json({ message: 'Parcours créé avec succès', parcours });
    console.log(req.body);

  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du parcours', error });
  }
};

module.exports = { createParcours };
