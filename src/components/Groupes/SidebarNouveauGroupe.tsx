import React, { useEffect, useState } from 'react';
import Avatar from '../avatar';
import { Link } from 'react-router-dom';
import { XCircle } from 'lucide-react'; // Importation des icônes Lucide
import { useDarkMode } from '../../contexts/DarkModeContext';
import {jwtDecode} from 'jwt-decode'; // Assurez-vous que jwt-decode est installé

interface DecodedToken {
  id: number;
  username: string;
  role: string;
}

interface SidebarNouveauGroupeProps {
  onClose: () => void;  // Ajout de la prop onClose
}

const SidebarNouveauGroupe: React.FC<SidebarNouveauGroupeProps> = ({ onClose }) => {
  const [id, setId] = useState<number | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [groupName, setGroupName] = useState<string>(''); // État pour le nom du groupe
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        setId(decodedToken.id);
        setUsername(decodedToken.username);
        setRole(decodedToken.role);
      } catch (error) {
        console.error('Erreur lors du décodage du token JWT', error);
      }
    }
  }, []);

  return (
    <div className={`flex flex-col h-full max-w-sm mx-auto my-4 p-6 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
      {/* Header avec le bouton de fermeture */}
      <div className="flex items-center mb-2 space-x-6">
        <XCircle 
          className="text-gray-500 cursor-pointer" 
          size={20} 
          onClick={onClose}
        /> 
        <h1 className="text-2xl font-bold">Créer un groupe</h1>
      </div>

      {/* User Section */}
      <div className="flex space-x-5 mb-6 mt-6">
        {id !== null && <Avatar userId={id} />}
        <div>
          <h2 className="text-xl font-bold">
            {username ? (
              <Link to={`/profile/${username}`}>{username}</Link>
            ) : 'Utilisateur'}
          </h2>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{role || 'Utilisateur'}</p>
        </div>
      </div>

      {/* Formulaire de création de groupe */}
      <form className="flex flex-col flex-grow" >
        <div className="mb-4">
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)} 
            placeholder="Nom du groupe"
            className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 focus:ring focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Invitez des membres (facultatif)"
            className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 focus:ring focus:ring-blue-500"
          />
        </div>

        {/* Espace vide pour pousser le bouton vers le bas */}
        <div className="flex-grow"></div>

        {/* Bouton de création */}
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-lg font-bold disabled:opacity-50"
          disabled={!groupName.trim()} // Désactiver si le champ nom du groupe est vide
        >
          Créer
        </button>
      </form>
    </div>
  );
};

export default SidebarNouveauGroupe;
