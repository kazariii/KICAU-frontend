import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../components/Icon";
import Kimo from "../components/Kimo";
import { Sparkles } from "../components/Sparkles";
import { useAuthStore } from "../store/authStore";

const THEMES = [
  {
    id: "sekolah",
    label: "Sekolah",
    icon: "school",
    bg: "bg-[#FFE4BC]",
    border: "border-[#F5B872]",
    shadow: "shadow-[0_4px_0_#F5B872]",
    iconColor: "text-[#F5B872]",
  },
  {
    id: "fantasi",
    label: "Fantasi",
    icon: "fairy",
    bg: "bg-[#FFD8E3]",
    border: "border-[#F197B0]",
    shadow: "shadow-[0_4px_0_#F197B0]",
    iconColor: "text-[#F197B0]",
  },
  {
    id: "belanja",
    label: "Belanja",
    icon: "bag",
    bg: "bg-[#D9D5F4]",
    border: "border-[#A89FE0]",
    shadow: "shadow-[0_4px_0_#A89FE0]",
    iconColor: "text-[#A89FE0]",
  },
  {
    id: "jelajah",
    label: "Jelajah",
    icon: "tent",
    bg: "bg-[#C7E4C2]",
    border: "border-[#88BD7E]",
    shadow: "shadow-[0_4px_0_#88BD7E]",
    iconColor: "text-[#88BD7E]",
  },
];

const MORALS = [
  {
    id: "menabung",
    label: "Menabung",
    icon: "wallet",
    bg: "bg-[#FFE4BC]",
    iconColor: "text-[#E47A17]",
  },
  {
    id: "kejujuran",
    label: "Kejujuran",
    icon: "heart",
    bg: "bg-[#FFD8E3]",
    iconColor: "text-[#E66B85]",
  },
  {
    id: "bijak",
    label: "Bijak",
    icon: "target",
    bg: "bg-[#D9D5F4]",
    iconColor: "text-[#6F62C8]",
  },
  {
    id: "berbagi",
    label: "Berbagi",
    icon: "share",
    bg: "bg-[#FFCFD8]",
    iconColor: "text-[#D45872]",
  },
];

const RECENTS = [
  {
    title: "Si Kelinci Jujur",
    theme: "Fantasi",
    moral: "Kejujuran",
    color: "bg-[#FFD8E3]",
    date: "Kemarin",
  },
  {
    title: "Pasar Hari Minggu",
    theme: "Belanja",
    moral: "Menabung",
    color: "bg-[#FFE4BC]",
    date: "2 hari lalu",
  },
  {
    title: "Petualangan di Hutan",
    theme: "Jelajah",
    moral: "Bijak",
    color: "bg-[#C7E4C2]",
    date: "5 hari lalu",
  },
];

export default function HomePage() {
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();
  const [idea, setIdea] = useState("");
  const [theme, setTheme] = useState(null);
  const [moral, setMoral] = useState(null);
  const [length, setLength] = useState("sedang");
  const [recording, setRecording] = useState(false);

  const dailyChallenge = {
    title: "Tantangan Hari Ini",
    desc: "Selesaikan 1 cerita bertema 'Berbagi'",
    progress: 0.6,
    reward: 25,
  };

  const canSubmit = idea.trim().length > 4 || theme;
  const submit = () => {
    if (!canSubmit) return;
    navigate("/story", {
      state: { params: { idea: idea.trim(), theme, moral, length } },
    });
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-7 pb-20 pt-6">
      {/* Greeting */}
      <div className="relative mb-7 overflow-hidden rounded-[32px] border border-line bg-linear-to-br from-[#FFF1DA] to-[#FFE0B0] px-9 py-8 shadow-card">
        <Sparkles count={10} seed={2} />
        <div className="relative z-1 flex flex-wrap items-center gap-6">
          <div className="animate-float">
            <Kimo pose="wave" size={140} />
          </div>
          <div className="min-w-60 flex-1">
            <div className="font-display text-sm font-semibold uppercase tracking-[0.06em] text-brand-700">
              Selamat datang kembali
            </div>
            <h1 className="mt-1.5 text-[44px] leading-[1.05]">
              Halo, <span className="text-brand-500">{user?.name}!</span>
            </h1>
            <p className="mt-2.5 max-w-130 text-base font-semibold text-ink-500">
              Hari ini kita mau bikin cerita tentang apa? Ketik idemu, atau
              pilih dari di bawah.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-[20px] border border-line bg-white px-5 py-3.5 shadow-soft">
            <div className="text-3xl leading-none">🔥</div>
            <div>
              <div className="font-display text-2xl font-bold text-ink-900">
                5 hari
              </div>
              <div className="text-xs font-bold text-ink-500">
                streak belajar
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        {/* LEFT: builder */}
        <div className="flex flex-col gap-6">
          <div className="relative overflow-hidden rounded-[24px] border border-line bg-white p-7 shadow-card">
            <div className="absolute -right-8 -top-8 opacity-50">
              <Icon name="sparkle-grad" size={120} />
            </div>
            <h2 className="text-[26px]">
              Yuk Buat <span className="text-brand-500">Ceritamu!</span>
            </h2>
            <p className="mt-1.5 font-semibold text-ink-500">
              Ketik ide cerita, atau pakai pemandu di bawah.
            </p>

            <div className="relative mt-4">
              <input
                placeholder="Ketik ide cerita kamu di sini..."
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                className="w-full rounded-full border-2 border-line bg-white px-5 py-4 pr-15 font-body text-base text-ink-700 outline-none transition focus:border-brand-500 focus:shadow-[0_0_0_4px_rgba(245,147,48,0.15)] placeholder:text-ink-300"
              />
              <button
                onClick={() => setRecording(!recording)}
                aria-label="Rekam suara"
                className={[
                  "absolute right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border-0 text-white shadow-card",
                  recording
                    ? "animate-pulse-ring bg-brand-600"
                    : "bg-brand-500",
                ].join(" ")}
              >
                <Icon name="mic" size={20} color="white" />
              </button>
            </div>

            {/* Theme picker */}
            <div className="mt-6">
              <div className="mb-3 font-display text-base font-semibold text-ink-900">
                Atau Pilih Ide Cerita:
              </div>
              <div className="grid grid-cols-4 gap-3">
                {THEMES.map((t) => {
                  const active = theme === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTheme(active ? null : t.id)}
                      className={[
                        "flex flex-col items-center gap-2.5 rounded-[20px] border-2 px-3 py-4 transition",
                        t.bg,
                        active
                          ? "-translate-y-0.75 border-brand-500 shadow-[0_8px_0_var(--color-brand-700),0_8px_18px_rgba(122,69,42,0.08)]"
                          : `${t.border} ${t.shadow}`,
                      ].join(" ")}
                    >
                      <div
                        className={[
                          "grid h-12 w-12 place-items-center rounded-[14px] bg-white",
                          t.iconColor,
                        ].join(" ")}
                      >
                        <Icon name={t.icon} size={26} />
                      </div>
                      <div className="font-display text-base font-semibold text-ink-900">
                        {t.label}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Moral picker */}
            <div className="mt-5">
              <div className="mb-3 font-display text-base font-semibold text-ink-900">
                Nilai Moral:
              </div>
              <div className="grid grid-cols-4 gap-3">
                {MORALS.map((m) => {
                  const active = moral === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setMoral(active ? null : m.id)}
                      className={[
                        "inline-flex items-center gap-2 rounded-full border-2 py-2 pl-2 pr-3.5 transition",
                        m.bg,
                        active
                          ? "scale-[1.04] border-brand-500"
                          : "border-transparent",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "grid h-6.5 w-6.5 place-items-center rounded-full bg-white",
                          m.iconColor,
                        ].join(" ")}
                      >
                        <Icon name={m.icon} size={14} />
                      </span>
                      <span className="font-display text-sm font-medium text-ink-900">
                        {m.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Length picker */}
            <div className="mt-5">
              <div className="mb-3 font-display text-base font-semibold text-ink-900">
                Panjang Cerita:
              </div>
              <div className="flex w-fit gap-2 rounded-full bg-cream-100 p-1.5">
                {["pendek", "sedang", "panjang"].map((l) => {
                  const active = length === l;
                  return (
                    <button
                      key={l}
                      onClick={() => setLength(l)}
                      className={[
                        "rounded-full border-0 px-4.5 py-2.5 font-body text-[13px] font-extrabold capitalize transition",
                        active
                          ? "bg-white text-brand-700 shadow-soft"
                          : "bg-transparent text-ink-500",
                      ].join(" ")}
                      style={{ padding: "10px 18px" }}
                    >
                      {l === "pendek"
                        ? "🪶 Pendek"
                        : l === "sedang"
                          ? "📖 Sedang"
                          : "📚 Panjang"}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={submit}
              disabled={!canSubmit}
              className="mt-7 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-brand-500 px-5 py-4.5 font-body text-[17px] font-extrabold text-white shadow-primary transition hover:-translate-y-px hover:bg-brand-600 active:translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Icon name="sparkle-grad" size={20} /> Buat Cerita Sekarang!
            </button>
          </div>

          {/* Daily challenge */}
          <div className="flex items-center gap-4.5 rounded-[24px] border border-line bg-linear-to-r from-[#FFF1DA] to-[#FFE0B0] p-6 shadow-card">
            <div className="grid h-15 w-15 shrink-0 place-items-center rounded-[18px] bg-white">
              <Icon name="target" size={28} color="var(--color-brand-500)" />
            </div>
            <div className="flex-1">
              <div className="text-xs font-extrabold uppercase tracking-[0.06em] text-brand-700">
                {dailyChallenge.title}
              </div>
              <div className="mt-0.5 font-display text-[18px] font-semibold text-ink-900">
                {dailyChallenge.desc}
              </div>
              <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-white/60">
                <div
                  className="h-full rounded-full bg-linear-to-r from-brand-300 to-brand-500 transition-[width] duration-500"
                  style={{ width: `${dailyChallenge.progress * 100}%` }}
                />
              </div>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-extrabold text-brand-700">
                +{dailyChallenge.reward} XP
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: side */}
        <div className="flex flex-col gap-5">
          <div className="relative overflow-hidden rounded-[24px] border border-line bg-linear-to-br from-[#2A140A] to-[#4D2613] p-5.5 text-white shadow-card">
            <div className="absolute -bottom-6 -right-6 opacity-30">
              <Kimo pose="headphones" size={150} />
            </div>
            <div className="text-xs font-extrabold uppercase tracking-[0.06em] text-brand-300">
              Lanjutkan
            </div>
            <div className="mt-1 font-display text-[22px] font-semibold">
              Petualangan di Pasar
            </div>
            <div className="mt-1 text-[13px] font-semibold text-white/70">
              Halaman 4 dari 8
            </div>
            <div className="mt-3.5 h-1.5 overflow-hidden rounded-full bg-white/15">
              <div className="h-full w-1/2 rounded-full bg-brand-300" />
            </div>
            <button className="mt-4 inline-flex items-center gap-2.5 rounded-full bg-brand-500 px-4.5 py-2.5 text-sm font-extrabold text-white">
              <Icon name="play" size={14} color="white" /> Lanjutkan
            </button>
          </div>

          <div className="rounded-[24px] border border-line bg-white p-5.5 shadow-card">
            <div className="mb-3.5 flex items-center justify-between">
              <h3 className="text-lg">Cerita Terakhir</h3>
              <a href="#" className="text-[13px] font-extrabold text-brand-600">
                Lihat semua
              </a>
            </div>
            <div className="flex flex-col gap-2.5">
              {RECENTS.map((r, i) => (
                <button
                  key={i}
                  className="flex w-full items-center gap-3 rounded-2xl border border-line bg-cream-50 px-3 py-2.5 transition hover:border-line-strong"
                >
                  <div
                    className={[
                      "grid h-12 w-12 shrink-0 place-items-center rounded-xl",
                      r.color,
                    ].join(" ")}
                  >
                    <Icon name="book" size={22} color="var(--color-ink-700)" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-display text-sm font-semibold text-ink-900">
                      {r.title}
                    </div>
                    <div className="mt-0.5 text-xs font-bold text-ink-500">
                      {r.theme} · {r.moral} · {r.date}
                    </div>
                  </div>
                  <Icon name="play" size={16} color="var(--color-brand-500)" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3.5 rounded-[24px] border border-line bg-linear-to-br from-white to-[#FFF7E6] p-5.5 shadow-card">
            <Kimo pose="thinking" size={70} />
            <div className="flex-1">
              <div className="font-display text-base font-semibold text-ink-900">
                Tanya Kanca
              </div>
              <div className="mt-0.5 text-xs font-bold text-ink-500">
                Asisten cerdas untuk orang tua &amp; guru
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
