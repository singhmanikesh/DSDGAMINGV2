import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import tournamentLogo from '../../assets/tournnament.png';
import { axiosClient, useUserContext } from '../context/user-context';

export function TournamentLoginPage() {
  const navigate = useNavigate();
  const { authMode, setAuthMode, form, updateField, resetForm, setUser } = useUserContext();
  const isRegister = authMode === 'register';
  const [forgotVisible, setForgotVisible] = useState(false);
  const [forgotStep, setForgotStep] = useState('email'); // 'email' | 'otp' | 'reset'
  const [forgotEmail, setForgotEmail] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateField(name, value);
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
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      updateField('avatarDataUrl', result);
    };
    reader.readAsDataURL(file);
  };
  const handleSubmit = async (e) => {
  e.preventDefault();
  if (isSubmitting) return;

  if (!form.email || !form.password) {
    alert('Email and password are required');
    return;
  }

  if (isRegister && !form.gamerName) {
    alert('Gamer name is required for registration');
    return;
  }

  setIsSubmitting(true);

  try {
    if (isRegister) {
      const payload = {
        email: form.email,
        gamerName: form.gamerName,
        steamId: form.steamId,
        riotId: form.riotId,
        password: form.password,
        avatar: form.avatarDataUrl || null,
        tags: form.tags,
        pastTournaments: form.pastTournaments,
      };

      const response = await axiosClient.post('/register', payload);

      if (response.status === 201) {
        const data = response.data;

        const initials = getInitials(form.gamerName, form.email);

        const storedUser = {
          ...(data?.data || data || {}),
          email: payload.email,
          gamerName: payload.gamerName,
          steamId: payload.steamId,
          riotId: payload.riotId,
          password: payload.password,
          avatar: payload.avatar,
          avatarInitials: payload.avatar ? null : initials,
          tags: payload.tags?.length ? payload.tags : [],
          pastTournaments: payload.pastTournaments || [],
          hp: 100,
        };
                    // setting in local storage
        localStorage.setItem('dsd_user', JSON.stringify(storedUser));
        setUser(storedUser);

        toast.success('Registration successful. Please login to continue.');
        setAuthMode('login');
        resetForm();
        navigate('/tournament/login');
        return;
      }
    }

    const loginPayload = { email: form.email, password: form.password };

    const response = await axiosClient.post('/login', loginPayload);

    if (response.status === 200) {
      const data = response.data;

const accessToken = data.accesstoken;
const refreshToken = data.refreshtoken;
const userData = data.user;

const storedUser = {
  ...userData,
  accessToken,
  refreshToken,
};
      if (accessToken) {
        axiosClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      }

      localStorage.setItem('dsd_user', JSON.stringify(storedUser));
      if (accessToken) localStorage.setItem('dsd_access_token', accessToken);
      if (refreshToken) localStorage.setItem('dsd_refresh_token', refreshToken);
      setUser(storedUser);

      navigate('/profile');
    }

  } catch (err) {
    const status = err?.response?.status;

    if (status === 400) {
      const serverErr = err?.response?.data?.error || err?.response?.data?.message;
      toast.error(serverErr || 'Invalid request.');
      return;
    }

    const msg =
      err?.response?.data?.message ||
      err?.message ||
      'Request failed';

    toast.error(msg);
  } finally {
    setIsSubmitting(false);
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
              onClick={() => setAuthMode(isRegister ? 'login' : 'register')}
              className="text-sm text-[#FF4D00] border border-[#FF4D00] px-3 py-1 rounded-full"
            >
              {isRegister ? 'Switch to Login' : 'Switch to Register'}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister ? (
              <>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Email <span className="text-xs text-red-400">(required)</span></label>
                    <input name="email" value={form.email} onChange={handleChange} className="w-full px-3 py-2 rounded-md bg-[#0b0b0f] border border-[#222]" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Gamer Name <span className="text-xs text-red-400">(required)</span></label>
                    <input name="gamerName" value={form.gamerName} onChange={handleChange} className="w-full px-3 py-2 rounded-md bg-[#0b0b0f] border border-[#222]" />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Steam ID</label>
                    <input name="steamId" value={form.steamId} onChange={handleChange} className="w-full px-3 py-2 rounded-md bg-[#0b0b0f] border border-[#222]" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Riot ID</label>
                    <input name="riotId" value={form.riotId} onChange={handleChange} className="w-full px-3 py-2 rounded-md bg-[#0b0b0f] border border-[#222]" />
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
              <button type="submit" disabled={isSubmitting} className="w-full sm:w-auto bg-[#FF4D00] text-white px-6 py-3 rounded-full font-bold disabled:opacity-70 disabled:cursor-not-allowed">{isSubmitting ? 'Please wait...' : isRegister ? 'Register' : 'Login'}</button>
              <button type="button" onClick={() => { resetForm(); setForgotStep('email'); setForgotVisible(false); setForgotEmail(''); setGeneratedOtp(''); setEnteredOtp(''); setNewPassword(''); setConfirmNewPassword(''); }} className="w-full sm:w-auto px-4 py-2 border border-gray-700 rounded-full">Reset</button>
            </div>

            <p className="text-sm text-gray-400 mt-4">This is a frontend-only mock. Registration stores info locally and shows your profile.</p>

            {!isRegister && (
              <div className="mt-3">
                <button type="button" onClick={() => { setForgotVisible(true); setForgotStep('email'); setForgotEmail(form.email || ''); }} className="text-sm text-[#FF4D00] underline">Forgot password?</button>
              </div>
            )}
          </form>
        </div>
      </main>

      {/* Forgot password modal (frontend-only mock) */}
      {forgotVisible && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0f0f14] border border-[#222025] rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4">Forgot Password</h3>

            {forgotStep === 'email' && (
              <div className="space-y-3">
                <label className="block text-sm text-gray-300">Email</label>
                <input value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} className="w-full px-3 py-2 rounded-md bg-[#0b0b0f] border border-[#222]" />
                <div className="flex gap-2 mt-3">
                  <button onClick={() => {
                    if (!forgotEmail) { alert('Enter your email'); return; }
                    // verify email exists in localStorage
                    const raw = localStorage.getItem('dsd_user');
                    if (!raw) { alert('No account found for this email'); return; }
                    const stored = JSON.parse(raw);
                    if (stored.email !== forgotEmail) { alert('No account found for this email'); return; }
                    // generate otp
                    const otp = Math.floor(100000 + Math.random() * 900000).toString();
                    setGeneratedOtp(otp);
                    // in a real app we'd send this via email — here we'll show a friendly notice
                    alert('OTP sent (mock): ' + otp);
                    setForgotStep('otp');
                  }} className="px-4 py-2 bg-[#FF4D00] rounded-md">Send OTP</button>
                  <button onClick={() => setForgotVisible(false)} className="px-4 py-2 border rounded-md">Cancel</button>
                </div>
              </div>
            )}

            {forgotStep === 'otp' && (
              <div className="space-y-3">
                <label className="block text-sm text-gray-300">Enter OTP</label>
                <input value={enteredOtp} onChange={(e) => setEnteredOtp(e.target.value)} className="w-full px-3 py-2 rounded-md bg-[#0b0b0f] border border-[#222]" />
                <div className="flex gap-2 mt-3">
                  <button onClick={() => {
                    if (enteredOtp === generatedOtp) {
                      setForgotStep('reset');
                    } else {
                      alert('Incorrect OTP');
                    }
                  }} className="px-4 py-2 bg-[#FF4D00] rounded-md">Verify OTP</button>
                  <button onClick={() => { setForgotStep('email'); setGeneratedOtp(''); setEnteredOtp(''); }} className="px-4 py-2 border rounded-md">Back</button>
                </div>
              </div>
            )}

            {forgotStep === 'reset' && (
              <div className="space-y-3">
                <label className="block text-sm text-gray-300">New password</label>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full px-3 py-2 rounded-md bg-[#0b0b0f] border border-[#222]" />
                <label className="block text-sm text-gray-300">Confirm password</label>
                <input type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} className="w-full px-3 py-2 rounded-md bg-[#0b0b0f] border border-[#222]" />
                <div className="flex gap-2 mt-3">
                  <button onClick={() => {
                    if (!newPassword || !confirmNewPassword) { alert('Fill both fields'); return; }
                    if (newPassword !== confirmNewPassword) { alert('Passwords do not match'); return; }
                    // update stored password
                    const raw = localStorage.getItem('dsd_user');
                    if (!raw) { alert('Unexpected error'); return; }
                    const stored = JSON.parse(raw);
                    if (stored.email !== forgotEmail) { alert('Unexpected error'); return; }
                    stored.password = newPassword;
                    localStorage.setItem('dsd_user', JSON.stringify(stored));
                    alert('Password changed. Redirecting to profile.');
                    setForgotVisible(false);
                    navigate('/profile');
                  }} className="px-4 py-2 bg-[#FF4D00] rounded-md">Save Password</button>
                  <button onClick={() => setForgotVisible(false)} className="px-4 py-2 border rounded-md">Cancel</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
