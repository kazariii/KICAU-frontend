import Icon from './Icon';

export function Sparkles({ count = 12, seed = 1 }) {
  const rand = (i) => {
    const x = Math.sin(i * 9173 + seed * 31) * 10000;
    return x - Math.floor(x);
  };
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {Array.from({ length: count }).map((_, i) => {
        const top = rand(i) * 100;
        const left = rand(i + 7) * 100;
        const size = 8 + rand(i + 13) * 16;
        const op = 0.25 + rand(i + 21) * 0.5;
        const dur = 3 + rand(i + 33) * 4;
        const delay = rand(i + 55) * 4;
        return (
          <div key={i} style={{
            position: "absolute", top: top + "%", left: left + "%",
            width: size, height: size, opacity: op,
            animation: `float ${dur}s ease-in-out ${delay}s infinite`,
          }}>
            <Icon name="sparkle-grad" size={size} />
          </div>
        );
      })}
    </div>
  );
}

export function Cloud({ size = 80, color = "white", style }) {
  return (
    <svg width={size * 1.6} height={size} viewBox="0 0 160 100" style={style}>
      <path
        d="M30 70c-12 0-22-9-22-20s10-20 22-20c2-12 13-22 27-22 12 0 22 7 26 17 4-3 9-5 15-5 13 0 23 10 23 22 0 1 0 3-.2 4 8 2 14 9 14 18 0 11-9 20-21 20z"
        fill={color}
      />
    </svg>
  );
}
