import React, { useState, useEffect } from 'react';

import biochemistryImage from '../../../../public/assets/img/Logo ACEEM blanc.png';
// Importation des images statiques
import algebraImage from '../../../../public/assets/Ajouter User.png';
import SearchAndFilters from './SearchAndFilters';
import SkeletonCard from './SkeletonCard';
import SubjectMenu from './SubjectMenu';
import CourseModal from './CourseModal';
import CourseCard from './CourseCard';
import Header from './Header';


const SUBJECTS = [
  { 
    id: 'all', 
    name: 'Tous les sujets',
    icon: '🎓',
    color: 'bg-gradient-to-r from-purple-500 to-pink-500'
  },
  { 
    id: 'mathematics', 
    name: 'Mathématiques',
    icon: '➗',
    color: 'bg-gradient-to-r from-blue-500 to-cyan-500'
  },
  { 
    id: 'science', 
    name: 'Science',
    icon: '🧬',
    color: 'bg-gradient-to-r from-green-500 to-emerald-500'
  },
  { 
    id: 'literature', 
    name: 'Littérature',
    icon: '📚',
    color: 'bg-gradient-to-r from-yellow-500 to-orange-500'
  },
  { 
    id: 'history', 
    name: 'Histoire',
    icon: '🏛️',
    color: 'bg-gradient-to-r from-red-500 to-rose-500'
  },
  { 
    id: 'arts', 
    name: 'Arts',
    icon: '🎨',
    color: 'bg-gradient-to-r from-violet-500 to-purple-500'
  }
];

const STATIC_COURSES = [
  {
    id: 1,
    title: 'Algèbre Linéaire Avancée',
    subtitle: 'Matrices, Espaces Vectoriels et Applications',
    instructor: {
      name: 'Dr. Jean Dupont',
      title: 'Professeur de Mathématiques',
      avatar: '👨‍🏫',
      institution: 'École Polytechnique'
    },
    level: 'Avancé',
    rating: 4.8,
    enrolled: 1250,
    duration: '12 semaines',
    price: 199.99,
    tags: ['Matrices', 'Vecteurs', 'Déterminants'],
    highlights: [
      '24 chapitres détaillés',
      '100+ exercices pratiques',
      'Projets réels',
      'Certification finale'
    ],
    preview: algebraImage,  // Utilisation de l'importation d'image
    completion: 85,
    chapters: [
      { title: 'Introduction aux espaces vectoriels', duration: '2h30' },
      { title: 'Systèmes linéaires', duration: '3h15' },
      { title: 'Transformations linéaires', duration: '2h45' }
    ],
    subject: 'mathematics',
    stats: {
      videoHours: 45,
      exercises: 120,
      documents: 35,
      quizzes: 24
    }
  },
  {
    id: 2,
    title: 'Biochimie Moléculaire',
    subtitle: 'Des molécules aux processus cellulaires',
    instructor: {
      name: 'Dr. Marie Laurent',
      title: 'Chercheur en Biochimie',
      avatar: '👩‍🔬',
      institution: 'Institut Pasteur'
    },
    level: 'Expert',
    rating: 4.9,
    enrolled: 890,
    duration: '16 semaines',
    price: 299.99,
    tags: ['ADN', 'Protéines', 'Enzymes'],
    highlights: [
      'Laboratoire virtuel',
      'Études de cas réels',
      'Collaboration internationale',
      'Publication scientifique'
    ],
    preview: biochemistryImage,  // Utilisation de l'importation d'image
    completion: 92,
    chapters: [
      { title: 'Structure des protéines', duration: '4h00' },
      { title: 'Métabolisme cellulaire', duration: '3h30' },
      { title: 'Régulation génétique', duration: '3h45' }
    ],
    subject: 'science',
    stats: {
      videoHours: 64,
      exercises: 85,
      documents: 42,
      quizzes: 30
    }
  },
  // Autres cours similaires...
];

const CourseLists = ({ isDarkMode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [activeSubject, setActiveSubject] = useState('all');
  const [isListView, setIsListView] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setCourses(STATIC_COURSES);
      setIsLoading(false);
    }, 1500);
  }, []);

  const filteredCourses = courses.filter(course => {
    const matchesSubject = activeSubject === 'all' || course.subject === activeSubject;
    const matchesSearch = 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSubject && matchesSearch;
  });

  return (
    <div className={`min-h-screen transition-colors duration-300`}>
      <div className="container mx-auto px-4 py-8">
        <Header setIsModalOpen={setIsModalOpen} isDarkMode={isDarkMode} />
        
        <SubjectMenu
          SUBJECTS={SUBJECTS}
          activeSubject={activeSubject}
          setActiveSubject={setActiveSubject}
          isDarkMode={isDarkMode}
        />
        
        <SearchAndFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isListView={isListView}
          setIsListView={setIsListView}
          isDarkMode={isDarkMode}
        />
        
        <div className={`
          grid gap-8 
          ${isListView 
            ? 'grid-cols-1' 
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          }
          mt-8
        `}>
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} isDarkMode={isDarkMode} />
            ))
          ) : filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                isDarkMode={isDarkMode}
                isListView={isListView}
              />
            ))
          ) : (
            <div className={`
              col-span-full flex flex-col items-center justify-center py-12
              ${isDarkMode ? 'bg-gray-800/40' : 'bg-gray-100'}
              rounded-2xl backdrop-blur-sm border
              ${isDarkMode ? 'border-white/20' : 'border-gray-300'}
              transition-all duration-300
            `}>
              <span className="text-4xl mb-3">🔍</span> {/* Réduit la taille de l'icône */}
              <p className={`
                text-lg font-medium
                ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}  {/* Ajusté la couleur du texte */}
              `}>
                Aucun cours ne correspond à votre recherche
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveSubject('all');
                }}
                className={`
                  mt-4 px-5 py-2 rounded-lg
                  font-medium text-sm
                  transition-all duration-300
                  ${isDarkMode 
                    ? 'bg-[#FFAA00] text-gray-900 hover:bg-[#FFB52E]' 
                    : 'bg-blue-500 text-white hover:bg-blue-600'}
                  shadow-md hover:shadow-lg
                  transform hover:scale-105
                `}
              >
                Réinitialiser la recherche
              </button>
            </div>
            
          )}
        </div>
      </div>
      {isModalOpen && (
        <CourseModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
};

export default CourseLists;
