import { Paperclip, Image, Mic, Send } from 'lucide-react';
import React, { useState, useRef } from 'react';

import { useTheme } from '../../../context/ThemeContext'; // Importez le hook pour accéder au mode


// Importez le hook pour accéder au mode

interface MessageInputProps {
  onSendMessage: (content: string, type: 'text' | 'file' | 'image' | 'voice', metadata?: any) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const { isDarkMode } = useTheme(); // Utilisez le hook pour accéder à l'état du mode sombre
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const audioRecorderRef = useRef<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  // Handle sending text messages
  const handleSendTextMessage = () => {
    if (message.trim()) {
      onSendMessage(message, 'text');
      setMessage('');
    }
  };

  // Handle file upload (generic, could be document or image)
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'file' | 'image') => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // Send a document file or an image depending on the type
        onSendMessage(file.name, type, {
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
          ...(type === 'image' && { imageUrl: e.target?.result as string })
        });
      };

      if (type === 'image') {
        reader.readAsDataURL(file); // Image will be sent as a data URL
      } else {
        // For other files (documents, PDFs, etc.), we simply send the file name and metadata
        onSendMessage(file.name, 'file', {
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type
        });
      }
    }
  };

  // Start recording audio
  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks: Blob[] = [];
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        onSendMessage(audioUrl, 'voice', {
          voiceDuration: audioChunks.length // Approximation
        });
      };
      mediaRecorder.start();
      setIsRecording(true);
      audioRecorderRef.current = mediaRecorder;
    } catch (error) {
      console.error('Error recording audio', error);
    }
  };

  // Stop recording audio
  const handleStopRecording = () => {
    if (audioRecorderRef.current) {
      audioRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className={`p-4 border-t flex items-center ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Tapez votre message..."
        className={`flex-1 p-2 rounded-lg mr-2 text-sm ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}
      />
      
      <div className="flex items-center space-x-2">
        {/* Hidden input for file upload (generic file or document) */}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={(e) => handleFileUpload(e, 'file')}
        />

        {/* Hidden input for image upload */}
        <input
          type="file"
          accept="image/*"
          ref={imageInputRef}
          className="hidden"
          onChange={(e) => handleFileUpload(e, 'image')}
        />
        
        {/* File and image buttons */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className={`p-1 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
        >
          <Paperclip size={16} />
        </button>

        <button
          onClick={() => imageInputRef.current?.click()}
          className={`p-1 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
        >
          <Image size={16} />
        </button>

        {/* Audio recording buttons */}
        {!isRecording ? (
          <button
            onClick={handleStartRecording}
            className={`p-1 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
          >
            <Mic size={16} />
          </button>
        ) : (
          <button
            onClick={handleStopRecording}
            className="p-1 rounded-full bg-red-500 text-white"
          >
            Stop
          </button>
        )}

        {/* Send button */}
        <button
          onClick={handleSendTextMessage}
          className={`p-1 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
