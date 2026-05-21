import { useState, useEffect, useRef } from "react";
import {
  useNavigate,
  useLocation,
  useParams,
  Navigate,
} from "react-router-dom";
import Icon from "../components/Icon";
import Kimo from "../components/Kimo";
import { Sparkles, Cloud } from "../components/Sparkles";
import { useAuthStore } from "../store/authStore";

const API_URL =
  import.meta.env.VITE_API_URL || "https://kicau-api.jevvonn.foo/api";

const THEME_LABELS = {
  sekolah: "Sekolah",
  fantasi: "Fantasi",
  belanja: "Belanja",
  jelajah: "Jelajah",
};
const MORAL_LABELS = {
  menabung: "Menabung",
  kejujuran: "Kejujuran",
  bijak: "Bijak",
  berbagi: "Berbagi",
};

function SceneArt({ imageUrl, seed = 0 }) {
  if (imageUrl) {
    return (
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={imageUrl}
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <Sparkles count={4} seed={seed} />
        <div className="absolute inset-x-0 bottom-0 h-7.5 bg-linear-to-b from-transparent to-black/10" />
      </div>
    );
  }
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #FFE4BC 0%, #FFE4BC 60%, #F5B872 100%)",
      }}
    >
      <div className="absolute left-20 top-10">
        <Cloud size={70} color="rgba(255,255,255,0.85)" />
      </div>
      <div className="absolute left-[55%] top-25">
        <Cloud size={50} color="rgba(255,255,255,0.65)" />
      </div>
      <div className="absolute inset-0 grid place-items-center">
        <div className="flex flex-col items-center gap-3 text-ink-500">
          <div className="animate-spin-slow">
            <Icon name="sparkle-grad" size={40} />
          </div>
          <div className="text-sm font-extrabold">Ilustrasi belum siap...</div>
        </div>
      </div>
      <Sparkles count={6} seed={seed} />
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

function StoryLoading({ progress }) {
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
      <div className="max-w-140 text-center">
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
        {progress?.message && (
          <p className="mt-3 text-[13px] font-extrabold text-brand-700">
            {progress.message}
          </p>
        )}
        {progress?.total > 0 && (
          <div className="mx-auto mt-4 h-2 w-full max-w-80 overflow-hidden rounded-full bg-white/60">
            <div
              className="h-full rounded-full bg-linear-to-r from-brand-300 to-brand-500 transition-[width] duration-500"
              style={{
                width: `${Math.min(100, ((progress.step || 0) / progress.total) * 100)}%`,
              }}
            />
          </div>
        )}
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

function StoryGenerator({ params }) {
  const navigate = useNavigate();
  const token = useAuthStore((s) => s.token);
  const [progress, setProgress] = useState({ message: "Menyusun cerita..." });
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    let eventSource = null;

    async function run() {
      try {
        const storyIdeaText = THEME_LABELS[params.theme] || "Fantasi";
        const moralText = MORAL_LABELS[params.moral] || "Berbagi";
        const promptText =
          params.idea && params.idea.length > 4
            ? params.idea
            : "petualangan Kimo si rubah dan teman-temannya";

        setProgress({ message: "Menyusun cerita..." });

        const res = await fetch(`${API_URL}/stories`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            prompt: promptText,
            nilai_moral: moralText,
            story_idea: storyIdeaText,
          }),
        });

        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.message || "Gagal membuat cerita.");
        }

        const story = await res.json();
        if (cancelled) return;

        setProgress({
          message: "Cerita siap! Membuat ilustrasi...",
          step: 0,
          total: 0,
        });

        const sseUrl = `${API_URL}/stories/${story.id}/generate-images?token=${encodeURIComponent(token)}`;
        eventSource = new EventSource(sseUrl);

        const localStory = { ...story, story: [...(story.story || [])] };

        eventSource.addEventListener("start", (e) => {
          const data = JSON.parse(e.data);
          setProgress({
            message: `Membuat ${data.total} ilustrasi...`,
            step: 0,
            total: data.total,
          });
        });

        eventSource.addEventListener("progress", (e) => {
          const data = JSON.parse(e.data);
          setProgress((p) => ({
            ...p,
            message: data.message || p.message,
            total: data.total ?? p.total,
          }));
        });

        eventSource.addEventListener("image_ready", (e) => {
          const data = JSON.parse(e.data);
          const idx = localStory.story.findIndex(
            (it) => it.order_index === data.order_index,
          );
          if (idx >= 0) {
            localStory.story[idx] = {
              ...localStory.story[idx],
              image_url: data.image_url,
            };
          }
          setProgress((p) => ({
            ...p,
            message: `Ilustrasi ${data.step}/${data.total} siap.`,
            step: data.step,
            total: data.total,
          }));
        });

        eventSource.addEventListener("image_failed", (e) => {
          const data = JSON.parse(e.data);
          setProgress((p) => ({
            ...p,
            message: data.message || `Ilustrasi ${data.step} gagal.`,
            step: data.step ?? p.step,
            total: data.total ?? p.total,
          }));
        });

        eventSource.addEventListener("done", () => {
          eventSource?.close();
          if (cancelled) return;
          navigate(`/story/${story.id}`, {
            replace: true,
            state: { story: localStory },
          });
        });

        eventSource.addEventListener("error", () => {
          eventSource?.close();
          if (cancelled) return;
          navigate(`/story/${story.id}`, {
            replace: true,
            state: { story: localStory },
          });
        });

        eventSource.onerror = () => {
          eventSource?.close();
          if (cancelled) return;
          navigate(`/story/${story.id}`, {
            replace: true,
            state: { story: localStory },
          });
        };
      } catch (e) {
        if (!cancelled) setError(e.message || "Terjadi kesalahan.");
      }
    }

    run();

    return () => {
      cancelled = true;
      eventSource?.close();
    };
  }, [params, token, navigate]);

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-7 py-8 text-center">
        <h2 className="text-xl font-bold text-ink-900">Terjadi kesalahan</h2>
        <p className="mt-2 text-ink-500">{error}</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 rounded-full bg-brand-500 px-5 py-2.5 font-extrabold text-white"
        >
          Kembali
        </button>
      </div>
    );
  }

  return <StoryLoading progress={progress} />;
}

function StoryViewer({ storyId }) {
  const navigate = useNavigate();
  const location = useLocation();
  const token = useAuthStore((s) => s.token);
  const [story, setStory] = useState(location.state?.story || null);
  const [loading, setLoading] = useState(!location.state?.story);
  const [page, setPage] = useState(0);
  const [choiceFeedback, setChoiceFeedback] = useState(null);
  const [imageProgress, setImageProgress] = useState(null);
  const sessionStartRef = useRef(null);

  useEffect(() => {
    sessionStartRef.current = Date.now();
  }, []);

  useEffect(() => {
    if (story) return;
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch(`${API_URL}/stories/${storyId}`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Gagal memuat cerita.");
        const data = await res.json();
        if (!cancelled) setStory(data);
      } catch {
        if (!cancelled) setStory(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [storyId, token, story]);

  const items = story?.story || [];
  const allImagesMissing =
    items.length > 0 && items.every((it) => !it.image_url);

  useEffect(() => {
    if (!story || !allImagesMissing) return;

    let cancelled = false;
    const sseUrl = `${API_URL}/stories/${storyId}/generate-images?token=${encodeURIComponent(token)}`;
    const eventSource = new EventSource(sseUrl);

    eventSource.addEventListener("start", (e) => {
      const data = JSON.parse(e.data);
      if (cancelled) return;
      setImageProgress({
        message: `Membuat ${data.total} ilustrasi...`,
        step: 0,
        total: data.total,
      });
    });

    eventSource.addEventListener("progress", (e) => {
      const data = JSON.parse(e.data);
      if (cancelled) return;
      setImageProgress((p) => ({
        ...(p || {}),
        message: data.message || p?.message,
        total: data.total ?? p?.total,
      }));
    });

    eventSource.addEventListener("image_ready", (e) => {
      const data = JSON.parse(e.data);
      if (cancelled) return;
      setStory((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          story: prev.story.map((it) =>
            it.order_index === data.order_index
              ? { ...it, image_url: data.image_url }
              : it,
          ),
        };
      });
      setImageProgress({
        message: `Ilustrasi ${data.step}/${data.total} siap.`,
        step: data.step,
        total: data.total,
      });
    });

    eventSource.addEventListener("image_retry", (e) => {
      const data = JSON.parse(e.data);
      if (cancelled) return;
      setImageProgress((p) => ({
        ...(p || {}),
        message:
          data.message ||
          `Ilustrasi ${data.step} percobaan ${data.attempt}/${data.max_attempts}...`,
        step: Math.max(0, (data.step ?? 1) - 1),
        total: data.total ?? p?.total,
      }));
    });

    eventSource.addEventListener("image_failed", (e) => {
      const data = JSON.parse(e.data);
      if (cancelled) return;
      setImageProgress((p) => ({
        ...(p || {}),
        message: data.message || `Ilustrasi ${data.step} gagal.`,
        step: data.step ?? p?.step,
        total: data.total ?? p?.total,
      }));
    });

    eventSource.addEventListener("done", () => {
      eventSource.close();
      if (cancelled) return;
      setImageProgress(null);
    });

    eventSource.addEventListener("error", (e) => {
      let msg = "Gagal memuat ilustrasi.";
      try {
        const data = JSON.parse(e.data);
        if (data.message) msg = data.message;
      } catch {
        // network error event has no payload
      }
      eventSource.close();
      if (cancelled) return;
      setImageProgress({ message: msg });
    });

    eventSource.onerror = () => {
      eventSource.close();
      if (cancelled) return;
      setImageProgress(null);
    };

    return () => {
      cancelled = true;
      eventSource.close();
    };
  }, [story, allImagesMissing, storyId, token]);

  if (loading)
    return <StoryLoading progress={{ message: "Memuat cerita..." }} />;
  if (!story)
    return (
      <div className="mx-auto max-w-7xl px-7 py-8">
        Cerita tidak ditemukan.{" "}
        <button onClick={() => navigate("/")}>Kembali</button>
      </div>
    );

  const generatingImages = allImagesMissing || imageProgress !== null;
  if (generatingImages) {
    return (
      <StoryLoading
        progress={imageProgress || { message: "Menyiapkan ilustrasi..." }}
      />
    );
  }

  const totalPages = items.length;
  const current = items[page];
  const isLast = page >= totalPages - 1;

  const onBack = () => navigate("/");

  async function next() {
    if (isLast) {
      let completion = null;
      try {
        const res = await fetch(`${API_URL}/stories/${storyId}/complete`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({}),
        });
        if (res.ok) completion = await res.json();
      } catch {
        // best-effort — navigate anyway
      }

      const startedAt = sessionStartRef.current || Date.now();
      const minutes = Math.max(1, Math.round((Date.now() - startedAt) / 60000));
      fetch(`${API_URL}/achievements/play-sessions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ minutes }),
      }).catch(() => {});

      navigate("/story/complete", {
        state: {
          result: {
            story: {
              ...story,
              lesson: story.moral_message,
            },
            value: story.title,
            completion,
          },
        },
      });
    } else {
      setPage(page + 1);
      setChoiceFeedback(null);
    }
  }

  async function pickChoice(opt) {
    const questionId = current?.question?.id;
    const choiceId = opt?.id;

    setChoiceFeedback({ pending: true });
    try {
      const res = await fetch(
        `${API_URL}/stories/${storyId}/questions/${questionId}/answer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ choice_id: choiceId }),
        },
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Gagal mengirim jawaban.");

      setChoiceFeedback({
        correct: !!data.is_correct,
        alreadyAnswered: !!data.already_answered,
        xpAwarded: data.xp_awarded ?? 0,
        totalXp: data.total_xp,
        msg: data.is_correct
          ? "Pilihan yang baik!"
          : "Yuk pikir lagi sebelum melanjutkan.",
      });
    } catch (e) {
      setChoiceFeedback({
        correct: !!opt.is_correct,
        msg: e.message || "Yuk pikir lagi sebelum melanjutkan.",
      });
    }
  }

  const hasQuestion = !!current?.question;

  return (
    <div className="min-h-[calc(100vh-80px)] px-6 pb-6">
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
            {items.map((_, i) => (
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

      {imageProgress && (
        <div className="mx-auto mb-3 flex max-w-245 items-center gap-3 rounded-full border border-line bg-white px-4 py-2 shadow-soft">
          <div className="animate-spin-slow text-brand-500">
            <Icon name="sparkle-grad" size={18} />
          </div>
          <div className="flex-1 text-[13px] font-extrabold text-brand-700">
            {imageProgress.message}
          </div>
          {imageProgress.total > 0 && (
            <div className="h-1.5 w-32 overflow-hidden rounded-full bg-cream-50">
              <div
                className="h-full rounded-full bg-linear-to-r from-brand-300 to-brand-500 transition-[width] duration-500"
                style={{
                  width: `${Math.min(100, ((imageProgress.step || 0) / imageProgress.total) * 100)}%`,
                }}
              />
            </div>
          )}
        </div>
      )}

      <div
        key={page}
        className="relative mx-auto flex h-[min(680px,calc(100vh-200px))] min-h-135 max-w-245 animate-pop-in flex-col justify-between overflow-hidden rounded-[36px] border border-line shadow-pop"
      >
        <SceneArt imageUrl={current?.image_url} seed={page} />

        <div className="relative z-2 m-5 mb-0">
          <div className="max-w-115 rounded-3xl border border-line bg-white px-5 py-3.5 font-display text-[15px] font-medium leading-[1.35] text-ink-900 shadow-card">
            {current?.narrative}
          </div>

          {hasQuestion && (
            <div className="mt-2.5">
              <div className="max-w-115 rounded-[22px] border border-line bg-white px-4 py-3 shadow-card">
                <div className="mb-1 text-[10px] font-extrabold uppercase tracking-[0.06em] text-brand-700">
                  Pilihanmu
                </div>
                <div className="font-display text-[15px] font-semibold leading-tight text-ink-900">
                  {current.question.prompt}
                </div>
              </div>
              {!choiceFeedback || choiceFeedback.pending ? (
                <div className="mt-2.5 flex max-w-115 flex-col gap-2">
                  {(current.question.choices || []).map((o, i) => (
                    <button
                      key={i}
                      onClick={() => pickChoice(o)}
                      disabled={choiceFeedback?.pending}
                      className="flex cursor-pointer items-center gap-2.5 rounded-2xl border-2 border-line bg-white px-3.5 py-2.5 font-body text-[13px] text-ink-900 shadow-[0_3px_0_rgba(122,69,42,0.06)] transition hover:border-brand-300 disabled:opacity-60"
                    >
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-brand-50 font-display text-xs font-bold text-brand-700">
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
                    {choiceFeedback.xpAwarded > 0 && (
                      <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-white/70 px-2.5 py-1 text-[11px] font-extrabold text-brand-700">
                        +{choiceFeedback.xpAwarded} XP
                      </div>
                    )}
                    {choiceFeedback.alreadyAnswered && (
                      <div className="mt-1 text-[11px] font-bold text-ink-500">
                        Sudah pernah dijawab sebelumnya.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="relative z-2 flex items-center gap-3 bg-linear-to-b from-transparent to-black/6 p-6">
          <button
            onClick={() => {
              if (page > 0) {
                setPage(page - 1);
                setChoiceFeedback(null);
              }
            }}
            disabled={page === 0}
            className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-line bg-white text-ink-700 shadow-soft disabled:opacity-40"
          >
            <Icon name="back" size={20} />
          </button>
          <button
            disabled={
              hasQuestion && (!choiceFeedback || choiceFeedback.pending)
            }
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

export default function StoryPage() {
  const { storyId } = useParams();
  const location = useLocation();
  const params = location.state?.params;

  if (storyId) return <StoryViewer storyId={storyId} />;
  if (!params) return <Navigate to="/" replace />;
  return <StoryGenerator params={params} />;
}
