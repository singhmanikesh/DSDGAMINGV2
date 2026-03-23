import { Check, Zap, Snowflake, Monitor, Users, Gift, Target, Gamepad2, Clock } from 'lucide-react';

export function Pricing() {
  // Launch Day Promos Pricing (3rd-4th April)
  const launchPromoEsports = [
    { duration: '1 Hr Bootcamp', regular: 'Rs. 150', promo: 'Rs. 75', bundle: null },
    { duration: '3 Hr Bootcamp', regular: 'Rs. 390', promo: 'Rs. 195', bundle: 'Soda of Choice' },
    { duration: '5 Hr Bootcamp', regular: 'Rs. 600', promo: 'Rs. 300', bundle: 'Starter of Choice + Soda of Choice' },
    { duration: '10 Hr Bootcamp', regular: 'Rs. 1100', promo: 'Rs. 550', bundle: 'Starter of Choice + Soda of Choice + Noodles' },
  ];

  const launchPromoChill13 = [
    { duration: '1 Hr', regular: 'Rs. 100', promo: 'Rs. 50', bundle: null },
    { duration: '3 Hr', regular: 'Rs. 250', promo: 'Rs. 125', bundle: 'Soda of Choice' },
    { duration: '10 Hr', regular: 'Rs. 800', promo: 'Rs. 400', bundle: 'Starter of Choice + Soda of Choice' },
  ];

  const launchPromoChill1415 = [
    { duration: '1 Hr', regular: 'Rs. 120', promo: 'Rs. 60', bundle: null },
    { duration: '3 Hr', regular: 'Rs. 300', promo: 'Rs. 150', bundle: 'Soda of Choice' },
    { duration: '10 Hr', regular: 'Rs. 800', promo: 'Rs. 400', bundle: 'Starter of Choice + Soda of Choice' },
  ];

  // Direct Walk-In Offers
  const walkInEsports = [
    { duration: '1 Hr', regular: 'Rs. 150', walkIn: 'Rs. 98', bundle: null },
    { duration: '3 Hr', regular: 'Rs. 390', walkIn: 'Rs. 253', bundle: 'Soda' },
    { duration: '5 Hr', regular: 'Rs. 600', walkIn: 'Rs. 390', bundle: 'Starter + Soda' },
    { duration: '10 Hr', regular: 'Rs. 1100', walkIn: 'Rs. 715', bundle: 'Starter + Soda + Noodles' },
  ];

  const walkInChill = [
    { duration: '1 Hr', regular: 'Rs. 100', walkIn: 'Rs. 65', bundle: null },
    { duration: '3 Hr', regular: 'Rs. 250', walkIn: 'Rs. 163', bundle: 'Soda' },
    { duration: '10 Hr', regular: 'Rs. 800', walkIn: 'Rs. 520', bundle: 'Starter + Soda' },
  ];

  // Other Entertainment Options
  const otherOptions = [
    {
      name: 'PlayStation 5',
      rates: [
        { duration: '1 Hour', price: 'Rs. 150' },
        { duration: '2 Hours', price: 'Rs. 150 (1 Hour Free)', highlight: true },
        { duration: 'Extra Controller', price: 'Rs. 130' },
      ],
      color: 'from-cyan-400 to-blue-600',
    },
    {
      name: 'Racing Sim',
      rates: [
        { duration: '30 Min', price: 'Rs. 140' },
        { duration: '1 Hour', price: 'Rs. 200' },
      ],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      name: 'VR Gaming',
      rates: [
        { duration: '30 Min', price: 'Rs. 140' },
        { duration: '1 Hour', price: 'Rs. 200' },
      ],
      color: 'from-cyan-500 to-teal-400',
    },
    {
      name: 'Pool Table',
      rates: [
        { duration: '30 Min (Weekday)', price: 'Rs. 120' },
        { duration: '30 Min (Weekend)', price: 'Rs. 150' },
        { duration: '1 Hour (Weekday)', price: 'Rs. 200' },
        { duration: '1 Hour (Weekend)', price: 'Rs. 250' },
      ],
      color: 'from-teal-400 to-cyan-400',
    },
  ];

  return (
    <section id="pricing" className="py-12 md:py-16 lg:py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-red-600 rounded-full blur-[200px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-cyan-400 rounded-full blur-[200px]"></div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#0B0B0F] mb-4 tracking-wider"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800 }}
          >
            CHOOSE YOUR <span className="text-[#FF4D00]">GAMING</span> EXPERIENCE
          </h2>
          <div className="w-24 h-1 bg-[#FF4D00] mx-auto mb-6"></div>
          <p className="text-[#666666] text-sm sm:text-base md:text-lg max-w-3xl mx-auto" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}>
            Two distinct gaming environments designed to match your play style and competitive goals
          </p>
        </div>

        {/* LOUNGE COMPARISON SECTION */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 md:mb-20 max-w-6xl mx-auto">
          {/* ESPORTS LOUNGE */}
          <div className="relative bg-white rounded-3xl border-2 border-red-600/30 p-8 overflow-hidden group hover:border-red-600 transition-all duration-300 shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-black opacity-5 group-hover:opacity-10 transition-opacity"></div>
            
            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-black px-6 py-3 rounded-full mb-4">
                  <Zap className="text-white" size={20} fill="white" />
                  <h3
                    className="text-xl md:text-2xl text-white uppercase"
                    style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800 }}
                  >
                    ESPORTS LOUNGE
                  </h3>
                </div>
                <p className="text-red-600 text-sm uppercase" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                  Premium Competitive Gaming
                </p>
              </div>

              {/* Specs */}
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <Monitor className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="text-[#0B0B0F] font-bold text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      400Hz BenQ Fast TN Panel
                    </p>
                    <p className="text-[#666666] text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Zero lag, maximum performance
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Zap className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="text-[#0B0B0F] font-bold text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Ryzen 7 9800X3D CPU
                    </p>
                    <p className="text-[#666666] text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      The ultimate chip for gaming
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Target className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="text-[#0B0B0F] font-bold text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Private Room Setup
                    </p>
                    <p className="text-[#666666] text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      5 PCs per room - No distractions
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Gamepad2 className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="text-[#0B0B0F] font-bold text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      4070 Super GPUs
                    </p>
                    <p className="text-[#666666] text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      NVIDIA RTX 4070 Super cards across PCs
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="text-[#0B0B0F] font-bold text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Minimum FPS
                    </p>
                    <p className="text-[#666666] text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      CS2: 700fps · Valorant: 800fps
                    </p>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="bg-red-50 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Check className="text-red-600" size={16} strokeWidth={3} />
                  <span className="text-[#0B0B0F] text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Focus mode - Zero disturbance
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="text-red-600" size={16} strokeWidth={3} />
                  <span className="text-[#0B0B0F] text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Perfect for rank climbing
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="text-red-600" size={16} strokeWidth={3} />
                  <span className="text-[#0B0B0F] text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Team bootcamp friendly
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* CHILL LOUNGE */}
          <div className="relative bg-white rounded-3xl border-2 border-cyan-400/30 p-8 overflow-hidden group hover:border-cyan-500 transition-all duration-300 shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600 opacity-5 group-hover:opacity-10 transition-opacity"></div>
            
            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-blue-600 px-6 py-3 rounded-full mb-4">
                  <Snowflake className="text-white" size={20} />
                  <h3
                    className="text-xl md:text-2xl text-white uppercase"
                    style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800 }}
                  >
                    CHILL LOUNGE
                  </h3>
                </div>
                <p className="text-cyan-600 text-sm uppercase" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                  Casual & Relaxed Gaming
                </p>
              </div>

              {/* Specs */}
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <Monitor className="text-cyan-600 flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="text-[#0B0B0F] font-bold text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      360Hz BenQ Fast TN Panel
                    </p>
                    <p className="text-[#666666] text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      High-performance smooth gameplay
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Zap className="text-cyan-600 flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="text-[#0B0B0F] font-bold text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Ryzen 7 9700X CPU
                    </p>
                    <p className="text-[#666666] text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      One of the best chips for gaming
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Users className="text-cyan-600 flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="text-[#0B0B0F] font-bold text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Open Area Layout
                    </p>
                    <p className="text-[#666666] text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Social atmosphere with PS5, VR & more
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Gamepad2 className="text-cyan-600 flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="text-[#0B0B0F] font-bold text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      4070 Super GPUs
                    </p>
                    <p className="text-[#666666] text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      NVIDIA RTX 4070 Super cards across Chill Lounge PCs
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="text-cyan-600 flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="text-[#0B0B0F] font-bold text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Minimum FPS
                    </p>
                    <p className="text-[#666666] text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      CS2: 500fps · Valorant: 700fps
                    </p>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="bg-cyan-50 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Check className="text-cyan-600" size={16} strokeWidth={3} />
                  <span className="text-[#0B0B0F] text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Relaxed environment
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="text-cyan-600" size={16} strokeWidth={3} />
                  <span className="text-[#0B0B0F] text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Perfect for casual play
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="text-cyan-600" size={16} strokeWidth={3} />
                  <span className="text-[#0B0B0F] text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Social gaming hub
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LAUNCH DAY PROMOS - 3RD APRIL TO 4TH APRIL */}
        <div className="mb-16 md:mb-20">
          <div className="text-center mb-8">
            <div className="inline-block bg-gradient-to-r from-[#FF4D00] via-red-600 to-[#FF4D00] p-1 rounded-full mb-4 animate-pulse">
              <div className="bg-white px-6 py-3 rounded-full">
                <h3
                  className="text-2xl md:text-3xl text-[#0B0B0F] uppercase"
                  style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800 }}
                >
                  🎉 LAUNCH DAY PROMOS 🎉
                </h3>
              </div>
            </div>
            <p className="text-[#FF4D00] text-lg font-bold mb-2" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}>
              3rd April - 4th April
            </p>
            <p className="text-[#666666] text-sm" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
              Pre-Register for 50% OFF on all PC Gamepasses
            </p>
          </div>

          {/* Esports Lounge Launch Pricing */}
          <div className="max-w-6xl mx-auto mb-8">
            <div className="bg-gradient-to-r from-red-600 to-black p-1 rounded-2xl">
              <div className="bg-white rounded-xl p-6">
                <div className="flex items-center justify-center gap-2 mb-6">
                  <Zap className="text-red-600" size={24} fill="red" />
                  <h4 className="text-xl md:text-2xl text-[#0B0B0F] uppercase" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800 }}>
                    ESPORTS LOUNGE
                  </h4>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-red-600">
                        <th className="text-left p-3 text-[#0B0B0F] font-bold text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>Duration</th>
                        <th className="text-center p-3 text-[#0B0B0F] font-bold text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>Regular Price</th>
                        <th className="text-center p-3 text-red-600 font-bold text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>Launch Price</th>
                        <th className="text-left p-3 text-[#0B0B0F] font-bold text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>Bundle Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {launchPromoEsports.map((row, idx) => (
                        <tr key={idx} className="border-b border-gray-200">
                          <td className="p-3 text-[#0B0B0F] font-semibold text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>{row.duration}</td>
                          <td className="p-3 text-center text-[#666666] line-through text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>{row.regular + '/person'}</td>
                          <td className="p-3 text-center text-red-600 font-bold text-lg" style={{ fontFamily: 'Montserrat, sans-serif' }}>{row.promo + '/person'}</td>
                          <td className="p-3 text-[#666666] text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>{row.bundle || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Chill Lounge Launch Pricing - Two Sections */}
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
            {/* 3rd April */}
            <div className="bg-gradient-to-r from-cyan-400 to-blue-600 p-1 rounded-2xl">
              <div className="bg-white rounded-xl p-6">
                <div className="text-center mb-4">
                  <Snowflake className="inline-block text-cyan-600 mb-2" size={24} />
                  <h4 className="text-lg md:text-xl text-[#0B0B0F] uppercase mb-1" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800 }}>
                    CHILL LOUNGE
                  </h4>
                  <p className="text-cyan-600 text-sm font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>20th March Only</p>
                </div>
                
                <div className="space-y-3">
                  {launchPromoChill13.map((row, idx) => (
                    <div key={idx} className="flex justify-between items-center pb-2 border-b border-gray-200">
                      <div>
                        <p className="text-[#0B0B0F] font-semibold text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>{row.duration}</p>
                        {row.bundle && <p className="text-[#666666] text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>{row.bundle}</p>}
                      </div>
                      <div className="text-right">
                        <p className="text-[#666666] line-through text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>{row.regular + '/person'}</p>
                        <p className="text-cyan-600 font-bold text-lg" style={{ fontFamily: 'Montserrat, sans-serif' }}>{row.promo + '/person'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 14th & 15th March */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-400 p-1 rounded-2xl">
              <div className="bg-white rounded-xl p-6">
                <div className="text-center mb-4">
                  <Snowflake className="inline-block text-blue-600 mb-2" size={24} />
                  <h4 className="text-lg md:text-xl text-[#0B0B0F] uppercase mb-1" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800 }}>
                    CHILL LOUNGE
                  </h4>
                  <p className="text-blue-600 text-sm font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>21st & 22nd March</p>
                </div>
                
                <div className="space-y-3">
                  {launchPromoChill1415.map((row, idx) => (
                    <div key={idx} className="flex justify-between items-center pb-2 border-b border-gray-200">
                      <div>
                        <p className="text-[#0B0B0F] font-semibold text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>{row.duration}</p>
                        {row.bundle && <p className="text-[#666666] text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>{row.bundle}</p>}
                      </div>
                      <div className="text-right">
                        <p className="text-[#666666] line-through text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>{row.regular + '/person'}</p>
                        <p className="text-blue-600 font-bold text-lg" style={{ fontFamily: 'Montserrat, sans-serif' }}>{row.promo + '/person'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Launch Promo Benefits */}
          <div className="mt-6 text-center">
            <div className="inline-flex flex-wrap justify-center gap-3">
              <span className="bg-red-100 text-red-600 px-4 py-2 rounded-full text-xs font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                30% OFF Racing Sim
              </span>
              <span className="bg-cyan-100 text-cyan-600 px-4 py-2 rounded-full text-xs font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                30% OFF PS5 Hours
              </span>
              <span className="bg-orange-100 text-[#FF4D00] px-4 py-2 rounded-full text-xs font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                10% OFF Food Menu
              </span>
            </div>
          </div>
        </div>

        {/* DIRECT WALK-IN OFFERS */}
        <div className="mb-16 md:mb-20">
          <div className="text-center mb-8">
            <h3
              className="text-2xl md:text-3xl text-[#0B0B0F] uppercase mb-2"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800 }}
            >
              DIRECT WALK-IN <span className="text-[#FF4D00]">OFFERS</span>
            </h3>
            <p className="text-[#666666] text-sm" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
              Special pricing for immediate bookings (35% OFF PC Gamepasses) — <strong className="font-bold">Valid 20/03/26</strong>
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
            {/* Esports Lounge Walk-In */}
            <div className="bg-gradient-to-r from-red-600 to-black p-1 rounded-2xl">
              <div className="bg-white rounded-xl p-6">
                <div className="text-center mb-4">
                  <Zap className="inline-block text-red-600 mb-2" size={24} fill="red" />
                  <h4 className="text-lg md:text-xl text-[#0B0B0F] uppercase" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800 }}>
                    ESPORTS LOUNGE
                  </h4>
                </div>
                
                <div className="space-y-3">
                  {walkInEsports.map((row, idx) => (
                    <div key={idx} className="flex justify-between items-center pb-2 border-b border-gray-200">
                      <div>
                        <p className="text-[#0B0B0F] font-semibold text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>{row.duration}</p>
                        {row.bundle && <p className="text-[#666666] text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>{row.bundle}</p>}
                      </div>
                      <div className="text-right">
                        <p className="text-[#666666] line-through text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>{row.regular}</p>
                        <p className="text-red-600 font-bold text-lg" style={{ fontFamily: 'Montserrat, sans-serif' }}>{row.walkIn}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Chill Lounge Walk-In */}
            <div className="bg-gradient-to-r from-cyan-400 to-blue-600 p-1 rounded-2xl">
              <div className="bg-white rounded-xl p-6">
                <div className="text-center mb-4">
                  <Snowflake className="inline-block text-cyan-600 mb-2" size={24} />
                  <h4 className="text-lg md:text-xl text-[#0B0B0F] uppercase" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800 }}>
                    CHILL LOUNGE
                  </h4>
                </div>
                
                <div className="space-y-3">
                  {walkInChill.map((row, idx) => (
                    <div key={idx} className="flex justify-between items-center pb-2 border-b border-gray-200">
                      <div>
                        <p className="text-[#0B0B0F] font-semibold text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>{row.duration}</p>
                        {row.bundle && <p className="text-[#666666] text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>{row.bundle}</p>}
                      </div>
                      <div className="text-right">
                        <p className="text-[#666666] line-through text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>{row.regular}</p>
                        <p className="text-cyan-600 font-bold text-lg" style={{ fontFamily: 'Montserrat, sans-serif' }}>{row.walkIn}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Walk-In Benefits */}
          <div className="mt-6 text-center">
            <div className="inline-flex flex-wrap justify-center gap-3">
              <span className="bg-red-100 text-red-600 px-4 py-2 rounded-full text-xs font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                20% OFF Racing Sim
              </span>
              <span className="bg-cyan-100 text-cyan-600 px-4 py-2 rounded-full text-xs font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                20% OFF PS5 Hours
              </span>
              <span className="bg-orange-100 text-[#FF4D00] px-4 py-2 rounded-full text-xs font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                10% OFF Food Menu
              </span>
            </div>
          </div>
        </div>

        {/* CHILL LOUNGE SPECIAL PACKAGES */}

        {/* ESPORTS LOUNGE PACKAGES (matches Chill layout, red/black theme) */}
        <div className="mb-8 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-black px-6 py-3 rounded-full mb-4">
              <Zap className="text-white" size={20} />
              <h3
                className="text-2xl sm:text-3xl md:text-3xl text-white uppercase"
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800 }}
              >
                ESPORTS LOUNGE PACKAGES
              </h3>
            </div>
            <p className="text-red-600 text-sm" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
              Premium bootcamp packages for competitive gamers
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Day Esports Package */}
            <div className="relative bg-white rounded-2xl border-2 border-red-600/30 p-6 overflow-hidden group hover:border-red-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-black opacity-5 group-hover:opacity-10 transition-opacity"></div>
              <div className="relative z-10">
                <div className="mb-4">
                  <h4
                    className="text-xl md:text-2xl text-[#0B0B0F] uppercase mb-1"
                    style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800 }}
                  >
                    DAY ESPORTS
                  </h4>
                  <p className="text-red-600 text-xs uppercase" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                    Perfect for focused competitive play
                  </p>
                </div>
                <div className="mb-4">
                  <span className="text-3xl md:text-4xl text-red-600 font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Rs. 800
                    <span className="text-lg">/person</span>
                  </span>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="text-red-600 flex-shrink-0 mt-0.5" size={18} strokeWidth={3} />
                    <span className="text-[#666666] text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      8 Hours of PC Gaming
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-red-600 flex-shrink-0 mt-0.5" size={18} strokeWidth={3} />
                    <span className="text-[#666666] text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      1 Starter of your choice 
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-red-600 flex-shrink-0 mt-0.5" size={18} strokeWidth={3} />
                    <span className="text-[#666666] text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      1 Soda of choice
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-red-600 flex-shrink-0 mt-0.5" size={18} strokeWidth={3} />
                    <span className="text-[#666666] text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Noodles included
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* LAN Esports Package */}
            <div className="relative bg-white rounded-2xl border-2 border-red-600/30 p-6 overflow-hidden group hover:border-red-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-black to-red-600 opacity-5 group-hover:opacity-10 transition-opacity"></div>
              <div className="relative z-10">
                <div className="mb-4">
                  <h4
                    className="text-xl md:text-2xl text-[#0B0B0F] uppercase mb-1"
                    style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800 }}
                  >
                    LAN ESPORTS
                  </h4>
                  <p className="text-red-600 text-xs uppercase" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                    Group gaming special
                  </p>
                </div>
                <div className="mb-4">
                  <span className="text-3xl md:text-4xl text-red-600 font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Rs. 130
                    <span className="text-lg">/person</span>
                  </span>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="text-red-600 flex-shrink-0 mt-0.5" size={18} strokeWidth={3} />
                    <span className="text-[#666666] text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Come as 5, Pay for 4 (1 Hour PC/Person)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-red-600 flex-shrink-0 mt-0.5" size={18} strokeWidth={3} />
                    <span className="text-[#666666] text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      2+ Hours: Get 1 Soda of choice each
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-red-600 flex-shrink-0 mt-0.5" size={18} strokeWidth={3} />
                    <span className="text-[#666666] text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      5+ Hours: Starter + Soda each
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-16 md:mb-20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-blue-600 px-6 py-3 rounded-full mb-4">
              <Snowflake className="text-white" size={20} />
              <h3
                className="text-2xl md:text-3xl text-white uppercase"
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800 }}
              >
                CHILL LOUNGE PACKAGES
              </h3>
            </div>
            <p className="text-cyan-600 text-sm" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
              Special bootcamp packages for casual gamers
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Day Chill Package */}
            <div className="relative bg-white rounded-2xl border-2 border-cyan-400/30 p-6 overflow-hidden group hover:border-cyan-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600 opacity-5 group-hover:opacity-10 transition-opacity"></div>
              <div className="relative z-10">
                <div className="mb-4">
                  <h4
                    className="text-xl md:text-2xl text-[#0B0B0F] uppercase mb-1"
                    style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800 }}
                  >
                    DAY CHILL
                  </h4>
                  <p className="text-cyan-600 text-xs uppercase" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                    Perfect for all-day gaming
                  </p>
                </div>
                <div className="mb-4">
                  <span className="text-3xl md:text-4xl text-cyan-600 font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Rs. 640
                    <span className="text-lg">/person</span>
                  </span>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="text-cyan-600 flex-shrink-0 mt-0.5" size={18} strokeWidth={3} />
                    <span className="text-[#666666] text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      8 Hours of PC Gaming
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-cyan-600 flex-shrink-0 mt-0.5" size={18} strokeWidth={3} />
                    <span className="text-[#666666] text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      1 Starter of your choice included
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* LAN Chill Package */}
            <div className="relative bg-white rounded-2xl border-2 border-cyan-400/30 p-6 overflow-hidden group hover:border-cyan-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-400 opacity-5 group-hover:opacity-10 transition-opacity"></div>
              <div className="relative z-10">
                <div className="mb-4">
                  <h4
                    className="text-xl md:text-2xl text-[#0B0B0F] uppercase mb-1"
                    style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800 }}
                  >
                    LAN CHILL
                  </h4>
                  <p className="text-cyan-600 text-xs uppercase" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                    Group gaming special
                  </p>
                </div>
                <div className="mb-4">
                  <span className="text-3xl md:text-4xl text-cyan-600 font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Rs. 100<span className="text-lg">/person</span>
                  </span>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="text-cyan-600 flex-shrink-0 mt-0.5" size={18} strokeWidth={3} />
                    <span className="text-[#666666] text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Come as 5, Pay for 4 (1 Hour PC/Person)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-cyan-600 flex-shrink-0 mt-0.5" size={18} strokeWidth={3} />
                    <span className="text-[#666666] text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      2+ Hours: Get 1 Soda of choice each
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-cyan-600 flex-shrink-0 mt-0.5" size={18} strokeWidth={3} />
                    <span className="text-[#666666] text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      5+ Hours: Get 1 Starter + Soda each
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* OTHER ENTERTAINMENT OPTIONS */}
        <div className="mb-16 md:mb-20">
          <div className="text-center mb-8">
            <h3
              className="text-2xl md:text-3xl text-[#0B0B0F] uppercase mb-2"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800 }}
            >
              MORE <span className="text-[#FF4D00]">ENTERTAINMENT</span> OPTIONS
            </h3>
            <p className="text-[#666666] text-sm" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
              PlayStation 5, Racing Sim, VR Gaming & Pool Table
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {otherOptions.map((item, index) => (
              <div
                key={index}
                className="relative bg-white rounded-2xl border-2 border-cyan-400/30 p-6 overflow-hidden group hover:border-cyan-500 transition-all duration-300 hover:transform hover:-translate-y-2 shadow-lg hover:shadow-xl"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
                <div className="relative z-10">
                  <div className="mb-4 flex justify-center">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                      <Gamepad2 className="text-white" size={32} />
                    </div>
                  </div>
                  <h4
                    className="text-lg text-[#0B0B0F] uppercase text-center mb-4"
                    style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
                  >
                    {item.name}
                  </h4>
                  <div className="space-y-3">
                    {item.rates.map((rate, idx) => (
                      <div
                        key={idx}
                        className={`flex justify-between items-center pb-2 ${idx !== item.rates.length - 1 ? 'border-b border-gray-200' : ''}`}
                      >
                        <span className="text-[#666666] text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                          {rate.duration}
                        </span>
                        <span
                          className={`font-bold text-sm ${rate.highlight ? 'text-cyan-600' : 'text-[#0B0B0F]'}`}
                          style={{ fontFamily: 'Montserrat, sans-serif' }}
                        >
                          {rate.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12 px-4">
          <p className="text-[#666666] text-sm sm:text-base mb-4" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}>
            Need help choosing the right lounge or want a custom package?{' '}
            <a href="http://wa.me/919538585761" target="_blank" rel="noopener noreferrer" className="text-[#FF4D00] hover:text-cyan-600 transition-colors font-bold">
              Contact us on WhatsApp
            </a>
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <a 
              href="http://wa.me/919538585761"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-gradient-to-r from-red-600 to-black text-white rounded-full font-bold text-sm uppercase tracking-wide hover:shadow-[0_0_20px_rgba(255,77,0,0.5)] transition-all duration-300"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
            >
              Book Esports Lounge
            </a>
            <a 
              href="http://wa.me/919538585761"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-gradient-to-r from-cyan-400 to-blue-600 text-white rounded-full font-bold text-sm uppercase tracking-wide hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all duration-300"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
            >
              Book Chill Lounge
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
