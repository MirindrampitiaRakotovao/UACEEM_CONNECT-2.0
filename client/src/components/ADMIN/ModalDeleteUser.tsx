// ConfirmDeleteModal.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext'; // Assurez-vous que le chemin est correct

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const { isDarkMode } = useTheme();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className={`${
              isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'
            } p-6 rounded-lg shadow-xl max-w-sm w-full mx-4`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Confirmation</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200">
                <X size={18} />
              </button>
            </div>
            <div className="flex items-start mb-4 text-yellow-500">
              <AlertTriangle size={20} className="mr-3 flex-shrink-0 mt-1" />
              <p className="text-sm">Voulez-vous vraiment supprimer l'utilisateur ?</p>
            </div>
            <p className="mb-4 text-xs text-gray-500 dark:text-gray-400">Cette action est irréversible.</p>
            <div className="flex justify-end space-x-3">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className={`px-4 py-1.5 text-xs rounded ${
                  isDarkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                } transition-colors duration-200`}
                onClick={onClose}
              >
                Annuler
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-1.5 text-xs text-white bg-red-500 rounded hover:bg-red-600 transition-colors duration-200"
                onClick={onConfirm}
              >
                Supprimer
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmDeleteModal;