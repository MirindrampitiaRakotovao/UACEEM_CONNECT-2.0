import React, { useState } from 'react';
import { Home, Users, Shield, Lightbulb, MessageCircle, Bell } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/Logo ACEEMM.png";
import Avatar from "../avatar";


const HomeDelegue: React.FC = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const navigate =useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:4000/logout');

      if (response.status === 200) {
        // Si la déconnexion a réussi, rediriger vers la page de login
        navigate('/login');  // Redirige vers /login
      } else {
        console.error('Erreur lors de la déconnexion : ', response.status);
      }
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  const showDropdown = () => {
    setDropdownVisible(true);
  };

  const hideDropdown = () => {
    setDropdownVisible(false);
  };

  return (
    <nav className="flex justify-between items-center px-5 h-16 bg-white border-b border-gray-200">
      {/* Logo */}
      <div className="w-20">
        <img src={logo} alt="Logo" className="h-auto w-full" /> {/* Utilisez votre logo ici */}
      </div>

      {/* Icones du menu principal */}
      <div className="flex justify-center flex-1">
        <ul className="flex space-x-20">
          <li className="cursor-pointer">
            <Home size={25} />
          </li>
          <li className="cursor-pointer">
            <Users size={25} />
          </li>
          <li className="cursor-pointer">
            <Shield size={25} />
          </li>
          <li className="cursor-pointer">
            <Lightbulb size={25} />
          </li>
        </ul>
      </div>
      <div className="flex space-x-5">
        { /* Barre de recherche */}
        <div className="flex justify-center items-center">
          <input
            type="text"
            placeholder="Rechercher Delegue..."
            className="w-72 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Autres icônes (messages, notifications, avatar) */}
        <div className="flex items-center space-x-4">
          <MessageCircle size={25} className="cursor-pointer" />
          <Bell size={25} className="cursor-pointer" />
          
          {/* Avatar avec gestion du clic pour afficher le dropdown */}
          <div className="relative" 
            onMouseEnter={showDropdown} 
          >
            <Avatar />
            {isDropdownVisible && (
              <div className="absolute right-0 mt-2 w-60 bg-white border border-gray-300 rounded-md shadow-lg"
                onMouseEnter={showDropdown}
                onMouseLeave={(e) => {
                  if (e.currentTarget instanceof Node && e.relatedTarget instanceof Node) {
                    if (e.currentTarget.contains(e.relatedTarget)) {
                      return;
                    }
                  }
            
                  hideDropdown();
                }}
              >
                <div className="flex p-4 space-x-5 cursor-pointer">
                  < Avatar />
                  <p className="text-gray-700">Faniriniaina</p>
                </div>
                <ul>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between">
                    Mode sombre
                    <span
                      role="switch"
                      aria-checked="false"  // Modifie cette valeur dynamiquement selon l'état du mode sombre
                      className="ml-2"
                    >
                      🌙
                    </span>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Aide & Support</li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={handleLogout}                  
                  >Déconnexion</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HomeDelegue;

