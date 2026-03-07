import { useState } from 'react';
import axios from 'axios';
import { X, Sparkles } from 'lucide-react';

// Endpoint can be overridden via Vite env var `VITE_PRE_REGISTER_API`
const PRE_REGISTER_API = "https://pregdsd-production-6cb1.up.railway.app/records";

export function PreRegisterModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gamertag: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await axios.post(PRE_REGISTER_API, formData);
      setSubmitted(true);

      // Reset after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', phone: '', gamertag: '' });
        onClose();
      }, 3000);
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again.');
      console.error('Pre-register failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0B0B0F] rounded-2xl shadow-[0_0_60px_rgba(255,77,0,0.3)] border border-[#FF4D00]/30">
        {/* Background Video with Overlay */}
        <div className="absolute inset-0 z-0 rounded-2xl overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-75"
          >
            <source
              src="https://motionbgs.com/media/1194/vegeta-ultra-ego.960x540.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B0B0F]/85 via-[#111118]/80 to-[#0B0B0F]/85"></div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-[#FF4D00] text-white rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,77,0,0.5)]"
        >
          <X size={24} />
        </button>

        {/* Content */}
        <div className="relative z-10 p-6 sm:p-8 md:p-12">
          {!submitted ? (
            <>
              {/* Header */}
              <div className="text-center mb-8 sm:mb-10">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Sparkles className="text-[#FF4D00] animate-pulse" size={32} />
                  <h2 
                    className="text-3xl sm:text-4xl md:text-5xl text-white"
                    style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800 }}
                  >
                    PRE-REGISTER NOW
                  </h2>
                  <Sparkles className="text-[#FF4D00] animate-pulse" size={32} />
                </div>
                
                <div className="inline-block px-6 py-3 bg-gradient-to-r from-[#FF4D00] to-[#FF6A00] rounded-full mb-4 animate-pulse">
                  <p 
                    className="text-white text-lg sm:text-xl font-bold"
                    style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
                  >
                    🎮 Avail Exciting Pre-Launch Offers! 🎮
                  </p>
                </div>

                <p 
                  className="text-[#A0A0A0] text-base sm:text-lg max-w-2xl mx-auto"
                  style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
                >
                  Be among the first to experience DSD Gaming's premium facilities and unlock exclusive benefits
                </p>
              </div>

              {/* Benefits Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-black/40 backdrop-blur-sm border border-[#FF4D00]/30 rounded-xl p-4 hover:border-[#FF4D00] transition-all duration-300">
                  <div className="text-[#FF4D00] text-3xl mb-2 text-center">50%</div>
                  <p className="text-white font-semibold text-center" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                    OFF on all PC Gamepasses
                  </p>
                  <p className="text-[#A0A0A0] text-xs text-center mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Valid on launch days (13th-15th March)
                  </p>
                </div>
                <div className="bg-black/40 backdrop-blur-sm border border-[#FF4D00]/30 rounded-xl p-4 hover:border-[#FF4D00] transition-all duration-300">
                  <div className="text-[#FF4D00] text-3xl mb-2 text-center">30%</div>
                  <p className="text-white font-semibold text-center" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                    OFF on Racing Sim
                  </p>
                  <p className="text-[#A0A0A0] text-xs text-center mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Limited time offer
                  </p>
                </div>
                <div className="bg-black/40 backdrop-blur-sm border border-[#FF4D00]/30 rounded-xl p-4 hover:border-[#FF4D00] transition-all duration-300">
                  <div className="text-[#FF4D00] text-3xl mb-2 text-center">30%</div>
                  <p className="text-white font-semibold text-center" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                    OFF on PS5 Hours
                  </p>
                  <p className="text-[#A0A0A0] text-xs text-center mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Launch special
                  </p>
                </div>
                <div className="bg-black/40 backdrop-blur-sm border border-[#FF4D00]/30 rounded-xl p-4 hover:border-[#FF4D00] transition-all duration-300">
                  <div className="text-[#FF4D00] text-3xl mb-2 text-center">10%</div>
                  <p className="text-white font-semibold text-center" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                    OFF on Food Menu
                  </p>
                  <p className="text-[#A0A0A0] text-xs text-center mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Enjoy discounted snacks
                  </p>
                </div>
              </div>

              {/* Additional Perks */}
              <div className="bg-gradient-to-r from-[#FF4D00]/10 to-[#FF6A00]/10 border border-[#FF4D00]/30 rounded-xl p-4 mb-8">
                <h4 className="text-white text-center font-bold mb-3 text-lg" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}>
                  🎁 EXCLUSIVE PRE-REGISTER BENEFITS
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                  <div>
                    <p className="text-[#FF4D00] font-bold text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>Priority Booking</p>
                    <p className="text-[#A0A0A0] text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>Skip the queue</p>
                  </div>
                  <div>
                    <p className="text-[#FF4D00] font-bold text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>Lucky Draw Entry</p>
                    <p className="text-[#A0A0A0] text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>Win exciting rewards</p>
                  </div>
                  <div>
                    <p className="text-[#FF4D00] font-bold text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>VIP Access</p>
                    <p className="text-[#A0A0A0] text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>First to experience</p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label 
                      className="block text-white mb-2 font-semibold text-sm"
                      style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-black/50 border border-[#FF4D00]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF4D00] focus:shadow-[0_0_15px_rgba(255,77,0,0.3)] transition-all duration-300"
                      style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label 
                      className="block text-white mb-2 font-semibold text-sm"
                      style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-black/50 border border-[#FF4D00]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF4D00] focus:shadow-[0_0_15px_rgba(255,77,0,0.3)] transition-all duration-300"
                      style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label 
                      className="block text-white mb-2 font-semibold text-sm"
                      style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
                    >
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-black/50 border border-[#FF4D00]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF4D00] focus:shadow-[0_0_15px_rgba(255,77,0,0.3)] transition-all duration-300"
                      style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>

                  <div>
                    <label 
                      className="block text-white mb-2 font-semibold text-sm"
                      style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
                    >
                      Gamertag / Username
                    </label>
                    <input
                      type="text"
                      name="gamertag"
                      value={formData.gamertag}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-black/50 border border-[#FF4D00]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF4D00] focus:shadow-[0_0_15px_rgba(255,77,0,0.3)] transition-all duration-300"
                      style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
                      placeholder="Your gaming ID"
                    />
                  </div>
                </div>

                {errorMessage && (
                  <p className="text-center text-red-400 text-sm" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}>
                    {errorMessage}
                  </p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className={`w-full px-8 py-4 bg-gradient-to-r from-[#FF4D00] to-[#FF6A00] text-white rounded-full font-bold text-lg hover:shadow-[0_0_30px_rgba(255,77,0,0.6)] transition-all duration-300 transform hover:scale-105 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  disabled={isSubmitting}
                  style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
                >
                  {isSubmitting ? 'Submitting...' : 'CLAIM YOUR EXCLUSIVE OFFERS NOW! 🚀'}
                </button>

                <p className="text-center text-gray-500 text-sm mt-4" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }}>
                  * By registering, you agree to receive updates about DSD Gaming
                </p>
              </form>
            </>
          ) : (
            /* Success Message */
            <div className="text-center py-12">
              <div className="mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-[#FF4D00] to-[#FF6A00] rounded-full flex items-center justify-center mx-auto animate-bounce">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </div>
              <h3 
                className="text-3xl sm:text-4xl text-white mb-4"
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800 }}
              >
                Registration Successful! 🎉
              </h3>
              <p 
                className="text-[#A0A0A0] text-lg"
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
              >
                Welcome to DSD Gaming! Check your email for exclusive pre-launch offers.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}