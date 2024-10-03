const publicationService = require('../services/publicationService');

exports.createPublication = async (req, res) => {
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
    if ((!req.files['fichiers'] || !req.files['fichiers'].length) && !legende) {
      return res.status(400).json({ message: 'Le contenu de la publication ne peut pas être vide.' });
    }

    // Gérer la photo si elle existe
    const photo = req.files['photo'] ? req.files['photo'][0] : null;

    // Call the service to create the publication
    const publication = await publicationService.createPublication(req, req.files['fichiers'], photo);

    return res.status(201).json({ message: 'Publication créée avec succès', publication });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};


exports.getPublicPublications = async (req, res) => {
  try {
    const publications = await publicationService.getPublicPublications();

    if (!publications.length) {
      return res.status(404).json({ message: 'Aucune publication publique trouvée' });
    }

    return res.status(200).json(publications);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
