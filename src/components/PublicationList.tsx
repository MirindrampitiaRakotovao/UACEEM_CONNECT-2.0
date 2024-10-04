import React, { useState } from 'react';
import { Heart, MessageCircle, BadgeAlert, SendHorizonal, CircleX } from 'lucide-react';
import Avatar from './avatar';
import ModalFile from './ModalFile';  // Importation du composant ModalFile

type File = {
  id: number;
  url_fichier: string;
};

type Etudiant = {
  id: number;
  username: string;
  role: string;
  avatar_url: string | null;
};

type Publication = {
  id: number;
  legende: string;
  date_publication: string;
  etudiant: Etudiant;
  fichiers: File[];
};

interface PublicationListProps {
  publications: Publication[];
  loading: boolean;
  error: string | null;
}

const PublicationList: React.FC<PublicationListProps> = ({ publications, loading, error }) => {
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const [selectedFileUrl, setSelectedFileUrl] = useState<string | null>(null);

  // Fonction pour ouvrir le modal et définir l'URL du fichier sélectionné
  const openFileModal = (fileUrl: string) => {
    setSelectedFileUrl(fileUrl);
    setIsFileModalOpen(true);
  };

  // Fonction pour fermer le modal
  const closeFileModal = () => {
    setIsFileModalOpen(false);
    setSelectedFileUrl(null);
  };

  return (
    <div className="publication-list mt-8">
      {loading ? (
        <p>Chargement des publications...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        publications.map((publication) => (
          <div key={publication.id} className="bg-white p-4 rounded-md shadow mb-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex">
              <Avatar />
              <div className="ml-4">
                <h4 className="text-lg font-bold">{publication.etudiant.username}</h4>
                <p className="text-sm text-gray-400">{publication.etudiant.role}</p>
              </div>
              </div>
              
              <button  className="text-gray-500 hover:text-gray-700 ml-40">
                < CircleX />
              </button>
            </div>

            <p className="mt-2 mb-4">{publication.legende}</p>

            {/* Affichage des fichiers dans une grille */}
            <div className={`grid ${publication.fichiers.length === 1 ? 'grid-cols-1 justify-items-center' : 'grid-cols-2'}`}>
              {publication.fichiers.map((file, index) => (
                <img
                  key={index}
                  src={file.url_fichier}
                  alt={`Fichier ${index + 1}`}
                  className={`w-full ${publication.fichiers.length === 1 ? 'h-60 object-contain' : 'h-40 object-cover'} rounded-lg cursor-pointer p-3`}
                  onClick={() => openFileModal(file.url_fichier)}
                />
              ))}
            </div>

            <span className="text-sm text-gray-400">
              {new Date(publication.date_publication).toLocaleDateString()}
            </span>

            <div className="flex justify-between mt-4">
              <div className="flex space-x-4">
                <Heart className="w-6 h-6 text-gray-500 hover:text-red-500 cursor-pointer" />
                <MessageCircle className="w-6 h-6 text-gray-500 hover:text-blue-500 cursor-pointer" />
                <BadgeAlert className="w-6 h-6 text-gray-500 hover:text-yellow-500 cursor-pointer" />
              </div>
            </div>

            <div className="flex mt-4">
              <input
                type="text"
                placeholder="Commentaires..."
                className="w-full p-2 border rounded-full hover:outline-none focus:ring-2 focus:ring-blue-500 "
              />
              <SendHorizonal className="w-10 h-10 text-gray-500 hover:text-blue-500 cursor-pointer ml-5" />
            </div>
          </div>
        ))
      )}

      {/* ModalFile pour afficher le fichier sélectionné */}
      {selectedFileUrl && (
        <ModalFile isOpen={isFileModalOpen} onClose={closeFileModal} fileUrl={selectedFileUrl} />
      )}
    </div>
  );
};

export default PublicationList;
