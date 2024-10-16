import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Avatar from '../avatar';

interface Discussion {
  id: number;
  photo: string;
  username: string;
  lastMessage: string | null;
}

interface Student {
  id: number;
  photo: string;
  username: string;
}

const Conversations: React.FC = () => {
  const [discussionsRecentes, setDiscussionsRecentes] = useState<Discussion[]>([]);
  const [etudiantsRestants, setEtudiantsRestants] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Récupérer les discussions et les étudiants restants
  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const response = await axios.get('http://localhost:4000/messagePrivee/discussions', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Assure-toi que le token est bien stocké
          },
        });
        
        console.log('Données reçues:', response.data); // Ajouter ce log
        const { discussionsRecentes, etudiantsRestants } = response.data;
        setDiscussionsRecentes(discussionsRecentes);
        setEtudiantsRestants(etudiantsRestants);
      } catch (err) {
        console.error('Erreur lors de la récupération des conversations:', err);
      
        if (axios.isAxiosError(err)) {
          // Si l'erreur est une erreur axios
          setError(err.response ? err.response.data.error : 'Erreur inconnue');
        } else {
          // Si l'erreur est d'un autre type
          setError('Erreur inconnue');
        }
      }
       finally {
        setLoading(false);
      }
    };
  
    fetchDiscussions();
  }, []);
  
  

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden mx-auto my-4 p-6">
      <input
        type="text"
        placeholder="Rechercher dans Messenger"
        className="mb-4 p-2 rounded bg-gray-200 focus:outline-none"
      />

      <h2 className="font-bold mb-4">Discussions récentes</h2>
      <div className="space-y-4">
        {discussionsRecentes.length > 0 ? (
          discussionsRecentes.map((discussion) => (
            <div key={discussion.id} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-200 p-2 rounded">
              <Avatar userId={discussion.id} size="w-10 h-10" />
              <div>
                <p className="font-bold">{discussion.username}</p>
                <p className="text-sm text-gray-500">{discussion.lastMessage || 'Aucun message'}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Aucune discussion récente.</p>
        )}
      </div>

      <h2 className="font-bold mt-6 mb-4">Étudiants restants</h2>
      <div className="space-y-4">
        {etudiantsRestants.length > 0 ? (
          etudiantsRestants.map((etudiant) => (
            <div key={etudiant.id} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-200 p-2 rounded">
              <Avatar userId={etudiant.id} size="w-10 h-10" />
              <div>
                <p className="font-bold">{etudiant.username}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Aucun étudiant restant.</p>
        )}
      </div>
    </div>
  );
};

export default Conversations;
