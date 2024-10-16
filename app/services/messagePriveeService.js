const MessagePrivee = require('../models/messagePrivees');
const { Op } = require('sequelize');

class MessagePriveeService {
    async sendMessage(expediteur_id, destinataire_id, contenuMessage) {
        return await MessagePrivee.create({ expediteur_id, destinataire_id, contenuMessage });
    }

    async getMessagesBetween(expediteur_id, destinataire_id) {
      return await MessagePrivee.findAll({
          where: {
              [Op.or]: [
                  { expediteur_id, destinataire_id },
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
}

module.exports = new MessagePriveeService();
