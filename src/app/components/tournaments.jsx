import { Calendar, Trophy, Users, Zap, Target } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';

const tournaments = [
  {
    game: 'Valorant Champions',
    image:
      'https://images.unsplash.com/photo-1623820919239-0d0ff10797a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2YWxvcmFudCUyMGVzcG9ydHMlMjBnYW1lfGVufDF8fHx8MTc3MTkzMDAzMXww&ixlib=rb-4.1.0&q=80&w=1080',
    prize: '$2,500',
    date: 'March 15, 2026',
    slots: '32 Teams',
    status: 'Open',
  },
  {
    game: 'League of Legends Clash',
    image:
      'https://images.unsplash.com/photo-1762136537222-59f23fcb4e31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWFndWUlMjBsZWdlbmRzJTIwZXNwb3J0c3xlbnwxfHx8fDE3NzE5MzAwMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    prize: '$3,000',
    date: 'March 22, 2026',
    slots: '16 Teams',
    status: 'Open',
  },
  {
    game: 'CS2 Championship',
    image:
      'https://images.unsplash.com/photo-1725273442551-168da8024986?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VudGVyJTIwc3RyaWtlJTIwZ2FtaW5nfGVufDF8fHx8MTc3MjAzODE4Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    prize: '$5,000',
    date: 'April 5, 2026',
    slots: '24 Teams',
    status: 'Filling Fast',
  },
  {
    game: 'Dota 2 Battle',
    image:
      'https://images.unsplash.com/photo-1767455471230-c0957aba5034?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb3RhJTIwMiUyMGVzcG9ydHN8ZW58MXx8fHwxNzcyMDM4MTg2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    prize: '$4,000',
    date: 'April 12, 2026',
    slots: '16 Teams',
    status: 'Open',
  },
];

export function Tournaments() {
  const navigate = useNavigate();

  const goToTournaments = () => navigate('/tournaments');

  return (
    <section id="tournaments" className="py-12 md:py-16 lg:py-24 bg-gradient-to-b from-[#0B0B0F] to-[#111118] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#FF4D00] rounded-full blur-[150px]"></div>
        <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-[#FF6A00] rounded-full blur-[150px]"></div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#FF4D00] to-[#FF6A00] px-6 py-3 rounded-full mb-6">
            <Trophy className="text-white" size={28} />
            <h2
              className="text-3xl sm:text-4xl md:text-5xl text-white tracking-wider"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800 }}
            >
              UPCOMING TOURNAMENTS
            </h2>
          </div>
          <div className="w-24 h-1 bg-[#FF4D00] mx-auto mb-6"></div>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}>
            Compete in daily tournaments with cash prizes. Join the competitive scene and prove your skills.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {tournaments.map((tournament, index) => (
            <div
              key={index}
              onClick={goToTournaments}
              className="group relative bg-[#111118] rounded-2xl overflow-hidden border-2 border-[#FF4D00]/30 hover:border-[#FF4D00] transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,77,0,0.6)] hover:transform hover:-translate-y-3 cursor-pointer"
              role="button"
              tabIndex={0}
              onKeyPress={(e) => (e.key === 'Enter' || e.key === ' ') && goToTournaments()}
            >
              {/* Image */}
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <ImageWithFallback
                  src={tournament.image}
                  alt={tournament.game}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111118] via-[#111118]/50 to-transparent"></div>

                {/* Status badge */}
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 text-xs font-bold rounded-full backdrop-blur-sm ${
                      tournament.status === 'Filling Fast'
                        ? 'bg-red-600 text-white border border-red-400'
                        : 'bg-[#FF4D00] text-white border border-orange-400'
                    }`}
                    style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
                  >
                    {tournament.status}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                <h3
                  className="text-lg sm:text-xl font-bold text-white group-hover:text-[#FF4D00] transition-colors duration-300"
                  style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
                >
                  {tournament.game}
                </h3>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
                    <Trophy size={16} className="text-[#FF4D00] flex-shrink-0" />
                    <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}>Prize Pool: <span className="text-white font-bold">{tournament.prize}</span></span>
                  </div>

                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
                    <Calendar size={16} className="text-[#FF4D00] flex-shrink-0" />
                    <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}>{tournament.date}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
                    <Users size={16} className="text-[#FF4D00] flex-shrink-0" />
                    <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}>{tournament.slots}</span>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToTournaments();
                  }}
                  className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-[#FF4D00] to-[#FF6A00] text-white rounded-xl font-bold hover:shadow-[0_0_20px_rgba(255,77,0,0.8)] transition-all duration-300 transform hover:scale-[1.02] text-sm sm:text-base uppercase"
                  style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
                >
                  Register Now
                </button>
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#FF4D00]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Bottom glow effect */}
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-[#FF4D00] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8 md:mt-12">
          <Link to="/tournaments">
            <button
              className="px-8 sm:px-10 py-3 sm:py-4 bg-transparent border-2 border-[#FF4D00] text-[#FF4D00] rounded-full font-bold hover:bg-[#FF4D00] hover:text-white hover:shadow-[0_0_30px_rgba(255,77,0,0.6)] transition-all duration-300 text-sm sm:text-base uppercase"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
            >
              View All Tournaments
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}