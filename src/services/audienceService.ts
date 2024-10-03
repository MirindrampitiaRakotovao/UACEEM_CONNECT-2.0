// src/services/audienceService.ts
import { useState } from 'react';

export const useAudience = () => {
  const [selectedAudience, setSelectedAudience] = useState('Public');
  const [isAudienceModalOpen, setIsAudienceModalOpen] = useState(false);
  const [designGroupePartage, setDesignGroupePartage] = useState('');

  const handleOpenAudienceModal = () => {
    setIsAudienceModalOpen(true);
  };

  const handleCloseAudienceModal = () => {
    setIsAudienceModalOpen(false);
  };

  const handleSelectAudience = (audience: string) => {
    setSelectedAudience(audience);
    if (audience !== 'Groupe') {
      setDesignGroupePartage('');
    }
    handleCloseAudienceModal();
  };

  return {
    selectedAudience,
    isAudienceModalOpen,
    designGroupePartage,
    setDesignGroupePartage,
    handleOpenAudienceModal,
    handleCloseAudienceModal,
    handleSelectAudience,
  };
};
