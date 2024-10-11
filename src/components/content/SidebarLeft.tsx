import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import Avatar from '../avatar';

interface DecodedToken {
  id: number;
  username: string;
  role: string;
}

const SidebarLeft: React.FC = () => {
  const [id, setId] = useState<number | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    // Récupérer le token JWT depuis localStorage
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        // Décoder le token JWT pour récupérer le nom d'utilisateur
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
    <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden mx-auto my-4 p-6">
      <div className="flex space-x-5">
        {/* Avatar et nom de l'utilisateur */}
        { id !== null && <Avatar userId={id} /> }
        <div className="div">
        <h2 className="text-xl font-bold">
            {username ? (
              <Link to={`/profile/${username}`}>{username}</Link>
            ) : 'Utilisateur'}
          </h2>
            <p className="text-sm text-gray-500">{role ? role : 'Utilisateur'}</p>
        </div>
      </div>

      {/* Menu de navigation sous forme de carte */}
      <div className="mt-6 space-y-4">
        <button className="w-full text-gray-700 bg-gray-100 p-2 rounded-lg hover:bg-gray-200">
          Fil d'actualité
        </button>
        <button className="w-full text-gray-700 bg-gray-100 p-2 rounded-lg hover:bg-gray-200">
          Groupes
        </button>
        <button className="w-full text-gray-700 bg-gray-100 p-2 rounded-lg hover:bg-gray-200">
          Messages
        </button>
        <button className="w-full text-gray-700 bg-gray-100 p-2 rounded-lg hover:bg-gray-200">
          Paramètres
        </button>
      </div>
    </div>
  );
};

export default SidebarLeft;
