import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTheme } from '../../../../context/ThemeContext'; // Assurez-vous d'importer votre contexte de thème

const UserCard = ({ imageUrl, name, role, isDarkMode }) => (
  <div className={`flex items-center space-x-3 mb-3 rounded-lg p-2 shadow-sm ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} border`}>
    <img src={imageUrl} alt={name} className="w-10 h-10 rounded-full object-cover" />
    <div>
      <p className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-black'}`}>{name}</p>
      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{role}</p>
    </div>
  </div>
);

const Users = () => {
  const { isDarkMode } = useTheme(); // Récupérer le mode sombre à partir du contexte
  const [users, setUsers] = useState([]);

  // Fonction pour récupérer les utilisateurs depuis l'API
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users'); // Assurez-vous que l'URL correspond à votre API
      setUsers(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
    }
  };

  // Récupérer les utilisateurs au chargement du composant
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className={`rounded-lg p-4 mt-4`}>
      <h2 className={`font-bold text-lg mb-3 ${isDarkMode ? 'text-white' : 'text-black'}`}>Utilisateurs</h2>
      {users.map((user) => (
        <UserCard
          key={user.id}
          imageUrl={`http://localhost:5000/${user.photoProfil}`} // Ajustez le chemin d'accès à la photo
          name={user.nomUtilisateur} // Utilisez le nom d'utilisateur
          role={user.role} // Récupérez le rôle
          isDarkMode={isDarkMode} // Passer isDarkMode à UserCard
        />
      ))}
      {users.length > 0 && (
        <a href="#" className={`text-blue-500 text-sm hover:underline ${isDarkMode ? 'text-blue-400' : ''}`}>Voir plus...</a>
      )}
    </div>
  );
};

export default Users;
