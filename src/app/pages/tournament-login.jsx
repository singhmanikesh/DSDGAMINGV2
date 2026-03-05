import { useState } from 'react';
import { useNavigate } from 'react-router';
import tournamentLogo from '../../assets/tournnament.png';

export function TournamentLoginPage() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({
    gamerName: '',
    steamId: '',
    email: '',
    password: '',
    avatarDataUrl: '',
    tags: [],
    pastTournaments: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };


  const getInitials = (name, email) => {
    if (name && name.trim()) {
      const parts = name.trim().split(/\s+/);
      if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    if (email && email.includes('@')) return email.split('@')[0].slice(0, 2).toUpperCase();
    return 'DS';
  };

  const handleAvatar = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm((s) => ({ ...s, avatarDataUrl: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // validation: email and password are required for both register and login
    if (!form.email || !form.password) {
      alert('Email and password are required');
      return;
    }

    if (isRegister) {
      // create new user and persist (frontend-only)
      // require gamerName as mandatory for registration
      if (!form.gamerName) {
        alert('Gamer name is required for registration');
        return;
      }

      const initials = getInitials(form.gamerName, form.email);
      const user = {
        gamerName: form.gamerName || '',
        steamId: form.steamId || '',
        email: form.email,
        password: form.password,
        avatar: form.avatarDataUrl || null,
        avatarInitials: form.avatarDataUrl ? null : initials,
        tags: form.tags.length ? form.tags : [],
        pastTournaments: form.pastTournaments || [],
      };
      localStorage.setItem('dsd_user', JSON.stringify(user));
      navigate('/profile');
      return;
    }

    // Login flow: verify against stored user
    try {
      const raw = localStorage.getItem('dsd_user');
      if (!raw) {
        alert('No account found. Please register first.');
        return;
      }
      const stored = JSON.parse(raw);
      if (stored.email !== form.email) {
        alert('No account found for this email. Please register first.');
        return;
      }
      if (stored.password !== form.password) {
        alert('Incorrect password');
        return;
      }
      // success
      navigate('/profile');
    } catch (e) {
      alert('Login error');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <header className="pt-6 pb-8 flex items-center justify-center">
        <img src={tournamentLogo} alt="Tournament" className="h-16 w-auto" />
      </header>

      <main className="max-w-[920px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-[#0f0f14] border border-[#222025] rounded-2xl p-6 sm:p-10 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold">{isRegister ? 'Register' : 'Login'}</h1>
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-sm text-[#FF4D00] border border-[#FF4D00] px-3 py-1 rounded-full"
            >
              {isRegister ? 'Switch to Login' : 'Switch to Register'}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Gamer Name <span className="text-xs text-red-400">(required)</span></label>
                    <input name="gamerName" value={form.gamerName} onChange={handleChange} className="w-full px-3 py-2 rounded-md bg-[#0b0b0f] border border-[#222]" />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Steam ID <span className="text-xs text-gray-400">(optional)</span></label>
                    <input name="steamId" value={form.steamId} onChange={handleChange} className="w-full px-3 py-2 rounded-md bg-[#0b0b0f] border border-[#222]" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Email <span className="text-xs text-red-400">(required)</span></label>
                    <input name="email" value={form.email} onChange={handleChange} className="w-full px-3 py-2 rounded-md bg-[#0b0b0f] border border-[#222]" />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Password <span className="text-xs text-red-400">(required)</span></label>
                    <input name="password" type="password" value={form.password} onChange={handleChange} className="w-full px-3 py-2 rounded-md bg-[#0b0b0f] border border-[#222]" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2">Avatar (optional)</label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-[#111] flex items-center justify-center text-2xl font-bold text-gray-200 border">
                      {form.avatarDataUrl ? (
                        <img src={form.avatarDataUrl} alt="avatar" className="w-full h-full object-cover rounded-full" />
                      ) : (
                        getInitials(form.gamerName, form.email)
                      )}
                    </div>
                    <div>
                      <label className="inline-block px-4 py-2 bg-[#1a1a1f] border border-[#333] rounded-md cursor-pointer text-sm">
                        Upload Avatar
                        <input type="file" accept="image/*" onChange={handleAvatar} className="hidden" />
                      </label>
                      <p className="text-xs text-gray-400 mt-2">Optional: upload a profile image</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Email</label>
                    <input name="email" value={form.email} onChange={handleChange} className="w-full px-3 py-2 rounded-md bg-[#0b0b0f] border border-[#222]" />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Password</label>
                    <input name="password" type="password" value={form.password} onChange={handleChange} className="w-full px-3 py-2 rounded-md bg-[#0b0b0f] border border-[#222]" />
                  </div>
                </div>
              </>
            )}

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button type="submit" className="w-full sm:w-auto bg-[#FF4D00] text-white px-6 py-3 rounded-full font-bold">{isRegister ? 'Register' : 'Login'}</button>
              <button type="button" onClick={() => { setForm({ gamerName: '', steamId: '', email: '', password: '', avatarDataUrl: '', tags: [], pastTournaments: [] }); }} className="w-full sm:w-auto px-4 py-2 border border-gray-700 rounded-full">Reset</button>
            </div>

            <p className="text-sm text-gray-400 mt-4">This is a frontend-only mock. Registration stores info locally and shows your profile.</p>
          </form>
        </div>
      </main>
    </div>
  );
}
