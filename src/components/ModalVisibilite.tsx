import React from 'react';
import Avatar from './avatar';
import { Globe, UsersRound } from 'lucide-react';

interface AudienceSelectorProps {
  selectedAudience: 'Public' | 'Groupe';
  isAudienceModalOpen: boolean;
  handleOpenAudienceModal: () => void;
  handleCloseAudienceModal: () => void;
  handleSelectAudience: (audience: 'Public' | 'Groupe') => void;
  designGroupePartage: string;
  setDesignGroupePartage: (value: string) => void;
}

const AudienceSelector: React.FC<AudienceSelectorProps> = ({
  selectedAudience,
  isAudienceModalOpen,
  handleOpenAudienceModal,
  handleCloseAudienceModal,
  handleSelectAudience,
  designGroupePartage,
  setDesignGroupePartage
}) => {
  return (
    <div>
      <div className="flex items-center mb-2">
        <Avatar />
        <span className="ml-2 text-sm font-semibold">Sélectionner une audience</span>
        <button 
          type="button" 
          onClick={handleOpenAudienceModal} 
          className="ml-auto text-blue-500 text-sm"
        >
          {selectedAudience === 'Public' ? (
            <>
              <Globe size={16} className="mr-2" /> Public
            </>
          ) : (
            <>
              <UsersRound size={16} className="mr-2" /> Groupe
            </>
          )}
        </button>
      </div>
      
      {isAudienceModalOpen && (
        <div className="mt-4">
          <label>
            <input 
              type="radio" 
              value="Public" 
              checked={selectedAudience === 'Public'} 
              onChange={() => handleSelectAudience('Public')} 
            /> Public
          </label>
          <label className="ml-4">
            <input 
              type="radio" 
              value="Groupe" 
              checked={selectedAudience === 'Groupe'} 
              onChange={() => handleSelectAudience('Groupe')} 
            /> Groupe
          </label>
          {selectedAudience === 'Groupe' && (
            <input
              type="text"
              value={designGroupePartage}
              onChange={(e) => setDesignGroupePartage(e.target.value)}
              placeholder="Nom du groupe"
              className="mt-2 p-2 border rounded w-full"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default AudienceSelector;
