// src/components/GroupPostSection.tsx
import React from 'react';
import {  Smile, User } from 'lucide-react';
import { useDarkMode } from '../../contexts/DarkModeContext';

const GroupPostSection: React.FC = () => {
    const { isDarkMode } = useDarkMode();
  return (
    <div className={`p-4 mt-4 ${isDarkMode ? 'bg-gray-700 text-white-300' : 'bg-white text-gray-800'} rounded-lg shadow-lg`}>
      <div className="flex items-center space-x-4">
        <div className="flex-grow">
          <input 
            type="text" 
            className="w-full p-2 rounded-lg border border-gray-300"
            placeholder="Que voulez-vous dire ?" 
          />
        </div>
      </div>
      <div className="flex items-center mt-4 space-x-4">
        <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500">
          
          <span>Photo / vidéo</span>
        </button>
        <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500">
          <User />
          <span>Identifier des personnes</span>
        </button>
        <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500">
          <Smile />
          <span>Feeling / activité</span>
        </button>
      </div>
    </div>
  );
};

export default GroupPostSection;
