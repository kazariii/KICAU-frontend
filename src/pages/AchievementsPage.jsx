import { useState, useEffect } from "react";
import Icon from "../components/Icon";
import Kimo from "../components/Kimo";
import { Sparkles } from "../components/Sparkles";
import { useAuthStore } from "../store/authStore";

export default function AchievementsPage() {
  const user = useAuthStore((s) => s.user);
  const [period, setPeriod] = useState("hari");
  const [animPct, setAnimPct] = useState(0);

  useEffect(() => {
    const id = requestAnimationFrame(() => setAnimPct(1));
    return () => cancelAnimationFrame(id);
  }, [period]);

  const stats = [
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
    hari: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
    minggu: ["M1", "M2", "M3", "M4", "M5", "M6", "M7"],
    bulan: ["Jan", "Feb", "Mar", "Apr"],
  };
  const labels = labelsMap[period];
  const max = Math.max(...data) * 1.2;

  const w = 520,
    h = 180,
    pad = 20;
  const stepX = (w - pad * 2) / (data.length - 1);
  const points = data.map((v, i) => [
    pad + i * stepX,
    h - pad - (v / max) * (h - pad * 2),
  ]);
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
    {
      id: 1,
      name: "Pahlawan Berbagi",
      desc: "Selesai 5 cerita 'berbagi'",
      earned: true,
      color: "#FFD8E3",
      icon: "heart",
    },
    {
      id: 2,
      name: "Si Jujur Hebat",
      desc: "Pilihan jujur 10x berturut",
      earned: true,
      color: "#FFE4BC",
      icon: "check",
    },
    {
      id: 3,
      name: "Penabung Cilik",
      desc: "Selesai 3 cerita 'menabung'",
      earned: true,
      color: "#D9D5F4",
      icon: "wallet",
    },
    {
      id: 4,
      name: "Petualang Cerdas",
      desc: "10 jelajah selesai",
      earned: false,
      color: "#C7E4C2",
      icon: "compass",
    },
    {
      id: 5,
      name: "Master Cerita",
      desc: "Selesaikan 25 cerita",
      earned: false,
      color: "#FCD968",
      icon: "trophy",
    },
    {
      id: 6,
      name: "Pembelajar Setia",
      desc: "Belajar 30 hari beruntun",
      earned: false,
      color: "#BFE3F3",
      icon: "fire",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl px-7 pb-20 pt-8">
      {/* Hero */}
      <div className="relative mb-5.5 overflow-hidden rounded-[32px] border border-line bg-linear-to-br from-[#FFE4BC] to-[#FFB672] shadow-card">
        <Sparkles count={14} seed={5} />
        <div className="relative z-1 flex items-center gap-6 px-8 py-7">
          <div className="animate-float">
            <Kimo pose="celebrate" size={140} />
          </div>
          <div className="flex-1">
            <div className="text-xs font-extrabold uppercase tracking-[0.06em] text-brand-700">
              Profil Belajar
            </div>
            <h1 className="mt-1 text-4xl">Hebat sekali, {user.name}!</h1>
            <p className="mt-1.5 font-bold text-ink-500">
              Total XP: <span className="text-brand-600">1,240</span> · Level 7
              · Pembelajar Berlian
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <Icon
                key={i}
                name="star"
                size={i === 3 ? 28 : 22}
                color={i <= 4 ? "#FCD968" : "rgba(122,69,42,0.2)"}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((s, i) => (
          <div
            key={i}
            className="flex animate-pop-in items-center gap-4 rounded-[24px] border border-line bg-white p-5.5 shadow-card"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div
              className="grid h-14 w-14 place-items-center rounded-[18px]"
              style={{ background: `${s.color}22`, color: s.color }}
            >
              <Icon name={s.icon} size={26} />
            </div>
            <div>
              <div className="font-display text-3xl font-bold leading-none text-ink-900">
                {s.value}
              </div>
              <div className="mt-1 text-xs font-extrabold text-ink-500">
                {s.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="mt-5.5 grid grid-cols-1 gap-5 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-[24px] border border-line bg-white p-6 shadow-card">
          <div className="mb-2 flex items-center justify-between">
            <div>
              <h3 className="text-[22px]">Menit Bermain</h3>
              <div className="mt-1 text-[13px] font-bold text-ink-500">
                Hari ini · <span className="text-brand-600">30 menit</span>
              </div>
            </div>
            <div className="flex gap-1 rounded-full bg-cream-100 p-1">
              {["hari", "minggu", "bulan"].map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={[
                    "rounded-full border-0 px-3.5 py-2 font-body text-xs font-extrabold capitalize transition",
                    period === p
                      ? "bg-brand-500 text-white"
                      : "bg-transparent text-ink-500",
                  ].join(" ")}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <svg viewBox={`0 0 ${w} ${h + 30}`} className="mt-2 h-55 w-full">
            <defs>
              <linearGradient id="areaG" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#FBA01F" stopOpacity="0.45" />
                <stop offset="1" stopColor="#FBA01F" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[0, 0.25, 0.5, 0.75, 1].map((g, i) => (
              <line
                key={i}
                x1={pad}
                x2={w - pad}
                y1={pad + g * (h - pad * 2)}
                y2={pad + g * (h - pad * 2)}
                stroke="rgba(122,69,42,0.08)"
                strokeDasharray="3 4"
              />
            ))}
            <path
              d={areaPath}
              fill="url(#areaG)"
              style={{
                transformOrigin: "center bottom",
                transform: `scaleY(${animPct})`,
                transition: "transform 0.8s cubic-bezier(.34,1.56,.64,1)",
              }}
            />
            <path
              d={path}
              fill="none"
              stroke="#F59330"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray="600"
              strokeDashoffset={(1 - animPct) * 600}
              style={{ transition: "stroke-dashoffset 1s ease" }}
            />
            {points.map(([x, y], i) => (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={i === peakIdx ? 6 : 3.5}
                fill={i === peakIdx ? "#F59330" : "white"}
                stroke="#F59330"
                strokeWidth="2.5"
              />
            ))}
            <g transform={`translate(${peakX} ${peakY - 18})`}>
              <rect
                x="-22"
                y="-16"
                width="44"
                height="22"
                rx="11"
                fill="#3A1F12"
              />
              <text
                x="0"
                y="-1"
                textAnchor="middle"
                fontFamily="Nunito"
                fontWeight="800"
                fontSize="11"
                fill="white"
              >
                {data[peakIdx]}m
              </text>
            </g>
            {labels.map((l, i) => (
              <text
                key={i}
                x={pad + i * stepX}
                y={h + 14}
                textAnchor="middle"
                fontFamily="Nunito"
                fontWeight="700"
                fontSize="11"
                fill="rgba(122,69,42,0.6)"
              >
                {l}
              </text>
            ))}
          </svg>
        </div>

        <div className="rounded-[24px] border border-line bg-white p-6 shadow-card">
          <h3 className="text-[22px]">Tingkat Kesuksesan</h3>
          <div className="mt-1 text-[13px] font-bold text-ink-500">
            Per nilai karakter
          </div>
          <div className="mt-4.5 flex flex-col gap-4">
            {successData.map((s, i) => (
              <div key={s.label}>
                <div className="mb-1.5 flex justify-between">
                  <div className="text-sm font-extrabold text-ink-700">
                    {s.label}
                  </div>
                  <div
                    className="font-display text-base font-semibold"
                    style={{ color: s.color }}
                  >
                    {Math.round(animPct * s.v)}%
                  </div>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-cream-100">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${animPct * s.v}%`,
                      background: `linear-gradient(90deg, ${s.color}aa, ${s.color})`,
                      transition: `width 0.8s cubic-bezier(.34,1.56,.64,1) ${i * 100}ms`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5.5 flex items-center gap-3 rounded-[18px] bg-linear-to-r from-[#FFF1DA] to-[#FFE0B0] p-4">
            <Kimo pose="thinking" size={56} />
            <div className="text-[13px] font-bold text-ink-700">
              <strong className="text-brand-700">Tip Kimo:</strong> Coba cerita
              bertema "Bijak" minggu ini untuk meningkatkan skornya!
            </div>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="mt-6 rounded-[24px] border border-line bg-white p-7 shadow-card">
        <div className="mb-4.5 flex items-center justify-between">
          <h3 className="text-2xl">Lencana</h3>
          <div className="text-[13px] font-bold text-ink-500">
            3 dari 6 diraih
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {badges.map((b, i) => (
            <div
              key={b.id}
              className={[
                "flex animate-pop-in flex-col items-center rounded-[22px] border border-line p-4.5",
                b.earned ? "" : "bg-cream-100 opacity-60",
              ].join(" ")}
              style={{
                animationDelay: `${i * 80}ms`,
                background: b.earned ? b.color : undefined,
              }}
            >
              <div
                className={[
                  "relative grid h-16 w-16 place-items-center rounded-full bg-white",
                  b.earned ? "shadow-[0_6px_0_rgba(122,69,42,0.1)]" : "",
                ].join(" ")}
              >
                <Icon
                  name={b.icon}
                  size={28}
                  color={
                    b.earned ? "var(--color-brand-600)" : "var(--color-ink-300)"
                  }
                />
                {b.earned && (
                  <div className="absolute -right-1 -top-1 grid h-5.5 w-5.5 place-items-center rounded-full border-2 border-white bg-[#7DBA6F]">
                    <Icon name="check" size={12} color="white" />
                  </div>
                )}
                {!b.earned && (
                  <div className="absolute inset-0 grid place-items-center rounded-full bg-white/70">
                    <Icon name="lock" size={20} color="var(--color-ink-300)" />
                  </div>
                )}
              </div>
              <div className="mt-2.5 text-center font-display text-sm font-semibold text-ink-900">
                {b.name}
              </div>
              <div className="mt-1 text-center text-[11px] font-bold text-ink-500">
                {b.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
