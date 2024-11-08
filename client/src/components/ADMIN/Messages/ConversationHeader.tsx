import { ArrowLeft, Phone, Video, MoreVertical } from 'lucide-react';
import { motion } from 'framer-motion';
import React from 'react';

import { Conversation } from './types';


interface ConversationHeaderProps {
  conversation: Conversation;
  onBack: () => void;
  onVideoCall?: (conversation: Conversation) => void; // Rendre onVideoCall optionnel
  isDarkMode: boolean; // Ajouter isDarkMode
}
const ConversationHeader: React.FC<ConversationHeaderProps> = ({
  conversation,
  onBack,
  onVideoCall, // Destructurer onVideoCall
  isDarkMode // Ajouter isDarkMode
}) => {
  const handleVideoCallStart = () => {
    // Vérifier si onVideoCall existe avant de l'appeler
    if (onVideoCall) {
      onVideoCall(conversation);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`
        px-4 py-3 flex items-center justify-between 
        ${isDarkMode
          ? 'bg-gray-900 border-gray-800'
          : 'bg-white border-gray-100'}
        border-b shadow-sm
      `}
    >
      <div className="flex items-center space-x-4">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft
            className={`
              cursor-pointer w-5 h-5
              ${isDarkMode
                ? 'text-gray-300 hover:text-white'
                : 'text-gray-600 hover:text-black'}
              transition-colors duration-300
            `}
            onClick={onBack}
          />
        </motion.div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={conversation.avatar}
              alt={conversation.sender}
              className={`
                w-10 h-10 rounded-full object-cover 
                ring-2
                ${isDarkMode
                  ? 'ring-gray-700 border-gray-800'
                  : 'ring-white border-gray-200'}
              `}
            />
            <div
              className="
                absolute bottom-0 right-0
                w-2.5 h-2.5
                bg-green-500
                rounded-full
                border-2
                border-white
              "
            />
          </div>
          <div>
            <h3
              className={`
                text-base font-semibold
                ${isDarkMode ? 'text-white' : 'text-gray-800'}
              `}
            >
              {conversation.sender}
            </h3>
            <p
              className={`
                text-xs font-medium
                ${isDarkMode
                  ? 'text-green-400'
                  : 'text-green-600'}
              `}
            >
              En ligne
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        {[
          { 
            Icon: Phone, 
            onClick: () => {/* Logique appel audio */} 
          },
          { 
            Icon: Video, 
            onClick: handleVideoCallStart // Utiliser la nouvelle méthode
          },
          { 
            Icon: MoreVertical, 
            onClick: () => {/* Options supplémentaires */} 
          }
        ].map(({ Icon, onClick }, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
          >
            <Icon
              className={`
                cursor-pointer w-5 h-5
                ${isDarkMode
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-600 hover:text-black'}
                transition-colors duration-300
              `}
              size={16}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
export default ConversationHeader;