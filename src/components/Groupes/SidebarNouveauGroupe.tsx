import React, { useEffect, useState } from 'react';
import Avatar from '../avatar';
import { Link } from 'react-router-dom';
import { XCircle } from 'lucide-react'; 
import { useDarkMode } from '../../contexts/DarkModeContext';
import {jwtDecode } from 'jwt-decode';

interface DecodedToken {
  id: number;
  username: string;
  role: string;
}

interface SidebarNouveauGroupeProps {
  onClose: () => void;
  onGroupNameChange: (name: string) => void;
}

const SidebarNouveauGroupe: React.FC<SidebarNouveauGroupeProps> = ({ onClose, onGroupNameChange }) => {
  const [id, setId] = useState<number | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [groupName, setGroupName] = useState<string>(''); 
  const { isDarkMode } = useDarkMode();

  const handleGroupNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setGroupName(newName);
    onGroupNameChange(newName); 
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupName.trim()) return;
  
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch('http://localhost:4000/partageGroupe/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify({ design_groupe_partage: groupName }),
      });
  
      const data = await response.json();
      if (response.ok) {
        onClose(); 
      } else {
        console.error('Erreur lors de la création du groupe:', data.message);
      }
    } catch (error) {
      console.error('Erreur lors de la requête:', error);
    }
  };
  

  return (
    <div className={`flex flex-col h-full max-w-sm mx-auto my-4 p-6 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
      <div className="flex items-center mb-2 space-x-6">
        <XCircle className="text-gray-500 cursor-pointer" size={20} onClick={onClose} /> 
        <h1 className="text-2xl font-bold">Créer un groupe</h1>
      </div>

      <div className="flex space-x-5 mb-6 mt-6">
        {id !== null && <Avatar userId={id} />}
        <div>
          <h2 className="text-xl font-bold">
            {username ? <Link to={`/profile/${username}`}>{username}</Link> : 'Utilisateur'}
          </h2>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{role || 'Utilisateur'}</p>
        </div>
      </div>

      <form className="flex flex-col flex-grow" onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            value={groupName}
            onChange={handleGroupNameChange}
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

        <div className="flex-grow"></div>

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-lg font-bold disabled:opacity-50"
          disabled={!groupName.trim()}
        >
          Créer
        </button>
      </form>
    </div>
  );
};

export default SidebarNouveauGroupe;
