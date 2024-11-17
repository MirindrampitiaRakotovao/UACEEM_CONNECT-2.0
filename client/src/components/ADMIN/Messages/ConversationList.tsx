import { UserCircle2 } from 'lucide-react';
import React from 'react';

import { ConversationListProps } from './types';


const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  selectedConversation,
  onSelectConversation,
  isDarkMode,
  searchTerm = ''
}) => {
  const filteredConversations = conversations.filter(conversation =>
    conversation.sender.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="h-full">
      {filteredConversations.length > 0 ? (
        filteredConversations.map(conversation => (
          <div
            key={conversation.id}
            onClick={() => onSelectConversation(conversation)}
            className={`
              p-4 cursor-pointer flex items-center space-x-3
              hover:bg-opacity-10 transition-colors
              ${selectedConversation?.id === conversation.id
                ? (isDarkMode ? 'bg-gray-700' : 'bg-gray-100')
                : ''}
              ${isDarkMode
                ? 'hover:bg-gray-700 border-gray-700'
                : 'hover:bg-gray-50 border-gray-100'}
              border-b
            `}
          >
            {conversation.avatar ? (
              <img
                src={conversation.avatar}
                alt={conversation.sender}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <UserCircle2
                className={`
                  w-10 h-10
                  ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}
                `}
              />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <h3 className={`
                  font-medium truncate
                  ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}
                `}>
                  {conversation.sender}
                </h3>
                <span className={`
                  text-xs
                  ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}
                `}>
                  {conversation.timestamp}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <p className={`
                  text-sm truncate
                  ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}
                `}>
                  {conversation.lastMessage}
                </p>
                {conversation.unreadCount && conversation.unreadCount > 0 && (
                  <span className="ml-2 px-2 py-1 text-xs bg-blue-500 text-white rounded-full">
                    {conversation.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className={`
          p-4 text-center
          ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}
        `}>
          Aucune conversation trouvée
        </div>
      )}
    </div>
  );
};
export default ConversationList;