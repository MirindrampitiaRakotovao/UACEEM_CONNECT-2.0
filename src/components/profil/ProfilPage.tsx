import React, { useState, useEffect } from 'react';
import HomeAdmin from '../Admin/HomeAdmin';
import HomeEtudiant from '../Etudiant/HomeEtudiant';
import HomeDelegue from '../Delegue/HomeDelegue';
import Avatar from "../avatar";
import EditProfileModal from './EditProfileModal';
import { useUserProfile } from '../../services/profileService';
import { getPublicPublicationMe } from '../../services/publicationService';
import PublicationList from '../publication/PublicationList'; 
import { useDarkMode } from '../../contexts/DarkModeContext'; // Importer le hook du mode sombre

// Définition des types
type Etudiant = {
  id: number;
  username: string;
  role: string;
};

type File = {
  id: number;
  url_fichier: string;
};

type Publication = {
  id: number;
  legende: string;
  date_publication: string;
  etudiant: Etudiant;
  fichiers: File[];
};

// Fonction pour déterminer le bon composant en fonction du rôle
const getHomeComponent = (role: string) => {
  switch (role) {
    case 'Admin':
      return <HomeAdmin />;
    case 'Etudiant':
      return <HomeEtudiant />;
    case 'Délegué':
      return <HomeDelegue />;
    default:
      return <div>Rôle inconnu</div>;
  }
};

const UserProfile: React.FC = () => {
  const { etudiant, loading, error, isOpen, openModal, closeModal } = useUserProfile();
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loadingPublications, setLoadingPublications] = useState(true);
  const [publicationError, setPublicationError] = useState<string | null>(null);
  const { isDarkMode } = useDarkMode(); // Utiliser le hook pour détecter le mode sombre

  useEffect(() => {
    const fetchUserPublications = async () => {
      try {
        const data = await getPublicPublicationMe(); // Fetch only the current user's publications
        setPublications(data);
      } catch (err) {
        setPublicationError('Erreur lors du chargement des publications.');
      } finally {
        setLoadingPublications(false);
      }
    };

    fetchUserPublications();
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!etudiant) {
    return <div>Profil non trouvé</div>;
  }

  return (
    <div className={`h-screen flex flex-col ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Afficher le composant approprié selon le rôle */}
      {getHomeComponent(etudiant.role)}

      <div className={`flex-1 overflow-y-auto  ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className={`w-2/5 mx-auto rounded-lg p-6 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}>
          {/* Header du profil */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">{etudiant.nom}</h2>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>@{etudiant.username}</p>
              <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{etudiant.email}</p>
            </div>
           <Avatar userId={etudiant.id} size="w-36 h-36"/>
          </div>

          {/* Bouton pour éditer le profil */}
          <div className="mt-4 text-center">
            <button className={`py-2 px-4 rounded-lg w-full ${isDarkMode ? 'bg-transparent border-blue-400 border-2 text-white hover:bg-blue-500' : 'bg-transparent border-blue-500 border-2 text-black hover:bg-blue-500 hover:text-white'}`} onClick={openModal}>
              Edit profile
            </button>
          </div>

          {/* Modal */}
          {isOpen && (
            <EditProfileModal
              isOpen={isOpen}
              closeModal={closeModal}
              nom={etudiant.nom}
              username={etudiant.username}
              bio={etudiant.bio || ''}
            />
          )}

          {/* Publications section avec le nouveau composant */}
          <div className="mt-6">
            <h3 className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>Vos Publications</h3>
            <PublicationList 
              publications={publications} 
              loading={loadingPublications} 
              error={publicationError} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
