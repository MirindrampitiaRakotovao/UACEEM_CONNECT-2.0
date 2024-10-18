import React, { useEffect, useState , useRef} from 'react';
import axios from 'axios';
import Avatar from '../avatar';
import { SendHorizonal ,Smile} from 'lucide-react';
import EmojiPicker , { EmojiClickData } from 'emoji-picker-react';


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
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Ref pour le conteneur de l'emoji picker
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

  // Fonction pour ajouter un emoji 
  const handleEmojiClick = (emojiObject: EmojiClickData) => {
    setNewMessage((prev) => prev + emojiObject.emoji);
  };

  // Fonction pour détecter le clic en dehors du sélecteur d'emojis
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
    <div className="flex flex-col bg-gray-50 h-screen">
      {/* Header de la conversation */}
      <div className="flex items-center justify-between p-4 border-b border-gray-300 bg-white sticky top-0 z-10">
        <div className="flex items-center space-x-2">
        <Avatar userId={user.id} size="w-10 h-10" />
          <span className="font-bold">{user.username}</span>
        </div>
      </div>

      {/* Liste des messages */}
      <div className="flex-1 p-2 space-y-4 overflow-y-auto bg-gray-50 ">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.destinataire_id === user.id ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg p-2 border  ${
                message.expediteur_id === user.id ? 'bg-gray-200 text-black' : 'bg-blue-500 text-white'
              }`}
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
      <div className="sticky bottom-0 flex items-center p-5 border-t border-gray-300 bg-white">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Écrivez un message..."
          className="flex-1 w-full p-2  mr-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
         <div className="relative">
          <Smile 
            size={35} 
            className="text-gray-500 hover:text-blue-500 cursor-pointer" 
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          />
          {showEmojiPicker && (
            <div
              className="emoji-picker-container absolute bottom-full mb-2 right-0"
              ref={emojiPickerRef}
              onMouseLeave={() => setShowEmojiPicker(false)}
            >
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>
        <SendHorizonal
          onClick={handleSendMessage} 
          className="text-gray-500 hover:text-blue-500 cursor-pointer"
          size={35}
        />
      </div>
    </div>
  );
};

export default ChatWindow;
