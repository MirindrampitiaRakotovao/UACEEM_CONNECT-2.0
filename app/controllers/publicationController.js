const publicationService = require('../services/publicationService');

//creer publication
exports.createPublication = async (req, res) => {
  try {
    // Convert req.body into a normal object
    const body = Object.assign({}, req.body);
    
    // Now you can safely destructure visibilite and other properties
    const { visibilite, legende } = body;

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

//publication public de tout les utilisateurs
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


//publication publier par la personne 
exports.getPublicPublicationsByUser = async (req, res) => {
  try {
    // Vérifie si l'utilisateur est authentifié
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "L'utilisateur doit être authentifié" });
    }

    const etudiant_id = req.user.id;

    // Récupérer les publications publiques créées par l'utilisateur authentifié
    const publications = await publicationService.getPublicPublicationsByUser(etudiant_id);

    if (!publications.length) {
      return res.status(404).json({ message: 'Aucune publication publique trouvée pour cet utilisateur' });
    }

    return res.status(200).json(publications);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
