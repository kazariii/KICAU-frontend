import { useState, useEffect } from 'react';
import Icon from '../components/Icon';
import Kimo from '../components/Kimo';
import { Sparkles } from '../components/Sparkles';

export default function AchievementsPage({ user }) {
  const [period, setPeriod] = useState("hari");
  const [animPct, setAnimPct] = useState(0);

  useEffect(() => {
    const id = requestAnimationFrame(() => setAnimPct(1));
    return () => cancelAnimationFrame(id);
  }, [period]);

  const stats = [
    { icon: "clock", value: "30m", label: "Waktu Bermain", color: "#FBA01F" },
    { icon: "book", value: "12", label: "Cerita Selesai", color: "#E66B85" },
    { icon: "star", value: "90%", label: "Tingkat Sukses", color: "#FCD968" },
  ];

  const dataMap = {
    hari: [22, 38, 14, 32, 28, 45, 30],
    minggu: [120, 95, 140, 160, 180, 130, 175],
    bulan: [420, 380, 510, 480],
  };
  const data = dataMap[period];
  const labelsMap = {
    hari: ["Sen","Sel","Rab","Kam","Jum","Sab","Min"],
    minggu: ["M1","M2","M3","M4","M5","M6","M7"],
    bulan: ["Jan","Feb","Mar","Apr"],
  };
  const labels = labelsMap[period];
  const max = Math.max(...data) * 1.2;

  const w = 520, h = 180, pad = 20;
  const stepX = (w - pad * 2) / (data.length - 1);
  const points = data.map((v, i) => [pad + i * stepX, h - pad - (v / max) * (h - pad * 2)]);
  const path = points.reduce((acc, [x, y], i) => {
    if (i === 0) return `M ${x} ${y}`;
    const [px, py] = points[i - 1];
    const cx = (px + x) / 2;
    return `${acc} C ${cx} ${py}, ${cx} ${y}, ${x} ${y}`;
  }, "");
  const areaPath = `${path} L ${points[points.length - 1][0]} ${h - pad} L ${pad} ${h - pad} Z`;
  const peakIdx = data.indexOf(Math.max(...data));
  const peakX = points[peakIdx][0];
  const peakY = points[peakIdx][1];

  const successData = [
    { label: "Kejujuran", v: 95, color: "#E66B85" },
    { label: "Menabung", v: 88, color: "#F59330" },
    { label: "Berbagi", v: 76, color: "#D45872" },
    { label: "Bijak", v: 64, color: "#6F62C8" },
  ];

  const badges = [
    { id: 1, name: "Pahlawan Berbagi", desc: "Selesai 5 cerita 'berbagi'", earned: true, color: "#FFD8E3", icon: "heart" },
    { id: 2, name: "Si Jujur Hebat", desc: "Pilihan jujur 10x berturut", earned: true, color: "#FFE4BC", icon: "check" },
    { id: 3, name: "Penabung Cilik", desc: "Selesai 3 cerita 'menabung'", earned: true, color: "#D9D5F4", icon: "wallet" },
    { id: 4, name: "Petualang Cerdas", desc: "10 jelajah selesai", earned: false, color: "#C7E4C2", icon: "compass" },
    { id: 5, name: "Master Cerita", desc: "Selesaikan 25 cerita", earned: false, color: "#FCD968", icon: "trophy" },
    { id: 6, name: "Pembelajar Setia", desc: "Belajar 30 hari beruntun", earned: false, color: "#BFE3F3", icon: "fire" },
  ];

  return (
    <div className="page">
      {/* Hero */}
      <div style={{ position: "relative", overflow: "hidden", borderRadius: 32, background: "linear-gradient(135deg, #FFE4BC 0%, #FFB672 100%)", border: "1px solid var(--line)", boxShadow: "var(--shadow-md)", marginBottom: 22 }}>
        <Sparkles count={14} seed={5}/>
        <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 24, padding: "28px 32px" }}>
          <div className="anim-float"><Kimo pose="celebrate" size={140}/></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "var(--brand-700)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Profil Belajar</div>
            <h1 style={{ fontSize: 36, marginTop: 4 }}>Hebat sekali, {user.name}!</h1>
            <p style={{ marginTop: 6, color: "var(--ink-500)", fontWeight: 700 }}>Total XP: <span style={{ color: "var(--brand-600)" }}>1,240</span> · Level 7 · Pembelajar Berlian</p>
          </div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {[1,2,3,4,5].map((i) => (
              <Icon key={i} name="star" size={i === 3 ? 28 : 22} color={i <= 4 ? "#FCD968" : "rgba(122,69,42,0.2)"}/>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {stats.map((s, i) => (
          <div key={i} className="card anim-pop" style={{ padding: 22, display: "flex", alignItems: "center", gap: 16, animationDelay: `${i * 80}ms` }}>
            <div style={{ width: 56, height: 56, borderRadius: 18, background: `${s.color}22`, display: "grid", placeItems: "center", color: s.color }}><Icon name={s.icon} size={26}/></div>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 30, color: "var(--ink-900)", lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 12, fontWeight: 800, color: "var(--ink-500)", marginTop: 4 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 20, marginTop: 22 }}>
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <div>
              <h3 style={{ fontSize: 22 }}>Menit Bermain</h3>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink-500)", marginTop: 4 }}>Hari ini · <span style={{ color: "var(--brand-600)" }}>30 menit</span></div>
            </div>
            <div style={{ display: "flex", gap: 4, padding: 4, background: "var(--cream-100)", borderRadius: 999 }}>
              {["hari","minggu","bulan"].map((p) => (
                <button key={p} onClick={() => setPeriod(p)} style={{ border: 0, padding: "8px 14px", borderRadius: 999, cursor: "pointer", fontFamily: "var(--font-body)", fontWeight: 800, fontSize: 12, textTransform: "capitalize", background: period === p ? "var(--brand-500)" : "transparent", color: period === p ? "white" : "var(--ink-500)" }}>{p}</button>
              ))}
            </div>
          </div>
          <svg viewBox={`0 0 ${w} ${h + 30}`} style={{ width: "100%", height: 220, marginTop: 8 }}>
            <defs>
              <linearGradient id="areaG" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#FBA01F" stopOpacity="0.45"/>
                <stop offset="1" stopColor="#FBA01F" stopOpacity="0"/>
              </linearGradient>
            </defs>
            {[0, 0.25, 0.5, 0.75, 1].map((g, i) => (
              <line key={i} x1={pad} x2={w - pad} y1={pad + g * (h - pad * 2)} y2={pad + g * (h - pad * 2)} stroke="rgba(122,69,42,0.08)" strokeDasharray="3 4"/>
            ))}
            <path d={areaPath} fill="url(#areaG)" style={{ transformOrigin: "center bottom", transform: `scaleY(${animPct})`, transition: "transform 0.8s cubic-bezier(.34,1.56,.64,1)" }}/>
            <path d={path} fill="none" stroke="#F59330" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="600" strokeDashoffset={(1 - animPct) * 600} style={{ transition: "stroke-dashoffset 1s ease" }}/>
            {points.map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={i === peakIdx ? 6 : 3.5} fill={i === peakIdx ? "#F59330" : "white"} stroke="#F59330" strokeWidth="2.5"/>
            ))}
            <g transform={`translate(${peakX} ${peakY - 18})`}>
              <rect x="-22" y="-16" width="44" height="22" rx="11" fill="#3A1F12"/>
              <text x="0" y="-1" textAnchor="middle" fontFamily="Nunito" fontWeight="800" fontSize="11" fill="white">{data[peakIdx]}m</text>
            </g>
            {labels.map((l, i) => (
              <text key={i} x={pad + i * stepX} y={h + 14} textAnchor="middle" fontFamily="Nunito" fontWeight="700" fontSize="11" fill="rgba(122,69,42,0.6)">{l}</text>
            ))}
          </svg>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontSize: 22 }}>Tingkat Kesuksesan</h3>
          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink-500)", marginTop: 4 }}>Per nilai karakter</div>
          <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 16 }}>
            {successData.map((s, i) => (
              <div key={s.label}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <div style={{ fontWeight: 800, fontSize: 14, color: "var(--ink-700)" }}>{s.label}</div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 16, color: s.color }}>{Math.round(animPct * s.v)}%</div>
                </div>
                <div style={{ height: 12, background: "var(--cream-100)", borderRadius: 999, overflow: "hidden" }}>
                  <div style={{ width: `${animPct * s.v}%`, height: "100%", background: `linear-gradient(90deg, ${s.color}aa, ${s.color})`, borderRadius: 999, transition: `width 0.8s cubic-bezier(.34,1.56,.64,1) ${i * 100}ms` }}/>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 22, padding: 16, background: "linear-gradient(120deg, #FFF1DA, #FFE0B0)", borderRadius: 18, display: "flex", gap: 12, alignItems: "center" }}>
            <Kimo pose="thinking" size={56}/>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink-700)" }}>
              <strong style={{ color: "var(--brand-700)" }}>Tip Kimo:</strong> Coba cerita bertema "Bijak" minggu ini untuk meningkatkan skornya!
            </div>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="card" style={{ padding: 28, marginTop: 24 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
          <h3 style={{ fontSize: 24 }}>Lencana</h3>
          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink-500)" }}>3 dari 6 diraih</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 16 }}>
          {badges.map((b, i) => (
            <div key={b.id} className="anim-pop" style={{ padding: 18, borderRadius: 22, display: "flex", flexDirection: "column", alignItems: "center", border: "1px solid var(--line)", animationDelay: `${i * 80}ms`, background: b.earned ? b.color : "var(--cream-100)", opacity: b.earned ? 1 : 0.6 }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "white", display: "grid", placeItems: "center", position: "relative", boxShadow: b.earned ? "0 6px 0 rgba(122,69,42,0.1)" : "none" }}>
                <Icon name={b.icon} size={28} color={b.earned ? "var(--brand-600)" : "var(--ink-300)"}/>
                {b.earned && (
                  <div style={{ position: "absolute", top: -4, right: -4, width: 22, height: 22, borderRadius: "50%", background: "#7DBA6F", display: "grid", placeItems: "center", border: "2px solid white" }}>
                    <Icon name="check" size={12} color="white"/>
                  </div>
                )}
                {!b.earned && (
                  <div style={{ position: "absolute", inset: 0, borderRadius: "50%", display: "grid", placeItems: "center", background: "rgba(255,255,255,0.7)" }}>
                    <Icon name="lock" size={20} color="var(--ink-300)"/>
                  </div>
                )}
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14, color: "var(--ink-900)", textAlign: "center", marginTop: 10 }}>{b.name}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "var(--ink-500)", textAlign: "center", marginTop: 4 }}>{b.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
