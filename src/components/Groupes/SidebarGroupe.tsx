import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import Avatar from '../avatar';
import { useDarkMode } from '../../contexts/DarkModeContext'; // Import the dark mode context
import { Search, Plus, Settings } from 'lucide-react'; // Lucide icons

interface DecodedToken {
  id: number;
  username: string;
  role: string;
}

const SidebarGroupe: React.FC = () => {
  const [id, setId] = useState<number | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const { isDarkMode } = useDarkMode(); // Get the dark mode state

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
    <div className={`max-w-sm shadow-lg rounded-lg overflow-hidden mx-auto my-4 p-6 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-700'}`}>
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

    {/* Titre */}
		<div className="flex items-center justify-between mb-5">
			<h3 className="text font-bold">Groupes</h3>
			<Settings className="text-gray-500 cursor-pointer" />
		</div>


      {/* Search Bar */}
      <div className="flex items-center space-x-3 mb-4 ">
        <Search className="text-gray-500" />
        <input
          type="text"
          placeholder="Rechercher des groupes"
          className={`w-full p-2 rounded-lg border ${isDarkMode ? ' border-gray-700 bg-gray-800 text-gray-100 focus:ring-blue-400' : ' border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 '}`}
        />
      </div>

        {/* Navigation menu */}
      <div className=" space-y-4 mb-6">
        <button className={`w-full h-12 rounded-lg text font-bold ${isDarkMode ? ' hover:bg-gray-600 text-white' : ' hover:bg-gray-200 text-gray-700'}`}>
          Votre fil
        </button>
        <button className={`w-full h-12 rounded-lg text font-bold ${isDarkMode ? ' hover:bg-gray-600 text-white' : ' hover:bg-gray-200 text-gray-700'}`}>
          Vos Groupes
        </button>
      </div>

      {/* Navigation Buttons */}
      <div className="space-y-4 ">
        <button className={`w-full flex justify-start items-center p-2 rounded-lg text font-bold
          ${isDarkMode 
            ? 'bg-blue-100 hover:bg-blue-200 text-blue-800'  
            : 'bg-blue-50 hover:bg-blue-100 text-blue-600' 
          }`}>
          <Plus className="mr-3 ml-3" /> Créer un nouveau groupe
        </button>
      </div>


      {/* Managed Groups */}
      <div className="mt-6">
        <h3 className="font-bold text-lg mb-2">Groupes que vous gérez</h3>
        <ul className="space-y-3">
            <li  className="flex items-center space-x-3">
              <div>
                <h4 className="font-semibold">Nom groupe</h4>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>En ligne il y a </p>
              </div>
            </li>
        </ul>
      </div>

      {/* Member Groups */}
      <div className="mt-6">
        <h3 className="font-bold text-lg mb-2">Groupes dont vous êtes membre</h3>
        <ul className="space-y-3">
            <li  className="flex items-center space-x-3">
              <div>
                <h4 className="font-semibold">{}</h4>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>En ligne il y a</p>
              </div>
            </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarGroupe;
