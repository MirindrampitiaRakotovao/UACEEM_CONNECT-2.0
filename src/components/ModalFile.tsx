import React, { useState, useEffect } from 'react';
import { CircleX, Download } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext'; // Import du hook pour le mode sombre

interface File {
  url_fichier: string;
}

interface ModalFileProps {
  isOpen: boolean;
  onClose: () => void;
  files: File[]; // Recevoir plusieurs fichiers
}

const ModalFile: React.FC<ModalFileProps> = ({ isOpen, onClose, files }) => {
  const { isDarkMode } = useDarkMode(); // Utilisation du mode sombre
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  // Fermer l'image en plein écran quand 'Escape' est pressée
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setFullscreenImage(null);
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${isDarkMode ? 'bg-black bg-opacity-80' : 'bg-white bg-opacity-50'}`}>
      {fullscreenImage ? (
        // Affichage en plein écran
        <div className={`fixed inset-0 z-50 flex items-center justify-center ${isDarkMode ? 'bg-black' : 'bg-white'} bg-opacity-90`}>
          <img src={fullscreenImage} alt="Fullscreen" className="max-w-full max-h-full object-contain" />
          <button
            onClick={() => setFullscreenImage(null)}
            className="absolute top-4 right-4 text-white text-2xl"
          >
            <CircleX size={40} />
          </button>
        </div>
      ) : (
        // Contenu du modal avec scrollbar cachée
        <div className={`relative rounded-lg shadow-lg max-w-xl mx-auto w-full max-h-[90vh] overflow-y-auto no-scrollbar ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
          <div className="flex justify-between items-center mb-4">
            <button onClick={onClose} className={`absolute top-2 right-2 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}>
              <CircleX />
            </button>
          </div>

          <div className="p-6 flex flex-col space-y-4 justify-center">
            {files.map((file, index) => (
              <div key={index} className="relative w-full max-w-lg">
                <img
                  src={file.url_fichier}
                  alt={`Fichier ${index + 1}`}
                  className="w-full h-auto object-cover rounded-2xl cursor-pointer p-0.5"
                  onClick={() => setFullscreenImage(file.url_fichier)} // Click pour afficher en plein écran
                />
                <a
                  href={file.url_fichier}
                  download={`image_${index + 1}`}
                  className={`absolute bottom-2 right-2 px-2 py-2 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-300 hover:bg-gray-400'} text-white rounded-full`}
                  title="Télécharger"
                >
                  <Download className="inline" size={20} />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalFile;
