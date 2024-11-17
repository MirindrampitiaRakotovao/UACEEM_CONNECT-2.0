const { Cours, Enseignement, Personnel } = require('../models');

const coursController = {
    // Obtenir tous les enseignements d'un professeur
    async getEnseignements(req, res) {
        try {
            console.log('Début getEnseignements pour personnelId:', req.personnel.id);
            const personnelId = req.personnel.id;

            const enseignements = await Enseignement.findAll({
                where: { personnelId },
                attributes: ['id', 'nomMatiere', 'niveau', 'mention', 'semestre'],
                order: [['nomMatiere', 'ASC']]
            });

            console.log(`${enseignements.length} enseignements trouvés`);
            res.status(200).json({
                success: true,
                data: enseignements
            });

        } catch (error) {
            console.error('Erreur dans getEnseignements:', error);
            res.status(500).json({
                success: false,
                message: "Erreur lors de la récupération des enseignements",
                error: error.message
            });
        }
    },

    // Créer un nouveau cours
    async createCours(req, res) {
        try {
            console.log('Début createCours');
            console.log('Body complet:', req.body);
            console.log('Files:', req.files); // Vérification des fichiers reçus
    
            const personnelId = req.personnel.id;
    
            // Nettoyage des données
            const titre = req.body['titre ']?.trim() || req.body.titre?.trim();
            const {
                contenu,
                nomMatiere,
                niveau,
                mention,
                semestre
            } = req.body;
            
            const estPublie = req.body.estPublie === 'true';
    
            // Validation des champs requis
            const requiredFields = {
                titre,
                contenu,
                nomMatiere,
                niveau,
                mention,
                semestre
            };
    
            const missingFields = Object.entries(requiredFields)
                .filter(([_, value]) => !value)
                .map(([key]) => key);
    
            if (missingFields.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: `Champs requis manquants: ${missingFields.join(', ')}`
                });
            }
    
            // Traitement correct des fichiers
            let fichiers = [];
            if (req.files && req.files.length > 0) {
                fichiers = req.files.map(file => ({
                    path: file.path.replace(/\\/g, '/'),
                    originalName: file.originalname,
                    mimeType: file.mimetype,
                    size: file.size
                }));
                console.log('Fichiers traités:', fichiers);
            }
    
            // Vérifier si l'enseignement existe déjà pour ce professeur
            let enseignement = await Enseignement.findOne({
                where: {
                    personnelId,
                    nomMatiere,
                    niveau,
                    mention,
                    semestre
                }
            });
    
            if (!enseignement) {
                enseignement = await Enseignement.create({
                    personnelId,
                    nomMatiere,
                    niveau,
                    mention,
                    semestre
                });
                console.log('Nouvel enseignement créé:', enseignement.id);
            }
    
            // Créer le cours avec les fichiers
            const cours = await Cours.create({
                titre,
                contenu,
                fichiers: fichiers, // Assurez-vous que votre modèle accepte un tableau d'objets
                enseignementId: enseignement.id,
                estPublie,
                datePublication: estPublie ? new Date() : null
            });
    
            console.log('Nouveau cours créé avec ID:', cours.id);
    
            // Réponse avec les détails complets
            res.status(201).json({
                success: true,
                message: "Cours créé avec succès",
                data: {
                    ...cours.toJSON(),
                    enseignement: {
                        id: enseignement.id,
                        nomMatiere: enseignement.nomMatiere,
                        niveau: enseignement.niveau,
                        mention: enseignement.mention,
                        semestre: enseignement.semestre
                    },
                    fichiers: fichiers // Inclure les détails des fichiers dans la réponse
                }
            });
    
        } catch (error) {
            console.error('Erreur détaillée dans createCours:', error);
            
            // En cas d'erreur, supprimer les fichiers uploadés
            if (req.files) {
                req.files.forEach(file => {
                    try {
                        fs.unlinkSync(file.path);
                    } catch (e) {
                        console.error('Erreur lors de la suppression du fichier:', e);
                    }
                });
            }
    
            if (error.name === 'SequelizeValidationError') {
                return res.status(400).json({
                    success: false,
                    message: "Erreur de validation",
                    errors: error.errors.map(e => e.message)
                });
            }
    
            res.status(500).json({
                success: false,
                message: "Erreur lors de la création du cours",
                error: error.message,
                stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
            });
        }
    },


    // Obtenir tous les cours d'un professeur
    async getCoursProf(req, res) {
        try {
            console.log('Début getCoursProf pour personnelId:', req.personnel.id);
            const personnelId = req.personnel.id;

            const cours = await Cours.findAll({
                include: [{
                    model: Enseignement,
                    as: 'enseignement',
                    where: { personnelId },
                    attributes: ['nomMatiere', 'niveau', 'mention', 'semestre']
                }],
                order: [['createdAt', 'DESC']]
            });

            console.log(`${cours.length} cours trouvés pour le professeur`);
            res.status(200).json({
                success: true,
                data: cours
            });

        } catch (error) {
            console.error('Erreur dans getCoursProf:', error);
            res.status(500).json({
                success: false,
                message: "Erreur lors de la récupération des cours",
                error: error.message
            });
        }
    },

    // Mettre à jour un cours
    async updateCours(req, res) {
        try {
            console.log('Début updateCours - ID:', req.params.id, 'Données:', req.body);
            const { id } = req.params;
            const personnelId = req.personnel.id;
            const { titre, contenu, fichiers, estPublie } = req.body;

            const cours = await Cours.findOne({
                include: [{
                    model: Enseignement,
                    as: 'enseignement',
                    where: { personnelId }
                }],
                where: { id }
            });

            if (!cours) {
                console.log('Cours non trouvé ou accès non autorisé pour ID:', id);
                return res.status(404).json({
                    success: false,
                    message: "Cours non trouvé ou vous n'êtes pas autorisé à le modifier"
                });
            }

            await cours.update({
                titre,
                contenu,
                fichiers,
                estPublie,
                datePublication: estPublie ? new Date() : cours.datePublication
            });

            console.log('Cours mis à jour avec succès - ID:', id);
            res.status(200).json({
                success: true,
                message: "Cours mis à jour avec succès",
                data: cours
            });

        } catch (error) {
            console.error('Erreur dans updateCours:', error);
            res.status(500).json({
                success: false,
                message: "Erreur lors de la mise à jour du cours",
                error: error.message
            });
        }
    },

    // Supprimer un cours
    async deleteCours(req, res) {
        try {
            console.log('Début deleteCours - ID:', req.params.id);
            const { id } = req.params;
            const personnelId = req.personnel.id;

            const cours = await Cours.findOne({
                include: [{
                    model: Enseignement,
                    as: 'enseignement',
                    where: { personnelId }
                }],
                where: { id }
            });

            if (!cours) {
                console.log('Cours non trouvé ou accès non autorisé pour suppression - ID:', id);
                return res.status(404).json({
                    success: false,
                    message: "Cours non trouvé ou vous n'êtes pas autorisé à le supprimer"
                });
            }

            await cours.destroy();
            console.log('Cours supprimé avec succès - ID:', id);
            res.status(200).json({
                success: true,
                message: "Cours supprimé avec succès"
            });

        } catch (error) {
            console.error('Erreur dans deleteCours:', error);
            res.status(500).json({
                success: false,
                message: "Erreur lors de la suppression du cours",
                error: error.message
            });
        }
    },

    // Publier/dépublier un cours
    async togglePublication(req, res) {
        try {
            console.log('Début togglePublication - ID:', req.params.id);
            const { id } = req.params;
            const personnelId = req.personnel.id;

            const cours = await Cours.findOne({
                include: [{
                    model: Enseignement,
                    as: 'enseignement',
                    where: { personnelId }
                }],
                where: { id }
            });

            if (!cours) {
                console.log('Cours non trouvé ou accès non autorisé pour toggle - ID:', id);
                return res.status(404).json({
                    success: false,
                    message: "Cours non trouvé ou vous n'êtes pas autorisé à le modifier"
                });
            }

            await cours.update({
                estPublie: !cours.estPublie,
                datePublication: !cours.estPublie ? new Date() : null
            });

            console.log(`Cours ${cours.estPublie ? 'publié' : 'dépublié'} - ID:`, id);
            res.status(200).json({
                success: true,
                message: cours.estPublie ? "Cours publié" : "Cours dépublié",
                data: cours
            });

        } catch (error) {
            console.error('Erreur dans togglePublication:', error);
            res.status(500).json({
                success: false,
                message: "Erreur lors de la modification de l'état de publication",
                error: error.message
            });
        }
    },

    // Obtenir un cours spécifique
    async getCoursById(req, res) {
        try {
            console.log('Début getCoursById - ID:', req.params.id);
            const { id } = req.params;
            const personnelId = req.personnel.id;

            const cours = await Cours.findOne({
                include: [{
                    model: Enseignement,
                    as: 'enseignement',
                    where: { personnelId },
                    attributes: ['nomMatiere', 'niveau', 'mention', 'semestre']
                }],
                where: { id }
            });

            if (!cours) {
                console.log('Cours non trouvé ou accès non autorisé - ID:', id);
                return res.status(404).json({
                    success: false,
                    message: "Cours non trouvé ou vous n'êtes pas autorisé à y accéder"
                });
            }

            console.log('Cours trouvé - ID:', id);
            res.status(200).json({
                success: true,
                data: cours
            });

        } catch (error) {
            console.error('Erreur dans getCoursById:', error);
            res.status(500).json({
                success: false,
                message: "Erreur lors de la récupération du cours",
                error: error.message
            });
        }
    },

    // Obtenir les cours par matière
    async getCoursByMatiere(req, res) {
        try {
            console.log('Début getCoursByMatiere - EnseignementID:', req.params.enseignementId);
            const { enseignementId } = req.params;
            const personnelId = req.personnel.id;

            const cours = await Cours.findAll({
                include: [{
                    model: Enseignement,
                    as: 'enseignement',
                    where: {
                        id: enseignementId,
                        personnelId
                    },
                    attributes: ['nomMatiere', 'niveau', 'mention', 'semestre']
                }],
                order: [['datePublication', 'DESC']]
            });

            console.log(`${cours.length} cours trouvés pour l'enseignement:`, enseignementId);
            res.status(200).json({
                success: true,
                data: cours
            });

        } catch (error) {
            console.error('Erreur dans getCoursByMatiere:', error);
            res.status(500).json({
                success: false,
                message: "Erreur lors de la récupération des cours",
                error: error.message
            });
        }
    },

    // Obtenir les cours publiés pour les étudiants
    async getCoursPublies(req, res) {
        try {
            console.log('Début getCoursPublies - EnseignementID:', req.params.enseignementId);
            const { enseignementId } = req.params;

            const cours = await Cours.findAll({
                where: {
                    enseignementId,
                    estPublie: true
                },
                include: [{
                    model: Enseignement,
                    as: 'enseignement',
                    attributes: ['nomMatiere', 'niveau', 'mention', 'semestre'],
                    include: [{
                        model: Personnel,
                        as: 'professeur',
                        attributes: ['nom', 'prenom']
                    }]
                }],
                order: [['datePublication', 'DESC']]
            });

            console.log(`${cours.length} cours publiés trouvés pour l'enseignement:`, enseignementId);
            res.status(200).json({
                success: true,
                data: cours
            });

        } catch (error) {
            console.error('Erreur dans getCoursPublies:', error);
            res.status(500).json({
                success: false,
                message: "Erreur lors de la récupération des cours publiés",
                error: error.message
            });
        }
    }
};

module.exports = coursController;