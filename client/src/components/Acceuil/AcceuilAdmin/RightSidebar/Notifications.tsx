import React, { useEffect, useState } from 'react';
import { useTheme } from '../../../../context/ThemeContext'; // Assurez-vous d'importer votre contexte de thème
import axios from 'axios';
import Cookies from 'js-cookie';

const NotificationCard = ({ color, message, isDarkMode }) => (
  <div className={`rounded-lg shadow-sm p-3 mb-2 flex items-start transition duration-200 ease-in-out border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
    <div className={`w-4 h-4 rounded-full mr-3 flex-shrink-0 ${color}`}></div>
    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{message}</p>
  </div>
);

const Notifications = () => {
  const { isDarkMode } = useTheme(); // Récupérer le mode sombre à partir du contexte
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const token = Cookies.get('token'); // Récupérer le token à partir des cookies
      const response = await axios.get('http://localhost:5000/api/notif/getNotifications', {
        headers: {
          Authorization: `Bearer ${token}`, // Ajouter le token dans les headers
        },
      });
      setNotifications(response.data); // Assurez-vous que la réponse est au bon format
    } catch (error) {
      console.error('Erreur lors de la récupération des notifications:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className={`rounded-lg p-4 relative`}>
      <h2 className={`font-bold text-lg mb-3 ${isDarkMode ? 'text-white' : 'text-black'}`}>Notifications</h2>
      {notifications.map((notification, index) => (
        <NotificationCard key={index} color="bg-blue-500" message={notification.message} isDarkMode={isDarkMode} />
      ))}
      <a href="#" className={`text-blue-500 text-sm hover:underline mt-2 block ${isDarkMode ? 'text-blue-400' : ''}`}>Voir plus...</a>
    </div>
  );
};

export default Notifications;
