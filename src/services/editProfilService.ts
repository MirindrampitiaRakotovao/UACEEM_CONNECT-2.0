import { useState } from 'react';

interface FormData {
  bio: string;
}

export const useEditProfileModal = (initialBio: string) => {
  const [formData, setFormData] = useState<FormData>({ bio: initialBio });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);  // Ajout pour la photo
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Mise à jour de la bio
      const bioResponse = await fetch('http://localhost:4000/etudiant/modifierBio', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ bio: formData.bio }),
      });

      const bioData = await bioResponse.json();

      if (!bioResponse.ok) {
        throw new Error(bioData.message || 'Erreur lors de la mise à jour du profil');
      }

      // Mise à jour de la photo si elle est sélectionnée
      if (selectedFile) {
        const formData = new FormData();
        formData.append('photo', selectedFile);

        const photoResponse = await fetch('http://localhost:4000/etudiant/photo', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: formData,
        });

        const photoData = await photoResponse.json();

        if (!photoResponse.ok) {
          throw new Error(photoData.message || 'Erreur lors de la mise à jour de la photo');
        }
      }

      setSuccess(true);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || 'Erreur serveur');
      } else {
        setError('Erreur inconnue');
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    selectedFile,
    loading,
    error,
    success,
    handleInputChange,
    handleFileChange,
    handleSubmit,
  };
};
