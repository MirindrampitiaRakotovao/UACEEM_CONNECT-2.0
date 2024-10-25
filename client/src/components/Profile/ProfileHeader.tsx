import React, { useEffect, useState } from 'react';
import { Camera, Edit } from 'lucide-react';
import { useTheme } from '../../../src/context/ThemeContext';
import axios from 'axios';
import Cookies from 'js-cookie';

interface UserProfile {
  nom: string;
  prenom: string;
  nomUtilisateur: string;
  photoProfil: string;
}

const ProfileHeader: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [publicationsCount, setPublicationsCount] = useState<number>(0);
  const [showProfileModal, setShowProfileModal] = useState(false); // État pour afficher la photo au centre
  const [showCameraModal, setShowCameraModal] = useState(false); // État pour afficher le modal caméra

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = Cookies.get('token');
      if (token) {
        try {
          const resProfile = await axios.get('http://localhost:5000/api/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserProfile(resProfile.data);

          const resCount = await axios.get('http://localhost:5000/api/count', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setPublicationsCount(resCount.data.count);
        } catch (error) {
          console.error('Erreur lors de la récupération des données :', error);
        }
      }
    };
    fetchUserProfile();
  }, []);

  if (!userProfile) return <div>Loading...</div>;

  return (
    <div className={`p-4 mt-6 rounded-md ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      {/* Utilisation de flexbox pour la mise en page */}
      <div className="flex items-start justify-between mb-4">
        {/* Section de gauche avec les informations utilisateur */}
        <div className="flex-grow">
          <h1 className="text-2xl font-bold mb-1">{`${userProfile.nom} ${userProfile.prenom}`}</h1>
          <p className="text-gray-400 mb-2">@{userProfile.nomUtilisateur}</p>

          {/* Section avec les informations du profil */}
          <div className="flex space-x-4 mb-4">
            {/* Affichage dynamique du nombre de publications */}
            <span><strong>{publicationsCount}</strong> publications</span>
          </div>

          {/* <p className="text-sm mb-4">Ceci est une bio statique.</p>
          <a href="#" className={`text-blue-400 hover:underline ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>Profil Facebook</a> */}
        </div>

        {/* Section de droite avec la photo de profil */}
        <div className="relative">
          <img
            src={`http://localhost:5000/${userProfile.photoProfil}`}
            alt={`${userProfile.nom} ${userProfile.prenom}`}
            className="w-32 h-32 rounded-full border-4 border-gray-300 object-cover cursor-pointer"
            onClick={() => setShowProfileModal(true)}  // Affiche le modal lorsque l'utilisateur clique sur la photo
          />
          <button
            className={`absolute bottom-0 right-0 p-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-800'}`}
            onClick={() => setShowCameraModal(true)}  // Affiche le modal caméra lorsque l'utilisateur clique sur l'icône caméra
          >
            <Camera className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Bouton Modifier le profil */}
      <div className="mt-6">
        <button className={`w-full px-4 py-2 rounded-md flex items-center justify-center ${isDarkMode ? 'bg-gray-500 text-white' : 'bg-blue-950 text-white'}`}>
          <Edit className="w-4 h-4 mr-2" />
          Modifier le profil
        </button>
      </div>

      {/* Modal pour afficher la photo au centre */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50" onClick={() => setShowProfileModal(false)}>
          <div className="relative">
            <img
              src={`http://localhost:5000/${userProfile.photoProfil}`}
              alt={`${userProfile.nom} ${userProfile.prenom}`}
              className="w-64 h-64 rounded-full border-4 border-gray-300 object-cover"
            />
          </div>
        </div>
      )}

      {/* Modal pour changer ou supprimer la photo */}
      {showCameraModal && (
        <div className={`hs-overlay fixed inset-0 ${isDarkMode ? 'bg-black bg-opacity-70' : 'bg-white bg-opacity-90'} z-50 flex items-center justify-center`}>
          <div className={`hs-overlay-animation-target mt-7 opacity-100 duration-500 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className={`flex flex-col border shadow-sm rounded-xl ${isDarkMode ? 'border-neutral-700' : 'border-gray-300'}`}>
              <div className={`flex justify-between items-center py-3 px-4 border-b ${isDarkMode ? 'border-neutral-700' : 'border-gray-300'}`}>
                <h3 id="hs-slide-down-animation-modal-label" className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Modifier la photo de profil
                </h3>
                <button
                  type="button"
                  className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
                  onClick={() => setShowCameraModal(false)}  // Fermer le modal
                >
                  <span className="sr-only">Close</span>
                  <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <p className={`mt-1 ${isDarkMode ? 'text-neutral-400' : 'text-gray-800'}`}>
                  Choisissez une option pour la photo de profil :
                </p>
                <div className="mt-4 flex flex-col space-y-2">
                  <button
                    className={`py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg shadow-sm hover:opacity-80 focus:outline-none ${isDarkMode ? 'bg-red-500 text-white' : 'bg-red-200 text-gray-800'}`}
                  >
                    Supprimer la photo
                  </button>
                  <button
                    className={`py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg shadow-sm hover:opacity-80 focus:outline-none ${isDarkMode ? 'bg-blue-500 text-white' : 'bg-blue-200 text-gray-800'}`}
                  >
                    Changer la photo
                  </button>
                </div>
              </div>
              <div className={`flex justify-end items-center gap-x-2 py-3 px-4 border-t ${isDarkMode ? 'border-neutral-700' : 'border-gray-300'}`}>
                <button
                  type="button"
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border bg-gray-200 text-gray-800 hover:bg-gray-300 focus:outline-none"
                  onClick={() => setShowCameraModal(false)}
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;
