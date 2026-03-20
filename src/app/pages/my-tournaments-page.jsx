import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TournamentNavbar } from '../components/tournament-navbar';
import { TournamentCard } from '../components/tournament-card';
import { axiosClient } from '../context/user-context';

export function MyTournamentsPage() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const navigate = useNavigate();
  const [tournaments, setTournaments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const getStoredUserId = () => {
    const cached = localStorage.getItem('dsd_user_id');
    if (cached) return cached;
    try {
      const raw = localStorage.getItem('dsd_user');
      if (raw) {
        const parsed = JSON.parse(raw);
        const id = parsed?.id || parsed?.user?.id;
        if (id) {
          localStorage.setItem('dsd_user_id', String(id));
          return String(id);
        }
      }
    } catch (e) {
      // ignore
    }
    return null;
  };

  const formatDate = (iso) => {
    if (!iso) return 'Date TBD';
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return 'Date TBD';
    return d.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const formatPrize = (amount) => {
    if (amount === null || amount === undefined) return 'TBD';
    const n = Number(amount);
    if (Number.isNaN(n)) return String(amount);
    return n.toLocaleString('en-US', { minimumFractionDigits: 0 });
  };

  const formatSlots = (joined) => {
    const n = Number(joined);
    if (Number.isNaN(n)) return 'Slots TBD';
    return `${n} joined`;
  };

  useEffect(() => {
    const userId = getStoredUserId();
    if (!userId) return;

    let isMounted = true;
    const fetchUserTournaments = async () => {
      setIsLoading(true);
      setError('');
      try {
        const { data } = await axiosClient.get(`/tournaments/user/${userId}`);
        if (!isMounted) return;
        if (Array.isArray(data)) {
          setTournaments(data);
        } else if (Array.isArray(data?.content)) {
          setTournaments(data.content);
        } else {
          setTournaments([]);
        }
      } catch (err) {
        if (!isMounted) return;
        setError('Unable to load your tournaments.');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchUserTournaments();

    return () => {
      isMounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const now = new Date();
    return tournaments.filter((t) => {
      const start = t?.tournamentCreated ? new Date(t.tournamentCreated) : null;
      const expiry = t?.tournamentExpiry ? new Date(t.tournamentExpiry) : null;
      const status = (() => {
        if (expiry && expiry < now) return 'finished';
        if (start && start <= now && (!expiry || expiry >= now)) return 'upcoming';
        return 'upcoming';
      })();
      if (activeTab === 'finished') return status === 'finished';
      return status === 'upcoming';
    });
  }, [tournaments, activeTab]);

  return (
    <div className="min-h-screen bg-[#0B0B0F]">
      <TournamentNavbar />
      
      <div className="pt-24 max-w-[1440px] mx-auto px-8">
        {/* Page Header */}
        <div className="py-12">
          <h1 
            className="text-4xl text-white mb-2"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800 }}
          >
            Tournaments
          </h1>
          <p 
            className="text-gray-400 text-base"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }}
          >
            Discover tournaments via FACEIT
          </p>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-8 border-b border-gray-800 mb-8">
          <Link
            to="/tournaments"
            className="pb-4 text-gray-400 hover:text-white text-sm uppercase tracking-wide transition-colors duration-200"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
          >
            Browse
          </Link>
          <button
            className="pb-4 text-[#FF4D00] text-sm uppercase tracking-wide border-b-2 border-[#FF4D00]"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
          >
            My Tournaments
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`flex items-center gap-2 px-4 py-2 rounded text-sm transition-colors duration-200 ${
              activeTab === 'upcoming'
                ? 'text-[#FF4D00]'
                : 'text-gray-400 hover:text-white'
            }`}
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
          >
            <svg 
              className="w-4 h-4" 
              viewBox="0 0 16 16" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {activeTab === 'upcoming' ? (
                <path 
                  d="M13.5 4L6 11.5L2.5 8" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              ) : (
                <rect 
                  x="2" 
                  y="2" 
                  width="12" 
                  height="12" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  rx="2"
                />
              )}
            </svg>
            Upcoming & Ongoing
          </button>
          
          <button
            onClick={() => setActiveTab('finished')}
            className={`flex items-center gap-2 px-4 py-2 rounded text-sm transition-colors duration-200 ${
              activeTab === 'finished'
                ? 'text-[#FF4D00]'
                : 'text-gray-400 hover:text-white'
            }`}
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
          >
            <svg 
              className="w-4 h-4" 
              viewBox="0 0 16 16" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {activeTab === 'finished' ? (
                <path 
                  d="M13.5 4L6 11.5L2.5 8" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              ) : (
                <rect 
                  x="2" 
                  y="2" 
                  width="12" 
                  height="12" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  rx="2"
                />
              )}
            </svg>
            Finished
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 pb-16">
          {isLoading && (
            <p className="text-gray-400" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}>
              Loading your tournaments...
            </p>
          )}

          {error && !isLoading && (
            <p className="text-red-400" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
              {error}
            </p>
          )}

          {!isLoading && !error && filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16">
              <h2 
                className="text-2xl text-white mb-3"
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
              >
                You have not joined any tournaments yet
              </h2>
              <p 
                className="text-gray-400 text-sm mb-8"
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }}
              >
                When you join, your tournaments will be shown here
              </p>
              <button
                onClick={() => navigate('/tournaments')}
                className="px-8 py-3 bg-gray-700 text-white rounded text-sm uppercase tracking-wide hover:bg-gray-600 transition-colors duration-200"
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
              >
                Find Tournaments
              </button>
            </div>
          )}

          {!isLoading && !error && filtered.map((tournament) => (
            (() => {
              const expiry = tournament?.tournamentExpiry ? new Date(tournament.tournamentExpiry) : null;
              const isExpired = expiry && !Number.isNaN(expiry.getTime()) && expiry < new Date();
              return (
                <TournamentCard
                  key={tournament?.tournamentId || `${tournament?.gameName}-${tournament?.tournamentCreated}`}
                  time={formatDate(tournament?.tournamentCreated)}
                  title={tournament?.tournamentName || tournament?.gameName || 'Tournament'}
                  organizer={tournament?.organizerName || 'Organizer'}
                  gameMode={tournament?.tournamentCategory || tournament?.gameName || 'Category'}
                  prize={formatPrize(tournament?.tournamentPrize)}
                  slots={formatSlots(tournament?.totalJoined)}
                  showJoinButton={false}
                  isExpired={isExpired}
                  statusLabel={isExpired ? 'Completed' : undefined}
                />
              );
            })()
          ))}
        </div>
      </div>
    </div>
  );
}