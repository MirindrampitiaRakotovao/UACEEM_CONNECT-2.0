import { Calendar, Plus } from 'lucide-react';
import React from 'react';


interface PageHeaderProps {
  setIsAddModalOpen: (value: boolean) => void;
}
export const PageHeader: React.FC<PageHeaderProps> = ({ setIsAddModalOpen }) => {
  return (
    <div className="max-w-[1920px] mx-auto mb-4 px-2">
      <div className="bg-gradient-to-br from-indigo-50 to-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-2 md:mb-0">
            <div className="flex items-center space-x-2 mb-1">
              <div className="bg-indigo-100 p-2 rounded-full shadow-sm">
                <Calendar className="w-4 h-4 text-indigo-600" />
              </div>
              <h1 className="text-lg font-bold text-gray-800 tracking-tight">
                Emploi du Temps
              </h1>
            </div>
            <p className="text-xs text-gray-500 pl-8">
              Gestion des cours et planning
            </p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="group relative overflow-hidden px-3 py-1 bg-indigo-600 text-white 
              rounded-md hover:bg-indigo-700 transition-all duration-200 
              flex items-center space-x-1 transform hover:-translate-y-0.5 hover:shadow-md"
          >
            <Plus className="w-3 h-3 transition-transform group-hover:rotate-180" />
            <span className="text-xs font-medium">Nouveau cours</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
          </button>
        </div>
      </div>
    </div>
  );
};