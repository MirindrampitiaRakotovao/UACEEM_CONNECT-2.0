import { useState, useEffect } from 'react';

import ModalAjoutForum from '../PROF/Forums/ModalAjoutForum'; // Importer votre composant
import ForumSkeleton from './ForumSkeleton';
import ForumHeader from './ForumHeader';
import ForumPost from './ForumPost';


// Importer votre composant

// Simuler les données de forum
const fakeData = [
    {
        id: 1,
        author: "Alice Smith",
        avatar: "https://randomuser.me/api/portraits/women/72.jpg",
        date: "15/05/2023",
        content: "Quelqu'un a-t-il expérimenté les nouveaux composants serveur React ? Je suis curieux des gains de performance réels.",
        category: "React",
        likes: 42,
        shares: 12,
        tags: ["react", "composantsserveur", "performance"],
        replies: [
            {
                id: 101,
                author: "Bob Johnson",
                avatar: "https://randomuser.me/api/portraits/men/32.jpg",
                date: "15/05/2023",
                content: "Oui ! L'amélioration du temps de chargement initial est notable. Cependant, il y a une courbe d'apprentissage pour déterminer quels composants rendre côté serveur vs client.",
                likes: 15
            },
            {
                id: 102,
                author: "Emma Wilson",
                avatar: "https://randomuser.me/api/portraits/women/26.jpg",
                date: "16/05/2023",
                content: "J'ai constaté des améliorations significatives dans le TTI (Temps jusqu'à l'interactivité) de notre application. C'est particulièrement bénéfique pour les pages riches en données.",
                likes: 8
            }
        ],
        audioUrl: "chemin/vers/audio1.mp3"
    },
    {
        id: 2,
        author: "Charlie Brown",
        avatar: "https://randomuser.me/api/portraits/men/75.jpg",
        date: "14/05/2023",
        content: "Que pensez-vous de la récente vague d'outils de développement basés sur l'IA ? Améliorent-ils vraiment la productivité ou créent-ils une fausse sensation d'efficacité ?",
        category: "IA",
        likes: 38,
        shares: 9,
        tags: ["IA", "productivité", "développement"],
        replies: [
            {
                id: 201,
                author: "Diana Prince",
                avatar: "https://randomuser.me/api/portraits/women/57.jpg",
                date: "14/05/2023",
                content: "Ils sont fantastiques pour le code répétitif et le prototypage rapide, mais j'ai constaté qu'ils ont parfois du mal avec la logique complexe spécifique au domaine.",
                likes: 22
            },
            {
                id: 202,
                author: "Frank Castle",
                avatar: "https://randomuser.me/api/portraits/men/41.jpg",
                date: "15/05/2023",
                content: "Je suis préoccupé par la dépendance excessive. Bien qu'ils soient d'excellents outils, comprendre les principes sous-jacents reste crucial pour la résolution de problèmes et l'optimisation.",
                likes: 17
            }
        ]
    }
    // Autres posts
];

const Forums = () => {
    const [posts, setPosts] = useState<ForumPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [expandedPost, setExpandedPost] = useState<number | null>(null);
    const [activeAudio, setActiveAudio] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);  // Gérer l'état du modal
    const handleSaveForum = (forum: { title: string; description: string }) => {
        // Ici, vous pouvez ajouter la logique pour sauvegarder le nouveau forum
        console.log('Nouveau forum:', forum);
        setIsModalOpen(false);
    };

    useEffect(() => {
        // Simuler un appel API
        setTimeout(() => {
            setPosts(fakeData);
            setIsLoading(false);
        }, 2000);
    }, []);

    return (
        <div className={`p-4 ${isDarkMode ? 'bg-[#121212]' : 'bg-[#f8f9fa]'} min-h-screen`}>
            {/* Header du forum */}
            <ForumHeader setIsModalOpen={setIsModalOpen} isDarkMode={isDarkMode} />

            {/* Liste des posts ou squelette de chargement */}
            {isLoading ? (
                <div className="space-y-4">
                    <ForumSkeleton />
                    <ForumSkeleton />
                    <ForumSkeleton />
                </div>
            ) : (
                <div className="space-y-4">
                    {posts.map(post => (
                        <ForumPost
                            key={post.id}
                            post={post}
                            isDarkMode={isDarkMode}
                            activeAudio={activeAudio}
                            expandedPost={expandedPost}
                            setActiveAudio={setActiveAudio}
                            setExpandedPost={setExpandedPost}
                        />
                    ))}
                </div>
            )}

            {/* Utilisation de votre composant ModalAjoutForum */}
            {isModalOpen && (
                <ModalAjoutForum
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveForum}
                    isDarkMode={isDarkMode}
                />
            )}
        </div>
    );
};

export default Forums;
