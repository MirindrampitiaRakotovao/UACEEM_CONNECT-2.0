import React, { useState, useRef, useEffect } from 'react';
import { X, Mic, Upload, StopCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import axios from 'axios';

import { useTheme } from '../../../context/ThemeContext';
import toastSuccess from '../../../ToastSuccess';
import toastError from '../../../ToastError';


interface ModalAjoutForumProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (forum: {
    titre: string;
    contenu: string;
    categorie?: string;
    motsCles?: string[];
    audio?: Blob | null;
    pieceJointes?: File[];
  }) => void;
}
const ModalAjoutForum: React.FC<ModalAjoutForumProps> = ({ 
  isOpen, 
  onClose, 
  onSave 
}) => {
  const { isDarkMode } = useTheme();
  
  // États du composant
  const [titre, setTitre] = useState('');
  const [contenu, setContenu] = useState('');
  const [categorie, setCategorie] = useState('Général');
  const [motsCles, setMotsCles] = useState<string[]>([]);
  const [nouveauMotCle, setNouveauMotCle] = useState('');
  const [audio, setAudio] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [pieceJointes, setPieceJointes] = useState<File[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Références
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  
  // Configurations
  const MAX_FILES = 5;
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 Mo
  const TOTAL_MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 Mo
  const ALLOWED_FILE_TYPES = [
    'image/jpeg', 
    'image/png', 
    'image/gif', 
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  
  // Gestion des mots-clés
  const ajouterMotCle = () => {
    if (nouveauMotCle.trim() && !motsCles.includes(nouveauMotCle.trim())) {
      setMotsCles([...motsCles, nouveauMotCle.trim()]);
      setNouveauMotCle('');
    }
  };
  const supprimerMotCle = (motCle: string) => {
    setMotsCles(motsCles.filter(m => m !== motCle));
  };
  
  // Réinitialisation du formulaire
  const resetFormulaire = () => {
    setTitre('');
    setContenu('');
    setCategorie('Général');
    setMotsCles([]);
    setNouveauMotCle('');
    setAudio(null);
    setAudioUrl(null);
    setPieceJointes([]);
  };
  
  // Gestion de l'enregistrement audio
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new AudioContext();
      sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      audioChunksRef.current = [];
      
      mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable);
      mediaRecorderRef.current.addEventListener('stop', handleStop);
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Erreur d\'accès au microphone', error);
      toastError('Impossible d\'accéder au microphone');
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
  
  // Gestion des fichiers
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      
      // Validation des fichiers
      const validFiles = newFiles.filter(file => {
        // Vérifier le type de fichier
        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
          toastError(`Type de fichier non supporté : ${file.name}`);
          return false;
        }
        
        // Vérifier la taille du fichier
        if (file.size > MAX_FILE_SIZE) {
          toastError(`Fichier trop volumineux : ${file.name} (max 5 Mo)`);
          return false;
        }
        
        return true;
      });
      
      // Vérifier le nombre total de fichiers
      const totalFiles = [...pieceJointes, ...validFiles];
      
      if (totalFiles.length > MAX_FILES) {
        toastError(`Vous ne pouvez télécharger que ${MAX_FILES} fichiers maximum`);
        return;
      }
      
      // Vérifier la taille totale des fichiers
      const totalFileSize = totalFiles.reduce((total, file) => total + file.size, 0);
      
      if (totalFileSize > TOTAL_MAX_FILE_SIZE) {
        toastError('La taille totale des fichiers ne doit pas dépasser 20 Mo');
        return;
      }
      
      // Mettre à jour les fichiers
      setPieceJointes(totalFiles);
    }
  };
  // Supprimer un fichier
  const supprimerFichier = (fichierASupprimer: File) => {
    setPieceJointes(pieceJointes.filter(fichier => fichier !== fichierASupprimer));
  };
  
  // Minuterie pour l'enregistrement audio
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
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  // Fermeture du modal lors de l'appui sur Échap
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);
  // Soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = Cookies.get('token');
      if (!token) {
        toastError('Vous devez être connecté');
        return;
      }
      // Log des données avant validation
      console.log('Données du formulaire:', {
        titre: titre.trim(),
        contenuLength: contenu.trim().length,
        categorie,
        motsCles,
        audioSize: audio?.size,
        fichierCount: pieceJointes.length
      });
      // Validations de base
      if (titre.trim().length < 3 || contenu.trim().length < 10) {
        toastError('Veuillez remplir correctement tous les champs');
        return;
      }
      const formData = new FormData();
      formData.append('titre', titre.trim());
      formData.append('contenu', contenu.trim());
      formData.append('categorie', categorie || 'Général');
      if (motsCles && motsCles.length > 0) {
        motsCles.forEach(mot => {
            formData.append('motsCles[]', mot); // Envoie chaque mot-clé comme un élément de tableau
        });
    }
      if (audio) {
        if (audio.size > 10 * 1024 * 1024) { // 10 Mo
          toastError("Le fichier audio est trop volumineux (max 10Mo)");
          return;
        }
        formData.append('audio', audio);
      }
      if (pieceJointes.length > 0) {
        if (pieceJointes.length > 5) {
          toastError("Maximum 5 fichiers autorisés");
          return;
        }
        const oversizedFiles = pieceJointes.filter(f => f.size > 10 * 1024 * 1024); // 10 Mo
        if (oversizedFiles.length > 0) {
          toastError("Certains fichiers sont trop volumineux (max 10Mo)");
          return;
        }
        pieceJointes.forEach(file => {
          formData.append('fichiers', file);
        });
      }
      // Log du FormData avant envoi
      for (let [key, value] of formData.entries()) {
        console.log(`FormData - ${key}:`, value);
      }
      // Démarre le processus de soumission
      setIsSubmitting(true);
      const response = await axios.post('http://localhost:5000/api/forums', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
        timeout: 30000, // Timeout de 30 secondes
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
        // Ajout d'un intercepteur pour logger la requête
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log(`Upload Progress: ${percentCompleted}%`);
        }
      });
      // Log de la réponse complète
      console.log('Réponse du serveur:', response.data);
      // Vérification de la réponse de l'API
      if (response.data && response.data.message === 'Forum créé avec succès' && response.data.forum) {
        toastSuccess(response.data.message);
        resetFormulaire();
        onSave(response.data.forum);
        onClose();
      } else {
        throw new Error('Erreur lors de la création du forum');
      }
    } catch (error: any) {
      // Log d'erreur complet et détaillé
      console.error('Erreur complète:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers
      });
      const errorMessage = error.response?.data?.message || error.message || 'Erreur lors de la création du forum';
      toastError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
};
  // Rendu du composant
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
            className={`w-full max-w-xl rounded-3xl ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-white to-gray-50'} shadow-2xl border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
          >
            <div className="p-6">
              {/* Titre et bouton de fermeture */}
              <div className="flex justify-between items-center mb-4">
                <h2 className={`text-xl font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Ajouter un forum
                </h2>
                <button onClick={onClose}>
                  <X className={`w-4 h-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                {/* Champ Titre */}
                <div className="mb-4">
                  <label htmlFor="titre" className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Titre
                  </label>
                  <input
                    type="text"
                    id="titre"
                    className={`w-full text-sm px-3 py-2 rounded-md border ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white border-gray-300'}`}
                    value={titre}
                    onChange={(e) => setTitre(e.target.value)}
                    required
                  />
                </div>
                {/* Champ Description */}
                <div className="mb-4">
                  <label htmlFor="contenu" className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Description
                  </label>
                  <textarea
                    id="contenu"
                    className={`w-full text-sm px-3 py-2 rounded-md border ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white border-gray-300'}`}
                    value={contenu}
                    onChange={(e) => setContenu(e.target.value)}
                    required
                  />
                </div>
                {/* Champ Catégorie */}
                <div className="mb-4">
                  <label htmlFor="categorie" className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Catégorie
                  </label>
                  <select
                    id="categorie"
                    className={`w-full text-sm px-3 py-2 rounded-md border ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white border-gray-300'}`}
                    value={categorie}
                    onChange={(e) => setCategorie(e.target.value)}
                  >
                    <option value="Général">Général</option>
                    <option value="Technique">Technique</option>
                    <option value="Aide">Aide</option>
                  </select>
                </div>
                {/* Champ Mots-clés */}
                <div className="mb-4">
                  <label htmlFor="motsCles" className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Mots-clés
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      className={`flex-grow text-sm px-3 py-2 rounded-md border ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white border-gray-300'}`}
                      value={nouveauMotCle}
                      onChange={(e) => setNouveauMotCle(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          ajouterMotCle();
                          e.preventDefault();
                        }
                      }}
                    />
                    <button type="button" onClick={ajouterMotCle} className="ml-2 px-3 py-2 bg-blue-500 text-white rounded-md">
                      Ajouter
                    </button>
                  </div>
                  <div className="mt-2">
                    {motsCles.map((motCle, index) => (
                      <span key={index} className="mr-2 inline-flex items-center bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                        {motCle}
                        <button type="button" onClick={() => supprimerMotCle(motCle)} className="ml-1 text-blue-500">
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
                {/* Enregistrement audio */}
                <div className="mb-4">
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Enregistrement audio
                  </label>
                  <div className="flex items-center">
                    <button type="button" onClick={handleAudioRecording} className={`px-4 py-2 rounded-md ${isRecording ? 'bg-red-600' : 'bg-green-600'} text-white`}>
                      {isRecording ? <StopCircle className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                    </button>
                    {isRecording && <span className="ml-2 text-sm">{formatTime(recordingTime)}</span>}
                    {audioUrl && (
                      <audio className="ml-4" controls>
                        <source src={audioUrl} type="audio/webm" />
                        Votre navigateur ne supporte pas l'élément audio.
                      </audio>
                    )}
                  </div>
                </div>
                {/* Upload de fichiers */}
                <div className="mb-4">
                  <label htmlFor="fichiers" className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Fichiers joints
                  </label>
                  <input
                    type="file"
                    id="fichiers"
                    accept={ALLOWED_FILE_TYPES.join(',')}
                    onChange={handleFileUpload}
                    multiple
                    ref={fileInputRef}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className={`px-4 py-2 rounded-md ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'}`}
                  >
                    Choisir des fichiers
                  </button>
                  <div className="mt-2">
                    {pieceJointes.map((fichier, index) => (
                      <div key={index} className="flex justify-between items-center mt-1">
                        <span className="text-sm">{fichier.name}</span>
                        <button type="button" onClick={() => supprimerFichier(fichier)} className="text-red-500">
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Bouton de soumission */}
                <div className="mt-6 flex justify-between">
                  <button
                    type="button"
                    onClick={onClose}
                    className={`px-4 py-2 rounded-md text-sm font-medium 
                      ${isDarkMode 
                        ? 'bg-gray-700 text-white hover:bg-gray-600' 
                        : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                      }`}
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-4 py-2 rounded-md text-sm font-medium flex items-center
                      ${isSubmitting 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : `${isDarkMode 
                            ? 'bg-blue-600 text-white hover:bg-blue-700' 
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                          }`
                      }`}
                  >
                    {isSubmitting ? 'Envoi en cours...' : 'Créer le forum'}
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