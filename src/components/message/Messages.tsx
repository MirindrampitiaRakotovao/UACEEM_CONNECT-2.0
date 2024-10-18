import React, { useState, useEffect } from 'react';
import Conversations from './Conversations';
import ChatWindow from './ChatWindow';
import ChatDetails from './ChatDetails';
import HomeAdmin from '../Admin/HomeAdmin';
import HomeEtudiant from '../Etudiant/HomeEtudiant';
import HomeDelegue from '../Delegue/HomeDelegue';
import axios from 'axios';
import { useDarkMode } from '../../contexts/DarkModeContext';

interface User {
  id: number;
  username: string;
  role: string;
  photo?: string;
}

const Messages: React.FC = () => {
  const [etudiant, setEtudiant] = useState<User | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    const fetchEtudiant = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/etudiant/me",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        // Inspecte la réponse complète pour voir comment elle est structurée
        console.log('Réponse complète du serveur :', response);

        // Regarde spécifiquement response.data pour vérifier la structure
        console.log('Données exactes reçues (response.data) :', response.data);

        // Vérifie si les données de l'étudiant sont dans un sous-objet
        if (response.data && response.data.role) {
          console.log('Le rôle a été trouvé :', response.data.role);
          setEtudiant(response.data);  // Utilise directement les données si elles contiennent le rôle
        } else {
          console.log("Les données de l'étudiant sont dans un sous-objet, essayons autre chose...");
          setEtudiant(response.data.etudiant); // Essaye response.data.etudiant si le rôle est dans un sous-objet
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du profil :', error);
      }
    };

    fetchEtudiant();
  }, []);

  const getHomeComponent = (role: string) => {
    switch (role) {
      case 'Admin':
        return <HomeAdmin />;
      case 'Etudiant':
        return <HomeEtudiant />;
      case 'Délegué':
        return <HomeDelegue />;
      default:
        return <div>Rôle inconnu ou manquant</div>;
    }
  };

  return (
    <div className={`h-screen flex flex-col ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      {/* Vérification de la récupération des données de l'étudiant */}
      {etudiant ? (
        <>
          {console.log('Rôle de l\'étudiant:', etudiant.role)}  {/* Affiche le rôle pour vérifier */}
          {getHomeComponent(etudiant.role)}  {/* Affiche le composant basé sur le rôle */}
        </>
      ) : (
        <p>Chargement du profil...</p>
      )}

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
