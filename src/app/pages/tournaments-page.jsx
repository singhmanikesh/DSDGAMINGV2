import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TournamentNavbar } from '../components/tournament-navbar';
import { TournamentCard } from '../components/tournament-card';
import { FilterModal } from '../components/filter-modal';
import { JoinTournamentModal } from '../components/join-tournament-modal';
import { SlidersHorizontal } from 'lucide-react';
import { axiosClient, useUserContext } from '../context/user-context';
import ComingSoon from '../components/coming-soon';

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
    // ignore parsing errors
  }
  return null;
};

const extractTournamentId = (tournament) => {
  const id =
    tournament?.tournamentId ??
    tournament?.tournamentID ??
    tournament?.tournament_id ??
    tournament?.tournamentid ??
    tournament?.idTournament ??
    tournament?.id;
  return id === undefined || id === null ? null : String(id);
};

const getStoredGamerName = () => {
  try {
    const raw = localStorage.getItem('dsd_user');
    if (!raw) return '';
    const parsed = JSON.parse(raw);
    return parsed?.gamerName || parsed?.user?.gamerName || '';
  } catch (e) {
    return '';
  }
};

export function TournamentsPage() {
  const navigate = useNavigate();
  const { apiBaseUrl } = useUserContext();
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [activeGameMode, setActiveGameMode] = useState('ALL');
  const [tournaments, setTournaments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [joinedTournamentIds, setJoinedTournamentIds] = useState(new Set());
  const [soloJoinedIds, setSoloJoinedIds] = useState(new Set());
  const [teamCreatedIds, setTeamCreatedIds] = useState(new Set());
  const [joinInitialMode, setJoinInitialMode] = useState('solo');
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [isDescModalOpen, setIsDescModalOpen] = useState(false);
  const [descTournament, setDescTournament] = useState(null);
  const [joinUserId, setJoinUserId] = useState('');
  const pageSize = 10;
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const defaultFilters = {
    gameMode: [],
    joinable: 'all',
    status: [],
    format: [],
  };

  const [filters, setFilters] = useState(defaultFilters);

  const normalizeCategory = (value) => {
    if (!value || typeof value !== 'string') return '';
    const up = value.toUpperCase().replace(/\s+/g, '_');
    if (up === 'CSGO') return 'CS2';
    return up;
  };

  const displayCategory = (value) => {
    const norm = normalizeCategory(value);
    return norm || 'UNKNOWN';
  };

  const gameModes = ['ALL', 'VALORANT', 'DOTA2', 'CS2'];
  const formatCategoryLabel = (value) => displayCategory(value);

  const formatDate = (isoDate) => {
    if (!isoDate) return 'Date TBD';
    try {
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date(isoDate));
    } catch (err) {
      return 'Date TBD';
    }
  };

  const getTournamentDate = (tournament) => tournament?.tournamentCreated;

  const formatPrize = (amount) => {
    if (amount === null || amount === undefined) return 'TBD';
    const value = Number(amount);
    if (Number.isNaN(value)) return String(amount);
    return value.toLocaleString('en-US', { minimumFractionDigits: 0 });
  };

  const formatSlots = (joined) => {
    const totalJoined = Number(joined);
    if (Number.isNaN(totalJoined)) return 'Slots TBD';
    return `${totalJoined} joined`;
  };

  const isFilterActive = useMemo(() => {
    const quick = activeGameMode && activeGameMode !== 'ALL';
    const modalFilters =
      (filters.gameMode && filters.gameMode.length > 0) ||
      (filters.status && filters.status.length > 0) ||
      (filters.format && filters.format.length > 0) ||
      filters.joinable === 'joinable';
    return quick || modalFilters;
  }, [activeGameMode, filters]);

  const filterSummary = useMemo(() => {
    const parts = [];
    if (activeGameMode && activeGameMode !== 'ALL') parts.push(displayCategory(activeGameMode));
    if (filters.gameMode?.length) parts.push(...filters.gameMode.map(displayCategory));
    if (filters.status?.length) parts.push(...filters.status);
    if (filters.format?.length) parts.push(...filters.format.map(displayCategory));
    if (filters.joinable === 'joinable') parts.push('JOINABLE_ONLY');
    return parts.join(' · ');
  }, [activeGameMode, filters]);

  const fetchAll = useCallback(async () => {
    const userId = getStoredUserId();
    setIsLoading(true);
    setError('');

    console.log('TournamentsPage: fetching tournaments from API', { page, pageSize, userId });

    try {
      const tournamentRequest = axiosClient.get('/tournaments/paginated', {
        params: { page, size: pageSize },
      });

      const joinedRequest = userId
        ? axiosClient.get(`/tournaments/user/${userId}`)
        : Promise.resolve({ data: [] });

      const [{ data: tournamentsData }, { data: joinedData }] = await Promise.all([
        tournamentRequest,
        joinedRequest,
      ]);

      console.log('TournamentsPage: API responses received', {
        tournamentsCount: Array.isArray(tournamentsData?.content)
          ? tournamentsData.content.length
          : Array.isArray(tournamentsData)
            ? tournamentsData.length
            : 0,
        joinedCount: Array.isArray(joinedData?.content)
          ? joinedData.content.length
          : Array.isArray(joinedData)
            ? joinedData.length
            : 0,
      });

      const items = Array.isArray(tournamentsData?.content)
        ? tournamentsData.content
        : Array.isArray(tournamentsData)
          ? tournamentsData
          : [];

      const joinedItems = Array.isArray(joinedData)
        ? joinedData
        : Array.isArray(joinedData?.content)
          ? joinedData.content
          : [];

      const ids = new Set();
      joinedItems.forEach((item) => {
        const key = extractTournamentId(item);
        if (key) ids.add(key);
      });

      setJoinedTournamentIds(ids);
      setTournaments(items);
      setTotalPages(Number.isFinite(tournamentsData?.totalPages) ? tournamentsData.totalPages : 1);
      setTotalElements(
        Number.isFinite(tournamentsData?.totalElements)
          ? tournamentsData.totalElements
          : items.length
      );
    } catch (err) {
      setError('Unable to load tournaments. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [page, pageSize]);

  useEffect(() => {
    let isMounted = true;

    const run = async () => {
      if (!isMounted) return;
      await fetchAll();
    };

    run();

    const handleFocus = () => {
      fetchAll();
    };

    window.addEventListener('focus', handleFocus);

    return () => {
      isMounted = false;
      window.removeEventListener('focus', handleFocus);
    };
  }, [apiBaseUrl, fetchAll]);

  const filteredTournaments = useMemo(() => {
    const normalize = (val) => normalizeCategory(val);
    const toDate = (val) => {
      if (!val) return null;
      const d = new Date(val);
      return Number.isNaN(d.getTime()) ? null : d;
    };

    const computeStatus = (tournament) => {
      const now = new Date();
      const start = toDate(tournament?.tournamentCreated);
      const expiry = toDate(tournament?.tournamentExpiry);

      if (expiry && expiry < now) return 'FINISHED';
      if (start && start <= now && (!expiry || expiry >= now)) return 'ONGOING';
      if (start && start > now) return 'UPCOMING';
      return 'UPCOMING';
    };

    return tournaments.filter((tournament) => {
      const category = normalize(
        tournament?.tournamentCategory || tournament?.gameMode || tournament?.category
      );
      const format = normalize(
        tournament?.tournamentFormat || tournament?.format || tournament?.tournamentCategory
      );

      if (activeGameMode && activeGameMode !== 'ALL' && category !== normalize(activeGameMode)) {
        return false;
      }

      if (filters.gameMode.length) {
        const allowed = filters.gameMode.map((mode) => normalize(mode));
        if (!allowed.includes(category)) return false;
      }

      if (filters.status.length) {
        const status = computeStatus(tournament);
        if (!filters.status.includes(status)) return false;
      }

      if (filters.format.length) {
        if (!filters.format.includes(format)) return false;
      }

      if (filters.joinable === 'joinable') {
        const joinableFlag = tournament?.isJoinable ?? tournament?.joinable;
        if (joinableFlag !== true) return false;
      }

      return true;
    });
  }, [tournaments, activeGameMode, filters]);

  const orderedTournaments = useMemo(() => {
    const now = new Date();
    return [...filteredTournaments].sort((a, b) => {
      const expA = a?.tournamentExpiry ? new Date(a.tournamentExpiry) : null;
      const expB = b?.tournamentExpiry ? new Date(b.tournamentExpiry) : null;
      const isExpiredA = expA && !Number.isNaN(expA.getTime()) && expA < now;
      const isExpiredB = expB && !Number.isNaN(expB.getTime()) && expB < now;
      if (isExpiredA === isExpiredB) return 0;
      return isExpiredA ? 1 : -1; // move expired to bottom
    });
  }, [filteredTournaments]);

  const handleApplyFilters = (newFilters) => {
    setIsFiltering(true);
    setPage(0);
    setFilters({
      gameMode: (newFilters?.gameMode || []).map(normalizeCategory),
      joinable: newFilters?.joinable || 'all',
      status: newFilters?.status || [],
      format: (newFilters?.format || []).map(normalizeCategory),
    });
  };

  useEffect(() => {
    if (!isFiltering) return undefined;
    const id = setTimeout(() => setIsFiltering(false), 200);
    return () => clearTimeout(id);
  }, [isFiltering, filters, activeGameMode, tournaments]);

  const handleOpenJoin = (tournament) => {
    setSelectedTournament(tournament);
    setJoinUserId(getStoredUserId() || '');
    setIsJoinModalOpen(true);
    setJoinInitialMode('solo');
  };

  const handleOpenJoinWithMode = (tournament, mode) => {
    setSelectedTournament(tournament);
    setJoinUserId(getStoredUserId() || '');
    setIsJoinModalOpen(true);
    setJoinInitialMode(mode === 'team' ? 'team' : 'solo');
  };

  const handleOpenDescription = (tournament) => {
    setDescTournament(tournament);
    setIsDescModalOpen(true);
  };

  const handleJoined = (tournamentId, mode = 'solo') => {
    if (!tournamentId) return;
    const key = String(tournamentId);
    setJoinedTournamentIds((prev) => {
      const next = new Set(prev);
      next.add(key);
      return next;
    });
    if (mode === 'solo') {
      setSoloJoinedIds((prev) => {
        const next = new Set(prev);
        next.add(key);
        return next;
      });
    }
    if (mode === 'team') {
      setTeamCreatedIds((prev) => {
        const next = new Set(prev);
        next.add(key);
        return next;
      });
    }
    setIsJoinModalOpen(false);
    fetchAll();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <TournamentNavbar />
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

        {/* Tabs
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
        </div> */}

        {/* Coming Soon after headline and tabs */}
        <div className="flex items-center justify-center my-8">
          <ComingSoon />
        </div>

        {/* Filters
        <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 overflow-x-auto pb-2">
          {gameModes.map((mode) => (
            <button
              key={mode}
              onClick={() => {
                setIsFiltering(true);
                const nextMode = activeGameMode === mode ? 'ALL' : mode;
                setActiveGameMode(nextMode);
                setPage(0);
                if (nextMode === 'ALL') {
                  setFilters(defaultFilters);
                }
              }}
              className={`flex-shrink-0 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm transition-all ${
                activeGameMode === mode
                  ? 'bg-[#FF4D00] text-white shadow-[0_0_15px_rgba(255,77,0,0.3)]'
                  : 'bg-[#1a1a1f] text-gray-300 border border-gray-800 hover:border-gray-700'
              }`}
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
            >
              {formatCategoryLabel(mode)}
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

          {filterSummary && (
            <span
              className="text-[11px] sm:text-xs text-gray-400 bg-[#1a1a1f] border border-gray-800 px-3 py-1 rounded-lg"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
            >
              {filterSummary}
            </span>
          )}
        </div> */}

        {/* Tournament List */}
        {/* <div className="space-y-3 sm:space-y-4 pb-8 sm:pb-12">
          {(isLoading || isFiltering) && (
            <p className="text-gray-400" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}>
              {isLoading ? 'Loading tournaments...' : 'Applying filters...'}
            </p>
          )}

          {error && !isLoading && (
            <p className="text-red-400" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
              {error}
            </p>
          )}

          {!isLoading && !error && filteredTournaments.length === 0 && (
            <p className="text-gray-400" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}>
              {isFilterActive ? 'No record found for this category.' : 'No tournaments found.'}
            </p>
          )}

          {!isLoading && !error && orderedTournaments.map((tournament) => {
            const tournamentKey = extractTournamentId(tournament);
            const isJoined = tournamentKey ? joinedTournamentIds.has(tournamentKey) : false;
            // Solo joins stay disabled when the user already joined; team creation is only disabled if they actually created a team.
            const isSoloJoinedFlag = isJoined || (tournamentKey ? soloJoinedIds.has(tournamentKey) : false);
            const hasCreatedTeamFlag = tournamentKey ? teamCreatedIds.has(tournamentKey) : false;
            const status = (() => {
              const now = new Date();
              const expiry = tournament?.tournamentExpiry ? new Date(tournament.tournamentExpiry) : null;
              if (expiry && !Number.isNaN(expiry.getTime()) && expiry < now) return 'COMPLETED';
              return null;
            })();
            return (
              <TournamentCard
                key={tournament?.tournamentId || `${tournament?.gameName}-${tournament?.tournamentCreated}`}
                time={formatDate(getTournamentDate(tournament))}
                title={tournament?.tournamentName || tournament?.gameName || 'Tournament'}
                organizer={tournament?.organizerName || 'Organizer'}
                gameMode={displayCategory(tournament?.tournamentCategory || tournament?.gameName || 'Wingman')}
                prize={formatPrize(tournament?.tournamentPrize)}
                hpReward={tournament?.hpReward}
                slots={formatSlots(tournament?.totalJoined)}
                isJoined={isJoined}
                isExpired={status === 'COMPLETED'}
                statusLabel={status === 'COMPLETED' ? 'Completed' : undefined}
                onCardClick={() => handleOpenDescription(tournament)}
                onJoinSolo={() => handleOpenJoinWithMode(tournament, 'solo')}
                onCreateTeam={() => handleOpenJoinWithMode(tournament, 'team')}
                isSoloJoined={isSoloJoinedFlag}
                hasCreatedTeam={hasCreatedTeamFlag}
              />
            );
          })}
        </div> */}

        {/* Pagination */}
        {/* <div className="flex justify-center items-center gap-1 sm:gap-2 pb-12 sm:pb-16">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg border transition-all text-sm sm:text-base ${
              page === 0
                ? 'bg-[#0f0f14] text-gray-600 border-gray-800 cursor-not-allowed'
                : 'bg-[#1a1a1f] text-gray-300 border-gray-800 hover:bg-[#2a2a2f]'
            }`}
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
            aria-label="Previous page"
          >
            «
          </button>

          {Array.from({ length: totalPages }, (_, i) => i).map((i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg transition-all text-sm sm:text-base ${
                page === i
                  ? 'bg-[#FF4D00] text-white shadow-[0_0_15px_rgba(255,77,0,0.3)]'
                  : 'bg-[#1a1a1f] text-gray-300 border border-gray-800 hover:bg-[#2a2a2f]'
              }`}
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg border transition-all text-sm sm:text-base ${
              page >= totalPages - 1
                ? 'bg-[#0f0f14] text-gray-600 border-gray-800 cursor-not-allowed'
                : 'bg-[#1a1a1f] text-gray-300 border-gray-800 hover:bg-[#2a2a2f]'
            }`}
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
            aria-label="Next page"
          >
            »
          </button>
        </div> */}
      </div>

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={handleApplyFilters}
        initialFilters={filters}
      />

      <JoinTournamentModal
        isOpen={isJoinModalOpen}
        tournament={selectedTournament}
        onClose={() => setIsJoinModalOpen(false)}
        onJoined={handleJoined}
        defaultLeaderName={getStoredGamerName()}
        userId={joinUserId}
        initialMode={joinInitialMode}
      />

      Description Modal
      {isDescModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-xl bg-[#0f0f14] border border-[#222025] rounded-2xl p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-400" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                  {formatDate(getTournamentDate(descTournament))}
                </p>
                <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800 }}>
                  {descTournament?.tournamentName || descTournament?.gameName || 'Tournament'}
                </h3>
                <p className="text-sm text-gray-400" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}>
                  Organized by {descTournament?.organizerName || 'Organizer'}
                </p>
              </div>
              <button
                onClick={() => setIsDescModalOpen(false)}
                className="text-gray-400 hover:text-white text-sm font-semibold"
                aria-label="Close description"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-sm text-gray-200" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}>
              <p className="text-gray-300 whitespace-pre-line">{descTournament?.description || 'No description available.'}</p>
              <div className="grid grid-cols-2 gap-3 text-xs text-gray-400">
                <span>Game Mode: <strong className="text-white">{displayCategory(descTournament?.tournamentCategory || descTournament?.gameName || 'N/A')}</strong></span>
                <span>Prize: <strong className="text-white">{formatPrize(descTournament?.tournamentPrize)}</strong></span>
                <span>HP Reward: <strong className="text-white">{descTournament?.hpReward ?? '—'}</strong></span>
                <span>Joined: <strong className="text-white">{formatSlots(descTournament?.totalJoined)}</strong></span>
                <span>Expiry: <strong className="text-white">{descTournament?.tournamentExpiry || 'TBD'}</strong></span>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setIsDescModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-[#1a1a1f] border border-gray-700 text-gray-200 text-sm hover:border-gray-500"
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    
  );
}