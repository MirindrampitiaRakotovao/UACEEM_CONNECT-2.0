import { Search, MessageCircle, Filter, Plus, ArrowLeft } from "lucide-react";
import React, { useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTheme } from "../../../context/ThemeContext";
import { ConversationSidebarProps } from './types';


const ConversationSidebar: React.FC<ConversationSidebarProps> = ({
  searchTerm = '',
  setSearchTerm,
  conversations,
  selectedConversation,
  onSelectConversation
}) => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useTheme();

  const filteredConversations = useMemo(() => {
    return conversations?.filter(conversation => 
      conversation.dernierMessage?.contenu.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conversation.interlocuteur?.nom.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];
  }, [conversations, searchTerm]);

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [conversations]);

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
        ref={containerRef}
      >
        {filteredConversations.map((conversation) => (
          <div 
            key={conversation.dernierMessage.id}
            className={`px-4 py-3 flex items-center justify-between border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}
            onClick={() => onSelectConversation(conversation)}
          >
            <div className="flex items-center gap-2">
              <img 
                src={`http://localhost:5000/${conversation.interlocuteur.photoProfil?.replace(/\\/g, '/')}`}
                alt={`${conversation.interlocuteur.nom} ${conversation.interlocuteur.prenom}`} 
                className="w-10 h-10 rounded-full object-cover" 
              />
              <div>
                <h2 className="text-sm font-semibold">{`${conversation.interlocuteur.nom} ${conversation.interlocuteur.prenom}`}</h2>
                <p className="text-xs text-gray-500">{conversation.dernierMessage.contenu}</p>
              </div>
            </div>
            <span className="text-xs text-gray-400">
              {new Date(conversation.dernierMessage.dateEnvoi).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConversationSidebar;