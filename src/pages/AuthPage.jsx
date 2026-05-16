import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../components/Icon";
import Kimo from "../components/Kimo";
import { Sparkles } from "../components/Sparkles";
import { useAuthStore } from "../store/authStore";

function CoinIcon({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      <circle
        cx="20"
        cy="20"
        r="18"
        fill="#FCD968"
        stroke="#E47A17"
        strokeWidth="2"
      />
      <circle cx="20" cy="20" r="14" fill="#FBA01F" opacity="0.4" />
      <text
        x="20"
        y="26"
        textAnchor="middle"
        fontFamily="Fredoka, sans-serif"
        fontWeight="700"
        fontSize="14"
        fill="#7A2A0A"
      >
        Rp
      </text>
    </svg>
  );
}

function SegBtn({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex-1 rounded-full border-0 px-4 py-2.5 font-body text-sm font-extrabold transition",
        active
          ? "bg-white text-brand-700 shadow-soft"
          : "bg-transparent text-ink-500",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function Field({ label, icon, children }) {
  return (
    <label className="relative block">
      <div className="mb-1.5 text-[13px] font-extrabold text-ink-700">
        {label}
      </div>
      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-300">
            <Icon name={icon} size={18} />
          </div>
        )}
        {children}
      </div>
    </label>
  );
}

function FieldError({ messages }) {
  if (!messages || messages.length === 0) return null;
  return (
    <div className="mt-1.5 text-xs font-bold text-[#9B1C1C]">
      {Array.isArray(messages) ? messages[0] : String(messages)}
    </div>
  );
}

function ProofPill({ icon, value, label }) {
  return (
    <div className="flex min-w-24 flex-col items-center gap-1 rounded-[18px] border border-line bg-white px-4.5 py-3 shadow-soft">
      <div className="text-brand-500">
        <Icon name={icon} size={22} />
      </div>
      <div className="font-display text-lg font-bold text-ink-900">{value}</div>
      <div className="text-[11px] font-bold text-ink-500">{label}</div>
    </div>
  );
}

const INPUT_CLS =
  "w-full rounded-[18px] border-2 border-line bg-white py-3.5 pl-11 pr-4 font-body text-[15px] text-ink-700 outline-none transition focus:border-brand-500 focus:shadow-[0_0_0_4px_rgba(245,147,48,0.15)] placeholder:text-ink-300";

export default function AuthPage() {
  const login = useAuthStore((s) => s.login);
  const register = useAuthStore((s) => s.register);
  const loading = useAuthStore((s) => s.loading);
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [age, setAge] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  function switchMode(next) {
    setMode(next);
    setError(null);
    setFieldErrors({});
  }

  function clientValidateRegister() {
    const errs = {};
    if (!name.trim()) errs.name = ["Nama wajib diisi."];
    else if (name.length > 255) errs.name = ["Nama maksimal 255 karakter."];
    if (!email.trim()) errs.email = ["Email wajib diisi."];
    if (password.length < 8) errs.password = ["Kata sandi minimal 8 karakter."];
    if (password !== passwordConfirmation)
      errs.password_confirmation = ["Konfirmasi kata sandi tidak cocok."];
    if (age !== "" && Number(age) < 5)
      errs.children_age = ["Usia minimal 5 tahun."];
    return errs;
  }

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});
    try {
      if (mode === "login") {
        await login({ email, password });
      } else {
        const errs = clientValidateRegister();
        if (Object.keys(errs).length > 0) {
          setFieldErrors(errs);
          return;
        }
        await register({
          name: name.trim(),
          email: email.trim(),
          password,
          password_confirmation: passwordConfirmation,
          children_age: age === "" ? undefined : Number(age),
        });
      }
      navigate("/", { replace: true });
    } catch (err) {
      if (err.errors && typeof err.errors === "object") {
        setFieldErrors(err.errors);
      }
      setError(err.message);
    }
  };

  return (
    <div className="grid min-h-screen grid-cols-1 bg-cream-100 lg:grid-cols-[1.1fr_1fr]">
      {/* Left hero */}
      <div className="relative flex overflow-hidden bg-linear-to-br from-[#FFE4BC] via-[#FFD09F] to-[#FFB672]">
        <Sparkles count={18} seed={3} />
        <div className="relative z-1 flex w-full flex-col items-center justify-center px-14 py-12">
          <div className="absolute left-14 top-8 flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-[14px] bg-white shadow-soft">
              <Icon name="sparkle-grad" size={26} />
            </div>
            <div className="font-display text-[28px] font-bold text-brand-700">
              KICAU
            </div>
          </div>

          <div className="relative mb-4 mt-9">
            <div className="animate-float drop-shadow-[0_12px_18px_rgba(245,147,48,0.35)]">
              <Kimo pose="wave" size={220} />
            </div>
            <div className="absolute right-6 top-7.5 animate-float">
              <CoinIcon size={42} />
            </div>
            <div className="absolute bottom-7.5 left-1 animate-float [animation-delay:0.5s]">
              <CoinIcon size={32} />
            </div>
          </div>

          <h1 className="max-w-105 font-bold text-center text-[40px] leading-[1.1] text-ink-900">
            Cerita Cerdas, <span className="text-brand-500">Anak Hebat!</span>
          </h1>
          <p className="mt-3.5 max-w-105 text-center text-base font-semibold text-ink-500">
            Belajar literasi finansial sambil bermain bersama Kimo si rubah
            pintar.
          </p>

          <div className="mt-8 flex gap-3">
            <ProofPill icon="book" value="500+" label="Cerita seru" />
            <ProofPill icon="medal" value="40" label="Lencana" />
            <ProofPill icon="heart" value="6 nilai" label="Karakter" />
          </div>
        </div>
      </div>

      {/* Right form */}
      <div className="flex items-center justify-center px-14 py-12">
        <div className="w-full max-w-110">
          <div className="mb-5.5 flex gap-1.5 rounded-full bg-cream-100 p-1.5">
            <SegBtn
              active={mode === "login"}
              onClick={() => switchMode("login")}
            >
              Masuk
            </SegBtn>
            <SegBtn
              active={mode === "register"}
              onClick={() => switchMode("register")}
            >
              Daftar
            </SegBtn>
          </div>

          <h2 className="mb-1.5 text-[30px]">
            {mode === "login" ? "Halo lagi! 👋" : "Selamat datang! ✨"}
          </h2>
          <p className="mb-5.5 font-semibold text-ink-500">
            {mode === "login"
              ? "Masuk untuk lanjut petualanganmu."
              : "Buat akun dan mulai bermain dengan Kimo."}
          </p>

          {error && (
            <div className="mb-4 rounded-xl border border-[#F5B8B8] bg-[#FFE4E4] px-4 py-3 text-sm font-bold text-[#9B1C1C]">
              {error}
            </div>
          )}

          <form onSubmit={submit} className="flex flex-col gap-3.5">
            {mode === "register" && (
              <Field label="Nama Anak" icon="user">
                <input
                  className={INPUT_CLS}
                  placeholder="Misal: Aira"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  maxLength={255}
                />
                <FieldError messages={fieldErrors.name} />
              </Field>
            )}
            <Field label="Email Orang Tua" icon="mail">
              <input
                className={INPUT_CLS}
                type="email"
                placeholder="email@contoh.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                maxLength={255}
              />
              <FieldError messages={fieldErrors.email} />
            </Field>
            <Field label="Kata Sandi" icon="lock">
              <input
                className={INPUT_CLS + " pr-11"}
                type={showPassword ? "text" : "password"}
                placeholder={
                  mode === "register" ? "Minimal 8 karakter" : "Kata sandi"
                }
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={mode === "register" ? 8 : undefined}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Tampilkan kata sandi"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer border-0 bg-transparent p-1"
              >
                <Icon name="eye" size={18} color="var(--color-ink-300)" />
              </button>
              <FieldError messages={fieldErrors.password} />
            </Field>
            {mode === "register" && (
              <Field label="Konfirmasi Kata Sandi" icon="lock">
                <input
                  className={INPUT_CLS}
                  type={showPassword ? "text" : "password"}
                  placeholder="Ulangi kata sandi"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  required
                  minLength={8}
                />
                <FieldError messages={fieldErrors.password_confirmation} />
              </Field>
            )}
            {mode === "register" && (
              <Field label="Usia Anak">
                <div className="flex flex-wrap gap-2">
                  {[5, 6, 7, 8, 9, 10, 11].map((a) => {
                    const active = age === a;
                    return (
                      <button
                        type="button"
                        key={a}
                        onClick={() => setAge(a)}
                        className={[
                          "rounded-full border-2 px-4 py-2 font-body text-sm font-extrabold transition",
                          active
                            ? "border-brand-500 bg-brand-500 text-white"
                            : "border-line bg-white text-ink-700",
                        ].join(" ")}
                      >
                        {a === 11 ? "11+" : a}
                      </button>
                    );
                  })}
                </div>
                <FieldError messages={fieldErrors.children_age} />
              </Field>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 inline-flex items-center justify-center gap-2.5 rounded-full bg-brand-500 px-5 py-4 font-body text-base font-extrabold text-white shadow-primary transition hover:-translate-y-px hover:bg-brand-600 active:translate-y-0.5 disabled:opacity-60"
            >
              {loading
                ? "Memuat..."
                : mode === "login"
                  ? "Masuk & Bermain"
                  : "Buat Akun"}
              {!loading && <Icon name="sparkle-grad" size={18} />}
            </button>
          </form>

          <p className="mt-6 text-center text-[13px] font-semibold text-ink-500">
            {mode === "login" ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setMode(mode === "login" ? "register" : "login");
              }}
              className="font-extrabold text-brand-600"
            >
              {mode === "login" ? "Daftar gratis" : "Masuk di sini"}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
