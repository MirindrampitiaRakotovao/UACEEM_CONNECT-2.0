// Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css'; // Import du fichier CSS
import logo from "../assets/Logo ACEEMM.png";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login submitted', { username, password });
    navigate('/home');
  };

  return (
    <div className="container">
      <div className="card">
        <img
          src={logo}
          alt="logo"
          className="logo"
        />
        <h2 className="title">UACEEM-CONNECT</h2>
        <p className="subtitle">Connectez-vous pour recevoir des informations</p>
        
        <div className="form-content">
          <form onSubmit={handleSubmit} className="form">
            <div className="label-group">
              <label htmlFor="">Nom d'utilisateur</label>
            </div>
            <div className="input-group">
              <input
                type="text"
                placeholder="Entrez votre nom d'utilisateur"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input"
              />
            </div>

            <div className="label-group">
              <label htmlFor="">Mot de passe</label>
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Entrez votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
              />
            </div>

            <button type="submit" className="button">
              Connexion
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
