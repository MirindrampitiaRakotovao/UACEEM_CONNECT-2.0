import React, { useState, useEffect } from 'react';

import { useTheme } from '../../../context/ThemeContext';
import ConversationSidebar from './ConversationSidebar';
import ConversationHeader from './ConversationHeader';
import { Conversation, Message } from './types';
import apiService from '../../../services/api';
import ListeMessages from './ListeMessages';
import MessageInput from './MessageInput';


const MessagesView: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const fetchConversations = async () => {
    try {
      const response = await apiService.get('/conversations');
      const conversationsData = response.conversations || (response.data && response.data.conversations);
      if (conversationsData && conversationsData.length > 0) {
        setConversations(conversationsData);
      } else {
        console.error('Aucune conversation trouvée', response);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des conversations:', error);
    }
  };

  const fetchMessages = async (destinataireId: string) => {
    try {
      const response = await apiService.get(`/messages/${destinataireId}`);
      console.log('Réponse de l\'API pour les messages:', response);
      
      const messagesData = Array.isArray(response) ? response : [];
      console.log('Données des messages:', messagesData);
      
      if (messagesData.length > 0) {
        setMessages(messagesData);
        setSelectedConversation(prevConversation => {
          if (!prevConversation) return null;
          return {
            ...prevConversation,
            messages: messagesData
          };
        });
      } else {
        console.error('Aucun message trouvé pour cette conversation', response);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des messages:', error);
    }
  };

  const handleNewMessage = async (newMessage: Message) => {
    if (!selectedConversation) return;
    // Mise à jour des messages
    setMessages(prevMessages => [...prevMessages, newMessage]);
    // Mise à jour de la conversation sélectionnée
    setSelectedConversation(prevConversation => {
      if (!prevConversation) return null;
      return {
        ...prevConversation,
        messages: [...prevConversation.messages, newMessage],
        lastMessage: newMessage.contenu,
        timestamp: new Date(newMessage.dateEnvoi).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        }),
      };
    });
    // Mise à jour de la liste des conversations
    setConversations(prevConversations =>
      prevConversations.map(conv =>
        conv.id === selectedConversation.id
          ? {
              ...conv,
              lastMessage: newMessage.contenu,
              timestamp: new Date(newMessage.dateEnvoi).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              }),
            }
          : conv
      )
    );
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  const handleSelectConversation = (conversation: Conversation) => {
    console.log('Conversation sélectionnée:', conversation);
    
    const updatedConversation = {
      ...conversation,
      messages: [],
      interlocuteur: conversation.interlocuteur || 
        (conversation.destinataire?.id === conversation.interlocuteur?.id 
          ? conversation.expediteur 
          : conversation.destinataire)
    };
    
    setSelectedConversation(updatedConversation);
    fetchMessages(conversation.interlocuteur.id || conversation.destinataire.id);
  };

  const handleSendMessage = (messageContent: string, type: 'text' | 'image' | 'video' = 'text', metadata?: any) => {
    if (!selectedConversation) return;

    const newMsg: Message = {
      id: selectedConversation.messages.length + 1,
      content: messageContent,
      type,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
      metadata,
    };

    const updatedConversations = conversations.map(conv =>
      conv.id === selectedConversation.id
        ? {
            ...conv,
            messages: [...conv.messages, newMsg],
            lastMessage: type === 'text' ? messageContent : `${type} message`,
            timestamp: newMsg.timestamp,
          }
        : conv
    );

    setConversations(updatedConversations);
    setSelectedConversation({
      ...selectedConversation,
      messages: [...selectedConversation.messages, newMsg],
      lastMessage: type === 'text' ? messageContent : `${type} message`,
      timestamp: newMsg.timestamp,
    });
  };

  return (
    <div className={`flex h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className={`w-96 border-r overflow-hidden ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
        <ConversationSidebar
          isDarkMode={isDarkMode}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          conversations={conversations}
          selectedConversation={selectedConversation}
          onSelectConversation={handleSelectConversation}
        />
      </div>
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
              destinataireId={selectedConversation.interlocuteur.id || selectedConversation.destinataire.id}
              conversationId={selectedConversation.id}
              onMessageSent={handleNewMessage}
            />
          </>
        ) : (
          <div className={`flex-1 flex items-center justify-center text-center ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-700'}`}>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Sélectionnez une conversation</h2>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Choisissez une conversation dans la liste pour commencer à discuter
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesView;