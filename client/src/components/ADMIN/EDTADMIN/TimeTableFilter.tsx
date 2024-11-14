import { Filter } from 'lucide-react';
import React from 'react';

import { EmploiDuTemps } from '../../../../src/types/emploi-du-temps';


interface TimeTableFiltersProps {
  selectedMention: string;
  selectedNiveau: string;
  setSelectedMention: (mention: string) => void;
  setSelectedNiveau: (niveau: string) => void;
  filteredEmploisTemps: EmploiDuTemps[];
  getMentions: () => string[];
  getNiveaux: (mention: string) => string[];
  resetFilters: () => void;
}

export const TimeTableFilters: React.FC<TimeTableFiltersProps> = ({
  selectedMention,
  selectedNiveau,
  setSelectedMention,
  setSelectedNiveau,
  filteredEmploisTemps,
  getMentions,
  getNiveaux,
  resetFilters,
}) => {
  return (
    <div className="max-w-[1920px] mx-auto mb-2 p-2">
      <div className="bg-white rounded-lg shadow-sm p-3">
        <div className="flex flex-col md:flex-row justify-between items-center mb-2">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <select
                value={selectedMention}
                onChange={(e) => {
                  setSelectedMention(e.target.value);
                  setSelectedNiveau('');
                }}
                className="block appearance-none w-full md:w-36 px-2 py-1 text-[11px] border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300"
              >
                <option value="">Toutes les mentions</option>
                {getMentions().map((mention) => (
                  <option key={mention} value={mention}>
                    {mention}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-1">
                <svg
                  className="w-3 h-3 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 9l6 6 6-6"
                  />
                </svg>
              </div>
            </div>
            {selectedMention && (
              <div className="relative">
                <select
                  value={selectedNiveau}
                  onChange={(e) => setSelectedNiveau(e.target.value)}
                  className="block appearance-none w-full md:w-36 px-2 py-1 text-[11px] border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300"
                >
                  <option value="">Tous les niveaux</option>
                  {getNiveaux(selectedMention).map((niveau) => (
                    <option key={niveau} value={niveau}>
                      {niveau}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-1">
                  <svg
                    className="w-3 h-3 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 9l6 6 6-6"
                    />
                  </svg>
                </div>
              </div>
            )}
            {(selectedMention || selectedNiveau) && (
              <button
                onClick={resetFilters}
                className="flex items-center text-[10px] text-gray-500 hover:text-gray-700 transition duration-150"
              >
                <Filter className="w-3 h-3 mr-0.5" />
                Réinitialiser
              </button>
            )}
          </div>
        </div>
        <div className="text-[10px] text-gray-400">
          {filteredEmploisTemps.length} cours
          {selectedMention && ` en ${selectedMention}`}
          {selectedNiveau && ` (${selectedNiveau})`}
        </div>
      </div>
    </div>
  );
};