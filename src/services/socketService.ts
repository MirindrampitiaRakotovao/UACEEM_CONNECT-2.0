import { io, Socket } from 'socket.io-client';

class SocketService {
  private socket: Socket | null = null;

  public connect(token: string) {
    if (!this.socket) {
      this.socket = io('http://localhost:4000', {
        query: { token },
      });

      this.socket.on('connect', () => {
        console.log('Connecté au WebSocket');
      });

      this.socket.on('disconnect', () => {
        console.log('Déconnecté du WebSocket');
      });
    }
  }

  public disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  public onNewPublication(callback: (publication: any) => void) {
    if (this.socket) {
      this.socket.on('new-publication', callback);
    }
  }

  public emitNewPublication(publication: any) {
    if (this.socket) {
      this.socket.emit('create-publication', publication);
    }
  }
}

const socketService = new SocketService();
export default socketService;
