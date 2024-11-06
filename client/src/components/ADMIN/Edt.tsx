import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Plus, ChevronLeft, ChevronRight, Minimize, Maximize, Settings, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.tsx';

// Types
interface Event {
  id: string;
  title: string;
  professor: string;
  color: string;
  day: string;
  hour: number;
}

interface RootState {
  edt: {
    events: Event[];
  };
}

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

// Jours de la semaine
const weekDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven'];

// Couleurs disponibles pour les événements
const eventColors = [
  'bg-gradient-to-r from-blue-400 to-blue-500',
  'bg-gradient-to-r from-green-400 to-green-500',
  'bg-gradient-to-r from-yellow-400 to-yellow-500',
  'bg-gradient-to-r from-red-400 to-red-500',
  'bg-gradient-to-r from-purple-400 to-purple-500',
  'bg-gradient-to-r from-pink-400 to-pink-500',
  'bg-gradient-to-r from-indigo-400 to-indigo-500',
];

// Composant principal
const Edt: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [isCondensed, setIsCondensed] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const events = useSelector((state: RootState) => state.edt.events);
  const dispatch = useDispatch();

  const timeSlots = Array.from({ length: 12 }, (_, i) => i + 8);

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
      hour: timeSlots[Math.floor(Math.random() * timeSlots.length)]
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
    <div className={`min-h-screen text-gray-900 dark:text-white p-4 transition-colors duration-300`}>
      <div className={`max-w-7xl mx-auto ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl overflow-hidden`}>
        <div className={`p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-blue-900 text-white'} flex justify-between items-center`}>
          <h1 className="text-2xl font-bold">Emploi du temps</h1>
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-blue-500 hover:bg-blue-400'}`}
              onClick={() => setIsCondensed(!isCondensed)}
            >
              {isCondensed ? <Maximize size={20} /> : <Minimize size={20} />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-blue-500 hover:bg-blue-400'}`}
              onClick={toggleDarkMode}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
          </div>
        </div>
        <div className={`flex justify-between items-center p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <button
            onClick={() => setCurrentWeek(prev => {
              const newDate = new Date(prev);
              newDate.setDate(newDate.getDate() - 7);
              return newDate;
            })}
            className={`${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
          >
            <ChevronLeft size={24} />
          </button>
          
          <div className="text-lg font-medium">
            Semaine du {currentWeek.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
          </div>
          
          <button
            onClick={() => setCurrentWeek(prev => {
              const newDate = new Date(prev);
              newDate.setDate(newDate.getDate() + 7);
              return newDate;
            })}
            className={`${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
          >
            <ChevronRight size={24} />
          </button>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className={`grid grid-cols-6 gap-px ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} text-sm`}>
            <div className={`p-3 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100 text-gray-700'} font-black text-center`}>
              Heures
            </div>
            {weekDays.map((day, index) => (
              <div
                key={day}
                className={`p-3 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100 text-gray-700'} font-medium text-center`}
              >
                {day}
              </div>
            ))}
          </div>
          <div className={`grid grid-cols-6 gap-px ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
            {timeSlots.map(hour => (
              <React.Fragment key={hour}>
                <div className={`p-2 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100 text-gray-700'} text-center font-semibold text-sm`}>
                  {`${hour}:00`}
                </div>
                {weekDays.map((day, index) => (
                  <Droppable key={`${index}-${hour}`} droppableId={`${index}-${hour}`}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`p-1 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} ${
                          isCondensed ? 'h-12' : 'h-24'
                        } transition-all duration-300 ${
                          snapshot.isDraggingOver ? 'bg-blue-100 dark:bg-blue-900' : ''
                        }`}
                      >
                        {events.filter(event => event.day === day && event.hour === hour).map((event, eventIndex) => (
                          <Draggable key={event.id} draggableId={event.id} index={eventIndex}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`${event.color} p-1 mb-1 rounded text-xs ${
                                  snapshot.isDragging ? 'shadow-lg' : ''
                                } ${isCondensed ? 'truncate' : ''}`}
                                onClick={() => openEditModal(event)}
                              >
                                <div className="font-medium truncate">{event.title}</div>
                                {!isCondensed && (
                                  <div className="text-xxs truncate">{event.professor}</div>
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
        </DragDropContext>
        <div className="p-4 flex justify-end space-x-2">
          <label className="relative cursor-pointer">
            <input
              type="file"
              className="hidden"
              onChange={handleFileImport}
              accept=".csv,.xlsx"
            />
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center px-4 py-2 ${
                isDarkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-800 hover:bg-blue-900'
              } text-white rounded-full text-sm font-medium`}
            >
              <Upload size={16} className="mr-2" />
              Importer
            </motion.div>
          </label>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center px-4 py-2 ${
              isDarkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-800 hover:bg-blue-900'
            } text-white rounded-full text-sm font-medium`}
            onClick={addNewEvent}
          >
            <Plus size={16} className="mr-2" />
            Ajouter un cours
          </motion.button>
        </div>
      </div>

      {/* Modal d'édition */}
      <AnimatePresence>
        {editingEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-xl w-full max-w-md`}
            >
              <h2 className="text-2xl font-bold mb-4">Modifier l'événement</h2>
              <form onSubmit={handleEventUpdate}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Titre</label>
                  <input
                    type="text"
                    value={editingEvent.title}
                    onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                    className={`w-full p-2 border rounded ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Professeur</label>
                  <input
                    type="text"
                    value={editingEvent.professor}
                    onChange={(e) => setEditingEvent({ ...editingEvent, professor: e.target.value })}
                    className={`w-full p-2 border rounded ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Couleur</label>
                  <div className="flex flex-wrap gap-2">
                    {eventColors.map((color, index) => (
                      <button
                        key={index}
                        type="button"
                        className={`w-8 h-8 rounded-full ${color} ${editingEvent.color === color ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                        onClick={() => setEditingEvent({ ...editingEvent, color })}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={closeEditModal}
                    className={`px-4 py-2 rounded ${isDarkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300'}`}
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className={`px-4 py-2 ${isDarkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded`}
                  >
                    Sauvegarder
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
// Squelette de chargement
const EdtSkeleton: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} p-4`}>
      <div className={`max-w-7xl mx-auto ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl overflow-hidden animate-pulse`}>
        <div className={`h-16 ${isDarkMode ? 'bg-gray-700' : 'bg-blue-600'}`}></div>
        <div className="p-4">
          <div className={`h-8 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded w-1/3 mb-4`}></div>
          <div className="grid grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`h-8 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded`}></div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-6 gap-4">
            {[...Array(72)].map((_, i) => (
              <div key={i} className={`h-24 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded`}></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Edt;