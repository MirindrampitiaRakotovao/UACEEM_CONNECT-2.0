import { Upload, Plus, ChevronLeft, ChevronRight, Minimize2, Maximize2, X, Sun, Moon, MapPin, Clock, User } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';

import { useTheme } from '../../context/ThemeContext';


// Types
interface Event {
  id: string;
  title: string;
  professor: string;
  color: string;
  day: string;
  hour: number;
  room: string;
}

interface RootState {
  edt: {
    events: Event[];
  };
}

// Color Preview Component
const ColorPreview = ({ color }: { color: string }) => (
  <div className={`w-full h-10 rounded-lg ${color} mb-2 flex items-center justify-center shadow-sm`}>
    <span className="text-white text-xs">Aperçu du cours</span>
  </div>
);

// Actions
export const ADD_EVENT = 'ADD_EVENT';
export const MOVE_EVENT = 'MOVE_EVENT';
export const UPDATE_EVENT = 'UPDATE_EVENT';
export const SET_EVENTS = 'SET_EVENTS';

// Action creators
export const addEvent = (event: Event) => ({
  type: ADD_EVENT as typeof ADD_EVENT,
  payload: event
});

export const moveEvent = (result: any) => ({
  type: MOVE_EVENT as typeof MOVE_EVENT,
  payload: result
});

export const updateEvent = (event: Event) => ({
  type: UPDATE_EVENT as typeof UPDATE_EVENT,
  payload: event
});

export const setEvents = (events: Event[]) => ({
  type: SET_EVENTS as typeof SET_EVENTS,
  payload: events
});

// Constants
const weekDays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
const eventColors = [
  'bg-gradient-to-r from-blue-400 to-blue-500 text-white',
  'bg-gradient-to-r from-green-400 to-green-500 text-white',
  'bg-gradient-to-r from-purple-400 to-purple-500 text-white',
  'bg-gradient-to-r from-red-400 to-red-500 text-white',
  'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white',
  'bg-gradient-to-r from-pink-400 to-pink-500 text-white',
  'bg-gradient-to-r from-indigo-400 to-indigo-500 text-white',
];

const EdtListProfesseur: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [isCondensed, setIsCondensed] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const events = useSelector((state: RootState) => state.edt.events);
  const dispatch = useDispatch();
  useEffect(() => {
    const savedEvents = localStorage.getItem('edtEvents');
    if (savedEvents) {
      dispatch(setEvents(JSON.parse(savedEvents)));
    }
  }, [dispatch]);
  useEffect(() => {
    localStorage.setItem('edtEvents', JSON.stringify(events));
  }, [events]);
  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Fichier importé:", file.name);
    }
  };
  const addNewEvent = () => {
    const newEvent: Event = {
      id: `event${events.length + 1}`,
      title: 'Nouveau cours',
      professor: 'Prof',
      color: eventColors[Math.floor(Math.random() * eventColors.length)],
      day: weekDays[Math.floor(Math.random() * weekDays.length)],
      hour: Math.floor(Math.random() * 12) + 8,
      room: `Salle ${Math.floor(Math.random() * 100) + 1}`
    };
    dispatch(addEvent(newEvent));
  };
  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const { source, destination } = result;
    const updatedEvent = {
      ...events.find(event => event.id === result.draggableId),
      day: weekDays[parseInt(destination.droppableId.split('-')[0])],
      hour: parseInt(destination.droppableId.split('-')[1])
    };
    dispatch(moveEvent({
      source,
      destination,
      draggableId: result.draggableId,
      updatedEvent
    }));
  };
  const openEditModal = (event: Event) => {
    setEditingEvent(event);
  };
  const closeEditModal = () => {
    setEditingEvent(null);
  };
  const handleEventUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingEvent) {
      dispatch(updateEvent(editingEvent));
      closeEditModal();
    }
  };
  return (
    <div className={`min-h-screen ${isDarkMode ? '' : ''} p-4`}>
      <div className="max-w-[1800px] mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className={`p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-indigo-600'} border-b border-gray-200 dark:border-gray-700`}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="flex items-center gap-3">
              <div className={`h-10 w-10 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-indigo-500'} flex items-center justify-center`}>
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Planning des cours</h1>
                <p className="text-xs text-gray-200">Prof. Dupont</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsCondensed(!isCondensed)}
                className={`p-1.5 rounded-md ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-indigo-500 hover:bg-indigo-400'} text-white transition-colors`}
              >
                {isCondensed ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
              </button>
              <button
                onClick={toggleDarkMode}
                className={`p-1.5 rounded-md ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-indigo-500 hover:bg-indigo-400'} text-white transition-colors`}
              >
                {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </div>
          </div>
        </div>
                {/* Navigation semaine */}
                <div className={`p-3 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border-b border-gray-200 dark:border-gray-700`}>
          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentWeek(prev => {
                const newDate = new Date(prev);
                newDate.setDate(newDate.getDate() - 7);
                return newDate;
              })}
              className={`p-1.5 rounded-md ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-sm font-medium">
              Semaine du {currentWeek.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
            </span>
            <button
              onClick={() => setCurrentWeek(prev => {
                const newDate = new Date(prev);
                newDate.setDate(newDate.getDate() + 7);
                return newDate;
              })}
              className={`p-1.5 rounded-md ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
        {/* Grille EDT */}
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="p-3">
            <div className={`grid grid-cols-6 gap-1 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              {/* En-tête des jours */}
              <div className={`p-2 rounded-md ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} font-medium text-center text-xs`}>
                Heures
              </div>
              {weekDays.map((day) => (
                <div
                  key={day}
                  className={`p-2 rounded-md ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} font-medium text-center text-xs`}
                >
                  {day}
                </div>
              ))}
              {/* Cellules horaires */}
              {Array.from({ length: 11 }, (_, i) => i + 8).map((hour) => (
                <React.Fragment key={hour}>
                  <div className={`p-2 rounded-md ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} text-center text-xs`}>
                    {`${hour}:00`}
                  </div>
                  {weekDays.map((day, dayIndex) => (
                    <Droppable key={`${dayIndex}-${hour}`} droppableId={`${dayIndex}-${hour}`}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={`
                            rounded-md p-1
                            ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}
                            ${snapshot.isDraggingOver ? 'ring-1 ring-indigo-400' : ''}
                            ${isCondensed ? 'h-10' : 'h-20'}
                            transition-all duration-200
                          `}
                        >
                          {events
                            .filter(event => event.day === day && event.hour === hour)
                            .map((event, index) => (
                              <Draggable
                                key={event.id}
                                draggableId={event.id}
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    onClick={() => openEditModal(event)}
                                    className={`
                                      ${event.color}
                                      ${snapshot.isDragging ? 'ring-1 ring-offset-1 ring-indigo-500' : ''}
                                      rounded-md p-1 mb-1 cursor-pointer
                                      ${isCondensed ? 'truncate' : ''}
                                      transform transition-all duration-200
                                      hover:scale-[1.02] hover:shadow-sm
                                    `}
                                  >
                                    <div className="font-medium text-xs truncate">
                                      {event.title}
                                    </div>
                                    {!isCondensed && (
                                      <>
                                        <div className="flex items-center text-xs mt-0.5 opacity-90">
                                          <User className="w-3 h-3 mr-1" />
                                          <span className="text-[10px]">{event.professor}</span>
                                        </div>
                                        <div className="flex items-center text-xs mt-0.5 opacity-90">
                                          <MapPin className="w-3 h-3 mr-1" />
                                          <span className="text-[10px]">{event.room}</span>
                                        </div>
                                      </>
                                    )}
                                  </div>
                                )}
                              </Draggable>
                            ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </DragDropContext>
                {/* Actions */}
                <div className="p-3 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-2">
          <label className="relative">
            <input
              type="file"
              className="hidden"
              onChange={handleFileImport}
              accept=".csv,.xlsx"
            />
            <button
              className={`
                flex items-center px-3 py-1.5 rounded-md text-xs font-medium
                ${isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-600'}
                transition-colors
              `}
            >
              <Upload className="w-3 h-3 mr-1" />
              Importer
            </button>
          </label>
          
          <button
            onClick={addNewEvent}
            className={`
              flex items-center px-3 py-1.5 rounded-md text-xs font-medium
              ${isDarkMode 
                ? 'bg-indigo-600 hover:bg-indigo-500' 
                : 'bg-indigo-600 hover:bg-indigo-500'}
              text-white transition-colors
            `}
          >
            <Plus className="w-3 h-3 mr-1" />
            Ajouter un cours
          </button>
        </div>
      </div>

      {/* Modal d'édition */}
      <AnimatePresence>
        {editingEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className={`
                w-full max-w-sm rounded-lg shadow-xl
                ${isDarkMode ? 'bg-gray-800' : 'bg-white'}
                overflow-hidden
              `}
            >
              <form onSubmit={handleEventUpdate}>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-medium">Modifier le cours</h3>
                    <button
                      type="button"
                      onClick={closeEditModal}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium mb-1">
                        Titre
                      </label>
                      <input
                        type="text"
                        value={editingEvent.title}
                        onChange={e => setEditingEvent({
                          ...editingEvent,
                          title: e.target.value
                        })}
                        className={`
                          w-full rounded-md p-1.5 text-sm border
                          ${isDarkMode 
                            ? 'bg-gray-700 border-gray-600' 
                            : 'bg-white border-gray-300'}
                        `}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">
                        Professeur
                      </label>
                      <input
                        type="text"
                        value={editingEvent.professor}
                        onChange={e => setEditingEvent({
                          ...editingEvent,
                          professor: e.target.value
                        })}
                        className={`
                          w-full rounded-md p-1.5 text-sm border
                          ${isDarkMode 
                            ? 'bg-gray-700 border-gray-600' 
                            : 'bg-white border-gray-300'}
                        `}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">
                        Salle
                      </label>
                      <input
                        type="text"
                        value={editingEvent.room}
                        onChange={e => setEditingEvent({
                          ...editingEvent,
                          room: e.target.value
                        })}
                        className={`
                          w-full rounded-md p-1.5 text-sm border
                          ${isDarkMode 
                            ? 'bg-gray-700 border-gray-600' 
                            : 'bg-white border-gray-300'}
                        `}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">
                        Couleur
                      </label>
                      <ColorPreview color={editingEvent.color} />
                      <select
                        value={editingEvent.color}
                        onChange={e => setEditingEvent({
                          ...editingEvent,
                          color: e.target.value
                        })}
                        className={`
                          w-full rounded-md p-1.5 text-xs border
                          ${isDarkMode 
                            ? 'bg-gray-700 border-gray-600' 
                            : 'bg-white border-gray-300'}
                        `}
                      >
                        {eventColors.map(color => (
                          <option key={color} value={color}>
                            {color.split('from-')[1].split('-')[0]}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="p-3 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={closeEditModal}
                    className={`
                      px-3 py-1.5 rounded-md text-xs font-medium
                      ${isDarkMode 
                        ? 'bg-gray-700 hover:bg-gray-600' 
                        : 'bg-gray-100 hover:bg-gray-200'}
                    `}
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium"
                  >
                    Enregistrer
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EdtListProfesseur;