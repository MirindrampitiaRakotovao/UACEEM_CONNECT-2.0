import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

import { NouvelEmploiDuTemps } from '../../../types/emploi-du-temps';


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
interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  newEvent: NouvelEmploiDuTemps;
  setNewEvent: React.Dispatch<React.SetStateAction<NouvelEmploiDuTemps>>;
  handleAddEvent: (e: React.FormEvent) => Promise<void>;
  getMentions: () => string[];
  getNiveaux: (mention: string) => string[];
  getMatieres: (mention: string, niveau: string) => Matiere[];
  setError: (error: string | null) => void;
}
export const AddCourseModal: React.FC<AddCourseModalProps> = ({
  isOpen,
  onClose,
  newEvent,
  setNewEvent,
  handleAddEvent,
  getMentions,
  getNiveaux,
  getMatieres,
  setError
}) => {

  // Constantes pour les options de sélection
  const weekDays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
  const timeSlots = Array.from({ length: 11 }, (_, i) => i + 8);
  const colors = [
    'bg-blue-100', 'bg-green-100', 'bg-yellow-100', 
    'bg-red-100', 'bg-purple-100', 'bg-pink-100', 'bg-indigo-100'
  ];
  // États locaux pour la gestion du formulaire
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedProfesseur, setSelectedProfesseur] = useState<Professeur | null>(null);
  // Effet pour réinitialiser les champs touchés
  useEffect(() => {
    if (isOpen) {
      setTouchedFields({});
      setError(null);
      setSelectedProfesseur(null);
      // Réinitialisation du nouvel événement avec des valeurs par défaut
      setNewEvent(prev => ({
        ...prev,
        anneeUniversitaire: '2023-2024',
        statut: 'Actif'
      }));
    }
  }, [isOpen]);
  // Validation des champs
  const validateField = (fieldName: string, value: string | undefined) => {
    // Implémentation de la validation comme précédemment
    switch (fieldName) {
      case 'mention':
        return value ? '' : 'Veuillez sélectionner une mention';
      case 'niveau':
        return value ? '' : 'Veuillez sélectionner un niveau';
      case 'nomMatiere':
        return value ? '' : 'Veuillez sélectionner une matière';
      // Autres validations...
      default:
        return '';
    }
  };
    // Ne pas afficher si le modal est fermé
    if (!isOpen) return null;
  // Gestion du changement de champ
  const handleChange = (
    fieldName: string, 
    value: string, 
    onChange: (value: string) => void
  ) => {
    // Marquer le champ comme touché
    setTouchedFields(prev => ({ ...prev, [fieldName]: true }));
    
    // Validation du champ
    const errorMessage = validateField(fieldName, value);
    if (errorMessage) {
      setError(errorMessage);
    } else {
      setError(null);
    }
    
    // Mise à jour de l'événement
    onChange(value);
  };
  // Gestion de la sélection de la matière
  const handleMatiereSelection = (matiere: Matiere) => {
    setNewEvent({
      ...newEvent,
      nomMatiere: matiere.nomMatiere,
      personnelId: matiere.professeur.id,
      semestre: matiere.semestre
    });
    
    // Mettre à jour le professeur sélectionné
    setSelectedProfesseur(matiere.professeur);
  };
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="p-4">
          {/* En-tête du modal */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-bold text-gray-800">
              Ajouter un nouveau cours
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
              disabled={isSubmitting}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <form onSubmit={handleAddEvent} className="space-y-3">
            {/* Sélection de la mention */}
            <select
              value={newEvent.mention || ''}
              onChange={(e) => handleChange(
                'mention',
                e.target.value,
                (value) => setNewEvent({
                  ...newEvent,
                  mention: value,
                  niveau: '',
                  nomMatiere: '',
                  parcours: value
                })
              )}
              className="w-full rounded-md border px-2 py-1 text-xs"
              disabled={isSubmitting}
            >
              <option value="">Sélectionner une mention</option>
              {getMentions().map(mention => (
                <option key={mention} value={mention}>{mention}</option>
              ))}
            </select>
            {/* Sélection du niveau */}
            {newEvent.mention && (
              <select
                value={newEvent.niveau || ''}
                onChange={(e) => handleChange(
                  'niveau',
                  e.target.value,
                  (value) => setNewEvent({
                    ...newEvent,
                    niveau: value,
                    nomMatiere: ''
                  })
                )}
                className="w-full rounded-md border px-2 py-1 text-xs"
                disabled={isSubmitting}
              >
                <option value="">Sélectionner un niveau</option>
                {getNiveaux(newEvent.mention).map(niveau => (
                  <option key={niveau} value={niveau}>{niveau}</option>
                ))}
              </select>
            )}
            {/* Sélection de la matière */}
            {newEvent.mention && newEvent.niveau && (
              <div>
                <select
                  value={newEvent.nomMatiere || ''}
                  onChange={(e) => {
                    const matiere = getMatieres(newEvent.mention!, newEvent.niveau!)
                      .find(m => m.nomMatiere === e.target.value);
                    
                    if (matiere) {
                      handleMatiereSelection(matiere);
                    }
                  }}
                  className="w-full rounded-md border px-2 py-1 text-xs"
                  disabled={isSubmitting}
                >
                  <option value="">Sélectionner une matière</option>
                  {getMatieres(newEvent.mention, newEvent.niveau).map(matiere => (
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
                                  </div>
                                )}
                                {/* Champ de jour */}
                                <select
                                  value={newEvent.jour || ''}
                                  onChange={(e) => handleChange(
                                    'jour',
                                    e.target.value,
                                    (value) => setNewEvent({ ...newEvent, jour: value })
                                  )}
                                  className="w-full rounded-md border px-2 py-1 text-xs"
                                  disabled={isSubmitting}
                                >
                                  <option value="">Sélectionner un jour</option>
                                  {weekDays.map(day => (
                                    <option key={day} value={day}>{day}</option>
                                  ))}
                                </select>
                                {/* Heure de début */}
                                <select
                                  value={newEvent.heureDebut || ''}
                                  onChange={(e) => handleChange(
                                    'heureDebut',
                                    e.target.value,
                                    (value) => setNewEvent({ ...newEvent, heureDebut: value })
                                  )}
                                  className="w-full rounded-md border px-2 py-1 text-xs"
                                  disabled={isSubmitting}
                                >
                                  <option value="">Heure de début</option>
                                  {timeSlots.map(hour => (
                                    <option key={hour} value={hour}>{`${hour}:00`}</option>
                                  ))}
                                </select>
                                {/* Heure de fin */}
                                <select
                                  value={newEvent.heureFin || ''}
                                  onChange={(e) => handleChange(
                                    'heureFin',
                                    e.target.value,
                                    (value) => setNewEvent({ ...newEvent, heureFin: value })
                                  )}
                                  className="w-full rounded-md border px-2 py-1 text-xs"
                                  disabled={isSubmitting}
                                >
                                  <option value="">Heure de fin</option>
                                  {timeSlots.map(hour => (
                                    <option key={hour} value={hour}>{`${hour}:00`}</option>
                                  ))}
                                </select>
                                {/* Salle */}
                                <input
                                  type="text"
                                  placeholder="Numéro de salle"
                                  value={newEvent.salle || ''}
                                  onChange={(e) => handleChange(
                                    'salle',
                                    e.target.value,
                                    (value) => setNewEvent({ ...newEvent, salle: value })
                                  )}
                                  className="w-full rounded-md border px-2 py-1 text-xs"
                                  disabled={isSubmitting}
                                />
                                {/* Sélection de couleur */}
                                <div className="grid grid-cols-7 gap-2">
                                  {colors.map(color => (
                                    <button
                                      key={color}
                                      type="button"
                                      onClick={() => handleChange(
                                        'couleur',
                                        color,
                                        (value) => setNewEvent({ ...newEvent, couleur: value })
                                      )}
                                      className={`w-6 h-6 rounded-full ${color} ${
                                        newEvent.couleur === color 
                                          ? 'ring-2 ring-offset-2 ring-indigo-600' 
                                          : ''
                                      }`}
                                      disabled={isSubmitting}
                                    />
                                  ))}
                                </div>
                                {/* Bouton de soumission */}
                                <button 
                                  type="submit" 
                                  className={`w-full py-2 rounded-md text-white ${
                                    isSubmitting 
                                      ? 'bg-gray-400 cursor-not-allowed' 
                                      : 'bg-blue-500 hover:bg-blue-600'
                                  }`}
                                  disabled={isSubmitting}
                                >
                                  {isSubmitting ? 'Ajout en cours...' : 'Ajouter le cours'}
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      );
                    };