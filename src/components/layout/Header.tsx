import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Users, ArrowLeft } from 'lucide-react';
import Container from '../ui/Container';
import Button from '../ui/Button';
import ContactModal from '../modals/ContactModal';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCTAClick = () => {
    setIsContactModalOpen(true);
  };

  // Scroll to top when navigating to subpages
  useEffect(() => {
    if (!isHomePage) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, isHomePage]);

  return (
    <>
      <header
        className={`fixed w-full z-40 transition-all duration-500 ease-in-out ${
          isHomePage && !isScrolled 
            ? 'bg-transparent backdrop-blur-none shadow-none' 
            : 'bg-white/95 backdrop-blur-md shadow-md'
        }`}
      >
        <Container>
          <div className="flex items-center justify-between py-3">
            {/* Logo / Back Button */}
            <div className="flex items-center">
              {!isHomePage ? (
                <Link
                  to="/"
                  className={`flex items-center transition-colors group mr-4 ${
                    isHomePage && !isScrolled 
                      ? 'text-white hover:text-blue-100' 
                      : 'text-blue-700 hover:text-blue-900'
                  }`}
                >
                  <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                  <span className="font-medium hidden md:inline">Zurück zur Startseite</span>
                  <span className="font-medium md:hidden">Zurück</span>
                </Link>
              ) : null}
              
              <Link to="/" className="flex items-center">
                <Users className={`h-8 w-8 transition-colors ${
                  isHomePage && !isScrolled ? 'text-white' : 'text-blue-700'
                }`} />
                <span className={`ml-2 text-xl font-bold transition-colors hidden sm:inline ${
                  isHomePage && !isScrolled ? 'text-white' : 'text-blue-900'
                }`}>
                  SHK + Haustechnik Community
                </span>
                <span className={`ml-2 text-lg font-bold transition-colors sm:hidden ${
                  isHomePage && !isScrolled ? 'text-white' : 'text-blue-900'
                }`}>
                  SHK Community
                </span>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="flex items-center space-x-4">
              {isHomePage && (
                <div className="hidden md:flex items-center space-x-6 mr-4">
                  <a 
                    href="#vorteile" 
                    className={`font-medium transition-colors ${
                      !isScrolled ? 'text-white hover:text-blue-100' : 'text-gray-700 hover:text-blue-700'
                    }`}
                  >
                    Vorteile
                  </a>
                  <a 
                    href="#testimonials" 
                    className={`font-medium transition-colors ${
                      !isScrolled ? 'text-white hover:text-blue-100' : 'text-gray-700 hover:text-blue-700'
                    }`}
                  >
                    Erfahrungen
                  </a>
                  <a 
                    href="#faq" 
                    className={`font-medium transition-colors ${
                      !isScrolled ? 'text-white hover:text-blue-100' : 'text-gray-700 hover:text-blue-700'
                    }`}
                  >
                    FAQ
                  </a>
                </div>
              )}
              
              <Button 
                variant="primary" 
                onClick={handleCTAClick}
                animate={isHomePage}
                size={isHomePage ? "md" : "sm"}
              >
                Kontakt aufnehmen
              </Button>
            </nav>
          </div>
        </Container>
      </header>

      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </>
  );
};

export default Header;