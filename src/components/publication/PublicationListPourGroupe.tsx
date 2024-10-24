import React, { useState, useRef, useEffect } from "react";
import { Heart, MessageCircle, BadgeAlert, CircleX,  Eye , SendHorizontal, Smile} from 'lucide-react';
import Avatar from '../avatar';
import ModalFile from '../ModalFile';
import axios from 'axios';  // Ajouter axios pour la gestion des requêtes API
import CommentModal from "../CommentModal";
import EmojiPicker , { EmojiClickData , Theme } from 'emoji-picker-react';
import { useDarkMode } from '../../contexts/DarkModeContext';
import classNames from 'classnames';

type File = {
  id: number;
  url_fichier: string;
};

type Etudiant = {
  id: number;
  username: string;
  role: string;
};

type Publication = {
  id: number;
  legende: string;
  date_publication: string;
  etudiant: Etudiant;
  fichiers: File[];
};

interface PublicationListPourGroupeProps {
  publications: Publication[];
  loading: boolean;
  error: string | null;
}

const PublicationListPourGroupe: React.FC<PublicationListPourGroupeProps> = ({
  publications,
  loading,
  error,
}) => {
  const { isDarkMode } = useDarkMode(); 
  const [likedPublications, setLikedPublications] = useState<number[]>([]);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState<{
    [key: number]: boolean;
  }>({});
  const [newComment, setNewComment] = useState<{ [key: number]: string }>({});
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null);
  const [showCommentInput, setShowCommentInput] = useState<{
    [key: number]: boolean;
  }>({});
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Ref pour le conteneur de l'emoji picker
  const emojiPickerRef = useRef<HTMLDivElement | null>(null);
  
  const openFileModal = (files: File[]) => {
    setSelectedFiles(files);
    setIsFileModalOpen(true);
  };

  const closeFileModal = () => {
    setIsFileModalOpen(false);
    setSelectedFiles(null);
  };

  // Fonction pour gérer le like/délike
  const handleLikeToggle = async (publicationId: number) => {
    try {
      const isLiked = likedPublications.includes(publicationId);
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:4000/reaction',
        { publicationId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setLikedPublications((prevLikedPublications) =>
        isLiked
          ? prevLikedPublications.filter((id) => id !== publicationId)
          : [...prevLikedPublications, publicationId]
      );
    } catch (error) {
      console.error('Erreur lors de la gestion de la réaction:', error);
    }
  };

  // Fonction pour ajouter un emoji à la légende
  const handleEmojiClick = (emojiObject: EmojiClickData, publicationId: number) => {
    setNewComment((prevComments) => ({
      ...prevComments,
      [publicationId]: (prevComments[publicationId] || '') + emojiObject.emoji,
    }));
  };
  

  // Fetch reactions (aime)
  useEffect(() => {
    const fetchUserReactions = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:4000/reaction', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userLikedPublications = response.data.map((reaction: any) => reaction.publication_id);
        setLikedPublications(userLikedPublications);
      } catch (error) {
        console.error('Erreur lors du chargement des réactions:', error);
      }
    };

    fetchUserReactions();
  }, []);


  // Gérer l'affichage de l'input de commentaire
  const handleShowCommentInput = (publicationId: number) => {
    setShowCommentInput((prev) => ({
      ...prev,
      [publicationId]: !prev[publicationId],
    }));
  };

  // Envoyer un nouveau commentaire
  const handleEnvoyerCommentaire = async (publicationId: number) => {
    const token = localStorage.getItem("token");
    const etudiantId = localStorage.getItem("etudiantId");

    if (!etudiantId) {
      console.error("Erreur: identifiant de l'étudiant non disponible");
      return;
    }

    if (newComment[publicationId]) {
      try {
        await axios.post(
          "http://localhost:4000/commentaire",
          { contenu: newComment[publicationId], publicationId, etudiantId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setNewComment((prev) => ({
          ...prev,
          [publicationId]: "",
        }));
        
        setIsCommentModalOpen((prev) => ({
          ...prev,
          [publicationId]: true,
        }));

      } catch (error: any) {
        console.error("Erreur lors de l'envoi du commentaire:", error.response?.data || error.message);
      }
    }
  };

  // Ouvrir le modal de commentaires
  const handleOpenCommentModal = (publicationId: number) => {
    setIsCommentModalOpen((prev) => ({
      ...prev,
      [publicationId]: true,
    }));
  };

   // Fermer le modal de commentaires
   const handleCloseCommentModal = (publicationId: number) => {
    setIsCommentModalOpen((prev) => ({
      ...prev,
      [publicationId]: false,
    }));
  };

  const sortedPublications = publications.sort(
    (a, b) => new Date(b.date_publication).getTime() - new Date(a.date_publication).getTime()
  );

  // Fonction pour détecter le clic en dehors du sélecteur d'emojis
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false);
      }
    };

    if (showEmojiPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmojiPicker]);


  return (
    <div className={`publication-list mt-8 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      {loading ? (
        <p>Chargement des publications...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        sortedPublications.map((publication) => {
          const isLiked = likedPublications.includes(publication.id);

          return (
            <div key={publication.id} className={`p-4 rounded-md shadow mb-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex justify-between items-center mb-4">
                <div className="flex">
                  <Avatar userId={publication.etudiant.id}/>  
                  <div className="ml-4">
                    <h4 className="text-lg font-bold">{publication.etudiant.username}</h4>
                    <p className="text-sm text-gray-400">{publication.etudiant.role}</p>
                    <span className="text-sm text-gray-400">
                      {new Date(publication.date_publication).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <button className={`ml-40 ${isDarkMode ? 'text-white' : 'text-gray-500 hover:text-gray-700'}`}>
                  <CircleX />
                </button>
              </div>

              <p className="mt-2 mb-4">{publication.legende}</p>
              {/* Gestion des fichiers */}
              <div className={`grid ${publication.fichiers.length === 1 ? 'grid-cols-1 justify-items-center' : ''}`}>
                {/* Cas pour une seule image (centrée) */}
                {publication.fichiers.length === 1 && (
                  <div className="flex justify-center">
                    <img
                      src={publication.fichiers[0].url_fichier}
                      alt=""
                      className="w-full max-w-lg h-auto object-cover rounded-2xl cursor-pointer p-0.5"
                      onClick={() => openFileModal(publication.fichiers)}
                    />
                  </div>
                )}

                {/* Cas pour 2 images (côte à côte) */}
                {publication.fichiers.length === 2 && (
                  <div className="grid grid-cols-2 gap-2">
                    {publication.fichiers.map((file, index) => (
                      <img
                        key={index}
                        src={file.url_fichier}
                        alt=""
                        className="w-full h-80 object-cover rounded-2xl cursor-pointer p-0.5"
                        onClick={() => openFileModal(publication.fichiers)}
                      />
                    ))}
                  </div>
                )}

                {/* Cas pour 3 images (une à gauche, deux empilées à droite) */}
                {publication.fichiers.length === 3 && (
                  <div className="grid grid-cols-2 gap-2">
                    <div className="col-span-1">
                      <img
                        src={publication.fichiers[0].url_fichier}
                        alt=""
                        className="w-full h-80 object-cover rounded-2xl cursor-pointer p-0.5"
                        onClick={() => openFileModal(publication.fichiers)}
                      />
                    </div>
                    <div className="grid grid-rows-2 gap-2">
                      <img
                        src={publication.fichiers[1].url_fichier}
                        alt=""
                        className="w-full h-40 object-cover rounded-2xl cursor-pointer p-0.5"
                        onClick={() => openFileModal(publication.fichiers)}
                      />
                      <img
                        src={publication.fichiers[2].url_fichier}
                        alt=""
                        className="w-full h-40 object-cover rounded-2xl cursor-pointer p-0.5"
                        onClick={() => openFileModal(publication.fichiers)}
                      />
                    </div>
                  </div>
                )}

                {/* Cas pour 4 images ou plus (trois affichées, une superposition pour les images restantes) */}
                {publication.fichiers.length > 3 && (
                  <div className="grid grid-cols-2 gap-2">
                    <div className="col-span-1">
                      <img
                        src={publication.fichiers[0].url_fichier}
                        alt=""
                        className="w-full h-80 object-cover rounded-2xl cursor-pointer p-0.5"
                        onClick={() => openFileModal(publication.fichiers)}
                      />
                    </div>
                    <div className="grid grid-rows-2 gap-2">
                      <img
                        src={publication.fichiers[1].url_fichier}
                        alt=""
                        className="w-full h-40 object-cover rounded-2xl cursor-pointer p-0.5"
                        onClick={() => openFileModal(publication.fichiers)}
                      />
                      <div
                        className="relative w-full h-40 object-cover rounded-2xl cursor-pointer p-0.5 bg-gray-200 flex items-center justify-center"
                        onClick={() => openFileModal(publication.fichiers)}
                      >
                        <img
                          src={publication.fichiers[2].url_fichier}
                          alt=""
                          className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl opacity-50"
                        />
                        {publication.fichiers.length > 4 && (
                          <div className="absolute text-4xl text-white font-bold">
                            +{publication.fichiers.length - 3}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
            </div>

              <div className="flex justify-between mt-6">
                {/* Bouton J'aime avec changement de couleur */}
                <button
                  className="flex items-center space-x-2"
                  onClick={() => handleLikeToggle(publication.id)} // Appeler la fonction de like
                >
                  <Heart
                    className={`w-6 h-6 cursor-pointer transition duration-200 ease-in-out ${
                      isLiked ? 'text-red-500 fill-red-500' : 'text-gray-500'
                    } hover:text-red-500 hover:fill-red-500`} // Aperçu de la couleur et du remplissage au survol
                  />
                  <span
                    className={`text-sm transition duration-200 ease-in-out ${
                      isLiked ? 'text-red-500' : 'text-gray-500'
                    } hover:text-red-500`}
                  >
                    J'adore
                  </span>
                </button>

                {/* Bouton pour afficher/masquer l'input de commentaire */}
                <button
                  className="flex items-center space-x-2"
                  onClick={() => handleShowCommentInput(publication.id)}
                >
                  <MessageCircle className="w-6 h-6 text-gray-500 hover:text-blue-500 cursor-pointer" />
                  <span className="text-sm text-gray-500">Commenter</span>
                </button>

                <button className="flex items-center space-x-2">
                  <BadgeAlert className="w-6 h-6 text-gray-500 hover:text-yellow-500 cursor-pointer" />
                  <span className="text-sm text-gray-500">Signaler</span>
                </button>
              </div>

              {/* Afficher l'input pour le commentaire */}
              {showCommentInput[publication.id] && (
                <div className="mt-4 flex items-center">
                <input
                  type="text"
                  value={newComment[publication.id] || ""}
                  onChange={(e) =>
                    setNewComment((prev) => ({
                      ...prev,
                      [publication.id]: e.target.value,
                    }))
                  }
                  placeholder="Ajouter un commentaire..."
                  className={classNames(
                    "w-full p-2 border rounded-full focus:outline-none focus:ring-2 mr-3",
                    {
                      "focus:ring-blue-500 text-gray-700 border-gray-300 bg-white": !isDarkMode, // Mode clair
                      "focus:ring-blue-300 text-gray-300 border-gray-600 bg-gray-800": isDarkMode, // Mode sombre
                    }
                  )}
                />
                <div className="relative">
                  <Smile 
                      size={35} 
                      className=" text-gray-500 hover:text-blue-500 cursor-pointer" 
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    />
                  {showEmojiPicker && (
                    <div
                    className="emoji-picker-container absolute bottom-full mb-2 right-0"
                    ref={emojiPickerRef}
                    onMouseLeave={() => setShowEmojiPicker(false)} // Ferme le sélecteur d'emojis lorsque la souris quitte la zone
                  >
                      <EmojiPicker 
                        onEmojiClick={(emojiObject) => handleEmojiClick(emojiObject, publication.id)}
                        theme={isDarkMode ? Theme.DARK : Theme.LIGHT}
                      />
                    </div>
                  )}
                </div>
                <button
                  onClick={() => handleEnvoyerCommentaire(publication.id)}
                >
                  <SendHorizontal size={35} className=" text-gray-500 hover:text-blue-500 cursor-pointer"/>
                </button>
              </div>
              
              )}
              <div className="mt-4">
              
              {/*Boutton pour afficher le commentaire */}
              <button
                  className="flex items-center space-x-2"
                  onClick={() => handleOpenCommentModal(publication.id)}
                >
                  <Eye className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-400 text-sm underline hover:text-blue-500">Voir les commentaires</span>
                </button>
                {/* Afficher le modal de commentaires */}
              {isCommentModalOpen[publication.id] && (
                <CommentModal
                  publicationId={publication.id}
                  isOpen={isCommentModalOpen[publication.id]}
                  onClose={() => handleCloseCommentModal(publication.id)}
                />
              )}
              </div>

            </div>
          );
        })
      )}

      {selectedFiles && (
        <ModalFile isOpen={isFileModalOpen} onClose={closeFileModal} files={selectedFiles} />
      )}
    </div>
  );
};

export default PublicationListPourGroupe;
