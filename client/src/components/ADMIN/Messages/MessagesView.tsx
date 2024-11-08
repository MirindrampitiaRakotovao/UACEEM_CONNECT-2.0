import React, { useState } from 'react';

import { useTheme } from '../../../context/ThemeContext'; // Importation du contexte pour gérer le mode sombre
import ConversationSidebar from './ConversationSidebar';
import VideoCallInterface from './VideoCallInterface';
import ConversationHeader from './ConversationHeader';
import { Conversation, Message } from './types';
import ListeMessages from './ListeMessages';
import MessageInput from './MessageInput';


const MessagesView: React.FC = () => {
  const { isDarkMode } = useTheme(); // Utilisation du hook useTheme pour récupérer le mode sombre
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 1,
      sender: 'John Doe',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      lastMessage: 'On se voit demain pour la réunion ?',
      timestamp: '14:30',
      unreadCount: 2,
      messages: [
        {
          id: 1,
          content: 'Salut, comment vas-tu ?',
          timestamp: '14:30',
          isMe: false,
          type: 'text'
        },
        {
          id: 2,
          content: 'Très bien, merci !',
          timestamp: '14:35',
          isMe: true,
          type: 'text'
        },
        {
          id: 3,
          content: 'https://example.com/image.jpg',
          timestamp: '14:36',
          isMe: false,
          type: 'image',
          metadata: {
            imageUrl: 'https://picsum.photos/400/300'
          }
        },
        {
          id: 4,
          content: 'On se voit demain pour la réunion ?',
          timestamp: '14:38',
          isMe: false,
          type: 'text'
        }
      ]
    },
    {
      id: 2,
      sender: 'Alice Smith',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      lastMessage: 'Voici le document demandé',
      timestamp: '13:15',
      unreadCount: 1,
      messages: [
        {
          id: 1,
          content: 'rapport-final.pdf',
          timestamp: '13:10',
          isMe: false,
          type: 'file',
          metadata: {
            fileName: 'rapport-final.pdf',
            fileSize: '2.5MB',
            fileType: 'application/pdf'
          }
        },
        {
          id: 2,
          content: 'Voici le document demandé',
          timestamp: '13:15',
          isMe: false,
          type: 'text'
        }
      ]
    },
    {
      id: 3,
      sender: 'Marie Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
      lastMessage: 'Message vocal reçu',
      timestamp: '12:45',
      unreadCount: 0,
      messages: [
        {
          id: 1,
          content: 'https://example.com/audio.webm',
          timestamp: '12:45',
          isMe: true,
          type: 'voice',
          metadata: {
            duration: 30,
            totalDuration: 30
          }
        }
      ]
    },
    {
      id: 4,
      sender: 'David Wilson',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
      lastMessage: 'Photos du projet',
      timestamp: '11:20',
      unreadCount: 3,
      messages: [
        {
          id: 1,
          content: 'Voici les photos du projet',
          timestamp: '11:15',
          isMe: false,
          type: 'text'
        },
        {
          id: 2,
          content: 'https://example.com/image1.jpg',
          timestamp: '11:18',
          isMe: false,
          type: 'image',
          metadata: {
            imageUrl: 'https://picsum.photos/400/300'
          }
        },
        {
          id: 3,
          content: 'https://example.com/image2.jpg',
          timestamp: '11:20',
          isMe: false,
          type: 'image',
          metadata: {
            imageUrl: 'https://picsum.photos/401/301'
          }
        }
      ]
    },
    {
      id: 5,
      sender: 'Sarah Brown',
      avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
      lastMessage: 'Présentation mise à jour',
      timestamp: '10:05',
      unreadCount: 0,
      messages: [
        {
          id: 1,
          content: 'presentation.pptx',
          timestamp: '10:05',
          isMe: false,
          type: 'file',
          metadata: {
            fileName: 'presentation.pptx',
            fileSize: '5.8MB',
            fileType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
          }
        }
      ]
    },
    {
      id: 6,
      sender: 'Team Project',
      avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
      lastMessage: 'Réunion à 15h',
      timestamp: '09:30',
      unreadCount: 5,
      messages: [
        {
          id: 1,
          content: 'Réunion à 15h',
          timestamp: '09:30',
          isMe: false,
          type: 'text'
        },
        {
          id: 2,
          content: 'agenda.pdf',
          timestamp: '09:32',
          isMe: false,
          type: 'file',
          metadata: {
            fileName: 'agenda.pdf',
            fileSize: '1.2MB',
            fileType: 'application/pdf'
          }
        }
      ]
    }
  ]);

  const handleVideoCall = (conversation: Conversation) => {
    // Initialisation d'appel vidéo
    setIsVideoCallActive(true);
  };
  const handleCloseVideoCall = () => {
    setIsVideoCallActive(false);
  };
  
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fonction pour envoyer un message
  const handleSendMessage = (
    messageContent: string, 
    type: MessageType = 'text', 
    metadata?: any
  ) => {
    if (!selectedConversation) return;
    const newMsg: Message = {
      id: selectedConversation.messages.length + 1,
      content: messageContent,
      type,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
      metadata
    };
    const updatedConversations = conversations.map(conv =>
      conv.id === selectedConversation.id
        ? {
            ...conv,
            messages: [...conv.messages, newMsg],
            lastMessage: type === 'text' ? messageContent : `${type} message`,
            timestamp: newMsg.timestamp
          }
        : conv
    );
    setConversations(updatedConversations);
    setSelectedConversation({
      ...selectedConversation,
      messages: [...selectedConversation.messages, newMsg],
      lastMessage: type === 'text' ? messageContent : `${type} message`,
      timestamp: newMsg.timestamp
    });
  };

  return (
    <div className={`
      flex h-screen 
      ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}
    `}>
      <div 
        className={`
          w-96 border-r overflow-hidden 
          ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}
        `}
      >
        <ConversationSidebar
          isDarkMode={isDarkMode}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          conversations={conversations}
          selectedConversation={selectedConversation}
          onSelectConversation={setSelectedConversation}
        />
      </div>
  
      {/* Zone de conversation avec padding/marge */}
      <div className="flex-1 flex flex-col"> 
        {selectedConversation ? (
          <>
            <ConversationHeader
              conversation={selectedConversation}
              isDarkMode={isDarkMode}
              onBack={() => setSelectedConversation(null)}
            />
            <ListeMessages
              messages={selectedConversation.messages}
              isDarkMode={isDarkMode}
            />
            <MessageInput
              isDarkMode={isDarkMode}
              onSendMessage={handleSendMessage}
            />
          </>
        ) : (
          <div className={`
            flex-1 flex items-center justify-center text-center 
            ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-700'}
          `}>
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                Sélectionnez une conversation
              </h2>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Choisissez une conversation dans la liste pour commencer à discuter
              </p>
            </div>
          </div>
        )}
      </div>
      {/* Afficher l'interface d'appel vidéo si active */}
      {isVideoCallActive && selectedConversation && (
        <VideoCallInterface
          conversation={selectedConversation}
          onClose={handleCloseVideoCall}
        />
      )}
    </div>
  );
};

export default MessagesView;
