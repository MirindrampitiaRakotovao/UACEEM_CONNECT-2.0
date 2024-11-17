import { Paperclip, Image, Mic, Send } from 'lucide-react';
import React, { useState, useRef } from 'react';

import { useTheme } from '../../../context/ThemeContext';
import apiService from '../../../services/api';


interface MessageInputProps {
  destinataireId: string;
  conversationId?: string;
  onMessageSent?: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({
  destinataireId,
  conversationId,
  onMessageSent
}) => {
  console.log('Props reçues:', { destinataireId, conversationId }); // Debug des props

  const { isDarkMode } = useTheme();
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const audioRecorderRef = useRef<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const handleSendTextMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!message.trim() || !destinataireId) {
      return;
    }
    setIsSending(true);
    try {
      const messageData = {
        contenu: message.trim(),
        destinataireId,
        ...(conversationId && { conversationId })
      };
      const response = await apiService.post('/messages', messageData);
      if (response.status === 201 || response.status === 200) {
        // Retournez le message envoyé
        const sentMessage = {
          id: response.data.id, // Assurez-vous que votre API renvoie l'ID du message
          contenu: message.trim(),
          dateEnvoi: new Date().toISOString(),
          expediteurId: response.data.expediteurId, // ID de l'utilisateur connecté
          destinataireId,
          type: 'text'
        };
        setMessage('');
        onMessageSent?.(sentMessage); // Passez le message complet
        console.log('Message envoyé avec succès');
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: 'file' | 'image') => {
    const file = event.target.files?.[0];
    console.log('Fichier sélectionné:', { file, type });

    if (!file || !destinataireId) {
      console.log('Upload annulé:', {
        fichierManquant: !file,
        destinataireManquant: !destinataireId
      });
      return;
    }

    const formData = new FormData();
    formData.append('fichier', file);
    formData.append('destinataireId', destinataireId);
    if (conversationId) {
      formData.append('conversationId', conversationId);
    }

    console.log('FormData créé:', {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      destinataireId,
      conversationId
    });

    try {
      const response = await apiService.post('/messages', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Réponse upload:', response);
      onMessageSent?.();
    } catch (error) {
      console.error('Erreur détaillée lors de l\'upload:', {
        error,
        fileInfo: {
          name: file.name,
          size: file.size,
          type: file.type
        }
      });
    }
  };

  const handleStartRecording = async () => {
    console.log('Démarrage de l\'enregistrement audio');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks: Blob[] = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
        console.log('Chunk audio reçu:', event.data.size);
      };

      mediaRecorder.onstop = async () => {
        console.log('Enregistrement terminé, taille totale:',
          audioChunks.reduce((acc, chunk) => acc + chunk.size, 0)
        );

        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        const formData = new FormData();
        formData.append('fichier', audioBlob, 'audio.webm');
        formData.append('destinataireId', destinataireId);
        if (conversationId) {
          formData.append('conversationId', conversationId);
        }

        try {
          const response = await apiService.post('/messages', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          console.log('Réponse upload audio:', response);
          onMessageSent?.();
        } catch (error) {
          console.error('Erreur détaillée lors de l\'upload audio:', {
            error,
            audioSize: audioBlob.size
          });
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
      audioRecorderRef.current = mediaRecorder;
      console.log('Enregistrement démarré');
    } catch (error) {
      console.error('Erreur lors de l\'initialisation de l\'enregistrement:', error);
    }
  };

  const handleStopRecording = () => {
    console.log('Arrêt de l\'enregistrement');
    if (audioRecorderRef.current) {
      audioRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <form
      onSubmit={handleSendTextMessage}
      className={`p-4 border-t flex items-center ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Tapez votre message..."
        className={`flex-1 p-2 rounded-lg mr-2 text-sm ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}
      />

      <div className="flex items-center space-x-2">
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={(e) => handleFileUpload(e, 'file')}
        />
        <input
          type="file"
          accept="image/*"
          ref={imageInputRef}
          className="hidden"
          onChange={(e) => handleFileUpload(e, 'image')}
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`p-1 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
        >
          <Paperclip size={16} />
        </button>
        <button
          type="button"
          onClick={() => imageInputRef.current?.click()}
          className={`p-1 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
        >
          <Image size={16} />
        </button>
        {!isRecording ? (
          <button
            type="button"
            onClick={handleStartRecording}
            className={`p-1 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
          >
            <Mic size={16} />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleStopRecording}
            className="p-1 rounded-full bg-red-500 text-white"
          >
            Stop
          </button>
        )}
        <button
          type="submit"
          disabled={!message.trim() || isSending}
          className={`p-1 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} ${isSending ? 'opacity-50 cursor-not-allowed' : ''
            }`}
        >
          <Send size={16} />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;