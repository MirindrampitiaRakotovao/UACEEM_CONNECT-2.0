import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Avatar from '../avatar';

interface Message {
  id: number;
  expediteur_id: number;
  destinataire_id: number;
  contenuMessage: string;
  createdAt: string;
}

interface ChatWindowProps {
  user: {
    id: number;
    username: string;
    photo?: string;
    role?: string;
  };
}


const ChatWindow: React.FC<ChatWindowProps> = ({ user }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/messagePrivee/me/${user.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setMessages(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des messages:', error);
      }
    };

    fetchMessages();
  }, [user.id]);  // Charger les messages lorsque l'utilisateur change

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      try {
        await axios.post(
          'http://localhost:4000/messagePrivee',
          { destinataire_id: user.id, contenuMessage: newMessage },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setNewMessage('');
        // Recharger les messages après l'envoi
        const response = await axios.get(`http://localhost:4000/messagePrivee/me/${user.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setMessages(response.data);
      } catch (error) {
        console.error('Erreur lors de l\'envoi du message:', error);
      }
    }
  };

  return (
    <div className="flex flex-col bg-gray-50 h-screen">
      {/* Header de la conversation */}
      <div className="flex items-center justify-between p-4 border-b border-gray-300 bg-white sticky top-0 z-10">
        <div className="flex items-center space-x-2">
        <Avatar userId={user.id} size="w-10 h-10" />
          <span className="font-bold">{user.username}</span>
        </div>
      </div>

      {/* Liste des messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`max-w-xs p-3 rounded-lg ${
              message.expediteur_id === user.id ? 'self-start bg-gray-200' : 'self-end bg-blue-500 text-white'
            }`}
          >
            <p>{message.contenuMessage}</p>
            <span className="text-xs text-gray-500">{new Date(message.createdAt).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>

      {/* Saisie de message */}
      <div className="sticky bottom-0 flex items-center p-4 border-t border-gray-300 bg-white">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Écrivez un message..."
          className="flex-1 p-2 rounded-lg bg-gray-200 focus:outline-none"
        />
        <button onClick={handleSendMessage} className="ml-2 bg-blue-500 p-2 rounded-lg text-white">
          Envoyer
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
