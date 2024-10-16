const messageService = require('../services/messagePriveeService');

class MessageController {
    async sendMessage(req, res) {
        const expediteur_id = req.user.id;
        const {  destinataire_id, contenuMessage } = req.body; 
        try {
            const message = await messageService.sendMessage(expediteur_id, destinataire_id, contenuMessage);
            res.status(201).json({ message: 'Message envoyé', data: message });
        } catch (error) {
            console.error('Erreur lors de l\'envoi du message:', error);
            res.status(500).json({ error: 'Erreur lors de l\'envoi du message', details: error.message });
        }
    }

    async getMessagesBetween(req, res) {
        const expediteur_id = req.user.id;
        const {  destinataire_id } = req.params;  // Récupère bien les paramètres depuis req.params
        try {
            const messages = await messageService.getMessagesBetween(expediteur_id, destinataire_id);
            res.status(200).json(messages);
        } catch (error) {
            console.error('Erreur lors de la récupération des messages:', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des messages', details: error.message });
        }
    }    
    
    async getMessagesForUser(req, res) {
        const etudiantId = req.user.id;  // Récupérer l'ID de l'utilisateur authentifié via req.user.id
        try {
            const messages = await messageService.getMessagesForUser(etudiantId);
            res.status(200).json(messages);
        } catch (error) {
            console.error('Erreur lors de la récupération des messages pour l\'utilisateur authentifié:', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des messages', details: error.message });
        }
    }
    
    async getUsersWithDiscussions(req, res) {
        console.log('getUsersWithDiscussions called');
        try {
            const userId = req.user.id;
            const { discussionsRecentes, etudiantsRestants } = await messageService.getRecentDiscussionsWithMessages(userId);
    
            return res.status(200).json({
                discussionsRecentes,
                etudiantsRestants
            });
        } catch (error) {
            console.error('Erreur dans getUsersWithDiscussions:', error);
            return res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs.' });
        }
    }
    
}

module.exports = new MessageController();
