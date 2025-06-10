import React, { useState, useEffect } from 'react';
import { X, CreditCard, Shield, Check, Sparkles, Users } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

interface StripePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const stripePromise = loadStripe('pk_live_51P5HBEK3uE2SBg2ea1uY2higpxXgWVstUGLhQfVul2rgMozSFujGK2JSYhuEbH5owAfqLeve3ySQ7TgpK0e429z900VZO2JEXv');

// Success Modal Component
const SuccessModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto overflow-hidden">
        <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 px-6 py-8 text-white text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4">
            <Check className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Willkommen in der Community!</h2>
          <p className="text-green-100">Ihre Anmeldung war erfolgreich</p>
        </div>

        <div className="px-6 py-6">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Ihre 90-tägige Testphase beginnt jetzt!
            </h3>
            <p className="text-gray-600 mb-4">
              Sie erhalten in Kürze eine Bestätigungs-E-Mail mit Ihren Zugangsdaten und weiteren Informationen.
            </p>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 mb-6">
            <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
              <Sparkles className="w-5 h-5 mr-2" />
              Was passiert als Nächstes?
            </h4>
            <div className="space-y-2 text-sm text-blue-800">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Bestätigungs-E-Mail mit Zugangsdaten</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Einladung zu regionalen Netzwerktreffen</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Zugang zur exklusiven Community-Plattform</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200"
          >
            Verstanden
          </button>

          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              Bei Fragen erreichen Sie uns unter{' '}
              <a href="mailto:info@digitalwerk.solutions" className="text-blue-600 hover:text-blue-800">
                info@digitalwerk.solutions
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Payment Form Component
const PaymentForm: React.FC<{ onSuccess: () => void; onClose: () => void }> = ({ onSuccess, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError('Kreditkartenfeld nicht gefunden');
      setIsLoading(false);
      return;
    }

    try {
      // TEMPORÄR: Für Test Mode verwenden wir den Test Payment Link
      // Das wird später durch die echte Integration ersetzt
      console.log('Test Mode: Weiterleitung zum Test Payment Link');
      
      // Öffne Test Payment Link
      window.open('https://buy.stripe.com/test_7sY00keaE3ZMckn9rhcV200', '_blank');
      
      // Simuliere Erfolg nach kurzer Verzögerung
      setTimeout(() => {
        onSuccess();
      }, 2000);

      /* 
      // PRODUKTIV: Diese Implementierung wird später aktiviert
      
      // Create payment method
      const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: name,
          email: email,
        },
      });

      if (paymentMethodError) {
        setError(paymentMethodError.message || 'Ein Fehler bei der Zahlungsmethode ist aufgetreten');
        setIsLoading(false);
        return;
      }

      // Create payment intent on your backend
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payment_method_id: paymentMethod.id,
          email: email,
          name: name,
          company: company,
          amount: 0, // 0 for trial, will be 900 cents (9 EUR) for subscription
        }),
      });

      const paymentIntent = await response.json();

      if (paymentIntent.error) {
        setError(paymentIntent.error);
        setIsLoading(false);
        return;
      }

      // Confirm payment if needed
      if (paymentIntent.requires_action) {
        const { error: confirmError } = await stripe.confirmCardPayment(
          paymentIntent.client_secret
        );

        if (confirmError) {
          setError(confirmError.message || 'Zahlung konnte nicht bestätigt werden');
          setIsLoading(false);
          return;
        }
      }

      // Success!
      onSuccess();
      */
      
    } catch (err) {
      console.error('Payment error:', err);
      setError('Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut.');
    } finally {
      setIsLoading(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#374151',
        fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
        '::placeholder': {
          color: '#9CA3AF',
        },
        iconColor: '#6B7280',
      },
      invalid: {
        color: '#EF4444',
        iconColor: '#EF4444',
      },
    },
    hidePostalCode: true,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-blue-600 to-blue-800 px-6 py-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 rounded-full mb-3">
              <Users className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold mb-1">SHK + Haustechnik Community</h2>
            <p className="text-blue-100 text-sm">90 Tage kostenfrei testen</p>
            
            {/* Test Mode Indicator */}
            <div className="mt-3 inline-flex items-center px-3 py-1 bg-yellow-500/20 border border-yellow-400/30 rounded-full">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></div>
              <span className="text-xs font-medium text-yellow-100">Test Mode</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6">
          {/* Test Mode Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-yellow-800">!</span>
                </div>
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-yellow-800 mb-1">Test Modus aktiv</h4>
                <p className="text-xs text-yellow-700">
                  Sie werden zum Stripe Test Checkout weitergeleitet. Verwenden Sie Testkreditkarten wie 4242 4242 4242 4242.
                </p>
              </div>
            </div>
          </div>

          {/* Offer Highlight */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 mb-6 border border-green-200">
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-900 mb-1">90 Tage kostenfrei</h3>
              <p className="text-sm text-gray-600 mb-3">Dann €9,00 pro Monat</p>
              
              <div className="flex justify-between text-sm border-t border-green-200 pt-3">
                <span className="text-gray-600">Heute fällig:</span>
                <span className="font-bold text-green-600 text-lg">€0,00</span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4 mb-6">
            <h4 className="font-semibold text-gray-900">Kontaktdaten</h4>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                E-Mail-Adresse *
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="ihre@email.de"
              />
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Vollständiger Name *
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Max Mustermann"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                Unternehmen
              </label>
              <input
                type="text"
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Mustermann SHK GmbH"
              />
            </div>
          </div>

          {/* Payment Information */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Zahlungsinformationen</h4>
            <div className="border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
              <CardElement options={cardElementOptions} />
            </div>
            <p className="text-xs text-gray-500 mt-2 flex items-center">
              <Shield className="w-3 h-3 mr-1" />
              Ihre Zahlungsdaten werden sicher über Stripe verarbeitet
            </p>
          </div>

          {/* Features Preview */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Ihre Vorteile:</h4>
            <div className="grid grid-cols-1 gap-2">
              {[
                'Regionale Netzwerktreffen',
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

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!stripe || isLoading || !email || !name}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Weiterleitung zu Stripe...
              </div>
            ) : (
              'Jetzt 90 Tage kostenfrei starten'
            )}
          </button>

          {/* Terms */}
          <div className="mt-4 text-xs text-gray-500 text-center leading-relaxed">
            Nach Ihrer Testphase werden Ihnen €9,00 pro Monat berechnet. 
            Sie können jederzeit kündigen. Mit der Anmeldung stimmen Sie unseren{' '}
            <a href="/datenschutz" className="text-blue-600 hover:text-blue-800">
              Datenschutzbestimmungen
            </a> zu.
          </div>
        </form>
      </div>
    </div>
  );
};

// Main Modal Component
const StripePaymentModal: React.FC<StripePaymentModalProps> = ({ isOpen, onClose }) => {
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setShowSuccess(false);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSuccess = () => {
    setShowSuccess(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <Elements stripe={stripePromise}>
        {!showSuccess && (
          <PaymentForm onSuccess={handleSuccess} onClose={onClose} />
        )}
      </Elements>
      
      <SuccessModal isOpen={showSuccess} onClose={handleCloseSuccess} />
    </>
  );
};

export default StripePaymentModal;