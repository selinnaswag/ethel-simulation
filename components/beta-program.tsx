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

/** Ethel Global — cross-case reasoning as a small network of linked cases. */
function NetworkGraphic() {
  const nodes = [
    { x: 62, y: 44 },
    { x: 40, y: 118 },
    { x: 130, y: 132 },
    { x: 250, y: 40 },
    { x: 300, y: 104 },
    { x: 214, y: 128 },
  ]
  const cx = 170
  const cy = 88
  return (
    <svg
      viewBox="0 0 340 176"
      className="h-full w-full"
      role="img"
      aria-label="A central case linked to similar cases across the organization"
    >
      <rect x="4" y="4" width="332" height="168" rx="12" fill="var(--card)" stroke="var(--border)" />
      {/* links */}
      {nodes.map((n, i) => (
        <line
          key={i}
          x1={cx}
          y1={cy}
          x2={n.x}
          y2={n.y}
          stroke="var(--brand-teal)"
          strokeWidth="1.2"
          opacity="0.45"
          strokeDasharray="3 3"
        />
      ))}
      {/* satellite nodes */}
      {nodes.map((n, i) => (
        <g key={`n-${i}`}>
          <circle cx={n.x} cy={n.y} r="12" fill="var(--brand-blue)" opacity="0.14" />
          <circle cx={n.x} cy={n.y} r="6" fill="var(--brand-blue)" opacity="0.55" />
        </g>
      ))}
      {/* central case */}
      <circle cx={cx} cy={cy} r="26" fill="var(--brand-teal)" opacity="0.16" />
      <circle cx={cx} cy={cy} r="16" fill="var(--brand-teal)" />
      <text x={cx} y={cy + 3.5} fontSize="9" fontWeight="700" fill="var(--primary-foreground)" textAnchor="middle">
        case
      </text>
      {/* match badge */}
      <rect x="232" y="12" width="96" height="18" rx="9" fill="var(--background)" stroke="var(--border)" />
      <circle cx="245" cy="21" r="3" fill="var(--brand-teal)" />
      <text x="254" y="24.5" fontSize="8" fontFamily="monospace" fill="var(--muted-foreground)">
        6 similar found
      </text>
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

function LeadTile({
  tone,
  icon: Icon,
  name,
  desc,
  chips,
  features,
  className,
}: {
  tone: "blue" | "teal"
  icon: typeof Search
  name: string
  desc: string
  chips: string[]
  features: string[]
  className?: string
}) {
  const accent = tone === "blue" ? "text-brand-blue" : "text-brand-teal"
  const chipAccent = tone === "blue" ? "text-brand-teal" : "text-brand-blue"
  const border = tone === "blue" ? "border-brand-blue/40" : "border-brand-teal/40"
  const wash =
    tone === "blue" ? "from-brand-blue/[0.1] to-transparent" : "from-brand-teal/[0.1] to-transparent"
  return (
    <div
      className={`flex flex-col overflow-hidden rounded-2xl border ${border} bg-gradient-to-br ${wash} p-5 ${className ?? ""}`}
    >
      <div className="flex items-center gap-2">
        <span
          className={`flex size-8 items-center justify-center rounded-lg ${
            tone === "blue" ? "bg-brand-blue/15" : "bg-brand-teal/15"
          }`}
        >
          <Icon className={`size-4 ${accent}`} />
        </span>
        <h3 className="text-base font-semibold text-foreground">{name}</h3>
      </div>
      <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{desc}</p>

      {/* feature checklist fills the tile */}
      <ul className="my-3 min-h-0 flex-1 space-y-2 pt-1">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-[12.5px] leading-snug text-foreground">
            <Check className={`mt-0.5 size-3.5 shrink-0 ${accent}`} />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
        {chips.map((c) => (
          <span key={c} className={`text-[11px] font-medium ${chipAccent}`}>
            {c}
          </span>
        ))}
        <WatchDemoButton
          className={`btn-anim ml-auto inline-flex items-center gap-1 text-[13px] font-semibold hover:gap-2 ${accent}`}
        >
          <PlayCircle className="size-3.5" />
          See it
        </WatchDemoButton>
      </div>
    </div>
  )
}

/** A floating window-chrome console that holds a software graphic. */
function FloatingConsole({
  tone,
  label,
  tilt,
  graphic,
  className,
}: {
  tone: "blue" | "teal"
  label: string
  tilt: string
  graphic: React.ReactNode
  className?: string
}) {
  const dot = tone === "blue" ? "bg-brand-blue" : "bg-brand-teal"
  return (
    <div
      className={`animate-float overflow-hidden rounded-xl border border-border bg-card/95 shadow-2xl ring-1 ring-black/5 backdrop-blur ${tilt} ${className ?? ""}`}
    >
      {/* title bar */}
      <div className="flex items-center gap-2 border-b border-border/70 bg-secondary/50 px-3 py-1.5">
        <span className="flex items-center gap-1">
          <span className="size-2 rounded-full bg-destructive/60" />
          <span className="size-2 rounded-full bg-brand-pink/60" />
          <span className="size-2 rounded-full bg-brand-teal/60" />
        </span>
        <span className="ml-1 font-mono text-[10px] text-muted-foreground">{label}</span>
        <span className="ml-auto flex items-center gap-1 font-mono text-[9px] text-muted-foreground">
          <span className={`size-1.5 rounded-full ${dot} animate-pulse-ring`} />
          live
        </span>
      </div>
      {/* graphic body */}
      <div className="p-2 [&_svg]:!h-auto [&_svg]:!w-full">{graphic}</div>
    </div>
  )
}

function MiniTile({
  icon: Icon,
  tone,
  title,
  body,
  graphic,
}: {
  icon: typeof Search
  tone: "blue" | "teal" | "pink"
  title: string
  body: string
  graphic: React.ReactNode
}) {
  const accent =
    tone === "blue" ? "text-brand-blue" : tone === "teal" ? "text-brand-teal" : "text-brand-pink"
  const bg =
    tone === "blue" ? "bg-brand-blue/15" : tone === "teal" ? "bg-brand-teal/15" : "bg-brand-pink/15"
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card/60 p-4 backdrop-blur">
      <div className="flex items-center gap-2">
        <span className={`flex size-7 items-center justify-center rounded-lg ${bg}`}>
          <Icon className={`size-3.5 ${accent}`} />
        </span>
        <p className="text-[13px] font-semibold text-foreground">{title}</p>
      </div>
      <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">{body}</p>
      <div className="mt-auto h-[52px] pt-2">{graphic}</div>
    </div>
  )
}

function BentoGrid() {
  return (
    <div className="grid gap-3 md:h-[404px] md:grid-cols-4 md:grid-rows-2">
      {/* Insights lead — feature checklist */}
      <LeadTile
        className="md:col-span-2 md:row-span-2"
        tone="blue"
        icon={Search}
        name="Ethel Insights"
        desc="An AI analyst for case data — ask plain-language questions across an entire EcoReports dataset."
        chips={["Plain-language", "Source-cited"]}
        features={[
          "Query the underlying dataset directly — no report-building required",
          "Every answer cites its case IDs and source documents",
          "Works in any submission language",
        ]}
      />

      {/* Global lead — feature checklist */}
      <LeadTile
        className="md:col-span-2 md:row-span-2"
        tone="teal"
        icon={Globe}
        name="Ethel Global"
        desc="Reasoning across every case — query your whole org within permission scope."
        chips={["Org-wide", "Cross-case"]}
        features={[
          "Surface similar cases and connections from anywhere",
          "Trends and comparisons across the whole organization",
          "Generate multi-case briefs in seconds",
        ]}
      />

      {/* CTA tile */}
      <div className="flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-gradient-from/20 via-gradient-via/15 to-gradient-to/20 p-5 md:col-span-2">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-blue/30 bg-background/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-brand-blue">
            <Sparkles className="size-3" />
            Private beta
          </span>
          <p className="mt-3 text-pretty text-[15px] font-semibold leading-snug text-foreground">
            Two new superpowers, layered on top of case summaries.
          </p>
        </div>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <JoinBetaButton
            count={20}
            className="btn-anim btn-anim-primary inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to px-4 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            <Sparkles className="size-4" />
            Join the beta
          </JoinBetaButton>
          <WatchDemoButton className="btn-anim inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-card/70 px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-card">
            <PlayCircle className="size-4 text-brand-teal" />
            Demo
          </WatchDemoButton>
        </div>
      </div>

      {/* Pattern radar mini tile */}
      <MiniTile
        icon={Radar}
        tone="pink"
        title="Pattern radar"
        body="Category spikes and anomalies flagged automatically."
        graphic={<SpikeGraphic />}
      />

      {/* Document export mini tile */}
      <MiniTile
        icon={FileDown}
        tone="blue"
        title="Document export"
        body="Word, Excel, PDF & PowerPoint — with custom columns."
        graphic={<ExportGraphic />}
      />
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

        <div className="relative mx-auto max-w-6xl px-5 py-9">
          {/* header */}
          <div className="mx-auto mb-5 max-w-2xl text-center">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-blue/30 bg-brand-blue/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-blue">
              <Sparkles className="size-3.5" />
              Private beta
            </span>
            <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">
              Get early access to <span className="text-gradient">what&apos;s next</span> for Ethel
            </h2>
          </div>

          {/* mobile: consoles stacked above the grid */}
          <div className="mb-4 grid gap-3 sm:grid-cols-2 md:hidden">
            <FloatingConsole
              tone="blue"
              label="ethel · insights"
              tilt=""
              graphic={<ConsoleGraphic />}
            />
            <FloatingConsole
              tone="teal"
              label="ethel · global"
              tilt=""
              graphic={<NetworkGraphic />}
            />
          </div>

          {/* desktop: consoles float above, overlapping the grid's top edge */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-x-0 top-0 z-20 hidden items-start justify-between px-4 md:flex lg:px-10">
              <FloatingConsole
                tone="blue"
                label="ethel · insights"
                tilt="-rotate-2 hover:rotate-0"
                graphic={<ConsoleGraphic />}
                className="pointer-events-auto w-[300px] transition-transform duration-500"
              />
              <FloatingConsole
                tone="teal"
                label="ethel · global"
                tilt="rotate-2 hover:rotate-0"
                graphic={<NetworkGraphic />}
                className="pointer-events-auto w-[300px] transition-transform duration-500"
              />
            </div>

            <div className="md:pt-[168px]">
              <BentoGrid />
            </div>
          </div>
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
