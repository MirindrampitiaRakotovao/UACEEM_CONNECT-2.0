import React, { useState, useEffect } from 'react';
import PublicationList from './PublicationList';
import { useDarkMode } from '../../contexts/DarkModeContext'; // Import du mode sombre

const io = require('socket.io-client').io;

type Publication = {
  id: number;
  legende: string;
  date_publication: string;
  etudiant: {
    id: number;
    username: string;
    role: string;
  };
  fichiers: {
    id: number;
    url_fichier: string;
  }[];
};

const socket = io('http://localhost:4000'); // Connexion au serveur Socket.io

const PublicationsPage = () => {
  const { isDarkMode } = useDarkMode(); // Utilisation du mode sombre
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await fetch('http://localhost:4000/publication/public');
        const data = await response.json();
        setPublications(data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des publications');
        setLoading(false);
      }
    };

    fetchPublications();

    socket.on('nouvelle_publication', (nouvellePublication: Publication) => {
      setPublications((prevPublications) => [nouvellePublication, ...prevPublications]);
    });

    return () => {
      socket.off('nouvelle_publication');
    };
  }, []);

  return (
    <div
      className={`min-h-screen p-5 ${
        isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'
      }`}
    >
      <h1 className="text-2xl font-bold mb-4">Publications</h1>
      <PublicationList publications={publications} loading={loading} error={error} />
    </div>
  );
};

export default PublicationsPage;
