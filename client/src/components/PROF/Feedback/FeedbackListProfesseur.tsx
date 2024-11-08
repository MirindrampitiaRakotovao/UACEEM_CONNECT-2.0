import { Star, ThumbsUp, ThumbsDown, MessageCircle, Filter, Search, ChevronDown, Calendar, Flag, Sun, Moon } from 'lucide-react';
import React, { useState } from 'react';

import { useTheme } from '../../../context/ThemeContext'; // Assurez-vous que le chemin est correct


// Assurez-vous que le chemin est correct


// Assurez-vous que le chemin est correct


// Assurez-vous que le chemin est correct
interface Feedback {
  id: string;
  studentId: string;
  courseTitle: string;
  date: string;
  rating: number;
  comment: string;
  likes: number;
  dislikes: number;
  responses: number;
  reported?: boolean;
}
const FeedbackListProfesseur: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([
    {
      id: '1',
      studentId: 'Anonyme',
      courseTitle: 'Introduction à la Programmation',
      date: '2024-01-15',
      rating: 4,
      comment: "Excellent cours, très bien structuré. Le professeur explique clairement les concepts complexes et est toujours disponible pour répondre aux questions.",
      likes: 24,
      dislikes: 2,
      responses: 3,
      reported: false,
    },
    {
      id: '2',
      studentId: 'Anonyme',
      courseTitle: 'Algorithmes Avancés',
      date: '2024-01-14',
      rating: 5,
      comment: "Les exemples pratiques sont très utiles. J'apprécie particulièrement les sessions de questions-réponses à la fin de chaque cours.",
      likes: 15,
      dislikes: 1,
      responses: 2,
      reported: false,
    },
    {
      id: '3',
      studentId: 'Anonyme',
      courseTitle: 'Structures de Données',
      date: '2024-01-13',
      rating: 3,
      comment: "Le rythme pourrait être un peu plus lent pour mieux assimiler les concepts complexes. Sinon, le contenu est intéressant.",
      likes: 8,
      dislikes: 3,
      responses: 1,
      reported: false,
    },
  ]);
  const handleReport = (feedbackId: string) => {
    setFeedbacks(prevFeedbacks => 
      prevFeedbacks.map(feedback => 
        feedback.id === feedbackId 
          ? { ...feedback, reported: !feedback.reported }
          : feedback
      )
    );
  };
  return (
    <div className={`min-h-screen p-3 `}>
      <div className="max-w-[1800px] mx-auto">
        {/* Header avec toggle mode sombre/clair */}
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
        {/* Stats Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 mb-4">
          {[
            { label: 'Note moyenne', value: '4.2', icon: Star, color: 'bg-yellow-500' },
            { label: 'Total likes', value: '47', icon: ThumbsUp, color: 'bg-green-500' },
            { label: 'Total feedbacks', value: '12', icon: MessageCircle, color: 'bg-blue-500' },
            { label: 'Ce mois', value: '8', icon: Calendar, color: 'bg-purple-500' },
          ].map((stat, index) => (
            <div 
              key={index} 
              className={`${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-100'
              } rounded-md shadow-sm border p-2`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {stat.label}
                  </p>
                  <p className={`text-base font-medium mt-0.5 ${isDarkMode ? 'text-white' : ''}`}>
                    {stat.value}
                  </p>
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
            <Search className={`w-3 h-3 absolute left-2 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
            <input
              type="text"
              placeholder="Rechercher un feedback..."
              className={`w-full pl-7 pr-2 py-1.5 rounded-md border ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700 text-white focus:ring-gray-600' 
                  : 'bg-white border-gray-200 focus:ring-blue-500'
              } focus:outline-none focus:ring-1 focus:border-transparent text-xs`}
            />
          </div>
          <div className="flex gap-2">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className={`px-2 py-1.5 rounded-md border text-xs ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700 text-white focus:ring-gray-600' 
                  : 'bg-white border-gray-200 focus:ring-blue-500'
              } focus:outline-none focus:ring-1 focus:border-transparent`}
            >
              <option value="all">Tous les cours</option>
              <option value="recent">Cours récents</option>
              <option value="rated">Mieux notés</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`px-2 py-1.5 rounded-md border text-xs ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700 text-white focus:ring-gray-600' 
                  : 'bg-white border-gray-200 focus:ring-blue-500'
              } focus:outline-none focus:ring-1 focus:border-transparent`}
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
                  <h3 className="text-xs font-medium">{feedback.courseTitle}</h3>
                  <p className="text-[10px] text-gray-500">
                    {new Date(feedback.date).toLocaleDateString('fr-FR', {
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
                        i < feedback.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-xs mb-2 line-clamp-3">{feedback.comment}</p>
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
                <button 
                  onClick={() => handleReport(feedback.id)} 
                  className={`flex items-center gap-0.5 ${feedback.reported ? 'text-red-500' : 'text-gray-500'}`}
                >
                  <Flag className="w-3 h-3" />
                  {feedback.reported ? 'Signalé' : 'Signaler'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default FeedbackListProfesseur;