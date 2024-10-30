import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaPlus, FaTimes, FaChalkboardTeacher, FaBookOpen, FaDollarSign } from 'react-icons/fa';

const CourseLists = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  const courses = [
    { id: 1, title: "Introduction to Economics", instructor: "Dr. Smith", level: "Beginner", price: 99.99, rating: 4.5, enrolled: 1234, image: "https://via.placeholder.com/400x200" },
    { id: 2, title: "Advanced Business Strategy", instructor: "Prof. Johnson", level: "Advanced", price: 149.99, rating: 4.8, enrolled: 856, image: "https://via.placeholder.com/400x200" },
    { id: 3, title: "Financial Analysis", instructor: "Dr. Allen", level: "Intermediate", price: 129.99, rating: 4.7, enrolled: 2156, image: "https://via.placeholder.com/400x200" },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Courses</h1>
            <p className="text-gray-600">Découvrez notre sélection de cours premium</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <FaPlus className="text-sm" />
            Ajouter un cours
          </motion.button>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setHoveredCard(course.id)}
              onHoverEnd={() => setHoveredCard(null)}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
                <div className="absolute inset-0 flex items-center justify-center">
                  <FaBookOpen className="text-white text-5xl opacity-20" />
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full">{course.level}</span>
                  <span>•</span>
                  <span>{course.enrolled} étudiants</span>
                </div>
                
                <h2 className="text-xl font-semibold text-gray-800 mb-3">{course.title}</h2>
                
                <div className="flex items-center gap-2 mb-4">
                  <FaChalkboardTeacher className="text-gray-400" />
                  <span className="text-gray-600">{course.instructor}</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-400" />
                    <span className="font-semibold">{course.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-800">${course.price}</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-4 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                >
                  Voir le cours
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white w-full max-w-lg mx-4 rounded-2xl shadow-2xl"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-semibold text-gray-800">Ajouter un nouveau cours</h3>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsModalOpen(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <FaTimes />
                    </motion.button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">
                        Titre du cours
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                        placeholder="Entrez le titre du cours"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">
                        Instructeur
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                        placeholder="Nom de l'instructeur"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">
                        Prix
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <FaDollarSign />
                        </span>
                        <input
                          type="number"
                          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 mt-8">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsModalOpen(false)}
                      className="px-6 py-2.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors duration-300"
                    >
                      Annuler
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-2.5 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300"
                    >
                      Ajouter
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CourseLists;