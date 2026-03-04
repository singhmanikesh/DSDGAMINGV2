import { Phone, Trophy, Monitor } from 'lucide-react';
import { useState, useEffect } from 'react';

export function FloatingBar() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Keep the bar always visible
      setVisible(true);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-[60] transition-all duration-500 w-[95%] sm:w-auto max-w-[600px] ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-black/80 backdrop-blur-xl border border-[#26262B] rounded-full px-3 sm:px-6 py-3 sm:py-4 shadow-[0_0_40px_rgba(0,0,0,0.8)] hover:shadow-[0_0_50px_rgba(255,77,0,0.3)] transition-all duration-300">
        <div className="flex items-center justify-center gap-2 sm:gap-4">
          {/* Call Us */}
          <button
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 bg-[#141419] text-white rounded-full font-semibold hover:bg-[#26262B] hover:text-[#FF4D00] transition-all duration-300 border border-[#26262B] hover:border-[#FF4D00] text-xs sm:text-base"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
          >
            <Phone size={16} className="sm:w-[18px] sm:h-[18px]" />
            <span className="hidden xs:inline sm:inline">Call</span>
          </button>

          {/* Register Tournament */}
          <button
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-[#FF4D00] to-[#FF6A00] text-white rounded-full font-semibold hover:shadow-[0_0_20px_rgba(255,77,0,0.6)] transition-all duration-300 transform hover:scale-105 text-xs sm:text-base whitespace-nowrap"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
          >
            <Trophy size={16} className="sm:w-[18px] sm:h-[18px]" />
            <span className="hidden xs:inline">Register</span>
            <span className="hidden sm:inline">Tournament</span>
          </button>

          {/* Book PC */}
          <a
            href="http://wa.me/919538585761"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 bg-[#141419] text-white rounded-full font-semibold hover:bg-[#26262B] hover:text-[#FF4D00] transition-all duration-300 border border-[#26262B] hover:border-[#FF4D00] text-xs sm:text-base"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
          >
            <Monitor size={16} className="sm:w-[18px] sm:h-[18px]" />
            <span className="hidden xs:inline sm:inline">Book PC</span>
          </a>
        </div>
      </div>
    </div>
  );
}