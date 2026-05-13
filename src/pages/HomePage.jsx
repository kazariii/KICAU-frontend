import { useState } from 'react';
import Icon from '../components/Icon';
import Kimo from '../components/Kimo';
import { Sparkles } from '../components/Sparkles';

export default function HomePage({ user, onCreateStory }) {
  const [idea, setIdea] = useState("");
  const [theme, setTheme] = useState(null);
  const [moral, setMoral] = useState(null);
  const [length, setLength] = useState("sedang");
  const [recording, setRecording] = useState(false);

  const themes = [
    { id: "sekolah", label: "Sekolah", icon: "school", bg: "#FFE4BC", border: "#F5B872" },
    { id: "fantasi", label: "Fantasi", icon: "fairy", bg: "#FFD8E3", border: "#F197B0" },
    { id: "belanja", label: "Belanja", icon: "bag", bg: "#D9D5F4", border: "#A89FE0" },
    { id: "jelajah", label: "Jelajah", icon: "tent", bg: "#C7E4C2", border: "#88BD7E" },
  ];

  const morals = [
    { id: "menabung", label: "Menabung", icon: "wallet", bg: "#FFE4BC", iconColor: "#E47A17" },
    { id: "kejujuran", label: "Kejujuran", icon: "heart", bg: "#FFD8E3", iconColor: "#E66B85" },
    { id: "bijak", label: "Bijak", icon: "target", bg: "#D9D5F4", iconColor: "#6F62C8" },
    { id: "berbagi", label: "Berbagi", icon: "share", bg: "#FFCFD8", iconColor: "#D45872" },
  ];

  const recents = [
    { title: "Si Kelinci Jujur", theme: "Fantasi", moral: "Kejujuran", color: "#FFD8E3", date: "Kemarin" },
    { title: "Pasar Hari Minggu", theme: "Belanja", moral: "Menabung", color: "#FFE4BC", date: "2 hari lalu" },
    { title: "Petualangan di Hutan", theme: "Jelajah", moral: "Bijak", color: "#C7E4C2", date: "5 hari lalu" },
  ];

  const dailyChallenge = { title: "Tantangan Hari Ini", desc: "Selesaikan 1 cerita bertema 'Berbagi'", progress: 0.6, reward: 25 };

  const canSubmit = idea.trim().length > 4 || theme;
  const submit = () => { if (!canSubmit) return; onCreateStory({ idea: idea.trim(), theme, moral, length }); };

  return (
    <div className="page" style={{ paddingTop: 24 }}>
      {/* Greeting */}
      <div style={{ position: "relative", overflow: "hidden", background: "linear-gradient(135deg, #FFF1DA 0%, #FFE0B0 100%)", border: "1px solid var(--line)", borderRadius: 32, padding: "32px 36px", marginBottom: 28, boxShadow: "var(--shadow-md)" }}>
        <Sparkles count={10} seed={2}/>
        <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
          <div className="anim-float"><Kimo pose="wave" size={140}/></div>
          <div style={{ flex: 1, minWidth: 240 }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14, color: "var(--brand-700)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Selamat datang kembali</div>
            <h1 style={{ fontSize: 44, lineHeight: 1.05, marginTop: 6 }}>Halo, <span style={{ color: "var(--brand-500)" }}>{user.name}!</span></h1>
            <p style={{ marginTop: 10, fontSize: 16, fontWeight: 600, color: "var(--ink-500)", maxWidth: 520 }}>Hari ini kita mau bikin cerita tentang apa? Ketik idemu, atau pilih dari di bawah.</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, background: "white", padding: "14px 22px", borderRadius: 20, boxShadow: "var(--shadow-sm)", border: "1px solid var(--line)" }}>
            <div style={{ fontSize: 32, lineHeight: 1 }}>🔥</div>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 24, color: "var(--ink-900)" }}>5 hari</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink-500)" }}>streak belajar</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.5fr) minmax(0, 1fr)", gap: 24 }}>
        {/* LEFT: builder */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div className="card" style={{ padding: 28, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -30, right: -30, opacity: 0.5 }}><Icon name="sparkle-grad" size={120}/></div>
            <h2 style={{ fontSize: 26 }}>Yuk Buat <span style={{ color: "var(--brand-500)" }}>Ceritamu!</span></h2>
            <p style={{ marginTop: 6, color: "var(--ink-500)", fontWeight: 600 }}>Ketik ide cerita, atau pakai pemandu di bawah.</p>

            <div style={{ position: "relative", marginTop: 18 }}>
              <input className="input" placeholder="Ketik ide cerita kamu di sini..." value={idea} onChange={(e) => setIdea(e.target.value)} style={{ paddingRight: 60, fontSize: 16, padding: "18px 60px 18px 22px", borderRadius: 999, borderWidth: 2 }}/>
              <button onClick={() => setRecording(!recording)} style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", width: 44, height: 44, borderRadius: "50%", border: 0, cursor: "pointer", display: "grid", placeItems: "center", boxShadow: "var(--shadow-md)", background: recording ? "var(--brand-600)" : "var(--brand-500)", animation: recording ? "pulse-ring 1.2s infinite" : "none" }} aria-label="Rekam suara">
                <Icon name="mic" size={20} color="white"/>
              </button>
            </div>

            {/* Theme picker */}
            <div style={{ marginTop: 24 }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 16, color: "var(--ink-900)", marginBottom: 12 }}>Atau Pilih Ide Cerita:</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                {themes.map((t) => (
                  <button key={t.id} onClick={() => setTheme(theme === t.id ? null : t.id)} style={{ border: "2px solid", borderRadius: 20, padding: "16px 12px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, transition: "all .15s", background: t.bg, borderColor: theme === t.id ? "var(--brand-500)" : t.border, transform: theme === t.id ? "translateY(-3px)" : "none", boxShadow: theme === t.id ? "0 8px 0 var(--brand-700), var(--shadow-md)" : `0 4px 0 ${t.border}` }}>
                    <div style={{ width: 48, height: 48, borderRadius: 14, background: "white", display: "grid", placeItems: "center", color: t.border }}><Icon name={t.icon} size={26}/></div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 16, color: "var(--ink-900)" }}>{t.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Moral picker */}
            <div style={{ marginTop: 22 }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 16, color: "var(--ink-900)", marginBottom: 12 }}>Nilai Moral:</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                {morals.map((m) => (
                  <button key={m.id} onClick={() => setMoral(moral === m.id ? null : m.id)} style={{ border: "2px solid", borderRadius: 999, padding: "8px 14px 8px 8px", display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer", transition: "all .15s", background: m.bg, borderColor: moral === m.id ? "var(--brand-500)" : "transparent", transform: moral === m.id ? "scale(1.04)" : "none" }}>
                    <span style={{ width: 26, height: 26, borderRadius: "50%", background: "white", display: "grid", placeItems: "center", color: m.iconColor }}><Icon name={m.icon} size={14}/></span>
                    <span style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 14, color: "var(--ink-900)" }}>{m.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Length picker */}
            <div style={{ marginTop: 22 }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 16, color: "var(--ink-900)", marginBottom: 12 }}>Panjang Cerita:</div>
              <div style={{ display: "flex", gap: 8, padding: 6, background: "var(--cream-100)", borderRadius: 999, width: "fit-content" }}>
                {["pendek", "sedang", "panjang"].map((l) => (
                  <button key={l} onClick={() => setLength(l)} style={{ border: 0, padding: "10px 18px", borderRadius: 999, cursor: "pointer", fontFamily: "var(--font-body)", fontWeight: 800, fontSize: 13, background: length === l ? "white" : "transparent", color: length === l ? "var(--brand-700)" : "var(--ink-500)", boxShadow: length === l ? "var(--shadow-sm)" : "none", textTransform: "capitalize" }}>
                    {l === "pendek" ? "🪶 Pendek" : l === "sedang" ? "📖 Sedang" : "📚 Panjang"}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={submit} disabled={!canSubmit} className="btn btn-primary" style={{ marginTop: 28, width: "100%", padding: "18px 22px", fontSize: 17, opacity: canSubmit ? 1 : 0.5, cursor: canSubmit ? "pointer" : "not-allowed" }}>
              <Icon name="sparkle-grad" size={20}/> Buat Cerita Sekarang!
            </button>
          </div>

          {/* Daily challenge */}
          <div className="card" style={{ padding: 24, display: "flex", alignItems: "center", gap: 18, background: "linear-gradient(120deg, #FFF1DA, #FFE0B0)" }}>
            <div style={{ width: 60, height: 60, borderRadius: 18, background: "white", display: "grid", placeItems: "center", flexShrink: 0 }}><Icon name="target" size={28} color="var(--brand-500)"/></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: "var(--brand-700)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{dailyChallenge.title}</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 18, color: "var(--ink-900)", marginTop: 2 }}>{dailyChallenge.desc}</div>
              <div style={{ marginTop: 10, height: 8, background: "rgba(255,255,255,0.6)", borderRadius: 999, overflow: "hidden" }}>
                <div style={{ width: `${dailyChallenge.progress * 100}%`, height: "100%", background: "linear-gradient(90deg, var(--brand-300), var(--brand-500))", borderRadius: 999, transition: "width .4s" }}/>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "white", padding: "6px 12px", borderRadius: 999, fontWeight: 800, fontSize: 14, color: "var(--brand-700)" }}>+{dailyChallenge.reward} XP</div>
            </div>
          </div>
        </div>

        {/* RIGHT: side */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div className="card" style={{ padding: 22, background: "linear-gradient(160deg, #2A140A, #4D2613)", color: "white", overflow: "hidden", position: "relative" }}>
            <div style={{ position: "absolute", right: -24, bottom: -24, opacity: 0.3 }}><Kimo pose="headphones" size={150}/></div>
            <div style={{ fontSize: 12, fontWeight: 800, color: "var(--brand-300)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Lanjutkan</div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 22, marginTop: 4 }}>Petualangan di Pasar</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginTop: 4, fontWeight: 600 }}>Halaman 4 dari 8</div>
            <div style={{ marginTop: 14, height: 6, background: "rgba(255,255,255,0.15)", borderRadius: 999, overflow: "hidden" }}>
              <div style={{ width: "50%", height: "100%", background: "var(--brand-300)", borderRadius: 999 }}/>
            </div>
            <button className="btn" style={{ marginTop: 16, background: "var(--brand-500)", color: "white", padding: "10px 18px", fontSize: 14 }}>
              <Icon name="play" size={14} color="white"/> Lanjutkan
            </button>
          </div>

          <div className="card" style={{ padding: 22 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <h3 style={{ fontSize: 18 }}>Cerita Terakhir</h3>
              <a href="#" style={{ color: "var(--brand-600)", fontSize: 13, fontWeight: 800 }}>Lihat semua</a>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {recents.map((r, i) => (
                <button key={i} style={{ width: "100%", border: "1px solid var(--line)", background: "var(--cream-50)", borderRadius: 16, padding: "10px 12px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer", transition: "all .15s" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: r.color, display: "grid", placeItems: "center", flexShrink: 0 }}><Icon name="book" size={22} color="var(--ink-700)"/></div>
                  <div style={{ flex: 1, textAlign: "left" }}>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14, color: "var(--ink-900)" }}>{r.title}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink-500)", marginTop: 2 }}>{r.theme} · {r.moral} · {r.date}</div>
                  </div>
                  <Icon name="play" size={16} color="var(--brand-500)"/>
                </button>
              ))}
            </div>
          </div>

          <div className="card" style={{ padding: 22, background: "linear-gradient(160deg, #FFF, #FFF7E6)", display: "flex", alignItems: "center", gap: 14 }}>
            <Kimo pose="thinking" size={70}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 16, color: "var(--ink-900)" }}>Tanya Kanca</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink-500)", marginTop: 2 }}>Asisten cerdas untuk orang tua & guru</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
