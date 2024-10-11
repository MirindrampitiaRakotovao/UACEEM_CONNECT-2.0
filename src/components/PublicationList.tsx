import React, { useState, useEffect } from "react";
import { Heart, MessageCircle, BadgeAlert, CircleX,  Eye , SendHorizontal } from 'lucide-react';
import Avatar from './avatar';
import ModalFile from './ModalFile';
import axios from 'axios';  // Ajouter axios pour la gestion des requêtes API
import CommentModal from "./CommentModal";

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

interface PublicationListProps {
  publications: Publication[];
  loading: boolean;
  error: string | null;
}

const PublicationList: React.FC<PublicationListProps> = ({
  publications,
  loading,
  error,
}) => {
  const [likedPublications, setLikedPublications] = useState<number[]>([]);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState<{
    [key: number]: boolean;
  }>({});
  const [newComment, setNewComment] = useState<{ [key: number]: string }>({});
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const [selectedFileUrl, setSelectedFileUrl] = useState<string | null>(null);
  const [showCommentInput, setShowCommentInput] = useState<{
    [key: number]: boolean;
  }>({});
  
  const openFileModal = (fileUrl: string) => {
    setSelectedFileUrl(fileUrl);
    setIsFileModalOpen(true);
  };

  const closeFileModal = () => {
    setIsFileModalOpen(false);
    setSelectedFileUrl(null);
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

  return (
    <div className="publication-list mt-8 ">
      {loading ? (
        <p>Chargement des publications...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        sortedPublications.map((publication) => {
          const isLiked = likedPublications.includes(publication.id); // Vérifier si l'utilisateur a déjà aimé

          return (
            <div key={publication.id} className="bg-white p-4 rounded-md shadow mb-4 p-3">
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
                <button className="text-gray-500 hover:text-gray-700 ml-40">
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
                    alt="Fichier unique"
                    className="w-full max-w-lg h-auto object-cover rounded-2xl cursor-pointer p-0.5"
                    onClick={() => openFileModal(publication.fichiers[0].url_fichier)}
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
                      alt={`Fichier supplémentaire ${index + 1}`}
                      className="w-full h-80 object-cover rounded-2xl cursor-pointer p-0.5"
                      onClick={() => openFileModal(file.url_fichier)}
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
                      alt="Premier fichier"
                      className="w-full h-80 object-cover rounded-2xl cursor-pointer p-0.5"
                      onClick={() => openFileModal(publication.fichiers[0].url_fichier)}
                    />
                  </div>
                  <div className="grid grid-rows-2 gap-2">
                    <img
                      src={publication.fichiers[1].url_fichier}
                      alt="Deuxième fichier"
                      className="w-full h-40 object-cover rounded-2xl cursor-pointer p-0.5"
                      onClick={() => openFileModal(publication.fichiers[1].url_fichier)}
                    />
                    <img
                      src={publication.fichiers[2].url_fichier}
                      alt="Troisième fichier"
                      className="w-full h-40 object-cover rounded-2xl cursor-pointer p-0.5"
                      onClick={() => openFileModal(publication.fichiers[2].url_fichier)}
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
                      alt="Premier fichier"
                      className="w-full h-80 object-cover rounded-2xl cursor-pointer p-0.5"
                      onClick={() => openFileModal(publication.fichiers[0].url_fichier)}
                    />
                  </div>
                  <div className="grid grid-rows-2 gap-2">
                    <img
                      src={publication.fichiers[1].url_fichier}
                      alt="Deuxième fichier"
                      className="w-full h-40 object-cover rounded-2xl cursor-pointer p-0.5"
                      onClick={() => openFileModal(publication.fichiers[1].url_fichier)}
                    />
                    <div
                      className="relative w-full h-40 object-cover rounded-2xl cursor-pointer p-0.5 bg-gray-200 flex items-center justify-center"
                      onClick={() => openFileModal(publication.fichiers[3].url_fichier)}
                    >
                      <img
                        src={publication.fichiers[2].url_fichier}
                        alt="Troisième fichier"
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
                  className="w-full p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 mr-3 text-gray" 
                />
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

      {selectedFileUrl && (
        <ModalFile isOpen={isFileModalOpen} onClose={closeFileModal} fileUrl={selectedFileUrl} />
      )}
    </div>
  );
};

export default PublicationList;
