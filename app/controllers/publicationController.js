const Publication = require('../models/publications');
const Fichier = require('../models/fichier');
const GroupePartage = require ('../models/groupePartage');
const GroupePartageEtudiant = require('../models/groupePartageEtudiant');

//creation publication
exports.createPost = async (req, res) => {
    const { visibilite, legende , design_groupe_partage } = req.body;
    const etudiant_id = req.user.id; 
    console.log('Etudiant ID:', etudiant_id);
  
    try {
      let groupe_partage_id = null;

      // Vérifier la visibilité
      if (visibilite === 'groupe') {
        if (!design_groupe_partage) {
          return res.status(400).json({ message: 'Le nom du groupe est requis pour publier dans un groupe.'});
        }

        // Trouver le groupe par son nom
        const groupe = await GroupePartage.findOne({ where: { design_groupe_partage: design_groupe_partage } });

        if (!groupe) {
          return res.status(404).json({ message: 'Groupe non trouvé.' });
        }

        // Vérifier si l'utilisateur est membre du groupe
        const estMembre = await GroupePartageEtudiant.findOne({
          where: { groupe_partage_id: groupe.id, membre_id: etudiant_id }
        });

        if (!estMembre) {
          
          return res.status(403).json({ message: 'Vous devez être membre du groupe pour publier.' });
        }

        // Si tout est correct, on enregistre l'ID du groupe
        groupe_partage_id = groupe.id;
      }

      // Créer la publication
      const nouvellePublication = await Publication.create({
        etudiant_id,
        visibilite,
        legende,
        contenu: null,
        date_publication: new Date(),
      });
  
      // Si plusieurs fichiers sont uploadés, les ajouter à la base de données
    if (req.files && req.files.length > 0) {
      const fichiersPromises = req.files.map((file) =>
        Fichier.create({
          nom_fichier: file.filename,
          type_fichier: file.mimetype,
          id_publication: nouvellePublication.id,
        })
      );
      await Promise.all(fichiersPromises); // Attendre que tous les fichiers soient créés
    }
  
      res.status(201).json({ message: 'Publication créée avec succès', publication: nouvellePublication });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la création de la publication', error });
      error: error.message || error 
    
    }
  };