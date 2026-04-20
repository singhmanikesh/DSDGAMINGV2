import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PreRegisterModal } from './pre-register-modal';

export function Hero() {
  const navigate = useNavigate();
  const [isPreRegisterModalOpen, setIsPreRegisterModalOpen] = useState(false);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden mt-16 md:mt-20">
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
            src="https://res.cloudinary.com/dlzzdud8k/video/upload/v1772683633/Character_GIF_for_Website_Hero_Section_xt7e8o.mp4"
            type="video/mp4"
          />
        </video>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-[#0B0B0F]/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1700px] mx-auto px-5 md:px-10 lg:px-14 py-16 sm:py-24 md:py-32">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-12 items-center">
          {/* Left Column - Text and CTAs */}
          <div className="space-y-6 sm:space-y-8 text-left lg:max-w-3xl">
            <div className="space-y-3 sm:space-y-4">
              <h1
                className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold text-white"
                style={{ fontFamily: 'Russo One, sans-serif', fontWeight: 800 }}
              >
                Experience
                <br />
                <span className="text-[#7C3AED]">Gaming at the</span>
                <br />
                 Next Level
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-[#A0A0A0] font-medium" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}>
                Premium PCs • Daily Tournaments • Pro Gaming Setup
              </p>

              <p className="text-sm sm:text-base md:text-lg text-[#A0A0A0] font-medium" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}>
                Elite Hardware Found in Only 1% of Gaming Cafes Worldwide
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 md:gap-4 justify-start">
              <button
                onClick={() => navigate('/tournaments')}
                className="px-4 md:px-5 lg:px-6 py-3 sm:py-3.5 bg-transparent border-2 border-[#FF4D00] text-white rounded-full font-bold text-sm sm:text-base md:text-lg hover:bg-[#FF4D00]/20 hover:shadow-[0_0_16px_rgba(255,77,0,0.35)] transition-all duration-300"
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
              >
                View Tournaments
              </button>
                    {/* // closing pre registration  */}
              {/* <button
                onClick={() => setIsPreRegisterModalOpen(true)}
                className="px-4 md:px-5 lg:px-6 py-3 sm:py-3.5 bg-gradient-to-r from-[#FF4D00] to-[#FF6A00] text-white rounded-full font-bold text-sm sm:text-base md:text-lg hover:shadow-[0_0_22px_rgba(255,77,0,0.5)] transition-all duration-300 transform hover:scale-105"
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
              >
                Pre-Register Now
              </button> */}
            </div>
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