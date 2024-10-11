import { useState, useEffect } from 'react';
import { fetchStudentProfile } from './authService';

interface Etudiant {
  id: number;
  nom: string;
  email: string;
  photo: string | null;
  matricule: string;
  sexe: string;
  date_nais: string | null;
  lieu_nais: string | null;
  situation_matri: string | null;
  username: string;
  role: string;
  status: boolean;
  bio: string | null;
}

export const useUserProfile = () => {
  const [etudiant, setEtudiant] = useState<Etudiant | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const loadProfile = async () => {
    try {
      const studentProfile = await fetchStudentProfile();
      setEtudiant(studentProfile);
      setRole(studentProfile);
    } catch (err) {
      setError('Erreur lors du chargement du profil');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return {
    role,
    etudiant,
    loading,
    error,
    isOpen,
    openModal,
    closeModal,
  };
};

