export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="13" fill="#259a43" />
      <path
        d="M10 24 C10 18 15 13 20 13 C23 13 25 15.5 24 19 C23 22.5 21 24 24 24 C27 24 29 25.5 28 29 C27 32.5 23 35 20 35 C15 35 10 30 10 24 Z"
        fill="rgba(255,255,255,.25)"
      />
      <path
        d="M38 24 C38 18 33 13 28 13 C25 13 23 15.5 24 19 C25 22.5 27 24 24 24 C21 24 19 25.5 20 29 C21 32.5 25 35 28 35 C33 35 38 30 38 24 Z"
        fill="rgba(255,255,255,.18)"
      />
      <circle cx="24" cy="19" r="3.5" fill="white" opacity=".95" />
      <path
        d="M19.5 26 Q21 23.5 24 23.5 Q27 23.5 28.5 26 L29 31 Q26.5 32.5 24 32.5 Q21.5 32.5 19 31 Z"
        fill="white"
        opacity=".9"
      />
      <path d="M19.5 26 Q16 24 14 25.5" stroke="white" strokeWidth="2" strokeLinecap="round" opacity=".9" />
      <path d="M28.5 26 Q32 24 34 25.5" stroke="white" strokeWidth="2" strokeLinecap="round" opacity=".9" />
      <circle cx="8" cy="12" r="2.5" fill="#fbbf24" />
      <circle cx="40" cy="12" r="2" fill="#f472b6" />
      <circle cx="8" cy="38" r="2" fill="#60a5fa" />
      <circle cx="40" cy="38" r="2.5" fill="#a78bfa" />
      <circle cx="24" cy="6" r="1.5" fill="#fde68a" />
    </svg>
  );
}

export function LogoFull({ dark = true, size = 36 }: { dark?: boolean; size?: number }) {
  return (
    <div className="flex items-center gap-2.5">
      <LogoMark size={size} />
      <div>
        <div
          className={`text-sm font-extrabold leading-tight tracking-tight ${
            dark ? "text-(--color-text)" : "text-white"
          }`}
        >
          Instituto <span className="text-(--color-g500)">Verde</span>
        </div>
        <div
          className={`text-[11px] font-semibold leading-tight ${
            dark ? "text-(--color-muted)" : "text-white/65"
          }`}
        >
          Esperança
        </div>
      </div>
    </div>
  );
}
