import React, { useEffect, useState } from 'react';
import Avatar from '../avatar';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useDarkMode } from '../../contexts/DarkModeContext';
import {  X } from 'lucide-react'; // Importation des icônes Lucide

interface DecodedToken {
    id: number;
    username: string;
    role: string;
  }

const SidebarNouveauGroupe: React.FC = () => {
    const [id, setId] = useState<number | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);
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
    <div className={`max-w-sm overflow-hidden mx-auto my-4 p-6 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
      {/* Header avec le bouton de fermeture */}
      <div className="flex items-center justify-between mb-4">
        <X className="text-gray-500 cursor-pointer" /> {/* Icone pour fermer */}
        <h2 className="text-lg font-bold">Créer un groupe</h2>
      </div>

      {/* User Section */}
      <div className="flex space-x-5 mb-6">
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
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Nom du groupe</label>
          <input
            type="text"
            placeholder="Nom du groupe"
            className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 focus:ring focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Invitez des amis (facultatif)</label>
          <input
            type="text"
            placeholder="Invitez des amis"
            className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 focus:ring focus:ring-blue-500"
          />
        </div>

        {/* Bouton de création */}
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-lg font-bold disabled:opacity-50"
          disabled
        >
          Créer
        </button>
      </form>
    </div>
  );
};

export default SidebarNouveauGroupe;
