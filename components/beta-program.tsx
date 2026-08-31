"use client"

import type React from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import {
  Sparkles,
  Search,
  Radar,
  FileStack,
  ShieldCheck,
  Globe,
  FileDown,
  GitCompare,
  Eye,
  Wand2,
  ArrowRight,
  X,
  Check,
  PlayCircle,
  LayoutGrid,
  PanelTop,
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

const insights = [
  {
    icon: Search,
    problem: "Insight locked to report-builders",
    solution:
      "Anyone viewing an EcoReports report can now query the underlying dataset directly, in plain language — no report-building required.",
  },
  {
    icon: Radar,
    problem: "Late-surfacing patterns",
    solution:
      "Category spikes, location anomalies, and cross-case connections are flagged automatically — not just when someone thinks to look.",
  },
  {
    icon: FileStack,
    problem: "Manual meeting prep",
    solution:
      "Multi-case briefs and document synthesis — attachments, witness statements, intake forms — generate in seconds instead of an afternoon.",
  },
  {
    icon: ShieldCheck,
    problem: "Untraceable decisions",
    solution: "Every answer cites its case IDs and source documents, in any submission language.",
  },
]

const globalPoints = [
  {
    icon: Globe,
    title: "Org-wide querying",
    body: "“Are harassment complaints up in the LA location this quarter vs. last?” returns a narrative summary across every matching case, within your permission scope.",
  },
  {
    icon: GitCompare,
    title: "Cross-case similarity",
    body: "From inside a single case, ask “Any similar cases to this one?” and Ethel finds related cases system-wide by matching subjects and overlapping findings.",
  },
  {
    icon: FileDown,
    title: "Document export",
    body: "Export generations to Word, Excel, PDF, and PowerPoint. Excel export supports custom column selection — you pick the exact fields.",
  },
  {
    icon: Eye,
    title: "Preview before download",
    body: "Generated documents show an expected-output preview in the panel before you commit to downloading.",
  },
  {
    icon: Wand2,
    title: "In-flow revision",
    body: "After generating, request changes in plain language — “add an executive summary at the top” — and Ethel updates the same document instead of starting over.",
  },
]

/* ------------------------------------------------------------------ */
/* Variant A — Tabbed showcase                                         */
/* ------------------------------------------------------------------ */

function InsightsPreview() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background/70">
      <div className="flex items-center gap-2 border-b border-border/70 bg-secondary/40 px-4 py-2.5 font-mono text-[11px] text-muted-foreground">
        <Search className="size-3.5 text-brand-blue" />
        EcoReports · Ask the dataset
      </div>
      <div className="space-y-3 p-4">
        <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-brand-blue/15 px-3.5 py-2 text-sm text-foreground">
          Which categories spiked in Q3 vs Q2?
        </div>
        <div className="max-w-[92%] rounded-2xl rounded-bl-sm border border-border bg-card px-3.5 py-2.5 text-sm leading-relaxed text-foreground">
          Retaliation reports rose <span className="font-semibold text-brand-teal">+41%</span>, driven
          by the Dallas and LA locations.
          <div className="mt-2 flex flex-wrap gap-1.5">
            {["CS-4471", "CS-4488", "CS-4502"].map((id) => (
              <span
                key={id}
                className="rounded-md border border-brand-teal/30 bg-brand-teal/10 px-1.5 py-0.5 font-mono text-[10px] text-brand-teal"
              >
                {id}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function GlobalPreview() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background/70">
      <div className="flex items-center gap-2 border-b border-border/70 bg-secondary/40 px-4 py-2.5 font-mono text-[11px] text-muted-foreground">
        <Globe className="size-3.5 text-brand-teal" />
        Org-wide · Similar cases
      </div>
      <div className="space-y-2.5 p-4">
        {[
          { id: "CS-3120", label: "Same subject · 3 overlapping findings", pct: 92 },
          { id: "CS-2884", label: "Same location · similar allegation", pct: 78 },
          { id: "CS-2610", label: "Related witness statements", pct: 64 },
        ].map((row) => (
          <div key={row.id} className="rounded-lg border border-border bg-card px-3 py-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-mono text-xs text-foreground">{row.id}</span>
              <span className="font-semibold text-brand-teal">{row.pct}%</span>
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground">{row.label}</p>
            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-secondary">
              <div className="h-full rounded-full bg-brand-teal" style={{ width: `${row.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function TabbedShowcase() {
  const [product, setProduct] = useState<"insights" | "global">("insights")
  const isInsights = product === "insights"

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card/60 backdrop-blur">
      {/* product tabs */}
      <div className="flex border-b border-border/70">
        {[
          { key: "insights" as const, name: "Ethel Insights", icon: Search, tone: "text-brand-blue" },
          { key: "global" as const, name: "Ethel Global", icon: Globe, tone: "text-brand-teal" },
        ].map((t) => {
          const Icon = t.icon
          const on = product === t.key
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setProduct(t.key)}
              className={`relative flex flex-1 items-center justify-center gap-2 px-4 py-3.5 text-sm font-semibold transition-colors ${
                on ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className={`size-4 ${on ? t.tone : ""}`} />
              {t.name}
              {on && (
                <span className="absolute inset-x-6 bottom-0 h-0.5 rounded-full bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to" />
              )}
            </button>
          )
        })}
      </div>

      {/* body */}
      <div key={product} className="grid animate-fade-up gap-6 p-6 md:grid-cols-[1.05fr_1fr]">
        {/* feature list */}
        <div>
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
            {isInsights
              ? "From any EcoReports report, ask plain-language questions across the entire dataset and get instant, source-cited answers."
              : "From the case list, a dashboard, or anywhere — Ethel reasons across cases org-wide, within your permission scope."}
          </p>
          <ul className="space-y-3.5">
            {(isInsights ? insights : globalPoints).map((item) => {
              const Icon = item.icon
              const title = "problem" in item ? item.problem : item.title
              const body = "solution" in item ? item.solution : item.body
              return (
                <li key={title} className="flex gap-3">
                  <span
                    className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg ${
                      isInsights ? "bg-brand-teal/15" : "bg-brand-blue/15"
                    }`}
                  >
                    <Icon className={`size-4 ${isInsights ? "text-brand-teal" : "text-brand-blue"}`} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
                  </div>
                </li>
              )
            })}
          </ul>
          <WatchDemoButton
            className={`btn-anim mt-5 inline-flex items-center gap-1.5 text-sm font-semibold hover:gap-2.5 ${
              isInsights ? "text-brand-blue" : "text-brand-teal"
            }`}
          >
            <PlayCircle className="size-4" />
            See it in action
          </WatchDemoButton>
        </div>

        {/* preview */}
        <div className="flex flex-col justify-center">
          {isInsights ? <InsightsPreview /> : <GlobalPreview />}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Variant B — Bento grid                                              */
/* ------------------------------------------------------------------ */

function BentoGrid() {
  return (
    <div className="grid auto-rows-[minmax(0,1fr)] grid-cols-2 gap-4 md:grid-cols-4">
      {/* Insights lead tile */}
      <div className="col-span-2 flex flex-col justify-between rounded-2xl border border-brand-blue/40 bg-gradient-to-br from-brand-blue/[0.1] to-transparent p-6 md:row-span-2">
        <div>
          <span className="flex size-10 items-center justify-center rounded-xl bg-brand-blue/15">
            <Search className="size-5 text-brand-blue" />
          </span>
          <h3 className="mt-4 text-lg font-semibold text-foreground">Ethel Insights</h3>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            An AI analyst for case data. Ask plain-language questions across an entire EcoReports
            dataset and get instant, source-cited answers.
          </p>
        </div>
        <WatchDemoButton className="btn-anim mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue hover:gap-2.5">
          <PlayCircle className="size-4" />
          See it in action
        </WatchDemoButton>
      </div>

      {/* highlighted CTA tile */}
      <div className="col-span-2 flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-gradient-from/20 via-gradient-via/15 to-gradient-to/20 p-6 md:row-span-2">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-blue/30 bg-background/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-brand-blue">
            <Sparkles className="size-3" />
            Private beta
          </span>
          <p className="mt-4 text-pretty text-lg font-semibold leading-snug text-foreground">
            Two new superpowers, layered on top of case summaries.
          </p>
        </div>
        <JoinBetaButton
          count={20}
          className="btn-anim btn-anim-primary mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to px-5 py-3 text-sm font-semibold text-primary-foreground"
        >
          <Sparkles className="size-4" />
          Join the beta
        </JoinBetaButton>
      </div>

      {/* Insights feature tiles */}
      {[insights[1], insights[2], insights[3]].map((item) => {
        const Icon = item.icon
        return (
          <div
            key={item.problem}
            className="col-span-2 rounded-2xl border border-border bg-card/60 p-5 backdrop-blur md:col-span-2"
          >
            <span className="flex size-8 items-center justify-center rounded-lg bg-brand-teal/15">
              <Icon className="size-4 text-brand-teal" />
            </span>
            <p className="mt-3 text-sm font-semibold text-foreground">{item.problem}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.solution}</p>
          </div>
        )
      })}

      {/* Global lead tile */}
      <div className="col-span-2 flex flex-col justify-between rounded-2xl border border-brand-teal/40 bg-gradient-to-br from-brand-teal/[0.1] to-transparent p-6 md:row-span-2">
        <div>
          <span className="flex size-10 items-center justify-center rounded-xl bg-brand-teal/15">
            <Globe className="size-5 text-brand-teal" />
          </span>
          <h3 className="mt-4 text-lg font-semibold text-foreground">Ethel Global</h3>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            Reasoning across every case. Query your whole org within permission scope — trends,
            comparisons, and similar cases from anywhere.
          </p>
        </div>
        <WatchDemoButton className="btn-anim mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-teal hover:gap-2.5">
          <PlayCircle className="size-4" />
          See it in action
        </WatchDemoButton>
      </div>

      {/* Global feature tiles */}
      {[globalPoints[0], globalPoints[1], globalPoints[2], globalPoints[4]].map((item) => {
        const Icon = item.icon
        return (
          <div
            key={item.title}
            className="col-span-2 rounded-2xl border border-border bg-card/60 p-5 backdrop-blur"
          >
            <span className="flex size-8 items-center justify-center rounded-lg bg-brand-blue/15">
              <Icon className="size-4 text-brand-blue" />
            </span>
            <p className="mt-3 text-sm font-semibold text-foreground">{item.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
          </div>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------------ */

export function BetaProgram() {
  const [variant, setVariant] = useState<"tabbed" | "bento">("tabbed")
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

        <div className="relative mx-auto max-w-6xl px-5 py-20">
          {/* header */}
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-blue/30 bg-brand-blue/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-blue">
              <Sparkles className="size-3.5" />
              Private beta
            </span>
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Get early access to <span className="text-gradient">what&apos;s next</span> for Ethel
            </h2>
            <p className="mx-auto mt-4 text-pretty leading-relaxed text-muted-foreground">
              Beta users get two new superpowers layered on top of case summaries — an AI analyst
              for your data, and reasoning that spans your entire organization.
            </p>
          </div>

          {/* layout toggle (temporary — for choosing a direction) */}
          <div className="mx-auto mb-10 flex w-fit items-center gap-1 rounded-full border border-border bg-card/60 p-1 backdrop-blur">
            {[
              { key: "tabbed" as const, label: "Tabbed showcase", icon: PanelTop },
              { key: "bento" as const, label: "Bento grid", icon: LayoutGrid },
            ].map((v) => {
              const Icon = v.icon
              const on = variant === v.key
              return (
                <button
                  key={v.key}
                  type="button"
                  onClick={() => setVariant(v.key)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    on
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="size-4" />
                  {v.label}
                </button>
              )
            })}
          </div>

          {/* selected layout */}
          <div key={variant} className="animate-fade-up">
            {variant === "tabbed" ? <TabbedShowcase /> : <BentoGrid />}
          </div>

          {/* shared CTA under the layout */}
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <JoinBetaButton
              count={20}
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
