import { Search, LayoutGrid, List, SlidersHorizontal, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';


const SearchAndFilters = ({ searchQuery, setSearchQuery, isListView, setIsListView, isDarkMode }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      {/* Search Bar */}
      <div className="relative flex-grow">
        <motion.div
          initial={false}
          animate={isSearchFocused ? { scale: 1.05 } : { scale: 1 }}
          className={`
            relative rounded-md overflow-hidden shadow-md
            ${isDarkMode 
              ? 'bg-[#2A3A53]/40 backdrop-blur-md border border-white/20' 
              : 'bg-white/80 backdrop-blur-md border border-gray-300'}
          `}
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            placeholder="Rechercher..."
            className={`
              w-full pl-10 pr-10 py-2.5 text-sm
              placeholder:text-gray-500
              transition-all duration-300
              focus:outline-none
              ${isDarkMode 
                ? 'bg-transparent text-[#F3F5FA]' 
                : 'bg-transparent text-[#333333]'
              }
            `}
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <Search 
              size={16} 
              className={isDarkMode ? 'text-gray-300' : 'text-gray-500'}
            />
          </div>
          <AnimatePresence>
            {searchQuery && (
              <motion.button
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X 
                  size={16} 
                  className={`
                    ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-700'}
                    transition-colors duration-200
                  `}
                />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* View Toggle and Filters */}
      <div className="flex gap-2">
        <motion.div
          className={`
            flex items-center rounded-md overflow-hidden shadow-md
            ${isDarkMode 
              ? 'bg-[#2A3A53]/40 backdrop-blur-md border border-white/20' 
              : 'bg-white/80 backdrop-blur-md border border-gray-300'}
          `}
        >
          <button
            onClick={() => setIsListView(false)}
            className={`
              p-2 transition-colors duration-200
              ${!isListView 
                ? 'bg-[#FFAA00] text-black' 
                : isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'
              }
            `}
          >
            <LayoutGrid size={18} />
          </button>
          <button
            onClick={() => setIsListView(true)}
            className={`
              p-2 transition-colors duration-200
              ${isListView 
                ? 'bg-[#FFAA00] text-black' 
                : isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'
              }
            `}
          >
            <List size={18} />
          </button>
        </motion.div>

        <motion.button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className={`
            p-2 rounded-md shadow-md transition-colors duration-200
            ${isDarkMode 
              ? 'bg-[#2A3A53]/40 backdrop-blur-md border border-white/20 text-gray-400 hover:text-white' 
              : 'bg-white/80 backdrop-blur-md border border-gray-300 text-gray-500 hover:text-gray-700'}
          `}
        >
          <SlidersHorizontal size={18} />
        </motion.button>
      </div>
    </div>
  );
};

export default SearchAndFilters;
