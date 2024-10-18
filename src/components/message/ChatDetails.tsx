import React from 'react';
import { useDarkMode } from '../../contexts/DarkModeContext'; // Assurez-vous que l'import est correct

const ChatDetails = () => {
  const { isDarkMode } = useDarkMode(); // Utilisez le hook pour récupérer l'état du mode sombre

  return (
    <div
      className={`max-w-sm shadow-lg rounded-lg overflow-hidden mx-auto my-4 p-6 ${
        isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'
      }`}
    >
      <div className="flex flex-col items-center mb-4">
        <img src="https://via.placeholder.com/80" alt="avatar" className="w-16 h-16 rounded-full mb-2" />
        <span className="font-bold">Nom d'utilisateur</span>
        <button className="text-sm text-gray-500">Profil</button>
      </div>
      <div className="space-y-4">
        <button className={`w-full text-left p-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
          Mettre en sourdine
        </button>
        <button className={`w-full text-left p-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
          Personnaliser la discussion
        </button>
        <button className={`w-full text-left p-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
          Fichiers et médias
        </button>
      </div>
    </div>
  );
};

export default ChatDetails;
