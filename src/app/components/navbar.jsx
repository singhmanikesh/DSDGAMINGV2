import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { Menu, X, ChevronDown } from 'lucide-react';
import foxCharacter from '../../assets/fox charcter left to dsd logo.png';
import dsdLogo from '../../assets/DSD logo nav bar.png';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [offersDropdownOpen, setOffersDropdownOpen] = useState(false);
  const [mobileOffersOpen, setMobileOffersOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const offerLinks = [
    { name: 'Bootcamp', path: '/bootcamp' },
    { name: 'Birthday Parties', path: '/birthday' },
    { name: 'Schools', path: '/schools' },
    { name: 'Space Rental', path: '/space-rental' },
    { name: 'Streaming', path: '/streaming' },
    { name: 'Board Games', path: '/board-games' },
  ];

  const handleHomeClick = () => {
    navigate('/');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black shadow-lg">
      <div className="max-w-full mx-auto">
        <div className="flex items-center justify-between h-[82px] md:h-[95px] px-4">
          {/* Logo */}
          <div className="flex items-center gap-0">
            {/* <img src={foxCharacter} alt="DSD Character" className="h-[70px] md:h-[140px] w-[120px] md:w-[140px] object-contain" /> */}
            <img src={dsdLogo} alt="DSD Premium Logo" className="h-[100px] md:h-[150px] w-auto object-contain -ml-4 md:ml-5" />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#FF4D00] p-3"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 ml-auto pr-4">
            <a
              href="#home"
              onClick={handleHomeClick}
              className="text-[#FF4D00] hover:text-[#FFD700] transition-colors duration-200 font-bold text-sm uppercase tracking-wide"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
            >
              Home
            </a>
            <div className="relative">
              <button
                onClick={() => setOffersDropdownOpen(!offersDropdownOpen)}
                className="text-[#FF4D00] hover:text-[#FFD700] transition-colors duration-200 font-bold text-sm uppercase tracking-wide"
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
              >
                Offers
                <ChevronDown size={16} className="inline-block ml-1" />
              </button>
              {offersDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#111118] border border-[#FF4D00]/20 rounded-md shadow-lg">
                  <ul className="py-1">
                    {offerLinks.map((link) => (
                      <li key={link.path}>
                        <Link
                          to={link.path}
                          className="block px-4 py-2 text-sm text-[#FF4D00] hover:bg-[#FF4D00]/20"
                          style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <Link
              to="/tournaments"
              className="text-[#FF4D00] hover:text-[#FFD700] transition-colors duration-200 font-bold text-sm uppercase tracking-wide"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
            >
              Tournaments
            </Link>
            <a
              href="#pricing"
              className="text-[#FF4D00] hover:text-[#FFD700] transition-colors duration-200 font-bold text-sm uppercase tracking-wide"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
            >
              Pricing
            </a>
            <a
              href="#about"
              className="text-[#FF4D00] hover:text-[#FFD700] transition-colors duration-200 font-bold text-sm uppercase tracking-wide"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
            >
              About
            </a>
            <a
              href="#contact"
              className="text-[#FF4D00] hover:text-[#FFD700] transition-colors duration-200 font-bold text-sm uppercase tracking-wide"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
            >
              Contact
            </a>
            
            {/* CTA Button */}
            <a
              href="http://wa.me/919538585761"
              target="_blank"
              rel="noopener noreferrer"
              className="px-9 py-4 bg-[#FF4D00] text-white rounded-full font-bold text-base uppercase tracking-wide hover:bg-[#FFD700] hover:shadow-[0_0_20px_rgba(255,215,0,0.5)] transition-all duration-300"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, transform: 'scale(0.92)' }}
            >
              Book a PC
            </a>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#111118] border-t border-[#FF4D00]/20">
            <div className="flex flex-col space-y-4 px-4 py-6">
              <a
                href="#home"
                onClick={handleHomeClick}
                className="text-[#FF4D00] hover:text-[#FFD700] transition-colors duration-200 font-bold text-sm uppercase tracking-wide"
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
              >
                Home
              </a>
              <div className="relative">
                <button
                  onClick={() => setMobileOffersOpen(!mobileOffersOpen)}
                  className="text-[#FF4D00] hover:text-[#FFD700] transition-colors duration-200 font-bold text-sm uppercase tracking-wide"
                  style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
                >
                  Offers
                  <ChevronDown size={16} className="inline-block ml-1" />
                </button>
                {mobileOffersOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#111118] border border-[#FF4D00]/20 rounded-md shadow-lg">
                    <ul className="py-1">
                      {offerLinks.map((link) => (
                        <li key={link.path}>
                          <Link
                            to={link.path}
                            className="block px-4 py-2 text-sm text-[#FF4D00] hover:bg-[#FF4D00]/20"
                            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
                          >
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <Link
                to="/tournaments"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#FF4D00] hover:text-[#FFD700] transition-colors duration-200 font-bold text-sm uppercase tracking-wide"
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
              >
                Tournaments
              </Link>
              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#FF4D00] hover:text-[#FFD700] transition-colors duration-200 font-bold text-sm uppercase tracking-wide"
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
              >
                Pricing
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#FF4D00] hover:text-[#FFD700] transition-colors duration-200 font-bold text-sm uppercase tracking-wide"
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
              >
                About
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#FF4D00] hover:text-[#FFD700] transition-colors duration-200 font-bold text-sm uppercase tracking-wide"
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
              >
                Contact
              </a>
              
              {/* Mobile CTA Button */}
              <a
                href="http://wa.me/919538585761"
                target="_blank"
                rel="noopener noreferrer"
                className="px-9 py-4 bg-[#FF4D00] text-white rounded-full font-bold text-base uppercase tracking-wide hover:bg-[#FFD700] transition-all duration-300 mt-2 text-center"
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
              >
                Book a PC
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}