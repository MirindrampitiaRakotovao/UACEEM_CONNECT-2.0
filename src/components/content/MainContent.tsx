import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image, PackageOpen, CalendarDays } from 'lucide-react'; // Import icons
import Avatar from '../avatar';
import ModalPublication from '../ModalPublication';
import PublicationList from '../PublicationList'; // Import de PublicationList
import { getPublicPublications } from '../../services/publicationService';
import socketService from '../../services/socketService';

type File = {
  id: number;
  url_fichier: string;
};

type Etudiant = {
  id: number;
  username: string;
  role: string;
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
  const socketRef = useRef<any>(null);
  

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

    // Initialisation du WebSocket une seule fois au montage du composant
    if (!socketRef.current) {
      console.log('Tentative de connexion au WebSocket...');
      socketRef.current = socketService.onNewPublication((newPublication: Publication) => {
        console.log('Nouvelle publication reçue via WebSocket:', newPublication);
        setPublications((prevPublications) => [newPublication, ...prevPublications]);
      });
    }

    return () => {
      if (socketRef.current) {
        console.log('Déconnexion du WebSocket...');
        socketService.disconnect();
        socketRef.current = null; // Assurer la déconnexion
      }
    };
  }, [navigate]);
  
  

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <main className="relative flex-1 h-[90vh] overflow-y-scroll bg-gray-50 p-6 scrollbar-hidden">
      {/* Section de création de publication */}
      <div className="bg-white p-4 rounded-md shadow mb-6 top-0 z-10">
        <div className="flex mb-6">
        {publications.length > 0 && <Avatar userId={publications[0].etudiant.id} />}
          <input
            type="text"
            placeholder="Que voulez-vous faire aujourd'hui ?"
            className="w-full p-2 border rounded-full hover:outline-none hover:ring-2 hover:ring-blue-500 mb-1 ml-3"
            onClick={openModal}
          />
        </div>

        <hr className="w-full my-4 border-gray-300" />

        <div className="flex justify-around w-full">
          <div className="flex flex-col items-center">
            <Image className="w-6 h-6" />
            <span className="text-sm text-gray-700">Photo / Vidéo</span>
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

      {/* Utilisation du composant PublicationList */}
      <PublicationList
        publications={publications}
        loading={loading}
        error={error}
      />

      {/* Modal pour la création de publication */}
      <ModalPublication isOpen={isModalOpen} onClose={closeModal} />
    </main>
  );
};

export default MainContent;
