import { Clock, MapPin, Calendar, List, Grid, X, User } from 'lucide-react';
import React, { useState, useEffect } from 'react';

import { useTheme } from '../../../context/ThemeContext';
import apiService from '../../../services/api';


// Types
interface Professeur {
  nom: string;
  prenom: string;
}
interface EmploiDuTemps {
  id: string;
  mention: string;
  niveau: string;
  jour: string;s
  heureDebut: string;
  heureFin: string;
  nomMatiere: string;
  salle: string;
  couleur: string;
  professeur: Professeur;
}
interface EmploisGroupes {
  [mention: string]: {
    [niveau: string]: EmploiDuTemps[];
  };
}
const EdtListProfesseur: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const { isDarkMode } = useTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [emploisGroupes, setEmploisGroupes] = useState<EmploisGroupes>({});
  const [selectedEvent, setSelectedEvent] = useState<EmploiDuTemps | null>(null);
  const timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
  useEffect(() => {
    const fetchEmploiDuTemps = async () => {
      try {
        setLoading(true);
        const response = await apiService.get<EmploisGroupes>('/list');
        setEmploisGroupes(response.data);
        setError(null);
      } catch (err) {
        setError("Erreur lors de la récupération des emplois du temps");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEmploiDuTemps();
  }, []);
  const formatTimeDisplay = (time: string) => {
    const timeParts = time.split(':');
    return `${timeParts[0]}h${timeParts[1]}`;
  };
  const getFilteredEmploisTemps = (): EmploiDuTemps[] => {
    const allEmplois: EmploiDuTemps[] = [];
    Object.values(emploisGroupes).forEach(niveaux => {
      Object.values(niveaux).forEach(emplois => {
        allEmplois.push(...emplois);
      });
    });
    return allEmplois;
  };
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }
  const filteredEmploisTemps = getFilteredEmploisTemps();
  return (
    <div className={`min-h-screen ${isDarkMode
      ? 'bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100'
      : 'bg-gradient-to-b from-white to-gray-100 text-gray-800'
      }`}>
      <div className="max-w-[1600px] mx-auto p-2 sm:p-4">
        {/* Header */}
        <div className={`${isDarkMode ? 'bg-gray-800/50' : 'bg-white'} rounded-lg shadow-sm p-4 mb-4`}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className={`w-5 h-5 ${isDarkMode ? 'text-yellow-500' : 'text-yellow-600'}`} />
              <h1 className="text-lg font-semibold">Emploi du temps</h1>
            </div>
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors ${viewMode === 'list' ? (isDarkMode ? 'bg-gray-700' : 'bg-gray-200') : ''
                    }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Content */}
        {viewMode === 'list' ? (
          <div className={`${isDarkMode ? 'bg-gray-800/50' : 'bg-white'} rounded-lg shadow-sm p-4`}>
            {Object.entries(emploisGroupes).map(([mention, niveaux]) => (
              <div key={mention} className="mb-6">
                <h2 className="text-lg font-semibold mb-4">{mention}</h2>
                {Object.entries(niveaux).map(([niveau, emplois]) => (
                  <div key={`${mention}-${niveau}`} className="mb-4">
                    <h3 className="text-sm font-medium mb-2">{niveau}</h3>
                    <div className="space-y-2">
                      {emplois.map((emploi) => (
                        <div 
                          key={emploi.id} 
                          className={`${emploi.couleur} rounded-lg p-3 flex justify-between items-center`}
                          onClick={() => setSelectedEvent(emploi)}
                        >
                          <div className="flex-grow">
                            <div className="flex justify-between items-start">
                              <span className="font-medium text-xs">{emploi.nomMatiere}</span>
                              <span className="text-xs text-gray-600">
                                {formatTimeDisplay(emploi.heureDebut)} - {formatTimeDisplay(emploi.heureFin)}
                              </span>
                            </div>
                            <div className="mt-1 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <MapPin className="w-3 h-3 text-gray-500" />
                                <span className="text-xs">{emploi.salle}</span>
                              </div>
                              <span className="text-xs text-gray-600">{emploi.jour}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : null}
        {/* Modal de détails */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 max-w-md w-full`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-semibold">{selectedEvent.nomMatiere}</h2>
                  <p className="text-sm text-gray-600">{selectedEvent.mention} - {selectedEvent.niveau}</p>
                </div>
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="text-gray-500 hover:text-gray-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <span>
                    {formatTimeDisplay(selectedEvent.heureDebut)} - {formatTimeDisplay(selectedEvent.heureFin)}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <span>{selectedEvent.salle}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <span>{selectedEvent.jour}</span>
                </div>
                {selectedEvent.professeur && (
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-gray-500" />
                    <span>
                      {selectedEvent.professeur.nom} {selectedEvent.professeur.prenom}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
// Fonction utilitaire pour obtenir une couleur dynamique
const getColorForSubject = (matiere: string): string => {
  const colorMap: { [key: string]: string } = {
    'DROIT CIVIL I': 'bg-blue-100',
    'DROIT CONSTITUTIONNEL I': 'bg-green-100',
    'MACROECONOMIE': 'bg-red-100',
    'GENRE ET DEVELOPPEMENT': 'bg-purple-100',
    'CULTURE ET CIVILISATIONS MALAGASY': 'bg-yellow-100',
    'DYNAMIQUE INTERCULTURELLE': 'bg-indigo-100',
    'INFORMATIQUE': 'bg-pink-100',
    'DEFAULT': 'bg-gray-100'
  };
  return colorMap[matiere.toUpperCase()] || colorMap['DEFAULT'];
};
// Composant de filtre optionnel
const EmploiDuTempsFilter: React.FC<{
  onFilterChange: (filters: {
    mention?: string;
    niveau?: string;
    jour?: string;
  }) => void;
}> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    mention: '',
    niveau: '',
    jour: ''
  });
  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  return (
    <div className="flex gap-4 mb-4">
      <select 
        value={filters.mention}
        onChange={(e) => handleFilterChange('mention', e.target.value)}
        className="p-2 border rounded"
      >
        <option value="">Toutes les mentions</option>
        {/* Générer dynamiquement les options */}
      </select>
      <select 
        value={filters.niveau}
        onChange={(e) => handleFilterChange('niveau', e.target.value)}
        className="p-2 border rounded"
      >
        <option value="">Tous les niveaux</option>
        {/* Générer dynamiquement les options */}
      </select>
      <select 
        value={filters.jour}
        onChange={(e) => handleFilterChange('jour', e.target.value)}
        className="p-2 border rounded"
      >
        <option value="">Tous les jours</option>
        {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'].map(jour => (
          <option key={jour} value={jour}>{jour}</option>
        ))}
      </select>
    </div>
  );
};
export default EdtListProfesseur;