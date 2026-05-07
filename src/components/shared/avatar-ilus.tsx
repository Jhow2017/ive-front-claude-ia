// Stylized illustrated avatar based on a deterministic seed.
// Replaces the original AvatarIlus from the legacy artifact.
const SKINS = ["#fcd34d", "#f9a825", "#e8a87c", "#d4826a", "#c68642"];
const HAIRS = ["#1f2937", "#92400e", "#374151", "#7c3aed", "#b45309"];
const SHIRTS = ["#34d399", "#60a5fa", "#f472b6", "#a78bfa", "#fbbf24"];

export function AvatarIlus({ seed = 0, size = 32 }: { seed?: number; size?: number }) {
  const sk = SKINS[seed % SKINS.length];
  const hr = HAIRS[seed % HAIRS.length];
  const sh = SHIRTS[seed % SHIRTS.length];
  const isLong = seed % 2 === 0;
  const hasGlasses = seed % 3 === 0;
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className="rounded-full bg-(--color-g50) shrink-0">
      <ellipse cx="32" cy="55" rx="18" ry="12" fill={sh} />
      <circle cx="32" cy="28" r="14" fill={sk} />
      {isLong ? (
        <>
          <path d="M18 26 Q22 14 32 14 Q42 14 46 26 L46 36 Q44 32 42 32 L22 32 Q20 32 18 36 Z" fill={hr} />
          <path d="M22 32 L18 44" stroke={hr} strokeWidth="3" strokeLinecap="round" />
          <path d="M42 32 L46 44" stroke={hr} strokeWidth="3" strokeLinecap="round" />
        </>
      ) : (
        <path d="M18 26 Q22 14 32 14 Q42 14 46 26 L46 30 Q40 22 32 22 Q24 22 18 30 Z" fill={hr} />
      )}
      <ellipse cx="27" cy="29" rx="1.6" ry="2" fill="#1f2937" />
      <ellipse cx="37" cy="29" rx="1.6" ry="2" fill="#1f2937" />
      <path d="M28 34 Q32 37 36 34" stroke="#92400e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {hasGlasses && (
        <>
          <circle cx="27" cy="29" r="3.5" fill="none" stroke="#374151" strokeWidth="1" />
          <circle cx="37" cy="29" r="3.5" fill="none" stroke="#374151" strokeWidth="1" />
          <line x1="30.5" y1="29" x2="33.5" y2="29" stroke="#374151" strokeWidth="1" />
        </>
      )}
    </svg>
  );
}

export function AvatarInitials({
  init,
  size = 32,
  className = "",
}: {
  init: string;
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={`rounded-full bg-(--color-g100) text-(--color-g700) font-bold flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.36) }}
    >
      {init}
    </div>
  );
}
