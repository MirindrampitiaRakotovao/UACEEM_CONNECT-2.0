// src/components/GroupPostSection.tsx
import React from 'react';
import { Image, PackageOpen, CalendarDays } from 'lucide-react';
import { useDarkMode } from '../../contexts/DarkModeContext';

const GroupPostSection: React.FC = () => {
    const { isDarkMode } = useDarkMode();
  return (
    <div className={`p-4 mt-4 ${isDarkMode ? 'bg-gray-700 text-white-300' : 'bg-white text-gray-800'} rounded-lg shadow-lg`}>
      <div className="flex items-center space-x-4">
        <div className="flex-grow">
        <input
            type="text"
            placeholder="Que voulez-vous faire aujourd'hui ?"
            className={`w-[100%] pl-0 border rounded-full mb-1 ml-3 ${isDarkMode ? 'bg-gray-600 border-gray-500 text-white' : 'border-gray-300'}`}
            disabled
          />
        </div>
      </div>
      <div className="flex justify-around w-full">
          <div className="flex flex-col items-center">
            <Image className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-gray-700'}`} />
            <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>Photo / Vidéo</span>
          </div>
          <div className="flex flex-col items-center">
            <PackageOpen className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-gray-700'}`} />
            <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>Fichier</span>
          </div>
          <div className="flex flex-col items-center">
            <CalendarDays className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-gray-700'}`} />
            <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>Événement</span>
          </div>
        </div>
    </div>
  );
};

export default GroupPostSection;
