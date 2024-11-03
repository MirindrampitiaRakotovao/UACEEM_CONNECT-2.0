import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import {
    Archive,
    MessageCircle,
    ThumbsUp,
    Users,
    Clock,
    Tag,
    Calendar,
    ArchiveRestore,
    HelpCircle,
    Calendar as EventIcon,
    MessagesSquare,
    FileQuestion
} from 'lucide-react';

const ArchiveList = () => {
    const { isDarkMode } = useTheme();
    const [loading, setLoading] = useState(true);
    const [archives, setArchives] = useState([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
            setArchives([
                {
                    id: 1,
                    type: 'publication',
                    title: "L'évolution du développement web en 2023",
                    author: "Alex Dubois",
                    date: "2023-12-15",
                    archiveDate: "2024-01-20",
                    likes: 234,
                    comments: 45,
                    preview: "Une rétrospective détaillée des avancées majeures en développement web...",
                    tags: ["Web Development", "Retrospective", "2023"],
                    reason: "Contenu obsolète"
                },
                {
                    id: 2,
                    type: 'forum-discussion',
                    title: "Discussion: Framework Frontend 2023",
                    author: "Sophie Martin",
                    date: "2023-11-30",
                    archiveDate: "2024-01-19",
                    participants: 89,
                    replies: 156,
                    lastActivity: "il y a 2 mois",
                    category: "Développement Frontend",
                    reason: "Sujet résolu"
                },
                {
                    id: 3,
                    type: 'forum-question',
                    title: "Question: Optimisation React.js",
                    author: "Marc Dupont",
                    date: "2023-10-25",
                    archiveDate: "2024-01-18",
                    participants: 45,
                    replies: 67,
                    lastActivity: "il y a 3 mois",
                    category: "React.js",
                    reason: "Question résolue"
                },
                {
                    id: 4,
                    type: 'forum-event',
                    title: "Événement: Meetup Développeurs Paris",
                    author: "Julie Martin",
                    date: "2023-09-15",
                    archiveDate: "2024-01-17",
                    participants: 120,
                    replies: 45,
                    lastActivity: "il y a 4 mois",
                    category: "Événements",
                    reason: "Événement passé"
                },
                // Ajoutez plus d'archives si nécessaire
            ]);
        }, 2000);
    }, []);

    const Skeleton = () => (
        <>
            {[1, 2, 3, 4].map((item) => (
                <div key={item} className={`animate-pulse rounded-lg shadow-sm p-4 
                    ${isDarkMode ? 'bg-[#2A3A53]/60' : 'bg-white'}`}>
                    <div className="h-3 bg-gray-200 rounded w-1/4 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="space-y-2">
                        <div className="h-2 bg-gray-200 rounded w-full"></div>
                        <div className="h-2 bg-gray-200 rounded w-5/6"></div>
                    </div>
                    <div className="mt-3 flex gap-2">
                        <div className="h-4 w-16 bg-gray-200 rounded"></div>
                        <div className="h-4 w-16 bg-gray-200 rounded"></div>
                    </div>
                </div>
            ))}
        </>
    );

    const FilterBar = () => (
        <div className={`flex flex-wrap gap-2 mb-6 p-2 rounded-lg text-xs
            ${isDarkMode ? 'bg-[#2A3A53]/30' : 'bg-white'}`}>
            {[
                { id: 'all', label: 'Tout', icon: Archive },
                { id: 'publication', label: 'Publications', icon: Tag },
                { id: 'forum-discussion', label: 'Discussions', icon: MessagesSquare },
                { id: 'forum-question', label: 'Questions', icon: FileQuestion },
                { id: 'forum-event', label: 'Événements', icon: EventIcon }
            ].map((filterType) => (
                <button
                    key={filterType.id}
                    onClick={() => setFilter(filterType.id)}
                    className={`px-3 py-1.5 rounded-md transition-all duration-200 flex items-center gap-1.5
                        ${filter === filterType.id ?
                            'bg-[#FFAA00] text-black font-medium shadow-sm' :
                            `${isDarkMode ? 'text-gray-300 hover:bg-white/10' : 'text-gray-600 hover:bg-gray-100'}`
                        }`}
                >
                    <filterType.icon className="w-3 h-3" />
                    {filterType.label}
                </button>
            ))}
        </div>
    );

    const ArchiveCard = ({ item }) => {
        const getTypeConfig = () => {
            switch (item.type) {
                case 'publication':
                    return {
                        color: 'bg-blue-100 text-blue-600',
                        label: 'Publication',
                        icon: Tag
                    };
                case 'forum-discussion':
                    return {
                        color: 'bg-purple-100 text-purple-600',
                        label: 'Discussion',
                        icon: MessagesSquare
                    };
                case 'forum-question':
                    return {
                        color: 'bg-green-100 text-green-600',
                        label: 'Question',
                        icon: HelpCircle
                    };
                case 'forum-event':
                    return {
                        color: 'bg-orange-100 text-orange-600',
                        label: 'Événement',
                        icon: EventIcon
                    };
                default:
                    return {
                        color: 'bg-gray-100 text-gray-600',
                        label: 'Autre',
                        icon: Archive
                    };
            }
        };

        const typeConfig = getTypeConfig();
        const isPublication = item.type === 'publication';

        return (
            <div className={`rounded-lg shadow-sm p-4 group hover:shadow-md transition-all duration-200 
                ${isDarkMode ? 'bg-[#2A3A53]/60' : 'bg-white'}`}>

                {/* En-tête avec type et date d'archivage */}
                <div className="flex justify-between items-start mb-3 text-xs">
                    <span className={`px-2 py-0.5 rounded-full font-medium flex items-center gap-1
                        ${typeConfig.color}`}>
                        <typeConfig.icon className="w-3 h-3" />
                        {typeConfig.label}
                    </span>
                    <div className="flex items-center gap-1 text-gray-500">
                        <Calendar className="w-3 h-3" />
                        {new Date(item.archiveDate).toLocaleDateString()}
                    </div>
                </div>

                {/* Titre et prévisualisation */}
                <div className="mb-3">
                    <h3 className={`text-sm font-semibold mb-1 group-hover:text-[#FFAA00] transition-colors
                        ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        {item.title}
                    </h3>
                    {isPublication && (
                        <p className={`text-xs line-clamp-2 
                            ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {item.preview}
                        </p>
                    )}
                </div>

                {/* Tags ou catégorie */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                    {isPublication ? (
                        item.tags.map((tag, index) => (
                            <span key={index} className={`px-1.5 py-0.5 rounded-full text-[10px] flex items-center gap-1
                                ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                                <Tag className="w-2 h-2" />
                                {tag}
                            </span>
                        ))
                    ) : (
                        <span className={`px-1.5 py-0.5 rounded-full text-[10px] flex items-center gap-1
                            ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                            <Tag className="w-2 h-2" />
                            {item.category}
                        </span>
                    )}
                </div>

                {/* Informations supplémentaires */}
                <div className={`flex justify-between items-center text-xs
                    ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                    <div className="flex items-center gap-2">
                        <span>{item.author}</span>
                        <span>•</span>
                        <span>{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        {isPublication ? (
                            <>
                                <span className="flex items-center gap-1">
                                    <ThumbsUp className="w-3 h-3" />
                                    {item.likes}
                                </span>
                                <span className="flex items-center gap-1">
                                    <MessageCircle className="w-3 h-3" />
                                    {item.comments}
                                </span>
                            </>
                        ) : (
                            <>
                                <span className="flex items-center gap-1">
                                    <Users className="w-3 h-3" />
                                    {item.participants}
                                </span>
                                <span className="flex items-center gap-1">
                                    <MessageCircle className="w-3 h-3" />
                                    {item.replies}
                                </span>
                            </>
                        )}
                    </div>
                </div>

                {/* Footer avec raison et bouton */}
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <span className={`text-[10px] ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Raison : {item.reason}
                    </span>
                    <button className="flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium
                        bg-[#FFAA00] text-black hover:bg-[#FFAA00]/90 transition-colors">
                        <ArchiveRestore className="w-3 h-3" />
                        Restaurer
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className = "mx-auto px-4 py-6">
    {/* En-tête avec titre et statistiques */ }
    <div className="mb-6">
        <h1 className={`text-xl font-bold mb-4 
                    ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Archives
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {[
                {
                    label: 'Total',
                    value: archives.length,
                    icon: Archive,
                    color: 'text-gray-600'
                },
                {
                    label: 'Publications',
                    value: archives.filter(a => a.type === 'publication').length,
                    icon: Tag,
                    color: 'text-blue-600'
                },
                {
                    label: 'Discussions',
                    value: archives.filter(a => a.type === 'forum-discussion').length,
                    icon: MessagesSquare,
                    color: 'text-purple-600'
                },
                {
                    label: 'Questions',
                    value: archives.filter(a => a.type === 'forum-question').length,
                    icon: FileQuestion,
                    color: 'text-green-600'
                },
                {
                    label: 'Événements',
                    value: archives.filter(a => a.type === 'forum-event').length,
                    icon: EventIcon,
                    color: 'text-orange-600'
                }
            ].map((stat, index) => (
                <div key={index} className={`p-3 rounded-lg shadow-sm
                            ${isDarkMode ? 'bg-[#2A3A53]/60' : 'bg-white'}`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                {stat.label}
                            </p>
                            <p className={`text-lg font-bold 
                                        ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                {stat.value}
                            </p>
                        </div>
                        <stat.icon className={`w-4 h-4 ${stat.color}`} />
                    </div>
                </div>
            ))}
        </div>
    </div>

    {/* Barre de filtres */ }
    <FilterBar />

    {/* Grille d'archives */ }
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
            <Skeleton />
        ) : archives.length > 0 ? (
            archives
                .filter(archive =>
                    filter === 'all' ? true : archive.type === filter
                )
                .map((archive) => (
                    <ArchiveCard key={archive.id} item={archive} />
                ))
        ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-8">
                <Archive className={`w-8 h-8 mb-2 
                            ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Aucune archive trouvée
                </p>
            </div>
        )}
    </div>
        </div >
    );
};

export default ArchiveList;