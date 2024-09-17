// Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css'; // Import du fichier CSS
import logo from "../assets/Logo ACEEMM.png";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Stocker le token JWT dans le localStorage ou dans un state manager comme Redux
        localStorage.setItem('token', data.token);

        // Redirection après succès
        navigate('/home');
      } else {
        setError(data.message || 'Erreur lors de la connexion');
      }
    } catch (err) {
      console.error(err);
      setError('Erreur serveur');
    }
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
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
