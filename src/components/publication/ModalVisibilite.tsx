import React from 'react';
import Avatar from '../avatar';
import { Globe, UsersRound } from 'lucide-react';
import { useUserProfile } from "../../services/profileService"; 
import { useDarkMode } from '../../contexts/DarkModeContext'; // Import du hook pour le mode sombre

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
  const { etudiant, loading, error } = useUserProfile();
  const { isDarkMode } = useDarkMode(); // Utilisation du mode sombre

  return (
    <div>
      <div className={`flex items-center mb-2 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
        {etudiant ? (
          <>
            <Avatar userId={etudiant.id} />
            <div className="flex flex-col ml-5">
              <span className={`text-xl font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {loading ? "Chargement..." : error ? "Erreur" : etudiant.username}
              </span>
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {etudiant.role || "Role non défini"}
              </span>
            </div>
          </>
        ) : (
          <span>Chargement...</span>
        )}
        <button
          type="button"
          onClick={handleOpenAudienceModal}
          className={`flex ml-auto items-center ${isDarkMode ? 'text-blue-400' : 'text-blue-500'} hover:underline`}
        >
          {selectedAudience === 'Public' ? (
            <>
              <Globe className="w-6 h-6 mr-1" />
              <span className="text-[1em]">Public</span>
            </>
          ) : (
            <>
              <UsersRound className="w-6 h-6 mr-1" />
              <span className="text-[1em]">Groupe</span>
            </>
          )}
        </button>
      </div>

      {isAudienceModalOpen && (
        <div className={`mt-5 space-y-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
          <div className="form-radio-group">
            <label className={`form-radio mr-5 ${isDarkMode ? 'text-gray-300' : 'text-black'}`}>
              <input
                type="radio"
                value="Public"
                checked={selectedAudience === 'Public'}
                onChange={() => handleSelectAudience('Public')}
                className="form-radio-input mr-2"
              />
              <span className="form-radio-label">Public</span>
            </label>

            <label className={`form-radio ml-10 ${isDarkMode ? 'text-gray-300' : 'text-black'}`}>
              <input
                type="radio"
                value="Groupe"
                checked={selectedAudience === 'Groupe'}
                onChange={() => handleSelectAudience('Groupe')}
                className="form-radio-input mr-2"
              />
              <span className="form-radio-label">Groupe</span>
            </label>
          </div>

          {selectedAudience === 'Groupe' && (
            <input
              type="text"
              value={designGroupePartage}
              onChange={(e) => setDesignGroupePartage(e.target.value)}
              placeholder="Nom du groupe"
              className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'
              }`}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default AudienceSelector;
