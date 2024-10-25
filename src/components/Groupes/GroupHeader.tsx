import React from 'react';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { Image, PackageOpen, CalendarDays } from 'lucide-react';
import GroupTabs from './GroupTabs';   
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
      <div className={` p-10 bg-opacity-50 rounded-lg ${isDarkMode ? 'bg-black text-white' : 'bg-white text-gray-800'}`}>
        <h1 className="text-2xl font-bold">{groupName}</h1>
        <p className="text-sm text-gray-400">{privacy} · {membersCount} membre(s)</p>
        <hr className={`w-full my-4 ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`} />
        <GroupTabs/>
      </div>
      <div className={`p-10 mt-4 ${isDarkMode ? 'bg-gray-700 text-white-300' : 'bg-white text-gray-800'} rounded-lg shadow-lg`}>
        <div className="flex items-center space-x-4">
          <div className="flex-grow">
            <input
                type="text"
                placeholder="Que voulez-vous faire aujourd'hui ?"
                className={`w-[100%] p-2 border rounded-full mb-1 ml-3 ${isDarkMode ? 'bg-gray-600 border-gray-500 text-white' : 'border-gray-300'}`}
                disabled
              />
          </div>
        </div>
        <div className="flex justify-around w-full p-10">
          <div className="flex flex-col items-center ">
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
      
    </div>
    
  );
};

export default GroupHeader;
