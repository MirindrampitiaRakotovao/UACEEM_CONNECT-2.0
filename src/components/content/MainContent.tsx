import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image, PackageOpen, CalendarDays } from 'lucide-react';
import Avatar from '../avatar';
import ModalPublication from '../publication/ModalPublication';
import PublicationList from '../publication/PublicationList';
import { getPublicPublications } from '../../services/publicationService';
import socketService from '../../services/socketService';
import { useDarkMode } from '../../contexts/DarkModeContext'; // Import the useDarkMode hook

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
  const { isDarkMode } = useDarkMode(); // Get the dark mode state
  
  // Get the logged-in student from localStorage (or another source)
  const etudiant = JSON.parse(localStorage.getItem('etudiant') || '{}');
  
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
        socketRef.current = null;
      }
    };
  }, [navigate]);
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <main className={`relative flex-1 h-[90vh] overflow-y-scroll p-6 scrollbar-hidden ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-50'}`}>
      {/* Section for creating a publication */}
      <div className={`p-4 rounded-md shadow mb-6 ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
        <div className="flex mb-6">
          <Avatar userId={etudiant.id}/> {/* Use the logged-in student's ID */}
          <input
            type="text"
            placeholder="Que voulez-vous faire aujourd'hui ?"
            className={`w-full p-2 border rounded-full mb-1 ml-3 ${isDarkMode ? 'bg-gray-600 border-gray-500 text-white' : 'border-gray-300'}`}
            onClick={openModal}
            readOnly
          />
        </div>

        <hr className={`w-full my-4 ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`} />

        <div className="flex justify-around w-full">
          <div className="flex flex-col items-center">
            <Image className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-gray-700'}`} />
            <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>Photo / Vidéo</span>
          </div>
          <div className="flex flex-col items-center">
            <PackageOpen className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-gray-700'}`} />
            <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>Fichier</span>
          </div>
          <div className="flex flex-col items-center">
            <CalendarDays className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-gray-700'}`} />
            <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>Événement</span>
          </div>
        </div>
      </div>

      {/* Use the PublicationList component */}
      <PublicationList
        publications={publications}
        loading={loading}
        error={error}
      />

      {/* Modal for creating publication */}
      <ModalPublication isOpen={isModalOpen} onClose={closeModal} />
    </main>
  );
};

export default MainContent;
