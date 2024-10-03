// src/components/AudienceSelector.tsx
import React from 'react';
import Avatar from './avatar';
import { Globe, UsersRound } from 'lucide-react';
import { useAudience } from '../services/audienceService';

const AudienceSelector = () => {
  const { 
    selectedAudience, 
    isAudienceModalOpen, 
    handleOpenAudienceModal, 
    handleCloseAudienceModal, 
    handleSelectAudience,
    designGroupePartage,
    setDesignGroupePartage
  } = useAudience();

  return (
    <div className="flex items-center mb-3 relative">
      <Avatar />
      <div className="ml-6">
        <span className="font-semibold">Faniry Tolotriniavo</span>
        <div
          className="flex items-center cursor-pointer text-sm text-gray-600 mt-1"
          onClick={handleOpenAudienceModal}
        >
          <span className="flex items-center bg-gray-200 px-2 py-1 rounded-lg">
            {selectedAudience}
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </span>
        </div>
      </div>

      {isAudienceModalOpen && (
        <div className="absolute z-50 bg-white border rounded-lg p-4 shadow-lg mt-8">
          <h3 className="font-semibold mb-2">Qui peut voir votre publication ?</h3>
          <ul>
            <li
              onClick={() => handleSelectAudience('Public')}
              className="flex cursor-pointer hover:bg-gray-100 p-2 rounded"
            >
              <Globe className="mr-3 w-5 h-5" />
              Public
            </li>
            <li
              onClick={() => handleSelectAudience('Groupe')}
              className="flex cursor-pointer hover:bg-gray-100 p-2 rounded"
            >
              <UsersRound className="mr-3 w-5 h-5" />
              Groupe
            </li>
          </ul>

          {selectedAudience === 'Groupe' && (
            <div className="mt-4">
              <input
                type="text"
                placeholder="Nom du groupe"
                value={designGroupePartage}
                onChange={(e) => setDesignGroupePartage(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          )}

          <button
            onClick={handleCloseAudienceModal}
            className="mt-4 bg-gray-200 text-gray-700 py-1 px-3 rounded hover:bg-gray-300"
          >
            Fermer
          </button>
        </div>
      )}
    </div>
  );
};

export default AudienceSelector;
