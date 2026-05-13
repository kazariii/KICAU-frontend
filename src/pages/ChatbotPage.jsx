import { useState, useEffect, useRef } from 'react';
import Icon from '../components/Icon';
import Kimo from '../components/Kimo';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

function nowTime() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`;
}

function Bubble({ role, text, time }) {
  const isUser = role === "user";
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "flex-end", margin: "10px 0", flexDirection: isUser ? "row-reverse" : "row" }}>
      {!isUser && (
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--brand-50)", display: "grid", placeItems: "center", overflow: "hidden", flexShrink: 0 }}>
          <Kimo pose="peek" size={36}/>
        </div>
      )}
      <div style={{ maxWidth: "78%" }}>
        <div className="anim-slide" style={isUser ? { background: "linear-gradient(120deg, #4D2613, #2A140A)", color: "white", padding: "12px 16px", borderRadius: "20px 20px 6px 20px", fontSize: 14, fontWeight: 600, lineHeight: 1.45, boxShadow: "var(--shadow-sm)" } : { background: "linear-gradient(120deg, #FBA01F, #F08A2E)", color: "white", padding: "12px 16px", borderRadius: "20px 20px 20px 6px", fontSize: 14, fontWeight: 600, lineHeight: 1.45, boxShadow: "var(--shadow-sm)" }}>
          {text}
        </div>
        <div style={{ fontSize: 10, fontWeight: 700, color: "var(--ink-300)", marginTop: 4, textAlign: isUser ? "right" : "left" }}>{time}</div>
      </div>
    </div>
  );
}

function SideStat({ icon, label, value, color }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px dashed var(--line)" }}>
      <div style={{ width: 36, height: 36, borderRadius: 12, background: `${color}22`, display: "grid", placeItems: "center", color }}><Icon name={icon} size={18}/></div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: "var(--ink-500)", textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</div>
        <div style={{ fontSize: 14, fontWeight: 800, color: "var(--ink-900)", marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{value}</div>
      </div>
    </div>
  );
}

export default function ChatbotPage({ user, token }) {
  const [messages, setMessages] = useState([
    { role: "bot", text: `Halo! Kanca di sini, saya tadi menemani ${user.name} bermain dan belajar. Ingin tahu apa saja yang ia pelajari hari ini? ✨`, time: nowTime() },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, typing]);

  const quickPrompts = [
    { icon: "target", title: "Target Hari Ini", sub: "Apakah anak menyelesaikan misinya?" },
    { icon: "chart", title: "Lihat Perkembangan", sub: "Ringkasan aktivitas minggu ini" },
    { icon: "heart", title: "Nilai yang dipelajari", sub: "Apa nilai karakter terbaru?" },
    { icon: "book", title: "Rekomendasi Cerita", sub: "Cerita apa yang cocok hari ini?" },
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
        headers: { "Content-Type": "application/json", "Accept": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ message: text.trim() }),
      });
      const data = await res.json();
      const reply = data.reply || data.message || "Maaf, saya tidak mengerti. Coba tanya lagi ya!";
      setMessages((m) => [...m, { role: "bot", text: reply.trim(), time: nowTime() }]);
    } catch {
      setMessages((m) => [...m, { role: "bot", text: "Maaf, saya butuh sedikit waktu. Coba lagi ya!", time: nowTime() }]);
    } finally {
      setTyping(false);
    }
  }

  return (
    <div className="page" style={{ paddingBottom: 40 }}>
      <div style={{ background: "white", borderRadius: 32, overflow: "hidden", border: "1px solid var(--line)", boxShadow: "var(--shadow-lg)" }}>
        {/* Header */}
        <div style={{ padding: "20px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "linear-gradient(135deg, #FFE4BC, #FFD09F)", borderBottom: "1px solid var(--line)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 52, height: 52, borderRadius: "50%", background: "white", display: "grid", placeItems: "center", boxShadow: "var(--shadow-sm)", overflow: "hidden" }}>
              <Kimo pose="headphones" size={56}/>
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 26, color: "var(--brand-600)", letterSpacing: "0.02em" }}>KANCA</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink-500)", display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#7DBA6F" }}/> Online · Asisten orang tua
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button style={{ width: 40, height: 40, borderRadius: 12, background: "white", border: 0, cursor: "pointer", display: "grid", placeItems: "center", color: "var(--ink-700)", boxShadow: "var(--shadow-sm)" }}><Icon name="chart" size={18}/></button>
            <button style={{ width: 40, height: 40, borderRadius: 12, background: "white", border: 0, cursor: "pointer", display: "grid", placeItems: "center", color: "var(--ink-700)", boxShadow: "var(--shadow-sm)" }}><Icon name="menu" size={18}/></button>
          </div>
        </div>

        {/* Body */}
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.6fr) minmax(0, 1fr)", minHeight: 600 }}>
          {/* Chat */}
          <div style={{ display: "flex", flexDirection: "column", borderRight: "1px solid var(--line)", background: "var(--cream-50)" }}>
            <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: "20px 24px", maxHeight: 520 }}>
              <div style={{ textAlign: "center", fontSize: 11, fontWeight: 800, color: "var(--ink-300)", margin: "4px 0 14px" }}>Hari ini · {nowTime()}</div>
              {messages.map((m, i) => <Bubble key={i} role={m.role} text={m.text} time={m.time}/>)}
              {typing && (
                <div style={{ display: "flex", gap: 8, alignItems: "flex-end", marginTop: 8 }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--brand-50)", display: "grid", placeItems: "center", overflow: "hidden" }}>
                    <Kimo pose="peek" size={36}/>
                  </div>
                  <div style={{ background: "linear-gradient(120deg, #FBA01F, #F08A2E)", padding: "14px 18px", borderRadius: "20px 20px 20px 6px", display: "inline-flex", gap: 4 }}>
                    {[0,1,2].map((d) => (
                      <span key={d} style={{ width: 7, height: 7, borderRadius: "50%", background: "white", animation: `pop-in 0.9s ease-in-out ${d * 0.15}s infinite alternate` }}/>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick prompts */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8, padding: "12px 24px", borderTop: "1px solid var(--line)", background: "white" }}>
              {quickPrompts.map((q, i) => (
                <button key={i} onClick={() => send(q.title + ": " + q.sub)} style={{ background: "var(--cream-100)", border: "1px solid var(--line)", borderRadius: 14, padding: "10px 12px", display: "flex", alignItems: "center", gap: 10, cursor: "pointer", transition: "all .15s" }}>
                  <Icon name={q.icon} size={18} color="var(--brand-600)"/>
                  <div style={{ display: "flex", flexDirection: "column", textAlign: "left", minWidth: 0 }}>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 13, color: "var(--ink-900)" }}>{q.title}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "var(--ink-500)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{q.sub}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Composer */}
            <form style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 24px", background: "white", borderTop: "1px solid var(--line)" }} onSubmit={(e) => { e.preventDefault(); send(input); }}>
              <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ketik di sini..." style={{ flex: 1, padding: "12px 18px", background: "var(--cream-100)", border: "1px solid var(--line)", borderRadius: 999, outline: "none", fontFamily: "var(--font-body)", fontSize: 14, color: "var(--ink-700)" }}/>
              <button type="submit" disabled={!input.trim()} style={{ width: 44, height: 44, borderRadius: "50%", border: 0, cursor: "pointer", background: "var(--brand-500)", color: "white", display: "grid", placeItems: "center", boxShadow: "var(--shadow-md)" }}>
                <Icon name="send" size={18} color="white"/>
              </button>
            </form>
          </div>

          {/* Insights */}
          <aside style={{ padding: 20, display: "flex", flexDirection: "column", gap: 16, background: "var(--cream-100)" }}>
            <div className="card" style={{ padding: 20 }}>
              <h4 style={{ fontSize: 16, marginBottom: 14 }}>Ringkasan Hari Ini</h4>
              <SideStat icon="clock" label="Waktu Bermain" value="30 menit" color="#FBA01F"/>
              <SideStat icon="book" label="Cerita Selesai" value="1 (Si Kelinci Jujur)" color="#E66B85"/>
              <SideStat icon="medal" label="Lencana Baru" value="Si Jujur Hebat" color="#FCD968"/>
              <SideStat icon="fire" label="Streak" value="5 hari" color="#F59330"/>
            </div>
            <div className="card" style={{ padding: 20, background: "linear-gradient(160deg, #FFF1DA, #FFE0B0)" }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: "var(--brand-700)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Saran Kanca</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 16, color: "var(--ink-900)", marginTop: 6 }}>Ajak ngobrol tentang kejujuran sebelum tidur</div>
              <p style={{ fontSize: 13, fontWeight: 600, color: "var(--ink-500)", marginTop: 6 }}>Skor kejujurannya tinggi minggu ini. Refleksi singkat akan memperkuat pemahaman.</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
