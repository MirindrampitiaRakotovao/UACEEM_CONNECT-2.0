import React, { useEffect, useState } from 'react';
import { useTheme } from '../../../../context/ThemeContext';
import axios from 'axios';
import Cookies from 'js-cookie';

interface Notification {
  type: string;
  message: string;
}

const NotificationCard = ({ color, message, isDarkMode }: { color: string; message: string; isDarkMode: boolean }) => (
    <div className={`rounded-lg shadow-sm p-3 mb-2 flex items-start transition duration-200 ease-in-out border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
      <div className={`w-4 h-4 rounded-full mr-3 flex-shrink-0 ${color}`}></div>
      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{message}</p>
    </div>
);

const Notifications = () => {
  const { isDarkMode } = useTheme();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const fetchNotifications = async () => {
    try {
      const token = Cookies.get('token');
      const response = await axios.get('http://localhost:5000/api/notif/latest-notifications', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotifications(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des notifications:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
      <div className="rounded-lg p-4 relative">
        <h2 className={`font-bold text-lg mb-3 ${isDarkMode ? 'text-white' : 'text-black'}`}>Notifications</h2>
        {notifications.map((notification, index) => {
          // Convertir le type en minuscule pour s'assurer que la couleur correspond correctement
          const normalizedType = notification.type.toLowerCase();

          // Définir les couleurs basées sur le type normalisé
          const colors: Record<string, string> = {
            reaction: 'bg-green-700',
            commentaire: 'bg-blue-900',
            reponse: 'bg-yellow-500',
          };

          // Utiliser une couleur par défaut si le type n'est pas reconnu
          const color = colors[normalizedType] || 'bg-gray-500';

          return (
              <NotificationCard
                  key={index}
                  color={color}
                  message={notification.message}
                  isDarkMode={isDarkMode}
              />
          );
        })}
        <a href="#" className={`text-blue-500 text-sm hover:underline mt-2 block ${isDarkMode ? 'text-blue-400' : ''}`}>
          Voir plus...
        </a>
      </div>
  );
};

export default Notifications;
