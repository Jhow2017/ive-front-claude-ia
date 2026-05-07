// Animated illustrations — simplified expressive SVG ports of the originals.

export function IllusTherapy() {
  return (
    <svg viewBox="0 0 380 320" className="w-full max-w-[380px] overflow-visible">
      <ellipse cx="190" cy="295" rx="155" ry="22" fill="#d1fae5" opacity=".4" />
      <rect x="65" y="278" width="248" height="18" rx="9" fill="#a7f3d0" opacity=".3" />
      {/* book */}
      <g className="animate-wiggle" style={{ transformOrigin: "175px 215px" }}>
        <rect x="110" y="195" width="128" height="88" rx="8" fill="white" stroke="#d1fae5" strokeWidth="2" />
        <line x1="174" y1="195" x2="174" y2="283" stroke="#d1fae5" strokeWidth="2" />
        <rect x="120" y="207" width="44" height="5" rx="2.5" fill="#d1fae5" />
        <rect x="120" y="218" width="36" height="4" rx="2" fill="#e5e7eb" />
        <rect x="120" y="228" width="40" height="4" rx="2" fill="#e5e7eb" />
        <circle cx="145" cy="258" r="12" fill="#fde68a" opacity=".7" />
        <rect x="184" y="207" width="42" height="5" rx="2.5" fill="#d1fae5" />
        <rect x="184" y="218" width="36" height="4" rx="2" fill="#e5e7eb" />
        <circle cx="206" cy="258" r="10" fill="#fca5a5" opacity=".6" />
      </g>
      {/* kid */}
      <g className="animate-float-slow">
        <path d="M108 260 Q98 278 90 290" stroke="#fde68a" strokeWidth="16" strokeLinecap="round" fill="none" />
        <path d="M132 260 Q130 278 128 290" stroke="#fde68a" strokeWidth="16" strokeLinecap="round" fill="none" />
        <rect x="96" y="200" width="48" height="64" rx="13" fill="#c7d2fe" />
        <path d="M144 215 Q162 210 174 210" stroke="#c7d2fe" strokeWidth="11" strokeLinecap="round" fill="none" />
        <circle cx="120" cy="190" r="24" fill="#fcd34d" />
        <path d="M97 178 Q110 155 120 162 Q130 155 143 178" fill="#92400e" />
        <ellipse cx="113" cy="190" rx="3.2" ry="3.2" fill="#1f2937" />
        <ellipse cx="127" cy="190" rx="3.2" ry="3.2" fill="#1f2937" />
        <path d="M113 199 Q120 205 127 199" stroke="#92400e" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
      {/* therapist */}
      <g className="animate-float-slow" style={{ animationDelay: ".8s" }}>
        <path d="M248 265 Q242 280 238 292" stroke="#6ee7b7" strokeWidth="18" strokeLinecap="round" fill="none" />
        <path d="M268 265 Q272 280 276 292" stroke="#6ee7b7" strokeWidth="18" strokeLinecap="round" fill="none" />
        <rect x="236" y="196" width="44" height="74" rx="13" fill="#34d399" />
        <rect x="240" y="200" width="36" height="68" rx="11" fill="white" opacity=".2" />
        <path d="M236 210 Q220 210 210 212" stroke="#34d399" strokeWidth="12" strokeLinecap="round" fill="none" />
        <circle cx="258" cy="186" r="26" fill="#fcd34d" />
        <path d="M232 178 Q240 155 258 160 Q276 155 284 178" fill="#1f2937" />
        <ellipse cx="258" cy="157" rx="10" ry="8" fill="#1f2937" />
        <ellipse cx="250" cy="187" rx="3" ry="3" fill="#1f2937" />
        <ellipse cx="266" cy="187" rx="3" ry="3" fill="#1f2937" />
        <path d="M251 196 Q258 202 265 196" stroke="#92400e" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      </g>
      <text x="160" y="175" fontSize="16" className="animate-float-slow">✨</text>
      <circle cx="38" cy="155" r="6" fill="#60a5fa" opacity=".45" className="animate-drift" />
      <circle cx="340" cy="170" r="5" fill="#fbbf24" opacity=".4" className="animate-drift" style={{ animationDelay: "1s" }} />
    </svg>
  );
}

export function IllusBlocks() {
  return (
    <svg viewBox="0 0 380 320" className="w-full max-w-[380px] overflow-visible">
      <ellipse cx="190" cy="300" rx="130" ry="14" fill="#d1fae5" opacity=".4" />
      <rect x="228" y="220" width="44" height="44" rx="8" fill="#fbbf24" className="animate-float" />
      <text x="250" y="247" fontSize="18" textAnchor="middle" fill="white" fontWeight="800">A</text>
      <rect x="234" y="178" width="38" height="38" rx="7" fill="#f472b6" className="animate-float" style={{ animationDelay: ".3s" }} />
      <text x="253" y="202" fontSize="16" textAnchor="middle" fill="white" fontWeight="800">B</text>
      <rect x="238" y="140" width="32" height="34" rx="6" fill="#60a5fa" className="animate-float" style={{ animationDelay: ".6s" }} />
      <text x="254" y="163" fontSize="14" textAnchor="middle" fill="white" fontWeight="800">C</text>
      <rect x="103" y="185" width="34" height="34" rx="6" fill="#a78bfa" className="animate-float" style={{ animationDelay: ".9s" }} />
      <text x="120" y="207" fontSize="14" textAnchor="middle" fill="white" fontWeight="800">D</text>
      <rect x="88" y="264" width="36" height="36" rx="7" fill="#6ee7b7" />
      <text x="106" y="287" fontSize="16" textAnchor="middle" fill="#065f46" fontWeight="800">E</text>
      <g className="animate-float-slow">
        <rect x="162" y="200" width="56" height="72" rx="14" fill="#fbbf24" />
        <circle cx="190" cy="192" r="26" fill="#fcd34d" />
        <path d="M164 185 Q172 160 190 165 Q208 160 216 185" fill="#1f2937" />
        <ellipse cx="182" cy="192" rx="3.5" ry="3.5" fill="#1f2937" />
        <ellipse cx="198" cy="192" rx="3.5" ry="3.5" fill="#1f2937" />
        <path d="M182 202 Q190 210 198 202" stroke="#92400e" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      </g>
      <text x="258" y="128" fontSize="20" className="animate-float">🌟</text>
    </svg>
  );
}

export function IllusPainting() {
  return (
    <svg viewBox="0 0 380 320" className="w-full max-w-[380px] overflow-visible">
      <rect x="95" y="52" width="130" height="100" rx="6" fill="#fff" stroke="#d1fae5" strokeWidth="2" />
      <circle cx="148" cy="88" r="20" fill="#fbbf24" opacity=".75" />
      <circle cx="182" cy="98" r="15" fill="#259a43" opacity=".8" />
      <path d="M118 125 Q148 102 178 118 Q205 132 220 112" stroke="#f472b6" strokeWidth="3" fill="none" strokeLinecap="round" />
      <line x1="95" y1="152" x2="80" y2="220" stroke="#9ca3af" strokeWidth="3" strokeLinecap="round" />
      <line x1="225" y1="152" x2="240" y2="220" stroke="#9ca3af" strokeWidth="3" strokeLinecap="round" />
      <line x1="160" y1="152" x2="160" y2="228" stroke="#9ca3af" strokeWidth="3" strokeLinecap="round" />
      <g className="animate-float-slow">
        <rect x="140" y="205" width="56" height="68" rx="14" fill="#fde68a" />
        <circle cx="168" cy="193" r="26" fill="#fcd34d" />
        <path d="M142 188 Q150 162 168 167 Q186 162 194 188" fill="#92400e" />
        <ellipse cx="160" cy="191" rx="3.5" ry="3.5" fill="#1f2937" />
        <ellipse cx="176" cy="191" rx="3.5" ry="3.5" fill="#1f2937" />
        <path d="M160 200 Q168 207 176 200" stroke="#92400e" strokeWidth="2" fill="none" strokeLinecap="round" />
        <g className="animate-wave" style={{ transformOrigin: "218px 192px" }}>
          <path d="M196 218 Q215 208 222 196" stroke="#fde68a" strokeWidth="14" strokeLinecap="round" fill="none" />
          <line x1="226" y1="187" x2="240" y2="168" stroke="#92400e" strokeWidth="3" strokeLinecap="round" />
          <ellipse cx="242" cy="165" rx="5" ry="8" fill="#259a43" transform="rotate(-35 242 165)" />
        </g>
      </g>
      <rect x="60" y="270" width="30" height="30" rx="5" fill="#fbbf24" className="animate-float" />
      <rect x="94" y="278" width="22" height="22" rx="4" fill="#f472b6" className="animate-float" style={{ animationDelay: ".3s" }} />
      <rect x="258" y="272" width="26" height="26" rx="5" fill="#60a5fa" className="animate-float" style={{ animationDelay: ".6s" }} />
    </svg>
  );
}

export function SceneSensory() {
  return (
    <svg viewBox="0 0 480 320" className="w-full block">
      <rect width="480" height="320" fill="#f0fdf4" />
      <rect width="480" height="120" y="200" fill="#dcfce7" />
      <rect x="340" y="30" width="100" height="110" rx="8" fill="#bae6fd" />
      <line x1="390" y1="30" x2="390" y2="140" stroke="#93c5fd" strokeWidth="1.5" />
      <line x1="340" y1="85" x2="440" y2="85" stroke="#93c5fd" strokeWidth="1.5" />
      <circle cx="370" cy="55" r="14" fill="#fde68a" opacity=".8" />
      <rect x="20" y="40" width="90" height="180" rx="6" fill="#e5e7eb" />
      <rect x="28" y="60" width="74" height="8" rx="3" fill="#fbbf24" opacity=".7" />
      <rect x="28" y="100" width="74" height="8" rx="3" fill="#f472b6" opacity=".6" />
      <rect x="28" y="140" width="74" height="8" rx="3" fill="#60a5fa" opacity=".6" />
      <ellipse cx="230" cy="288" rx="160" ry="24" fill="#bbf7d0" opacity=".5" />
      <circle cx="230" cy="288" r="50" fill="none" stroke="#86efac" strokeWidth="3" />
      <circle cx="270" cy="275" r="18" fill="#fbbf24" opacity=".8" />
      <circle cx="310" cy="282" r="14" fill="#f472b6" opacity=".75" />
      <circle cx="346" cy="272" r="16" fill="#60a5fa" opacity=".75" />
    </svg>
  );
}
