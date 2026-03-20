import { useEffect, useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { axiosClient } from '../context/user-context';

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
  return '';
};

const extractTournamentId = (tournament) => {
  const id = tournament?.tournamentId ?? tournament?.id;
  return id === undefined || id === null ? null : String(id);
};

export function JoinTournamentModal({
  isOpen,
  tournament,
  onClose,
  onJoined,
  defaultLeaderName = '',
  userId = '',
}) {
  const [mode, setMode] = useState('solo');
  const [teamLeaderGamerName, setTeamLeaderGamerName] = useState(defaultLeaderName || '');
  const [teamName, setTeamName] = useState('');
  const [gamerNames, setGamerNames] = useState(['']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const tournamentId = useMemo(() => extractTournamentId(tournament), [tournament]);
  const tournamentTitle = tournament?.tournamentName || tournament?.gameName || 'Tournament';

  useEffect(() => {
    if (isOpen) {
      setMode('solo');
      setTeamLeaderGamerName(defaultLeaderName || '');
      setTeamName('');
      setGamerNames(['']);
      setError('');
    }
  }, [isOpen, defaultLeaderName, tournamentId]);

  const handleClose = () => {
    if (isSubmitting) return;
    onClose?.();
  };

  const handleJoinSolo = async () => {
    if (!tournamentId) {
      setError('Missing tournament id.');
      return;
    }
    const effectiveUserId = userId || getStoredUserId();
    if (!effectiveUserId) {
      setError('User is not logged in.');
      return;
    }
    setIsSubmitting(true);
    setError('');
    try {
      const parsedUserId = Number(effectiveUserId);
      const requestValue = Number.isFinite(parsedUserId) ? parsedUserId : effectiveUserId;
      await axiosClient.post(`/tournaments/${tournamentId}/join`, { userId: requestValue });
      toast.success('Joined successfully');
      onJoined?.(tournamentId);
      onClose?.();
    } catch (err) {
      setError('Unable to join solo. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateTeam = async () => {
    if (!tournamentId) {
      setError('Missing tournament id.');
      return;
    }

    const payload = {
      tournamentId: Number(tournamentId),
      teamLeaderGamerName: (teamLeaderGamerName || '').trim(),
      teamName: (teamName || '').trim(),
      gamerNames: gamerNames.map((name) => (name || '').trim()).filter(Boolean),
    };

    if (!payload.teamLeaderGamerName || !payload.teamName || payload.gamerNames.length === 0) {
      setError('Please fill all fields and add at least one gamer name.');
      return;
    }

    setIsSubmitting(true);
    setError('');
    try {
      await axiosClient.post('/tournaments/create-team', payload);
      toast.success('Team created successfully');
      onJoined?.(tournamentId);
      onClose?.();
    } catch (err) {
      setError('Unable to create team. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !tournament) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 px-4">
      <div className="bg-[#1a1a1f] rounded-2xl shadow-2xl max-w-2xl w-full p-7 border border-gray-800">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p
              className="text-gray-400 text-xs uppercase tracking-wide"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
            >
              Join tournament
            </p>
            <h3
              className="text-white text-xl mt-1"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800 }}
            >
              {tournamentTitle}
            </h3>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="text-gray-400 hover:text-white"
            aria-label="Close join modal"
          >
            <X size={22} />
          </button>
        </div>

        <div className="flex gap-2 mb-4">
          {['solo', 'team'].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setMode(option)}
              className={`px-4 py-2 rounded-lg text-sm uppercase tracking-wide transition-all ${
                mode === option
                  ? 'bg-[#FF4D00] text-white shadow-[0_0_12px_rgba(255,77,0,0.3)]'
                  : 'bg-[#2a2a2f] text-gray-300 hover:bg-[#3a3a3f]'
              }`}
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
            >
              {option === 'solo' ? 'Join Solo' : 'Create Team'}
            </button>
          ))}
        </div>

        {mode === 'solo' ? (
          <div className="space-y-4">
            <p
              className="text-gray-400 text-sm"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}
            >
              Join this tournament as an individual player.
            </p>
            <button
              type="button"
              onClick={handleJoinSolo}
              disabled={isSubmitting}
              className={`w-full py-3 rounded-lg text-sm uppercase tracking-wide transition-all ${
                isSubmitting
                  ? 'bg-gray-700 text-gray-300 cursor-not-allowed'
                  : 'bg-[#FF4D00] text-white hover:bg-[#FF6A00] hover:shadow-[0_0_15px_rgba(255,77,0,0.4)]'
              }`}
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800 }}
            >
              {isSubmitting ? 'Joining...' : 'Join Solo'}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-lg border border-[#3a3a3f] bg-[#121218] px-4 py-3 text-[#FF6A00] text-sm font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Note: All team members should register solo before joining as a team, and each gamer name must match their registered gamer name.
            </div>

            <div className="space-y-2">
              <label
                className="text-gray-300 text-sm"
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
              >
                Team Leader Gamer Name
              </label>
              <input
                type="text"
                value={teamLeaderGamerName}
                onChange={(e) => setTeamLeaderGamerName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#0f0f14] border border-gray-800 text-white focus:border-[#FF4D00] outline-none"
                placeholder="Enter team leader gamer name"
              />
            </div>

            <div className="space-y-2">
              <label
                className="text-gray-300 text-sm"
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
              >
                Team Name
              </label>
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#0f0f14] border border-gray-800 text-white focus:border-[#FF4D00] outline-none"
                placeholder="Enter team name"
              />
            </div>

            <div className="space-y-2">
              <label
                className="text-gray-300 text-sm"
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
              >
                Gamer Names
              </label>
              <div className="space-y-2">
                {gamerNames.map((name, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => {
                        const next = [...gamerNames];
                        next[idx] = e.target.value;
                        setGamerNames(next);
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-[#0f0f14] border border-gray-800 text-white focus:border-[#FF4D00] outline-none"
                      placeholder={`Gamer ${idx + 1}`}
                    />
                    {gamerNames.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          setGamerNames((prev) => {
                            if (prev.length <= 1) return prev;
                            const next = [...prev];
                            next.splice(idx, 1);
                            return next.length ? next : [''];
                          });
                        }}
                        className="px-3 py-2 rounded-lg border border-gray-800 text-gray-300 hover:text-white hover:border-[#FF4D00] transition-colors"
                        aria-label={`Remove gamer ${idx + 1}`}
                      >
                        –
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setGamerNames((prev) => [...prev, ''])}
                  className="w-full px-3 py-2 rounded-lg border border-dashed border-[#FF4D00] text-[#FF4D00] text-sm font-semibold hover:bg-[#1a1a1f] transition-colors"
                  style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
                >
                  + Add Member
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCreateTeam}
              disabled={isSubmitting}
              className={`w-full py-3 rounded-lg text-sm uppercase tracking-wide transition-all ${
                isSubmitting
                  ? 'bg-gray-700 text-gray-300 cursor-not-allowed'
                  : 'bg-[#FF4D00] text-white hover:bg-[#FF6A00] hover:shadow-[0_0_15px_rgba(255,77,0,0.4)]'
              }`}
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800 }}
            >
              {isSubmitting ? 'Creating team...' : 'Create Team & Join'}
            </button>
          </div>
        )}

        {error && (
          <p
            className="text-red-400 text-sm mt-3"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
