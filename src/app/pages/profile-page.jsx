import { useEffect, useState } from "react";
import tournamentLogo from "../../assets/tournnament.png";
import dsdProfileLogo from "../../assets/DSD logo profile.png";
import { axiosClient } from "../context/user-context";

const getStoredUserId = () => {
  const cached = localStorage.getItem("dsd_user_id");
  if (cached) return cached;
  try {
    const raw = localStorage.getItem("dsd_user");
    if (raw) {
      const parsed = JSON.parse(raw);
      const id = parsed?.id || parsed?.user?.id;
      if (id) {
        localStorage.setItem("dsd_user_id", String(id));
        return String(id);
      }
    }
  } catch (e) {
    // ignore
  }
  return null;
};

export function ProfilePage() {
  const [user, setUser] = useState(null);
  const [pastTournaments, setPastTournaments] = useState([]);
  const [isLoadingPast, setIsLoadingPast] = useState(false);
  const [pastError, setPastError] = useState("");
  const avatarSrc = user?.avatarUrl || user?.avatar || null;

  useEffect(() => {
    try {
      const raw = localStorage.getItem("dsd_user");
      if (raw) setUser(JSON.parse(raw));
    } catch (e) {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const fetchPast = async () => {
      const userId = getStoredUserId();
      if (!userId) return;
      setIsLoadingPast(true);
      setPastError("");
      try {
        const { data } = await axiosClient.get(`/tournaments/user/${userId}`);
        const items = Array.isArray(data)
          ? data
          : Array.isArray(data?.content)
            ? data.content
            : [];
        const now = new Date();
        const expired = items.filter((t) => {
          const expiryRaw = t?.tournamentExpiry || t?.expiry || t?.tournamentExpiryDate;
          if (!expiryRaw) return false;
          const expiry = new Date(expiryRaw);
          return !Number.isNaN(expiry.getTime()) && expiry < now;
        });
        setPastTournaments(expired);
      } catch (err) {
        setPastError("Unable to load past tournaments.");
      } finally {
        setIsLoadingPast(false);
      }
    };

    fetchPast();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center">
        <div className="max-w-md p-6 bg-[#0f0f14] rounded-2xl">
          <p className="mb-4">
            You are not logged in. Please register or login to view your
            profile.
          </p>
          <a
            href="/tournament/login"
            className="inline-block px-4 py-2 bg-[#FF4D00] rounded-full font-bold"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <header className="pt-6 pb-8 flex items-center justify-center gap-4">
        <img src={tournamentLogo} alt="Tournament" className="h-16 w-auto object-contain" />
        <span className="text-white text-xl font-bold">X</span>
        <img
          src={dsdProfileLogo}
          alt="DSD"
          className="w-auto object-contain"
          style={{ height: '105px' }}
        />
      </header>

      <main className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-[#0f0f14] border border-[#222025] rounded-2xl p-6 sm:p-10 shadow-lg">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-[#111] border border-gray-700 overflow-hidden flex-shrink-0 flex items-center justify-center text-2xl font-bold text-gray-200">
              {avatarSrc ? (
                <img
                  src={avatarSrc}
                  alt="avatar"
                  className="w-full h-full object-cover object-center"
                />
              ) : user.avatarInitials ? (
                <span>{user.avatarInitials}</span>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Avatar
                </div>
              )}
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold">{user.gamerName}</h2>
              <p className="text-sm text-gray-400">
                Steam ID:{" "}
                <span className="text-white font-semibold">{user.steamId}</span>
              </p>
              <p className="text-sm text-gray-400">
                HP:{" "}
                <span className="text-white font-semibold">
                  {user.hp ?? 100}
                </span>
              </p>

              <div className="mt-4 flex items-center gap-2 flex-wrap">
                {/* tags */}
                {user.tags && user.tags.length > 0 ? (
                  user.tags.map((t, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-[#1a1a1f] text-sm border border-[#2a2a2f]"
                    >
                      {t}
                    </span>
                  ))
                ) : (
                  <span className="px-3 py-1 rounded-full bg-[#1a1a1f] text-sm border border-[#2a2a2f]">
                    Member
                  </span>
                )}
              </div>
            </div>

            <div className="w-full md:w-auto">
              <a
                href="/tournaments"
                className="inline-block w-full md:w-auto text-center px-5 py-3 bg-[#FF4D00] rounded-full font-bold"
              >
                Browse Tournaments
              </a>
            </div>
          </div>

          <hr className="my-6 border-gray-800" />

          <section>
            <h3 className="text-lg font-bold mb-3">Past Tournaments</h3>
            {isLoadingPast && (
              <p className="text-gray-400">Loading past tournaments...</p>
            )}
            {pastError && !isLoadingPast && (
              <p className="text-red-400">{pastError}</p>
            )}
            {!isLoadingPast && !pastError && pastTournaments.length === 0 && (
              <p className="text-gray-400">You have not completed any tournaments.</p>
            )}
            {!isLoadingPast && !pastError && pastTournaments.length > 0 && (
              <ul className="space-y-3">
                {pastTournaments.map((t, i) => (
                  <li
                    key={t?.tournamentId || t?.id || i}
                    className="bg-[#0b0b0f] p-4 rounded-lg border border-[#222] text-gray-500 opacity-75"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <p className="text-xs uppercase tracking-wide text-gray-500">Expired</p>
                        <h4 className="text-base font-semibold text-gray-300">{t?.tournamentName || t?.gameName || "Tournament"}</h4>
                        <p className="text-sm text-gray-500">{t?.organizerName || "Organizer"}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Prize</p>
                        <p className="text-sm font-semibold text-gray-400">{t?.tournamentPrize ?? "TBD"}</p>
                        <p className="text-xs text-gray-500 mt-1">HP Reward: <span className="text-gray-300">{t?.hpReward === null || t?.hpReward === undefined ? '' : t?.hpReward}</span></p>
                        <p className="text-xs text-gray-500 mt-1">Expiry: {t?.tournamentExpiry || "N/A"}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <hr className="my-6 border-gray-800" />

          <section>
            <h3 className="text-lg font-bold mb-3">Change Password</h3>
            <a
              href="/profile/change-password"
              className="inline-block px-4 py-2 bg-[#FF4D00] rounded-md font-bold"
            >
              Change Password
            </a>
          </section>
        </div>
      </main>
    </div>
  );
}
