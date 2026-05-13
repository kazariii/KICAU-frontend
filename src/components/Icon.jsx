export default function Icon({ name, size = 22, stroke = 2.2, color = "currentColor", style }) {
  const s = { width: size, height: size, ...style };
  const common = {
    width: size, height: size, viewBox: "0 0 24 24",
    fill: "none", stroke: color, strokeWidth: stroke,
    strokeLinecap: "round", strokeLinejoin: "round",
    style: s,
  };
  switch (name) {
    case "home":
      return <svg {...common}><path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v9.5h14V10"/><path d="M10 19.5v-5h4v5"/></svg>;
    case "medal":
      return <svg {...common}><circle cx="12" cy="14" r="5"/><path d="M8 4l4 6 4-6"/><path d="M9 4h6"/></svg>;
    case "sparkle-grad":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" style={s}>
          <defs>
            <linearGradient id="sg" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#FCD968"/><stop offset="1" stopColor="#F59330"/>
            </linearGradient>
          </defs>
          <path d="M12 2 L13.6 9.4 L21 11 L13.6 12.6 L12 20 L10.4 12.6 L3 11 L10.4 9.4 Z" fill="url(#sg)"/>
        </svg>
      );
    case "compass":
      return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="m9 15 2-6 6-2-2 6-6 2z"/></svg>;
    case "user":
      return <svg {...common}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg>;
    case "send":
      return <svg {...common}><path d="m4 12 16-8-7 18-2-7-7-3z"/></svg>;
    case "mic":
      return <svg {...common}><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v3"/></svg>;
    case "back":
      return <svg {...common}><path d="m14 6-6 6 6 6"/></svg>;
    case "play":
      return <svg width={size} height={size} viewBox="0 0 24 24" style={s} fill={color}><path d="M7 4l13 8-13 8z"/></svg>;
    case "book":
      return <svg {...common}><path d="M4 5c2-1 6-1 8 1 2-2 6-2 8-1v14c-2-1-6-1-8 1-2-2-6-2-8-1V5z"/><path d="M12 6v14"/></svg>;
    case "clock":
      return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
    case "star":
      return <svg width={size} height={size} viewBox="0 0 24 24" style={s} fill={color}><path d="M12 2.5l2.9 6 6.6 1-4.8 4.6 1.1 6.5L12 17.8 6.2 20.6l1.1-6.5L2.5 9.5l6.6-1z"/></svg>;
    case "heart":
      return <svg width={size} height={size} viewBox="0 0 24 24" style={s} fill={color}><path d="M12 21s-7-4.5-9.5-9.2C.7 8.4 2.7 4.5 6.4 4.5c2 0 3.6 1 4.6 2.4 1-1.4 2.6-2.4 4.6-2.4 3.7 0 5.7 3.9 3.9 7.3C19 16.5 12 21 12 21z"/></svg>;
    case "wallet":
      return <svg {...common}><rect x="3" y="6" width="18" height="14" rx="3"/><path d="M3 10h18"/><circle cx="16" cy="14" r="1.5" fill={color}/></svg>;
    case "target":
      return <svg {...common}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill={color}/></svg>;
    case "share":
      return <svg {...common}><path d="M16 5l-4-3-4 3"/><path d="M12 2v12"/><path d="M5 12v8h14v-8"/></svg>;
    case "chat":
      return <svg {...common}><path d="M4 6c0-1.1.9-2 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-7l-4 3v-3H6a2 2 0 0 1-2-2V6z"/></svg>;
    case "chart":
      return <svg {...common}><path d="M4 4v16h16"/><path d="M7 14l3-3 3 3 4-5"/></svg>;
    case "lock":
      return <svg {...common}><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>;
    case "mail":
      return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>;
    case "eye":
      return <svg {...common}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>;
    case "fire":
      return <svg width={size} height={size} viewBox="0 0 24 24" style={s} fill={color}><path d="M12 2c1 3 4 5 4 9a4 4 0 1 1-8 0c0-2 1-2 1-4 0-1 1-2 1-2s2 1 2-3z"/></svg>;
    case "trophy":
      return <svg {...common}><path d="M7 4h10v4a5 5 0 0 1-10 0V4z"/><path d="M7 6H4v2a3 3 0 0 0 3 3"/><path d="M17 6h3v2a3 3 0 0 1-3 3"/><path d="M9 14h6l-1 4h-4z"/><path d="M8 20h8"/></svg>;
    case "check":
      return <svg {...common}><path d="m5 12 5 5L20 7"/></svg>;
    case "plus":
      return <svg {...common}><path d="M12 5v14M5 12h14"/></svg>;
    case "x":
      return <svg {...common}><path d="M6 6l12 12M6 18 18 6"/></svg>;
    case "google":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" style={s}>
          <path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3z"/>
          <path fill="#34A853" d="M12 22c2.7 0 5-1 6.6-2.5l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.7-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22z"/>
          <path fill="#FBBC04" d="M6.4 13.9a6 6 0 0 1 0-3.8V7.5H3.1a10 10 0 0 0 0 9z"/>
          <path fill="#EA4335" d="M12 6c1.5 0 2.8.5 3.8 1.5l2.8-2.8C17 3.1 14.7 2 12 2A10 10 0 0 0 3.1 7.5l3.3 2.6C7.2 7.7 9.4 6 12 6z"/>
        </svg>
      );
    case "tent":
      return <svg {...common}><path d="m3 20 9-15 9 15z"/><path d="M12 5v15"/><path d="m9 20 3-4 3 4"/></svg>;
    case "school":
      return <svg {...common}><path d="m3 10 9-5 9 5-9 5z"/><path d="M7 12v5c0 1 2 2 5 2s5-1 5-2v-5"/></svg>;
    case "fairy":
      return <svg {...common}><circle cx="12" cy="9" r="3"/><path d="M5 18c2-3 4-4 7-4s5 1 7 4"/><path d="M12 12v6"/></svg>;
    case "bag":
      return <svg {...common}><path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>;
    case "menu":
      return <svg {...common}><path d="M4 7h16M4 12h16M4 17h16"/></svg>;
    default:
      return <svg {...common}><circle cx="12" cy="12" r="9"/></svg>;
  }
}
