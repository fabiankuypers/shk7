import React, { useState } from 'react';
import Button from '../ui/Button';
import ContactModal from '../modals/ContactModal';

const CTASectionMini: React.FC = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleCTAClick = () => {
    setIsContactModalOpen(true);
  };

  return (
    <>
      <div className="flex justify-center mb-16">
        <Button
          variant="primary"
          size="lg"
          onClick={handleCTAClick}
          animate={true}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-lg font-semibold">Jetzt Kontakt aufnehmen</span>
          <span className="text-sm font-normal opacity-80">
            Kostenlose Beratung
          </span>
        </Button>
      </div>

      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </>
  );
};

export default CTASectionMini;