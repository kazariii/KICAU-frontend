import { useMemo } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import Kimo from "../components/Kimo";
import Icon from "../components/Icon";

const CONFETTI_COLORS = [
  "#FCD968",
  "#F08A2E",
  "#E66B85",
  "#6F62C8",
  "#7DBA6F",
  "#FFC2CB",
];

function makeConfettiPieces(count) {
  return Array.from({ length: count }, (_, i) => ({
    key: i,
    x: Math.random() * 100,
    dur: 3 + Math.random() * 3,
    delay: Math.random() * 2,
    size: 6 + Math.random() * 10,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  }));
}

export default function StoryComplete() {
  const navigate = useNavigate();
  const location = useLocation();
  const result = location.state?.result;
  const pieces = useMemo(() => makeConfettiPieces(40), []);

  if (!result) return <Navigate to="/" replace />;

  const { story, value } = result;
  const onHome = () => navigate("/");
  const onNew = () => navigate("/");

  return (
    <div className="relative min-h-[calc(100vh-80px)]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {pieces.map((p) => (
          <div
            key={p.key}
            className="absolute -top-5 rounded-xs"
            style={{
              left: `${p.x}%`,
              width: p.size,
              height: p.size * 0.4,
              background: p.color,
              animation: `confetti-fall ${p.dur}s linear ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>
      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center px-7 pb-20 pt-10 text-center">
        <div className="animate-pop-in drop-shadow-[0_14px_22px_rgba(245,147,48,0.4)]">
          <Kimo pose="celebrate" size={220} />
        </div>
        <div className="mt-5 animate-slide-up">
          <div className="font-display text-base font-semibold text-ink-700">
            Nilai Utama
          </div>
          <h1 className="mt-1 text-[56px] text-brand-500">
            {value || "Kebaikan"}
          </h1>
        </div>
        <div className="mt-5.5 w-full max-w-115 animate-slide-up rounded-[24px] border border-line bg-white p-5.5 shadow-card">
          <div className="inline-block rounded-full bg-[#3A1F12] px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.06em] text-white">
            Artinya
          </div>
          <p className="mt-3 text-[15px] font-bold text-ink-700">
            {story.lesson ||
              "Kebaikan adalah memilih yang benar, bahkan saat tidak ada yang melihat."}
          </p>
        </div>
        <div className="mt-3.5 w-full max-w-115 animate-slide-up rounded-[24px] border border-line bg-linear-to-br from-[#FFF1DA] to-[#FFE0B0] p-5.5 shadow-card">
          <Kimo pose="celebrate" size={70} />
          <div className="mt-1.5 text-xs font-extrabold uppercase tracking-[0.06em] text-brand-700">
            Prestasi Baru Diraih
          </div>
          <div className="mt-1 font-display text-[26px] font-bold text-brand-600">
            Pahlawan {value || "Berbagi"}!
          </div>
          <div className="mt-1 text-xs font-extrabold text-ink-500">
            Total XP
          </div>
          <div className="font-display text-[30px] font-bold text-brand-700">
            +100 XP
          </div>
        </div>
        <div className="mt-6 flex w-full max-w-115 gap-3">
          <button
            onClick={onHome}
            className="flex-1 rounded-full border-2 border-brand-500 bg-white px-5 py-3.5 font-body text-[15px] font-extrabold text-brand-700 shadow-[0_3px_0_rgba(245,147,48,0.3)] hover:bg-brand-50"
          >
            Beranda
          </button>
          <button
            onClick={onNew}
            className="inline-flex flex-1 items-center justify-center gap-2.5 rounded-full bg-brand-500 px-5 py-3.5 font-body text-[15px] font-extrabold text-white shadow-primary hover:-translate-y-px hover:bg-brand-600 active:translate-y-0.5"
          >
            <Icon name="sparkle-grad" size={18} /> Cerita Baru
          </button>
        </div>
      </div>
    </div>
  );
}
