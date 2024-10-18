import React, { useState, useEffect } from 'react';
import Conversations from './Conversations';
import ChatWindow from './ChatWindow';
import ChatDetails from './ChatDetails';
import HomeAdmin from '../Admin/HomeAdmin';
import HomeEtudiant from '../Etudiant/HomeEtudiant';
import HomeDelegue from '../Delegue/HomeDelegue';
import axios from 'axios';
import { useDarkMode } from '../../contexts/DarkModeContext'; // Importer le hook du mode sombre

interface User {
  id: number;
  username: string;
  role: string;
  photo?: string;
}

const Messages: React.FC = () => {
  const [etudiant, setEtudiant] = useState<User | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { isDarkMode } = useDarkMode(); // Utiliser le hook du mode sombre

  // Récupérer les informations de l'étudiant connecté au chargement du composant
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchEtudiant = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/etudiant/me",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setEtudiant(response.data); // Stocke le profil de l'étudiant
      } catch (error) {
        console.error('Erreur lors de la récupération du profil :', error);
      }
    };

    fetchEtudiant();
  }, []);

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

  return (
    <div className={`h-screen flex flex-col ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      {/* Afficher le composant approprié selon le rôle */}
      {etudiant && getHomeComponent(etudiant.role)}

      {/* Layout principal pour les messages */}
      <div className={`flex flex-grow ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} overflow-hidden`}>
        <div className="flex-none w-1/3 h-full overflow-auto">
          <Conversations onSelectUser={setSelectedUser} />
        </div>
        <div className="flex-grow h-full overflow-hidden">
          {selectedUser ? (
            <ChatWindow user={selectedUser} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p>Sélectionnez un utilisateur pour commencer la discussion</p>
            </div>
          )}
        </div>
        <div className="flex-none w-1/3 h-full overflow-auto">
          <ChatDetails />
        </div>
      </div>
    </div>
  );
};

export default Messages;
