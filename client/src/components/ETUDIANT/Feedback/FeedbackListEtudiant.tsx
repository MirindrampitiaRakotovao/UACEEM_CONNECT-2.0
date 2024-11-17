import { Star, ThumbsUp, MessageCircle, PenSquare, Search, Calendar } from 'lucide-react';
import React, { useState, useEffect } from 'react';

import ModalAjoutFeedback from '../../ADMIN/Feedback/ModalAjoutFeedback';
import apiService from '../../../services/api';


// Interface pour définir la structure d'un feedback
interface Feedback {
  id: string;
  cours: {
    id: string;
    titre: string;
  };
  date_publication: string;
  notation: number;
  commentaire: string;
}
const FeedbackListEtudiant: React.FC = () => {
  // États pour gérer les feedbacks et l'interface
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // États pour la gestion du chargement et des erreurs
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // États pour les filtres
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  // Statistiques des feedbacks
  const [stats, setStats] = useState({
    totalFeedbacks: 0,
    noteMoyenne: 0,
    coursAvecFeedback: 0
  });
  // Fonction pour récupérer les feedbacks de l'étudiant
  const fetchStudentFeedbacks = async () => {
    try {
      setIsLoading(true);
      const response = await apiService.get<{ success: boolean; data: Feedback[] }>('/student-feedback');
      
      // Console log pour déboguer
      console.log('Feedbacks de l\'étudiant:', response);
      
      if (response.success) {
        // Mise à jour des feedbacks
        setFeedbacks(response.data);
        
        // Calcul des statistiques
        const calculStats = {
          totalFeedbacks: response.data.length,
          noteMoyenne: response.data.length > 0 
            ? response.data.reduce((sum, f) => sum + f.notation, 0) / response.data.length 
            : 0,
          coursAvecFeedback: new Set(response.data.map(f => f.cours.id)).size
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
    fetchStudentFeedbacks();
  }, []);
  // Gestionnaires pour le modal
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  // Filtrer les feedbacks
  const filteredFeedbacks = feedbacks.filter(feedback => 
    feedback.cours.titre.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(feedback => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'recent') {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      return new Date(feedback.date_publication) >= oneMonthAgo;
    }
    if (selectedFilter === 'highRated') {
      return feedback.notation >= 4;
    }
    return true;
  });
  // Rendu conditionnel en cas de chargement ou d'erreur
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Chargement de vos feedbacks...
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
        {/* Header */}
        <div className="mb-4 flex justify-between items-start">
          <div>
            <h1 className="text-lg font-medium text-gray-800 mb-1">Mes Feedbacks</h1>
            <p className="text-xs text-gray-600">
              Consultez vos retours sur les différents cours
            </p>
          </div>
          <button
            onClick={handleOpenModal}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-xs transition-colors"
          >
            <PenSquare className="w-3 h-3" />
            Donner un nouveau feedback
          </button>
        </div>
        {/* Statistiques */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-4">
          {[
            { 
              label: 'Feedbacks total', 
              value: stats.totalFeedbacks.toString(), 
              icon: MessageCircle, 
              color: 'bg-blue-500' 
            },
            { 
              label: 'Note moyenne', 
              value: stats.noteMoyenne.toFixed(1), 
              icon: Star, 
              color: 'bg-yellow-500' 
            },
            { 
              label: 'Cours avec feedback', 
              value: stats.coursAvecFeedback.toString(), 
              icon: Calendar, 
              color: 'bg-green-500' 
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
        {/* Filtres */}
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <div className="flex-1 relative">
            <Search className="w-3 h-3 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un cours..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-7 pr-2 py-1.5 rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-xs"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-2 py-1.5 rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-xs"
            >
              <option value="all">Tous les feedbacks</option>
              <option value="recent">Récents</option>
              <option value="highRated">Mieux notés</option>
            </select>
          </div>
        </div>
        {/* Liste des feedbacks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {filteredFeedbacks.map((feedback) => (
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
                  {/* Vous devez ajuster les likes et dislikes si ces données sont disponibles */}
                  0
                </div>
                <div className="flex items-center gap-0.5">
                  <MessageCircle className="w-3 h-3" />
                  0
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
export default FeedbackListEtudiant;