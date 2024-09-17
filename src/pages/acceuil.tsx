import React from 'react';
import '../styles/acceuil.css'; // Importation du fichier CSS
import { Home, Users, Shield, Lightbulb, MessageCircle, Bell } from 'lucide-react';
import logo from "../assets/Logo ACEEMM.png";

const Acceuil: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Logo" /> {/* Utilisez votre logo ici */}
      </div>

      <div className="icon-menu">
        <ul className="nav-items">
            <li className="nav-iteme">
            <Home size={30} />
            </li>
            <li className="nav-iteme">
            <Users size={30} />
            </li>
            <li className="nav-iteme">
            <Shield size={30} />
            </li>
            <li className="nav-iteme">
            <Lightbulb size={30} />
            </li>
        </ul>
      </div>
      
      <div className="search">
        <input type="text" placeholder="Rechercher ..." />
      </div>

      <div className="icon-autre">
        <ul className="nav-items">
            <li className="nav-item">
            <MessageCircle size={30} />
            </li>
            <li className="nav-item">
            <Bell size={30} />
            </li>
            <li className="nav-item">
            <img src="/avatar.png" alt="Avatar" className="avatar" /> 
            </li>
        </ul>
      </div>
      
    </nav>
  );
};

export default Acceuil;
