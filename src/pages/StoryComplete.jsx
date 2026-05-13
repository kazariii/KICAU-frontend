import Kimo from '../components/Kimo';
import Icon from '../components/Icon';

export default function StoryComplete({ result, onHome, onNew }) {
  const { story, value } = result;

  const confetti = Array.from({ length: 40 }).map((_, i) => {
    const colors = ["#FCD968", "#F08A2E", "#E66B85", "#6F62C8", "#7DBA6F", "#FFC2CB"];
    const x = Math.random() * 100;
    const dur = 3 + Math.random() * 3;
    const delay = Math.random() * 2;
    const size = 6 + Math.random() * 10;
    const c = colors[i % colors.length];
    return (
      <div key={i} style={{ position: "absolute", top: -20, left: x + "%", width: size, height: size * 0.4, background: c, borderRadius: 2, animation: `confetti-fall ${dur}s linear ${delay}s infinite` }}/>
    );
  });

  return (
    <div style={{ position: "relative", minHeight: "calc(100vh - 80px)" }}>
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>{confetti}</div>
      <div className="page" style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", paddingTop: 40 }}>
        <div className="anim-pop" style={{ filter: "drop-shadow(0 14px 22px rgba(245,147,48,0.4))" }}>
          <Kimo pose="celebrate" size={220}/>
        </div>
        <div className="anim-slide" style={{ marginTop: 20 }}>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 16, color: "var(--ink-700)" }}>Nilai Utama</div>
          <h1 style={{ fontSize: 56, color: "var(--brand-500)", marginTop: 4 }}>{value || "Kebaikan"}</h1>
        </div>
        <div className="card anim-slide" style={{ padding: 22, marginTop: 22, maxWidth: 460, width: "100%" }}>
          <div style={{ display: "inline-block", padding: "6px 16px", borderRadius: 999, background: "#3A1F12", color: "white", fontSize: 12, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase" }}>Artinya</div>
          <p style={{ marginTop: 12, fontSize: 15, fontWeight: 700, color: "var(--ink-700)" }}>
            {story.lesson || "Kebaikan adalah memilih yang benar, bahkan saat tidak ada yang melihat."}
          </p>
        </div>
        <div className="card anim-slide" style={{ padding: 22, marginTop: 14, maxWidth: 460, width: "100%", background: "linear-gradient(160deg, #FFF1DA, #FFE0B0)" }}>
          <Kimo pose="celebrate" size={70}/>
          <div style={{ fontSize: 12, fontWeight: 800, color: "var(--brand-700)", letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 6 }}>Prestasi Baru Diraih</div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 26, color: "var(--brand-600)", marginTop: 4 }}>Pahlawan {value || "Berbagi"}!</div>
          <div style={{ fontSize: 12, fontWeight: 800, color: "var(--ink-500)", marginTop: 4 }}>Total XP</div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 30, color: "var(--brand-700)" }}>+100 XP</div>
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 24, width: "100%", maxWidth: 460 }}>
          <button onClick={onHome} className="btn btn-ghost" style={{ flex: 1, padding: "14px 22px" }}>Beranda</button>
          <button onClick={onNew} className="btn btn-primary" style={{ flex: 1, padding: "14px 22px" }}>
            <Icon name="sparkle-grad" size={18}/> Cerita Baru
          </button>
        </div>
      </div>
    </div>
  );
}
