import { X, Mic, Upload, Paperclip, StopCircle } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { useTheme } from '../../../context/ThemeContext';


const AudioVisualizer: React.FC<{ isDarkMode: boolean; children: React.ReactNode }> = ({ isDarkMode, children }) => (
  <div className={`flex items-end space-x-1 h-6 w-full ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} rounded-md p-2 mt-2`}>
    {children}
  </div>
);
const AudioBar: React.FC<{ animate: any; transition: any }> = ({ animate, transition }) => (
  <motion.div
    className="w-1 bg-blue-600 rounded-t-md"
    animate={animate}
    transition={transition}
  />
);

interface ModalAjoutForumProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (forum: { title: string; description: string; audio: Blob | null; attachments: File[] }) => void;
}

const ModalAjoutForum: React.FC<ModalAjoutForumProps> = ({ isOpen, onClose, onSave }) => {
  const { isDarkMode } = useTheme();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [audio, setAudio] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioLevels, setAudioLevels] = useState<number[]>(new Array(20).fill(0));

  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  useEffect(() => {
    let animationFrame: number;

    const updateVisualization = () => {
      if (isRecording) {
        updateAudioLevels();
        animationFrame = requestAnimationFrame(updateVisualization);
      }
    };

    if (isRecording) {
      updateVisualization();
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isRecording]);

  const updateAudioLevels = () => {
    if (analyserRef.current) {
      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
      analyserRef.current.getByteFrequencyData(dataArray);

      const bars = 20;
      const barData = new Array(bars).fill(0);

      for (let i = 0; i < bars; i++) {
        let sum = 0;
        const samplesPerBar = Math.floor(dataArray.length / bars);
        for (let j = 0; j < samplesPerBar; j++) {
          sum += dataArray[i * samplesPerBar + j];
        }
        barData[i] = sum / samplesPerBar / 255;
      }

      setAudioLevels(barData);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ title, description, audio, attachments });
    setTitle('');
    setDescription('');
    setAudio(null);
    setAudioUrl(null);
    setAttachments([]);
  };
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new AudioContext();
      sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 64;
      sourceRef.current.connect(analyserRef.current);

      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable);
      mediaRecorderRef.current.addEventListener('stop', handleStop);
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing the microphone', error);
    }
  };
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };
  const handleDataAvailable = (event: BlobEvent) => {
    if (event.data.size > 0) {
      audioChunksRef.current.push(event.data);
    }
  };
  const handleStop = () => {
    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
    setAudio(audioBlob);
    setAudioUrl(URL.createObjectURL(audioBlob));
    audioChunksRef.current = [];
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
  };
  const handleAudioRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const validFiles = files.filter(file => {
        const maxSize = 5 * 1024 * 1024; // 5MB
        return file.size <= maxSize;
      });
      setAttachments([...attachments, ...validFiles]);
    }
  };
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className={`w-full max-w-xl rounded-3xl ${isDarkMode
                ? 'bg-gradient-to-br from-gray-900 to-gray-800'
                : 'bg-gradient-to-br from-white to-gray-50'
              } shadow-2xl border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'
              }`}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className={`text-xl font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Ajouter un forum
                </h2>
                <button onClick={onClose}>
                  <X className={`w-4 h-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} />
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="title" className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Titre
                  </label>
                  <input
                    type="text"
                    id="title"
                    className={`w-full text-sm px-3 py-2 rounded-md border ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white border-gray-300'
                      }`}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Description
                  </label>
                  <textarea
                    id="description"
                    className={`w-full text-sm px-3 py-2 rounded-md border ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white border-gray-300'
                      }`}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <button
                    type="button"
                    onClick={handleAudioRecording}
                    className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-xs text-white rounded-md"
                  >
                    {isRecording ? <StopCircle className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    <span>{isRecording ? 'Arrêter l\'enregistrement' : 'Enregistrer Audio'}</span>
                  </button>
                  {(isRecording || audioUrl) && (
                    <AudioVisualizer isDarkMode={isDarkMode}>
                      {Array.from({ length: 50 }).map((_, index) => (
                        <motion.div
                          key={index}
                          className="w-1 bg-blue-600 rounded-t-md"
                          animate={{
                            height: isRecording
                              ? [`${(audioLevels[index % audioLevels.length] || 0) * 100}%`, `${Math.random() * 100}%`]
                              : '40%',
                          }}
                          transition={{
                            duration: 0.5,
                            repeat: isRecording ? Infinity : 0,
                            delay: index * 0.02
                          }}
                        />
                      ))}
                    </AudioVisualizer>
                  )}
                  {audioUrl && !isRecording && (
                    <div className="mt-2">
                      <audio controls src={audioUrl} className="w-full">
                        Votre navigateur ne supporte pas l'élément audio.
                      </audio>
                    </div>
                  )}
                  {isRecording && (
                    <div className="mt-2 text-xs text-gray-400">
                      Temps écoulé : {formatTime(recordingTime)}
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Pièces jointes
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="file"
                      multiple
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-xs text-white rounded-md"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Ajouter des fichiers</span>
                    </button>
                  </div>
                  {attachments.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {attachments.map((file, index) => (
                        <div
                          key={index}
                          className={`flex items-center justify-between p-2 rounded-md ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                            }`}
                        >
                          <div className="flex items-center space-x-2">
                            <Paperclip className="w-4 h-4 text-blue-600" />
                            <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              {file.name}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setAttachments(attachments.filter((_, i) => i !== index))}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className={`px-4 py-2 text-sm rounded-md ${isDarkMode
                        ? 'bg-gray-800 text-white hover:bg-gray-700'
                        : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                      }`}
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Enregistrer
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default ModalAjoutForum;