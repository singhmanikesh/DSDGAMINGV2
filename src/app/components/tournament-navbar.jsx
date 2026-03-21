import { Link } from 'react-router-dom';
import tournamentLogo from '../../assets/tournnament.png';
import { useState, useEffect } from 'react';

export function TournamentNavbar() {
  const [user, setUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('dsd_user');
      if (raw) setUser(JSON.parse(raw));
    } catch (e) {
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('dsd_user');
    localStorage.removeItem('dsd_user_id');
    localStorage.removeItem('accesstoken');
    localStorage.removeItem('refreshtoken');
    localStorage.removeItem('dsd_access_token');
    localStorage.removeItem('dsd_refresh_token');
    setUser(null);
    window.location.href = '/tournaments';
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

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-[#FF4D00] p-3 mr-4"
            aria-label="Toggle menu"
          >
            {!mobileOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>

          {/* Right Navigation - Limited for tournament pages */}
          <div className="hidden md:flex items-center space-x-6 ml-auto pr-6">
            <Link
              to="/"
              className="text-[#FF4D00] hover:text-[#FFD700] transition-colors duration-200 font-bold text-sm uppercase tracking-wide"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
            >
              Home
            </Link>

            <a
              href="/#contact"
              className="text-[#FF4D00] hover:text-[#FFD700] transition-colors duration-200 font-bold text-sm uppercase tracking-wide"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
            >
              Contact
            </a>

            {!user && (
              <Link
                to="/tournament/login"
                className="px-4 py-2 border border-[#FF4D00] text-[#FF4D00] rounded-full font-semibold text-sm uppercase tracking-wide hover:bg-[#FF4D00] hover:text-white transition-all"
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
              >
                Register / Login
              </Link>
            )}

            {user && (
              <div className="flex items-center gap-3">
                <Link to="/profile" className="text-sm text-white font-semibold">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 bg-[#1a1a1f] text-[#FF4D00] rounded-full font-semibold text-sm border border-[#26262B] hover:bg-[#26262B] transition-all"
                  style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        
          {/* Mobile Menu */}
          {mobileOpen && (
            <div className="md:hidden fixed top-24 left-0 right-0 z-50 bg-[#0b0b0f] border-t border-[#FF4D00]/20 shadow-lg">
              <div className="flex flex-col divide-y divide-gray-800">
                <div className="px-4 py-4">
                  <Link to="/" className="block w-full text-left text-[#FF4D00] font-bold uppercase py-3" onClick={() => setMobileOpen(false)}>Home</Link>
                  <a href="/#contact" className="block w-full text-left text-[#FF4D00] font-bold uppercase py-3" onClick={() => setMobileOpen(false)}>Contact</a>
                </div>
                <div className="px-4 py-4">
                  {!user && (
                    <Link to="/tournament/login" className="block w-full text-left text-[#FF4D00] font-bold uppercase py-3" onClick={() => setMobileOpen(false)}>Register / Login</Link>
                  )}

                  {user && (
                    <>
                      <Link to="/profile" className="block w-full text-left text-[#FF4D00] font-bold uppercase py-3" onClick={() => setMobileOpen(false)}>Profile</Link>
                      <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="block w-full text-left text-[#FF4D00] font-bold uppercase py-3">Logout</button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}