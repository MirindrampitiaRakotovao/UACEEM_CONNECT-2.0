import React, { useState, useEffect, useCallback } from "react";
import { SendHorizontal, CircleX } from "lucide-react";
import axios from "axios";
import Avatar from './avatar';

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

  if (!isOpen) return null;

  // Fonction récursive pour afficher les réponses imbriquées
  const renderCommentaires = (commentaire: Commentaire, depth = 0) => (
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
            <button className="text-sm hover:text-gray-200">J'adore</button>
            <button className="text-sm hover:text-gray-200">Répondre</button>
            <button className="text-sm hover:text-gray-200">Signaler</button>
          </div>
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

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Commentaires</h3>
          <button onClick={onClose}>
            <CircleX className="w-6 h-6 text-gray-500 hover:text-red-500" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto mb-4">
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
          <button onClick={handleEnvoyerCommentaire}>
            <SendHorizontal size={35} className=" text-gray-500 hover:text-blue-500 cursor-pointer" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
