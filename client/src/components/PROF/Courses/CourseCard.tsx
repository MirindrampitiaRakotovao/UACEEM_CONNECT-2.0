import { Star, Clock, Users, Edit, Eye, Bookmark } from 'lucide-react';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

import { useTheme } from '../../../context/ThemeContext'; // Importer le hook


// Importer le hook


// Importer le hook

interface Course {
  title: string;
  enrolled: number;
  rating: number;
  duration: number;
  revenue: number;
  preview: string;
  isPublished: boolean;
}

interface CourseCardProps {
  course: Course;
  viewMode: 'grid' | 'list';
}

const CourseCard: React.FC<CourseCardProps> = ({ course, viewMode }) => {
  const { isDarkMode, toggleDarkMode } = useTheme(); // Utiliser le hook Theme
  const [isPublished, setIsPublished] = useState(course.isPublished);

  const Stat = ({ icon, value, label }: { icon: React.ReactNode, value: string | number, label: string }) => (
    <div className="flex items-center gap-1">
      {React.cloneElement(icon, { size: 12 })}
      <span className="text-xs font-medium whitespace-nowrap">{value} {label}</span>
    </div>
  );

  const ActionButton = ({ icon, label, onClick, primary = false }: { icon: React.ReactNode, label: string, onClick: () => void, primary?: boolean }) => (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium
        ${primary 
          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90'
          : `${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} hover:opacity-80`
        }
      `}
    >
      {React.cloneElement(icon, { size: 12 })}
      <span className="hidden sm:inline">{label}</span>
    </motion.button>
  );

  const CardContent = () => (
    <div className="space-y-2">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-sm font-bold mb-1 truncate">{course.title}</h3>
          <div className="flex flex-wrap gap-2">
            <Stat 
              icon={<Users className="text-blue-500" />} 
              value={course.enrolled}
              label="étudiants"
            />
            <Stat 
              icon={<Star className="text-yellow-500" />} 
              value={course.rating.toFixed(1)}
              label="/ 5"
            />
            <Stat 
              icon={<Clock className="text-green-500" />} 
              value={course.duration}
              label="h"
            />
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <span className={`
            px-2 py-0.5 text-[10px] font-semibold rounded-full
            ${isPublished 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
            }
          `}>
            {isPublished ? 'Publié' : 'Brouillon'}
          </span>
          <span className="text-sm font-bold text-green-600">{course.revenue}€</span>
        </div>
      </div>
      
      <div className="flex gap-2">
        <ActionButton 
          icon={<Edit />} 
          label="Modifier" 
        />
        <ActionButton
          icon={isPublished ? <Eye /> : <Bookmark />}
          label={isPublished ? "Dépublier" : "Publier"}
          onClick={() => setIsPublished(!isPublished)}
          primary
        />
      </div>
    </div>
  );

  const cardClass = `
    ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}
    rounded-xl overflow-hidden border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}
    hover:shadow-lg transition-all duration-300
  `;

  if (viewMode === 'grid') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`${cardClass} w-full sm:max-w-[300px]`}
      >
        <div className="relative h-32 sm:h-36">
          <img 
            src={course.preview} 
            alt={course.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-2 left-2 right-2 text-white">
            <h3 className="text-sm font-bold truncate">{course.title}</h3>
          </div>
        </div>
        <div className="p-3">
          <CardContent />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className={`${cardClass} flex flex-col sm:flex-row`}
    >
      <div className="w-full sm:w-56 h-32 sm:h-auto relative">
        <img 
          src={course.preview} 
          alt={course.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
      </div>
      <div className="flex-1 p-3 sm:p-4">
        <CardContent />
      </div>
    </motion.div>
  );
};

export default CourseCard;
