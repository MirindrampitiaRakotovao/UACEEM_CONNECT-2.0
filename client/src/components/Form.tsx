import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import axios from 'axios';

import { useTheme } from '../../src/context/ThemeContext';
import LOGO from '/assets/img/Logo Konnektea Bleu.png';


interface FormState {
  nomUtilisateur: string;
  motDePasse: string;
  erreur: string;
  loading: boolean;
  messageBienvenue?: string;
  role?: string;
}

const Form: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    nomUtilisateur: '',
    motDePasse: '',
    erreur: '',
    loading: false,
    messageBienvenue: '',
    role: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value,
      erreur: ''
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!formState.nomUtilisateur.trim() || !formState.motDePasse.trim()) {
      setFormState(prevState => ({
        ...prevState,
        erreur: 'Veuillez remplir tous les champs.'
      }));
      return;
    }

    setFormState(prevState => ({
      ...prevState,
      loading: true,
      erreur: ''
    }));

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        nomUtilisateur: formState.nomUtilisateur.trim(),
        motDePasse: formState.motDePasse.trim()
      });

      if (res.status === 200) {
        Cookies.set('token', res.data.token);
        toast.success(`Bienvenue dans votre compte, ${res.data.personnel.nomUtilisateur} !`);

        const routes = {
          admin: '/acceuilAdmin',
          professeur: '/acceuilProfesseur',
          etudiant: '/acceuilClub',
          president_association: '/acceuilAssociation'
        };

        navigate(routes[res.data.personnel.role as keyof typeof routes] || '/acceuilUser');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      setFormState(prevState => ({
        ...prevState,
        erreur: 'Nom dutilisateur ou mot de passe incorrect',
        loading: false
      }));
    }
  };

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <div className={`min-h-screen w-full flex items-center justify-center p-4 md:p-6 lg:p-8 
      ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-blue-50 to-white'}`}>
      <div className={`w-full max-w-md transform transition-all duration-300 ease-in-out
        ${isDarkMode ? 'bg-gray-800' : 'bg-[#F3F5FA]'}
        rounded-2xl shadow-2xl overflow-hidden
        hover:shadow-3xl`}>
        
        {/* En-tête du formulaire */}
        <div className="p-8 text-center">
          <div className="relative w-24 h-24 mx-auto mb-4 transform hover:scale-105 transition-transform duration-300">
            <img
              src={LOGO}
              className="w-full h-full object-contain"
              alt="Logo ACEEM"
            />
          </div>
          <h1 className={`text-3xl font-black mb-2 
            ${isDarkMode ? 'text-white' : 'text-gray-800'}
            tracking-tight`}>
            KONEKTEA .
          </h1>
          <p className={`text-sm 
            ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Connectez-vous pour recevoir des informations
          </p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-6">
          {/* Champ nom d'utilisateur */}
          <div className="relative">
            <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none
              ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <FaUser />
            </div>
            <input
              id="nomUtilisateur"
              name="nomUtilisateur"
              type="text"
              required
              className={`block w-full pl-10 pr-4 py-3 border text-sm rounded-lg focus:ring-2 focus:outline-none transition-all duration-200
                ${isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' 
                  : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500'}`}
              placeholder="Nom d'utilisateur"
              value={formState.nomUtilisateur}
              onChange={handleChange}
            />
          </div>

          {/* Champ mot de passe */}
          <div className="relative">
            <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none
              ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <FaLock />
            </div>
            <input
              id="motDePasse"
              name="motDePasse"
              type={showPassword ? "text" : "password"}
              required
              className={`block w-full pl-10 pr-12 py-3 border text-sm rounded-lg focus:ring-2 focus:outline-none transition-all duration-200
                ${isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' 
                  : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500'}`}
              placeholder="Mot de passe"
              value={formState.motDePasse}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={togglePassword}
              className={`absolute inset-y-0 right-0 pr-3 flex items-center
                ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'}`}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Message d'erreur */}
          {formState.erreur && (
            <div className="text-red-500 text-sm text-center animate-shake">
              {formState.erreur}
            </div>
          )}

          {/* Bouton de connexion */}
          <button
            type="submit"
            disabled={formState.loading}
            className={`w-full py-3 px-4 text-white rounded-lg font-medium transition-all duration-300
              ${formState.loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : isDarkMode 
                  ? 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800' 
                  : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700'}
              transform hover:scale-[1.02] active:scale-[0.98]`}>
            {formState.loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Connexion en cours...
              </div>
            ) : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
