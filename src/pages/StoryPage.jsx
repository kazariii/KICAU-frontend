import { useState, useEffect } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import Icon from "../components/Icon";
import Kimo from "../components/Kimo";
import { Sparkles, Cloud } from "../components/Sparkles";
import { useAuthStore } from "../store/authStore";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

function fallbackStory() {
  return {
    title: "Si Kelinci Jujur",
    summary: "Kimo dan Lulu belajar tentang kejujuran di pasar.",
    pages: [
      {
        type: "narration",
        text: "Suatu hari, Kimo berjualan pisang di tepi jalan. Hari itu cerah dan ramai.",
        scene: "pasar",
      },
      {
        type: "narration",
        text: "Lulu si kelinci datang ingin membeli 3 buah pisang. Ia mengeluarkan uangnya.",
        scene: "pasar",
      },
      {
        type: "choice",
        question: "Lulu memberi uang lebih. Apa yang harus Kimo lakukan?",
        options: [
          {
            text: "Mengembalikan kelebihan uangnya.",
            correct: true,
            feedback: "Tepat! Kejujuran selalu lebih berharga dari uang.",
          },
          {
            text: "Diam saja, lumayan dapat untung.",
            correct: false,
            feedback: "Itu tidak jujur. Lulu pasti sedih.",
          },
        ],
        scene: "pasar",
      },
      {
        type: "narration",
        text: "Kimo mengembalikan uangnya. Lulu tersenyum dan mengucapkan terima kasih.",
        scene: "pasar",
      },
      {
        type: "choice",
        question:
          "Sore harinya, Kimo menemukan dompet di jalan. Apa yang Kimo lakukan?",
        options: [
          {
            text: "Mencari pemiliknya dan mengembalikannya.",
            correct: true,
            feedback: "Hebat! Kimo sungguh anak yang jujur.",
          },
          {
            text: "Menyimpannya untuk diri sendiri.",
            correct: false,
            feedback: "Tidak baik. Pemiliknya pasti khawatir.",
          },
        ],
        scene: "jalan",
      },
      {
        type: "narration",
        text: "Kimo pulang dengan hati bahagia. Kejujuran membuatnya jadi pahlawan kecil hari itu.",
        scene: "rumah",
      },
    ],
    lesson:
      "Kejujuran adalah berkata benar dan tidak mengambil yang bukan miliknya.",
    value: "Kejujuran",
  };
}

function SceneArt({ scene }) {
  const palettes = {
    pasar: { sky: "#FFE4BC", ground: "#F5B872", accent: "#FCD968" },
    hutan: { sky: "#D7EBD2", ground: "#8FBE85", accent: "#FCD968" },
    sekolah: { sky: "#FFE0E8", ground: "#F5B0BE", accent: "#FCD968" },
    rumah: { sky: "#E8DDF8", ground: "#BAACE0", accent: "#FCD968" },
    jalan: { sky: "#FFE4BC", ground: "#E8B070", accent: "#FCD968" },
    sungai: { sky: "#CDE7F5", ground: "#7AB8DC", accent: "#FCD968" },
  };
  const p = palettes[scene] || palettes.pasar;
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${p.sky} 0%, ${p.sky} 60%, ${p.ground} 100%)`,
      }}
    >
      <div
        className="absolute right-20 top-15 h-20 w-20 rounded-full"
        style={{ background: p.accent, boxShadow: `0 0 80px ${p.accent}` }}
      />
      <div className="absolute left-20 top-10">
        <Cloud size={70} color="rgba(255,255,255,0.85)" />
      </div>
      <div className="absolute left-[55%] top-25">
        <Cloud size={50} color="rgba(255,255,255,0.65)" />
      </div>
      <svg
        viewBox="0 0 800 400"
        className="absolute bottom-0 h-[60%] w-full"
        preserveAspectRatio="none"
      >
        <path
          d="M0 240 C 120 200 240 260 360 220 C 480 180 600 240 800 200 L 800 400 L 0 400 Z"
          fill={p.ground}
          opacity="0.7"
        />
        <path
          d="M0 300 C 150 270 300 320 450 290 C 600 260 700 310 800 280 L 800 400 L 0 400 Z"
          fill={p.ground}
        />
      </svg>
      {scene === "pasar" && (
        <svg
          viewBox="0 0 800 400"
          className="absolute bottom-0 h-[70%] w-full"
          preserveAspectRatio="xMidYEnd meet"
        >
          <rect
            x="500"
            y="180"
            width="240"
            height="160"
            rx="10"
            fill="#E47A17"
          />
          <path d="M480 180 L760 180 L740 140 L500 140 Z" fill="#F08A2E" />
          <rect x="540" y="220" width="60" height="80" fill="#FFE4BC" />
          <rect x="640" y="220" width="60" height="80" fill="#FFE4BC" />
        </svg>
      )}
      {scene === "hutan" && (
        <svg
          viewBox="0 0 800 400"
          className="absolute bottom-0 h-[80%] w-full"
          preserveAspectRatio="xMidYEnd meet"
        >
          {[120, 220, 600, 700].map((x, i) => (
            <g key={i}>
              <rect
                x={x}
                y={i % 2 ? 220 : 200}
                width="14"
                height="120"
                fill="#7A4A20"
              />
              <circle cx={x + 7} cy={i % 2 ? 200 : 180} r="50" fill="#5FA055" />
            </g>
          ))}
        </svg>
      )}
      {scene === "sekolah" && (
        <svg
          viewBox="0 0 800 400"
          className="absolute bottom-0 h-[70%] w-full"
          preserveAspectRatio="xMidYEnd meet"
        >
          <rect
            x="280"
            y="180"
            width="240"
            height="160"
            fill="#FFE4BC"
            stroke="#3A1F12"
            strokeWidth="3"
          />
          <path d="M260 180 L540 180 L500 130 L300 130 Z" fill="#F08A2E" />
          <rect x="380" y="240" width="40" height="100" fill="#3A1F12" />
          <circle cx="400" cy="160" r="14" fill="#FCD968" />
        </svg>
      )}
      <Sparkles count={6} seed={scene.length} />
      <div className="absolute inset-x-0 bottom-0 h-7.5 bg-linear-to-b from-transparent to-black/10" />
    </div>
  );
}

const LOADING_TIPS = [
  "Kimo sedang menyiapkan ceritanya...",
  "Menabur bumbu nilai-nilai baik...",
  "Menggambar pemandangan yang seru...",
  "Hampir selesai!",
];

function StoryLoading() {
  const [tip, setTip] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setTip((t) => (t + 1) % LOADING_TIPS.length),
      1600,
    );
    return () => clearInterval(id);
  }, []);
  return (
    <div className="grid min-h-[calc(100vh-80px)] place-items-center p-8">
      <div className="max-w-120 text-center">
        <div className="relative inline-block">
          <div className="animate-float">
            <Kimo pose="thinking" size={180} />
          </div>
          <div className="absolute -right-5 -top-2.5 animate-spin-slow">
            <Icon name="sparkle-grad" size={42} />
          </div>
          <div className="absolute bottom-0 -left-5 animate-spin-slow [animation-direction:reverse]">
            <Icon name="sparkle-grad" size={28} />
          </div>
        </div>
        <h2 className="mt-4.5 text-[30px]">Menyusun ceritamu...</h2>
        <p
          key={tip}
          className="mt-2 animate-slide-up text-[15px] font-bold text-ink-500"
        >
          {LOADING_TIPS[tip]}
        </p>
        <div className="mt-6 flex justify-center gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-3 w-3 rounded-full bg-brand-500"
              style={{
                animation: `pop-in 1.2s ease-in-out ${i * 0.15}s infinite alternate`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function StoryPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = useAuthStore((s) => s.token);
  const params = location.state?.params;
  const [status, setStatus] = useState("loading");
  const [story, setStory] = useState(null);
  const [page, setPage] = useState(0);
  const [choiceFeedback, setChoiceFeedback] = useState(null);

  useEffect(() => {
    if (!params) return;
    let cancelled = false;

    async function generate() {
      setStatus("loading");
      try {
        const themeLabels = {
          sekolah: "Sekolah",
          fantasi: "Fantasi",
          belanja: "Belanja",
          jelajah: "Jelajah",
        };
        const moralLabels = {
          menabung: "Menabung",
          kejujuran: "Kejujuran",
          bijak: "Bijak/bijaksana mengelola uang",
          berbagi: "Berbagi",
        };
        const lengthMap = { pendek: 4, sedang: 6, panjang: 8 };
        const numPages = lengthMap[params.length || "sedang"];
        const themeText = params.theme
          ? themeLabels[params.theme]
          : "petualangan ringan";
        const moralText = params.moral
          ? moralLabels[params.moral]
          : "literasi finansial dasar";
        const ideaText =
          params.idea && params.idea.length > 4
            ? params.idea
            : "petualangan Kimo si rubah dan teman-temannya";

        const prompt = `Kamu adalah pengarang cerita anak Indonesia untuk usia 5-10 tahun. Buat cerita interaktif dengan tema: ${themeText}, mengajarkan nilai: ${moralText}. Ide cerita: ${ideaText}. Tokoh utama: Kimo (rubah oranye yang ramah). Bahasa: Indonesia sederhana, kalimat pendek, hangat. KEMBALIKAN DALAM JSON SAJA, tanpa markdown. Format: { "title": "...", "summary": "...", "pages": [{ "type": "narration", "text": "...", "scene": "pasar/hutan/sekolah/rumah/jalan/sungai" } atau { "type": "choice", "question": "...", "options": [{ "text": "...", "correct": true, "feedback": "..." }] }], "lesson": "...", "value": "..." }. Buat tepat ${numPages} halaman dengan minimal 2 halaman bertipe "choice". Akhiri dengan narasi positif.`;

        const res = await fetch(`${API_URL}/chatbot/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ message: prompt }),
        });
        const data = await res.json();
        const text = data.reply || data.message || "";
        const jsonStart = text.indexOf("{");
        const jsonEnd = text.lastIndexOf("}");
        if (jsonStart < 0 || jsonEnd < 0)
          throw new Error("Format tidak terbaca");
        const parsed = JSON.parse(text.slice(jsonStart, jsonEnd + 1));
        if (!cancelled) setStory(parsed);
      } catch {
        if (!cancelled) setStory(fallbackStory());
      }
      if (!cancelled) {
        setPage(0);
        setStatus("reading");
      }
    }

    generate();
    return () => {
      cancelled = true;
    };
  }, [params, token]);

  if (!params) return <Navigate to="/" replace />;

  const onBack = () => navigate("/");

  if (status === "loading") return <StoryLoading />;
  if (!story)
    return (
      <div className="mx-auto max-w-7xl px-7 py-8">
        Terjadi kesalahan. <button onClick={onBack}>Kembali</button>
      </div>
    );

  const totalPages = story.pages.length;
  const current = story.pages[page];
  const isLast = page >= totalPages - 1;

  function next() {
    if (isLast) {
      navigate("/story/complete", {
        state: { result: { story, value: story.value || params.moral } },
      });
    } else {
      setPage(page + 1);
      setChoiceFeedback(null);
    }
  }
  function pickChoice(opt) {
    setChoiceFeedback({ correct: opt.correct, msg: opt.feedback });
  }

  return (
    <div className="min-h-[calc(100vh-80px)] px-6 pb-6">
      {/* Top bar */}
      <div className="mx-auto flex max-w-245 items-center gap-3 py-4">
        <button
          onClick={onBack}
          aria-label="Kembali"
          className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-line bg-white text-ink-700 shadow-soft"
        >
          <Icon name="back" size={20} />
        </button>
        <div className="flex-1 px-4">
          <div className="font-display text-sm font-semibold text-ink-900">
            {story.title}
          </div>
          <div className="mt-2 flex gap-1">
            {story.pages.map((_, i) => (
              <div
                key={i}
                className={[
                  "h-1.5 flex-1 rounded-full transition-colors duration-300",
                  i < page
                    ? "bg-brand-500"
                    : i === page
                      ? "bg-brand-300"
                      : "bg-[rgba(122,69,42,0.18)]",
                ].join(" ")}
              />
            ))}
          </div>
        </div>
        <div className="flex gap-1.5 text-xs font-extrabold text-ink-500">
          <span>{String(page + 1).padStart(2, "0")}</span>
          <span className="opacity-40">/</span>
          <span>{String(totalPages).padStart(2, "0")}</span>
        </div>
      </div>

      {/* Scene */}
      <div
        key={page}
        className="relative mx-auto flex h-[min(680px,calc(100vh-200px))] min-h-135 max-w-245 animate-pop-in flex-col justify-between overflow-hidden rounded-[36px] border border-line shadow-pop"
      >
        <SceneArt scene={current.scene || (page % 2 ? "hutan" : "pasar")} />

        <div className="relative z-2 m-6 mb-0">
          {!current.type || current.type === "narration" ? (
            <div className="max-w-140 rounded-3xl border border-line bg-white px-6 py-5 font-display text-[22px] font-medium leading-[1.35] text-ink-900 shadow-card">
              {current.text}
            </div>
          ) : (
            <div>
              <div className="max-w-140 rounded-[22px] border border-line bg-white px-5 py-4 shadow-card">
                <div className="mb-1.5 text-xs font-extrabold uppercase tracking-[0.06em] text-brand-700">
                  Pilihanmu
                </div>
                <div className="font-display text-[22px] font-semibold leading-tight text-ink-900">
                  {current.question}
                </div>
              </div>
              {!choiceFeedback ? (
                <div className="mt-3.5 flex max-w-140 flex-col gap-2.5">
                  {current.options.map((o, i) => (
                    <button
                      key={i}
                      onClick={() => pickChoice(o)}
                      className="flex cursor-pointer items-center gap-3 rounded-[18px] border-2 border-line bg-white px-4.5 py-3.5 font-body text-[15px] text-ink-900 shadow-[0_3px_0_rgba(122,69,42,0.06)] transition hover:border-brand-300"
                    >
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[10px] bg-brand-50 font-display text-sm font-bold text-brand-700">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="flex-1 text-left font-bold">
                        {o.text}
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <div
                  className={[
                    "mt-3.5 flex max-w-140 animate-slide-up items-center gap-3.5 rounded-[22px] border-2 px-4.5 py-4",
                    choiceFeedback.correct
                      ? "border-[#7DBA6F] bg-linear-to-r from-[#DDF5D2] to-[#B8DFB8]"
                      : "border-[#F5B872] bg-linear-to-r from-[#FFE4D2] to-[#FFD0B0]",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "grid h-14 w-14 shrink-0 place-items-center rounded-full text-white",
                      choiceFeedback.correct ? "bg-[#7DBA6F]" : "bg-[#F5B872]",
                    ].join(" ")}
                  >
                    <Icon
                      name={choiceFeedback.correct ? "check" : "sparkle-grad"}
                      size={28}
                      color="white"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-display text-lg font-semibold text-ink-900">
                      {choiceFeedback.correct
                        ? "Pilihan yang baik!"
                        : "Yuk pikir lagi..."}
                    </div>
                    <div className="mt-1 text-sm font-semibold text-ink-700">
                      {choiceFeedback.msg}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="relative z-2 flex items-center gap-3 bg-linear-to-b from-transparent to-black/6 p-6">
          <button
            onClick={() => page > 0 && setPage(page - 1)}
            disabled={page === 0}
            className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-line bg-white text-ink-700 shadow-soft disabled:opacity-40"
          >
            <Icon name="back" size={20} />
          </button>
          <button
            disabled={current.type === "choice" && !choiceFeedback}
            onClick={next}
            className="inline-flex max-w-[320px] flex-1 items-center justify-center gap-2.5 rounded-full bg-brand-500 px-5 py-4 font-body text-base font-extrabold text-white shadow-primary transition hover:-translate-y-px hover:bg-brand-600 active:translate-y-0.5 disabled:opacity-50"
          >
            {isLast ? "Selesai!" : "Lanjut"}
            <Icon name={isLast ? "trophy" : "play"} size={16} color="white" />
          </button>
          <div className="w-11" />
        </div>
      </div>
    </div>
  );
}
