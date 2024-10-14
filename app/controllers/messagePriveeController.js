const MessagePrive = require('../models/messagePrivees');
const Etudiant = require('../models/etudiants');
const { Op } = require('sequelize');

// Envoyer un message
exports.envoyerMessage = async (req, res) => {
    try {

        // Vérification complète des détails de req.user
        console.log("Utilisateur dans req.user:", req.user);

        // Vérifier si l'utilisateur est authentifié
        if (!req.user || !req.user.id) {
            return res.status(400).json({ message: 'Utilisateur non authentifié' });
        }

        const { destinataire_id, contenuMessage } = req.body;
        const expediteur_id = req.user.id;

        // Ajouter un log pour vérifier la valeur de expediteur_id
        console.log("Expéditeur ID:", expediteur_id);

        // Vérifier si le destinataire existe
        const destinataire = await Etudiant.findByPk(destinataire_id);
        if (!destinataire) {
            return res.status(404).json({ message: 'Destinataire non trouvé' });
        }

        // Log supplémentaire pour vérifier les données avant la création du message
        console.log("Données du message:", {
            expediteur_id,
            destinataire_id,
            contenuMessage
        });
        
        // Créer un message
        const nouveauMessage = await MessagePrive.create({
            expediteur_id: expediteur_id,  // Assurez-vous que cet ID est défini
            destinataire_id: destinataire_id,
            contenuMessage: contenuMessage,
        });

        res.status(200).json({ message: 'Message envoyé avec succès', nouveauMessage });
    } catch (error) {
        // Vérifier si l'erreur est liée à Sequelize pour mieux gérer les erreurs
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: 'Données non valides', erreurs: error.errors });
        }

        console.error(error);
        res.status(500).json({ message: 'Erreur lors de l\'envoi du message', error });
    }
};


// Récupérer les messages entre deux utilisateurs
exports.getMessages = async (req, res) => {
    const expediteur_id = req.user.id;
    const { destinataire_id } = req.params;

    try {
        const messages = await MessagePrive.findAll({
            where: {
                [Op.or]: [
                    { expediteur_id, destinataire_id },
                    { expediteur_id: destinataire_id, destinataire_id: expediteur_id }
                ]
            },
            order: [['createdAt', 'ASC']], // Trier par date
        });

        res.status(200).json({ messages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des messages', error });
    }
};

// Marquer un message comme lu
exports.marquerCommeLu = async (req, res) => {
    const { id } = req.params; // ID du message

    try {
        const message = await MessagePrive.findByPk(id);
        if (!message) {
            return res.status(404).json({ message: 'Message non trouvé' });
        }

        // Marquer le message comme lu
        message.lu = true;
        await message.save();

        res.status(200).json({ message: 'Message marqué comme lu', message });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du message', error });
    }
};
