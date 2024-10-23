import React from 'react';
import { useDarkMode } from '../../contexts/DarkModeContext';

const GroupTabs: React.FC = () => {
    const { isDarkMode } = useDarkMode();
  return (
    <div 
        className={ `mt-4 p-4 rounded-md ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
      <ul className="flex space-x-4 border-b">
        <li className={isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-800 hover:text-black'}>À propos</li>
        <li className={isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-800 hover:text-black'}>Publications</li>
        <li className={isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-800 hover:text-black'}>Membres</li>
        <li className={isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-800 hover:text-black'}>Événements</li>
      </ul>
    </div>
  );
};

export default GroupTabs;
