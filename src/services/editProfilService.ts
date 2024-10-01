import { useState } from 'react';

interface FormData {
  bio: string;
}

export const useEditProfileModal = (initialBio: string) => {
  const [formData, setFormData] = useState<FormData>({ bio: initialBio });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
        const response = await fetch('http://localhost:4000/etudiant/modifierBio', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ bio: formData.bio }),
        });
      
        const data = await response.json();
      
        if (!response.ok) {
          throw new Error(data.message || 'Erreur lors de la mise à jour du profil');
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
    loading,
    error,
    success,
    handleInputChange,
    handleSubmit,
  };
};
