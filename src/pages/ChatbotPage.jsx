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
            "animate-slide-up px-4 py-3 text-sm font-semibold leading-[1.45] shadow-soft",
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

function SideStat({ icon, label, value, color }) {
  return (
    <div className="flex items-center gap-3 border-b border-dashed border-line py-2.5">
      <div
        className="grid h-9 w-9 place-items-center rounded-xl"
        style={{ background: `${color}22`, color }}
      >
        <Icon name={icon} size={18} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[11px] font-extrabold uppercase tracking-[0.04em] text-ink-500">
          {label}
        </div>
        <div className="mt-0.5 truncate text-sm font-extrabold text-ink-900">
          {value}
        </div>
      </div>
    </div>
  );
}

export default function ChatbotPage() {
  const user = useAuthStore((s) => s.user);
  const token = useAuthStore((s) => s.token);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: `Halo! Kanca di sini, saya tadi menemani ${user.name} bermain dan belajar. Ingin tahu apa saja yang ia pelajari hari ini? ✨`,
      time: nowTime(),
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, typing]);

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
      const res = await fetch(`${API_URL}/chatbot/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: text.trim() }),
      });
      const data = await res.json();
      const reply =
        data.reply ||
        data.message ||
        "Maaf, saya tidak mengerti. Coba tanya lagi ya!";
      setMessages((m) => [
        ...m,
        { role: "bot", text: reply.trim(), time: nowTime() },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "bot",
          text: "Maaf, saya butuh sedikit waktu. Coba lagi ya!",
          time: nowTime(),
        },
      ]);
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
            <button className="grid h-10 w-10 cursor-pointer place-items-center rounded-xl border-0 bg-white text-ink-700 shadow-soft">
              <Icon name="chart" size={18} />
            </button>
            <button className="grid h-10 w-10 cursor-pointer place-items-center rounded-xl border-0 bg-white text-ink-700 shadow-soft">
              <Icon name="menu" size={18} />
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
              {messages.map((m, i) => (
                <Bubble key={i} role={m.role} text={m.text} time={m.time} />
              ))}
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
            <div className="grid grid-cols-2 gap-2 border-t border-line bg-white px-6 py-3">
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

          {/* Insights */}
          <aside className="flex flex-col gap-4 bg-cream-100 p-5">
            <div className="rounded-[24px] border border-line bg-white p-5 shadow-card">
              <h4 className="mb-3.5 text-base">Ringkasan Hari Ini</h4>
              <SideStat
                icon="clock"
                label="Waktu Bermain"
                value="30 menit"
                color="#FBA01F"
              />
              <SideStat
                icon="book"
                label="Cerita Selesai"
                value="1 (Si Kelinci Jujur)"
                color="#E66B85"
              />
              <SideStat
                icon="medal"
                label="Lencana Baru"
                value="Si Jujur Hebat"
                color="#FCD968"
              />
              <SideStat
                icon="fire"
                label="Streak"
                value="5 hari"
                color="#F59330"
              />
            </div>
            <div className="rounded-[24px] border border-line bg-linear-to-br from-[#FFF1DA] to-[#FFE0B0] p-5 shadow-card">
              <div className="text-xs font-extrabold uppercase tracking-[0.06em] text-brand-700">
                Saran Kanca
              </div>
              <div className="mt-1.5 font-display text-base font-semibold text-ink-900">
                Ajak ngobrol tentang kejujuran sebelum tidur
              </div>
              <p className="mt-1.5 text-[13px] font-semibold text-ink-500">
                Skor kejujurannya tinggi minggu ini. Refleksi singkat akan
                memperkuat pemahaman.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
