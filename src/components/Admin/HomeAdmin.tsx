import React, { useState } from "react";
import { Home, Users, ShieldAlert, Lightbulb, MessageCircle, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/Logo ACEEMM.png";
import Avatar from "../avatar";
import { showDropdown, hideDropdown, goToProfile} from "../../services/homeService";
import { logout } from '../../services/authService';
import { useUserProfile } from "../../services/profileService"; 
import { useDarkMode } from "../../contexts/DarkModeContext";

const HomeAdmin: React.FC = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const { etudiant, loading, error } = useUserProfile();

  const currentPath = window.location.pathname;


  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  return (
    <div className="flex-none">
      <nav className="flex justify-between items-center px-5 h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-2">
        <img src={logo} alt="Logo" className="h-10" />
        <span className="font-bold text-3xl tracking-wide text-[#1c3d6e] dark:text-white">
          UACEEM-CONNECT
        </span>
      </div>

      <div className="flex justify-center flex-1">
        <ul className="flex space-x-20">
          <li
              className={`relative flex flex-col items-center cursor-pointer ${currentPath === '/homeAdmin' ? 'border-b-2 border-[#1c3d6e] rounded-b-lg w-16' : 'w-15'}`}
              onClick={() => navigate('/homeAdmin')}
          >
            <Home size={25} className={`${currentPath === '/homeAdmin' ? 'text-[#1c3d6e]' : 'dark:text-white'}`} />
          </li>
          <li 
            className={`relative flex flex-col items-center cursor-pointer ${currentPath === '/groupe' ? 'border-b-2 border-[#1c3d6e] rounded-b-lg w-16' : 'w-15'}`}
            onClick={() => navigate('/groupe')}
          >
            <Users size={25} className="dark:text-white" />
          </li>
          <li className="cursor-pointer">
            <Lightbulb size={25} className="dark:text-white" />
          </li>
          <li className="cursor-pointer">
            <ShieldAlert size={25} className="dark:text-white" />
          </li>
        </ul>
      </div>
      <div className="flex space-x-5">
        <div className="flex justify-center items-center">
          <input
            type="text"
            placeholder="Rechercher Admin..."
            className="w-72 p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          />
        </div>

        <div className="flex items-center space-x-4">
          <MessageCircle 
            size={25} 
            className="cursor-pointer dark:text-white" 
            onClick={() => navigate('/messages')}
          />
          <Bell size={25} className="cursor-pointer dark:text-white" />
          
          <div className="relative" 
            onMouseEnter={() => showDropdown(setDropdownVisible)} 
          >
            {etudiant?.id ? <Avatar userId={etudiant.id} /> : null}
            {isDropdownVisible && (
              <div className="absolute right-0 mt-2 w-60 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg"
                onMouseEnter={() => showDropdown(setDropdownVisible)}
                onMouseLeave={(e) => {
                  if (e.currentTarget instanceof Node && e.relatedTarget instanceof Node) {
                    if (e.currentTarget.contains(e.relatedTarget)) {
                      return;
                    }
                  }
                  hideDropdown(setDropdownVisible);
                }}
              >
                <div className="flex p-4 space-x-5 cursor-pointer" onClick={() => goToProfile(navigate)}>
                  {etudiant?.id ? <Avatar userId={etudiant.id} /> : null}
                  <p className="text-gray-700 dark:text-gray-300">
                    {loading ? "Chargement..." : error ? "Erreur" : etudiant?.username}
                  </p>
                </div>
                <ul>
                <li 
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex justify-between"
                      onClick={toggleDarkMode}
                    >
                      {isDarkMode ? "Mode clair" : "Mode sombre"}
                      <span role="switch" aria-checked={isDarkMode} className="ml-2">
                        {isDarkMode ? "🌞" : "🌙"}
                      </span>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Aide & Support</li>
                    <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" onClick={handleLogout}>
                      Déconnexion
                    </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
    </div>
  );
};

export default HomeAdmin;
