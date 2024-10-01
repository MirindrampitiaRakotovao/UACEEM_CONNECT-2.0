import axios from 'axios';
import { useState } from 'react';

export const usePhotoUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handlePhotoUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('photo', selectedFile);

    try {
      setUploading(true);
      const response = await axios.post('http://localhost:4000/etudiant/photo', formData, {
        headers: { 
            'Content-Type': 'multipart/form-data', 
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('Photo mise à jour:', response.data);
      setUploadSuccess(true);
      setUploadError(null);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la photo:', error);
      setUploadError('Erreur lors de la mise à jour de la photo');
      setUploadSuccess(false);
    } finally {
      setUploading(false);
    }
  };

  return {
    handleFileChange,
    handlePhotoUpload,
    selectedFile,
    uploading,
    uploadError,
    uploadSuccess,
  };
};
