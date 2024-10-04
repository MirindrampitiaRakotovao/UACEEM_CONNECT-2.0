import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image, PackageOpen, CalendarDays, Heart, MessageCircle, Flag } from 'lucide-react'; // Import icons
import Avatar from '../avatar';
import ModalPublication from '../ModalPublication';
import { getPublicPublications } from '../../services/publicationService';

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

const MainContent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const data = await getPublicPublications();
        setPublications(data);
      } catch (err: any) {
        if (err.message === 'Utilisateur non authentifié') {
          navigate('/login');
        } else {
          setError('Erreur lors du chargement des publications.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPublications();
  }, [navigate]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <main className="relative flex-1 h-[90vh] overflow-y-scroll bg-gray-50 p-6 scrollbar-hidden">
      {/* Section de création de publication toujours visible */}
      <div className="bg-white p-4 rounded-md shadow mb-6 top-0 z-10">
        <div className="flex mb-6">
          <Avatar />
          <input
            type="text"
            placeholder="Que voulez-vous faire aujourd'hui ?"
            className="w-full p-2 border rounded-full hover:outline-none hover:ring-2 hover:ring-blue-500 mb-1 ml-3"
            onClick={openModal}
          />
        </div>

        {/* Divider */}
        <hr className="w-full my-4 border-gray-300" />

        {/* Icon section */}
        <div className="flex justify-around w-full">
          <div className="flex flex-col items-center">
            <Image className="w-6 h-6" />
            <span className="text-sm text-gray-700">Photo / Video</span>
          </div>
          <div className="flex flex-col items-center">
            <PackageOpen className="w-6 h-6" />
            <span className="text-sm text-gray-700">Fichier</span>
          </div>
          <div className="flex flex-col items-center">
            <CalendarDays className="w-6 h-6" />
            <span className="text-sm text-gray-700">Événement</span>
          </div>
        </div>
      </div>

      {/* Liste des publications */}
      <div className="publication-list mt-8">
        {loading ? (
          <p>Chargement des publications...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          publications.map((publication) => (
            <div key={publication.id} className="bg-white p-4 rounded-md shadow mb-4">
              {/* Header Section with Avatar, Username, Role */}
              <div className="flex items-center mb-2">
                <Avatar  /> {/* Add avatar */}
                <div className="ml-3">
                  <h4 className="text-lg font-bold">{publication.etudiant.username}</h4>
                  <p className="text-sm text-gray-400">{publication.etudiant.role}</p> {/* Display user role */}
                </div>
              </div>

              {/* Content Section */}
              <p className="mt-2 mb-4">{publication.legende}</p>

              {/* Displaying files (images) associated with the publication */}
              <div className="grid grid-cols-2 gap-2">
                {publication.fichiers.map((file, index) => (
                  <img
                    key={index}
                    src={file.url_fichier}
                    alt={`Fichier ${index + 1}`}
                    className="w-full rounded-lg"
                  />
                ))}
              </div>

              {/* Date of publication */}
              <span className="text-sm text-gray-400">
                {new Date(publication.date_publication).toLocaleDateString()}
              </span>

              {/* Icon Actions */}
              <div className="flex justify-between mt-4">
                <div className="flex space-x-4">
                  <Heart className="w-6 h-6 text-gray-500 hover:text-red-500 cursor-pointer" />
                  <MessageCircle className="w-6 h-6 text-gray-500 hover:text-blue-500 cursor-pointer" />
                  <Flag className="w-6 h-6 text-gray-500 hover:text-yellow-500 cursor-pointer" />
                </div>
              </div>

              {/* Comment Section */}
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Commentaires..."
                  className="w-full p-2 border rounded-full hover:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal component */}
      <ModalPublication isOpen={isModalOpen} onClose={closeModal} />
    </main>
  );
};

export default MainContent;
