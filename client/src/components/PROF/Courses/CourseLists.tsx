import { Download, GraduationCap, Calendar, MoreVertical, Trash2 } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import apiService from '../../../services/api';
import CourseModal from './CourseModal';
import Header from './Header';


const CourseLists = ({ isDarkMode }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [courses, setCourses] = useState([]);
    const [activeSubject, setActiveSubject] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const fetchCourses = async () => {
        try {
            setIsLoading(true);
            const response = await apiService.get('/mes-cours');
            setCourses(response.data);
        } catch (err) {
            setError(err.message);
            console.error('Erreur lors de la récupération des cours:', err);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchCourses();
    }, []);
    const handleDeleteCourse = async (courseId) => {
        try {
            const response = await apiService.delete(`/cours/${courseId}`);

            // Vérification plus robuste de la réponse
            const responseData = response.data || response;

            // Vérifier si la suppression est un succès
            if (responseData.success || response.status === 200) {
                // Mettre à jour la liste des cours après suppression
                setCourses(prevCourses =>
                    prevCourses.filter(course => course.id !== courseId)
                );

                // Afficher un toast de succès
                toast.success('Cours supprimé avec succès', {
                    position: "top-right",
                    autoClose: 3000,
                });
            } else {
                // Gérer les cas où la suppression n'a pas réussi
                toast.error(responseData.message || 'Impossible de supprimer le cours', {
                    position: "top-right",
                    autoClose: 3000,
                });
            }
        } catch (error) {
            // Gestion des erreurs plus détaillée
            console.error('Erreur lors de la suppression du cours:', error);

            // Vérifier si l'erreur a une réponse spécifique
            if (error.response) {
                // Erreur avec réponse du serveur
                toast.error(error.response.data.message || 'Erreur lors de la suppression du cours', {
                    position: "top-right",
                    autoClose: 3000,
                });
            } else if (error.request) {
                // Requête envoyée mais pas de réponse
                toast.error('Aucune réponse reçue du serveur', {
                    position: "top-right",
                    autoClose: 3000,
                });
            } else {
                // Erreur de configuration de la requête
                toast.error('Erreur de configuration de la requête', {
                    position: "top-right",
                    autoClose: 3000,
                });
            }
        }
    };
    const filteredCourses = courses.filter(course => {
        const matchesSubject = activeSubject === 'all' || course.enseignement.nomMatiere === activeSubject;
        const matchesSearch =
            course.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.enseignement.nomMatiere.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.contenu.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSubject && matchesSearch;
    });
    const toggleDropdown = (courseId) => {
        setOpenDropdownId(openDropdownId === courseId ? null : courseId);
    };
    return (
        <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            <div className="container mx-auto px-4 py-6">
                <Header setIsModalOpen={setIsModalOpen} isDarkMode={isDarkMode} />

                {/* Barre de recherche minimaliste */}
                <div className="relative mb-6">
                    <input
                        type="text"
                        placeholder="Rechercher des cours..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className={`w-full px-4 py-2 text-sm rounded-lg border focus:outline-none focus:ring-1 transition-all duration-300
                            ${isDarkMode
                                ? 'bg-gray-800 border-gray-700 focus:border-blue-500 focus:ring-blue-500/50'
                                : 'bg-white border-gray-200 focus:border-blue-400 focus:ring-blue-400/50'
                            }`}
                    />
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded">
                        <p className="text-sm font-medium">Erreur</p>
                        <p className="text-xs">{error}</p>
                    </div>
                ) : filteredCourses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredCourses.map(course => (
                            <div
                                key={course.id}
                                className={`rounded-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md relative
                                    ${isDarkMode
                                        ? 'bg-gray-800 border border-gray-700'
                                        : 'bg-white border border-gray-200'
                                    }`}
                            >
                                {/* Bouton trois points */}
                                <div className="absolute top-2 right-2">
                                    <button
                                        onClick={() => toggleDropdown(course.id)}
                                        className="hover:bg-gray-100 rounded-full p-1"
                                    >
                                        <MoreVertical className="w-4 h-4 text-gray-500" />
                                    </button>

                                    {/* Dropdown */}
                                    {openDropdownId === course.id && (
                                        <div className={`absolute right-0 top-full mt-1 w-40 rounded-md shadow-lg z-10 
                                            ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
                                            <div
                                                className={`py-1 rounded-md shadow-xs ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}
                                            >
                                                <button
                                                    onClick={() => {
                                                        handleDeleteCourse(course.id);
                                                        setOpenDropdownId(null);
                                                    }}
                                                    className={`flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100 
                                                        ${isDarkMode ? 'text-white hover:bg-gray-600' : 'text-gray-700'}`}
                                                >
                                                    <Trash2 className="w-4 h-4 mr-2 text-red-500" />
                                                    Supprimer
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {/* En-tête de la carte */}
                                <div className="bg-gray-100 p-4">
                                    <h3 className="text-sm font-semibold text-gray-800 truncate">{course.titre}</h3>
                                    <p className="text-xs text-gray-500 truncate">{course.enseignement.nomMatiere}</p>
                                </div>

                                {/* Contenu de la carte */}
                                <div className="p-4">
                                    <p className="text-xs mb-3 text-gray-600 line-clamp-2">{course.contenu}</p>

                                    {/* Informations du cours */}
                                    <div className="flex justify-between text-xs text-gray-500 mb-3">
                                        <div className="flex items-center">
                                            <GraduationCap className="w-3 h-3 mr-1 text-blue-400" />
                                            <span>Niv. {course.enseignement.niveau}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Calendar className="w-3 h-3 mr-1 text-blue-400" />
                                            <span>Sem. {course.enseignement.semestre}</span>
                                        </div>
                                    </div>

                                    {/* Section des fichiers */}
                                    {course.fichiers && course.fichiers.length > 0 && (
                                        <div className="border-t pt-3 mt-3">
                                            <h4 className="text-xs font-semibold mb-2">Documents</h4>
                                            <div className="flex flex-col">
                                                {course.fichiers.map((file, index) => (
                                                    <a
                                                        key={index}
                                                        href={file.url}
                                                        className="text-blue-500 text-xs underline hover:text-blue-700"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <Download className="inline w-4 h-4 mr-1" />
                                                        {file.nom}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500">
                        <p>Aucun cours trouvé.</p>
                    </div>
                )}
            </div>
            {isModalOpen && (
                <CourseModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={() => { }}
                    refreshCourses={fetchCourses}
                />
            )}
        </div>
    );
};
export default CourseLists;