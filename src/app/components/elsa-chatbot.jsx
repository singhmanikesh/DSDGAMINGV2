import { useState } from 'react';
import { X, MapPin, DollarSign, Trophy, Gamepad2, Coffee, Send } from 'lucide-react';
import elsaAvatar from '../../assets/fox charcter left to dsd logo.png';

export function ElsaChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [screen, setScreen] = useState('greeting'); // 'greeting' or 'options'
  const [userName, setUserName] = useState('');
  const [inputName, setInputName] = useState('');

  const quickOptions = [
    {
      icon: MapPin,
      label: 'Cafe Location',
      action: () => {
        setIsOpen(false);
        const mapSection = document.getElementById('map');
        if (mapSection) {
          mapSection.scrollIntoView({ behavior: 'smooth' });
        }
      },
    },
    {
      icon: DollarSign,
      label: 'Pricing',
      action: () => {
        setIsOpen(false);
        const pricingSection = document.getElementById('pricing');
        if (pricingSection) {
          pricingSection.scrollIntoView({ behavior: 'smooth' });
        }
      },
    },
    {
      icon: Trophy,
      label: 'Tournaments',
      action: () => {
        setIsOpen(false);
        window.location.href = '/tournaments';
      },
    },
    {
      icon: Gamepad2,
      label: 'Book a Setup',
      action: () => {
        setIsOpen(false);
        window.open('http://wa.me/919538585761', '_blank', 'noopener,noreferrer');
      },
    },
    {
      icon: Coffee,
      label: 'Our Services',
      action: () => {
        setIsOpen(false);
        const offersSection = document.getElementById('offers');
        if (offersSection) {
          offersSection.scrollIntoView({ behavior: 'smooth' });
        }
      },
    },
  ];

  const handleContinue = () => {
    if (inputName.trim()) {
      setUserName(inputName.trim());
      setScreen('options');
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    // Reset after animation
    setTimeout(() => {
      setScreen('greeting');
      setUserName('');
      setInputName('');
    }, 300);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-black border-2 border-[#FF4D00] shadow-[0_0_30px_rgba(255,77,0,0.6)] hover:shadow-[0_0_40px_rgba(255,77,0,0.8)] transition-all duration-300 hover:scale-110 ${
          isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
        aria-label="Open chat with Elsa"
      >
        <img
          src={elsaAvatar}
          alt="Elsa"
          className="w-full h-full object-cover rounded-full p-1"
        />
        {/* Pulse animation */}
        <span className="absolute inset-0 rounded-full border-2 border-[#FF4D00] animate-ping opacity-75"></span>
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-[90vw] max-w-[360px] transition-all duration-300 ${
          isOpen
            ? 'scale-100 opacity-100 translate-y-0'
            : 'scale-95 opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="bg-[#111118] rounded-2xl shadow-[0_0_50px_rgba(255,77,0,0.4)] border-2 border-[#FF4D00]/30 overflow-hidden">
          {/* Chat Header */}
          <div className="relative bg-gradient-to-r from-[#FF4D00] to-red-600 p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-black border-2 border-white shadow-lg overflow-hidden flex-shrink-0">
                <img
                  src={elsaAvatar}
                  alt="Elsa"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3
                  className="text-white text-lg font-bold flex items-center gap-2"
                  style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
                >
                  Hi, I'm Elsa 👋
                </h3>
                <p
                  className="text-white/90 text-xs"
                  style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
                >
                  Your Gaming Assistant
                </p>
              </div>
              <button
                onClick={handleClose}
                className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Chat Body */}
          <div className="p-4 space-y-4 max-h-[450px] overflow-y-auto">
            {screen === 'greeting' && (
              <>
                {/* Elsa's Message */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-black border border-[#FF4D00]/50 overflow-hidden flex-shrink-0">
                    <img
                      src={elsaAvatar}
                      alt="Elsa"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="bg-[#1a1a1f] border border-[#FF4D00]/30 rounded-2xl rounded-tl-none p-3 shadow-lg">
                      <p
                        className="text-gray-200 text-sm"
                        style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
                      >
                        Hey gamer! What's your name?
                      </p>
                    </div>
                  </div>
                </div>

                {/* User Input */}
                <div className="space-y-3">
                  <input
                    type="text"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleContinue()}
                    placeholder="Enter your name..."
                    className="w-full bg-[#1a1a1f] border border-[#FF4D00]/30 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF4D00] transition-colors"
                    style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
                  />
                  <button
                    onClick={handleContinue}
                    disabled={!inputName.trim()}
                    className="w-full bg-gradient-to-r from-[#FF4D00] to-red-600 text-white font-bold py-3 rounded-xl hover:shadow-[0_0_20px_rgba(255,77,0,0.6)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed uppercase text-sm"
                    style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
                  >
                    Continue
                  </button>
                </div>
              </>
            )}

            {screen === 'options' && (
              <>
                {/* Elsa's Message */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-black border border-[#FF4D00]/50 overflow-hidden flex-shrink-0">
                    <img
                      src={elsaAvatar}
                      alt="Elsa"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="bg-[#1a1a1f] border border-[#FF4D00]/30 rounded-2xl rounded-tl-none p-3 shadow-lg">
                      <p
                        className="text-gray-200 text-sm"
                        style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
                      >
                        Nice to meet you, <span className="text-[#FF4D00] font-bold">{userName}</span>! How can I help you today?
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Options */}
                <div className="space-y-2">
                  {quickOptions.map((option, index) => {
                    const IconComponent = option.icon;
                    return (
                      <button
                        key={index}
                        onClick={option.action}
                        className="w-full bg-[#1a1a1f] border border-[#FF4D00]/30 hover:border-[#FF4D00] rounded-xl p-3 flex items-center gap-3 transition-all duration-300 hover:bg-[#1f1f24] hover:shadow-[0_0_15px_rgba(255,77,0,0.3)] group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF4D00] to-red-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                          <IconComponent className="text-white" size={20} />
                        </div>
                        <span
                          className="text-white font-semibold text-sm"
                          style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
                        >
                          {option.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* Chat Footer - Branding */}
          <div className="px-4 py-3 border-t border-[#FF4D00]/20 bg-[#0B0B0F]">
            <p
              className="text-gray-500 text-xs text-center"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
            >
              Powered by DSD Gaming 🎮
            </p>
          </div>
        </div>
      </div>
    </>
  );
}