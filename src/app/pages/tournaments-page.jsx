import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { TournamentNavbar } from '../components/tournament-navbar';
import { TournamentCard } from '../components/tournament-card';
import { FilterModal } from '../components/filter-modal';
import { SlidersHorizontal } from 'lucide-react';

export function TournamentsPage() {
  const navigate = useNavigate();
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [activeGameMode, setActiveGameMode] = useState(null);

  const tournaments = [
    {
      time: 'Fri 27 Feb',
      title: 'Wingman - Workshop',
      organizer: 'FACEIT',
      gameMode: 'Wingman',
      prize: '8,500',
      slots: '9/32',
      prizeIcon: true,
    },
    {
      time: 'IN 44 MINUTES, 12:12 GMT+5:30',
      title: 'Aim Duel',
      organizer: 'FACEIT',
      gameMode: '1v1',
      prize: '5,250',
      slots: '33/32',
    },
    {
      time: 'IN 758 MINUTES, 13:16 GMT+1:52',
      title: 'Premium - Pistol Only - Skill 8-10 - PrizePool 15k',
      organizer: 'FACEIT',
      gameMode: '1v1 Aim',
      prize: '18,670',
      slots: '3/256',
    },
    {
      time: 'IN 758 MINUTES, 13:16 GMT+1:52',
      title: 'Premium - Pistol Only - Skill 3 - PrizePool 10k',
      organizer: 'FACEIT',
      gameMode: '1v1 Aim',
      prize: '16,340',
      slots: '3/128',
    },
    {
      time: 'IN ABOUT 3 HOURS, 15:12 GMT+5:30',
      title: '1v1 Showdown',
      organizer: 'SkinCasino5G',
      gameMode: '1v1 Aim',
      prize: '700',
      slots: '1/264',
    },
    {
      time: 'IN ABOUT 3 HOURS, 16:25 GMT+5:30',
      title: 'Aim Pistol',
      organizer: 'FACEIT',
      gameMode: '1v1 Aim',
      prize: '1,250',
      slots: '30/32',
    },
    {
      time: 'IN ABOUT 3 HOURS, 16:25 GMT+5:30',
      title: 'Wingman - Workshop',
      organizer: 'FACEIT',
      gameMode: 'Wingman',
      prize: '8,500',
      slots: '9/32',
      prizeIcon: true,
    },
    {
      time: 'IN ABOUT 5 HOURS, 18:25 GMT+5:30',
      title: 'Normal Competitive',
      organizer: 'FACEIT',
      gameMode: '5v5',
      prize: '27,000',
      slots: '2/16',
    },
    {
      time: 'IN ABOUT 5 HOURS, 17:15 GMT+5:30',
      title: 'Duo Showdown',
      organizer: 'SkinCasino5G',
      gameMode: 'Wingman',
      prize: '700',
      slots: '1/64',
    },
  ];

  const gameModes = ['1v1 Aim', '2v2', '5v5', 'Hostage', 'Wingman'];

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <TournamentNavbar />

      {/* Main Content */}
      <div className="pt-20 sm:pt-24 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="py-8 sm:py-12">
          <h1 
            className="text-2xl sm:text-3xl md:text-4xl text-white mb-2"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800 }}
          >
            Tournaments
          </h1>
          <p 
            className="text-gray-400 text-sm sm:text-base"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }}
          >
            Browse and register for upcoming competitions
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 sm:gap-8 border-b border-gray-800 mb-6 sm:mb-8">
          <button
            className="relative pb-3 sm:pb-4 text-[#FF4D00] text-xs sm:text-sm uppercase tracking-wide border-b-2 border-[#FF4D00]"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
          >
            BROWSE
          </button>
          
          <button
            onClick={() => navigate('/my-tournaments')}
            className="pb-3 sm:pb-4 text-gray-400 hover:text-white text-xs sm:text-sm uppercase tracking-wide transition-colors duration-200"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
          >
            MY TOURNAMENTS
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 overflow-x-auto pb-2">
          {gameModes.map((mode) => (
            <button
              key={mode}
              onClick={() => setActiveGameMode(activeGameMode === mode ? null : mode)}
              className={`flex-shrink-0 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm transition-all ${
                activeGameMode === mode
                  ? 'bg-[#FF4D00] text-white shadow-[0_0_15px_rgba(255,77,0,0.3)]'
                  : 'bg-[#1a1a1f] text-gray-300 border border-gray-800 hover:border-gray-700'
              }`}
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
            >
              {mode}
            </button>
          ))}

          <button
            onClick={() => setIsFilterModalOpen(true)}
            className="flex-shrink-0 flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#1a1a1f] text-gray-300 border border-gray-800 hover:border-[#FF4D00] hover:shadow-[0_0_15px_rgba(255,77,0,0.2)] rounded-lg text-xs sm:text-sm transition-all"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
          >
            <SlidersHorizontal size={16} />
            FILTERS
          </button>
        </div>

        {/* Tournament List */}
        <div className="space-y-3 sm:space-y-4 pb-8 sm:pb-12">
          {tournaments.map((tournament, index) => (
            <TournamentCard key={index} {...tournament} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-1 sm:gap-2 pb-12 sm:pb-16">
          <button 
            className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-[#FF4D00] text-white rounded-lg shadow-[0_0_15px_rgba(255,77,0,0.3)] transition-all text-sm sm:text-base"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
          >
            1
          </button>
          {[2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-[#1a1a1f] text-gray-400 hover:bg-[#2a2a2f] hover:text-white border border-gray-800 rounded-lg transition-all text-sm sm:text-base"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
            >
              {page}
            </button>
          ))}
          <span className="text-gray-600 px-1 sm:px-2 text-sm sm:text-base">...</span>
          <button
            className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-[#1a1a1f] text-gray-400 hover:bg-[#2a2a2f] hover:text-white border border-gray-800 rounded-lg transition-all text-sm sm:text-base"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
          >
            32
          </button>
        </div>
      </div>

      {/* Filter Modal */}
      <FilterModal isOpen={isFilterModalOpen} onClose={() => setIsFilterModalOpen(false)} />
    </div>
  );
}