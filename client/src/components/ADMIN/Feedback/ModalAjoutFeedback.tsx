import React, { useState, useEffect } from 'react';
import { X, Star } from 'lucide-react';

import { useTheme } from '../../../context/ThemeContext';
import { ApiResponse } from '../../../services/api';
import toastSuccess from '../../../ToastSuccess';
import apiService from '../../../services/api';


interface ModalAjoutFeedbackProps {
  isOpen: boolean;
  onClose: () => void;
}
const ModalAjoutFeedback: React.FC<ModalAjoutFeedbackProps> = ({ isOpen, onClose }) => {
  const { isDarkMode } = useTheme();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [cours, setCours] = useState<{ 
    coursId: string; 
    titre: string; 
    professeur: { id: string; nom: string; prenom: string } | null; // Professeur peut être null
    uniqueId: string; 
  }[]>([]);
  useEffect(() => {
    const fetchCours = async () => {
      try {
        console.log('Début de la récupération des cours');
        const response = await apiService.get<{ 
          success: boolean; 
          data: { 
            coursId: string; 
            titre: string; 
            professeur: { id: string; nom: string; prenom: string } | null; 
          }[] 
        }>('/cours-feedback');
        console.log('Réponse brute de l\'API:', response);
        if (response.success) {
          console.log('Données des cours reçues:', response.data);
          setCours(response.data.map(c => ({
            ...c,
            uniqueId: c.coursId
          })));
          console.log('Cours mis à jour dans l\'état:', response.data);
        } else {
          console.warn('La réponse n\'est pas un succès:', response);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des cours:', error);
      }
    };
    if (isOpen) {
      fetchCours();
    }
  }, [isOpen]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse || rating === 0 || comment.trim() === '') {
      alert('Veuillez remplir tous les champs.');
      return;
    }
    try {
      const response = await apiService.post<ApiResponse<{ feedbackId: string }>>('/createfeedback', {
        coursId: selectedCourse,
        notation: rating,
        commentaire: comment,
      });
      if (response.success) {
        toastSuccess('Feedback ajouté avec succès !');
        onClose(); // Fermer le modal après soumission
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout du feedback:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    }
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
      <div className={`w-full max-w-md rounded-xl shadow-lg transform transition-all duration-300 ease-in-out
        ${isDarkMode ? 'bg-gradient-to-b from-[#2A3A53] to-[#252b53] text-white' : 'bg-gradient-to-b from-white to-gray-100 text-gray-800'}`}>
        
        <div className="flex justify-between items-center p-6 border-b border-gray-200/20">
          <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Ajouter un Feedback
          </h2>
          <button 
            onClick={onClose} 
            className={`p-1 rounded-full transition-colors ${
              isDarkMode ? 'hover:bg-white/10 text-gray-300' : 'hover:bg-gray-200 text-gray-600'
            }`}
          >
            <X size={16} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1">
            <label 
              htmlFor="course" 
              className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
            >
              Cours
            </label>
            <select
              id="course"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className={`w-full border rounded-lg p-2 focus:outline-none transition duration-200 ${
                isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-800'
              }`}
            >
              <option key="default" value="">Sélectionnez un cours</option>
              {cours.map((course) => (
                <option 
                  key={course.uniqueId} 
                  value={course.coursId}
                >
                  {course.titre} - Pr. {course.professeur ? `${course.professeur.prenom} ${course.professeur.nom}` : 'Non disponible'}
                </option>
              ))}
            </select>
          </div>
          
          <div className="space-y-1">
            <label 
              className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
            >
              Note
            </label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  fill={star <= rating ? 'currentColor' : 'none'}
                  className={`w-5 h-5 cursor-pointer transition-colors duration-200 ${
                    star <= rating 
                      ? (isDarkMode ? 'text-[#FFAA00]' : 'text-yellow-400') 
                      : 'text-gray-300'
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>
          
          <div className="space-y-1">
            <label 
              className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
            >
              Commentaire
            </label>
            <textarea 
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className={`w-full h-24 border rounded-lg p-2 focus:outline-none transition duration-200 ${
                isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-800'
              }`}
            />
          </div>
          
          <button 
            type="submit" 
            className={`w-full p-2 rounded-lg text-white font-semibold transition duration-200 ${
              isDarkMode ? 'bg-[#FFAA00]' : 'bg-[#FFAA00]'
            }`}
          >
            Soumettre
          </button>
        </form>
      </div>
    </div>
  );
};
export default ModalAjoutFeedback;