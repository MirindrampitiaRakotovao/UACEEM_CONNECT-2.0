import React from 'react';
import Avatar from '../avatar';
import { Globe, UsersRound } from 'lucide-react';
import { useUserProfile } from "../../services/profileService"; 

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

  const { etudiant, loading, error  } = useUserProfile();

  return (
    <div>
      <div className="flex items-center mb-2">
            {etudiant ? ( // Vérification que etudiant n'est pas null
          <>
            <Avatar userId={etudiant.id} /> {/* Utilisation de l'ID de l'utilisateur */}
            <div className="flex flex-col ml-5">
              <span className="text-gray-700 dark:text-gray-300 text-xl font-bold">
                {loading ? "Chargement..." : error ? "Erreur" :etudiant.username}
              </span>
              <span className="text-sm text-gray-500">
                {etudiant.role || "Role non défini"}
              </span>
            </div>
          </>
        ) : (
          <span>Chargement...</span> // Affichage d'un état de chargement si etudiant est null
        )}
        <button
          type="button"
          onClick={handleOpenAudienceModal}
          className="flex ml-auto text-blue-500 hover:underline items-center"
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
  <div className="mt-5 space-y-4 ">
    <div className="form-radio-group">
      <label className="form-radio mr-5">
        <input
          type="radio"
          value="Public"
          checked={selectedAudience === 'Public'}
          onChange={() => handleSelectAudience('Public')}
          className="form-radio-input mr-2"
        />
        <span className="form-radio-label">Public</span>
      </label>

      <label className="form-radio ml-10">
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
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    )}
  </div>
)}

    </div>
    
  );
};

export default AudienceSelector;
