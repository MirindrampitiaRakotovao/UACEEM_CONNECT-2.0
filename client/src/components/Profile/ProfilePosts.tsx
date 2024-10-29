import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Heart, MessageCircle, Plus, X, MoreVertical, Share, Send } from 'lucide-react';
import { useTheme } from '../../../src/context/ThemeContext';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

// Interfaces pour les types
interface User {
  nomUtilisateur: string;
  photoProfil: string;
}

interface Comment {
  id: string;
  text: string;
  auteurCommentaire: User;
}

interface Post {
  id: string;
  photoProfil: string;
  nomUtilisateur: string;
  datePublication: string;
  heurePublication: string;
  description: string;
  image: string;
  commentaires: Comment[];
}

const ProfilePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [newComment, setNewComment] = useState<{ [key: string]: string }>({});
  const [userReactions, setUserReactions] = useState<{ [key: string]: boolean }>({});
  const [reactionsCount, setReactionsCount] = useState<{ [key: string]: number }>({});
  const [showDropdown, setShowDropdown] = useState<{ [key: string]: boolean }>({});
  const [selectedPost, setSelectedPost] = useState<Post | null>(null); // Post sélectionné pour afficher les commentaires
  const { isDarkMode } = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [userProfile, setUserProfile] = useState<User | null>(null);


  useEffect(() => {
    const fetchPosts = async () => {
      const token = Cookies.get('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:5000/api/userPosts', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const sortedPosts = response.data.sort(
            (a: Post, b: Post) => new Date(b.datePublication).getTime() - new Date(a.datePublication).getTime()
          );
          setPosts(sortedPosts);

          await Promise.all(
            sortedPosts.map(async (post: Post) => {

              const reactionsRes = await axios.get(`http://localhost:5000/api/reactions/publication/${post.id}/reactions-count`, {
                headers: { Authorization: `Bearer ${token}` },
              });
              setReactionsCount((prev) => ({ ...prev, [post.id]: reactionsRes.data.count }));


              const userReactionRes = await axios.get(`http://localhost:5000/api/reactions/publication/${post.id}/user-reactions`, {
                headers: { Authorization: `Bearer ${token}` },
              });
              setUserReactions((prev) => ({ ...prev, [post.id]: userReactionRes.data.reacted }));
            })
          );
        } catch (err) {
          console.error('Erreur lors de la récupération des posts :', err);
          setError('Erreur lors de la récupération des posts');
        } finally {
          setLoading(false);
        }
      } else {
        setError('Token manquant, accès refusé');
        setLoading(false);
      }
    };

    const fetchUserProfile = async () => {
      const token = Cookies.get('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:5000/api/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserProfile(response.data);
        } catch (err) {
          console.error('Erreur lors de la récupération du profil de l\'utilisateur :', err);
        }
      }
    };

    fetchPosts();
    fetchUserProfile();

    socket.on('postUpdated', (updatedPost) => {
      setPosts((prevPosts) => {
        const index = prevPosts.findIndex((post) => post.id === updatedPost.id);
        if (index !== -1) {
          const updatedPosts = [...prevPosts];
          updatedPosts[index] = updatedPost;
          return updatedPosts;
        }
        return prevPosts;
      });
    });

    return () => {
      socket.off('postUpdated');
    };
  }, []);

  const openModal = (images: string[]) => {
    setSelectedImages(images);
  };

  const handleReact = async (postId: string) => {
    const token = Cookies.get('token');
    if (token) {
      try {
        await axios.post(
          `http://localhost:5000/api/reactions/publication/${postId}/toggle-reaction`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const hasReacted = userReactions[postId];
        setUserReactions((prev) => ({ ...prev, [postId]: !hasReacted }));

        // Mettre à jour le compte des réactions
        setReactionsCount((prev) => ({
          ...prev,
          [postId]: hasReacted ? prev[postId] - 1 : prev[postId] + 1,
        }));

        socket.emit(hasReacted ? 'reactionRemoved' : 'reactionAdded', { publicationId: postId });
      } catch (err) {
        console.error('Erreur lors de la gestion de la réaction :', err);
      }
    }
  };

  const handleOpenComments = async (post: Post) => {
    const token = Cookies.get('token');
    if (token) {
      try {
        const commentsRes = await axios.get(`http://localhost:5000/api/commentaires/${post.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSelectedPost({ ...post, commentaires: commentsRes.data });
      } catch (err) {
        console.error('Erreur lors de la récupération des commentaires :', err);
      }
    }
  };

  const closeCommentsModal = () => {
    setSelectedPost(null);
  };

  if (loading) return <div>Chargement des posts...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={`mt-5 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      {posts.length > 0 ? (
        posts.map((post) => {
          let imageArray: string[] = [];
          try {
            imageArray = JSON.parse(post.image);
          } catch (e) {
            console.error("Erreur lors de la conversion de l'image:", e);
          }

          const hasReacted = userReactions[post.id];

          return (
            <div key={post.id} className={`p-4 rounded mb-4 ${isDarkMode ? 'bg-gray-700' : 'bg-white'} shadow-md`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <img
                    src={`http://localhost:5000/${post.photoProfil}`}
                    alt={`${post.nomUtilisateur} profile`}
                    className="w-12 h-12 rounded-full object-cover mr-2"
                  />
                  <div className="flex flex-col">
                    <span className="font-bold text-lg">{post.nomUtilisateur}</span>
                    <div className="text-xs text-gray-500">
                      {post.datePublication} | {post.heurePublication}
                    </div>
                  </div>
                </div>
              </div>
              <h2 className="text-base">{post.description}</h2>
              {imageArray.length > 0 && (
                  <div className="mt-4 flex flex-wrap -m-1">
                    {imageArray.length === 1 ? (
                        <div className="w-full p-1">
                          <img
                              src={`http://localhost:5000/${imageArray[0].replace(/\\/g, '/')}`}
                              alt="Publication"
                              className="w-full aspect-square object-cover rounded-xl"
                          />
                        </div>
                    ) : imageArray.length === 2 ? (
                        <>
                          {imageArray.map((image, index) => (
                              <div key={index} className="w-1/2 p-1">
                                <img
                                    src={`http://localhost:5000/${image.replace(/\\/g, '/')}`}
                                    alt={`Publication ${index + 1}`}
                                    className="w-full aspect-square object-cover rounded-xl"
                                />
                              </div>
                          ))}
                        </>
                    ) : (
                        <div className="w-full flex flex-wrap">
                          <div className="w-2/3 p-1">
                            <img
                                src={`http://localhost:5000/${imageArray[0].replace(/\\/g, '/')}`}
                                alt="Publication 1"
                                className="w-full aspect-square object-cover rounded-xl"
                            />
                          </div>
                          <div className="w-1/3 flex flex-col">
                            <div className="p-1">
                              <img
                                  src={`http://localhost:5000/${imageArray[1].replace(/\\/g, '/')}`}
                                  alt="Publication 2"
                                  className="w-full aspect-square object-cover rounded-xl"
                              />
                            </div>
                            <div className="p-1 relative">
                              <img
                                  src={`http://localhost:5000/${imageArray[2].replace(/\\/g, '/')}`}
                                  alt="Publication 3"
                                  className="w-full aspect-square object-cover rounded-xl"
                              />
                              {imageArray.length > 3 && (
                                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-xl">
                                <span className="text-white text-lg font-bold">
                                    +{imageArray.length - 3} Voir plus
                                </span>
                                    <Plus className="text-white ml-2" />
                                    <button onClick={() => openModal(imageArray)} className="absolute inset-0" />
                                  </div>
                              )}
                            </div>
                          </div>
                        </div>
                    )}
                  </div>
              )}

              <div
                className={`mt-4 flex items-center justify-between p-2 border rounded ${isDarkMode ? 'bg-gray-700 border-gray-700' : 'bg-gray-100 border-gray-300'
                  }`}
              >
                <div className="flex space-x-8">
                  <div
                    className={`flex items-center space-x-2 cursor-pointer ${hasReacted ? 'text-blue-600' : 'text-gray-500'
                      }`}
                    onClick={() => handleReact(post.id)}
                  >
                    <Heart className={`w-6 h-6 ${hasReacted ? 'fill-current text-blue-600' : ''}`} />
                    <span>{reactionsCount[post.id] || 0}</span>
                  </div>
                  <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleOpenComments(post)}>
                    <MessageCircle className="w-6 h-6" />
                    <span>{post.commentaires.length}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div>Aucun post à afficher</div>
      )}

      {selectedPost && userProfile && ( // Vérifier si selectedPost et userProfile sont définis
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className={`p-6 rounded-lg shadow-lg max-w-lg w-full ${isDarkMode ? 'bg-gray-800' : 'bg-white'} h-auto`}> {/* Hauteur ajustable */}
            <div className={`flex justify-between items-center mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
              <h2 className="text-lg font-bold">Commentaires</h2>
              <button onClick={closeCommentsModal}>
                <X className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-black'}`} />
              </button>
            </div>

            {/* Liste des commentaires */}
            <ul>
              {selectedPost.commentaires.length > 0 ? (
                selectedPost.commentaires.map((comment) => (
                  <li key={comment.id} className={`mb-4 flex space-x-3 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    <img
                      src={`http://localhost:5000/${comment.auteurCommentaire.photoProfil}`}
                      alt={`${comment.auteurCommentaire.nomUtilisateur} profile`}
                      className="w-10 h-10 rounded-full object-cover object-center"
                    />
                    <div className={`flex-1 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} p-3 rounded-lg`}>
                      <div className={`flex items-center space-x-2 mb-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                        <span className="font-semibold">{comment.auteurCommentaire.nomUtilisateur}</span>
                        <span className="text-xs text-gray-500">1 j</span>
                      </div>
                      <p className={`${isDarkMode ? 'text-white' : 'text-gray-700'}`}>{comment.text}</p>
                      <div className={`flex items-center space-x-4 text-xs text-gray-500 mt-1 ${isDarkMode ? 'text-gray-400' : ''}`}>
                        <button className="text-blue-600">J'aime</button>
                        <button>Répondre</button>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Aucun commentaire pour ce post.</p>
              )}
            </ul>

            {/* Input pour le nouvel ajout de commentaire */}
            <div className="mt-4 flex items-center">
              <img
                src={`http://localhost:5000/${userProfile.photoProfil}`} // Photo de profil de l'utilisateur connecté
                alt="Votre profil"
                className="w-10 h-10 rounded-full object-cover mr-2" // Image de profil avec marge à droite
              />
              <input
                type="text"
                placeholder="Ajouter un commentaire..."
                className={`flex-1 border ${isDarkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-black'} rounded-lg p-2`}
              />
              <button className="ml-2 bg-blue-500 text-white rounded-lg p-2 flex items-center">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePosts;
