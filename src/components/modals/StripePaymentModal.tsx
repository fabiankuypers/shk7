import React, { useState, useEffect } from 'react';
import { X, CreditCard, Shield, Check } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';

interface StripePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const stripePromise = loadStripe('pk_live_51P5HBEK3uE2SBg2ea1uY2higpxXgWVstUGLhQfVul2rgMozSFujGK2JSYhuEbH5owAfqLeve3ySQ7TgpK0e429z900VZO2JEXv');

const StripePaymentModal: React.FC<StripePaymentModalProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handlePayment = async () => {
    setIsLoading(true);
    
    try {
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe konnte nicht geladen werden');
      }

      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({
        lineItems: [{
          price: 'price_1QQQQQExample', // This would be your actual price ID from Stripe
          quantity: 1,
        }],
        mode: 'subscription',
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/`,
        customerEmail: undefined, // Let customer enter email
        locale: 'de',
      });

      if (error) {
        console.error('Stripe error:', error);
        // For now, redirect directly to the payment link
        window.open('https://buy.stripe.com/eVq14ofeI0NAesv46XcV203', '_blank');
      }
    } catch (error) {
      console.error('Payment error:', error);
      // Fallback to direct link
      window.open('https://buy.stripe.com/eVq14ofeI0NAesv46XcV203', '_blank');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-blue-600 to-blue-800 px-6 py-8 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
              <CreditCard className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold mb-2">SHK Community</h2>
            <p className="text-blue-100 text-sm">Mitgliedschaft abschließen</p>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          {/* Offer Details */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 mb-6 border border-green-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-bold text-gray-900">90 Tage kostenfrei</h3>
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Testphase
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-3">Dann €9,00 pro Monat</p>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Communities - SHK Community</span>
                <span className="font-medium">90 Tage frei</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span></span>
                <span>€9,00 / Monat danach</span>
              </div>
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
            <div className="flex justify-between">
              <span className="text-gray-600">Zwischensumme</span>
              <span className="font-medium">€0,00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Steuer</span>
              <span className="font-medium">€0,00</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Gesamt nach Testphase</span>
              <span>€9,00</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Heute fällig</span>
              <span className="text-green-600">€0,00</span>
            </div>
          </div>

          {/* Features */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Ihre Vorteile:</h4>
            <div className="space-y-2">
              {[
                'Zugang zu exklusiven Netzwerktreffen',
                'Fachlicher Austausch mit SHK-Profis',
                'Geprüfte Qualitätsdienstleister',
                'Digitalisierungs-Tools und -Beratung'
              ].map((feature, index) => (
                <div key={index} className="flex items-center text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Button */}
          <button
            onClick={handlePayment}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Wird geladen...
              </div>
            ) : (
              'Jetzt 90 Tage kostenfrei testen'
            )}
          </button>

          {/* Security Notice */}
          <div className="mt-4 flex items-center justify-center text-xs text-gray-500">
            <Shield className="w-4 h-4 mr-1" />
            <span>Sicher bezahlen mit Stripe</span>
          </div>

          {/* Terms */}
          <div className="mt-4 text-xs text-gray-500 text-center leading-relaxed">
            Nach Ihrer Testphase werden Ihnen €9,00 pro Monat berechnet, 
            beginnend am {new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString('de-DE')}. 
            Sie können jederzeit vor diesem Datum kündigen.
          </div>

          {/* Footer Links */}
          <div className="mt-6 flex justify-center space-x-4 text-xs">
            <a href="/datenschutz" className="text-blue-600 hover:text-blue-800 transition-colors">
              Datenschutz
            </a>
            <span className="text-gray-300">•</span>
            <a href="/impressum" className="text-blue-600 hover:text-blue-800 transition-colors">
              Impressum
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StripePaymentModal;