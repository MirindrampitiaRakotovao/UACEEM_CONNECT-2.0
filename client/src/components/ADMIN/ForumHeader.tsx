// src/components/ForumHeader.tsx
import { Plus, Search, MessageSquareText } from 'lucide-react';
import React from 'react';

import { useTheme } from '../../context/ThemeContext';


interface ForumHeaderProps {
  setIsModalOpen: (state: boolean) => void;
}
const ForumHeader: React.FC<ForumHeaderProps> = ({ setIsModalOpen }) => {
  const { isDarkMode } = useTheme();
  return (
    <div className={`
      p-4 rounded-lg shadow-md mb-4
      ${isDarkMode 
        ? 'bg-gray-800 text-white' 
        : 'bg-white text-gray-800'}
      transition-colors duration-200
    `}>
      <div className="flex flex-col md:flex-row justify-between items-center gap-3">
        <div className="flex-1 w-full">
          <div className="flex items-center gap-2 mb-1">
            <MessageSquareText 
              size={16} 
              className={isDarkMode ? 'text-blue-400' : 'text-blue-500'} 
            />
            <h1 className="text-xl font-bold">
              Forum Tech
            </h1>
          </div>
          <p className={`text-xs ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Explorez et partagez vos connaissances technologiques
          </p>
        </div>
        
        <div className="flex w-full md:w-auto gap-2">
          <div className="relative flex-1 md:flex-initial">
            <input
              type="text"
              placeholder="Rechercher un sujet..."
              className={`
                w-full md:w-48 pl-8 pr-3 py-1.5 text-xs rounded-full
                focus:outline-none focus:ring-1 focus:ring-blue-400
                transition-all duration-200
                ${isDarkMode 
                  ? 'bg-gray-700 focus:bg-gray-600 text-white placeholder-gray-400' 
                  : 'bg-gray-100 focus:bg-white text-gray-800 placeholder-gray-500'}
              `}
            />
            <Search 
              className={`
                absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5
                ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}
              `}
            />
          </div>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className={`
              px-3 py-1.5 rounded-full text-xs font-medium
              flex items-center gap-1.5
              bg-gradient-to-r from-blue-500 to-purple-500
              text-white shadow
              hover:from-blue-600 hover:to-purple-600
              active:shadow-inner
              transition-all duration-200
            `}
          >
            <Plus size={12} />
            Nouveau forum
          </button>
        </div>
      </div>
    </div>
  );
};
export default ForumHeader;