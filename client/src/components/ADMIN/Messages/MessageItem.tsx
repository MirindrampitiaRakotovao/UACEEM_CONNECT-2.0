import React from 'react';

import useAuth from '../../../useAuth';


interface User {
  id: string;
  nom: string;
  prenom: string;
  nomUtilisateur: string;
}

interface Message {
  id: string;
  type: string;
  contenu: string;
  statut: string;
  expediteurId: string;
  destinataireId: string;
  dateEnvoi: string;
  expediteur: {
    id: string;
    nom: string;
    prenom: string;
  };
}

interface MessageItemProps {
  message: Message;
  onError?: (error: string) => void;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, onError }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="w-full flex justify-center py-2">
        <div className="animate-pulse bg-gray-200 h-16 w-3/4 rounded-lg" />
      </div>
    );
  }

  if (!user?.nomUtilisateur) {
    onError?.('Utilisateur non authentifié');
    return null;
  }

  const isMyMessage = 
    user.nom === message.expediteur.nom && 
    user.prenom === message.expediteur.prenom;

  const formatTime = (dateString: string): string => {
    try {
      const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit'
      };
      return new Date(dateString).toLocaleTimeString('fr-FR', options);
    } catch (error) {
      console.error('Erreur de formatage de la date:', error);
      return dateString;
    }
  };

  const messageClasses = `
    max-w-[70%]
    rounded-lg
    p-3
    ${isMyMessage 
      ? 'bg-blue-500 text-white'
      : 'bg-gray-200 text-gray-800'}
    shadow-sm
  `.trim();

  const timeClasses = `
    text-xs 
    mt-1
    ${isMyMessage ? 'text-blue-100' : 'text-gray-500'}
  `.trim();

  return (
    <div className="w-full px-4 mb-4">
      <div className={`flex flex-col ${isMyMessage ? 'items-end' : 'items-start'}`}>
        {!isMyMessage && (
          <span className="text-xs text-gray-500 mb-1">
            {message.expediteur.prenom} {message.expediteur.nom}
          </span>
        )}
        
        <div className={messageClasses}>
          <p className="break-words text-sm">{message.contenu}</p>
          <div className={timeClasses}>
            {formatTime(message.dateEnvoi)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;