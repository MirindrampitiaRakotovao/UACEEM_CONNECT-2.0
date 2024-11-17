import 'react-toastify/dist/ReactToastify.css';

import { X, ChevronDown, Save } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';

import apiService from '../../../services/api';


const toastSuccess = (message) => {
    toast.success(
        <div className="flex items-center">
            <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
            {message}
        </div>,
        {
            className: 'bg-green-50 border border-green-300 text-black rounded-lg p-2',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        }
    );
};
const CourseModal = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        titre: '',
        contenu: '',
        nomMatiere: '',
        niveau: '',
        mention: '',
        semestre: '',
        estPublie: false,
        files: [] // Assurez-vous que les fichiers sont initialisés ici
    });
    const [formErrors, setFormErrors] = useState({});
    const [enseignements, setEnseignements] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [loadingEnseignements, setLoadingEnseignements] = useState(true);
    useEffect(() => {
        if (isOpen) {
            fetchEnseignements();
        }
    }, [isOpen]);
    const fetchEnseignements = async () => {
        try {
            setLoadingEnseignements(true);
            const response = await apiService.get('/enseignements');
            if (response.data) {
                setEnseignements(response.data);
            }
        } catch (error) {
            setError("Erreur lors de la récupération des enseignements");
            console.error('Erreur fetchEnseignements:', error);
        } finally {
            setLoadingEnseignements(false);
        }
    };
    const uniqueValues = {
        matieres: [...new Set(enseignements.map(e => e.nomMatiere))],
        niveaux: [...new Set(enseignements.map(e => e.niveau))],
        mentions: [...new Set(enseignements.map(e => e.mention))],
        semestres: [...new Set(enseignements.map(e => e.semestre))]
    };
    const validateField = (name, value) => {
        if (!value || (typeof value === 'string' && !value.trim())) {
            return `Le champ ${name} est requis`;
        }
        return '';
    };
    const handleEnseignementChange = (field, value) => {
        setFormData(prev => {
            const newData = { ...prev, [field]: value };
            if (field === 'nomMatiere') {
                const matchingEnseignement = enseignements.find(e => e.nomMatiere === value);
                if (matchingEnseignement) {
                    newData.niveau = matchingEnseignement.niveau;
                    newData.mention = matchingEnseignement.mention;
                    newData.semestre = matchingEnseignement.semestre;
                }
            }
            return newData;
        });
        setFormErrors(prev => ({ ...prev, [field]: validateField(field, value) }));
    };
    const handleChange = (e) => {
      const { name, value, type, checked, files } = e.target;
      if (type === 'file') {
          setFormData(prev => ({
              ...prev,
              files: Array.from(files) // Convertir les fichiers en tableau
          }));
      } else {
          setFormData(prev => ({
              ...prev,
              [name]: type === 'checkbox' ? checked : value
          }));
          if (type !== 'checkbox' && type !== 'file') {
              setFormErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
          }
      }
  };
    const validateForm = () => {
        const newErrors = {};
        let isValid = true;
        const requiredFields = ['titre', 'contenu', 'nomMatiere', 'niveau', 'mention', 'semestre'];
        requiredFields.forEach(fieldName => {
            const error = validateField(fieldName, formData[fieldName]);
            if (error) {
                newErrors[fieldName] = error;
                isValid = false;
            }
        });
        setFormErrors(newErrors);
        return isValid;
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!validateForm()) {
          return;
      }
      setIsLoading(true);
      setError('');
      try {
          const formDataToSend = new FormData();
          // Ajouter les champs texte
          formDataToSend.append('titre', formData.titre);
          formDataToSend.append('contenu', formData.contenu);
          formDataToSend.append('nomMatiere', formData.nomMatiere);
          formDataToSend.append('niveau', formData.niveau);
          formDataToSend.append('mention', formData.mention);
          formDataToSend.append('semestre', formData.semestre);
          formDataToSend.append('estPublie', formData.estPublie);
          // Ajouter les fichiers
          if (formData.files && formData.files.length > 0) {
              for (const file of formData.files) {
                  formDataToSend.append('files', file);
              }
          }
          // Log des données à envoyer
          console.log('Form Data to Send:', Array.from(formDataToSend));
          // Envoyer la requête
          const response = await apiService.post('/cours', formDataToSend);
          if (response.data) {
              toastSuccess('Le cours a été créé avec succès !');
              onSave(response.data);
              onClose();
          }
      } catch (error) {
          console.error('Erreur lors de l\'envoi des données :', error);
          setError(error.response?.data?.message || 'Une erreur est survenue');
      } finally {
          setIsLoading(false);
      }
  };
    if (!isOpen) return null;
    const SelectField = ({ label, name, value, options, onChange }) => (
        <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
            <div className="relative">
                <select
                    name={name}
                    value={value}
                    onChange={e => onChange(name, e.target.value)}
                    className={`w-full p-2 bg-white border rounded shadow-sm focus:ring-1 focus:ring-blue-500 transition-all duration-200 ${formErrors[name] ? 'border-red-500' : 'border-gray-300'}`}
                >
                    <option value="">Sélectionner...</option>
                    {options.map(option => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
            {formErrors[name] && (
                <p className="mt-1 text-xs text-red-500">{formErrors[name]}</p>
            )}
        </div>
    );
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg p-6 relative overflow-hidden">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                    <X size={20} className="text-gray-500" />
                </button>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Nouveau cours</h2>
                {loadingEnseignements ? (
                    <div className="flex items-center justify-center p-6">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Titre</label>
                            <input
                                type="text"
                                name="titre"
                                value={formData.titre}
                                onChange={handleChange}
                                className={`w-full p-2 bg-white border rounded shadow-sm focus:ring-1 focus:ring-blue-500 transition-all duration-200 ${formErrors.titre ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Entrez le titre du cours"
                            />
                            {formErrors.titre && (
                                <p className="mt-1 text-xs text-red-500">{formErrors.titre}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Contenu</label>
                            <textarea
                                name="contenu"
                                value={formData.contenu}
                                onChange={handleChange}
                                className={`w-full p-2 bg-white border rounded shadow-sm focus:ring-1 focus:ring-blue-500 transition-all duration-200 min-h-[100px] ${formErrors.contenu ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Décrivez le contenu du cours"
                            />
                            {formErrors.contenu && (
                                <p className="mt-1 text-xs text-red-500">{formErrors.contenu}</p>
                            )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <SelectField
                                label="Matière"
                                name="nomMatiere"
                                value={formData.nomMatiere}
                                options={uniqueValues.matieres}
                                onChange={handleEnseignementChange}
                            />
                            <SelectField
                                label="Niveau"
                                name="niveau"
                                value={formData.niveau}
                                options={uniqueValues.niveaux}
                                onChange={handleEnseignementChange}
                            />
                            <SelectField
                                label="Mention"
                                name="mention"
                                value={formData.mention}
                                options={uniqueValues.mentions}
                                onChange={handleEnseignementChange}
                            />
                            <SelectField
                                label="Semestre"
                                name="semestre"
                                value={formData.semestre}
                                options={uniqueValues.semestres}
                                onChange={handleEnseignementChange}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Fichiers</label>
                            <input
    type="file"
    name="files"
    onChange={handleChange}
    className="w-full p-2 bg-white border border-gray-300 rounded shadow-sm focus:ring-1 focus:ring-blue-500 transition-all duration-200"
    multiple // Autoriser la sélection de plusieurs fichiers
/>
                        </div>
                        <label className="flex items-center text-xs cursor-pointer">
                            <input
                                type="checkbox"
                                name="estPublie"
                                checked={formData.estPublie}
                                onChange={handleChange}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                            />
                            <span className="ml-2 text-gray-700 dark:text-gray-200">Publier immédiatement</span>
                        </label>
                        {error && (
                            <div className="p-2 bg-red-50 border border-red-200 rounded text-red-600 text-xs">
                                {error}
                            </div>
                        )}
                        <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-200 transition-colors duration-200"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-200 flex items-center space-x-1"
                            >
                                {isLoading ? (
                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                                ) : (
                                    <Save className="w-4 h-4" />
                                )}
                                <span className="text-xs">Enregistrer</span>
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};
export default CourseModal;