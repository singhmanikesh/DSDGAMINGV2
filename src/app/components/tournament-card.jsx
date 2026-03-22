import { Users } from 'lucide-react';
import faceitLogo from '../../assets/tournnament.png';

export function TournamentCard({
  time,
  title,
  organizer,
  gameMode,
  prize,
  hpReward,
  slots,
  prizeIcon,
  showJoinButton = true,
  isJoined = false,
  isExpired = false,
  statusLabel,
  onJoin,
  onJoinSolo,
  onCreateTeam,
  onCardClick,
  isSoloJoined = false,
  hasCreatedTeam = false,
}) {
  return (
    <div
      className={`bg-[#141419] border border-gray-800 rounded-xl p-4 sm:p-6 hover:border-[#FF4D00] hover:shadow-[0_0_20px_rgba(255,77,0,0.2)] transition-all duration-300 cursor-pointer group ${
        isExpired ? 'opacity-60 grayscale' : ''
      }`}
      onClick={onCardClick}
    >
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

          {statusLabel && (
            <span
              className="inline-block mt-2 px-2 py-1 text-[11px] font-semibold rounded bg-gray-800 text-gray-300 border border-gray-700"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
            >
              {statusLabel}
            </span>
          )}
        </div>

        {/* Right Side */}
        <div className="flex flex-wrap items-start gap-3 sm:grid sm:auto-cols-max sm:grid-flow-col sm:items-center sm:gap-6 sm:justify-end w-full sm:w-auto">
          {/* Game Mode */}
          <div className="px-3 sm:px-4 py-2 bg-[#1a1a1f] rounded-lg border border-gray-800 sm:justify-self-end">
            <span 
              className="text-white text-xs sm:text-sm"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
            >
              {gameMode}
            </span>
          </div>

          {/* Prize */}
          <div className="flex items-center gap-1.5 whitespace-nowrap sm:justify-self-end leading-none">
            {(typeof gameMode === 'string' && gameMode.toLowerCase().includes('wingman')) ? (
              <span className="text-[#FF4D00] text-base sm:text-lg leading-none">₹</span>
            ) : prizeIcon ? (
              <img src={faceitLogo} alt="Prize" className="w-4 h-4 sm:w-5 sm:h-5 object-contain" />
            ) : (
              <span className="text-[#FF4D00] text-base sm:text-lg leading-none">₹</span>
            )}
            <span 
              className="text-[#FF4D00] text-sm sm:text-base leading-none"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
            >
              {prize}
            </span>
          </div>

          {/* HP Reward (show blank if null) */}
          <div className="flex items-center gap-2 whitespace-nowrap sm:justify-self-end">
            <span className="text-gray-400 text-xs sm:text-sm" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
              HP Reward:
            </span>
            <span className="text-white text-xs sm:text-sm font-semibold" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}>
              {hpReward === null || hpReward === undefined ? '' : hpReward}
            </span>
          </div>

          {/* Slots */}
          <div className="flex items-center gap-2 whitespace-nowrap sm:justify-self-end">
            <Users size={16} className="text-gray-500 sm:w-[18px] sm:h-[18px]" />
            <span 
              className="text-gray-400 text-xs sm:text-sm"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
            >
              {slots}
            </span>
            {isJoined && (
              <span 
                className="text-[#FF4D00] text-[11px] sm:text-xs font-semibold"
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
              >
                Joined
              </span>
            )}
          </div>

          {/* Join / Create Team Buttons */}
          {showJoinButton && (
            <div className="flex gap-2 items-center flex-shrink-0 sm:justify-self-end">
              <button
                disabled={isSoloJoined || isExpired}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  (onJoinSolo || onJoin)?.(e);
                }}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm uppercase tracking-wide transition-all duration-300 cursor-pointer ${
                  isSoloJoined || isExpired
                    ? 'bg-gray-700 text-gray-300 cursor-not-allowed'
                    : 'bg-[#FF4D00] text-white hover:bg-[#FF6A00] hover:shadow-[0_0_15px_rgba(255,77,0,0.4)]'
                }`}
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
              >
                {isSoloJoined ? 'Joined' : isExpired ? 'Expired' : 'Join Solo'}
              </button>

              <button
                disabled={hasCreatedTeam || isExpired}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  (onCreateTeam || onJoin)?.(e);
                }}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm uppercase tracking-wide transition-all duration-300 cursor-pointer ${
                  hasCreatedTeam || isExpired
                    ? 'bg-gray-700 text-gray-300 cursor-not-allowed'
                    : 'bg-[#27272a] text-gray-300 border border-gray-800 hover:bg-[#2a2a2f]'
                }`}
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
              >
                {hasCreatedTeam ? 'Team Created' : 'Create Team'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}