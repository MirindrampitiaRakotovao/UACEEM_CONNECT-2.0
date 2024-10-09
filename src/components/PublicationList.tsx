import React, { useState } from 'react';
import { Heart, MessageCircle, BadgeAlert, SendHorizonal, CircleX } from 'lucide-react';
import Avatar from './avatar';
import ModalFile from './ModalFile';

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

  const openFileModal = (fileUrl: string) => {
    setSelectedFileUrl(fileUrl);
    setIsFileModalOpen(true);
  };

  const closeFileModal = () => {
    setIsFileModalOpen(false);
    setSelectedFileUrl(null);
  };

  const sortedPublications = publications.sort(
    (a, b) => new Date(b.date_publication).getTime() - new Date(a.date_publication).getTime()
  );

  return (
    <div className="publication-list mt-8">
      {loading ? (
        <p>Chargement des publications...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        sortedPublications.map((publication) => (
          <div key={publication.id} className="bg-white p-4 rounded-md shadow mb-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex">
                <Avatar />
                <div className="ml-4">
                  <h4 className="text-lg font-bold">{publication.etudiant.username}</h4>
                  <p className="text-sm text-gray-400">{publication.etudiant.role}</p>
                  <span className="text-sm text-gray-400">
                    {new Date(publication.date_publication).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <button className="text-gray-500 hover:text-gray-700 ml-40">
                <CircleX />
              </button>
            </div>

            <p className="mt-2 mb-4">{publication.legende}</p>

            {/* Gestion des fichiers */}
            <div className={`grid ${publication.fichiers.length === 1 ? 'grid-cols-1 justify-items-center' : ''}`}>
              {/* Cas pour 3 images */}
              {publication.fichiers.length === 3 && (
                <div className="grid grid-cols-2 gap-2">
                  <div className="col-span-1">
                    <img
                      src={publication.fichiers[0].url_fichier}
                      alt="Image principale"
                      className="w-full h-80 object-cover rounded-3xl cursor-pointer p-3"
                      onClick={() => openFileModal(publication.fichiers[0].url_fichier)}
                    />
                  </div>
                  <div className="grid grid-rows-2 gap-2">
                    <img
                      src={publication.fichiers[1].url_fichier}
                      alt="Image verticale 1"
                      className="w-full h-40 object-cover rounded-3xl cursor-pointer p-3"
                      onClick={() => openFileModal(publication.fichiers[1].url_fichier)}
                    />
                    <img
                      src={publication.fichiers[2].url_fichier}
                      alt="Image verticale 2"
                      className="w-full h-40 object-cover rounded-3xl cursor-pointer p-3"
                      onClick={() => openFileModal(publication.fichiers[2].url_fichier)}
                    />
                  </div>
                </div>
              )}

              {/* Cas pour 4 images ou plus */}
              {publication.fichiers.length > 3 && (
                <div className="grid grid-cols-2 gap-2">
                  <div className="col-span-1">
                    <img
                      src={publication.fichiers[0].url_fichier}
                      alt="Image principale"
                      className="w-full h-80 object-cover rounded-3xl cursor-pointer p-3"
                      onClick={() => openFileModal(publication.fichiers[0].url_fichier)}
                    />
                  </div>
                  <div className="grid grid-rows-2 gap-2">
                    <img
                      src={publication.fichiers[1].url_fichier}
                      alt="Image verticale 1"
                      className="w-full h-40 object-cover rounded-3xl cursor-pointer p-3"
                      onClick={() => openFileModal(publication.fichiers[1].url_fichier)}
                    />
                    <div
                      className="relative w-full h-40 object-cover rounded-3xl cursor-pointer p-3 bg-gray-200 flex items-center justify-center"
                      onClick={() => openFileModal(publication.fichiers[3].url_fichier)}
                    >
                      <img
                        src={publication.fichiers[2].url_fichier}
                        alt="Image verticale 2"
                        className="absolute top-0 left-0 w-full h-full object-cover rounded-3xl opacity-50"
                      />
                      {publication.fichiers.length > 4 && (
                        <div className="absolute text-4xl text-white font-bold">
                          +{publication.fichiers.length - 3}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between mt-6">
              <button className="flex items-center space-x-2">
                <Heart className="w-6 h-6 text-gray-500 hover:text-red-500 cursor-pointer" />
                <span className="text-sm text-gray-500">J'adore</span>
              </button>

              <button className="flex items-center space-x-2 mx-auto">
                <MessageCircle className="w-6 h-6 text-gray-500 hover:text-blue-500 cursor-pointer" />
                <span className="text-sm text-gray-500">Commenter</span>
              </button>

              <button className="flex items-center space-x-2">
                <BadgeAlert className="w-6 h-6 text-gray-500 hover:text-yellow-500 cursor-pointer" />
                <span className="text-sm text-gray-500">Signaler</span>
              </button>
            </div>

            <div className="flex mt-10">
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

      {selectedFileUrl && (
        <ModalFile isOpen={isFileModalOpen} onClose={closeFileModal} fileUrl={selectedFileUrl} />
      )}
    </div>
  );
};

export default PublicationList;
