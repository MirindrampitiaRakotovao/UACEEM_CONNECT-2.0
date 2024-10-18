import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Avatar from '../avatar';
//import ChatWindow from './ChatWindow';  // Importez le composant ChatWindow

interface Discussion {
  id: number;
  photo: string;
  username: string;
  role: string;
  lastMessage: string | null;
}

interface Etudiant {
  id: number;
  photo: string;
  username: string;
  role: string;
}

interface ConversationsProps {
  onSelectUser: (user: Discussion | Etudiant) => void;  // Define the onSelectUser prop
}

const Conversations: React.FC<ConversationsProps> = ({ onSelectUser }) => {
  const [discussionsRecentes, setDiscussionsRecentes] = useState<Discussion[]>([]);
  const [etudiantsRestants, setEtudiantsRestants] = useState<Etudiant[]>([]);
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
        
        const { discussionsRecentes, etudiantsRestants } = response.data;
        setDiscussionsRecentes(discussionsRecentes);
        setEtudiantsRestants(etudiantsRestants);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response ? err.response.data.error : 'Erreur inconnue');
        } else {
          setError('Erreur inconnue');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchDiscussions();
  }, []);

  const handleSelectUser = (user: Discussion | Etudiant) => {
    onSelectUser(user);  // Call the passed onSelectUser function
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex">
      {/* Liste des discussions */}
      <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden mx-auto my-4 p-6">
        <input
          type="text"
          placeholder="Rechercher dans Messenger"
          className="mb-4 p-2 rounded bg-gray-200 focus:outline-none"
        />

        <div className="space-y-4">
          {discussionsRecentes.length > 0 ? (
            discussionsRecentes.map((discussion) => (
              <div key={discussion.id} 
                   className="flex items-center space-x-2 cursor-pointer hover:bg-gray-200 p-2 rounded"
                   onClick={() => handleSelectUser(discussion)}  // Sélectionner l'utilisateur
              >
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

          {etudiantsRestants.length > 0 ? (
            etudiantsRestants.map((etudiant) => (
              <div key={etudiant.id} 
                   className="flex items-center space-x-2 cursor-pointer hover:bg-gray-200 p-2 rounded"
                   onClick={() => handleSelectUser(etudiant)}  // Sélectionner l'étudiant
              >
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

    </div>
  );
};

export default Conversations;
