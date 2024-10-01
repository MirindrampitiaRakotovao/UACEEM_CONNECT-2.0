import { useState } from 'react';
import { updateStudentProfile } from './authService';

interface EditProfileData {
  bio: string;
}

export const useEditProfileModal = (initialBio: string) => {
  const [formData, setFormData] = useState<EditProfileData>({ bio: initialBio });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await updateStudentProfile(formData.bio);  // Simuler la mise à jour du profil
      setSuccess(true);
    } catch (err) {
      setError('Erreur lors de la mise à jour du profil');
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
