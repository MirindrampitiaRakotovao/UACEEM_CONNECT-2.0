import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, MessageSquare, AlertTriangle } from 'lucide-react';
import axios from 'axios';
import Cookies from "js-cookie";

const PostUserProfileNext = () => {
    const { id } = useParams(); // Récupère l'ID de l'utilisateur depuis l'URL
    const [posts, setPosts] = useState([]);
    const [reactionsCount, setReactionsCount] = useState({});
    const [userReactions, setUserReactions] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            const token = Cookies.get('token');
            if (token) {
                try {
                    const response = await axios.get(`http://localhost:5000/api/user/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    const sortedPosts = response.data.sort(
                        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                    );
                    setPosts(sortedPosts);

                    await Promise.all(
                        sortedPosts.map(async (post) => {
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

        fetchPosts();
    }, [id]);

    if (loading) {
        return <div className="text-center mt-5">Chargement des publications...</div>;
    }

    if (error) {
        return <div className="text-center mt-5">{error}</div>;
    }

    if (posts.length === 0) {
        return <div className="text-center mt-5">Aucune publication disponible</div>;
    }

    return (
        <div className="max-w-2xl mx-auto mt-5 space-y-6">
            {posts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow-lg p-4">
                    {/* Header de la publication */}
                    <div className="flex items-center mb-2">
                        <img
                            src={`http://localhost:5000/${post.auteur.photoProfil?.replace(/\\/g, '/')}`}
                            alt={post.auteur.nomUtilisateur}
                            className="h-10 w-10 rounded-full object-cover mr-3"
                        />
                        <div>
                            <h2 className="font-semibold text-gray-800">{post.auteur.nomUtilisateur}</h2>
                            <p className="text-gray-500 text-sm">{new Date(post.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>

                    {/* Contenu de la publication */}
                    <p className="text-gray-700 mb-3">{post.text}</p>
                    {post.image && (
                        <img
                            src={`http://localhost:5000/${post.image?.replace(/\\/g, '/')}`}
                            alt="Publication"
                            className="w-full h-auto rounded-lg mb-3"
                        />
                    )}

                    {/* Actions de la publication */}
                    <div className="flex items-center justify-around text-gray-500 text-sm mt-2 border-t pt-2">
                        <div className="flex items-center space-x-1 cursor-pointer">
                            <Heart className="w-5 h-5" />
                            <span>{reactionsCount[post.id] || 0}</span>
                        </div>
                        <div className="flex items-center space-x-1 cursor-pointer">
                            <MessageSquare className="w-5 h-5" />
                            <span>Commenter</span>
                        </div>
                        <div className="flex items-center space-x-1 cursor-pointer">
                            <AlertTriangle className="w-5 h-5" />
                            <span>Signaler</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PostUserProfileNext;
