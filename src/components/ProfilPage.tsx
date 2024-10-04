import React, { useState, useEffect } from 'react';
import HomeAdmin from './Admin/HomeAdmin';
import HomeEtudiant from './Etudiant/HomeEtudiant';
import HomeDelegue from './Delegue/HomeDelegue';
import Avatar from "./avatar";
import EditProfileModal from './EditProfileModal';
import { useUserProfile } from '../services/profileService';
import { Heart, MessageCircle, Flag } from 'lucide-react';
import { getPublicPublicationMe } from '../services/publicationService';

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

type Publication = {
  id: number;
  contenu: string;
  date_publication: string;
  etudiant: {
    id: number;
    nom: string;
    username: string;
    role: string; // Assuming user roles like 'Professeur'
    avatar_url: string | null; // URL of profile picture
  };
  file_url?: string; // Optional file like an image or video
};

const UserProfile: React.FC = () => {
  const { etudiant, loading, error, isOpen, openModal, closeModal } = useUserProfile();
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loadingPublications, setLoadingPublications] = useState(true);
  const [publicationError, setPublicationError] = useState<string | null>(null);

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
          

          {/* Publications section */}
          <div className="mt-6">
            <h3 className="text-sm text-gray-400 mb-4">Vos Publications</h3>
            {loadingPublications ? (
              <p>Chargement des publications...</p>
            ) : publicationError ? (
              <p>{publicationError}</p>
            ) : (
              publications.map((publication) => (
                <div key={publication.id} className="bg-white p-4 rounded-md shadow mb-4">
                  {/* Publication header with avatar, name, role */}
                  <div className="flex items-center mb-2">
                    <Avatar  /> {/* Use avatar */}
                    <div className="ml-3">
                      <h4 className="text-lg font-bold">{publication.etudiant.nom}</h4>
                      <p className="text-gray-500">@{publication.etudiant.username}</p>
                      <p className="text-sm text-gray-400">{publication.etudiant.role}</p> {/* User role */}
                    </div>
                  </div>

                  {/* Publication content */}
                  <p className="mt-2 mb-4">{publication.contenu}</p>
                  {publication.file_url && (
                    <div className="mb-4">
                      <img src={publication.file_url} alt="Publication content" className="w-full rounded-lg" />
                    </div>
                  )}
                  <span className="text-sm text-gray-400">
                    {new Date(publication.date_publication).toLocaleDateString()}
                  </span>

                  {/* Icon actions */}
                  <div className="flex justify-between mt-4">
                    <div className="flex space-x-4">
                      <Heart className="w-6 h-6 text-gray-500 hover:text-red-500 cursor-pointer" />
                      <MessageCircle className="w-6 h-6 text-gray-500 hover:text-blue-500 cursor-pointer" />
                      <Flag className="w-6 h-6 text-gray-500 hover:text-yellow-500 cursor-pointer" />
                    </div>
                  </div>

                  {/* Comment input */}
                  <div className="mt-4">
                    <input
                      type="text"
                      placeholder="Commentaires..."
                      className="w-full p-2 border rounded-full hover:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
