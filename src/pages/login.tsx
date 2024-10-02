import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import logo from "../assets/Logo ACEEMM.png";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const role = await login(username, password);

      switch (role) {
        case 'Admin':
          navigate('/homeAdmin');
          break;
        case 'Délegué':
          navigate('/homeDelegue');
          break;
        case 'Etudiant':
          navigate('/homeEtudiant');
          break;
        default:
          setError('Rôle utilisateur inconnu');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <img
          src={logo}
          alt="logo"
          className="mx-auto w-24 h-auto mb-4"
        />
        <h2 className="text-2xl font-bold text-center mb-2">UACEEM-CONNECT</h2>
        <p className="text-gray-600 text-center mb-6">
          Connectez-vous pour recevoir des informations
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Nom d'utilisateur</label>
            <input
              type="text"
              placeholder="Entrez votre nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Mot de passe</label>
            <input
              type="password"
              placeholder="Entrez votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
            data-preline="tooltip" // Exemple d'utilisation de Preline
          >
            Connexion
          </button>
        </form>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
