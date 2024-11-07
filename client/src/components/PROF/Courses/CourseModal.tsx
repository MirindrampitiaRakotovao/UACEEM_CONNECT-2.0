import { X, ChevronDown, Save } from 'lucide-react';
import React, { useState } from 'react';

import { useTheme } from '../../../context/ThemeContext'; // Assurez-vous que le chemin est correct


// Assurez-vous que le chemin est correct
const CourseModal = ({ isOpen, onClose, onSave }) => {
  const { isDarkMode } = useTheme();
  const [title, setTitle] = useState('');
  const [instructor, setInstructor] = useState('');
  const [level, setLevel] = useState('Débutant');
  const [price, setPrice] = useState('');
  const [subject, setSubject] = useState('mathematics');
  const SUBJECTS = [
    { id: 'mathematics', name: 'Mathématiques' },
    { id: 'science', name: 'Science' },
    { id: 'literature', name: 'Littérature' },
    { id: 'history', name: 'Histoire' },
    { id: 'arts', name: 'Arts' },
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
    const newCourse = {
      id: Math.random().toString(36).substring(7),
      title,
      instructor,
      level,
      price: parseFloat(price),
      subject,
      enrolled: 0,
      rating: 0,
      preview: '/images/default-course.jpg',
    };
    onSave(newCourse);
    onClose();
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
      <div className={`w-full max-w-sm rounded-xl shadow-xl transform transition-all duration-300 ease-in-out
        ${isDarkMode 
          ? 'bg-gradient-to-b from-[#2A3A53] to-[#252b53] text-white' 
          : 'bg-gradient-to-b from-white to-gray-100 text-gray-800'}`}>
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200/20">
          <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Nouveau cours
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
          {/* Input fields */}
          {[
            { id: 'title', label: 'Titre du cours', type: 'text', value: title, onChange: setTitle },
            { id: 'instructor', label: 'Instructeur', type: 'text', value: instructor, onChange: setInstructor },
            { id: 'price', label: 'Prix (€)', type: 'number', value: price, onChange: setPrice },
          ].map((field) => (
            <div key={field.id} className="space-y-1">
              <label 
                htmlFor={field.id} 
                className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                {field.label}
              </label>
              <input
                id={field.id}
                type={field.type}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                required
                className={`w-full px-3 py-2 text-xs rounded-lg outline-none transition-all duration-200
                  ${isDarkMode 
                    ? 'bg-white/5 border-gray-700 focus:border-[#FFAA00]' 
                    : 'bg-white border-gray-200 focus:border-blue-500'} 
                  border focus:ring-1 focus:ring-opacity-50 ${
                    isDarkMode ? 'focus:ring-[#FFAA00]' : 'focus:ring-blue-500'
                  }`}
              />
            </div>
          ))}
          {/* Select fields */}
          {[
            { 
              id: 'level', 
              label: 'Niveau', 
              value: level, 
              onChange: setLevel,
              options: [
                { value: 'Débutant', label: 'Débutant' },
                { value: 'Intermédiaire', label: 'Intermédiaire' },
                { value: 'Avancé', label: 'Avancé' },
              ]
            },
            {
              id: 'subject',
              label: 'Sujet',
              value: subject,
              onChange: setSubject,
              options: SUBJECTS.map(subj => ({ value: subj.id, label: subj.name }))
            }
          ].map((field) => (
            <div key={field.id} className="space-y-1">
              <label 
                htmlFor={field.id}
                className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                {field.label}
              </label>
              <div className="relative">
                <select
                  id={field.id}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  className={`w-full px-3 py-2 text-xs rounded-lg outline-none appearance-none transition-all duration-200
                    ${isDarkMode 
                      ? 'bg-white/5 border-gray-700 focus:border-[#FFAA00]' 
                      : 'bg-white border-gray-200 focus:border-blue-500'} 
                    border focus:ring-1 focus:ring-opacity-50 ${
                      isDarkMode ? 'focus:ring-[#FFAA00]' : 'focus:ring-blue-500'
                    }`}
                >
                  {field.options.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown 
                  size={14} 
                  className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none
                    ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} 
                />
              </div>
            </div>
          ))}
          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors
                ${isDarkMode 
                  ? 'text-gray-300 hover:bg-white/10' 
                  : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Annuler
            </button>
            <button
              type="submit"
              className={`px-4 py-2 text-xs font-medium rounded-lg flex items-center space-x-2
                ${isDarkMode 
                  ? 'bg-[#FFAA00] text-gray-900 hover:bg-[#FFB833]' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'} 
                transition-colors duration-200`}
            >
              <Save size={14} />
              <span>Sauvegarder</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CourseModal;