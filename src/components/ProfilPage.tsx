import React from 'react';
import HomeAdmin from './Admin/HomeAdmin';
import HomeEtudiant from './Etudiant/HomeEtudiant';
import HomeDelegue from './Delegue/HomeDelegue';
import Avatar from "./avatar";
import EditProfileModal from './EditProfileModal';
import { useUserProfile } from '../services/profileService';

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
    <div className="h-screen flex flex-col">
      {/* Afficher le composant approprié selon le rôle */}
      {getHomeComponent(etudiant.role)}
      
      <div className="bg-gray-50 text-gray flex-1 overflow-y-auto p-4">
        <div className="w-3/5 mx-auto bg-white rounded-lg p-6">
          {/* Header du profil */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">{etudiant.nom}</h2>
              <p className="text-sm text-gray-400">@{etudiant.username}</p>
              <p className="text-sm mt-2">{etudiant.email}</p>
            </div>
            <Avatar size="w-36 h-36" />
          </div>

          {/* Bouton pour éditer le profil */}
          <div className="mt-4 text-center">
            <button className="bg-transparent border-blue-500 border-2 text-black py-2 px-4 rounded-lg w-full hover:bg-blue-500 hover:text-white" onClick={openModal}>Edit profile</button>
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

          {/* Section des onglets */}
          <div className="mt-4 flex justify-center space-x-8 text-gray-400">
            <button className="border-b-2 border-white pb-2">Threads</button>
            <button>Replies</button>
            <button>Reposts</button>
          </div>

          {/* Complétez votre profil */}
          <div className="mt-6">
            <h3 className="text-sm text-gray-400 mb-4">Complétez votre profil</h3>
            <div className="grid grid-cols-3 gap-4">
              {/* Ajouter une photo de profil */}
              <div className="bg-gray-800 rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">📷</div>
                <h4 className="text-sm font-semibold">Ajouter une photo de profil</h4>
                <p className="text-xs text-gray-400 mb-4">Aidez les gens à vous reconnaître plus facilement.</p>
                <button className="bg-gray-700 text-gray py-1 px-4 rounded-lg">Ajouter</button>
              </div>

              {/* Ajouter une bio */}
              <div className="bg-gray-800 rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">📝</div>
                <h4 className="text-sm font-semibold">Ajouter une bio</h4>
                <p className="text-xs text-gray-400 mb-4">Présentez-vous et partagez ce qui vous intéresse.</p>
                <button className="bg-gray-700 text-gray py-1 px-4 rounded-lg">Ajouter</button>
              </div>

              {/* Créer un thread */}
              <div className="bg-gray-800 rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">📝</div>
                <h4 className="text-sm font-semibold">Créer un thread</h4>
                <p className="text-xs text-gray-400 mb-4">Partagez vos idées ou un fait marquant récent.</p>
                <button className="bg-white-700 text-gray py-1 px-4 rounded-lg">Créer</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
