import React , { useState, useEffect }from 'react';
import Avatar from '../avatar';
import axios from 'axios';
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
  const { isDarkMode } = useDarkMode();
  const [groupes, setGroupes] = useState<string[]>([]);

  useEffect(() => {
    if (selectedAudience === 'Groupe') {
      const fetchGroupes = async () => {
        try {
          const response = await axios.get('http://localhost:4000/partageGroupe/liste/nomGroupePartage', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          console.log(response.data); // Log pour vérifier la structure des données
          if (Array.isArray(response.data.groupes)) {  // On vérifie si 'groupes' est bien un tableau
            const nomsGroupes = response.data.groupes.map((groupe: any) => groupe.design_groupe_partage); // On extrait les noms des groupes
            setGroupes(nomsGroupes);
          } else {
            console.error('Les données récupérées ne sont pas un tableau de groupes:', response.data);
          }
        } catch (error) {
          console.error('Erreur lors de la récupération des groupes:', error);
        }
      };
  
      fetchGroupes();
    }
  }, [selectedAudience]);
  

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
              <div className="mt-4">
                <label htmlFor="groupeSelect" className="block mb-2 text-sm font-medium">
                  Le nom du groupe
                </label>
                <select
                  id="groupeSelect"
                  value={designGroupePartage}
                  onChange={(e) => setDesignGroupePartage(e.target.value)}
                  className={`form-select w-full p-2 rounded-lg ${
                    isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'
                  }`}
                >
                  <option value="" disabled>
                    Le nom du groupe 
                  </option>
                  {groupes.length > 0 ? (
                    groupes.map((groupe) => (
                      <option key={groupe} value={groupe}>
                        {groupe}
                      </option>
                  ))
                  ) : (
                    <option disabled>Aucun groupe disponible</option>
                  )}
                </select>
              </div>
            )}
        </div>
      )}
    </div>
  );
};

export default AudienceSelector;
