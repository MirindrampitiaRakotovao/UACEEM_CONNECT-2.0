import React, { useState, useEffect } from 'react';
import PublicationList from './PublicationList';

const io = require('socket.io-client').io;  // Utilisation de require pour vérifier si l'erreur persiste

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

const socket = io('http://localhost:4000');  // Connexion au serveur Socket.io

const PublicationsPage = () => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Charger les publications existantes au montage
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

    // Écouter les événements Socket.io
    socket.on('nouvelle_publication', (nouvellePublication: Publication) => {
      setPublications((prevPublications) => [nouvellePublication, ...prevPublications]);
    });

    return () => {
      // Nettoyer les écouteurs d'événements Socket.io lors du démontage
      socket.off('nouvelle_publication');
    };
  }, []);

  return (
    <div>
      <h1>Publications</h1>
      <PublicationList publications={publications} loading={loading} error={error} />
    </div>
  );
};

export default PublicationsPage;
