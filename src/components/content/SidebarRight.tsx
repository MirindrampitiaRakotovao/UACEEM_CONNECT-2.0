import React from 'react';
import { useDarkMode } from '../../contexts/DarkModeContext'; // Import the dark mode context

const SidebarRight: React.FC = () => {
  const { isDarkMode } = useDarkMode(); // Get the dark mode state

  return (
    <div className={`max-w-sm shadow-lg rounded-lg overflow-hidden mx-auto my-4 p-6 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-700'}`}>
      {/* Signalements Section */}
      <div>
        <h2 className="text-lg font-bold mb-4">Signalements</h2>
        <ul className="space-y-3">
          <li className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Lorem ipsum dolor sit amet.</li>
          <li className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Lorem ipsum dolor sit amet.</li>
          <li className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Lorem ipsum dolor sit amet.</li>
        </ul>
      </div>

      {/* Groupes Section */}
      <div className="mt-10">
        <h2 className="text-lg font-bold mb-4">Groupes</h2>
        <ul className="space-y-3">
          <li className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Nom du groupe</li>
          <li className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Nom du groupe</li>
          <li className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Nom du groupe</li>
        </ul>
      </div>

      {/* Contacts Section */}
      <div className="mt-10">
        <h2 className="text-lg font-bold mb-4">Contacts</h2>
        <ul className="space-y-3">
          <li className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Nom d'utilisateur</li>
          <li className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Nom d'utilisateur</li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarRight;
