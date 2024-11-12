import { User, Upload, ArrowLeft, Save, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useTheme } from '../../context/ThemeContext.tsx';


interface FormData {
  nom: string;
  prenom: string;
  nomUtilisateur: string;
  dateNaissance: string;
  motDePasse: string;
  role: string;
  situationMatrimoniale: string;
  situationProfessionnelle: string;
  posteOccupe: string;
  contact: string;
  email: string;
  photoProfil: File | null;
  adresse: string;
}
interface FormErrors {
  [key: string]: string;
}
const Insert: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [formData, setFormData] = useState<FormData>({
    nom: '',
    prenom: '',
    nomUtilisateur: '',
    dateNaissance: '',
    motDePasse: '',
    role: '',
    situationMatrimoniale: '',
    situationProfessionnelle: 'vacataire',
    posteOccupe: '',
    contact: '',
    email: '',
    photoProfil: null,
    adresse: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [savedData, setSavedData] = useState<FormData | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData({ ...formData, photoProfil: file });
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPhotoPreview(null);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;
    const requiredFields: (keyof FormData)[] = [
      'nom', 'prenom', 'nomUtilisateur', 'dateNaissance', 'motDePasse',
      'contact', 'email', 'adresse', 'role', 'posteOccupe', 'situationMatrimoniale'
    ];
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = `Le champ ${field} est requis`;
        isValid = false;
      }
    });
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Adresse email invalide';
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Veuillez remplir tous les champs requis");
      return;
    }
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'photoProfil' && value instanceof File) {
        formDataToSend.append('photoProfil', value);
      } else if (typeof value === 'string') {
        formDataToSend.append(key, value);
      }
    });
    try {
      const response = await fetch('http://localhost:5000/api/personnel', {
        method: 'POST',
        body: formDataToSend,
      });
      if (!response.ok) throw new Error('Erreur lors de la création du personnel');
      await response.json();
      toast.success('Personnel ajouté avec succès !');
      setSavedData(formData);
      setFormData({
        nom: '',
        prenom: '',
        nomUtilisateur: '',
        dateNaissance: '',
        motDePasse: '',
        role: '',
        situationMatrimoniale: '',
        situationProfessionnelle: 'vacataire',
        posteOccupe: '',
        contact: '',
        email: '',
        photoProfil: null,
        adresse: '',
      });
      setPhotoPreview(null);
    } catch (error) {
      console.error('Erreur:', error);
      toast.error("Une erreur s'est produite lors de la création du personnel.");
    }
  };
  const handleBack = () => {
    navigate('/userlist');
  };
  if (isLoading) return <Skeleton />;
  return (
    <div className={`min-h-screen py-6 px-4 sm:px-6 lg:px-8 ${isDarkMode ? ' text-white' : ''}`}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="flex flex-col lg:flex-row gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="flex-grow"
            initial={{ width: "100%" }}
            animate={{ width: savedData ? "66%" : "100%" }}
            transition={{ duration: 0.5 }}
          >
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md overflow-hidden`}>
              <div className={`px-4 py-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} border-b ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <User className="text-yellow-500" size={18} />
                    <h1 className="text-lg font-semibold">Ajouter un Personnel</h1>
                  </div>
                  <button
                    onClick={handleBack}
                    className="flex items-center space-x-1 px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded text-sm hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                  >
                    <ArrowLeft size={16} />
                    <span>Retour</span>
                  </button>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="px-4 py-5 space-y-6">
                <div className="flex justify-center mb-4">
                  <div className="relative group">
                    <div className={`w-24 h-24 rounded-full overflow-hidden border-2 ${photoPreview ? 'border-yellow-500' : 'border-gray-300'} transition-all duration-300`}>
                      {photoPreview ? (
                        <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                          <User className="text-gray-400" size={24} />
                        </div>
                      )}
                    </div>
                    <label className="absolute inset-0 w-full h-full flex items-center justify-center cursor-pointer rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300">
                      <div className="text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <Upload size={20} />
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Nom"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    error={errors.nom}
                    isDarkMode={isDarkMode}
                  />
                  <InputField
                    label="Prénom"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    error={errors.prenom}
                    isDarkMode={isDarkMode}
                  />
                  <InputField
                    label="Nom d'utilisateur"
                    name="nomUtilisateur"
                    value={formData.nomUtilisateur}
                    onChange={handleChange}
                    error={errors.nomUtilisateur}
                    isDarkMode={isDarkMode}
                  />
                  <InputField
                    label="Date de naissance"
                    name="dateNaissance"
                    type="date"
                    value={formData.dateNaissance}
                    onChange={handleChange}
                    error={errors.dateNaissance}
                    isDarkMode={isDarkMode}
                  />
                  <InputField
                    label="Mot de passe"
                    name="motDePasse"
                    type="password"
                    value={formData.motDePasse}
                    onChange={handleChange}
                    error={errors.motDePasse}
                    isDarkMode={isDarkMode}
                  />
                  <SelectField
                    label="Rôle"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    error={errors.role}
                    options={[
                      { value: "", label: "Sélectionnez un rôle" },
                      { value: "admin", label: "Administrateur" },
                      { value: "professeur", label: "Professeur" },
                      { value: "etudiant", label: "Etudiant" },
                      { value: "president_association", label: "Président d'Association" },
                      { value: "utilisateur_simple", label: "Utilisateur Simple" },
                    ]}
                    isDarkMode={isDarkMode}
                  />
                  <SelectField
                    label="Situation Matrimoniale"
                    name="situationMatrimoniale"
                    value={formData.situationMatrimoniale}
                    onChange={handleChange}
                    error={errors.situationMatrimoniale}
                    options={[
                      { value: "", label: "Sélectionnez une situation" },
                      { value: "celibataire", label: "Célibataire" },
                      { value: "marie", label: "Marié(e)" },
                      { value: "divorce", label: "Divorcé(e)" },
                      { value: "veuf", label: "Veuf/Veuve" },
                    ]}
                    isDarkMode={isDarkMode}
                  />
                  <SelectField
                    label="Poste Occupé"
                    name="posteOccupe"
                    value={formData.posteOccupe}
                    onChange={handleChange}
                    error={errors.posteOccupe}
                    options={[
                      { value: "", label: "Sélectionnez un poste" },
                      { value: "professeur", label: "Professeur" },
                      { value: "ressourcehumaine", label: "Responsable RH" },
                      { value: "comptable", label: "Comptable" },
                      { value: "accueil", label: "Responsable Accueil" },
                      { value: "secretaire", label: "Secrétaire" },
                      { value: "securite", label: "Sécurité" },
                    ]}
                    isDarkMode={isDarkMode}
                  />
                  <InputField
                    label="Contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    error={errors.contact}
                    isDarkMode={isDarkMode}
                  />
                  <InputField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    isDarkMode={isDarkMode}
                  />
                  <InputField
                    label="Adresse"
                    name="adresse"
                    value={formData.adresse}
                    onChange={handleChange}
                    error={errors.adresse}
                    isDarkMode={isDarkMode}
                  />
                  <SelectField
                    label="Situation Professionnelle"
                    name="situationProfessionnelle"
                    value={formData.situationProfessionnelle}
                    onChange={handleChange}
                    error={errors.situationProfessionnelle}
                    options={[
                      { value: "vacataire", label: "Vacataire" },
                    ]}
                    isDarkMode={isDarkMode}
                  />
                </div>

                <div className="flex justify-center mt-6">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-all duration-300 flex items-center space-x-2 text-sm"
                  >
                    <Save size={16} />
                    <span>Enregistrer</span>
                  </button>
                </div>
              </form>
            </div>
          </motion.div>

          <AnimatePresence>
            {savedData && (
              <motion.div
                className="lg:w-1/3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
              >
                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-4 sticky top-4`}>
                  <h2 className="text-lg font-semibold mb-4">Aperçu</h2>
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-yellow-500">
                        {photoPreview ? (
                          <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                            <User className="text-gray-400" size={24} />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      {Object.entries(savedData).map(([key, value]) => {
                        if (key !== 'photoProfil' && key !== 'motDePasse') {
                          return (
                            <div key={key} className="text-sm">
                              <span className="font-medium">{key}:</span>
                              <span className="ml-2">{value as string || 'Non renseigné'}</span>
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                    <button
                      onClick={handleBack}
                      className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-700 text-sm rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                      OK
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

const InputField: React.FC<{
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
  isDarkMode: boolean;
}> = ({ label, name, value, onChange, error, type = "text", isDarkMode }) => (
  <div>
    <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full px-3 py-2 text-sm border ${error ? 'border-red-500' : isDarkMode ? 'border-gray-600' : 'border-gray-300'} rounded-md ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white'} focus:outline-none focus:ring-1 focus:ring-yellow-500`}
      placeholder={`Entrez ${label.toLowerCase()}`}
    />
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
);

const SelectField: React.FC<{
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  options: { value: string; label: string }[];
  isDarkMode: boolean;
}> = ({ label, name, value, onChange, error, options, isDarkMode }) => (
  <div>
    <label className={`block text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full px-3 py-2 text-sm border ${error ? 'border-red-500' : isDarkMode ? 'border-gray-600' : 'border-gray-300'} rounded-md ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white'} focus:outline-none focus:ring-1 focus:ring-yellow-500`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
);

const Skeleton: React.FC = () => (
  <div className="animate-pulse max-w-6xl mx-auto">
    <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-10 bg-gray-200 rounded"></div>
        ))}
      </div>
      <div className="h-10 bg-gray-200 rounded w-1/3 mx-auto"></div>
    </div>
  </div>
);

export default Insert;