import React, { useState, useEffect } from 'react';
import { X, CheckCircle } from 'lucide-react';

import { DonneesFormulaire, EmploiDuTemps, NouvelEmploiDuTemps } from '../../types/emploi-du-temps';
import { TimeTableFilters } from './EDTADMIN/TimeTableFilter';
import { EditCourseModal } from './EDTADMIN/EditCourseModal';
import { AddCourseModal } from './EDTADMIN/AddCourseModal';
import { TimeTableGrid } from './EDTADMIN/TimeTableGrid';
import { PageHeader } from './EDTADMIN/PageHeader';
import apiService from '../../services/api';


// Constants
const weekDays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
const timeSlots = Array.from({ length: 11 }, (_, i) => i + 8); // Cela donnera [8, 9, 10, ..., 18]
const EdtListProfesseur: React.FC = () => {
  // States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EmploiDuTemps | null>(null);
  const [emploisTemps, setEmploisTemps] = useState<EmploiDuTemps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  // Initialisation du state avec une valeur par défaut pour l'année universitaire
  const [newEvent, setNewEvent] = useState<NouvelEmploiDuTemps>({
    anneeUniversitaire: '2023-2024',
    statut: 'Actif'
  });
  const [formData, setFormData] = useState<DonneesFormulaire>({
    enseignements: {},
    couleurs: [],
    jours: [],
    heures: []
  });
  const [selectedMention, setSelectedMention] = useState<string>('');
  const [selectedNiveau, setSelectedNiveau] = useState<string>('');
  // Fetch Data
  useEffect(() => {
    console.log('Composant monté - Démarrage du chargement');
    fetchInitialData();
  }, []);
  const fetchInitialData = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Début du chargement des données');
      const [emploisResponse, donneesResponse] = await Promise.all([
        apiService.get<any>('/list'),
        apiService.get<any>('/donnees-formulaire')
      ]);
      console.log('Données reçues:', { emplois: emploisResponse, donnees: donneesResponse });
      // Traitement des emplois du temps
      if (emploisResponse?.data) {
        const emploisData = emploisResponse.data;
        const allEmplois: EmploiDuTemps[] = [];
        // Parcourir les mentions
        Object.entries(emploisData).forEach(([mention, niveauxData]: [string, any]) => {
          // Parcourir les niveaux
          Object.entries(niveauxData).forEach(([niveau, emplois]: [string, any[]]) => {
            // Parcourir les emplois du temps
            emplois.forEach((emploi: any) => {
              // Créer l'objet emploi du temps sans transformation
              allEmplois.push({
                ...emploi,
                mention,
                niveau,
                salle: emploi.salle || 'Non définie',
                couleur: emploi.couleur || 'bg-gray-200'
              });
            });
          });
        });
        console.log('Emplois non transformés:', allEmplois);
        setEmploisTemps(allEmplois);
      }
      // Traitement des données du formulaire
      if (donneesResponse?.data) {
        const formDataReceived = donneesResponse.data;
        setFormData({
          enseignements: formDataReceived.enseignements || {},
          couleurs: formDataReceived.couleurs || [],
          jours: formDataReceived.jours || [],
          heures: formDataReceived.heures || []
        });
      }
    } catch (error: any) {
      console.error('Erreur lors du chargement:', error);
      setError(error.message || 'Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };
  // Filtrage des emplois du temps
  const filteredEmploisTemps = emploisTemps.filter(event =>
    (!selectedMention || event.mention === selectedMention) &&
    (!selectedNiveau || event.niveau === selectedNiveau)
  );
  // Reset filters
  const resetFilters = () => {
    setSelectedMention('');
    setSelectedNiveau('');
  };
  // Helpers avec vérifications
  const getMentions = () => {
    console.log('Récupération des mentions depuis:', formData.enseignements);
    try {
      return formData.enseignements ? Object.keys(formData.enseignements) : [];
    } catch (err) {
      console.error('Erreur lors de la récupération des mentions:', err);
      return [];
    }
  };
  const getNiveaux = (mention: string) => {
    console.log(`Récupération des niveaux pour la mention: ${mention}`);
    try {
      return formData.enseignements[mention] ? Object.keys(formData.enseignements[mention]) : [];
    } catch (err) {
      console.error('Erreur lors de la récupération des niveaux:', err);
      return [];
    }
  };
  const getMatieres = (mention: string, niveau: string) => {
    console.log(`Récupération des matières pour ${mention} - ${niveau}`);
    try {
      return formData.enseignements[mention]?.[niveau] || [];
    } catch (err) {
      console.error('Erreur lors de la récupération des matières:', err);
      return [];
    }
  };
  const validateForm = () => {
    const requiredFields = {
      nomMatiere: "La matière",
      personnelId: "Le professeur",
      jour: "Le jour",
      heureDebut: "L'heure de début",
      heureFin: "L'heure de fin",
      salle: "La salle",
      couleur: "La couleur",
      mention: "La mention",
      niveau: "Le niveau",
      anneeUniversitaire: "L'année universitaire"
    };
    for (const [field, label] of Object.entries(requiredFields)) {
      if (!newEvent[field]) {
        setError(`${label} est obligatoire. Veuillez le remplir.`);
        return false;
      }
    }
    return true;
  };
  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validation du formulaire
    if (!validateForm()) return;
    try {
      setLoading(true);
      const eventData = {
        ...newEvent,
        heureDebut: `00:00:${newEvent.heureDebut}`,
        heureFin: `00:00:${newEvent.heureFin}`,
        parcours: newEvent.mention,
        anneeUniversitaire: newEvent.anneeUniversitaire || '2023-2024',
        statut: 'Actif'
      };
      const response = await apiService.post<{ data: EmploiDuTemps }>('/emploi-du-temps', eventData);
      if (response?.data?.data) {
        // Transformation de l'événement pour l'affichage
        const newEmploiTemps = {
          ...response.data.data,
          heureDebut: response.data.data.heureDebut.split(':')[2],
          heureFin: response.data.data.heureFin.split(':')[2]
        };
        // Mise à jour immédiate de la liste
        setEmploisTemps(prev => [...prev, newEmploiTemps]);
        // Message de succès personnalisé
        setSuccessMessage(`Le cours ${newEvent.nomMatiere} a été ajouté avec succès !`);
        // Fermeture du modal et réinitialisation
        setIsAddModalOpen(false);
        setNewEvent({
          anneeUniversitaire: '2023-2024',
          statut: 'Actif'
        });
        // Effacement du message après 3 secondes
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      }
    } catch (error: any) {
      console.error('Erreur lors de l\'ajout:', error);
      setError(error.response?.data?.message || 'Erreur lors de l\'ajout du cours');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateEvent = async (updatedEvent: EmploiDuTemps) => {
    try {
      setLoading(true);
      setError(null);
  
      const eventData = {
        ...updatedEvent,
        heureDebut: `00:00:${updatedEvent.heureDebut}`,
        heureFin: `00:00:${updatedEvent.heureFin}`,
        parcours: updatedEvent.mention,
        anneeUniversitaire: updatedEvent.anneeUniversitaire || '2023-2024',
        statut: 'Actif'
      };
  
      const response = await apiService.put<{ data: EmploiDuTemps }>(
        `/edit/${updatedEvent.id}`,
        eventData
      );
  
      if (response?.data?.data) {
        // Mise à jour de la liste des emplois du temps
        setEmploisTemps(prev =>
          prev.map(evt =>
            evt.id === updatedEvent.id
              ? {
                  ...response.data.data,
                  heureDebut: response.data.data.heureDebut.split(':')[2],
                  heureFin: response.data.data.heureFin.split(':')[2]
                }
              : evt
          )
        );
  
        setSuccessMessage(`Le cours ${updatedEvent.nomMatiere} a été modifié avec succès !`);
        setIsEditModalOpen(false);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      }
    } catch (error: any) {
      console.error('Erreur lors de la modification:', error);
      setError(error.response?.data?.message || 'Erreur lors de la modification du cours');
    } finally {
      setLoading(false);
    }
  };


  const handleDeleteEvent = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce cours ?')) return;
    console.log('Suppression de l\'événement:', id);
    try {
      setLoading(true);
      await apiService.delete(`/${id}`);
      setEmploisTemps(prev => {
        const updated = prev.filter(evt => evt.id !== id);
        console.log('Liste mise à jour après suppression:', updated);
        return updated;
      });
      setError(null);
    } catch (error: any) {
      console.error('Erreur lors de la suppression:', error);
      setError(error.response?.data?.message || 'Erreur lors de la suppression');
    } finally {
      setLoading(false);
    }
  };
  // Rendu conditionnel pour le chargement
  if (loading) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {error && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg">
          {error}
          <button onClick={() => setError(null)} className="ml-2 hover:text-red-200">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      {successMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50 flex items-center">
          <CheckCircle className="w-5 h-5 mr-2" />
          {successMessage}
        </div>
      )}
      <PageHeader setIsAddModalOpen={setIsAddModalOpen} />
      <TimeTableFilters
        selectedMention={selectedMention}
        selectedNiveau={selectedNiveau}
        setSelectedMention={setSelectedMention}
        setSelectedNiveau={setSelectedNiveau}
        filteredEmploisTemps={filteredEmploisTemps}
        getMentions={getMentions}
        getNiveaux={getNiveaux}
        resetFilters={resetFilters}
      />
      <TimeTableGrid
        filteredEmploisTemps={filteredEmploisTemps}
        handleDeleteEvent={handleDeleteEvent}
        onEventClick={(event) => {
          setSelectedEvent(event);
          setIsEditModalOpen(true);
        }}
      />
      <AddCourseModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        newEvent={newEvent}
        setNewEvent={setNewEvent}
        handleAddEvent={handleAddEvent}
        getMentions={getMentions}
        getNiveaux={getNiveaux}
        getMatieres={getMatieres}
        setError={setError} // Passer setError ici
      />

      <EditCourseModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        event={selectedEvent}
        handleUpdateEvent={handleUpdateEvent}
        getMentions={getMentions}
        getNiveaux={getNiveaux}
        getMatieres={getMatieres}
        setError={setError}
      />
    </div>
  );
};
export default EdtListProfesseur;