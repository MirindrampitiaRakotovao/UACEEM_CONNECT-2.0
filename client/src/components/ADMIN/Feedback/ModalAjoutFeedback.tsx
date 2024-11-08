import React, { useState, useEffect, useRef } from 'react';
import { X, Star, Mic, Volume2 } from 'lucide-react';

import { useTheme } from '../../../context/ThemeContext';


interface ModalAjoutFeedbackProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalAjoutFeedback: React.FC<ModalAjoutFeedbackProps> = ({ isOpen, onClose }) => {
  const { isDarkMode } = useTheme();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioLevels, setAudioLevels] = useState<number[]>([]);
  const [speakingLevels, setSpeakingLevels] = useState<number[]>([]);

  // Références pour la reconnaissance vocale et l'audio
  const recognitionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Fonction pour générer des niveaux aléatoires pour la visualisation de la parole
  const generateSpeakingLevels = () => {
    if (isSpeaking) {
      const newLevels = Array(10).fill(0).map(() => 
        Math.random() * 0.5 + 0.5 // Génère des valeurs entre 0.5 et 1
      );
      setSpeakingLevels(newLevels);
      requestAnimationFrame(generateSpeakingLevels);
    }
  };

  // Visualisation du signal audio
  useEffect(() => {
    const setupAudioVisualization = async () => {
      if (isListening) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          streamRef.current = stream;
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          audioContextRef.current = audioContext;
          const analyser = audioContext.createAnalyser();
          analyserRef.current = analyser;
          const source = audioContext.createMediaStreamSource(stream);
          source.connect(analyser);
          analyser.fftSize = 256;
          const bufferLength = analyser.frequencyBinCount;
          const dataArray = new Uint8Array(bufferLength);

          const updateAudioLevels = () => {
            if (!isListening) return;
            analyser.getByteFrequencyData(dataArray);
            const levels = Array.from(dataArray).map(level => 
              Math.min(level / 255, 1)
            );
            setAudioLevels(levels);
            requestAnimationFrame(updateAudioLevels);
          };
          updateAudioLevels();
        } catch (error) {
          console.error("Erreur d'accès au microphone", error);
        }
      } else {
        if (audioContextRef.current) {
          audioContextRef.current.close();
          audioContextRef.current = null;
        }
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = null;
        }
        setAudioLevels([]);
      }
    };
    setupAudioVisualization();
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [isListening]);

  // Speech Recognition
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      console.log("Votre navigateur ne prend pas en charge la reconnaissance vocale.");
      return;
    }
    recognitionRef.current = new (window as any).webkitSpeechRecognition();
    const recognition = recognitionRef.current;
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'fr-FR';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setComment(transcript);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Effet pour la visualisation de la parole
  useEffect(() => {
    if (isSpeaking) {
      generateSpeakingLevels();
    } else {
      setSpeakingLevels([]);
    }
  }, [isSpeaking]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ rating, comment, selectedCourse });
    onClose();
  };

  const handleTextToSpeech = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(comment);
    utterance.lang = 'fr-FR';
    
    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error("Erreur lors du démarrage de la reconnaissance vocale", error);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
      <div className={`w-full max-w-md rounded-xl shadow-lg transform transition-all duration-300 ease-in-out
        ${isDarkMode ? 'bg-gradient-to-b from-[#2A3A53] to-[#252b53] text-white' : 'bg-gradient-to-b from-white to-gray-100 text-gray-800'}`}>
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200/20">
          <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Ajouter un Feedback
          </h2>
          <button 
            onClick={onClose} 
            className={`p-1 rounded-full transition-colors ${
              isDarkMode ? 'hover:bg-white/10 text-gray-300' : 'hover:bg-gray-200 text-gray-600'
            }`}
          >
            <X size={16} />
          </button>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Sélection du cours */}
          <div className="space-y-1">
            <label 
              htmlFor="course" 
              className={`text-xs font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Cours
            </label>
            <select
              id="course"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className={`w-full px-3 py-2 text-xs rounded-lg outline-none transition-all duration-200 
                ${isDarkMode 
                  ? 'bg-white/5 border-gray-700 focus:border-[#FFAA00]' 
                  : 'bg-white border-gray-200 focus:border-blue-500'
                } border focus:ring-1 focus:ring-opacity-50 
                ${isDarkMode ? 'focus:ring-[#FFAA00]' : 'focus:ring-blue-500'}`}
            >
              <option value="">Sélectionnez un cours</option>
              <option value="react">React Avancé</option>
              <option value="typescript">TypeScript Fondamentaux</option>
              <option value="nodejs">Node.js Expertise</option>
            </select>
          </div>
          
          {/* Notation */}
          <div className="space-y-1">
            <label 
              className={`text-xs font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Note
            </label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  fill={star <= rating ? 'currentColor' : 'none'}
                  className={`w-5 h-5 cursor-pointer transition-colors duration-200 ${
                    star <= rating 
                      ? (isDarkMode ? 'text-[#FFAA00]' : 'text-yellow-400') 
                      : 'text-gray-300'
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>
          
          {/* Commentaire */}
          <div className="space-y-1">
            <label 
              htmlFor="comment" 
              className={`text-xs font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Commentaire
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className={`w-full px-3 py-2 text-xs rounded-lg outline-none transition-all duration-200 
                ${isDarkMode 
                  ? 'bg-white/5 border-gray-700 focus:border-[#FFAA00]' 
                  : 'bg-white border-gray-200 focus:border-blue-500'
                } border focus:ring-1 focus:ring-opacity-50 
                ${isDarkMode ? 'focus:ring-[#FFAA00]' : 'focus:ring-blue-500'}`}
              rows={4}
              placeholder="Écrivez votre commentaire ici..."
            />
            
            {/* Visualisation du signal audio pour l'enregistrement */}
            {isListening && (
              <div className="flex items-center justify-center mt-2">
                <div className="flex space-x-1 h-6">
                  {audioLevels.slice(0, 10).map((level, index) => (
                    <div
                      key={index}
                      className={`w-2 rounded-full transition-all duration-100 ${
                        isDarkMode 
                          ? 'bg-[#FFAA00]/50 hover:bg-[#FFAA00]' 
                          : 'bg-blue-500/50 hover:bg-blue-500'
                      }`}
                      style={{ 
                        height: `${level * 30}px`,
                        transform: `scaleY(${level})`
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Visualisation du signal pour la lecture */}
            {isSpeaking && (
              <div className="flex items-center justify-center mt-2">
                <div className="flex space-x-1 h-6">
                  {speakingLevels.map((level, index) => (
                    <div
                      key={index}
                      className={`w-2 rounded-full transition-all duration-100 ${
                        isDarkMode 
                          ? 'bg-green-500/50 hover:bg-green-500' 
                          : 'bg-green-400/50 hover:bg-green-400'
                      }`}
                      style={{ 
                        height: `${level * 30}px`,
                        transform: `scaleY(${level})`
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {/* Boutons d'interaction vocale */}
            <div className="flex justify-between mt-2">
              <button 
                type="button" 
                onClick={startListening} 
                className={`flex items-center gap-2 ${
                  isListening 
                    ? 'text-red-500 animate-pulse' 
                    : (isDarkMode ? 'text-[#FFAA00]' : 'text-blue-500')
                } transition duration-200`}
              >
                <Mic size={16} /> 
                {isListening ? 'Écoute en cours...' : 'Parler'}
              </button>
              <button 
                type="button" 
                onClick={handleTextToSpeech} 
                className={`flex items-center gap-2 ${
                  isSpeaking
                    ? 'text-green-500 animate-pulse'
                    : (isDarkMode ? 'text-[#FFAA00]' : 'text-blue-500')
                } transition duration-200`}
              >
                <Volume2 size={16} /> 
                {isSpeaking ? 'Arrêter la lecture' : 'Lire le commentaire'}
              </button>
            </div>
          </div>
          
          {/* Bouton de soumission */}
          <button 
            type="submit" 
            className={`w-full py-2 text-white rounded-lg ${
              isDarkMode 
                ? 'bg-[#FFAA00] hover:bg-[#FFAA00]/90' 
                : 'bg-blue-500 hover:bg-blue-600'
            } transition duration-200`}
          >
            Envoyer Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalAjoutFeedback;