// socketService.ts
import io, { Socket } from 'socket.io-client';
import Cookies from 'js-cookie';


class SocketService {
  private socket: Socket | null = null;
  private userId: string | null = null;
  connect(userId: string) {
    // Récupérer le token depuis les cookies
    const token = Cookies.get('token');
    
    if (!token) {
      console.error('Aucun token trouvé');
      return null;
    }
    try {
      this.socket = io('http://localhost:5000', { 
        auth: {
          token: token
        },
        query: { 
          userId: userId
        }
      });
      // Gestion des événements de connexion
      this.socket.on('connect', () => {
        console.log('Connecté au socket avec succès');
        this.userId = userId;
      });
      this.socket.on('connect_error', (error) => {
        console.error('Erreur de connexion socket:', error);
        this.handleConnectionError(error);
      });
      this.socket.on('disconnect', (reason) => {
        console.log('Socket déconnecté:', reason);
      });
      return this.socket;
    } catch (error) {
      console.error('Erreur lors de la connexion socket:', error);
      return null;
    }
  }
  private handleConnectionError(error: any) {
    // Gestion spécifique des erreurs de connexion
    if (error.message.includes('Token invalide') || error.message.includes('Non authentifié')) {
      // Déconnexion et redirection
      this.disconnect();
      window.location.href = '/';
    }
  }
  // Envoi de message
  sendMessage(messageData: {
    destinataireId: string, 
    contenu: string, 
    type?: string,
    conversationId?: string
  }) {
    if (!this.socket || !this.userId) {
      console.error('Socket non connecté ou userId manquant');
      return;
    }
    this.socket.emit('send_message', {
      ...messageData,
      expediteurId: this.userId
    });
  }
  // Écoute des nouveaux messages
  onNewMessage(callback: (message: any) => void) {
    if (!this.socket) return;
    
    this.socket.on('new_message', (message) => {
      console.log('Nouveau message reçu:', message);
      callback(message);
    });
  }
  // Marquer un message comme lu
  markMessageAsRead(messageId: string, expediteurId: string) {
    if (!this.socket) return;
    
    this.socket.emit('message_lu', { 
      messageId, 
      expediteurId 
    });
  }
  // Déconnexion
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.userId = null;
    }
  }
  // Vérifier la connexion
  isConnected(): boolean {
    return !!this.socket && this.socket.connected;
  }
  // Récupérer l'ID de l'utilisateur connecté
  getUserId(): string | null {
    return this.userId;
  }
}
export default new SocketService();