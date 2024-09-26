const { Op } = require('sequelize');
const Mention = require('../models/mentions');

exports.createMention = async (req, res) => {
  try {
    const { design , code , description } = req.body;

    // Vérifier si la mention existe 
    const existingMention = await Mention.findOne({ where: { [Op.or]: [{ design }, { code }, { description }] } });
    if (existingMention) {
      return res.status(400).json({ message: 'Cette mention existe déjà.' });
    }

    // Création de la mention
    const mention = await Mention.create({
      design ,
      code,
      description
    });

    res.status(201).json({ message: 'Mention créé avec succès', mention });
    console.log(req.body);

  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de la mention', error });
  }
};


