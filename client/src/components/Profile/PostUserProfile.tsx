import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useTheme } from "../../context/ThemeContext.tsx";
import { Camera, MessageSquareText } from "lucide-react"; // Assurez-vous d'avoir installé lucide-react

const PostUserProfile = () => {
  const { id } = useParams(); // Récupère l'ID depuis l'URL
  const location = useLocation();
  const authorData = location.state?.authorData;
  const { isDarkMode } = useTheme();

  if (!authorData) {
    return <div className="text-center mt-5">Informations de l'utilisateur non disponibles</div>;
  }

  return (
      <div className="mt-5">
        <div className={`max-w-2xl mx-auto ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg shadow-lg p-6 flex items-center justify-between`}>
          {/* Informations à gauche */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">{authorData.nom} {authorData.prenom}</h1>
            <p className={`${isDarkMode ? 'text-gray-100' : 'text-gray-400'} mb-2`}>
              @{authorData.nomUtilisateur}
            </p>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-4`}>{authorData.role}</p>

            {/* Bouton "Écrire un message" sous le rôle */}
            <button
                className={`flex items-center gap-2 px-4 py-2 rounded-lg mt-2 ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                onClick={() => {/* Logique pour écrire un message */}}
            >
              <MessageSquareText className="w-5 h-5" />
              Écrire un message
            </button>
          </div>

          {/* Photo de profil à droite avec icône appareil photo */}
          <div className="relative flex-shrink-0">
            <img
                src={`http://localhost:5000/${authorData.photoProfil?.replace(/\\/g, '/')}`}
                alt={authorData.nomUtilisateur}
                className="h-32 w-32 rounded-full object-cover border-2 border-gray-200"
            />
            {/* Icône appareil photo */}
            <div className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow-lg">
              <Camera />
            </div>
          </div>
        </div>
      </div>
  );
};

export default PostUserProfile;
