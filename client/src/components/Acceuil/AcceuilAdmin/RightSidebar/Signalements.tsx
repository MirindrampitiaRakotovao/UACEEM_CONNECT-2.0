import React from 'react';
import { useTheme } from '../../../../context/ThemeContext'; // Assurez-vous d'importer votre contexte de thème

const SignalementCard = ({ color, message, isDarkMode }) => (
  <div className={`rounded-lg shadow-sm p-3 mb-2 flex items-start border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
    <div className={`w-3 h-3 rounded-full mt-1 mr-3 flex-shrink-0 ${color}`}></div>
    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{message}</p>
  </div>
);

const Signalements = () => {
  const { isDarkMode } = useTheme(); // Récupérer le mode sombre à partir du contexte

  const signalements = [
    { color: 'bg-red-500', message: 'Lorem ipsum dolor sit amet. Et possimus eveniet quo' },
    { color: 'bg-orange-500', message: 'Lorem ipsum dolor sit amet. Et possimus eveniet quo' },
    { color: 'bg-yellow-500', message: 'Lorem ipsum dolor sit amet. Et possimus eveniet quo' },
  ];

  return (
    <div className={`rounded-lg p-4 mt-4`}>
      <h2 className={`font-bold text-lg mb-3 ${isDarkMode ? 'text-white' : 'text-black'}`}>Signalements</h2>
      {signalements.map((signalement, index) => (
        <SignalementCard key={index} {...signalement} isDarkMode={isDarkMode} /> // Passer isDarkMode à SignalementCard
      ))}
      <a href="#" className={`text-blue-500 text-sm hover:underline ${isDarkMode ? 'text-blue-400' : ''}`}>Gérer...</a>
    </div>
  );
};

export default Signalements;
