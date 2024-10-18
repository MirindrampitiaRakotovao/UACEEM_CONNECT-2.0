import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Avatar from '../avatar';
import { useDarkMode } from '../../contexts/DarkModeContext'; // Importer le hook pour le mode sombre

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
  onSelectUser: (user: Discussion | Etudiant) => void;
}

const Conversations: React.FC<ConversationsProps> = ({ onSelectUser }) => {
  const { isDarkMode } = useDarkMode(); // Utiliser le hook pour savoir si le mode sombre est activé
  const [discussionsRecentes, setDiscussionsRecentes] = useState<Discussion[]>([]);
  const [etudiantsRestants, setEtudiantsRestants] = useState<Etudiant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const response = await axios.get('http://localhost:4000/messagePrivee/discussions', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, 
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
    onSelectUser(user);
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={`flex ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      {/* Liste des discussions */}
      <div className={`max-w-sm shadow-lg rounded-lg overflow-hidden mx-auto my-4 p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <input
          type="text"
          placeholder="Rechercher dans Messenger"
          className={`mb-4 p-2 rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'} focus:outline-none`}
        />

        <div className="space-y-4">
          {discussionsRecentes.length > 0 ? (
            discussionsRecentes.map((discussion) => (
              <div key={discussion.id} 
                   className={`flex items-center space-x-2 cursor-pointer p-2 rounded ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                   onClick={() => handleSelectUser(discussion)}
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
                   className={`flex items-center space-x-2 cursor-pointer p-2 rounded ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                   onClick={() => handleSelectUser(etudiant)}
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
