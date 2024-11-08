import { X, Star, Save } from 'lucide-react';
import React, { useState } from 'react';

import { useTheme } from '../../../context/ThemeContext'; // Assurez-vous que le chemin est correct


// Assurez-vous que le chemin est correct
interface ModalAjoutFeedbackProps {
  isOpen: boolean;
  onClose: () => void;
}
const ModalAjoutFeedback: React.FC<ModalAjoutFeedbackProps> = ({ isOpen, onClose }) => {
  const { isDarkMode } = useTheme();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique d'envoi du feedback
    console.log({ rating, comment, selectedCourse });
    onClose();
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
      <div 
        className={`w-full max-w-sm rounded-xl shadow-xl transform transition-all duration-300 ease-in-out
          ${isDarkMode 
            ? 'bg-gradient-to-b from-[#2A3A53] to-[#252b53] text-white' 
            : 'bg-gradient-to-b from-white to-gray-100 text-gray-800'}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200/20">
          <h2 
            className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
          >
            Ajouter un Feedback
          </h2>
          <button
            onClick={onClose}
            className={`p-1 rounded-full transition-colors ${
              isDarkMode 
                ? 'hover:bg-white/10 text-gray-300' 
                : 'hover:bg-gray-200 text-gray-600'
            }`}
          >
            <X size={16} />
          </button>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Sélection du cours */}
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
              className={`w-full px-3 py-2 text-xs rounded-lg outline-none transition-all duration-200
                ${isDarkMode 
                  ? 'bg-white/5 border-gray-700 focus:border-[#FFAA00]' 
                  : 'bg-white border-gray-200 focus:border-blue-500'} 
                border focus:ring-1 focus:ring-opacity-50 ${
                  isDarkMode ? 'focus:ring-[#FFAA00]' : 'focus:ring-blue-500'
                }`}
            >
              <option value="">Sélectionner un cours</option>
              <option value="prog">Introduction à la Programmation</option>
              <option value="algo">Algorithmes Avancés</option>
              <option value="data">Structures de Données</option>
            </select>
          </div>
          {/* Notation */}
          <div className="space-y-1">
            <label 
              className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
            >
              Note
            </label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 cursor-pointer ${
                    star <= rating 
                      ? (isDarkMode ? 'text-[#FFAA00] fill-current' : 'text-yellow-400 fill-current')
                      : 'text-gray-300'
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>
          {/* Commentaire */}
          <div className="space-y-1">
            <label 
              htmlFor="comment"
              className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
            >
              Commentaire
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className={`w-full px-3 py-2 text-xs rounded-lg outline-none transition-all duration-200
                ${isDarkMode 
                  ? 'bg-white/5 border-gray-700 focus:border-[#FFAA00]' 
                  : 'bg-white border-gray-200 focus:border-blue-500'} 
                border focus:ring-1 focus:ring-opacity-50 ${
                  isDarkMode ? 'focus:ring-[#FFAA00]' : 'focus:ring-blue-500'
                }`}
              rows={4}
              placeholder="Votre feedback..."
            />
          </div>
          {/* Bouton de soumission */}
          <button
            type="submit"
            className={`w-full py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-2
              ${isDarkMode
                ? 'bg-[#FFAA00] text-black hover:bg-[#FFD700]'
                : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
          >
            <Save size={16} />
            Envoyer le feedback
          </button>
        </form>
      </div>
    </div>
  );
};
export default ModalAjoutFeedback;