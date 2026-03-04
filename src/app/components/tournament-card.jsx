import { Users, Trophy } from 'lucide-react';
import faceitLogo from '../../assets/tournnament.png';

export function TournamentCard({
  time,
  title,
  organizer,
  gameMode,
  prize,
  slots,
  prizeIcon,
}) {
  return (
    <div className="bg-[#141419] border border-gray-800 rounded-xl p-4 sm:p-6 hover:border-[#FF4D00] hover:shadow-[0_0_20px_rgba(255,77,0,0.2)] transition-all duration-300 cursor-pointer group">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Left Side */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span 
              className="text-xs text-gray-500 uppercase tracking-wide"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
            >
              {time}
            </span>
          </div>
          
          <h3 
            className="text-white text-base sm:text-lg mb-1"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
          >
            {title}
          </h3>
          
          <p 
            className="text-gray-500 text-xs sm:text-sm"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }}
          >
            Organized by {organizer}
          </p>
        </div>

        {/* Right Side */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-6">
          {/* Game Mode */}
          <div className="px-3 sm:px-4 py-2 bg-[#1a1a1f] rounded-lg border border-gray-800">
            <span 
              className="text-white text-xs sm:text-sm"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
            >
              {gameMode}
            </span>
          </div>

          {/* Prize */}
          <div className="flex items-center gap-2">
            {prizeIcon ? (
              <img src={faceitLogo} alt="Prize" className="w-4 h-4 sm:w-5 sm:h-5 object-contain" />
            ) : (
              <Trophy size={16} className="text-[#FF4D00] sm:w-[18px] sm:h-[18px]" />
            )}
            <span 
              className="text-[#FF4D00] text-xs sm:text-sm"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
            >
              {prize}
            </span>
          </div>

          {/* Slots */}
          <div className="flex items-center gap-2">
            <Users size={16} className="text-gray-500 sm:w-[18px] sm:h-[18px]" />
            <span 
              className="text-gray-400 text-xs sm:text-sm"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
            >
              {slots}
            </span>
          </div>

          {/* Join Button */}
          <button className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-[#FF4D00] text-white rounded-lg text-xs sm:text-sm uppercase tracking-wide hover:bg-[#FF6A00] hover:shadow-[0_0_15px_rgba(255,77,0,0.4)] transition-all duration-300 group-hover:scale-105"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
}