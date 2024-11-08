import { Search, MessageCircle, Filter, Plus, ArrowLeft } from "lucide-react";
import React, { useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTheme } from "../../../context/ThemeContext"; // Importation du hook du contexte de thème
import { ConversationSidebarProps } from './types';


const ConversationSidebar: React.FC<ConversationSidebarProps> = ({
  searchTerm = '',
  setSearchTerm,
  conversations,
  selectedConversation,
  onSelectConversation
}) => {
  const navigate = useNavigate(); // Hook de navigation
  const containerRef = useRef<HTMLDivElement>(null); // Référence pour la liste des conversations
  const { isDarkMode } = useTheme(); // Utilisation du contexte du thème

  // Filtrage des conversations en fonction du terme de recherche
  const filteredConversations = useMemo(() => {
    return conversations.filter(conversation => 
      conversation.sender?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [conversations, searchTerm]);

  // Retour à la page précédente
  const handleGoBack = () => {
    navigate(-1);
  };

  // Faire défiler la liste vers le haut lorsque le dernier message arrive
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0; // Défiler vers le haut
    }
  }, [conversations]); // On effectue le défilement chaque fois que la liste des conversations change

  return (
    <div className={`
      w-[383px] h-full flex flex-col
      ${isDarkMode ? 'bg-gradient-to-b from-[#2A3A53] to-[#252b53] text-white' : 'bg-gradient-to-b from-white to-gray-100 text-gray-800'}
      border-r ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}
    `}>
      {/* En-tête */}
      <div className={`
        px-4 py-3 flex items-center justify-between
        border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}
      `}>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleGoBack}
            className={`
              p-1.5 rounded-full transition-all duration-200
              ${isDarkMode 
                ? 'hover:bg-gray-800 text-gray-400 hover:text-gray-200' 
                : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'}
            `}
          >
            <ArrowLeft size={16} />
          </button>
          <MessageCircle 
            size={18} 
            className={isDarkMode ? 'text-[#FFAA00]' : 'text-[#2A3A53]'} 
          />
          <h1 className="text-sm font-semibold">Messages</h1>
        </div>
        <div className="flex items-center gap-1">
          <button className={`
            p-1.5 rounded-full transition-all duration-200
            ${isDarkMode 
              ? 'hover:bg-gray-800 text-gray-400 hover:text-gray-200' 
              : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'}
          `}>
            <Filter size={16} />
          </button>
          <button className={`
            p-1.5 rounded-full transition-all duration-200 
            ${isDarkMode 
              ? 'bg-[#FFAA00] hover:bg-[#FFAA00]/80 text-white' 
              : 'bg-[#FFAA00] hover:bg-[#FFAA00]/80 text-white'}
          `}>
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Barre de recherche */}
      <div className="p-3">
        <div className={`
          relative rounded-full
          ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}
        `}>
          <Search 
            className={`
              absolute left-3 top-1/2 transform -translate-y-1/2
              ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}
            `}
            size={16}
          />
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`
              w-full pl-9 pr-3 py-2 rounded-full text-sm
              focus:outline-none focus:ring-2 
              ${isDarkMode 
                ? 'bg-gray-800 text-white placeholder-gray-500 focus:ring-[#FFAA00]' 
                : 'bg-gray-100 text-gray-800 placeholder-gray-400 focus:ring-[#FFAA00]'}
            `}
          />
        </div>
      </div>

      {/* Liste des conversations */}
      <div 
        className="flex-1 overflow-y-auto"
        ref={containerRef} // Référence pour le scroll
      >
        {filteredConversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => onSelectConversation(conversation)}
            className={`
              px-4 py-3 flex items-center gap-2 cursor-pointer
              transition-colors duration-200
              ${selectedConversation?.id === conversation.id
                ? isDarkMode 
                  ? 'bg-[#FFAA00] text-black' 
                  : 'bg-[#FFAA00] text-black'
                : ''
              }
              ${isDarkMode 
                ? 'hover:bg-gray-800 border-gray-800' 
                : 'hover:bg-gray-50 border-gray-100'}
              border-b
            `}
          >
            <div className="relative">
              {conversation.avatar ? (
                <img
                  src={conversation.avatar}
                  alt={conversation.sender}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}
                `}>
                  <span className="text-sm font-medium">
                    {conversation.sender.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              {conversation.isOnline && (
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-0.5">
                <h3 className={`
                  text-sm font-medium truncate
                  ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}
                `}>
                  {conversation.sender}
                </h3>
                <time className={`
                  text-xs font-light
                  ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}
                `}>
                  {conversation.time}
                </time>
              </div>
              <p className={`
                text-xs truncate
                ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}
              `}>
                {conversation.lastMessage}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConversationSidebar;
