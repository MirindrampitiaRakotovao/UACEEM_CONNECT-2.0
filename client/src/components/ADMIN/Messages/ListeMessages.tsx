import { File, Image, PlayCircle, PauseCircle, Download, Waves } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { useTheme } from '../../../context/ThemeContext'; // Importation du contexte du thème
import { Message } from './types';


interface ListeMessagesProps {
  messages: Message[];
}

const ListeMessages: React.FC<ListeMessagesProps> = ({ messages }) => {
  const { isDarkMode } = useTheme(); // Utilisation du contexte du thème
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(true); // Détection si défilé en bas
  const [showOldMessages, setShowOldMessages] = useState(true); // Contrôle de la visibilité des anciens messages
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Défilement automatique vers le bas quand de nouveaux messages arrivent
    if (containerRef.current && isScrolledToBottom) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, isScrolledToBottom]);

  const handleAudioPlay = (messageId: string) => {
    const audioElement = document.getElementById(`audio-${messageId}`) as HTMLAudioElement;
    if (playingAudio === messageId) {
      audioElement.pause();
      setPlayingAudio(null);
    } else {
      if (playingAudio) {
        const currentAudio = document.getElementById(`audio-${playingAudio}`) as HTMLAudioElement;
        currentAudio?.pause();
      }
      audioElement.play();
      setPlayingAudio(messageId);
    }
  };

  const renderVoiceMessage = (message: Message) => (
    <motion.div
      className={`
        flex items-center space-x-4
        p-4 rounded-2xl
        ${isDarkMode
          ? 'bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700'
          : 'bg-gradient-to-r from-gray-100 to-gray-200 border border-gray-200'
        }
        w-full max-w-[320px] shadow-lg
      `}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Bouton de lecture/pause avec animation dynamique */}
      <motion.button
        onClick={() => handleAudioPlay(message.id)}
        className={`
          p-2 rounded-full transition-all duration-300
          ${isDarkMode 
            ? 'bg-indigo-700 text-white hover:bg-indigo-600' 
            : 'bg-indigo-500 text-white hover:bg-indigo-600'
          }
        `}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {playingAudio === message.id ? (
          <PauseCircle className="w-6 h-6" />
        ) : (
          <PlayCircle className="w-6 h-6" />
        )}
      </motion.button>
      {/* Visualisation audio avec ondes */}
      <div className="flex-1 flex items-center space-x-2">
        <Waves 
          className={`
            ${playingAudio === message.id 
              ? 'text-indigo-500 animate-pulse' 
              : isDarkMode 
                ? 'text-gray-600' 
                : 'text-gray-400'
            }
          `}
        />
        <div className="flex-1">
          <div className="w-full h-1.5 bg-gray-300 rounded-full overflow-hidden">
            <motion.div
              className={`
                h-full 
                ${isDarkMode ? 'bg-indigo-600' : 'bg-indigo-500'}
              `}
              initial={{ width: 0 }}
              animate={{ 
                width: `${message.metadata?.duration ? (message.metadata.duration / message.metadata.totalDuration) * 100 : 0}%` 
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </div>
        <span className={`
          text-xs font-semibold
          ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}
        `}>
          {message.metadata?.duration || '0:00'}
        </span>
      </div>
      <audio
        id={`audio-${message.id}`}
        src={message.content}
        onEnded={() => setPlayingAudio(null)}
      />
    </motion.div>
  );

  const renderFileMessage = (message: Message) => (
    <motion.div 
      className={`
        flex items-center space-x-2 
        p-3 rounded-lg 
        ${isDarkMode 
          ? 'bg-gray-800 bg-opacity-60 border border-gray-700' 
          : 'bg-gray-100 bg-opacity-80 border border-gray-200'
        }
      `}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-[#252b53] p-2 rounded-full">
        <File className="text-xl text-white" />
      </div>
      
      <div className="flex-1">
        <p className="font-semibold text-xs">{message.content}</p>
        <p className="text-xs opacity-70">
          {message.metadata?.fileSize} bytes
        </p>
      </div>
      
      <motion.button 
        className={`
          p-1 rounded-full 
          ${isDarkMode 
            ? 'bg-gray-700 text-white' 
            : 'bg-blue-50 text-[#252b53]'
          }
        `}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          const link = document.createElement('a');
          link.href = message.content;
          link.download = message.content.split('/').pop() || 'download';
          link.click();
        }}
      >
        <Download className="text-sm" />
      </motion.button>
    </motion.div>
  );

  const renderMessageContent = (message: Message) => {
    switch (message.type) {
      case 'text':
        return <p className="leading-relaxed text-sm">{message.content}</p>;
      case 'image':
        return (
          <div className="max-w-xs">
            <motion.img
              src={message.metadata?.imageUrl}
              alt="Uploaded"
              className="rounded-2xl border-2 border-opacity-20 hover:scale-105 transition-transform"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        );
      case 'voice':
        return renderVoiceMessage(message);
      case 'file':
        return renderFileMessage(message);
      default:
        return null;
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      setIsScrolledToBottom(true);
    } else {
      setIsScrolledToBottom(false);
    }
    if (scrollTop === 0 && !showOldMessages) {
      setShowOldMessages(true); // Afficher les anciens messages quand on est tout en haut
    }
  };

  return (
    <div
      className={`
        flex-1 overflow-y-auto p-6 space-y-6
        ${isDarkMode
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white'
          : 'bg-gradient-to-br from-gray-50 via-white to-gray-50 text-gray-800'
        }
      `}
      ref={containerRef}
      onScroll={handleScroll}
    >
      <AnimatePresence>
        {showOldMessages && messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`flex animate-fade-in ${message.isMe ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`
                max-w-md p-4 rounded-2xl
                backdrop-blur-lg shadow-lg
                transform hover:-translate-y-1 transition-all duration-300
                ${message.isMe
                  ? (isDarkMode
                    ? 'bg-[#364399] bg-opacity-50 text-white border border-[#252b53] border-opacity-20'
                    : 'bg-[#232d69] bg-opacity-90 text-white')
                  : (isDarkMode
                    ? 'bg-gray-800 bg-opacity-50 text-white border border-gray-600 border-opacity-20'
                    : 'bg-white bg-opacity-75 text-gray-800 border border-gray-200')
                }
              `}
            >
              {renderMessageContent(message)}
              <div className="text-xs mt-2 opacity-70 text-right font-light">
                {message.timestamp}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ListeMessages;
