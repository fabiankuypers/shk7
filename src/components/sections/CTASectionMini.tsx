import React, { useState } from 'react';
import Button from '../ui/Button';
import StripePaymentModal from '../modals/StripePaymentModal';

const CTASectionMini: React.FC = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handleCTAClick = () => {
    setIsPaymentModalOpen(true);
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
          <span className="text-lg font-semibold">Jetzt Mitglied werden</span>
          <span className="text-sm font-normal opacity-80">
            3 Monate kostenfrei – danach 9 €/Monat
          </span>
        </Button>
      </div>

      <StripePaymentModal 
        isOpen={isPaymentModalOpen} 
        onClose={() => setIsPaymentModalOpen(false)} 
      />
    </>
  );
};

export default CTASectionMini;