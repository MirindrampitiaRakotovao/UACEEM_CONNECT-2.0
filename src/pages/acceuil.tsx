import React from 'react';
import { Home, Users, Shield, Lightbulb, MessageCircle, Bell } from 'lucide-react';
import logo from "../assets/Logo ACEEMM.png";

const Acceuil: React.FC = () => {
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
            <Home size={30} />
          </li>
          <li className="cursor-pointer">
            <Users size={30} />
          </li>
          <li className="cursor-pointer">
            <Shield size={30} />
          </li>
          <li className="cursor-pointer">
            <Lightbulb size={30} />
          </li>
        </ul>
      </div>
      <div className="flex space-x-5">
        { /* Barre de recherche */}
        <div className="flex justify-center items-center">
              <input
                type="text"
                placeholder="Rechercher ..."
                className="w-72 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
        </div>

            {/* Autres icônes (messages, notifications, avatar) */}
            <div className="flex items-center space-x-4">
              <MessageCircle size={30} className="cursor-pointer" />
              <Bell size={30} className="cursor-pointer" />
              <img src="/avatar.png" alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
            </div>
        </div>
      
    </nav>
  );
};

export default Acceuil;
