import { X, User, MapPin, Clock } from 'lucide-react';
import React, { useState, useEffect } from 'react';

import { EmploiDuTemps } from '../../../../src/types/emploi-du-temps';


interface TimeTableGridProps {
  filteredEmploisTemps: EmploiDuTemps[];
  handleDeleteEvent: (id: string) => void;
  onEventClick: (event: EmploiDuTemps) => void;
}
const weekDays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
const timeSlots = Array.from({ length: 11 }, (_, i) => i + 8);
export const TimeTableGrid: React.FC<TimeTableGridProps> = ({
  filteredEmploisTemps,
  handleDeleteEvent,
  onEventClick
}) => {
  const [debugInfo, setDebugInfo] = useState<any[]>([]);
  // Fonction utilitaire pour extraire l'heure de manière robuste
  const extractHour = (timeString: string): number | null => {
    try {
      // Gestion du format court 00:00:XX
      if (timeString.startsWith('00:00:')) {
        return parseInt(timeString.split(':')[2]);
      }
      
      // Gestion du format long HH:MM:00
      const parts = timeString.split(':');
      if (parts.length > 0) {
        return parseInt(parts[0]);
      }
      
      return null;
    } catch {
      return null;
    }
  };
  useEffect(() => {
    // Débogage des événements
    const processedEvents = filteredEmploisTemps.map(event => ({
      id: event.id,
      jour: event.jour,
      heureDebut: event.heureDebut,
      heureFin: event.heureFin,
      nomMatiere: event.nomMatiere,
      heureExtraite: extractHour(event.heureDebut)
    }));
    
    setDebugInfo(processedEvents);
    console.log('Événements traités:', processedEvents);
  }, [filteredEmploisTemps]);
  const renderEventDetails = (event: EmploiDuTemps) => {
    return (
      <div
        key={event.id}
        onClick={() => onEventClick(event)}
        className={`${event.couleur} rounded-md p-1.5 md:p-2 hover:transform hover:scale-[1.02]
          transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md`}
      >
        <div className="flex justify-between items-start mb-0.5 md:mb-1">
          <span className="font-semibold text-[8px] md:text-[10px]">
            {event.nomMatiere}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteEvent(event.id);
            }}
            className="p-0.5 hover:bg-black/10 rounded-full transition-colors"
          >
            <X className="w-2 md:w-2.5 h-2 md:h-2.5" />
          </button>
        </div>
        <div className="space-y-0.5 md:space-y-1">
          {event.professeur && (
            <div className="flex items-center">
              <User className="w-2 md:w-2.5 h-2 md:h-2.5 mr-0.5 md:mr-1 opacity-70" />
              <span className="truncate text-[7px] md:text-[9px]">
                {`${event.professeur.nom} ${event.professeur.prenom}`}
              </span>
            </div>
          )}
          <div className="flex items-center">
            <MapPin className="w-2 md:w-2.5 h-2 md:h-2.5 mr-0.5 md:mr-1 opacity-70" />
            <span className="text-[7px] md:text-[9px]">
              {event.salle}
            </span>
          </div>
          <div className="flex items-center">
            <Clock className="w-2 md:w-2.5 h-2 md:h-2.5 mr-0.5 md:mr-1 opacity-70" />
            <span className="text-[7px] md:text-[9px]">
              {`${extractHour(event.heureDebut)}h - ${extractHour(event.heureFin)}h`}
            </span>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="w-full mx-auto p-2 md:p-4 overflow-x-auto">
      <div className="min-w-[768px] bg-slate-50 rounded-xl shadow-lg overflow-hidden border border-slate-200">
        {filteredEmploisTemps.length === 0 ? (
          <div className="flex items-center justify-center h-48 text-slate-500">
            <p className="text-sm font-medium">Aucun cours planifié</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-6 bg-white border-b border-slate-200">
              <div className="py-1 md:py-2 px-2 md:px-4">
                <span className="text-[10px] md:text-xs font-semibold text-slate-700">
                  Horaires
                </span>
              </div>
              {weekDays.map(day => (
                <div key={day} className="py-1 md:py-2 px-2 md:px-4 text-center border-l border-slate-200">
                  <span className="text-[10px] md:text-xs font-semibold text-slate-700">
                    {day}
                  </span>
                </div>
              ))}
            </div>
            {timeSlots.map(hour => (
              <div key={hour} className="grid grid-cols-6">
                <div className="py-1 md:py-2 px-2 md:px-4 bg-white border-b border-slate-200">
                  <span className="text-[10px] md:text-xs text-slate-600 font-medium">
                    {`${hour}:00`}
                  </span>
                </div>
                {weekDays.map(day => {
                  const eventsForSlot = filteredEmploisTemps.filter(event => {
                    const eventHour = extractHour(event.heureDebut);
                    return event.jour === day && eventHour === hour;
                  });
                  return (
                    <div
                      key={`${day}-${hour}`}
                      className="p-0.5 md:p-1 border-l border-b border-slate-200 min-h-[60px] md:min-h-[70px] bg-white hover:bg-slate-50 transition-colors duration-200"
                    >
                      {eventsForSlot.map(renderEventDetails)}
                    </div>
                  );
                })}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};