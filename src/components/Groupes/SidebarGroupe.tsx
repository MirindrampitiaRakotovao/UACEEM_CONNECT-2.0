import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import Avatar from '../avatar';
import { useDarkMode } from '../../contexts/DarkModeContext'; // Import the dark mode context

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
    // Get the JWT token from localStorage
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        // Decode the JWT token to retrieve username, role, and id
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
    <div className={`max-w-sm shadow-lg rounded-lg overflow-hidden mx-auto my-4 p-6 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-700'}`}>
      <div className="flex space-x-5">
        {/* User's avatar and name */}
        { id !== null && <Avatar userId={id} /> }
        <div>
          <h2 className="text-xl font-bold">
            {username ? (
              <Link to={`/profile/${username}`}>{username}</Link>
            ) : 'Utilisateur'}
          </h2>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{role ? role : 'Utilisateur'}</p>
        </div>
      </div>

      {/* Navigation menu */}
      <div className="mt-6 space-y-4">
        <button className={`w-full p-2 rounded-lg ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}>
          Fil d'actualité
        </button>
        <button className={`w-full p-2 rounded-lg ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}>
          Groupes
        </button>
        <button className={`w-full p-2 rounded-lg ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}>
          Messages
        </button>
        <button className={`w-full p-2 rounded-lg ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}>
          Paramètres
        </button>
      </div>
    </div>
  );
};

export default SidebarGroupe;
