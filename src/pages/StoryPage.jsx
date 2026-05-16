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
      style={{
        position: "absolute",
        inset: 0,
        background: `linear-gradient(180deg, ${p.sky} 0%, ${p.sky} 60%, ${p.ground} 100%)`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 60,
          right: 80,
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: p.accent,
          boxShadow: `0 0 80px ${p.accent}`,
        }}
      />
      <div style={{ position: "absolute", top: 40, left: 80 }}>
        <Cloud size={70} color="rgba(255,255,255,0.85)" />
      </div>
      <div style={{ position: "absolute", top: 100, left: "55%" }}>
        <Cloud size={50} color="rgba(255,255,255,0.65)" />
      </div>
      <svg
        viewBox="0 0 800 400"
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "60%",
        }}
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
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: "70%",
          }}
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
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: "80%",
          }}
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
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: "70%",
          }}
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
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 30,
          background: "linear-gradient(180deg, transparent, rgba(0,0,0,0.08))",
        }}
      />
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
  const tips = LOADING_TIPS;
  const [tip, setTip] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setTip((t) => (t + 1) % LOADING_TIPS.length),
      1600
    );
    return () => clearInterval(id);
  }, []);
  return (
    <div
      style={{
        minHeight: "calc(100vh - 80px)",
        display: "grid",
        placeItems: "center",
        padding: 32,
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 480 }}>
        <div style={{ position: "relative", display: "inline-block" }}>
          <div className="anim-float">
            <Kimo pose="thinking" size={180} />
          </div>
          <div
            style={{
              position: "absolute",
              top: -10,
              right: -20,
              animation: "spin-slow 3s linear infinite",
            }}
          >
            <Icon name="sparkle-grad" size={42} />
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: -20,
              animation: "spin-slow 4s linear infinite reverse",
            }}
          >
            <Icon name="sparkle-grad" size={28} />
          </div>
        </div>
        <h2 style={{ fontSize: 30, marginTop: 18 }}>Menyusun ceritamu...</h2>
        <p
          key={tip}
          className="anim-slide"
          style={{
            marginTop: 8,
            color: "var(--ink-500)",
            fontWeight: 700,
            fontSize: 15,
          }}
        >
          {tips[tip]}
        </p>
        <div
          style={{
            display: "flex",
            gap: 6,
            justifyContent: "center",
            marginTop: 24,
          }}
        >
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "var(--brand-500)",
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
        if (jsonStart < 0 || jsonEnd < 0) {
          throw new Error("Format tidak terbaca");
        }
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
      <div className="page">
        Terjadi kesalahan. <button onClick={onBack}>Kembali</button>
      </div>
    );

  const totalPages = story.pages.length;
  const current = story.pages[page];
  const isLast = page >= totalPages - 1;

  function next() {
    if (isLast) {
      navigate("/story/complete", {
        state: {
          result: { story, value: story.value || params.moral },
        },
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
    <div style={{ minHeight: "calc(100vh - 80px)", padding: "0 24px 24px" }}>
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "16px 0",
          maxWidth: 980,
          margin: "0 auto",
        }}
      >
        <button
          onClick={onBack}
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: "white",
            border: "1px solid var(--line)",
            display: "grid",
            placeItems: "center",
            cursor: "pointer",
            color: "var(--ink-700)",
            boxShadow: "var(--shadow-sm)",
          }}
          aria-label="Kembali"
        >
          <Icon name="back" size={20} />
        </button>
        <div style={{ flex: 1, padding: "0 16px" }}>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: 14,
              color: "var(--ink-900)",
            }}
          >
            {story.title}
          </div>
          <div style={{ display: "flex", gap: 4, marginTop: 8 }}>
            {story.pages.map((_, i) => (
              <div
                key={i}
                style={{
                  height: 6,
                  borderRadius: 999,
                  transition: "background .3s",
                  flex: 1,
                  background:
                    i < page
                      ? "var(--brand-500)"
                      : i === page
                        ? "var(--brand-300)"
                        : "rgba(122,69,42,0.18)",
                }}
              />
            ))}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 6,
            fontSize: 12,
            fontWeight: 800,
            color: "var(--ink-500)",
          }}
        >
          <span>{String(page + 1).padStart(2, "0")}</span>
          <span style={{ opacity: 0.4 }}>/</span>
          <span>{String(totalPages).padStart(2, "0")}</span>
        </div>
      </div>

      {/* Scene */}
      <div
        key={page}
        className="anim-pop"
        style={{
          position: "relative",
          maxWidth: 980,
          margin: "0 auto",
          height: "min(680px, calc(100vh - 200px))",
          minHeight: 540,
          borderRadius: 36,
          overflow: "hidden",
          border: "1px solid var(--line)",
          boxShadow: "var(--shadow-lg)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <SceneArt scene={current.scene || (page % 2 ? "hutan" : "pasar")} />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            margin: 24,
            marginBottom: 0,
          }}
        >
          {!current.type || current.type === "narration" ? (
            <div
              style={{
                background: "white",
                padding: "20px 24px",
                borderRadius: 24,
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                fontSize: 22,
                lineHeight: 1.35,
                color: "var(--ink-900)",
                boxShadow: "var(--shadow-md)",
                border: "1px solid var(--line)",
                maxWidth: 560,
              }}
            >
              {current.text}
            </div>
          ) : (
            <div>
              <div
                style={{
                  background: "white",
                  padding: "18px 22px",
                  borderRadius: 22,
                  boxShadow: "var(--shadow-md)",
                  border: "1px solid var(--line)",
                  maxWidth: 560,
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 800,
                    color: "var(--brand-700)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    marginBottom: 6,
                  }}
                >
                  Pilihanmu
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: 22,
                    color: "var(--ink-900)",
                    lineHeight: 1.25,
                  }}
                >
                  {current.question}
                </div>
              </div>
              {!choiceFeedback ? (
                <div
                  style={{
                    marginTop: 14,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    maxWidth: 560,
                  }}
                >
                  {current.options.map((o, i) => (
                    <button
                      key={i}
                      onClick={() => pickChoice(o)}
                      style={{
                        background: "white",
                        border: "2px solid var(--line)",
                        padding: "14px 18px",
                        borderRadius: 18,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        fontFamily: "var(--font-body)",
                        fontSize: 15,
                        color: "var(--ink-900)",
                        transition: "all .15s",
                        boxShadow: "0 3px 0 rgba(122,69,42,0.06)",
                      }}
                    >
                      <span
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 10,
                          background: "var(--brand-50)",
                          color: "var(--brand-700)",
                          display: "grid",
                          placeItems: "center",
                          fontFamily: "var(--font-display)",
                          fontWeight: 700,
                          fontSize: 14,
                          flexShrink: 0,
                        }}
                      >
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span
                        style={{ flex: 1, textAlign: "left", fontWeight: 700 }}
                      >
                        {o.text}
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <div
                  className="anim-slide"
                  style={{
                    marginTop: 14,
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "16px 18px",
                    borderRadius: 22,
                    border: "2px solid",
                    maxWidth: 560,
                    background: choiceFeedback.correct
                      ? "linear-gradient(120deg, #DDF5D2, #B8DFB8)"
                      : "linear-gradient(120deg, #FFE4D2, #FFD0B0)",
                    borderColor: choiceFeedback.correct ? "#7DBA6F" : "#F5B872",
                  }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      background: choiceFeedback.correct
                        ? "#7DBA6F"
                        : "#F5B872",
                      display: "grid",
                      placeItems: "center",
                      color: "white",
                      flexShrink: 0,
                    }}
                  >
                    <Icon
                      name={choiceFeedback.correct ? "check" : "sparkle-grad"}
                      size={28}
                      color="white"
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 600,
                        fontSize: 18,
                        color: "var(--ink-900)",
                      }}
                    >
                      {choiceFeedback.correct
                        ? "Pilihan yang baik!"
                        : "Yuk pikir lagi..."}
                    </div>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "var(--ink-700)",
                        marginTop: 4,
                      }}
                    >
                      {choiceFeedback.msg}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 2,
            padding: 24,
            display: "flex",
            alignItems: "center",
            gap: 12,
            background:
              "linear-gradient(180deg, transparent, rgba(0,0,0,0.06))",
          }}
        >
          <button
            onClick={() => page > 0 && setPage(page - 1)}
            disabled={page === 0}
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "white",
              border: "1px solid var(--line)",
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
              color: "var(--ink-700)",
              boxShadow: "var(--shadow-sm)",
              opacity: page === 0 ? 0.4 : 1,
            }}
          >
            <Icon name="back" size={20} />
          </button>
          <button
            disabled={current.type === "choice" && !choiceFeedback}
            onClick={next}
            className="btn btn-primary"
            style={{
              flex: 1,
              maxWidth: 320,
              padding: "16px 22px",
              fontSize: 16,
              opacity: current.type === "choice" && !choiceFeedback ? 0.5 : 1,
            }}
          >
            {isLast ? "Selesai!" : "Lanjut"}
            <Icon name={isLast ? "trophy" : "play"} size={16} color="white" />
          </button>
          <div style={{ width: 44 }} />
        </div>
      </div>
    </div>
  );
}
