import { useState } from 'react';
import Icon from '../components/Icon';
import Kimo from '../components/Kimo';
import { Sparkles } from '../components/Sparkles';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

function CoinIcon({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      <circle cx="20" cy="20" r="18" fill="#FCD968" stroke="#E47A17" strokeWidth="2"/>
      <circle cx="20" cy="20" r="14" fill="#FBA01F" opacity="0.4"/>
      <text x="20" y="26" textAnchor="middle" fontFamily="Fredoka, sans-serif" fontWeight="700" fontSize="14" fill="#7A2A0A">Rp</text>
    </svg>
  );
}

function SegBtn({ active, onClick, children }) {
  return (
    <button type="button" onClick={onClick} style={{
      flex: 1, border: 0, cursor: "pointer",
      padding: "10px 16px", borderRadius: 999,
      fontFamily: "var(--font-body)", fontWeight: 800, fontSize: 14,
      background: active ? "white" : "transparent",
      color: active ? "var(--brand-700)" : "var(--ink-500)",
      boxShadow: active ? "var(--shadow-sm)" : "none",
      transition: "all .15s",
    }}>{children}</button>
  );
}

function Field({ label, icon, children }) {
  return (
    <label style={{ display: "block", position: "relative" }}>
      <div style={{ fontSize: 13, fontWeight: 800, color: "var(--ink-700)", marginBottom: 6 }}>{label}</div>
      <div style={{ position: "relative" }}>
        {icon && (
          <div style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "var(--ink-300)" }}>
            <Icon name={icon} size={18}/>
          </div>
        )}
        {children}
      </div>
    </label>
  );
}

function ProofPill({ icon, value, label }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
      padding: "12px 18px", background: "white", borderRadius: 18,
      border: "1px solid var(--line)", boxShadow: "var(--shadow-sm)", minWidth: 96,
    }}>
      <div style={{ color: "var(--brand-500)" }}><Icon name={icon} size={22}/></div>
      <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "var(--ink-900)" }}>{value}</div>
      <div style={{ fontSize: 11, fontWeight: 700, color: "var(--ink-500)" }}>{label}</div>
    </div>
  );
}

export default function AuthPage({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const path = mode === "login" ? "/login" : "/register";
      const body = mode === "login"
        ? { email, password }
        : { name, email, password, age };
      const res = await fetch(`${API_URL}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal masuk");
      onLogin({ name: data.user?.name || name || "Sahabat KICAU", email, age: age || 7, token: data.token });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1.1fr 1fr", background: "var(--cream-100)" }}>
      {/* Left hero */}
      <div style={{ position: "relative", background: "linear-gradient(160deg, #FFE4BC 0%, #FFD09F 60%, #FFB672 100%)", overflow: "hidden", display: "flex" }}>
        <Sparkles count={18} seed={3} />
        <div style={{ position: "relative", zIndex: 1, padding: "48px 56px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%" }}>
          <div style={{ position: "absolute", top: 32, left: 56, display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: "white", display: "grid", placeItems: "center", boxShadow: "var(--shadow-sm)" }}>
              <Icon name="sparkle-grad" size={26}/>
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 28, color: "var(--brand-700)" }}>KICAU</div>
          </div>

          <div style={{ position: "relative", marginTop: 36, marginBottom: 16 }}>
            <div className="anim-float" style={{ filter: "drop-shadow(0 12px 18px rgba(245,147,48,0.35))" }}>
              <Kimo pose="wave" size={220} />
            </div>
            <div style={{ position: "absolute", top: 30, right: 24, animation: "float 3s ease-in-out infinite" }}>
              <CoinIcon size={42} />
            </div>
            <div style={{ position: "absolute", bottom: 30, left: 4, animation: "float 4s ease-in-out 0.5s infinite" }}>
              <CoinIcon size={32} />
            </div>
          </div>

          <h1 style={{ fontSize: 40, lineHeight: 1.1, color: "var(--ink-900)", textAlign: "center", maxWidth: 420 }}>
            Cerita Cerdas, <span style={{ color: "var(--brand-500)" }}>Anak Hebat!</span>
          </h1>
          <p style={{ marginTop: 14, fontSize: 16, color: "var(--ink-500)", textAlign: "center", maxWidth: 420, fontWeight: 600 }}>
            Belajar literasi finansial sambil bermain bersama Kimo si rubah pintar.
          </p>

          <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
            <ProofPill icon="book" value="500+" label="Cerita seru"/>
            <ProofPill icon="medal" value="40" label="Lencana"/>
            <ProofPill icon="heart" value="6 nilai" label="Karakter"/>
          </div>
        </div>
      </div>

      {/* Right form */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 56px" }}>
        <div style={{ width: "100%", maxWidth: 440 }}>
          <div style={{ display: "flex", gap: 6, padding: 6, background: "var(--cream-100)", borderRadius: 999, marginBottom: 22 }}>
            <SegBtn active={mode === "login"} onClick={() => setMode("login")}>Masuk</SegBtn>
            <SegBtn active={mode === "register"} onClick={() => setMode("register")}>Daftar</SegBtn>
          </div>

          <h2 style={{ fontSize: 30, marginBottom: 6 }}>
            {mode === "login" ? "Halo lagi! 👋" : "Selamat datang! ✨"}
          </h2>
          <p style={{ color: "var(--ink-500)", fontWeight: 600, marginBottom: 22 }}>
            {mode === "login" ? "Masuk untuk lanjut petualanganmu." : "Buat akun dan mulai bermain dengan Kimo."}
          </p>

          {error && (
            <div style={{ background: "#FFE4E4", border: "1px solid #F5B8B8", borderRadius: 12, padding: "12px 16px", marginBottom: 16, color: "#9B1C1C", fontSize: 14, fontWeight: 700 }}>
              {error}
            </div>
          )}

          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {mode === "register" && (
              <Field label="Nama Anak" icon="user">
                <input className="input" placeholder="Misal: Aira" value={name} onChange={(e) => setName(e.target.value)} required style={{ paddingLeft: 46 }}/>
              </Field>
            )}
            <Field label="Email Orang Tua" icon="mail">
              <input className="input" type="email" placeholder="email@contoh.com" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ paddingLeft: 46 }}/>
            </Field>
            <Field label="Kata Sandi" icon="lock">
              <input className="input" type={showPassword ? "text" : "password"} placeholder="Minimal 6 karakter" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ paddingLeft: 46, paddingRight: 46 }}/>
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "transparent", border: 0, cursor: "pointer", padding: 4 }} aria-label="Tampilkan kata sandi">
                <Icon name="eye" size={18} color="var(--ink-300)"/>
              </button>
            </Field>
            {mode === "register" && (
              <Field label="Usia Anak">
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {[5, 6, 7, 8, 9, 10, "11+"].map((a) => (
                    <button type="button" key={a} onClick={() => setAge(a)} style={{
                      border: "2px solid", borderRadius: 999, padding: "8px 16px",
                      fontFamily: "var(--font-body)", fontWeight: 800, fontSize: 14, cursor: "pointer", transition: "all .15s",
                      background: age === a ? "var(--brand-500)" : "white",
                      color: age === a ? "white" : "var(--ink-700)",
                      borderColor: age === a ? "var(--brand-500)" : "var(--line)",
                    }}>{a}</button>
                  ))}
                </div>
              </Field>
            )}

            {mode === "login" && (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
                <label style={{ display: "inline-flex", gap: 8, alignItems: "center", fontWeight: 700, fontSize: 13, color: "var(--ink-500)" }}>
                  <input type="checkbox" defaultChecked /> Ingatkan saya
                </label>
                <a href="#" style={{ fontSize: 13, fontWeight: 700, color: "var(--brand-600)" }}>Lupa sandi?</a>
              </div>
            )}

            <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: 8, padding: "16px 22px", fontSize: 16 }}>
              {loading ? "Memuat..." : (mode === "login" ? "Masuk & Bermain" : "Buat Akun")}
              {!loading && <Icon name="sparkle-grad" size={18}/>}
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: 14, margin: "8px 0", color: "var(--ink-300)", fontWeight: 700, fontSize: 12, justifyContent: "center" }}>
              <span>atau</span>
            </div>

            <button type="button" className="btn btn-ghost" style={{ background: "white" }}>
              <Icon name="google" size={18}/> Lanjut dengan Google
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: 18, fontSize: 13, color: "var(--ink-500)", fontWeight: 600 }}>
            {mode === "login" ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
            <a href="#" onClick={(e) => { e.preventDefault(); setMode(mode === "login" ? "register" : "login"); }} style={{ color: "var(--brand-600)", fontWeight: 800 }}>
              {mode === "login" ? "Daftar gratis" : "Masuk di sini"}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
