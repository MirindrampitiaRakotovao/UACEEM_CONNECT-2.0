// PublicationGroup.tsx
import React, { useState, useEffect } from 'react';
import { getPublicationGroup } from '../../services/publicationService'; // Import de la fonction
import PublicationList from '../publication/PublicationList';
import { useDarkMode } from '../../contexts/DarkModeContext'; 

const PublicationGroup: React.FC = () => {
  const [publications, setPublications] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const data = await getPublicationGroup(); // Appelle la fonction pour obtenir les publications
        setPublications(data);
      } catch (err) {
        setError('Erreur lors de la récupération des publications');
      } finally {
        setLoading(false);
      }
    };

    fetchPublications();
  }, []);

  if (loading) {
    return <div className="flex justify-center">Chargement</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="mt-6">
    <h3 className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>Vos Publications</h3>
        <PublicationList 
              publications={publications} 
              loading={loading} 
              error={error} 
            />
    </div>
  );
};

export default PublicationGroup;
