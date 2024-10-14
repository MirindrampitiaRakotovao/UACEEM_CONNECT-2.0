import React, { useState, useEffect } from 'react';
import { CircleX } from 'lucide-react';

interface File {
  url_fichier: string;
}

interface ModalFileProps {
  isOpen: boolean;
  onClose: () => void;
  files: File[];  // Recevoir plusieurs fichiers
}

const ModalFile: React.FC<ModalFileProps> = ({ isOpen, onClose, files }) => {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {fullscreenImage ? (
        // Affichage en plein écran
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
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
        <div className="relative bg-white rounded-lg shadow-lg max-w-xl mx-auto w-full max-h-[90vh] overflow-y-auto no-scrollbar">
          <div className="flex justify-between items-center mb-4">
            <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
              <CircleX />
            </button>
          </div>

          <div className="p-6 flex flex-col space-y-4 justify-center">
            {files.map((file, index) => (
              <img
                key={index}
                src={file.url_fichier}
                alt={`Fichier ${index + 1}`}
                className="w-full max-w-lg h-auto object-cover rounded-2xl cursor-pointer p-0.5"
                onClick={() => setFullscreenImage(file.url_fichier)} // Click pour afficher en plein écran
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalFile;
