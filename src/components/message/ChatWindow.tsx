import React, { useState } from 'react';

const ChatWindow = () => {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Envoyer le message (logique API à ajouter)
      console.log('Message envoyé:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col bg-gray-50" >
      {/* Header de la conversation (fixe en haut) */}
      <div className="flex items-center justify-between p-4 border-b border-gray-300 bg-white sticky top-0 z-10">
        <div className="flex items-center space-x-2">
          <img src="https://via.placeholder.com/50" alt="avatar" className="w-10 h-10 rounded-full" />
          <span className="font-bold">Nom d'utilisateur</span>
        </div>
        <div className="flex space-x-4">
          <button className="hover:text-gray-500">📞</button>
          <button className="hover:text-gray-500">🎥</button>
          <button className="hover:text-gray-500">ℹ️</button>
        </div>
      </div>

      {/* Messages - partie scrollable */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50">
        {/* Exemple de message reçu */}
        <div className="self-start max-w-xs bg-gray-200 p-3 rounded-lg">
          <p>Message reçu...</p>
          <span className="text-xs text-gray-500">11:51</span>
        </div>
        {/* Exemple de message envoyé */}
        <div className="self-end max-w-xs bg-blue-500 text-white p-3 rounded-lg">
          <p>Message envoyé...</p>
          <span className="text-xs text-gray-200">12:25</span>
        </div>
      </div>

      {/* Saisie de message - fixée en bas */}
      <div className="sticky bottom-0 flex items-center p-4 border-t border-gray-300 bg-white">
        <button className="mr-2">GIF</button>
        <button className="mr-2">Emoji</button>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Écrivez un message..."
          className="flex-1 p-2 rounded-lg bg-gray-200 focus:outline-none"
        />
        <button onClick={handleSendMessage} className="ml-2 bg-blue-500 p-2 rounded-lg text-white">
          Envoyer
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
