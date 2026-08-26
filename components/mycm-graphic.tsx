export function MyCmGraphic({ className }: { className?: string }) {
  const cases = [
    { id: "Case #4821", title: "Harassment report", tag: "Open", active: true },
    { id: "Case #4820", title: "Conflict of interest", tag: "Review", active: false },
    { id: "Case #4817", title: "Expense policy breach", tag: "Open", active: false },
    { id: "Case #4814", title: "Data handling concern", tag: "Closed", active: false },
  ]

  const summary = [
    {
      heading: "What happened",
      lines: [
        "Employee reported repeated",
        "unwelcome comments from a",
        "senior team member.",
      ],
    },
    {
      heading: "Key facts",
      lines: ["3 witnesses named · 2 emails", "attached · incident on Apr 3."],
    },
    {
      heading: "Current status",
      lines: ["Under investigation. HR", "interview scheduled Apr 12."],
    },
  ]

  return (
    <svg
      viewBox="0 0 520 452"
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
          <stop offset="50%" stopColor="var(--gradient-via)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="var(--gradient-to)" stopOpacity="0" />
        </linearGradient>
        <clipPath id="ethel-window">
          <rect x="16" y="16" width="488" height="420" rx="18" />
        </clipPath>
      </defs>

      {/* ambient glow blobs behind the window */}
      <circle cx="430" cy="70" r="90" fill="var(--gradient-to)" opacity="0.18" />
      <circle cx="70" cy="390" r="80" fill="var(--gradient-from)" opacity="0.18" />

      <g clipPath="url(#ethel-window)" fontFamily="var(--font-sans, sans-serif)">
        <rect x="16" y="16" width="488" height="420" rx="18" fill="var(--card)" />

        {/* browser chrome */}
        <rect x="16" y="16" width="488" height="40" fill="var(--secondary)" />
        <circle cx="40" cy="36" r="5" fill="var(--destructive)" opacity="0.7" />
        <circle cx="58" cy="36" r="5" fill="var(--brand-pink)" opacity="0.8" />
        <circle cx="76" cy="36" r="5" fill="var(--accent)" opacity="0.7" />
        <rect x="150" y="27" width="230" height="18" rx="9" fill="var(--background)" opacity="0.6" />
        <text x="166" y="40" fontSize="10" fill="var(--muted-foreground)">
          app.mycm.com / cases
        </text>

        {/* ---------- left: case list ---------- */}
        <rect x="16" y="56" width="196" height="380" fill="var(--background)" opacity="0.35" />
        <text x="34" y="84" fontSize="11" fontWeight="700" fill="var(--muted-foreground)" letterSpacing="1.5">
          CASES
        </text>
        {cases.map((c, i) => {
          const y = 98 + i * 62
          return (
            <g key={c.id}>
              <rect
                x="28"
                y={y}
                width="170"
                height="50"
                rx="10"
                fill={c.active ? "var(--brand-pink)" : "var(--card)"}
                opacity={c.active ? 0.14 : 0.9}
                stroke={c.active ? "url(#ethel-grad)" : "var(--border)"}
                strokeWidth={c.active ? 1.5 : 1}
              />
              <circle cx="48" cy={y + 20} r="9" fill="url(#ethel-grad)" opacity={c.active ? 1 : 0.45} />
              <text x="66" y={y + 19} fontSize="10" fontWeight="600" fill="var(--foreground)" opacity={c.active ? 1 : 0.75}>
                {c.id}
              </text>
              <text x="66" y={y + 34} fontSize="9" fill="var(--muted-foreground)">
                {c.title}
              </text>
              <rect
                x={c.active ? 150 : 154}
                y={y + 8}
                width={c.active ? 40 : 36}
                height="15"
                rx="7.5"
                fill="var(--brand-pink)"
                opacity={c.active ? 0.9 : 0.25}
              />
              <text
                x={c.active ? 170 : 172}
                y={y + 19}
                fontSize="8"
                fontWeight="600"
                textAnchor="middle"
                fill={c.active ? "var(--primary-foreground)" : "var(--foreground)"}
                opacity={c.active ? 1 : 0.7}
              >
                {c.tag}
              </text>
            </g>
          )
        })}

        {/* ---------- right: Ethel summary panel ---------- */}
        <rect x="212" y="56" width="292" height="380" fill="var(--card)" />
        <rect x="212" y="56" width="292" height="130" fill="url(#ethel-grad)" opacity="0.07" />

        {/* Ethel header */}
        <rect x="236" y="78" width="28" height="28" rx="9" fill="url(#ethel-grad)" opacity="0.22" />
        <path
          d="M250 86l1.7 3.6 3.9.4-2.9 2.7.9 3.8-3.5-2-3.5 2 .9-3.8-2.9-2.7 3.9-.4z"
          fill="url(#ethel-grad)"
        />
        <text x="274" y="90" fontSize="12" fontWeight="700" fill="var(--foreground)">
          AI Case Summary
        </text>
        <text x="274" y="103" fontSize="9" fill="var(--muted-foreground)">
          Generated by Ethel · Case #4821
        </text>
        <rect x="430" y="80" width="52" height="20" rx="10" fill="var(--brand-pink)" opacity="0.14" />
        <text x="456" y="94" textAnchor="middle" fontFamily="var(--font-mono, monospace)" fontSize="11" fill="var(--brand-pink)">
          28.4s
        </text>

        {/* summary sections with real copy */}
        {summary.map((s, si) => {
          const y = 132 + si * 92
          return (
            <g key={s.heading}>
              <rect x="236" y={y} width="11" height="11" rx="3" fill="url(#ethel-grad)" />
              <text x="254" y={y + 10} fontSize="11" fontWeight="700" fill="var(--brand-pink)">
                {s.heading}
              </text>
              {s.lines.map((line, li) => (
                <text
                  key={li}
                  x="236"
                  y={y + 30 + li * 16}
                  fontSize="10.5"
                  fill="var(--foreground)"
                  opacity="0.72"
                >
                  {line}
                </text>
              ))}
            </g>
          )
        })}

        {/* done footer */}
        <line x1="236" y1="410" x2="482" y2="410" stroke="var(--border)" strokeWidth="1" />
        <circle cx="244" cy="426" r="8" fill="var(--brand-pink)" opacity="0.18" />
        <path
          d="M241 426l2 2 4-4"
          stroke="var(--brand-pink)"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text x="258" y="430" fontSize="10" fontWeight="500" fill="var(--foreground)" opacity="0.75">
          Audit-aware summary ready
        </text>
      </g>

      {/* window border + top sheen */}
      <rect x="16" y="16" width="488" height="420" rx="18" fill="none" stroke="var(--border)" strokeWidth="1" />
      <rect x="16" y="16" width="488" height="1.5" fill="url(#ethel-sheen)" />
    </svg>
  )
}
