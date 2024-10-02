import React, { useState } from 'react';
import Avatar from './avatar';
import { Globe ,UsersRound } from 'lucide-react';



const AudienceSelector = () => {
  const [isAudienceModalOpen, setIsAudienceModalOpen] = useState(false);
  const [selectedAudience, setSelectedAudience] = useState('Public');

  const handleOpenAudienceModal = () => {
    setIsAudienceModalOpen(true);
  };

  const handleCloseAudienceModal = () => {
    setIsAudienceModalOpen(false);
  };

  const handleSelectAudience = (audience: string) => {
    setSelectedAudience(audience);
    handleCloseAudienceModal();
  };
  

  return (
    <div className="flex items-center mb-3">
      < Avatar />
      <div className="ml-6">
        <span className="font-semibold ">Faniry Tolotriniavo</span>
        <div className="flex items-center cursor-pointer text-sm text-gray-600 mt-1" onClick={handleOpenAudienceModal}>
          <span className="flex items-center bg-gray-200 px-2 py-1 rounded-lg">
            {selectedAudience}
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </span>
        </div>
      </div>

      {isAudienceModalOpen && (
        <div className="absolute z-50 bg-white border rounded-lg p-4 shadow-lg mt-8">
          <h3 className="font-semibold mb-2">Qui peut voir votre publication ?</h3>
          <ul>
            <li onClick={() => handleSelectAudience('Public')} className=" flex cursor-pointer hover:bg-gray-100 p-2 rounded">
                < Globe className='mr-3 w-5 h-5'/>
              Public
            </li>
            <li onClick={() => handleSelectAudience('Amis')} className=" flex cursor-pointer hover:bg-gray-100 p-2 rounded">
              < UsersRound className='mr-3 w-5 h-5' />
              Groupe
            </li>
          </ul>
          <button className="mt-2 text-sm text-blue-500" onClick={handleCloseAudienceModal}>Terminé</button>
        </div>
      )}
    </div>
  );
};

export default AudienceSelector;