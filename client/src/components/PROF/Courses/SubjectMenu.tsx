import { Book, Calculator, FlaskConical, Globe } from 'lucide-react';
import React from 'react';

import { useTheme } from '../../../context/ThemeContext'; // Assurez-vous que le chemin est correct


// Assurez-vous que le chemin est correct
const SubjectMenu = ({ SUBJECTS, activeSubject, setActiveSubject }) => {
  const { isDarkMode } = useTheme();
  // Fonction pour obtenir l'icône correspondante
  const getIcon = (subjectName) => {
    const iconProps = { size: 14, strokeWidth: 2 }; // Taille réduite des icônes
    switch (subjectName.toLowerCase()) {
      case 'math':
        return <Calculator {...iconProps} />;
      case 'science':
        return <FlaskConical {...iconProps} />;
      case 'history':
        return <Globe {...iconProps} />;
      default:
        return <Book {...iconProps} />;
    }
  };
  return (
    <div className="relative mb-6">
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-2">
        {SUBJECTS.map((subject) => (
          <button
            key={subject.id}
            onClick={() => setActiveSubject(subject.id)}
            className={`
              relative px-3 py-1.5 
              font-medium text-xs
              rounded-md
              transition-all duration-200
              transform hover:scale-105
              ${
                activeSubject === subject.id
                  ? isDarkMode
                    ? 'bg-gradient-to-r from-[#FFAA00] to-[#FFB833] text-gray-900 shadow-sm shadow-[#FFAA00]/30'
                    : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-sm shadow-blue-500/30'
                  : isDarkMode
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }
            `}
          >
            <div className="flex items-center gap-1">
              {getIcon(subject.name)}
              <span>{subject.name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
export default SubjectMenu;