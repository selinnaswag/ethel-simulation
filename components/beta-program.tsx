"use client"

import type React from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import { Sparkles, Search, Globe, ArrowRight, X, Check, PlayCircle } from "lucide-react"
import { BetaDemoModal, WatchDemoButton } from "@/components/beta-demo"
import { UseCasesModal, ViewUseCasesButton } from "@/components/beta-use-cases"

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

/** Ethel Global — the myCM workspace with an Ethel pop-up running a cross-case query. */
function NetworkGraphic() {
  const cases = [
    { id: "Case #4821", t: "Harassment", active: true },
    { id: "Case #4779", t: "Vendor fraud", active: false },
    { id: "Case #4712", t: "Conflict", active: false },
    { id: "Case #4680", t: "Expense", active: false },
  ]
  const matches = [
    { id: "CS-2210", loc: "London, UK", pct: 94 },
    { id: "CS-8834", loc: "Toronto, CA", pct: 88 },
    { id: "CS-1097", loc: "Berlin, DE", pct: 81 },
  ]
  const barX = 286
  const barW = 50
  return (
    <svg
      viewBox="0 0 400 300"
      className="h-full w-full"
      role="img"
      aria-label="The myCM case workspace with an Ethel pop-up querying similar cases across every region"
    >
      <defs>
        <linearGradient id="global-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--gradient-from)" />
          <stop offset="50%" stopColor="var(--gradient-via)" />
          <stop offset="100%" stopColor="var(--gradient-to)" />
        </linearGradient>
        <clipPath id="global-window">
          <rect x="6" y="6" width="388" height="288" rx="14" />
        </clipPath>
      </defs>

      <g clipPath="url(#global-window)" fontFamily="var(--font-sans, sans-serif)">
        {/* app surface */}
        <rect x="6" y="6" width="388" height="288" fill="var(--card)" />

        {/* browser chrome */}
        <rect x="6" y="6" width="388" height="30" fill="var(--secondary)" />
        <circle cx="24" cy="21" r="4" fill="var(--destructive)" opacity="0.7" />
        <circle cx="38" cy="21" r="4" fill="var(--brand-pink)" opacity="0.8" />
        <circle cx="52" cy="21" r="4" fill="var(--brand-teal)" opacity="0.7" />
        <rect x="120" y="13" width="180" height="16" rx="8" fill="var(--background)" opacity="0.6" />
        <text x="134" y="25" fontSize="8.5" fill="var(--muted-foreground)">
          app.mycm.com / cases
        </text>

        {/* left: case list */}
        <rect x="6" y="36" width="120" height="258" fill="var(--background)" opacity="0.4" />
        <text x="20" y="58" fontSize="8" fontWeight="700" letterSpacing="1.2" fill="var(--muted-foreground)">
          CASES
        </text>
        {cases.map((c, i) => {
          const y = 68 + i * 40
          return (
            <g key={c.id}>
              <rect
                x="16"
                y={y}
                width="100"
                height="32"
                rx="7"
                fill={c.active ? "var(--brand-pink)" : "var(--card)"}
                opacity={c.active ? 0.14 : 0.9}
                stroke={c.active ? "url(#global-grad)" : "var(--border)"}
                strokeWidth={c.active ? 1.4 : 1}
              />
              <circle cx="30" cy={y + 16} r="6" fill="url(#global-grad)" opacity={c.active ? 1 : 0.4} />
              <text x="42" y={y + 13} fontSize="7.5" fontWeight="600" fill="var(--foreground)" opacity={c.active ? 1 : 0.7}>
                {c.id}
              </text>
              <text x="42" y={y + 24} fontSize="7" fill="var(--muted-foreground)">
                {c.t}
              </text>
            </g>
          )
        })}

        {/* right: main case panel (dimmed behind the pop-up) */}
        <text x="140" y="58" fontSize="10" fontWeight="700" fill="var(--foreground)">
          Case #4821
        </text>
        <rect x="140" y="70" width="240" height="8" rx="4" fill="var(--muted)" opacity="0.5" />
        <rect x="140" y="84" width="210" height="8" rx="4" fill="var(--muted)" opacity="0.4" />
        <rect x="140" y="98" width="228" height="8" rx="4" fill="var(--muted)" opacity="0.35" />

        {/* dim overlay */}
        <rect x="6" y="36" width="388" height="258" fill="var(--background)" opacity="0.55" />

        {/* -------- Ethel pop-up dialog -------- */}
        <g>
          <rect x="128" y="70" width="256" height="196" rx="14" fill="var(--card)" stroke="url(#global-grad)" strokeWidth="1.4" />
          {/* pop-up header */}
          <rect x="128" y="70" width="256" height="34" rx="14" fill="url(#global-grad)" opacity="0.1" />
          <rect x="128" y="90" width="256" height="14" fill="var(--card)" />
          <circle cx="148" cy="88" r="9" fill="url(#global-grad)" opacity="0.22" />
          <path
            d="M148 82l1.4 3 3.2.3-2.4 2.1.7 3.1-2.9-1.6-2.9 1.6.7-3.1-2.4-2.1 3.2-.3z"
            fill="url(#global-grad)"
          />
          <text x="164" y="86" fontSize="9.5" fontWeight="700" fill="var(--foreground)">
            Ask Ethel Global
          </text>
          <text x="164" y="97" fontSize="7" fill="var(--muted-foreground)">
            Querying all cases · every region
          </text>
          <rect x="340" y="80" width="34" height="15" rx="7.5" fill="var(--brand-teal)" opacity="0.14" />
          <circle cx="350" cy="87.5" r="2.5" fill="var(--brand-teal)" />
          <text x="356" y="90.5" fontSize="6.5" fontFamily="monospace" fill="var(--brand-teal)">
            live
          </text>

          {/* the question */}
          <rect x="142" y="112" width="228" height="22" rx="11" fill="var(--background)" stroke="var(--border)" />
          <text x="154" y="126" fontSize="8.5" fill="var(--foreground)">
            Where else has this vendor appeared?
          </text>

          {/* results label */}
          <text x="144" y="150" fontSize="7" fontFamily="monospace" fill="var(--muted-foreground)">
            3 SIMILAR CASES FOUND
          </text>

          {/* match rows */}
          {matches.map((m, i) => {
            const y = 156 + i * 30
            return (
              <g key={m.id}>
                <rect x="142" y={y} width="228" height="24" rx="6" fill="var(--background)" stroke="var(--border)" />
                <circle cx="154" cy={y + 12} r="3" fill="var(--brand-blue)" />
                <text x="164" y={y + 15} fontSize="8" fontFamily="monospace" fontWeight="700" fill="var(--foreground)">
                  {m.id}
                </text>
                <text x="212" y={y + 15} fontSize="7.5" fill="var(--muted-foreground)">
                  {m.loc}
                </text>
                <rect x={barX} y={y + 8.5} width={barW} height="6" rx="3" fill="var(--muted)" opacity="0.5" />
                <rect x={barX} y={y + 8.5} width={(barW * m.pct) / 100} height="6" rx="3" fill="url(#global-grad)" />
                <text x="366" y={y + 15} fontSize="7.5" fontFamily="monospace" fontWeight="700" fill="var(--brand-teal)" textAnchor="end">
                  {m.pct}%
                </text>
              </g>
            )
          })}
        </g>
      </g>

      {/* window frame */}
      <rect x="6" y="6" width="388" height="288" rx="14" fill="none" stroke="var(--border)" />
    </svg>
  )
}

/** Deep-space backdrop: gradient void, twinkling stars, drifting nebulae, undulating waves. */
function SpaceBackdrop() {
  // deterministic star field (avoids hydration mismatch)
  const stars = Array.from({ length: 46 }, (_, i) => {
    const r = (n: number) => {
      const x = Math.sin((i + 1) * n) * 10000
      return x - Math.floor(x)
    }
    return {
      left: r(12.9898) * 100,
      top: r(78.233) * 100,
      size: 0.6 + r(43.12) * 1.8,
      dur: 3 + r(91.7) * 5,
      delay: r(27.4) * 5,
      max: 0.6 + r(11.3) * 0.4,
    }
  })

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* void gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_140%_at_20%_-10%,color-mix(in_oklch,var(--brand-blue)_55%,black)_0%,#0a1024_45%,#05060f_100%)]" />

      {/* drifting nebula blobs */}
      <span
        className="animate-blob absolute -left-12 top-0 size-52 rounded-full bg-brand-teal opacity-30 blur-3xl"
        style={{ "--bx": "44px", "--by": "26px", "--bd": "15s" } as React.CSSProperties}
      />
      <span
        className="animate-blob absolute right-2 -top-10 size-44 rounded-full bg-brand-pink opacity-25 blur-3xl"
        style={{ "--bx": "-32px", "--by": "30px", "--bd": "18s" } as React.CSSProperties}
      />
      <span
        className="animate-blob absolute bottom-0 left-1/3 size-56 rounded-full bg-brand-blue opacity-30 blur-3xl"
        style={{ "--bx": "28px", "--by": "-24px", "--bd": "13s" } as React.CSSProperties}
      />

      {/* twinkling stars */}
      {stars.map((s, i) => (
        <span
          key={i}
          className="animate-twinkle absolute rounded-full bg-white"
          style={
            {
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              "--td": `${s.dur}s`,
              "--tmax": s.max,
              "--tmin": 0.15,
              animationDelay: `${s.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}

      {/* undulating waves along the bottom */}
      <div className="absolute inset-x-0 bottom-0 h-1/2">
        {[
          { fill: "var(--brand-blue)", op: 0.28, ws: "22s", y: "translateY(18%)" },
          { fill: "var(--brand-teal)", op: 0.22, ws: "16s", y: "translateY(30%)" },
          { fill: "var(--brand-pink)", op: 0.16, ws: "28s", y: "translateY(42%)" },
        ].map((w, i) => (
          <div
            key={i}
            className="animate-wave-scroll absolute inset-x-0 bottom-0 h-full w-[200%]"
            style={{ "--ws": w.ws, transform: w.y } as React.CSSProperties}
          >
            <svg viewBox="0 0 2880 200" preserveAspectRatio="none" className="h-full w-full">
              <path
                d="M0 90 C 240 30 480 150 720 90 C 960 30 1200 150 1440 90 C 1680 30 1920 150 2160 90 C 2400 30 2640 150 2880 90 L2880 200 L0 200 Z"
                fill={w.fill}
                opacity={w.op}
              />
            </svg>
          </div>
        ))}
      </div>
    </div>
  )
}

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
  cta,
}: {
  variant: "glass" | "filled"
  icon: typeof Search
  eyebrow: string
  name: string
  tagline: string
  features: string[]
  graphic: React.ReactNode
  reverse?: boolean
  cta?: React.ReactNode
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
      {filled && <SpaceBackdrop />}
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
          {cta && <div className="mt-5">{cta}</div>}
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
        cta={
          <ViewUseCasesButton className="btn-anim inline-flex items-center gap-2 rounded-full bg-primary-foreground px-5 py-2.5 text-sm font-semibold text-brand-blue shadow-lg hover:gap-3">
            <Globe className="size-4" />
            See all use cases
            <ArrowRight className="size-4" />
          </ViewUseCasesButton>
        }
      />

      {/* full-width join CTA */}
      <div className="flex flex-col items-center gap-5 rounded-2xl border border-brand-blue/25 bg-gradient-to-r from-brand-blue/10 via-brand-teal/10 to-brand-blue/10 px-6 py-7 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <h3 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
            Be first to try what&apos;s next
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            Join the private beta and help shape Ethel Insights and Ethel Global.
          </p>
        </div>
        <JoinBetaButton
          count={22}
          className="btn-anim btn-anim-primary inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to px-8 py-3.5 text-base font-semibold text-primary-foreground"
        >
          <Sparkles className="size-4" />
          Join the beta
        </JoinBetaButton>
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

      {/* Ethel Global use cases */}
      <UseCasesModal />

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
