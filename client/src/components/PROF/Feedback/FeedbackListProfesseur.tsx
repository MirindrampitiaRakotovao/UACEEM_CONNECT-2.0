import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

import { useTheme } from '../../../context/ThemeContext';
import apiService from '../../../services/api';


interface Feedback {
  id: string;
  commentaire: string;
  notation: number;
  cours: {
    id: string;
    titre: string;
  };
  personnel: {
    id: string;
    nom: string;
    prenom: string;
    role: string;
  };
  date_publication: string;
  cours_id: string;
  personnel_id: string;
}
interface PaginationInfo {
  totalItems: number;
  totalPages: number;
  currentPage: number;
}
const FeedbackListProfesseur: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo>({
    totalItems: 0,
    totalPages: 0,
    currentPage: 1
  });
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        console.log('Début de la récupération des feedbacks');
        const response = await apiService.get(`/professeur/feedbacks`, {
          params: { page, limit },
        });
        console.log('Réponse complète:', response.data);
        
        // Vérifiez si response.data est un tableau
        if (Array.isArray(response.data) && response.data.length > 0) {
          console.log('Données reçues:', response.data);
          
          // Utilisez directement response.data qui contient le tableau de feedbacks
          setFeedbacks(response.data);
          
          // Mettre à jour les informations de pagination
          setPagination(prevPagination => ({
            totalItems: response.data.length, // Si vous voulez le total des feedbacks
            totalPages: Math.ceil(response.data.length / limit),
            currentPage: page
          }));
        } else {
          console.error('Structure de données invalide');
          setFeedbacks([]);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Erreur lors de la récupération des feedbacks:', err);
        setError(err.message || 'Une erreur est survenue');
        setLoading(false);
      }
    };
    
    fetchFeedbacks();
  }, [page, limit]);
  const handleNextPage = () => {
    if (page < pagination.totalPages) {
      setPage(prevPage => prevPage + 1);
    }
  };
  const handlePrevPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };
  if (loading) {
    return <div>Chargement des feedbacks...</div>;
  }
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }
  return (
    <div className={`min-h-screen p-3`}>
      <div className="max-w-[1800px] mx-auto">
        <div className="mb-4 flex justify-between items-center">
          <div>
            <h1 className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-1`}>
              Feedbacks reçus
            </h1>
            <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Consultez et analysez les retours de vos étudiants
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {feedbacks.map((feedback) => (
            <div 
              key={feedback.id} 
              className={`${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700 text-white' 
                  : 'bg-white border-gray-100'
              } rounded-md shadow-sm border p-3 hover:shadow-md transition-shadow`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xs font-medium">{feedback.cours.titre}</h3>
                  <p className="text-[10px] text-gray-500">
                    {new Date(feedback.date_publication).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < feedback.notation
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-xs mb-2 line-clamp-3">{feedback.commentaire}</p>
              <div className="text-xs text-gray-500">
                <p>Posté par: {feedback.personnel.prenom} {feedback.personnel.nom}</p>
              </div>
            </div>
          ))}
        </div>
        {pagination.totalPages > 1 && (
          <div className="flex justify-center mt-4">
            <div className="flex items-center space-x-2">
              <button 
                onClick={handlePrevPage}
                disabled={page === 1}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                Précédent
              </button>
              <span>{page} / {pagination.totalPages}</span>
              <button 
                onClick={handleNextPage}
                disabled={page === pagination.totalPages}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                Suivant
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default FeedbackListProfesseur;