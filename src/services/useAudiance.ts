import { useState } from 'react';

export const useAudience = () => {
  const [selectedAudience, setSelectedAudience] = useState<'Public' | 'Groupe'>('Public');
  const [designGroupePartage, setDesignGroupePartage] = useState('');
  const [isAudienceModalOpen, setIsAudienceModalOpen] = useState(false);

  const handleOpenAudienceModal = () => setIsAudienceModalOpen(true);
  const handleCloseAudienceModal = () => setIsAudienceModalOpen(false);
  const handleSelectAudience = (audience: 'Public' | 'Groupe') => setSelectedAudience(audience);

  return {
    selectedAudience,
    designGroupePartage,
    setDesignGroupePartage,
    isAudienceModalOpen,
    handleOpenAudienceModal,
    handleCloseAudienceModal,
    handleSelectAudience,
  };
};
