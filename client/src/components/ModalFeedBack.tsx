import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Send } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ModalFeedBackProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalFeedBack: React.FC<ModalFeedBackProps> = ({ isOpen, onClose }) => {
  const { isDarkMode } = useTheme();
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [category, setCategory] = useState<'administration' | 'education' | null>(null);

  const handleSubmit = () => {
    // Logic to submit feedback
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className={`p-6 rounded-xl shadow-xl max-w-2xl w-full mx-4 ${
              isDarkMode 
                ? 'bg-[#2A3A53] text-white' 
                : 'bg-white text-gray-800'
            }`}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                Ajouter un feedback
              </h2>
              <button
                onClick={onClose}
                className={`transition-colors duration-200 ${
                  isDarkMode 
                    ? 'text-gray-400 hover:text-gray-200' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Category */}
              <div className="space-y-2">
                <label className={`text-sm font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Catégorie
                </label>
                <div className="flex space-x-3">
                  {['administration', 'education'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat as 'administration' | 'education')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 
                        ${category === cat 
                          ? 'bg-[#FFAA00] text-black border-2 border-[#FFAA00]' 
                          : `${isDarkMode 
                              ? 'bg-gray-700 text-gray-300 hover:border-gray-600' 
                              : 'bg-gray-100 text-gray-700 hover:border-gray-300'
                            } border-2 border-transparent`
                        }`}
                    >
                      {cat === 'administration' ? 'Administration' : 'Enseignement'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div className="space-y-2">
                <label className={`text-sm font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Note
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="focus:outline-none"
                    >
                      <Star
                        size={24}
                        className={`${
                          star <= rating
                            ? 'text-[#FFAA00] fill-current'
                            : isDarkMode ? 'text-gray-600' : 'text-gray-300'
                        } transition-colors duration-200 hover:text-[#FFAA00]`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Comment */}
              <div className="space-y-2">
                <label className={`text-sm font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Votre feedback
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Partagez votre expérience..."
                  className={`w-full p-3 rounded-lg border transition-colors duration-200 text-sm ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
                  } focus:ring-2 focus:ring-[#FFAA00] focus:border-[#FFAA00]`}
                  rows={4}
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-3 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    isDarkMode 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Annuler
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  className="px-4 py-2 text-sm font-medium text-black bg-[#FFAA00] rounded-lg hover:bg-[#FF9900] transition-colors duration-200 flex items-center space-x-2"
                >
                  <span>Soumettre</span>
                  <Send size={16} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalFeedBack;