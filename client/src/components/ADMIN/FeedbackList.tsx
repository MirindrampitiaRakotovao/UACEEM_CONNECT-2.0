import { Star, ThumbsUp, ThumbsDown, MessageCircle, Filter, Search, ChevronDown, Calendar, PenSquare } from 'lucide-react';
import React, { useState, useEffect } from 'react';

import ModalAjoutFeedback from './Feedback/ModalAjoutFeedback';
import apiService from '../../services/api';


// Interface pour définir la structure d'un feedback
interface Feedback {
  id: string;
  personnel: {
    id: string;
    nom: string;
    prenom: string;
  };
  cours: {
    id: string;
    titre: string;
  };
  date_publication: string;
  notation: number;
  commentaire: string;
  // Ajoutez d'autres champs si nécessaire
}
const FeedbackList: React.FC = () => {
  // États pour gérer les filtres et le modal
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // État pour stocker les feedbacks
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  
  // États pour les statistiques
  const [stats, setStats] = useState({
    noteMoyenne: 0,
    totalFeedbacks: 0,
    totalLikes: 0,
    feedbacksCeMois: 0
  });
  // États pour la gestion des erreurs et du chargement
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Fonction pour récupérer tous les feedbacks
  const fetchAllFeedbacks = async () => {
    try {
      setIsLoading(true);
      const response = await apiService.get<{ success: boolean; data: Feedback[] }>('/tous-feedback');
      
      // Console log pour déboguer
      console.log('Réponse complète des feedbacks:', response);
      
      if (response.success) {
        // Mise à jour des feedbacks
        setFeedbacks(response.data);
        
        // Calcul des statistiques
        const calculStats = {
          noteMoyenne: response.data.length > 0 
            ? response.data.reduce((sum, f) => sum + f.notation, 0) / response.data.length 
            : 0,
          totalFeedbacks: response.data.length,
          totalLikes: response.data.length * 2, // Exemple de calcul, à ajuster
          feedbacksCeMois: response.data.filter(f => 
            new Date(f.date_publication).getMonth() === new Date().getMonth()
          ).length
        };
        
        // Console log pour les statistiques
        console.log('Statistiques calculées:', calculStats);
        
        setStats(calculStats);
      } else {
        throw new Error('Impossible de récupérer les feedbacks');
      }
    } catch (err) {
      console.error('Erreur lors de la récupération des feedbacks:', err);
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };
  // Effet pour charger les feedbacks au montage du composant
  useEffect(() => {
    fetchAllFeedbacks();
  }, []);
  // Gestionnaires pour le modal
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  // Rendu conditionnel en cas de chargement ou d'erreur
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Chargement des feedbacks...
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-3">
      <div className="max-w-[1800px] mx-auto">
        {/* Header avec bouton */}
        <div className="mb-4 flex justify-between items-start">
          <div>
            <h1 className="text-lg font-medium text-gray-800 mb-1">Feedbacks reçus</h1>
            <p className="text-xs text-gray-600">
              Consultez et analysez les retours des étudiants
            </p>
          </div>
          <button
            onClick={handleOpenModal}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-xs transition-colors"
          >
            <PenSquare className="w-3 h-3" />
            Donner un feedback
          </button>
        </div>
        {/* Stats Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 mb-4">
          {[
            { 
              label: 'Note moyenne', 
              value: stats.noteMoyenne.toFixed(1), 
              icon: Star, 
              color: 'bg-yellow-500' 
            },
            { 
              label: 'Total likes', 
              value: stats.totalLikes.toString(), 
              icon: ThumbsUp, 
              color: 'bg-green-500' 
            },
            { 
              label: 'Total feedbacks', 
              value: stats.totalFeedbacks.toString(), 
              icon: MessageCircle, 
              color: 'bg-blue-500' 
            },
            { 
              label: 'Ce mois', 
              value: stats.feedbacksCeMois.toString(), 
              icon: Calendar, 
              color: 'bg-purple-500' 
            },
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-md shadow-sm border border-gray-100 p-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">{stat.label}</p>
                  <p className="text-base font-medium mt-0.5">{stat.value}</p>
                </div>
                <div className={`p-1.5 rounded-md ${stat.color} bg-opacity-10`}>
                  <stat.icon className={`w-3.5 h-3.5 ${stat.color.replace('bg-', 'text-')}`} />
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <div className="flex-1 relative">
            <Search className="w-3 h-3 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un feedback..."
              className="w-full pl-7 pr-2 py-1.5 rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-xs"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-2 py-1.5 rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-xs"
              >
                <option value="all">Tous les cours</option>
                <option value="recent">Cours récents</option>
                <option value="rated">Mieux notés</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-2 py-1.5 rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-xs"
              >
                <option value="date">Date</option>
                <option value="rating">Note</option>
                <option value="likes">Likes</option>
              </select>
            </div>
          </div>
          {/* Feedback List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {feedbacks.map((feedback) => (
              <div key={feedback.id} className="bg-white rounded-md shadow-sm border border-gray-100 p-3 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xs font-medium text-gray-800">{feedback.cours.titre}</h3>
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
                        className={`w-3 h-3 ${i < feedback.notation
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                          }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-600 mb-2 line-clamp-3">{feedback.commentaire}</p>
                <div className="flex items-center gap-3 text-[10px] text-gray-500">
                  <div className="flex items-center gap-0.5">
                    <ThumbsUp className="w-3 h-3" />
                    {feedback.likes}
                  </div>
                  <div className="flex items-center gap-0.5">
                    <ThumbsDown className="w-3 h-3" />
                    {feedback.dislikes}
                  </div>
                  <div className="flex items-center gap-0.5">
                    <MessageCircle className="w-3 h-3" />
                    {feedback.responses}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Modal pour ajouter un feedback */}
        <ModalAjoutFeedback isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>
    );
  };
  export default FeedbackList;