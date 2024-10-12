import React, { useState,useRef, useEffect, useCallback } from "react";
import { SendHorizontal, CircleX, Smile } from "lucide-react";
import axios from "axios";
import Avatar from './avatar';
import EmojiPicker , { EmojiClickData } from 'emoji-picker-react';

type Etudiant = {
  id: number;
  username: string;
  role: string;
};

type Commentaire = {
  id: number;
  contenu: string;
  date_commentaire: string;
  etudiant: Etudiant;
  reponses?: Commentaire[];
};

interface CommentModalProps {
  publicationId: number;
  isOpen: boolean;
  onClose: () => void;
}

const CommentModal: React.FC<CommentModalProps> = ({
  publicationId,
  isOpen,
  onClose,
}) => {
  const [commentaires, setCommentaires] = useState<Commentaire[]>([]);
  const [newComment, setNewComment] = useState("");
  const [likedCommentaires, setLikedCommentaires] = useState<number[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showReplyEmojiPicker, setShowReplyEmojiPicker] = useState(false); // Track for specific replies
  const [replyingToCommentId, setReplyingToCommentId] = useState<number | null>(null);
  const [newReply, setNewReply] = useState<string>("");

  // Ref pour le conteneur de l'emoji picker
  const emojiPickerRef = useRef<HTMLDivElement | null>(null);

  const fetchCommentaires = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/commentaire/${publicationId}`
      );
      const sortedCommentaires = response.data.sort(
        (a: Commentaire, b: Commentaire) =>
          new Date(b.date_commentaire).getTime() - new Date(a.date_commentaire).getTime()
      );
      setCommentaires(sortedCommentaires);
    } catch (error) {
      console.error("Erreur lors du chargement des commentaires:", error);
    }
  }, [publicationId]);

  useEffect(() => {
    if (isOpen) {
      fetchCommentaires();
    }
  }, [isOpen, fetchCommentaires]);

  const handleEnvoyerCommentaire = async () => {
    const token = localStorage.getItem("token");
    const etudiantId = localStorage.getItem("etudiantId");

    if (!etudiantId) {
      console.error("Erreur: identifiant de l'étudiant non disponible");
      return;
    }

    if (newComment) {
      try {
        await axios.post(
          "http://localhost:4000/commentaire",
          { contenu: newComment, publicationId, etudiantId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setNewComment("");
        fetchCommentaires();
      } catch (error: any) {
        console.error(
          "Erreur lors de l'envoi du commentaire:",
          error.response?.data || error.message
        );
      }
    }
  };

  // Fonction pour gérer le like/délike
  const handleLikeToggle = async (CommentaireId: number) => {
    try {
      const isLiked = likedCommentaires.includes(CommentaireId);
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:4000/reaction',
        { commentaireId: CommentaireId }, // Correction de la clé
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setLikedCommentaires((prevLikedCommentaires) =>
        isLiked
          ? prevLikedCommentaires.filter((id) => id !== CommentaireId)
          : [...prevLikedCommentaires, CommentaireId]
      );
    } catch (error) {
      console.error('Erreur lors de la gestion de la réaction:', error);
    }
  };

  // Fonction pour ajouter un emoji 
  const handleEmojiClick = (emojiObject: EmojiClickData) => {
    setNewComment((prev) => prev + emojiObject.emoji);
  };
  
  const handleReplyEmojiClick = (emojiObject: EmojiClickData) => {
    setNewReply((prev) => prev + emojiObject.emoji);
  };

  // Fetch reactions (aime)
  useEffect(() => {
    const fetchUserReactions = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:4000/reaction', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userLikedCommentaires = response.data.map((reaction: any) => reaction.publication_id);
        setLikedCommentaires(userLikedCommentaires);
      } catch (error) {
        console.error('Erreur lors du chargement des réactions:', error);
      }
    };

    fetchUserReactions();
  }, []);

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
    
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setShowReplyEmojiPicker(false);
      }
    };

    if (showReplyEmojiPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  },[showReplyEmojiPicker]);

  if (!isOpen) return null;

  //Fonction pour répondre à un commentaire
  const handleEnvoyerReponse = async (commentaireId: number) => {
    const token = localStorage.getItem("token");
    const etudiantId = localStorage.getItem("etudiantId");
  
    if (!etudiantId) {
      console.error("Erreur: identifiant de l'étudiant non disponible");
      return;
    }
  
    if (newReply) {
      try {
        await axios.post(
          `http://localhost:4000/commentaire/reponse`, // URL de la route pour envoyer une réponse
          { contenu: newReply, commentaireId, etudiantId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setNewReply("");
        setReplyingToCommentId(null);  // Masquer l'input après l'envoi
        fetchCommentaires();
      } catch (error: any) {
        console.error(
          "Erreur lors de l'envoi de la réponse:",
          error.response?.data || error.message
        );
      }
    }
  };
  

  // Fonction récursive pour afficher les réponses imbriquées
  const renderCommentaires = (commentaire: Commentaire, depth = 0) => {
    const isLiked = likedCommentaires.includes(commentaire.id);
    const isReplying = replyingToCommentId === commentaire.id;

    return (
      <div key={commentaire.id} className={`mb-4 p-3 bg-white rounded-lg shadow ml-${depth * 5}`}>
        <div className="flex items-start space-x-3">
          <Avatar userId={commentaire.etudiant.id} size="w-10 h-10" />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h6 className="text-sm font-semibold">{commentaire.etudiant.username}</h6>
              <p className="text-xs text-gray-400">
                {new Date(commentaire.date_commentaire).toLocaleDateString()}
              </p>
            </div>
            <p className="text-sm mt-2">{commentaire.contenu}</p>
            <div className="flex items-center space-x-6 mt-4 text-gray-400">
              <button 
                className="flex items-center space-x-2"
                onClick={() => handleLikeToggle(commentaire.id)}
              >
                <span
                  className={`text-sm transition duration-200 ease-in-out ${
                    isLiked ? 'text-red-500' : 'text-gray-400'
                  } hover:text-red-500`}
                >
                  J'adore
                </span>
              </button>
              <button 
                className="text-sm hover:text-gray-200"
                onClick={() => setReplyingToCommentId(commentaire.id)} // Affiche l'input pour ce commentaire
              >
                Répondre
              </button>
              <button className="text-sm hover:text-gray-200">Signaler</button>
            </div>
            {/* Afficher l'input de réponse si l'utilisateur a cliqué sur "Répondre" */}
            {isReplying && (
              <div className="mt-3 flex items-center">
                <input
                  type="text"
                  value={newReply}
                  onChange={(e) => setNewReply(e.target.value)}
                  placeholder="Votre réponse..."
                  className="w-full p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 mr-3"
                />
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Smile 
                      size={25} 
                      className="text-gray-500 hover:text-blue-500 cursor-pointer" 
                      onClick={() => setShowReplyEmojiPicker(!showReplyEmojiPicker)}
                    />
                    {showReplyEmojiPicker && (
                      <div
                        className="emoji-picker-container mt-2 absolute right-0"
                        ref={emojiPickerRef}
                        onMouseLeave={() => setShowReplyEmojiPicker(false)} // Hide when the mouse leaves
                      >
                        <EmojiPicker onEmojiClick={handleReplyEmojiClick} />
                      </div>
                    )}
                  </div>
                  <button onClick={() => handleEnvoyerReponse(commentaire.id)}>
                    <SendHorizontal size={25} className="text-gray-500 hover:text-blue-500 cursor-pointer" />
                  </button>
                </div>
              </div>
            )}


          </div>
        </div>
        {/* Réponses imbriquées */}
        {commentaire.reponses && commentaire.reponses.length > 0 && (
          <div className="mt-4">
            {commentaire.reponses.map((reponse) => renderCommentaires(reponse, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Commentaires</h3>
          <button onClick={onClose}>
            <CircleX className="w-6 h-6 text-gray-500 hover:text-red-500" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto scrollbar-hidden mb-4">
          {commentaires.length > 0 ? (
            commentaires.map((commentaire) => renderCommentaires(commentaire))
          ) : (
            <p>Aucun commentaire pour cette publication.</p>
          )}

        </div>
        <div className="mt-4 flex items-center">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Ajouter un commentaire..."
            className="w-full p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 mr-3 text-gray"
          />
            <Smile 
              size={35} 
              className=" text-gray-500 hover:text-blue-500 cursor-pointer" 
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            />
          {showEmojiPicker && (
            <div
              className="emoji-picker-container mt-2"
              ref={emojiPickerRef}
              onMouseLeave={() => setShowEmojiPicker(false)} // Ferme le sélecteur d'emojis lorsque la souris quitte la zone
            >
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}

          <button onClick={handleEnvoyerCommentaire}>
            <SendHorizontal size={35} className=" text-gray-500 hover:text-blue-500 cursor-pointer" />
          </button>

        </div>
      </div>
    </div>
  );
};

export default CommentModal;
