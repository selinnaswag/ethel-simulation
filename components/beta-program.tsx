"use client"

import type React from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import {
  Sparkles,
  Search,
  Radar,
  Globe,
  FileDown,
  ArrowRight,
  X,
  Check,
  PlayCircle,
} from "lucide-react"
import { BetaDemoModal, WatchDemoButton } from "@/components/beta-demo"

const OPEN_EVENT = "ethel:open-beta"

const starColors = ["var(--brand-blue)", "var(--brand-teal)", "var(--brand-pink)"]

type Burst = { id: number }

/** Fires a short-lived cluster of star particles from its center. */
function useStarBurst() {
  const [bursts, setBursts] = useState<Burst[]>([])
  const fire = useCallback(() => {
    const id = Date.now() + Math.random()
    setBursts((b) => [...b, { id }])
    window.setTimeout(() => {
      setBursts((b) => b.filter((x) => x.id !== id))
    }, 950)
  }, [])
  return { bursts, fire }
}

function StarField({ bursts, count = 16 }: { bursts: Burst[]; count?: number }) {
  return (
    <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 z-20">
      {bursts.map((burst) => (
        <span key={burst.id} className="absolute left-0 top-0">
          {Array.from({ length: count }).map((_, i) => {
            const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5
            const dist = 42 + Math.random() * 46
            const dx = Math.cos(angle) * dist
            const dy = Math.sin(angle) * dist
            return (
              <span
                key={i}
                className="ethel-star"
                style={
                  {
                    "--dx": `${dx}px`,
                    "--dy": `${dy}px`,
                    "--rot": `${Math.random() * 420 - 210}deg`,
                    background: starColors[i % starColors.length],
                    animationDelay: `${Math.random() * 0.06}s`,
                  } as React.CSSProperties
                }
              />
            )
          })}
        </span>
      ))}
    </span>
  )
}

/** Reusable "join the beta" button — bursts stars on click and opens the signup modal. */
export function JoinBetaButton({
  className,
  children,
  count,
}: {
  className?: string
  children: React.ReactNode
  count?: number
}) {
  const { bursts, fire } = useStarBurst()
  return (
    <button
      type="button"
      onClick={() => {
        fire()
        window.dispatchEvent(new CustomEvent(OPEN_EVENT))
      }}
      className={`relative ${className ?? ""}`}
    >
      {children}
      <StarField bursts={bursts} count={count} />
    </button>
  )
}

/* ------------------------------------------------------------------ */
/* Hard-coded software / console SVG graphics                          */
/* ------------------------------------------------------------------ */

/** Ethel Insights — a plain-language query returning a source-cited answer. */
function ConsoleGraphic() {
  return (
    <svg
      viewBox="0 0 340 176"
      className="h-full w-full"
      role="img"
      aria-label="Ethel answering a plain-language question with cited case IDs"
    >
      {/* window */}
      <rect x="4" y="4" width="332" height="168" rx="12" fill="var(--card)" stroke="var(--border)" />
      {/* title bar */}
      <rect x="4" y="4" width="332" height="26" rx="12" fill="var(--secondary)" />
      <rect x="4" y="18" width="332" height="12" fill="var(--secondary)" />
      <circle cx="20" cy="17" r="3.5" fill="var(--destructive)" opacity="0.7" />
      <circle cx="32" cy="17" r="3.5" fill="var(--brand-pink)" opacity="0.7" />
      <circle cx="44" cy="17" r="3.5" fill="var(--brand-teal)" opacity="0.7" />
      <text x="60" y="21" fontSize="9" fontFamily="monospace" fill="var(--muted-foreground)">
        EcoReports · ask the dataset
      </text>
      <line x1="4" y1="30" x2="336" y2="30" stroke="var(--border)" />

      {/* user query bubble (right) */}
      <rect x="150" y="42" width="176" height="26" rx="9" fill="var(--brand-blue)" opacity="0.16" />
      <text x="164" y="59" fontSize="10" fill="var(--foreground)">
        Which categories spiked in Q3?
      </text>

      {/* answer bubble (left) */}
      <rect x="14" y="78" width="234" height="52" rx="9" fill="var(--background)" stroke="var(--border)" />
      <text x="26" y="97" fontSize="10" fill="var(--foreground)">
        Retaliation reports rose
      </text>
      <text x="146" y="97" fontSize="10" fontWeight="700" fill="var(--brand-teal)">
        +41%
      </text>
      <text x="26" y="111" fontSize="10" fill="var(--foreground)">
        across Dallas and LA.
      </text>
      {/* citation chips */}
      {["CS-4471", "CS-4488", "CS-4502"].map((id, i) => (
        <g key={id}>
          <rect
            x={26 + i * 62}
            y="118"
            width="56"
            height="14"
            rx="4"
            fill="var(--brand-teal)"
            opacity="0.12"
          />
          <text
            x={54 + i * 62}
            y="128"
            fontSize="8"
            fontFamily="monospace"
            fill="var(--brand-teal)"
            textAnchor="middle"
          >
            {id}
          </text>
        </g>
      ))}

      {/* input row */}
      <rect x="14" y="142" width="312" height="22" rx="11" fill="var(--background)" stroke="var(--border)" />
      <text x="26" y="156" fontSize="9" fill="var(--muted-foreground)">
        Ask anything about this dataset…
      </text>
      <circle cx="315" cy="153" r="8" fill="var(--brand-blue)" />
      <path d="M312 153 h6 M315.5 150.5 l3 2.5 -3 2.5" stroke="var(--primary-foreground)" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Ethel Global — an org-wide cross-case query console with a ranked match list. */
function NetworkGraphic() {
  const rows = [
    { id: "CS-4471", loc: "Dallas, US", pct: 96 },
    { id: "CS-2210", loc: "London, UK", pct: 91 },
    { id: "CS-8834", loc: "Toronto, CA", pct: 84 },
  ]
  const barX = 176
  const barW = 96
  return (
    <svg
      viewBox="0 0 340 176"
      className="h-full w-full"
      role="img"
      aria-label="Ethel Global querying every case across the organization and ranking matches by region"
    >
      {/* window */}
      <rect x="4" y="4" width="332" height="168" rx="12" fill="var(--card)" stroke="var(--border)" />
      {/* title bar */}
      <rect x="4" y="4" width="332" height="26" rx="12" fill="var(--secondary)" />
      <rect x="4" y="18" width="332" height="12" fill="var(--secondary)" />
      <circle cx="20" cy="17" r="3.5" fill="var(--destructive)" opacity="0.7" />
      <circle cx="32" cy="17" r="3.5" fill="var(--brand-pink)" opacity="0.7" />
      <circle cx="44" cy="17" r="3.5" fill="var(--brand-teal)" opacity="0.7" />
      <text x="60" y="21" fontSize="9" fontFamily="monospace" fill="var(--muted-foreground)">
        Ethel Global · all cases
      </text>
      <line x1="4" y1="30" x2="336" y2="30" stroke="var(--border)" />

      {/* query bar with globe glyph + scope pill */}
      <rect x="14" y="40" width="312" height="24" rx="12" fill="var(--background)" stroke="var(--border)" />
      <circle cx="28" cy="52" r="6.5" fill="none" stroke="var(--brand-teal)" strokeWidth="1.2" />
      <path d="M21.5 52 h13 M28 45.5 c3 3 3 10 0 13 c-3 -3 -3 -10 0 -13" stroke="var(--brand-teal)" strokeWidth="1" fill="none" />
      <text x="42" y="55.5" fontSize="9.5" fill="var(--foreground)">
        Where else has this vendor appeared?
      </text>
      <rect x="250" y="45" width="70" height="14" rx="7" fill="var(--brand-teal)" opacity="0.14" />
      <text x="285" y="55" fontSize="7.5" fontFamily="monospace" fill="var(--brand-teal)" textAnchor="middle">
        ALL REGIONS
      </text>

      {/* results header */}
      <text x="16" y="80" fontSize="8" fontFamily="monospace" fill="var(--muted-foreground)">
        RELATED CASES · 3 REGIONS
      </text>

      {/* ranked match rows */}
      {rows.map((r, i) => {
        const y = 88 + i * 26
        return (
          <g key={r.id}>
            <rect x="14" y={y} width="312" height="22" rx="6" fill="var(--background)" stroke="var(--border)" />
            <circle cx="26" cy={y + 11} r="3" fill="var(--brand-blue)" />
            <text x="36" y={y + 14} fontSize="9" fontFamily="monospace" fontWeight="700" fill="var(--foreground)">
              {r.id}
            </text>
            <text x="88" y={y + 14} fontSize="8.5" fill="var(--muted-foreground)">
              {r.loc}
            </text>
            {/* match bar */}
            <rect x={barX} y={y + 7.5} width={barW} height="7" rx="3.5" fill="var(--muted)" opacity="0.5" />
            <rect x={barX} y={y + 7.5} width={(barW * r.pct) / 100} height="7" rx="3.5" fill="var(--brand-teal)" />
            <text x="320" y={y + 14} fontSize="8.5" fontFamily="monospace" fontWeight="700" fill="var(--brand-teal)" textAnchor="end">
              {r.pct}%
            </text>
          </g>
        )
      })}
    </svg>
  )
}

/** Pattern radar — a bar series with one auto-flagged spike. */
function SpikeGraphic() {
  const bars = [10, 14, 12, 16, 13, 30, 15]
  return (
    <svg viewBox="0 0 132 76" className="h-full w-full" role="img" aria-label="Category spike flagged automatically">
      {bars.map((h, i) => {
        const spike = h === 30
        return (
          <rect
            key={i}
            x={8 + i * 17}
            y={66 - h}
            width="11"
            height={h}
            rx="2"
            fill={spike ? "var(--brand-pink)" : "var(--brand-blue)"}
            opacity={spike ? 1 : 0.35}
          />
        )
      })}
      <line x1="6" y1="66" x2="126" y2="66" stroke="var(--border)" />
      {/* flag on the spike */}
      <circle cx="107.5" cy="30" r="6" fill="var(--brand-pink)" opacity="0.2" />
      <path d="M105 27 v8 M105 27 h5 l-1.5 2 1.5 2 h-5" stroke="var(--brand-pink)" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Document export — stacked pages exporting to file formats. */
function ExportGraphic() {
  return (
    <svg viewBox="0 0 132 76" className="h-full w-full" role="img" aria-label="Generated document exporting to Word, Excel and PDF">
      {/* back page */}
      <rect x="20" y="10" width="42" height="54" rx="4" fill="var(--secondary)" stroke="var(--border)" />
      {/* front page */}
      <rect x="12" y="16" width="42" height="54" rx="4" fill="var(--background)" stroke="var(--border)" />
      {[26, 32, 38, 44, 50].map((y) => (
        <line key={y} x1="19" y1={y} x2="47" y2={y} stroke="var(--muted-foreground)" strokeWidth="1.4" opacity="0.4" />
      ))}
      <line x1="19" y1="56" x2="38" y2="56" stroke="var(--brand-teal)" strokeWidth="1.6" />
      {/* format chips */}
      {[
        { t: "DOCX", c: "var(--brand-blue)", y: 16 },
        { t: "XLSX", c: "var(--brand-teal)", y: 34 },
        { t: "PDF", c: "var(--brand-pink)", y: 52 },
      ].map((f) => (
        <g key={f.t}>
          <rect x="80" y={f.y} width="42" height="15" rx="4" fill={f.c} opacity="0.14" />
          <text x="101" y={f.y + 10.5} fontSize="8" fontFamily="monospace" fill={f.c} textAnchor="middle">
            {f.t}
          </text>
        </g>
      ))}
      {/* arrow */}
      <path d="M60 43 h14 M70 39 l5 4 -5 4" stroke="var(--muted-foreground)" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Bento grid — everything on one screen, no empty cells               */
/* ------------------------------------------------------------------ */

/** A full-width product row: console graphic on one side, content on the other. */
function ProductCard({
  variant,
  icon: Icon,
  eyebrow,
  name,
  tagline,
  features,
  graphic,
  reverse,
}: {
  variant: "glass" | "filled"
  icon: typeof Search
  eyebrow: string
  name: string
  tagline: string
  features: string[]
  graphic: React.ReactNode
  reverse?: boolean
}) {
  const filled = variant === "filled"
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border p-6 sm:p-8 ${
        filled
          ? "border-transparent text-primary-foreground shadow-xl"
          : "border-border bg-card/70 backdrop-blur"
      }`}
    >
      {filled && (
        <>
          {/* animated gradient wave base */}
          <div
            aria-hidden="true"
            className="animate-wave pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,color-mix(in_oklch,var(--brand-teal)_92%,black_8%),color-mix(in_oklch,var(--brand-blue)_86%,black_12%),color-mix(in_oklch,var(--brand-teal)_88%,black_6%))]"
          />
          {/* floating color blobs */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            <span
              className="animate-blob absolute -left-10 top-2 size-40 rounded-full bg-brand-teal opacity-40 blur-2xl"
              style={{ "--bx": "40px", "--by": "20px", "--bd": "13s" } as React.CSSProperties}
            />
            <span
              className="animate-blob absolute right-6 -top-8 size-36 rounded-full bg-brand-pink opacity-25 blur-2xl"
              style={{ "--bx": "-30px", "--by": "26px", "--bd": "16s" } as React.CSSProperties}
            />
            <span
              className="animate-blob absolute -bottom-10 right-1/3 size-44 rounded-full bg-brand-blue opacity-35 blur-2xl"
              style={{ "--bx": "24px", "--by": "-22px", "--bd": "11s" } as React.CSSProperties}
            />
          </div>
          {/* fine grid texture */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(var(--primary-foreground)_1px,transparent_1px),linear-gradient(90deg,var(--primary-foreground)_1px,transparent_1px)] [background-size:22px_22px]"
          />
        </>
      )}
      <div
        className={`relative flex flex-col gap-6 md:flex-row md:items-center md:gap-10 ${
          reverse ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* content */}
        <div className="md:flex-1">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest ${
              filled
                ? "bg-primary-foreground/15 text-primary-foreground"
                : "bg-brand-blue/10 text-brand-blue"
            }`}
          >
            {eyebrow}
          </span>
          <div className="mt-3 flex items-center gap-2.5">
            <span
              className={`flex size-9 items-center justify-center rounded-xl ${
                filled ? "bg-primary-foreground/20" : "bg-brand-blue/15"
              }`}
            >
              <Icon className={`size-5 ${filled ? "text-primary-foreground" : "text-brand-blue"}`} />
            </span>
            <h3 className="text-xl font-bold tracking-tight sm:text-2xl">{name}</h3>
          </div>
          <p
            className={`mt-2.5 max-w-md text-sm leading-relaxed ${
              filled ? "text-primary-foreground/85" : "text-muted-foreground"
            }`}
          >
            {tagline}
          </p>
          <ul className="mt-4 space-y-2.5">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-[13px] leading-snug">
                <span
                  className={`mt-px flex size-4 shrink-0 items-center justify-center rounded-full ${
                    filled ? "bg-primary-foreground/20" : "bg-brand-teal/15"
                  }`}
                >
                  <Check
                    className={`size-3 ${filled ? "text-primary-foreground" : "text-brand-teal"}`}
                  />
                </span>
                <span className={filled ? "text-primary-foreground/95" : "text-foreground/90"}>
                  {f}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* console graphic beside the content */}
        <div className="md:w-[44%] md:shrink-0">
          <div className="animate-float overflow-hidden rounded-xl shadow-2xl ring-1 ring-black/10 [&_svg]:block [&_svg]:h-auto [&_svg]:w-full">
            {graphic}
          </div>
        </div>
      </div>
    </div>
  )
}

/** A compact secondary-feature card with a small software graphic. */
function MiniTile({
  icon: Icon,
  tone,
  title,
  body,
  graphic,
}: {
  icon: typeof Search
  tone: "blue" | "pink"
  title: string
  body: string
  graphic: React.ReactNode
}) {
  const accent = tone === "blue" ? "text-brand-blue" : "text-brand-pink"
  const bg = tone === "blue" ? "bg-brand-blue/15" : "bg-brand-pink/15"
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-border bg-card/60 p-4 backdrop-blur">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className={`flex size-7 items-center justify-center rounded-lg ${bg}`}>
            <Icon className={`size-3.5 ${accent}`} />
          </span>
          <p className="text-sm font-semibold text-foreground">{title}</p>
        </div>
        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{body}</p>
      </div>
      <div className="w-24 shrink-0 [&_svg]:block [&_svg]:h-auto [&_svg]:w-full">{graphic}</div>
    </div>
  )
}

function BetaShowcase() {
  return (
    <div className="space-y-4">
      <ProductCard
        variant="glass"
        icon={Search}
        eyebrow="AI analyst for case data"
        name="Ethel Insights"
        tagline="Ask plain-language questions across an entire EcoReports dataset and get instant, source-cited answers — no report-building required."
        features={[
          "Query the underlying dataset directly, in plain language",
          "Every answer cites its case IDs and source documents",
          "Works in any submission language",
        ]}
        graphic={<ConsoleGraphic />}
      />

      <ProductCard
        variant="filled"
        icon={Globe}
        eyebrow="Cross-case reasoning"
        name="Ethel Global"
        tagline="Reason across every case in your organization, within permission scope — trends, comparisons, and connections from anywhere."
        features={[
          "Surface similar cases and connections org-wide",
          "Spot late-surfacing patterns and anomalies automatically",
          "Generate multi-case briefs in seconds",
        ]}
        graphic={<NetworkGraphic />}
        reverse
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <MiniTile
          icon={Radar}
          tone="pink"
          title="Pattern radar"
          body="Category spikes, location anomalies, and cross-case connections flagged automatically."
          graphic={<SpikeGraphic />}
        />
        <MiniTile
          icon={FileDown}
          tone="blue"
          title="Document export"
          body="Word, Excel, PDF & PowerPoint — with custom columns and preview before download."
          graphic={<ExportGraphic />}
        />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */

export function BetaProgram() {
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const { bursts, fire } = useStarBurst()
  const emailRef = useRef<HTMLInputElement>(null)

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    const onOpen = () => {
      setSubmitted(false)
      setOpen(true)
    }
    window.addEventListener(OPEN_EVENT, onOpen)
    return () => window.removeEventListener(OPEN_EVENT, onOpen)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close()
    window.addEventListener("keydown", onKey)
    const t = window.setTimeout(() => emailRef.current?.focus(), 120)
    return () => {
      window.removeEventListener("keydown", onKey)
      window.clearTimeout(t)
    }
  }, [open, close])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
    fire()
  }

  return (
    <section id="beta" className="scroll-mt-20 border-t border-border/60 bg-background">
      <div className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(ellipse_50%_60%_at_15%_0%,color-mix(in_oklch,var(--brand-blue)_16%,transparent),transparent_70%),radial-gradient(ellipse_50%_60%_at_85%_100%,color-mix(in_oklch,var(--brand-teal)_16%,transparent),transparent_70%)]"
        />

        <div className="relative mx-auto max-w-6xl px-5 py-14">
          {/* header */}
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-blue/30 bg-brand-blue/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-blue">
              <Sparkles className="size-3.5" />
              Private beta
            </span>
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Get early access to <span className="text-gradient">what&apos;s next</span> for Ethel
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-pretty text-sm leading-relaxed text-muted-foreground">
              Two new superpowers layered on top of case summaries — an AI analyst for your data and
              reasoning across every case in your organization.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <JoinBetaButton
                count={22}
                className="btn-anim btn-anim-primary inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to px-7 py-3.5 text-base font-semibold text-primary-foreground"
              >
                <Sparkles className="size-4" />
                Join the beta
              </JoinBetaButton>
              <WatchDemoButton className="btn-anim inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-7 py-3.5 text-base font-semibold text-foreground hover:bg-card">
                <PlayCircle className="size-5 text-brand-teal" />
                Watch the demo
              </WatchDemoButton>
            </div>
          </div>

          <BetaShowcase />
        </div>
      </div>

      {/* interactive product demo */}
      <BetaDemoModal />

      {/* signup modal */}
      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Join the Ethel beta"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={close}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-fade-up"
          />
          <div className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/50 animate-fade-up">
            <div className="h-1 w-full bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to" />
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="btn-anim absolute right-3 top-3 flex size-8 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <X className="size-4" />
            </button>

            {!submitted ? (
              <div className="p-7">
                <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-brand-blue/30 bg-brand-blue/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-brand-blue">
                  <Sparkles className="size-3" />
                  Private beta
                </span>
                <h3 className="text-xl font-bold tracking-tight text-foreground">
                  Request beta access
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  Tell us where to reach you and we&apos;ll get Ethel Insights & Global into your
                  workspace.
                </p>
                <form onSubmit={handleSubmit} className="mt-5 space-y-3">
                  <div>
                    <label htmlFor="beta-email" className="mb-1.5 block text-xs font-medium text-foreground">
                      Work email
                    </label>
                    <input
                      ref={emailRef}
                      id="beta-email"
                      type="email"
                      required
                      placeholder="you@company.com"
                      className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-brand-blue"
                    />
                  </div>
                  <div>
                    <label htmlFor="beta-org" className="mb-1.5 block text-xs font-medium text-foreground">
                      Organization
                    </label>
                    <input
                      id="beta-org"
                      type="text"
                      required
                      placeholder="Acme Compliance"
                      className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-brand-blue"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-anim btn-anim-primary relative mt-1 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to px-6 py-3 text-sm font-semibold text-primary-foreground"
                  >
                    Request access
                    <ArrowRight className="size-4" />
                  </button>
                </form>
              </div>
            ) : (
              <div className="relative p-9 text-center">
                <div className="relative mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-brand-teal/15">
                  <Check className="size-8 text-brand-teal" />
                  <StarField bursts={bursts} count={22} />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-foreground">You&apos;re on the list</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                  Thanks for your interest in the Ethel beta — we&apos;ll reach out with next steps
                  shortly.
                </p>
                <button
                  type="button"
                  onClick={close}
                  className="btn-anim mt-6 inline-flex items-center justify-center rounded-full border border-border px-6 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
