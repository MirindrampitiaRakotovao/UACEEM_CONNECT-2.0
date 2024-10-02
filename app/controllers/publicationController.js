const publicationService = require('../services/publicationService');

const createPublication = async (req, res) => {
  // Vérifie si des fichiers ou une légende sont fournis
  if (!req.files.length && !req.body.legende) {
    return res.status(400).json({ message: 'Le contenu de la publication ne peut pas être vide.' });
  }

  try {
    const { visibilite } = req.body;

    // Vérifie que la visibilité est valide
    if (!['Public', 'Groupe'].includes(visibilite)) {
      return res.status(400).json({ message: 'Visibilité invalide' });
    }

    // Appelle le service pour créer la publication
    const publication = await publicationService.createPublication(req.body, req.files);

    return res.status(201).json({ message: 'Publication créée avec succès', publication });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createPublication,
};
