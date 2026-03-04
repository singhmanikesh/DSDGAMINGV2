import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { PreRegisterModal } from './pre-register-modal';

function CyberGamerMascot() {
  return (
    <svg
      viewBox="0 0 400 500"
      className="w-full h-auto max-w-[500px] drop-shadow-[0_0_50px_rgba(255,77,0,0.3)]"
    >
      {/* Glow effect */}
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FF6A00" />
          <stop offset="100%" stopColor="#FF4D00" />
        </linearGradient>
      </defs>

      {/* Body - dark gaming hoodie */}
      <path
        d="M 200 220 L 150 240 L 140 350 L 140 420 L 170 480 L 230 480 L 260 420 L 260 350 L 250 240 Z"
        fill="#1a1a1f"
        stroke="#FF4D00"
        strokeWidth="2"
      />

      {/* RGB lights on hoodie */}
      <circle cx="165" cy="280" r="4" fill="#00FFFF" filter="url(#glow)" />
      <circle cx="185" cy="290" r="4" fill="#FF00FF" filter="url(#glow)" />
      <circle cx="205" cy="285" r="4" fill="#00FF00" filter="url(#glow)" />
      <circle cx="225" cy="295" r="4" fill="#FF4D00" filter="url(#glow)" />
      <circle cx="235" cy="280" r="4" fill="#FFD700" filter="url(#glow)" />

      {/* Arms */}
      <path d="M 150 240 L 100 280 L 90 320 L 110 340 L 140 300" fill="#1a1a1f" stroke="#FF4D00" strokeWidth="2" />
      <path d="M 250 240 L 300 280 L 310 320 L 290 340 L 260 300" fill="#1a1a1f" stroke="#FF4D00" strokeWidth="2" />

      {/* Gaming controller in left hand */}
      <rect x="85" y="315" width="35" height="25" rx="5" fill="#2a2a2f" stroke="#FF4D00" strokeWidth="2" />
      <circle cx="95" cy="327" r="3" fill="#FF4D00" />
      <circle cx="110" cy="327" r="3" fill="#00FFFF" />

      {/* Mouse in right hand */}
      <path d="M 290 320 L 310 320 L 315 340 L 285 340 Z" fill="#2a2a2f" stroke="#FF4D00" strokeWidth="2" />
      <circle cx="300" cy="330" r="2" fill="#FF6A00" filter="url(#glow)" />

      {/* Head/Helmet */}
      <circle cx="200" cy="150" r="70" fill="#0f0f14" stroke="#FF4D00" strokeWidth="3" />

      {/* Visor - glowing orange */}
      <path
        d="M 140 140 Q 200 125 260 140 L 260 165 Q 200 175 140 165 Z"
        fill="url(#orangeGradient)"
        opacity="0.9"
        filter="url(#glow)"
      />

      {/* Visor reflections */}
      <path d="M 150 145 Q 180 135 210 140" stroke="#FFD700" strokeWidth="2" opacity="0.6" fill="none" />

      {/* RGB Headset */}
      <rect x="120" y="140" width="15" height="40" rx="7" fill="#1a1a1f" stroke="#FF4D00" strokeWidth="2" />
      <rect x="265" y="140" width="15" height="40" rx="7" fill="#1a1a1f" stroke="#FF4D00" strokeWidth="2" />

      {/* RGB lights on headset */}
      <circle cx="127" cy="155" r="5" fill="#00FFFF" filter="url(#glow)" />
      <circle cx="127" cy="170" r="5" fill="#FF00FF" filter="url(#glow)" />
      <circle cx="272" cy="155" r="5" fill="#00FFFF" filter="url(#glow)" />
      <circle cx="272" cy="170" r="5" fill="#FF00FF" filter="url(#glow)" />

      {/* Microphone */}
      <path d="M 120 165 L 100 190 L 105 195" stroke="#FF4D00" strokeWidth="3" fill="none" />
      <circle cx="105" cy="197" r="6" fill="#1a1a1f" stroke="#FF4D00" strokeWidth="2" />

      {/* Antenna on helmet */}
      <line x1="200" y1="80" x2="200" y2="60" stroke="#FF4D00" strokeWidth="3" />
      <circle cx="200" cy="55" r="6" fill="#FF6A00" filter="url(#glow)" />

      {/* Neck connection */}
      <rect x="185" y="210" width="30" height="20" fill="#1a1a1f" stroke="#FF4D00" strokeWidth="2" />

      {/* Energy lines */}
      <path d="M 200 220 L 200 250" stroke="#FF6A00" strokeWidth="2" opacity="0.6" />
    </svg>
  );
}

export function Hero() {
  const navigate = useNavigate();
  const [isPreRegisterModalOpen, setIsPreRegisterModalOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden mt-16 md:mt-20">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Crect width='1920' height='1080' fill='%230B0B0F'/%3E%3C/svg%3E"
        >
          <source
            src="https://res.cloudinary.com/dlzzdud8k/video/upload/v1772428363/GIF_Creation_Request_Fulfilled_vb88o4.mp4"
            type="video/mp4"
          />
        </video>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-[#0B0B0F]/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-24 md:py-32">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left Column - Text and CTAs */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left" style={{ transform: isDesktop ? 'translateX(-20%)' : 'translateX(0)' }}>
            <div className="space-y-3 sm:space-y-4">
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight"
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800 }}
              >
                Experience Gaming at the Next Level
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-[#A0A0A0] font-medium" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}>
                Premium PCs • Daily Tournaments • Pro Gaming Setup
              </p>

              <p className="text-sm sm:text-base md:text-lg text-[#A0A0A0] font-medium" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}>
                Elite Hardware Found in Only 1% of Gaming Cafes Worldwide
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <button
                onClick={() => navigate('/tournaments')}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-[#FF4D00] text-white rounded-full font-bold hover:bg-[#FF4D00]/20 hover:shadow-[0_0_20px_rgba(255,77,0,0.4)] transition-all duration-300"
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
              >
                View Tournaments
              </button>
              
              <button
                onClick={() => setIsPreRegisterModalOpen(true)}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#FF4D00] to-[#FF6A00] text-white rounded-full font-bold hover:shadow-[0_0_30px_rgba(255,77,0,0.6)] transition-all duration-300 transform hover:scale-105"
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
              >
                Pre-Register Now
              </button>
            </div>
          </div>

          {/* Right Column - Mascot */}
          <div className="flex items-center justify-center lg:justify-end">
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-[#FF4D00] rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-[#FF4D00] rounded-full animate-bounce"></div>
        </div>
      </div>

      {/* Pre-Register Modal */}
      <PreRegisterModal 
        isOpen={isPreRegisterModalOpen} 
        onClose={() => setIsPreRegisterModalOpen(false)} 
      />
    </section>
  );
}