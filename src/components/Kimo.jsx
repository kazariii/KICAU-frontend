export default function Kimo({ pose = "wave", size = 160, style }) {
  const wrap = { width: size, height: size, ...style };

  const Face = ({ scale = 1, eyeY = 0, mouth = "smile" }) => (
    <g transform={`scale(${scale})`}>
      <path d="M50 20 C20 20 4 42 4 70 C4 96 24 116 50 116 C76 116 96 96 96 70 C96 42 80 20 50 20 Z" fill="#F08A2E"/>
      <ellipse cx="50" cy="80" rx="22" ry="20" fill="#FFE4BC"/>
      <path d="M22 70 C18 88 28 102 50 102 C72 102 82 88 78 70 C70 56 30 56 22 70 Z" fill="#FFE4BC"/>
      <path d="M14 28 L24 14 L34 36 Z" fill="#F08A2E"/>
      <path d="M86 28 L76 14 L66 36 Z" fill="#F08A2E"/>
      <path d="M18 28 L24 20 L30 34 Z" fill="#3A1F12"/>
      <path d="M82 28 L76 20 L70 34 Z" fill="#3A1F12"/>
      <path d="M16 28 C24 14 76 14 84 28 L86 36 C70 28 30 28 14 36 Z" fill="#3D4A8E"/>
      <path d="M14 36 C30 32 70 32 86 36 L86 40 L14 40 Z" fill="#2E3A75"/>
      <path d="M84 38 L102 42 L102 50 L86 46 Z" fill="#3D4A8E"/>
      <ellipse cx="36" cy={62 + eyeY} rx="4" ry="5" fill="#241410"/>
      <ellipse cx="64" cy={62 + eyeY} rx="4" ry="5" fill="#241410"/>
      <circle cx="37" cy={60 + eyeY} r="1.4" fill="white"/>
      <circle cx="65" cy={60 + eyeY} r="1.4" fill="white"/>
      <ellipse cx="26" cy="78" rx="4" ry="3" fill="#FFB3B3" opacity="0.7"/>
      <ellipse cx="74" cy="78" rx="4" ry="3" fill="#FFB3B3" opacity="0.7"/>
      <path d="M48 76 Q50 80 52 76 Q50 82 48 76 Z" fill="#241410"/>
      {mouth === "smile" && <path d="M44 84 Q50 90 56 84" stroke="#241410" strokeWidth="2" fill="none" strokeLinecap="round"/>}
      {mouth === "open" && <path d="M44 84 Q50 94 56 84 Q50 90 44 84 Z" fill="#7A2A2A"/>}
      {mouth === "smirk" && <path d="M44 86 Q50 89 58 84" stroke="#241410" strokeWidth="2" fill="none" strokeLinecap="round"/>}
    </g>
  );

  switch (pose) {
    case "wave":
      return (
        <svg width={size} height={size} viewBox="0 0 120 120" style={wrap}>
          <Face />
          <g>
            <rect x="76" y="6" width="32" height="22" rx="8" fill="white" stroke="#3A1F12" strokeWidth="1.5"/>
            <text x="92" y="22" textAnchor="middle" fontFamily="Fredoka, sans-serif" fontWeight="700" fontSize="12" fill="#F08A2E">Rp</text>
            <path d="M86 26 L82 32 L92 28 Z" fill="white" stroke="#3A1F12" strokeWidth="1.5"/>
          </g>
          <g style={{ transformOrigin: "20px 80px", animation: "wiggle 1.6s ease-in-out infinite" }}>
            <ellipse cx="14" cy="74" rx="8" ry="10" fill="#F08A2E"/>
          </g>
        </svg>
      );
    case "celebrate":
      return (
        <svg width={size} height={size} viewBox="0 0 120 130" style={wrap}>
          {[
            ["#FCD968", 14, 8, 6], ["#F08A2E", 90, 12, 5],
            ["#CDC7EE", 8, 32, 4], ["#FFC2CB", 108, 36, 5],
            ["#B8DFB8", 22, 56, 4], ["#F08A2E", 100, 60, 4],
          ].map(([c, x, y, r], i) => (
            <circle key={i} cx={x} cy={y} r={r} fill={c}/>
          ))}
          <g transform="translate(0 8)">
            <Face mouth="open"/>
            <ellipse cx="6" cy="38" rx="8" ry="10" fill="#F08A2E" transform="rotate(-30 6 38)"/>
            <ellipse cx="114" cy="38" rx="8" ry="10" fill="#F08A2E" transform="rotate(30 114 38)"/>
            <circle cx="50" cy="100" r="8" fill="#FCD968" stroke="#E47A17" strokeWidth="2"/>
            <path d="M44 90 L50 100 L56 90" stroke="#E47A17" strokeWidth="2" fill="none"/>
          </g>
        </svg>
      );
    case "thinking":
      return (
        <svg width={size} height={size} viewBox="0 0 120 120" style={wrap}>
          <Face mouth="smirk"/>
          <circle cx="92" cy="20" r="6" fill="white" stroke="#3A1F12" strokeWidth="1.5"/>
          <circle cx="80" cy="32" r="3" fill="white" stroke="#3A1F12" strokeWidth="1.2"/>
          <circle cx="74" cy="40" r="2" fill="white" stroke="#3A1F12" strokeWidth="1"/>
        </svg>
      );
    case "peek":
      return (
        <svg width={size} height={size * 0.6} viewBox="0 0 120 70" style={{ width: size, height: size * 0.6, ...style }}>
          <g transform="translate(0 -50)">
            <Face />
          </g>
        </svg>
      );
    case "headphones":
      return (
        <svg width={size} height={size} viewBox="0 0 120 120" style={wrap}>
          <Face />
          <path d="M14 50 C14 30 36 14 60 14 C84 14 106 30 106 50" stroke="#3D4A8E" strokeWidth="6" fill="none"/>
          <rect x="6" y="46" width="14" height="20" rx="6" fill="#3D4A8E"/>
          <rect x="100" y="46" width="14" height="20" rx="6" fill="#3D4A8E"/>
        </svg>
      );
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 120 120" style={wrap}>
          <Face/>
        </svg>
      );
  }
}
