import { Link, useLocation } from 'react-router';
import tournamentLogo from '../../assets/tournnament.png';

export function TournamentNavbar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black shadow-lg">
      <div className="max-w-full mx-auto">
        <div className="flex items-center justify-between h-24 px-0">
          {/* Logo - Left Side */}
          <div className="flex items-center pl-4">
            <Link to="/">
              <img src={tournamentLogo} alt="DSD Gaming" className="h-16 w-auto object-contain" />
            </Link>
          </div>

          {/* Right Navigation */}
          <div className="hidden md:flex items-center space-x-8 ml-auto pr-4">
            <Link
              to="/"
              className="text-[#FF4D00] hover:text-[#FFD700] transition-colors duration-200 font-bold text-sm uppercase tracking-wide"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
            >
              Home
            </Link>
            
            <a
              href="#offers"
              className="text-[#FF4D00] hover:text-[#FFD700] transition-colors duration-200 font-bold text-sm uppercase tracking-wide"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
            >
              Offers
            </a>
            
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
            <button
              className="px-6 py-3 bg-[#FF4D00] text-white rounded-full font-bold text-sm uppercase tracking-wide hover:bg-[#FFD700] hover:shadow-[0_0_20px_rgba(255,215,0,0.5)] transition-all duration-300"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, transform: 'scale(0.92)' }}
            >
              Book a PC
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}