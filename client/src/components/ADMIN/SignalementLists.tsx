import 'chart.js/auto';

import { MoreVertical, AlertCircle, Eye, Calendar, TrendingUp } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';

import { useTheme } from '../../context/ThemeContext.tsx';


// Composant Modal
const Modal = ({ isOpen, onClose, title, children, isDarkMode }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay avec animation de fondu */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity animate-fadeIn"
        onClick={onClose} />

      {/* Container principal */}
      <div className="flex items-center justify-center min-h-screen px-4 py-6 sm:p-0">
        <div className={`
          relative w-full max-w-xl transform rounded-2xl shadow-2xl
          transition-all duration-300 animate-modalSlideIn
          ${isDarkMode
            ? 'bg-gray-800 border border-gray-700'
            : 'bg-white'
          }
        `}>
          {/* En-tête du modal */}
          <div className="flex items-center justify-between p-6 border-b
                        ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}">
            <h3 className={`text-xl font-semibold 
                         ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {title}
            </h3>
            <button
              onClick={onClose}
              className={`
                rounded-full p-2 transition-colors duration-200
                ${isDarkMode
                  ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-200'
                  : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                }
              `}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Contenu du modal */}
          <div className="p-6 space-y-6">
            <div className={`
              prose max-w-none
              ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}
            `}>
              {children}
            </div>
          </div>

          {/* Pied du modal avec actions */}
          <div className={`
            flex justify-end gap-3 p-6 border-t
            ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}
          `}>
            <button
              onClick={onClose}
              className={`
                px-4 py-2 text-sm font-medium rounded-lg transition-colors
                ${isDarkMode
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }
              `}
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Composants Squelettes (inchangés)
const StatCardSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
  </div>
);

const SignalementItemSkeleton = () => (
  <div className="animate-pulse p-4">
    <div className="flex justify-between">
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
      </div>
      <div className="flex space-x-3">
        <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
      </div>
    </div>
  </div>
);

const ChartSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-[400px] bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
  </div>
);

const SignalementLists = () => {
  const { isDarkMode } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [signalements, setSignalements] = useState([
    { id: 1, title: 'Publication indésirable', user: 'Gracia RAKOTO', time: '2h ago', status: 'En attente', description: 'Description détaillée du signalement...' },
    { id: 2, title: 'Atteinte privée', user: 'Jacques RANDRIA', time: '5h ago', status: 'En cours', description: 'Description détaillée du signalement...' },
    { id: 3, title: 'Commentaire inapproprié', user: 'RAKOTOZAFY', time: '1j ago', status: 'Résolu', description: 'Description détaillée du signalement...' },
    { id: 4, title: 'Feedback inapproprié', user: 'Alexis RAKOTOZAFY', time: '2j ago', status: 'Résolu', description: 'Description détaillée du signalement...' },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleStatusChange = (id, newStatus) => {
    setSignalements(signalements.map(item =>
      item.id === id ? { ...item, status: newStatus } : item
    ));
  };

  const dataSignalement = {
    labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    datasets: [
      {
        label: 'Publications indésirables',
        data: [10, 12, 15, 8, 14, 9, 11],
        borderColor: isDarkMode ? '#8b5cf6' : '#6366f1',
        backgroundColor: isDarkMode ? 'rgba(139, 92, 246, 0.1)' : 'rgba(99, 102, 241, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Atteinte privée',
        data: [5, 6, 7, 10, 8, 6, 9],
        borderColor: isDarkMode ? '#ec4899' : '#db2777',
        backgroundColor: isDarkMode ? 'rgba(236, 72, 153, 0.1)' : 'rgba(219, 39, 119, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Commentaire inapproprié',
        data: [2, 3, 1, 4, 5, 3, 2],
        borderColor: isDarkMode ? '#f59e0b' : '#d97706',
        backgroundColor: isDarkMode ? 'rgba(245, 158, 11, 0.1)' : 'rgba(217, 119, 6, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Feedback inapproprié',
        data: [1, 2, 1, 3, 2, 4, 3],
        borderColor: isDarkMode ? '#10b981' : '#059669',
        backgroundColor: isDarkMode ? 'rgba(16, 185, 129, 0.1)' : 'rgba(5, 150, 105, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        titleColor: isDarkMode ? '#fff' : '#000',
        bodyColor: isDarkMode ? '#fff' : '#000',
        padding: 12,
        titleFont: { size: 14 },
        bodyFont: { size: 13 },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: isDarkMode ? '#9ca3af' : '#6b7280' },
      },
      y: {
        grid: {
          color: isDarkMode ? 'rgba(75, 85, 99, 0.3)' : 'rgba(243, 244, 246, 1)'
        },
        ticks: { color: isDarkMode ? '#9ca3af' : '#6b7280' },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };
  return (
    <div className={`min-h-screen transition-colors duration-200  p-4 sm:p-6 lg:p-8`}>
      <div className="max-w-8xl mx-auto space-y-6 lg:space-y-8">
        {/* En-tête */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Gestion des signalements
          </h1>
          <div className="w-full sm:w-auto">
            <select
              className={`w-full sm:w-auto ${isDarkMode
                ? 'bg-gray-800 border-gray-700 text-gray-200'
                : 'bg-white border-gray-200 text-gray-600'
                } border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option>Cette semaine</option>
              <option>Ce mois</option>
              <option>Cette année</option>
            </select>
          </div>
        </header>

        {/* Cards statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {isLoading ? (
            [...Array(4)].map((_, index) => (
              <StatCardSkeleton key={index} />
            ))
          ) : (
            [
              { title: 'Total Signalements', value: '156', icon: AlertCircle, color: 'blue' },
              { title: 'Cette semaine', value: '32', icon: Calendar, color: 'pink' },
              { title: 'En attente', value: '12', icon: Eye, color: 'yellow' },
              { title: 'Taux de résolution', value: '89%', icon: TrendingUp, color: 'green' },
            ].map((stat, index) => (
              <div
                key={index}
                className={`${isDarkMode
                  ? 'bg-gray-800 hover:bg-gray-700'
                  : 'bg-white hover:bg-gray-50'
                  } rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {stat.title}
                    </p>
                    <p className={`text-2xl font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {stat.value}
                    </p>
                  </div>
                  <stat.icon className={`w-8 h-8 text-${stat.color}-${isDarkMode ? '400' : '500'}`} />
                </div>
              </div>
            ))
          )}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
          {/* Liste des signalements */}
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'
            } rounded-xl shadow-sm overflow-hidden`}>
            <div className="p-6">
              <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Derniers signalements
              </h2>
            </div>
            <div className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {isLoading ? (
                [...Array(4)].map((_, index) => (
                  <SignalementItemSkeleton key={index} />
                ))
              ) : (
                signalements.map((item) => (
                  <div key={item.id} className={`p-4 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors`}>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {item.title}
                        </p>
                        <div className="flex items-center text-sm space-x-2">
                          <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                            {item.user}
                          </span>
                          <span className={isDarkMode ? 'text-gray-600' : 'text-gray-400'}>•</span>
                          <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                            {item.time}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`px-3 py-1 rounded-full text-xs ${getStatusStyle(item.status, isDarkMode)
                          }`}>
                          {item.status}
                        </span>
                        <DropdownMenu
                          isDarkMode={isDarkMode}
                          signalement={item}
                          onStatusChange={handleStatusChange}
                        />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Graphique */}
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'
            } rounded-xl p-6 shadow-sm`}>
            <h2 className={`text-lg font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
              Évolution des signalements
            </h2>
            {isLoading ? (
              <ChartSkeleton />
            ) : (
              <>
                <div className="h-[400px]">
                  <Line data={dataSignalement} options={options} />
                </div>
                <div className="mt-6 flex flex-wrap gap-4 justify-center">
                  {dataSignalement.datasets.map((dataset, index) => (
                    <div key={index} className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: dataset.borderColor }}
                      ></div>
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                        {dataset.label}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div >
  );
};

const DropdownMenu = ({ isDarkMode, signalement, onStatusChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleViewDetails = () => {
    setIsOpen(false);
    setShowDetailsModal(true);
  };

  const handleMarkAsResolved = () => {
    (status.id, 'Résolu');
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
          }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <MoreVertical className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
      </button>

      {isOpen && (
        <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-50 py-1 ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}>
          <button
            onClick={handleViewDetails}
            className={`w-full px-4 py-2 text-left text-sm ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'
              }`}
          >
            Voir les détails
          </button>
          <button
            onClick={handleMarkAsResolved}
            className={`w-full px-4 py-2 text-left text-sm ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'
              }`}
          >
            Marquer comme résolu
          </button>
        </div>
      )}

      <Modal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        title="Détails du signalement"
        isDarkMode={isDarkMode}
      >
        <div className="space-y-6">
          {/* En-tête du signalement */}
          <div className={`
      p-4 rounded-lg
      ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}
    `}>
            <h4 className={`
        text-lg font-medium mb-2
        ${isDarkMode ? 'text-white' : 'text-gray-900'}
      `}>
              {signalement.title}
            </h4>
            <p className={`
        text-sm
        ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}
      `}>
              {signalement.description}
            </p>
          </div>

          {/* Informations détaillées */}
          <div className="grid grid-cols-2 gap-4">
            <div className={`
        p-4 rounded-lg
        ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}
      `}>
              <p className="text-sm mb-1 text-gray-500">Signalé par</p>
              <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {signalement.user}
              </p>
            </div>
            <div className={`
        p-4 rounded-lg
        ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}
      `}>
              <p className="text-sm mb-1 text-gray-500">Date</p>
              <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {signalement.time}
              </p>
            </div>
          </div>

          {/* Statut */}
          <div className={`
      mt-4 p-4 rounded-lg
      ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}
    `}>
            <p className="text-sm mb-2 text-gray-500">Statut actuel</p>
            <span className={`
        px-3 py-1 rounded-full text-sm font-medium
        ${getStatusStyle(signalement.status, isDarkMode)}
      `}>
              {signalement.status}
            </span>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// Fonction utilitaire pour les styles de statut
const getStatusStyle = (status, isDarkMode) => {
  switch (status) {
    case 'En attente':
      return isDarkMode
        ? 'bg-yellow-900/50 text-yellow-200'
        : 'bg-yellow-100 text-yellow-800';
    case 'En cours':
      return isDarkMode
        ? 'bg-blue-900/50 text-blue-200'
        : 'bg-blue-100 text-blue-800';
    case 'Résolu':
      return isDarkMode
        ? 'bg-green-900/50 text-green-200'
        : 'bg-green-100 text-green-800';
    default:
      return '';
  }
};

export default SignalementLists;