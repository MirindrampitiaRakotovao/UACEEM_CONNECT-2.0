import React from 'react';
import { useDarkMode } from '../../contexts/DarkModeContext';

const GroupTabs: React.FC = () => {
    const { isDarkMode } = useDarkMode();
  return (
    <div className="flex justify-around w-full">
      <div className="flex flex-col items-center">
        <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>À propos / Vidéo</span>
      </div>
      <div className="flex flex-col items-center">
        <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>Membres</span>
      </div>
      <div className="flex flex-col items-center">
        <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>Événement</span>
      </div>
      <div className="flex flex-col items-center">
        <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>Contenu multimédia</span>
      </div>
      <div className="flex flex-col items-center">
        <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>Fichiers</span>
      </div>
  </div>

  );
};

export default GroupTabs;
