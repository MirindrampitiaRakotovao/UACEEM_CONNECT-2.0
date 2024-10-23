import React from 'react';
import { useDarkMode } from '../../contexts/DarkModeContext';
import groupImage from '../../assets/saryGroupeee.jpeg';  // Importation directe de l'image

interface GroupHeaderProps {
  groupName: string;
  privacy: string;
  membersCount: number;
}

const GroupHeader: React.FC<GroupHeaderProps> = ({ groupName, privacy, membersCount }) => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className="relative w-auto h-64 mb-4">
      {/* Image de couverture */}
      <img 
        src={groupImage}  // Utilisation de l'image importée
        alt="Group cover"
        className="w-full h-full object-cover rounded-lg"
      />
      
      {/* Overlay pour le texte */}
      <div className={`absolute inset-0 flex flex-col justify-end p-4 bg-opacity-50 rounded-lg ${isDarkMode ? 'bg-black text-white' : 'bg-white text-gray-800'}`}>
        <h1 className="text-2xl font-bold">{groupName}</h1>
        <p className="text-sm text-gray-400">{privacy} · {membersCount} membre(s)</p>
      </div>
    </div>
  );
};

export default GroupHeader;
