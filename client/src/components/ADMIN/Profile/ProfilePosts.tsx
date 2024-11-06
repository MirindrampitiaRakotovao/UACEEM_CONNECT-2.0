import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Heart, MessageCircle, Share2, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext.tsx';
import io from 'socket.io-client';
import { motion, AnimatePresence } from 'framer-motion';

const socket = io('http://localhost:5000');

interface User {
  nomUtilisateur: string;
  photoProfil: string;
}

interface Comment {
  id: string;
  text: string;
  auteurCommentaire: User;
  date: string;
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

const ProfilePosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userReactions, setUserReactions] = useState<{ [key: string]: boolean }>({});
  const [reactionsCount, setReactionsCount] = useState<{ [key: string]: number }>({});
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const { isDarkMode } = useTheme();
  const [userProfile, setUserProfile] = useState<User | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const token = Cookies.get('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:5000/api/userPosts', {
            headers: { Authorization: `Bearer ${token}` },
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
            headers: { Authorization: `Bearer ${token}` },
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

  const handleReact = async (postId: string) => {
    const token = Cookies.get('token');
    if (token) {
      try {
        await axios.post(
          `http://localhost:5000/api/reactions/publication/${postId}/toggle-reaction`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const hasReacted = userReactions[postId];
        setUserReactions((prev) => ({ ...prev, [postId]: !hasReacted }));
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

  if (loading) return <PostSkeleton />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          isDarkMode={isDarkMode}
          userReactions={userReactions}
          reactionsCount={reactionsCount}
          handleReact={handleReact}
          handleOpenComments={handleOpenComments}
        />
      ))}
      {selectedPost && (
        <CommentsModal
          post={selectedPost}
          userProfile={userProfile}
          isDarkMode={isDarkMode}
          closeModal={() => setSelectedPost(null)}
        />
      )}
    </div>
  );
};

const PostCard: React.FC<{
  post: Post;
  isDarkMode: boolean;
  userReactions: { [key: string]: boolean };
  reactionsCount: { [key: string]: number };
  handleReact: (postId: string) => void;
  handleOpenComments: (post: Post) => void;
}> = ({
  post,
  isDarkMode,
  userReactions,
  reactionsCount,
  handleReact,
  handleOpenComments,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageArray = JSON.parse(post.image);
  const hasReacted = userReactions[post.id];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === imageArray.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [imageArray]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === imageArray.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? imageArray.length - 1 : prevIndex - 1
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`rounded-lg overflow-hidden shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <img
              src={`http://localhost:5000/${post.photoProfil}`}
              alt={post.nomUtilisateur}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {post.nomUtilisateur}
              </p>
              <p className="text-xs text-gray-500">
                {post.datePublication} à {post.heurePublication}
              </p>
            </div>
          </div>
          <MoreHorizontal className="w-5 h-5 text-gray-500 cursor-pointer" />
        </div>
      </div>

      <div className="relative aspect-square">
        <img
          src={`http://localhost:5000/${imageArray[currentImageIndex].replace(/\\/g, '/')}`}
          alt={`Post ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
        />
        {imageArray.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-1"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-1"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {imageArray.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    currentImageIndex === index ? 'bg-white' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="p-4">
        <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {post.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex space-x-4">
            <button
              onClick={() => handleReact(post.id)}
              className={`flex items-center space-x-1 ${
                hasReacted ? 'text-red-500' : isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              <Heart className={`w-5 h-5 ${hasReacted ? 'fill-current' : ''}`} />
              <span className="text-xs">{reactionsCount[post.id] || 0}</span>
            </button>
            <button
              onClick={() => handleOpenComments(post)}
              className={`flex items-center space-x-1 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              <MessageCircle className="w-5 h-5" />
              <span className="text-xs">{post.commentaires.length}</span>
            </button>
          </div>
          <Share2 className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
        </div>
      </div>
    </motion.div>
  );
};

const CommentsModal: React.FC<{
  post: Post;
  userProfile: User | null;
  isDarkMode: boolean;
  closeModal: () => void;
}> = ({ post, userProfile, isDarkMode, closeModal }) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmitComment = () => {
    // Implement comment submission logic here
    console.log('Submitting comment:', newComment);
    setNewComment('');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className={`w-full max-w-lg rounded-lg ${
          isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        } p-6 shadow-xl`}
      >
        <h2 className="text-xl font-bold mb-4">Commentaires</h2>
        <div className="max-h-96 overflow-y-auto mb-4">
          {post.commentaires.map((comment) => (
            <div key={comment.id} className="mb-4">
              <div className="flex items-start space-x-3">
                <img
                  src={`http://localhost:5000/${comment.auteurCommentaire.photoProfil}`}
                  alt={comment.auteurCommentaire.nomUtilisateur}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className={`flex-1 p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <p className="font-semibold text-sm">{comment.auteurCommentaire.nomUtilisateur}</p>
                  <p className="text-sm">{comment.text}</p>
                  <p className="text-xs text-gray-500 mt-1">{comment.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {userProfile && (
          <div className="flex items-center space-x-2">
            <img
              src={`http://localhost:5000/${userProfile.photoProfil}`}
              alt={userProfile.nomUtilisateur}
              className="w-8 h-8 rounded-full object-cover"
            />
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Ajouter un commentaire..."
              className={`flex-1 p-2 rounded-full ${
                isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            <button
              onClick={handleSubmitComment}
              className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
            </button>
          </div>
        )}
        <button
          onClick={closeModal}
          className={`mt-4 px-4 py-2 rounded ${
            isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'
          } hover:bg-opacity-80 transition-colors`}
        >
          Fermer
        </button>
      </motion.div>
    </motion.div>
  );
};

const PostSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden animate-pulse">
          <div className="p-4">
            <div className="flex items-center space-x-3">
              <div className="rounded-full bg-gray-300 dark:bg-gray-600 h-10 w-10"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mt-2"></div>
              </div>
            </div>
          </div>
          <div className="bg-gray-300 dark:bg-gray-600 h-64 w-full"></div>
          <div className="p-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mt-2"></div>
            <div className="flex justify-between items-center mt-4">
              <div className="flex space-x-2">
                <div className="rounded-full bg-gray-300 dark:bg-gray-600 h-8 w-8"></div>
                <div className="rounded-full bg-gray-300 dark:bg-gray-600 h-8 w-8"></div>
              </div>
              <div className="rounded-full bg-gray-300 dark:bg-gray-600 h-8 w-8"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <div className="flex items-center justify-center h-screen">
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md" role="alert">
      <p className="font-bold">Erreur</p>
      <p>{message}</p>
    </div>
  </div>
);

export default ProfilePosts;