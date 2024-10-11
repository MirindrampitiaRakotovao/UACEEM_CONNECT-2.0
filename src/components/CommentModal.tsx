import React, { useState, useEffect, useCallback } from "react";
import { SendHorizontal, CircleX } from "lucide-react";
import axios from "axios";

type Etudiant = {
  id: number;
  username: string;
};

type Commentaire = {
  id: number;
  contenu: string;
  date_commentaire: string;
  etudiant: Etudiant;
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
      setCommentaires(response.data);
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
            commentaires.map((commentaire) => (
              <div key={commentaire.id} className="mb-4">
                <h4 className="font-semibold">
                  {commentaire.etudiant.username}
                </h4>
                <p className="text-sm text-gray-600">{commentaire.contenu}</p>
                <span className="text-xs text-gray-400">
                  {new Date(commentaire.date_commentaire).toLocaleDateString()}
                </span>
              </div>
            ))
          ) : (
            <p>Aucun commentaire pour cette publication.</p>
          )}
        </div>

        <div className="flex items-center">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Ajouter un commentaire..."
            className="border border-gray-300 rounded-md p-2 flex-grow mr-2"
          />
          <button
            onClick={handleEnvoyerCommentaire}
            className="p-2 bg-blue-500 text-white rounded-md"
          >
            <SendHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
