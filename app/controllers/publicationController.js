const publicationService = require('../services/publicationService');

const createPublication = async (req, res) => {
  try {
    // Convert req.body into a normal object
    const body = Object.assign({}, req.body);
    
    // Now you can safely destructure visibilite and other properties
    const { visibilite, legende, groupe_nom } = body;

    // Check if the visibilite is valid
    if (!['Public', 'Groupe'].includes(visibilite)) {
      return res.status(400).json({ message: 'Visibilité invalide' });
    }

    // Check if files or caption are provided
    if (!req.files.length && !legende) {
      return res.status(400).json({ message: 'Le contenu de la publication ne peut pas être vide.' });
    }

    // Call the service to create the publication
    const publication = await publicationService.createPublication(req, req.files);

    return res.status(201).json({ message: 'Publication créée avec succès', publication });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createPublication,
};


module.exports = {
  createPublication,
};
