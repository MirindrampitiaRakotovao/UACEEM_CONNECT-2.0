const MessagePrivee = require('../models/messagePrivees');
const Etudiant = require('../models/etudiants')
const { Sequelize, Op } = require('sequelize');

class MessagePriveeService {
    async sendMessage(expediteur_id, destinataire_id, contenuMessage) {
        return await MessagePrivee.create({ expediteur_id, destinataire_id, contenuMessage });
    }

    async getMessagesBetween(expediteur_id, destinataire_id) {
      return await MessagePrivee.findAll({
          where: {
              [Op.or]: [
                { expediteur_id: expediteur_id, destinataire_id: destinataire_id },
                { expediteur_id: destinataire_id, destinataire_id: expediteur_id }
              ]
          },
          order: [['createdAt', 'ASC']],
      });
  }

  async getMessagesForUser(userId) {
      return await MessagePrivee.findAll({
          where: {
              [Op.or]: [
                  { expediteur_id: userId },
                  { destinataire_id: userId }
              ]
          },
          order: [['createdAt', 'DESC']],
      });
  }

  async getRecentDiscussionsWithMessages(userId) {
    try {
      // Récupérer les derniers messages échangés par l'utilisateur connecté
      const discussions = await MessagePrivee.findAll({
          where: {
              [Op.or]: [
                  { expediteur_id: userId },
                  { destinataire_id: userId }
              ]
          },
          attributes: [
              [Sequelize.fn('MAX', Sequelize.col('createdAt')), 'lastMessageDate'], 
              'expediteur_id', 
              'destinataire_id', 
              'contenuMessage'
          ],
          group: ['expediteur_id', 'destinataire_id'],  // Groupement par expéditeur et destinataire
          order: [[Sequelize.fn('MAX', Sequelize.col('createdAt')), 'DESC']], // Trier par date du dernier message
          raw: true
      });

      // Obtenir les IDs des utilisateurs ayant discuté avec l'utilisateur connecté
      const userIdsWithMessages = discussions.map(d => 
          d.expediteur_id === userId ? d.destinataire_id : d.expediteur_id
      );

      // Récupérer les détails des étudiants avec qui il y a eu des discussions
      const usersWithMessages = await Etudiant.findAll({
          where: {
              id: {
                  [Op.in]: userIdsWithMessages
              }
          },
          attributes: ['id', 'photo', 'username' , 'role'],
          raw: true
      });

      // Associer chaque étudiant avec son dernier message
      const usersWithLastMessages = usersWithMessages.map(user => {
          const lastMessage = discussions.find(d => 
              (d.expediteur_id === userId && d.destinataire_id === user.id) ||
              (d.expediteur_id === user.id && d.destinataire_id === userId)
          );
          return {
              ...user,
              lastMessage: lastMessage ? lastMessage.contenuMessage : null
          };
      });

      // Récupérer les étudiants qui n'ont pas encore discuté
      const usersWithoutMessages = await Etudiant.findAll({
          where: {
              id: {
                  [Op.notIn]: userIdsWithMessages
              }
          },
          attributes: ['id', 'photo', 'username'],
          order: [['username', 'ASC']],  // Trier par ordre alphabétique
          raw: true
      });

      // Retourner les deux listes
      return {
          discussionsRecentes: usersWithLastMessages,
          etudiantsRestants: usersWithoutMessages
      };
  } catch (error) {
      console.error('Erreur dans getRecentDiscussionsWithMessages:', error);
      throw error;
  }
}

}

module.exports = new MessagePriveeService();
