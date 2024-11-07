import { X, Mic, Upload, Paperclip, StopCircle } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';


interface ModalAjoutForumProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (forum: { title: string; description: string; audio: Blob | null; attachments: File[] }) => void;
  isDarkMode: boolean;
}

const ModalAjoutForum: React.FC<ModalAjoutForumProps> = ({ isOpen, onClose, onSave, isDarkMode }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [audio, setAudio] = useState<Blob | null>(null);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioLevels, setAudioLevels] = useState<number[]>(new Array(20).fill(0)); // Barres audio initialisées à 0
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
        if (analyserRef.current) {
          updateAudioLevels();
        }
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ title, description, audio, attachments });
    setTitle('');
    setDescription('');
    setAudio(null);
    setAttachments([]);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new AudioContext();
      sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 64; // Réduit la taille FFT pour moins de barres et des résultats plus fluides
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
      setAttachments([...attachments, ...Array.from(e.target.files)]);
    }
  };

  const updateAudioLevels = () => {
    if (analyserRef.current) {
      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
      analyserRef.current.getByteFrequencyData(dataArray);
      const normalizedData = Array.from(dataArray).map((value) => value / 255);
      setAudioLevels(normalizedData.slice(0, 20)); // Garde 20 barres pour l'animation
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className={`w-full max-w-lg p-8 rounded-2xl shadow-2xl ${
          isDarkMode ? 'bg-gray-900' : 'bg-white'
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Nouveau Forum
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-full hover:bg-opacity-10 ${
              isDarkMode ? 'hover:bg-white' : 'hover:bg-black'
            }`}
          >
            <X className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
            >
              Titre
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-opacity-50 ${
                isDarkMode ? 'bg-gray-800 text-white focus:ring-blue-500' : 'bg-gray-100 text-gray-900 focus:ring-blue-500'
              }`}
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-opacity-50 ${
                isDarkMode ? 'bg-gray-800 text-white focus:ring-blue-500' : 'bg-gray-100 text-gray-900 focus:ring-blue-500'
              }`}
              required
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={handleAudioRecording}
              className={`flex items-center px-4 py-2 rounded-lg ${
                isRecording
                  ? 'bg-red-500 text-white'
                  : isDarkMode
                  ? 'bg-gray-700 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {isRecording ? (
                <StopCircle className="w-5 h-5 mr-2" />
              ) : (
                <Mic className="w-5 h-5 mr-2" />
              )}
              {isRecording ? 'Arrêter' : 'Enregistrer'}
            </button>
            {isRecording && (
              <span className={`flex items-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {formatTime(recordingTime)}
              </span>
            )}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className={`flex items-center px-4 py-2 rounded-lg ${
                isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              <Upload className="w-5 h-5 mr-2" />
              Ajouter des fichiers
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
              multiple
            />
          </div>

          {isRecording && (
            <div className="mt-4 flex space-x-1">
              {audioLevels.map((level, index) => (
                <div
                  key={index}
                  className={`w-2 bg-blue-500 rounded-sm transition-all`}
                  style={{ height: `${level * 100}%` }}
                />
              ))}
            </div>
          )}

          {audio && !isRecording && (
            <div className={`mt-4 p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <p className={`mb-2 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Enregistrement audio
              </p>
              <audio controls src={URL.createObjectURL(audio)} className="w-full" />
            </div>
          )}

          {attachments.length > 0 && (
            <div className="mt-4">
              <p className={`mb-2 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Fichiers joints
              </p>
              <div className="flex flex-wrap gap-2">
                {attachments.map((file, index) => (
                  <div
                    key={index}
                    className={`flex items-center px-3 py-1 rounded-full text-sm ${
                      isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    <Paperclip className="w-4 h-4 mr-2" />
                    <span className="max-w-xs truncate">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => setAttachments(attachments.filter((_, i) => i !== index))}
                      className="ml-2 hover:text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className={`px-6 py-2 rounded-lg transition-colors duration-200 ${
                isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
            >
              Créer
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ModalAjoutForum;
