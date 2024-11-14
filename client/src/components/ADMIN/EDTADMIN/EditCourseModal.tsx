import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

import { EmploiDuTemps } from '../../../types/emploi-du-temps';


interface Professeur {
  id: number;
  nom: string;
  prenom: string;
  titre: string;
}
interface Matiere {
  nomMatiere: string;
  professeur: Professeur;
  semestre: string;
}
interface EditCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EmploiDuTemps | null;
  handleUpdateEvent: (updatedEvent: EmploiDuTemps) => Promise<void>;
  getMentions: () => string[];
  getNiveaux: (mention: string) => string[];
  getMatieres: (mention: string, niveau: string) => Matiere[];
  setError: (error: string | null) => void;
}
export const EditCourseModal: React.FC<EditCourseModalProps> = ({
  isOpen,
  onClose,
  event,
  handleUpdateEvent,
  getMentions,
  getNiveaux,
  getMatieres,
  setError
}) => {
  const [editedEvent, setEditedEvent] = useState<EmploiDuTemps | null>(null);
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [selectedProfesseur, setSelectedProfesseur] = useState<Professeur | null>(null);
  // Réinitialiser l'état local quand l'événement change
  useEffect(() => {
    if (event) {
      setEditedEvent({ ...event });
      // Rechercher et définir le professeur initial si possible
      if (event.mention && event.niveau && event.nomMatiere) {
        const matieres = getMatieres(event.mention, event.niveau);
        const matiere = matieres.find(m => m.nomMatiere === event.nomMatiere);
        if (matiere) {
          setSelectedProfesseur(matiere.professeur);
        }
      }
    }
  }, [event, getMatieres]);
  if (!isOpen || !editedEvent) return null;
  const weekDays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
  const timeSlots = Array.from({ length: 11 }, (_, i) => i + 8);
  const colors = [
    'bg-blue-100', 'bg-green-100', 'bg-yellow-100', 
    'bg-red-100', 'bg-purple-100', 'bg-pink-100', 'bg-indigo-100'
  ];
  const validateField = (fieldName: string, value: string | undefined) => {
    switch (fieldName) {
      case 'mention':
        return value ? '' : 'Veuillez sélectionner une mention';
      case 'niveau':
        return value ? '' : 'Veuillez sélectionner un niveau';
      case 'nomMatiere':
        return value ? '' : 'Veuillez sélectionner une matière';
      case 'jour':
        return value ? '' : 'Veuillez sélectionner un jour';
      case 'heureDebut':
        return value ? '' : 'Veuillez sélectionner une heure de début';
      case 'heureFin': {
        if (!value) return 'Veuillez sélectionner une heure de fin';
        const debut = editedEvent.heureDebut ? Number(editedEvent.heureDebut) : 0;
        const fin = Number(value);
        return fin > debut ? '' : 'L\'heure de fin doit être après l\'heure de début';
      }
      case 'salle':
        return value && value.trim() !== '' ? '' : 'Veuillez saisir le numéro de salle';
      case 'couleur':
        return value ? '' : 'Veuillez sélectionner une couleur';
      default:
        return '';
    }
  };
  const handleChange = (
    fieldName: string,
    value: string,
    onChange: (value: string) => void
  ) => {
    setTouchedFields(prev => ({ ...prev, [fieldName]: true }));
    const errorMessage = validateField(fieldName, value);
    
    if (errorMessage) {
      setError(errorMessage);
    } else {
      setError(null);
    }
    
    onChange(value);
  };
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = [
      'mention', 'niveau', 'nomMatiere', 'jour', 
      'heureDebut', 'heureFin', 'salle', 'couleur'
    ].map(field => validateField(field, editedEvent[field as keyof EmploiDuTemps]));
    
    const firstError = validationErrors.find(error => error !== '');
    
    if (firstError) {
      setError(firstError);
      return;
    }
    
    try {
      await handleUpdateEvent(editedEvent);
      setSuccessMessage('Cours modifié avec succès !');
      
      setTimeout(() => {
        setSuccessMessage(null);
        onClose();
      }, 3000);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Une erreur est survenue');
    }
  };
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-bold text-gray-800">
              Modifier le cours
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          {successMessage && (
            <div className="mb-4 text-green-600">
              {successMessage}
            </div>
          )}
          
          <form onSubmit={onSubmit} className="space-y-3">
            <select
              value={editedEvent.mention || ''}
              onChange={(e) => handleChange(
                'mention',
                e.target.value,
                (value) => setEditedEvent({
                  ...editedEvent,
                  mention: value,
                  niveau: '',
                  nomMatiere: '',
                  parcours: value
                })
              )}
              className={`w-full rounded-md border px-2 py-1 text-xs ${
                touchedFields.mention && !editedEvent.mention 
                  ? 'border-red-500' 
                  : 'border-gray-300'
              }`}
            >
              <option value="">Sélectionner une mention</option>
              {getMentions().map((mention) => (
                <option key={mention} value={mention}>{mention}</option>
              ))}
            </select>
            {editedEvent.mention && (
              <select
                value={editedEvent.niveau || ''}
                onChange={(e) => handleChange(
                  'niveau',
                  e.target.value,
                  (value) => setEditedEvent({
                    ...editedEvent,
                    niveau: value,
                    nomMatiere: ''
                  })
                )}
                className={`w-full rounded-md border px-2 py-1 text-xs ${
                  touchedFields.niveau && !editedEvent.niveau 
                    ? 'border-red-500' 
                    : 'border-gray-300'
                }`}
              >
                <option value="">Sélectionner un niveau</option>
                {getNiveaux(editedEvent.mention).map((niveau) => (
                  <option key={`${editedEvent.mention}-${niveau}`} value={niveau}>{niveau}</option>
                ))}
              </select>
            )}
            {editedEvent.mention && editedEvent.niveau && (
              <>
                <select
                  value={editedEvent.nomMatiere || ''}
                  onChange={(e) => {
                    const matiere = getMatieres(editedEvent.mention!, editedEvent.niveau!)
                      .find(m => m.nomMatiere === e.target.value);
                    handleChange(
                      'nomMatiere',
                      e.target.value,
                      (value) => {
                        if (matiere) {
                          setEditedEvent({
                            ...editedEvent,
                            nomMatiere: value,
                            personnelId: matiere.professeur.id,
                            semestre: matiere.semestre
                          });
                          setSelectedProfesseur(matiere.professeur);
                        }
                      }
                    );
                  }}
                  className={`w-full rounded-md border px-2 py-1 text-xs ${
                    touchedFields.nomMatiere && !editedEvent.nomMatiere 
                      ? 'border-red-500' 
                      : 'border-gray-300'
                  }`}
                >
                  <option value="">Sélectionner une matière</option>
                  {getMatieres(editedEvent.mention, editedEvent.niveau).map((matiere) => (
                    <option key={matiere.nomMatiere} value={matiere.nomMatiere}>
                      {matiere.nomMatiere}
                    </option>
                  ))}
                </select>
                {/* Affichage du professeur */}
                {selectedProfesseur && (
                  <div className="mt-2 p-2 bg-gray-100 rounded-md text-xs">
                    <p className="font-semibold">Professeur assigné :</p>
                    <p>
                      {selectedProfesseur.titre} {selectedProfesseur.nom} {selectedProfesseur.prenom}
                    </p>
                  </div>
                )}
              </>
            )}
            <select
              value={editedEvent.jour || ''}
              onChange={(e) => handleChange(
                'jour',
                e.target.value,
                (value) => setEditedEvent({ ...editedEvent, jour: value })
              )}
              className={`w-full rounded-md border px-2 py-1 text-xs ${
                touchedFields.jour && !editedEvent.jour 
                  ? 'border-red-500' 
                  : 'border-gray-300'
              }`}
            >
              <option value="">Sélectionner un jour</option>
              {weekDays.map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
            <select
              value={editedEvent.heureDebut || ''}
              onChange={(e) => handleChange(
                'heureDebut',
                e.target.value,
                (value) => setEditedEvent({ ...editedEvent, heureDebut: value })
              )}
              className={`w-full rounded-md border px-2 py-1 text-xs ${
                touchedFields.heureDebut && !editedEvent.heureDebut 
                  ? 'border-red-500' 
                  : 'border-gray-300'
              }`}
            >
              <option value="">Heure de début</option>
              {timeSlots.map((hour) => (
                <option key={hour} value={hour}>{`${hour}:00`}</option>
              ))}
            </select>
            <select
              value={editedEvent.heureFin || ''}
              onChange={(e) => handleChange(
                'heureFin',
                e.target.value,
                (value) => setEditedEvent({ ...editedEvent, heureFin: value })
              )}
              className={`w-full rounded-md border px-2 py-1 text-xs ${
                touchedFields.heureFin && !editedEvent.heureFin 
                  ? 'border-red-500' 
                  : 'border-gray-300'
              }`}
            >
              <option value="">Heure de fin</option>
              {timeSlots.map((hour) => (
                <option key={hour} value={hour}>{`${hour}:00`}</option>
              ))}
            </select>
            {/* Salle */}
            <input
              type="text"
              placeholder="Numéro de salle"
              value={editedEvent.salle || ''}
              onChange={(e) => handleChange(
                'salle',
                e.target.value,
                (value) => setEditedEvent({ ...editedEvent, salle: value })
              )}
              className={`w-full rounded-md border px-2 py-1 text-xs ${
                touchedFields.salle && !editedEvent.salle 
                  ? 'border-red-500' 
                  : 'border-gray-300'
              }`}
            />
            {/* Couleur */}
            <div className="grid grid-cols-7 gap-2">
              {colors.map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => handleChange(
                    'couleur',
                    color,
                    (value) => setEditedEvent({ ...editedEvent, couleur: value })
                  )}
                  className={`w-6 h-6 rounded-full ${color} ${
                    editedEvent.couleur === color 
                      ? 'ring-2 ring-offset-2 ring-indigo-600' 
                      : ''
                  }`}
                />
              ))}
            </div>
            {/* Année universitaire */}
            <select
              value={editedEvent.anneeUniversitaire || '2023-2024'}
              onChange={(e) => handleChange(
                'anneeUniversitaire',
                e.target.value,
                (value) => setEditedEvent({ ...editedEvent, anneeUniversitaire: value })
              )}
              className={`w-full rounded-md border px-2 py-1 text-xs ${
                touchedFields.anneeUniversitaire && !editedEvent.anneeUniversitaire 
                  ? 'border-red-500' 
                  : 'border-gray-300'
              }`}
            >
              <option value="2023-2024">2023-2024</option>
              <option value="2024-2025">2024-2025</option>
              {/* Ajoutez d'autres années si nécessaire */}
            </select>
            <button type="submit" className="w-full bg-blue-600 text-white rounded-md py-2">
              Modifier le cours
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};