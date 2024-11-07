import { Heart, MessageCircle, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import React from 'react';

import { useTheme } from '../../context/ThemeContext';


interface Reply {
  id: number;
  author: string;
  avatar: string;
  date: string;
  content: string;
  likes: number;
}
interface ForumRepliesProps {
  replies: Reply[];
}
const ForumReplies: React.FC<ForumRepliesProps> = ({ replies }) => {
  const { isDarkMode } = useTheme();
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-3 space-y-2"
    >
      {replies.map(reply => (
        <motion.div
          key={reply.id}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className={`
            ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}
            rounded-lg p-3 shadow-sm
          `}
        >
          <div className="flex items-center space-x-2 mb-1.5">
            <img 
              src={reply.avatar}
              alt={reply.author}
              className="w-6 h-6 rounded-full border border-blue-400"
            />
            <div>
              <h3 className={`
                text-xs font-medium
                ${isDarkMode ? 'text-white' : 'text-gray-800'}
              `}>
                {reply.author}
              </h3>
              <span className={`
                text-[10px]
                ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}
              `}>
                {reply.date}
              </span>
            </div>
          </div>
          <p className={`
            text-xs mb-2
            ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}
          `}>
            {reply.content}
          </p>
          <div className="flex items-center space-x-3">
            <button
              className={`
                flex items-center space-x-1
                ${isDarkMode 
                  ? 'text-gray-400 hover:text-pink-400' 
                  : 'text-gray-600 hover:text-pink-500'}
                transition-colors duration-200
              `}
            >
              <Heart size={12} />
              <span className="text-[10px]">{reply.likes}</span>
            </button>
            <button
              className={`
                flex items-center space-x-1
                ${isDarkMode 
                  ? 'text-gray-400 hover:text-blue-400' 
                  : 'text-gray-600 hover:text-blue-500'}
                transition-colors duration-200
              `}
            >
              <MessageCircle size={12} />
              <span className="text-[10px]">Répondre</span>
            </button>
          </div>
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className={`
          flex items-center space-x-2
          ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}
          rounded-lg p-2 shadow-sm
        `}
      >
        <input
          type="text"
          placeholder="Ajouter une réponse..."
          className={`
            flex-grow text-xs px-3 py-1.5 rounded-full
            focus:outline-none focus:ring-1 focus:ring-blue-400
            transition-all duration-200
            ${isDarkMode 
              ? 'bg-gray-600 text-white placeholder-gray-400' 
              : 'bg-white text-gray-800 placeholder-gray-500'}
          `}
        />
        <button
          className="
            p-1.5 rounded-full 
            bg-blue-500 text-white 
            hover:bg-blue-600 
            transition-colors duration-200
          "
        >
          <Send size={14} />
        </button>
      </motion.div>
    </motion.div>
  );
};
export default ForumReplies;