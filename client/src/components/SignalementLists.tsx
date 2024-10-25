import React, { useState, useEffect, useRef } from 'react'; // Importer useState et useEffect pour gérer l'état et les effets
import { MoreVertical } from 'lucide-react'; // Icône pour afficher le menu déroulant
import { Line } from 'react-chartjs-2'; // Graphique en ligne
import 'chart.js/auto';

const Signalement = () => {
  // Données pour le graphique des statistiques
  const dataSignalement = {
    labels: ['J1', 'J2', 'J3', 'J4'], // Labels des jours
    datasets: [
      {
        label: 'Publications indésirables',
        data: [10, 12, 15, 8], // Valeurs pour chaque jour
        borderColor: 'rgba(255, 99, 132, 1)', // Couleur de la ligne
        backgroundColor: 'rgba(255, 99, 132, 0.2)', // Couleur de l'arrière-plan
        fill: true, // Remplir la zone sous la ligne
        tension: 0.4, // Arrondir les coins de la ligne
      },
      {
        label: 'Atteinte privée',
        data: [5, 6, 7, 10],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Commentaire inapproprié',
        data: [2, 3, 1, 4],
        borderColor: 'rgba(255, 206, 86, 1)',
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Feedback inapproprié',
        data: [1, 2, 1, 3],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Masquer la légende par défaut
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          color: 'rgba(200, 200, 200, 0.5)', // Couleur de la grille
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(200, 200, 200, 0.5)', // Couleur de la grille
        },
      },
    },
    animation: {
      duration: 1000, // Durée d'animation
      easing: 'easeOutBounce', // Type d'animation
    },
  };

  return (
    <div className="flex-1 p-6 max-w-5xl mx-auto">
      {/* Section des signalements */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-4">Gestion de signalement</h2>

        {/* Liste des signalements */}
        <div className="space-y-4">
          {[ // Exemple de signalements
            { title: 'Publication indésirable', user: 'Gracia RAKOTO' },
            { title: 'Atteinte privée', user: 'Jacques RANDRIA' },
            { title: 'Commentaire inapproprié', user: 'RAKOTOZAFY' },
            { title: 'Feedback inapproprié', user: 'Alexis RAKOTOZAFY' },
          ].map((signalement, index) => (
            <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm">
              <div>
                <p className="font-semibold">{signalement.title}</p>
                <p className="text-sm text-gray-500">{signalement.user}</p>
              </div>
              <DropdownMenu /> {/* Appel du composant DropdownMenu ici */}
            </div>
          ))}
        </div>
      </div>

      {/* Section des graphiques */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-center font-semibold mb-4">Statistique de Signalement</h3>
        <div className="h-72"> {/* Ajustement de la hauteur du graphique */}
          <Line data={dataSignalement} options={options} />
        </div>
        {/* Section des légendes */}
        <div className="mt-4 p-2 border-t border-gray-300 flex flex-wrap justify-center space-x-4">
          {dataSignalement.datasets.map((dataset, index) => (
            <div key={index} className="flex items-center">
              <div
                className="w-4 h-4 mr-2 rounded-full"
                style={{ backgroundColor: dataset.borderColor }} // Couleur de la légende
              ></div>
              <span className="text-sm">{dataset.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Composant DropdownMenu pour le menu déroulant
const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false); // État pour gérer l'ouverture du menu
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Référence pour le menu déroulant

  const toggleDropdown = () => {
    setIsOpen(!isOpen); // Inverse l'état d'ouverture
  };

  // Fonction pour fermer le dropdown lorsqu'on clique en dehors
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false); // Fermer le menu si le clic est en dehors
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside); // Ajouter un écouteur d'événement

    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // Nettoyer l'écouteur d'événement
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button className="text-gray-600" onClick={toggleDropdown}>
        <MoreVertical size={20} /> {/* Icône à trois points verticaux */}
      </button>

      {isOpen && ( // Affichage du menu déroulant si isOpen est vrai
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
          <ul className="py-1">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Voir</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Signalement;
