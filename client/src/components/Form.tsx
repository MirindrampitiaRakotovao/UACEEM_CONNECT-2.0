import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LOGO_ACEEM from '../../public/assets/img/Logo ACEEM.png';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify'; // Importer toast
import { useTheme } from '../../src/context/ThemeContext'; // Assurez-vous d'importer le bon chemin pour votre contexte

// Définir les types des états du formulaire
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

  const navigate = useNavigate();
  const { isDarkMode } = useTheme(); // Récupérer l'état du mode sombre depuis le contexte

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    // Validation des champs du formulaire
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

    axios.post('http://localhost:5000/api/auth/login', {
      nomUtilisateur: formState.nomUtilisateur.trim(),
      motDePasse: formState.motDePasse.trim()
    })
      .then(res => {
        if (res.status === 200) {
          // Stocker le token dans les cookies (expire après 24 heures)
          Cookies.set('token', res.data.token); // 24 heures

          // Afficher le toast de bienvenue
          toast.success(`Bienvenue dans votre compte, ${res.data.personnel.nomUtilisateur} !`);

          // Redirections basées sur le rôle de l'utilisateur
          switch (res.data.personnel.role) {
            case 'admin':
              navigate('/acceuilAdmin');
              break;
            case 'professeur':
              navigate('/acceuilProfesseur');
              break;
            case 'president_club':
              navigate('/acceuilClub');
              break;
            case 'president_association':
              navigate('/acceuilAssociation');
              break;
            default:
              navigate('/acceuilUser');
              break;
          }
        }
      })
      .catch(error => {
        console.error('Erreur lors de la connexion:', error);
        setFormState(prevState => ({
          ...prevState,
          erreur: 'Nom d’utilisateur ou mot de passe incorrect'
        }));
      });
  };

  return (
    <div className={`flex items-center justify-center min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className={`px-10 py-20 rounded-3xl border-2 ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} max-w-md`}>
        <img src={LOGO_ACEEM} className="w-32 mx-auto mb-6" alt="Logo" />
        <h1 className={`text-3xl font-bold text-center ${isDarkMode ? 'text-white' : 'text-black'}`}>UACEEM-CONNECT</h1>
        <p className={`font-medium text-lg text-gray-500 mt-4 text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
          Connectez-vous pour recevoir des informations
        </p>
        <form onSubmit={handleSubmit} className="mt-8">
          <div>
            <label htmlFor="nomUtilisateur" className={`text-lg font-medium ${isDarkMode ? 'text-gray-300' : 'text-black'}`}>
              Nom d'utilisateur
            </label>
            <input
              id="nomUtilisateur"
              name="nomUtilisateur"
              className={`w-full border-2 rounded-xl p-4 mt-1 ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-100 bg-transparent text-black'}`}
              placeholder="Entrez votre nom d'utilisateur"
              value={formState.nomUtilisateur}
              onChange={handleChange}
            />
          </div>

          <div className="mt-4">
            <label htmlFor="motDePasse" className={`text-lg font-medium ${isDarkMode ? 'text-gray-300' : 'text-black'}`}>
              Mot de passe
            </label>
            <input
              id="motDePasse"
              name="motDePasse"
              className={`w-full border-2 rounded-xl p-4 mt-1 ${isDarkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-100 bg-transparent text-black'}`}
              placeholder="Entrez votre mot de passe"
              type="password"
              value={formState.motDePasse}
              onChange={handleChange}
            />
          </div>

          {formState.erreur && (
            <p className="text-red-500 mt-2">{formState.erreur}</p>
          )}

          <div className="mt-8 flex flex-col">
            <button
              type="submit"
              className={`text-lg font-bold py-3 rounded-xl active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ${isDarkMode ? 'bg-blue-700 text-white' : 'bg-blue-900 text-white'}`}
              disabled={formState.loading}
            >
              {formState.loading ? 'Connexion...' : 'Connexion'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
