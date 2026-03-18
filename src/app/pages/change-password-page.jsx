import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { axiosClient } from "../context/user-context";
import tournamentLogo from "../../assets/tournnament.png";

export function ChangePasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [resetStep, setResetStep] = useState("email"); // email | otp | new
  const [resetEmail, setResetEmail] = useState("");
  const [lastOtpEmail, setLastOtpEmail] = useState("");
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const otpRefs = useRef([]);
  const otpIntervalRef = useRef(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("dsd_user");
      if (raw) setUser(JSON.parse(raw));
    } catch (e) {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const stateEmail = location.state?.email || "";
    setResetEmail((prev) => prev || stateEmail || user?.email || "");
  }, [user, location.state]);

  useEffect(() => {
    return () => {
      if (otpIntervalRef.current) {
        clearInterval(otpIntervalRef.current);
      }
    };
  }, []);

  const startOtpTimer = () => {
    if (otpIntervalRef.current) {
      clearInterval(otpIntervalRef.current);
    }
    setOtpTimer(600);
    otpIntervalRef.current = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 1) {
          clearInterval(otpIntervalRef.current);
          otpIntervalRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSendOtp = async (emailOverride) => {
    const targetEmailRaw =
      typeof emailOverride === "string" ? emailOverride : resetEmail;
    const targetEmail = targetEmailRaw?.trim();
    if (!targetEmail) {
      toast.error("Please enter your email address.");
      return;
    }

    setIsSendingOtp(true);
    try {
      await axiosClient.post("/forget-password", {
        email: targetEmail,
      });
      toast.success("OTP sent to your email.");
      setResetStep("otp");
      setLastOtpEmail(targetEmail);
      setResetEmail(targetEmail);
      startOtpTimer();
    } catch (error) {
      const msg = error?.response?.data?.message || "Failed to send OTP.";
      toast.error(msg);
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...otpValues];
    next[index] = value;
    setOtpValues(next);
    if (value && index < otpRefs.current.length - 1) {
      // Defer focus to next tick so the DOM is in sync
      setTimeout(() => {
        otpRefs.current[index + 1]?.focus();
      }, 0);
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 4);
    if (!pasted) return;
    const filled = ["", "", "", ""];
    pasted.split("").forEach((digit, i) => {
      filled[i] = digit;
    });
    setOtpValues(filled);
    const targetIndex = Math.min(pasted.length - 1, otpRefs.current.length - 1);
    if (targetIndex >= 0) otpRefs.current[targetIndex]?.focus();
    e.preventDefault();
  };

  const handleVerifyOtp = async () => {
    const otp = otpValues.join("");
    if (otp.length !== 4) {
      toast.error("Enter the 4-digit code.");
      return;
    }

    const emailForOtp = (lastOtpEmail || resetEmail)?.trim();
    if (!emailForOtp) {
      toast.error("Missing email. Please resend OTP.");
      return;
    }

    setIsVerifyingOtp(true);
    try {
      const res = await axiosClient.post("/verify-otp", {
        email: emailForOtp,
        otp,
      });
      const token = res?.data?.resetToken || res?.data?.token || "";
      setResetToken(token);
      toast.success("OTP verified. Set your new password.");
      setResetStep("new");
    } catch (error) {
      const msg = error?.response?.data?.message || "OTP verification failed.";
      toast.error(msg);
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleResendOtp = async () => {
    if (otpTimer > 0) return;
    const targetEmail = (lastOtpEmail || resetEmail)?.trim();
    if (!targetEmail) {
      toast.error("Please enter your email address first.");
      return;
    }
    setOtpValues(["", "", "", ""]);
    await handleSendOtp(targetEmail);
    console.log("hii");
  };

  const handleResetPassword = async () => {
    if (!newPassword || !confirmNewPassword) {
      toast.error("Fill in both password fields.");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    if (!resetToken) {
      toast.error("Missing reset token. Please verify OTP again.");
      return;
    }

    setIsResettingPassword(true);
    try {
      await axiosClient.post("/reset-password", {
        token: resetToken,
        newPassword,
        confirmPassword: confirmNewPassword,
      });
      // On successful reset, clear auth data and redirect to login
      localStorage.removeItem("dsd_user");
      localStorage.removeItem("dsd_access_token");
      localStorage.removeItem("dsd_refresh_token");
      delete axiosClient.defaults.headers.common.Authorization;
      setUser(null);

      toast.success("Password reset successfully. Please log in again.");
      navigate("/tournament/login");
    } catch (error) {
      const msg = error?.response?.data?.message || "Password reset failed.";
      toast.error(msg);
    } finally {
      setIsResettingPassword(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <header className="pt-6 pb-8 flex items-center justify-center">
        <img src={tournamentLogo} alt="Tournament" className="h-16 w-auto" />
      </header>

      <main className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-[#0f0f14] border border-[#222025] rounded-2xl p-6 sm:p-10 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <a
              href="/profile"
              className="text-sm text-[#FF4D00] underline"
            >
              Back to Profile
            </a>
            <span className="text-sm text-gray-400">Secure your account</span>
          </div>

          <section>
            <h3 className="text-lg font-bold mb-3">Change Password</h3>

            {resetStep === "email" && (
              <div className="space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">
                    Step 1: Enter Email
                  </p>
                  <label className="block text-sm text-gray-300 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-md bg-[#0b0b0f] border border-[#222]"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleSendOtp}
                    disabled={isSendingOtp}
                    className="px-4 py-2 bg-[#FF4D00] rounded-md disabled:opacity-70"
                  >
                    {isSendingOtp ? "Sending..." : "Send OTP"}
                  </button>
                </div>
              </div>
            )}

            {resetStep === "otp" && (
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-wide text-gray-400">
                  Step 2: Enter OTP
                </p>
                <div className="flex gap-3" onPaste={handleOtpPaste}>
                  {otpValues.map((val, idx) => (
                    <input
                      key={idx}
                      ref={(el) => {
                        otpRefs.current[idx] = el;
                        return undefined;
                      }}
                      type="tel"
                      inputMode="numeric"
                      maxLength={1}
                      value={val}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      className="w-12 h-12 text-center text-lg rounded-md bg-[#0b0b0f] border border-[#222]"
                      autoFocus={idx === 0}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleVerifyOtp}
                    disabled={isVerifyingOtp}
                    className="px-4 py-2 bg-[#FF4D00] rounded-md disabled:opacity-70"
                  >
                    {isVerifyingOtp ? "Verifying..." : "Verify"}
                  </button>

                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={otpTimer > 0 || isSendingOtp}
                    className="text-sm text-[#FF4D00] underline disabled:text-gray-500 disabled:no-underline disabled:cursor-not-allowed"
                  >
                    {otpTimer > 0 ? `Resend OTP (${otpTimer}s)` : "Resend OTP"}
                  </button>
                </div>
              </div>
            )}

            {resetStep === "new" && (
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-wide text-gray-400">
                  Step 3: New Password
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-3 py-2 rounded-md bg-[#0b0b0f] border border-[#222]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Confirm Password</label>
                    <input
                      type="password"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      className="w-full px-3 py-2 rounded-md bg-[#0b0b0f] border border-[#222]"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleResetPassword}
                    disabled={isResettingPassword}
                    className="px-4 py-2 bg-[#FF4D00] rounded-md disabled:opacity-70"
                  >
                    {isResettingPassword ? "Resetting..." : "Reset Password"}
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
