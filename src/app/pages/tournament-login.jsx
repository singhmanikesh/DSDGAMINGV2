import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import tournamentLogo from "../../assets/tournnament.png";
import { axiosClient, useUserContext } from "../context/user-context";

export function TournamentLoginPage() {
  const navigate = useNavigate();
  const { authMode, setAuthMode, form, updateField, resetForm, setUser } =
    useUserContext();
  const isRegister = authMode === "register";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registerErrors, setRegisterErrors] = useState({
    email: "",
    gamerName: "",
    password: "",
  });
  const [tempAvatar, setTempAvatar] = useState(null); // raw upload preview
  const [crop, setCrop] = useState(null); // percent crop for UI
  const [completedCrop, setCompletedCrop] = useState(null); // pixel crop for save
  const [avatarError, setAvatarError] = useState("");
  const [showCropper, setShowCropper] = useState(false);
  const imageRef = useRef(null);
  const LOCKED_CROP_SIZE = 80; // max percent size for the square crop

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const percentToPixelCrop = (percentCrop) => {
    if (!imageRef.current || !percentCrop) return null;
    const img = imageRef.current;
    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;

    return {
      x: ((percentCrop.x * img.width) / 100) * scaleX,
      y: ((percentCrop.y * img.height) / 100) * scaleY,
      width: ((percentCrop.width * img.width) / 100) * scaleX,
      height: ((percentCrop.height * img.height) / 100) * scaleY,
      unit: "px",
    };
  };

  const getLockedPercentCrop = (nextCrop) => {
    if (!imageRef.current) {
      return {
        unit: "%",
        x: 10,
        y: 10,
        width: LOCKED_CROP_SIZE,
        height: LOCKED_CROP_SIZE,
      };
    }

    const img = imageRef.current;
    const { naturalWidth: w, naturalHeight: h } = img;
    const minSide = Math.min(w, h);
    const maxSide = Math.max(w, h);
    const fitPercent = (minSide / maxSide) * 100; // largest square that always fits
    const size = clamp(Math.min(LOCKED_CROP_SIZE, fitPercent), 5, 100);

    const defaultPos = (100 - size) / 2;
    const x = clamp(nextCrop?.x ?? defaultPos, 0, 100 - size);
    const y = clamp(nextCrop?.y ?? defaultPos, 0, 100 - size);

    return {
      unit: "%",
      x,
      y,
      width: size,
      height: size,
    };
  };

  const syncCompletedCrop = (percentCrop) => {
    const pixelCrop = percentToPixelCrop(percentCrop);
    if (pixelCrop) setCompletedCrop(pixelCrop);
  };

  // Clear transient crop state when switching modes
  useEffect(() => {
    if (!isRegister) {
      setTempAvatar(null);
      setCrop(null);
      setCompletedCrop(null);
      setAvatarError("");
      updateField("avatarFileName", "");
    }
  }, [isRegister]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateField(name, value);
    if (isRegister && registerErrors[name]) {
      setRegisterErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const getInitials = (name, email) => {
    if (name && name.trim()) {
      const parts = name.trim().split(/\s+/);
      if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    if (email && email.includes("@"))
      return email.split("@")[0].slice(0, 2).toUpperCase();
    return "DS";
  };

  const handleAvatar = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarError("");
    updateField("avatarFileName", file.name || "avatar.jpg");
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setTempAvatar(reader.result);
        setCrop(null);
        setCompletedCrop(null);
        setShowCropper(true);
      }
    };
    reader.onerror = () => setAvatarError("Could not read image");
    reader.readAsDataURL(file);
    // allow re-selecting the same file by clearing the input value
    if (e.target) {
      e.target.value = "";
    }
  };

  const onImageLoad = (e) => {
    imageRef.current = e.currentTarget;
    const centeredPercent = getLockedPercentCrop({
      x: (100 - LOCKED_CROP_SIZE) / 2,
      y: (100 - LOCKED_CROP_SIZE) / 2,
    });
    setCrop(centeredPercent);
    syncCompletedCrop(centeredPercent);
  };

  const getCroppedDataUrl = () => {
    if (!imageRef.current || !completedCrop?.width || !completedCrop?.height)
      return null;

    const image = imageRef.current;
    const canvas = document.createElement("canvas");

    const cropWidth = completedCrop.width;
    const cropHeight = completedCrop.height;

    canvas.width = cropWidth;
    canvas.height = cropHeight;

    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      completedCrop.x,
      completedCrop.y,
      cropWidth,
      cropHeight,
      0,
      0,
      cropWidth,
      cropHeight
    );

    return canvas.toDataURL("image/jpeg", 0.9);
  };
     // the crops gices us a base64 data url, but we need to convert it to a File to send to the server
  const dataUrlToFile = async (dataUrl, fileName) => {
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    const type = blob.type || "image/jpeg";
    return new File([blob], fileName, { type });
  };
  const applyCrop = () => {
    const cropped = getCroppedDataUrl();
    if (!cropped) {
      setAvatarError("Please adjust the crop before saving");
      return;
    }
    updateField("avatarDataUrl", cropped);
    setTempAvatar(null);
    setShowCropper(false);
    setAvatarError("");
  };

  const closeCropper = () => {
    setTempAvatar(null);
    setCrop(null);
    setCompletedCrop(null);
    setShowCropper(false);
    setAvatarError("");
    updateField("avatarFileName", "");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (isRegister) {
      const nextErrors = {
        email: form.email ? "" : "Email is required",
        gamerName: form.gamerName ? "" : "Gamer name is required",
        password: form.password ? "" : "Password is required",
      };
      setRegisterErrors(nextErrors);
      const hasError = Object.values(nextErrors).some(Boolean);
      if (hasError) return;
    } else {
      if (!form.email || !form.password) {
        toast.error("Email and password are required");
        return;
      }
    }

    setIsSubmitting(true);

   try {
  if (isRegister) {
    const formData = new FormData();

    // ✅ Build JSON object
    const userRequest = {
      email: form.email,
      gamername: form.gamerName,
      steamid: form.steamId,
      riotid: form.riotId,
      password: form.password
      
    };

    // ✅ Append as JSON string
    formData.append("userRequest", JSON.stringify(userRequest));

    // ✅ Append avatar file (if exists)
    if (form.avatarDataUrl) {
      try {
        const file = await dataUrlToFile(
          form.avatarDataUrl,
          form.avatarFileName || "avatar.jpg"
        );

        formData.append("avatar", file);
      } catch (err) {
        console.error("avatar file conversion failed", err);
        setAvatarError("Could not process avatar");
        setIsSubmitting(false);
        return;
      }
        }

        const response = await axiosClient.post("/register", formData);

        if (response.status === 201) {
          const data = response.data;

          const initials = getInitials(form.gamerName, form.email);

          const serverUser = data?.data || data || {};
          const avatarValue =
            serverUser.avatarUrl || serverUser.avatar || serverUser.avatar_url || null;
          const storedUser = {
            ...serverUser,
            email: form.email,
            gamerName: form.gamerName,
            steamId: form.steamId,
            riotId: form.riotId,
            password: form.password,
            avatar: avatarValue,
            avatarUrl: avatarValue,
            avatarInitials: avatarValue ? null : initials,
            tags: form.tags?.length ? form.tags : [],
            pastTournaments: form.pastTournaments || [],
            hp: 100,
          };
          // setting in local storage
          localStorage.setItem("dsd_user", JSON.stringify(storedUser));
          setUser(storedUser);

          toast.success("Registration successful. Please login to continue.");
          setAuthMode("login");
          resetForm();
          navigate("/tournament/login");
          return;
        }
      }

      const loginPayload = { email: form.email, password: form.password };

      const response = await axiosClient.post("/login", loginPayload);

      if (response.status === 200) {
        const data = response.data || {};

        const accessToken = data.accesstoken;
        const refreshToken = data.refreshtoken;
        const userData = data.user || {};
        const avatarValue =
          userData.avatarUrl || userData.avatar || userData.avatar_key || null;

        const storedUser = {
          ...userData,
          id: userData.id ?? userData.userId ?? userData.user_id,
          accessToken,
          refreshToken,
          avatar: avatarValue,
          avatarUrl: avatarValue,
          avatarInitials: avatarValue
            ? null
            : getInitials(
                userData.gamerName || userData.gamername || userData.name,
                userData.email || form.email
              ),
        };

        if (accessToken) {
          axiosClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
          localStorage.setItem("dsd_access_token", accessToken);
          localStorage.setItem("accesstoken", accessToken);
        }
        if (refreshToken) {
          localStorage.setItem("dsd_refresh_token", refreshToken);
          localStorage.setItem("refreshtoken", refreshToken);
        }
        if (storedUser.id !== undefined && storedUser.id !== null) {
          localStorage.setItem("dsd_user_id", String(storedUser.id));
        }

        localStorage.setItem("dsd_user", JSON.stringify(storedUser));
        setUser(storedUser);

        toast.success("Login successful.");

        navigate("/profile");
      }
    } catch (err) {
      const status = err?.response?.status;

      if (status === 400) {
        const serverErr =
          err?.response?.data?.error || err?.response?.data?.message;
        toast.error(serverErr || "Invalid request.");
        return;
      }

      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err?.message ||
        "Request failed";

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
            <h1 className="text-2xl sm:text-3xl font-extrabold">
              {isRegister ? "Register" : "Login"}
            </h1>
            <button
              onClick={() => setAuthMode(isRegister ? "login" : "register")}
              className="text-sm text-[#FF4D00] border border-[#FF4D00] px-3 py-1 rounded-full"
            >
              {isRegister ? "Switch to Login" : "Switch to Register"}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister ? (
              <>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">
                      Email{" "}
                      <span className="text-xs text-red-400">*</span>
                    </label>
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-md bg-[#0b0b0f] border border-[#222]"
                    />
                    {registerErrors.email && (
                      <p className="mt-1 text-xs text-red-400">
                        {registerErrors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">
                      Gamer Name{" "}
                      <span className="text-xs text-red-400">*</span>
                    </label>
                    <input
                      name="gamerName"
                      value={form.gamerName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-md bg-[#0b0b0f] border border-[#222]"
                    />
                    {registerErrors.gamerName && (
                      <p className="mt-1 text-xs text-red-400">
                        {registerErrors.gamerName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm text-gray-300 mb-2">
                      Steam ID
                    </label>
                    <input
                      name="steamId"
                      value={form.steamId}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-md bg-[#0b0b0f] border border-[#222]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">
                      Riot ID
                    </label>
                    <input
                      name="riotId"
                      value={form.riotId}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-md bg-[#0b0b0f] border border-[#222]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-300 mb-2">
                      Password{" "}
                      <span className="text-xs text-red-400">*</span>
                    </label>
                    <input
                      name="password"
                      type="password"
                      value={form.password}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-md bg-[#0b0b0f] border border-[#222]"
                    />
                    {registerErrors.password && (
                      <p className="mt-1 text-xs text-red-400">
                        {registerErrors.password}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm text-gray-300">Avatar (optional)</label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-[#111] flex items-center justify-center text-2xl font-bold text-gray-200 border">
                      {form.avatarDataUrl ? (
                        <img
                          src={form.avatarDataUrl}
                          alt="avatar"
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        getInitials(form.gamerName, form.email)
                      )}
                    </div>
                    <div className="space-y-1">
                      <label className="inline-block px-4 py-2 bg-[#1a1a1f] border border-[#333] rounded-md cursor-pointer text-sm">
                        Upload Avatar
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAvatar}
                          className="hidden"
                        />
                      </label>
                      <p className="text-xs text-gray-400">Image should be less than 3MB</p>
                    </div>
                  </div>

                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-md bg-[#0b0b0f] border border-[#222]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-300 mb-2">
                      Password
                    </label>
                    <input
                      name="password"
                      type="password"
                      value={form.password}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-md bg-[#0b0b0f] border border-[#222]"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-[#FF4D00] text-white px-6 py-3 rounded-full font-bold disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting
                  ? "Please wait..."
                  : isRegister
                  ? "Register"
                  : "Login"}
              </button>
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setRegisterErrors({ email: "", gamerName: "", password: "" });
                }}
                className="w-full sm:w-auto px-4 py-2 border border-gray-700 rounded-full"
              >
                Reset
              </button>
              {!isRegister && (
                <button
                  type="button"
                  onClick={() => navigate("/tournaments")}
                  className="w-full sm:w-auto px-4 py-2 border border-[#FF4D00] text-[#FF4D00] rounded-full"
                >
                  View Tournaments
                </button>
              )}
            </div>

            {/* <p className="text-sm text-gray-400 mt-4">
              This is a frontend-only mock. Registration stores info locally and
              shows your profile.
            </p> */}

            {!isRegister && (
              <div className="mt-3">
                <button
                  type="button"
                  onClick={() =>
                    navigate("/profile/change-password", {
                      state: { email: form.email || "" },
                    })
                  }
                  className="text-sm text-[#FF4D00] underline"
                >
                  Forgot password?
                </button>
              </div>
            )}
          </form>
        </div>
      </main>

      <AvatarCropDialog
        open={showCropper}
        tempAvatar={tempAvatar}
        crop={crop}
        setCrop={setCrop}
        completedCrop={completedCrop}
        setCompletedCrop={setCompletedCrop}
        imageRef={imageRef}
        onImageLoad={onImageLoad}
        getLockedPercentCrop={getLockedPercentCrop}
        syncCompletedCrop={syncCompletedCrop}
        onSave={applyCrop}
        onCancel={closeCropper}
        avatarError={avatarError}
      />
    </div>
  );
}

// Crop modal rendered alongside the page so it overlays the form
function AvatarCropDialog({
  open,
  tempAvatar,
  crop,
  setCrop,
  completedCrop,
  setCompletedCrop,
  imageRef,
  onImageLoad,
  getLockedPercentCrop,
  syncCompletedCrop,
  onSave,
  onCancel,
  avatarError,
}) {
  if (!open || !tempAvatar) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-3xl bg-[#0f0f14] border border-[#222025] rounded-2xl shadow-xl p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Crop Avatar (1:1)</h3>
          <button
            onClick={onCancel}
            className="text-sm px-3 py-1 border border-gray-600 rounded-md"
          >
            Close
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-[#0b0b0f] border border-[#222025] rounded-xl p-3 flex justify-center">
            <ReactCrop
              crop={crop || undefined}
              aspect={1}
              keepSelection
              className="max-w-[420px] max-h-[420px] w-full"
              onChange={(_, percentCrop) => {
                const lockedCrop = getLockedPercentCrop(percentCrop);
                setCrop(lockedCrop);
                syncCompletedCrop(lockedCrop);
              }}
              onComplete={() => {
                if (crop) syncCompletedCrop(crop);
              }}
            >
              <img
                src={tempAvatar}
                alt="avatar source"
                onLoad={onImageLoad}
                className="h-full w-full max-h-[380px] object-contain"
              />
            </ReactCrop>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onSave}
              className="px-4 py-2 bg-[#FF4D00] rounded-md text-sm font-semibold"
            >
              Done
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-600 rounded-md text-sm"
            >
              Cancel
            </button>
          </div>
          {avatarError && (
            <p className="text-xs text-red-400">{avatarError}</p>
          )}
        </div>
      </div>
    </div>
  );
}
