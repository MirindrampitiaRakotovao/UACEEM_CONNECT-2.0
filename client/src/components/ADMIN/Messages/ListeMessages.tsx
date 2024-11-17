import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

import { useTheme } from '../../../context/ThemeContext';
import MessageItem from './MessageItem';
import { Message } from './types';


interface ListeMessagesProps {
  messages: Message[];
}
const ListeMessages: React.FC<{ 
  messages?: Message[]; 
  isDarkMode: boolean 
}> = ({ messages = [], isDarkMode }) => {
  return (
    <div className={`flex-1 overflow-y-auto p-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      {messages.length === 0 ? (
        <div className="text-center text-gray-500">
          Aucun message dans cette conversation
        </div>
      ) : (
        messages.map((message) => (
          <MessageItem 
            key={message.id} 
            message={message} 
            isDarkMode={isDarkMode} 
          />
        ))
      )}
    </div>
  );
};
export default ListeMessages;