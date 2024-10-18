import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Avatar from '../avatar';
import { SendHorizonal, Smile } from 'lucide-react';
import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react';
import { useDarkMode } from '../../contexts/DarkModeContext'; // Import du hook pour le mode sombre

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
  const { isDarkMode } = useDarkMode(); // Utilisation du hook pour obtenir l'état du mode sombre
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement | null>(null);

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
  }, [user.id]);

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

  const handleEmojiClick = (emojiObject: EmojiClickData) => {
    setNewMessage((prev) => prev + emojiObject.emoji);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false);
      }
    };

    if (showEmojiPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmojiPicker]);

  return (
    <div className={`flex flex-col h-screen ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-50 text-black'}`}>
      {/* Header de la conversation */}
      <div className={`flex items-center justify-between p-4 border-b ${isDarkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-300 bg-white'} sticky top-0 z-10`}>
        <div className="flex items-center space-x-2">
          <Avatar userId={user.id} size="w-10 h-10" />
          <span className="font-bold">{user.username}</span>
        </div>
      </div>

      {/* Liste des messages */}
      <div className={`flex-1 p-2 space-y-4 overflow-y-auto ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.destinataire_id === user.id ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg p-2 border ${message.expediteur_id === user.id ? (isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black') : (isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')}`}
            >
              <p>{message.contenuMessage}</p>
              <span className="text-xs text-gray-500">
                {new Date(message.createdAt).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Saisie de message */}
      <div className={`sticky bottom-0 flex items-center p-5 border-t ${isDarkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-300 bg-white'}`}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Écrivez un message..."
          className={`flex-1 w-full p-2 mr-2 border rounded-full focus:outline-none ${isDarkMode ? 'bg-gray-700 text-white border-gray-600 focus:ring-2 focus:ring-blue-500' : 'bg-white text-black border-gray-300 focus:ring-2 focus:ring-blue-500'}`}
        />
        <div className="relative">
          <Smile
            size={35}
            className={`cursor-pointer ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-blue-500'}`}
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          />
          {showEmojiPicker && (
            <div
              className="emoji-picker-container absolute bottom-full mb-2 right-0"
              ref={emojiPickerRef}
              onMouseLeave={() => setShowEmojiPicker(false)}
            >
              <EmojiPicker 
                onEmojiClick={handleEmojiClick} 
                theme={isDarkMode ? Theme.DARK : Theme.LIGHT}
              />
            </div>
          )}
        </div>
        <SendHorizonal
          onClick={handleSendMessage}
          className={`cursor-pointer ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-blue-500'}`}
          size={35}
        />
      </div>
    </div>
  );
};

export default ChatWindow;
