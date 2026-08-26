export function MyCmGraphic({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 520 440"
      role="img"
      aria-label="The myCM case workspace with Ethel generating a structured, audit-aware case summary beside the case list"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="ethel-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--gradient-from)" />
          <stop offset="50%" stopColor="var(--gradient-via)" />
          <stop offset="100%" stopColor="var(--gradient-to)" />
        </linearGradient>
        <linearGradient id="ethel-sheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--gradient-from)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--gradient-via)" stopOpacity="0.7" />
          <stop offset="100%" stopColor="var(--gradient-to)" stopOpacity="0" />
        </linearGradient>
        <clipPath id="ethel-window">
          <rect x="16" y="16" width="488" height="408" rx="18" />
        </clipPath>
      </defs>

      {/* ambient glow blobs behind the window */}
      <circle cx="430" cy="70" r="90" fill="var(--gradient-to)" opacity="0.18" />
      <circle cx="70" cy="380" r="80" fill="var(--gradient-from)" opacity="0.16" />

      {/* app window */}
      <g clipPath="url(#ethel-window)">
        <rect x="16" y="16" width="488" height="408" rx="18" fill="var(--card)" />

        {/* browser chrome */}
        <rect x="16" y="16" width="488" height="40" fill="var(--secondary)" />
        <circle cx="40" cy="36" r="5" fill="var(--destructive)" opacity="0.7" />
        <circle cx="58" cy="36" r="5" fill="var(--primary)" opacity="0.7" />
        <circle cx="76" cy="36" r="5" fill="var(--accent)" opacity="0.7" />
        <rect x="150" y="27" width="220" height="18" rx="9" fill="var(--background)" opacity="0.6" />
        <rect x="196" y="33" width="128" height="6" rx="3" fill="var(--muted-foreground)" opacity="0.5" />

        {/* left: case list */}
        <rect x="16" y="56" width="196" height="368" fill="var(--background)" opacity="0.35" />
        <rect x="34" y="78" width="70" height="8" rx="4" fill="var(--muted-foreground)" opacity="0.5" />
        {[0, 1, 2, 3, 4].map((i) => {
          const y = 104 + i * 58
          const active = i === 1
          return (
            <g key={i}>
              <rect
                x="30"
                y={y}
                width="168"
                height="46"
                rx="10"
                fill={active ? "var(--primary)" : "var(--card)"}
                opacity={active ? 0.14 : 0.9}
                stroke={active ? "url(#ethel-grad)" : "var(--border)"}
                strokeWidth={active ? 1.5 : 1}
              />
              <circle cx="48" cy={y + 16} r="6" fill="url(#ethel-grad)" opacity={active ? 1 : 0.4} />
              <rect x="62" y={y + 11} width="96" height="7" rx="3.5" fill="var(--foreground)" opacity={active ? 0.9 : 0.55} />
              <rect x="62" y={y + 26} width="60" height="6" rx="3" fill="var(--muted-foreground)" opacity="0.5" />
              <rect x="168" y={y + 10} width="22" height="9" rx="4.5" fill="var(--primary)" opacity={active ? 0.9 : 0.35} />
            </g>
          )
        })}

        {/* right: Ethel summary panel */}
        <rect x="212" y="56" width="292" height="368" fill="var(--card)" />
        {/* subtle gradient wash at top of panel */}
        <rect x="212" y="56" width="292" height="120" fill="url(#ethel-grad)" opacity="0.06" />

        {/* Ethel header */}
        <rect x="236" y="80" width="26" height="26" rx="8" fill="url(#ethel-grad)" opacity="0.22" />
        <path
          d="M249 88.5l1.6 3.4 3.6.4-2.7 2.5.8 3.6-3.3-1.9-3.3 1.9.8-3.6-2.7-2.5 3.6-.4z"
          fill="url(#ethel-grad)"
        />
        <rect x="272" y="86" width="56" height="9" rx="4.5" fill="var(--foreground)" opacity="0.9" />
        <rect x="410" y="84" width="70" height="20" rx="10" fill="var(--primary)" opacity="0.12" />
        <text
          x="445"
          y="98"
          textAnchor="middle"
          fontFamily="var(--font-mono, monospace)"
          fontSize="11"
          fill="var(--primary)"
        >
          28.4s
        </text>

        {/* summary blocks */}
        {[
          { y: 128, label: 62, lines: [268, 240, 210] },
          { y: 214, label: 78, lines: [258, 226] },
          { y: 292, label: 54, lines: [264, 244, 196] },
        ].map((block, bi) => (
          <g key={bi}>
            <rect x="236" y={block.y} width="10" height="10" rx="2" fill="url(#ethel-grad)" />
            <rect x="252" y={block.y + 1} width={block.label} height="8" rx="4" fill="var(--primary)" opacity="0.85" />
            {block.lines.map((w, li) => (
              <rect
                key={li}
                x="236"
                y={block.y + 22 + li * 16}
                width={w}
                height="7"
                rx="3.5"
                fill="var(--foreground)"
                opacity="0.4"
              />
            ))}
          </g>
        ))}

        {/* done footer */}
        <line x1="236" y1="382" x2="480" y2="382" stroke="var(--border)" strokeWidth="1" />
        <circle cx="243" cy="400" r="7" fill="var(--primary)" opacity="0.18" />
        <path
          d="M240 400l2 2 4-4"
          stroke="var(--primary)"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="256" y="396" width="150" height="8" rx="4" fill="var(--primary)" opacity="0.6" />
      </g>

      {/* window border + top sheen */}
      <rect x="16" y="16" width="488" height="408" rx="18" fill="none" stroke="var(--border)" strokeWidth="1" />
      <rect x="16" y="16" width="488" height="1.5" fill="url(#ethel-sheen)" />
    </svg>
  )
}
