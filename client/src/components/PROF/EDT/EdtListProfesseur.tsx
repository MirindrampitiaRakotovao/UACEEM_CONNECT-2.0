import { ChevronLeft, ChevronRight, Clock, MapPin, Calendar, List, Grid, Moon, Sun } from 'lucide-react';
import React, { useState } from 'react';

import { useTheme } from '../../../context/ThemeContext';


const EdtListProfesseur = () => {
  const [viewMode, setViewMode] = useState('grid');
  const { isDarkMode, toggleDarkMode } = useTheme();
  const timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
  
  const courses = [
    {
      day: 'Lundi',
      startTime: '08:00',
      endTime: '10:00',
      course: 'Mathématiques',
      room: 'A101',
      color: 'bg-yellow-100/80 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800'
    },
    {
      day: 'Lundi',
      startTime: '14:00',
      endTime: '16:00',
      course: 'Physique',
      room: 'B203',
      color: 'bg-gray-100/80 dark:bg-gray-800/30 border-gray-200 dark:border-gray-700'
    },
    {
      day: 'Mardi',
      startTime: '10:00',
      endTime: '12:00',
      course: 'Chimie',
      room: 'C305',
      color: 'bg-yellow-50/80 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
    },
  ];
  return (
    <div className={`min-h-screen ${
      isDarkMode 
        ? 'bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100' 
        : 'bg-gradient-to-b from-white to-gray-100 text-gray-800'
    }`}>
      <div className="max-w-[1600px] mx-auto p-2 sm:p-4">
        {/* Header */}
        <div className={`${
          isDarkMode ? 'bg-gray-800/50' : 'bg-white'
        } rounded-lg shadow-sm p-4 mb-4`}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className={`w-5 h-5 ${isDarkMode ? 'text-yellow-500' : 'text-yellow-600'}`} />
              <h1 className="text-lg font-semibold">Emploi du temps - Prof. Dupont</h1>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button 
                onClick={() => setViewMode('grid')} 
                className={`p-1 rounded transition-colors ${
                  viewMode === 'grid' 
                    ? (isDarkMode ? 'bg-gray-700' : 'bg-gray-200') 
                    : ''
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode('list')} 
                className={`p-1 rounded transition-colors ${
                  viewMode === 'list' 
                    ? (isDarkMode ? 'bg-gray-700' : 'bg-gray-200') 
                    : ''
                }`}
              >
                <List className="w-4 h-4" />
              </button>
              <div className={`flex items-center ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
              } rounded px-2 py-1 flex-1 sm:flex-initial`}>
                <ChevronLeft className="w-4 h-4 cursor-pointer" />
                <span className="text-xs font-medium px-2">Semaine du 1 au 7 Mai</span>
                <ChevronRight className="w-4 h-4 cursor-pointer" />
              </div>
              <button 
                onClick={toggleDarkMode} 
                className={`p-1 rounded transition-colors ${
                  isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                }`}
              >
                {isDarkMode ? (
                  <Sun size={18} className="text-gray-300" />
                ) : (
                  <Moon size={18} className="text-gray-600" />
                )}
              </button>
            </div>
          </div>
        </div>
        {viewMode === 'grid' ? (
          // Vue Grille
          <div className={`${
            isDarkMode ? 'bg-gray-800/50' : 'bg-white'
          } rounded-lg shadow-sm overflow-x-auto`}>
            <table className="w-full min-w-[1000px]">
              <thead>
                <tr>
                  <th className={`p-2 ${
                    isDarkMode ? 'border-gray-700' : 'border-gray-200'
                  } border-b`}></th>
                  {days.map((day) => (
                    <th key={day} className={`p-2 ${
                      isDarkMode ? 'border-gray-700 text-gray-300' : 'border-gray-200 text-gray-600'
                    } border-b text-xs font-medium`}>{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((time) => (
                  <tr key={time}>
                    <td className={`p-2 ${
                      isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'
                    } border-r text-xs`}>{time}</td>
                    {days.map((day) => {
                      const course = courses.find(c => c.day === day && c.startTime === time);
                      return (
                        <td key={`${day}-${time}`} className={`p-1 ${
                          isDarkMode ? 'border-gray-700' : 'border-gray-200'
                        } border relative h-16`}>
                          {course && (
                            <div className={`absolute inset-0 m-1 ${course.color} rounded p-1 text-xs`}>
                              <div className="font-medium">{course.course}</div>
                              <div className="flex items-center mt-1">
                                <MapPin className="w-3 h-3 mr-1" /> {course.room}
                              </div>
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          // Vue Liste
          <div className={`${
            isDarkMode ? 'bg-gray-800/50' : 'bg-white'
          } rounded-lg shadow-sm p-4`}>
            {days.map((day) => {
              const dayCourses = courses.filter(c => c.day === day);
              return (
                <div key={day} className="mb-4 last:mb-0">
                  <h3 className="text-sm font-medium mb-2">{day}</h3>
                  {dayCourses.map((course, idx) => (
                    <div key={idx} className={`${course.color} rounded p-2 mb-2 text-xs`}>
                      <div className="flex justify-between items-start">
                        <span className="font-medium">{course.course}</span>
                        <span className={`${
                          isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        } flex items-center`}>
                          <Clock className="w-3 h-3 mr-1" />
                          {`${course.startTime} - ${course.endTime}`}
                        </span>
                      </div>
                      <div className={`${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      } mt-1 flex items-center`}>
                        <MapPin className="w-3 h-3 mr-1" /> {course.room}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default EdtListProfesseur;