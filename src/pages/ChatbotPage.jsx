import { useState, useEffect, useRef } from "react";
import Icon from "../components/Icon";
import Kimo from "../components/Kimo";
import { useAuthStore } from "../store/authStore";

const API_URL =
  import.meta.env.VITE_API_URL || "https://kicau-api.jevvonn.foo/api";

function nowTime() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function formatTime(iso) {
  if (!iso) return nowTime();
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return nowTime();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function formatSessionDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function Bubble({ role, text, time }) {
  const isUser = role === "user";
  return (
    <div
      className={[
        "my-2.5 flex items-end gap-2",
        isUser ? "flex-row-reverse" : "flex-row",
      ].join(" ")}
    >
      {!isUser && (
        <div className="grid h-8 w-8 shrink-0 place-items-center overflow-hidden rounded-full bg-brand-50">
          <Kimo pose="peek" size={36} />
        </div>
      )}
      <div className="max-w-[78%]">
        <div
          className={[
            "animate-slide-up whitespace-pre-wrap px-4 py-3 text-sm font-semibold leading-[1.45] shadow-soft",
            isUser
              ? "rounded-[20px_20px_6px_20px] bg-linear-to-r from-[#4D2613] to-[#2A140A] text-white"
              : "rounded-[20px_20px_20px_6px] bg-linear-to-r from-[#FBA01F] to-[#F08A2E] text-white",
          ].join(" ")}
        >
          {text}
        </div>
        <div
          className={[
            "mt-1 text-[10px] font-bold text-ink-300",
            isUser ? "text-right" : "text-left",
          ].join(" ")}
        >
          {time}
        </div>
      </div>
    </div>
  );
}

export default function ChatbotPage() {
  const user = useAuthStore((s) => s.user);
  const token = useAuthStore((s) => s.token);

  const initialGreeting = {
    role: "bot",
    text: `Halo! Kanca di sini, saya tadi menemani ${user.name} bermain dan belajar. Ingin tahu apa saja yang ia pelajari hari ini? ✨`,
    time: nowTime(),
  };

  const [sessions, setSessions] = useState([]);
  const [sessionsLoading, setSessionsLoading] = useState(false);
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [sessionLoading, setSessionLoading] = useState(false);
  const [messages, setMessages] = useState([initialGreeting]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [promptsOpen, setPromptsOpen] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, typing]);

  async function fetchSessions() {
    setSessionsLoading(true);
    try {
      const res = await fetch(`${API_URL}/chatbot/sessions`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setSessions(Array.isArray(data) ? data : []);
    } catch {
      setSessions([]);
    } finally {
      setSessionsLoading(false);
    }
  }

  useEffect(() => {
    queueMicrotask(() => fetchSessions());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadSession(id) {
    setActiveSessionId(id);
    setSessionLoading(true);
    try {
      const res = await fetch(`${API_URL}/chatbot/sessions/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      const msgs = Array.isArray(data?.messages)
        ? data.messages.map((m) => ({
            role: m.role === "assistant" ? "bot" : "user",
            text: m.content,
            time: formatTime(m.created_at),
          }))
        : [];
      setMessages(msgs.length ? msgs : [initialGreeting]);
    } catch {
      setMessages([
        {
          role: "bot",
          text: "Maaf, gagal memuat sesi ini.",
          time: nowTime(),
        },
      ]);
    } finally {
      setSessionLoading(false);
    }
  }

  function newChat() {
    setActiveSessionId(null);
    setMessages([initialGreeting]);
    setInput("");
  }

  async function deleteSession(id, e) {
    e.stopPropagation();
    if (!confirm("Hapus sesi ini?")) return;
    try {
      await fetch(`${API_URL}/chatbot/sessions/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (activeSessionId === id) newChat();
      fetchSessions();
    } catch {
      // ignore
    }
  }

  const quickPrompts = [
    {
      icon: "target",
      title: "Target Hari Ini",
      sub: "Apakah anak menyelesaikan misinya?",
    },
    {
      icon: "chart",
      title: "Lihat Perkembangan",
      sub: "Ringkasan aktivitas minggu ini",
    },
    {
      icon: "heart",
      title: "Nilai yang dipelajari",
      sub: "Apa nilai karakter terbaru?",
    },
    {
      icon: "book",
      title: "Rekomendasi Cerita",
      sub: "Cerita apa yang cocok hari ini?",
    },
  ];

  async function send(text) {
    if (!text.trim()) return;
    const userMsg = { role: "user", text: text.trim(), time: nowTime() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);
    try {
      setPromptsOpen(false);
      const body = { prompt: text.trim() };
      if (activeSessionId) body.session_id = activeSessionId;

      const res = await fetch(`${API_URL}/chatbot/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      const reply =
        data?.reply?.content ||
        data?.message ||
        "Maaf, saya tidak mengerti. Coba tanya lagi ya!";

      const newSessionId = data?.session?.id;
      if (newSessionId && newSessionId !== activeSessionId) {
        setActiveSessionId(newSessionId);
      }

      setMessages((m) => [
        ...m,
        {
          role: "bot",
          text: String(reply).trim(),
          time: formatTime(data?.reply?.created_at),
        },
      ]);

      fetchSessions();
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "bot",
          text: "Maaf, saya butuh sedikit waktu. Coba lagi ya!",
          time: nowTime(),
        },
      ]);
      setPromptsOpen(true);
    } finally {
      setTyping(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-7 pb-10 pt-8">
      <div className="overflow-hidden rounded-[32px] border border-line bg-white shadow-pop">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line bg-linear-to-br from-[#FFE4BC] to-[#FFD09F] px-7 py-5">
          <div className="flex items-center gap-3.5">
            <div className="grid h-13 w-13 place-items-center overflow-hidden rounded-full bg-white shadow-soft">
              <Kimo pose="headphones" size={56} />
            </div>
            <div>
              <div className="font-display text-[26px] font-bold tracking-wide text-brand-600">
                KANCA
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-ink-500">
                <span className="h-2 w-2 rounded-full bg-[#7DBA6F]" /> Online ·
                Asisten orang tua
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={newChat}
              className="flex h-10 cursor-pointer items-center gap-2 rounded-xl border-0 bg-white px-3.5 text-sm font-bold text-ink-700 shadow-soft"
            >
              <Icon name="plus" size={16} />
              Chat Baru
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="grid min-h-150 grid-cols-1 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          {/* Chat */}
          <div className="flex flex-col border-r border-line bg-cream-50">
            <div
              ref={scrollRef}
              className="max-h-130 flex-1 overflow-y-auto px-6 py-5"
            >
              <div className="mb-3.5 mt-1 text-center text-[11px] font-extrabold text-ink-300">
                Hari ini · {nowTime()}
              </div>
              {sessionLoading ? (
                <div className="py-10 text-center text-sm font-bold text-ink-500">
                  Memuat sesi...
                </div>
              ) : (
                messages.map((m, i) => (
                  <Bubble key={i} role={m.role} text={m.text} time={m.time} />
                ))
              )}
              {typing && (
                <div className="mt-2 flex items-end gap-2">
                  <div className="grid h-8 w-8 place-items-center overflow-hidden rounded-full bg-brand-50">
                    <Kimo pose="peek" size={36} />
                  </div>
                  <div className="inline-flex gap-1 rounded-[20px_20px_20px_6px] bg-linear-to-r from-[#FBA01F] to-[#F08A2E] px-4 py-3.5">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="h-1.75 w-1.75 rounded-full bg-white"
                        style={{
                          animation: `pop-in 0.9s ease-in-out ${d * 0.15}s infinite alternate`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick prompts */}
            <div className="border-t border-line bg-white">
              <button
                type="button"
                onClick={() => setPromptsOpen((v) => !v)}
                className="flex w-full cursor-pointer items-center justify-between border-0 bg-transparent px-6 py-2.5 text-left"
              >
                <span className="text-[11px] font-extrabold uppercase tracking-[0.06em] text-ink-500">
                  Saran Pertanyaan
                </span>
                <span
                  className={[
                    "grid h-6 w-6 place-items-center rounded-full bg-cream-100 text-ink-700 transition-transform",
                    promptsOpen ? "rotate-180" : "rotate-0",
                  ].join(" ")}
                >
                  <Icon name="chevron-down" size={14} />
                </span>
              </button>
              <div
                className={[
                  "grid overflow-hidden transition-all duration-300 ease-in-out",
                  promptsOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0",
                ].join(" ")}
              >
                <div className="min-h-0">
                  <div className="grid grid-cols-2 gap-2 px-6 pb-3">
                    {quickPrompts.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => send(q.title + ": " + q.sub)}
                        className="flex cursor-pointer items-center gap-2.5 rounded-[14px] border border-line bg-cream-100 px-3 py-2.5 transition hover:border-line-strong"
                      >
                        <Icon
                          name={q.icon}
                          size={18}
                          color="var(--color-brand-600)"
                        />
                        <div className="flex min-w-0 flex-col text-left">
                          <div className="font-display text-[13px] font-semibold text-ink-900">
                            {q.title}
                          </div>
                          <div className="truncate text-[11px] font-bold text-ink-500">
                            {q.sub}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Composer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2.5 border-t border-line bg-white px-6 py-3.5"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ketik di sini..."
                className="flex-1 rounded-full border border-line bg-cream-100 px-4.5 py-3 font-body text-sm text-ink-700 outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border-0 bg-brand-500 text-white shadow-card disabled:opacity-50"
              >
                <Icon name="send" size={18} color="white" />
              </button>
            </form>
          </div>

          {/* Sessions */}
          <aside className="flex flex-col gap-4 bg-cream-100 p-5">
            <div className="flex flex-col overflow-hidden rounded-[24px] border border-line bg-white shadow-card">
              <div className="flex items-center justify-between border-b border-line px-5 py-4">
                <h4 className="text-base">Riwayat Sesi</h4>
                <button
                  onClick={fetchSessions}
                  className="grid h-8 w-8 cursor-pointer place-items-center rounded-lg border-0 bg-cream-100 text-ink-700"
                  title="Muat ulang"
                >
                  <Icon name="refresh" size={14} />
                </button>
              </div>
              <div className="max-h-130 flex-1 overflow-y-auto p-3">
                {sessionsLoading ? (
                  <div className="py-6 text-center text-sm font-bold text-ink-500">
                    Memuat...
                  </div>
                ) : sessions.length === 0 ? (
                  <div className="py-6 text-center text-sm font-bold text-ink-500">
                    Belum ada sesi chat.
                  </div>
                ) : (
                  sessions.map((s) => {
                    const isActive = s.id === activeSessionId;
                    return (
                      <button
                        key={s.id}
                        onClick={() => loadSession(s.id)}
                        className={[
                          "group mb-2 flex w-full cursor-pointer items-start gap-2 rounded-[14px] border px-3 py-2.5 text-left transition",
                          isActive
                            ? "border-brand-500 bg-brand-50"
                            : "border-line bg-cream-50 hover:border-line-strong",
                        ].join(" ")}
                      >
                        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-brand-600">
                          <Icon name="chat" size={16} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="truncate font-display text-[13px] font-semibold text-ink-900">
                            {s.title || `Sesi #${s.id}`}
                          </div>
                          <div className="mt-0.5 text-[11px] font-bold text-ink-500">
                            {formatSessionDate(s.updated_at || s.created_at)}
                          </div>
                        </div>
                        <span
                          role="button"
                          tabIndex={0}
                          onClick={(e) => deleteSession(s.id, e)}
                          className="grid h-7 w-7 shrink-0 cursor-pointer place-items-center rounded-lg text-ink-300 opacity-0 transition hover:bg-red-50 hover:text-red-500 group-hover:opacity-100"
                          title="Hapus sesi"
                        >
                          <Icon name="trash" size={14} />
                        </span>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
