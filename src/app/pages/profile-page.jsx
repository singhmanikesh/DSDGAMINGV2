import { useEffect, useState } from 'react';
import tournamentLogo from '../../assets/tournnament.png';

export function ProfilePage() {
  const [user, setUser] = useState(null);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  useEffect(() => {
    try {
      const raw = localStorage.getItem('dsd_user');
      if (raw) setUser(JSON.parse(raw));
    } catch (e) {
      setUser(null);
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center">
        <div className="max-w-md p-6 bg-[#0f0f14] rounded-2xl">
          <p className="mb-4">You are not logged in. Please register or login to view your profile.</p>
          <a href="/tournament/login" className="inline-block px-4 py-2 bg-[#FF4D00] rounded-full font-bold">Go to Login</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <header className="pt-6 pb-8 flex items-center justify-center">
        <img src={tournamentLogo} alt="Tournament" className="h-16 w-auto" />
      </header>

      <main className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-[#0f0f14] border border-[#222025] rounded-2xl p-6 sm:p-10 shadow-lg">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-[#111] border border-gray-700 overflow-hidden flex-shrink-0 flex items-center justify-center text-2xl font-bold text-gray-200">
              {user.avatar ? (
                <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
              ) : user.avatarInitials ? (
                <span>{user.avatarInitials}</span>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">No Avatar</div>
              )}
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold">{user.gamerName}</h2>
              <p className="text-sm text-gray-400">Steam ID: <span className="text-white font-semibold">{user.steamId}</span></p>
              <p className="text-sm text-gray-400">HP: <span className="text-white font-semibold">{user.hp ?? 100}</span></p>

              <div className="mt-4 flex items-center gap-2 flex-wrap">
                {/* tags */}
                {(user.tags && user.tags.length > 0) ? (
                  user.tags.map((t, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-[#1a1a1f] text-sm border border-[#2a2a2f]">{t}</span>
                  ))
                ) : (
                  <span className="px-3 py-1 rounded-full bg-[#1a1a1f] text-sm border border-[#2a2a2f]">Member</span>
                )}
              </div>
            </div>

            <div className="w-full md:w-auto">
              <a href="/tournaments" className="inline-block w-full md:w-auto text-center px-5 py-3 bg-[#FF4D00] rounded-full font-bold">Browse Tournaments</a>
            </div>
          </div>

          <hr className="my-6 border-gray-800" />

          <section>
            <h3 className="text-lg font-bold mb-3">Past Tournaments</h3>
            {(user.pastTournaments && user.pastTournaments.length > 0) ? (
              <ul className="space-y-2">
                {user.pastTournaments.map((t, i) => (
                  <li key={i} className="bg-[#0b0b0f] p-3 rounded-lg border border-[#222]">{t}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">You haven't joined any tournaments yet.</p>
            )}
          </section>

          <hr className="my-6 border-gray-800" />

          <section>
            <h3 className="text-lg font-bold mb-3">Change Password</h3>
            <p className="text-sm text-gray-400 mb-3">Change your account password (frontend-only).</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Old password</label>
                <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className="w-full px-3 py-2 rounded-md bg-[#0b0b0f] border border-[#222]" />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">New password</label>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full px-3 py-2 rounded-md bg-[#0b0b0f] border border-[#222]" />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">Confirm new password</label>
                <input type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} className="w-full px-3 py-2 rounded-md bg-[#0b0b0f] border border-[#222]" />
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <button onClick={() => {
                if (!oldPassword || !newPassword || !confirmNewPassword) { alert('Fill all fields'); return; }
                if (newPassword !== confirmNewPassword) { alert('New passwords do not match'); return; }
                if (!user) { alert('No user'); return; }
                if (oldPassword !== user.password) { alert('Old password is incorrect'); return; }
                const updated = { ...user, password: newPassword };
                localStorage.setItem('dsd_user', JSON.stringify(updated));
                setUser(updated);
                setOldPassword(''); setNewPassword(''); setConfirmNewPassword('');
                alert('Password updated');
              }} className="px-4 py-2 bg-[#FF4D00] rounded-md">Change Password</button>

              <button onClick={() => { setOldPassword(''); setNewPassword(''); setConfirmNewPassword(''); }} className="px-4 py-2 border rounded-md">Reset</button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
