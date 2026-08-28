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
    solution:
      "Every answer cites its case IDs and source documents, in any submission language.",
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
      {/* ambient wash */}
      <div className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(ellipse_50%_60%_at_15%_0%,color-mix(in_oklch,var(--brand-blue)_16%,transparent),transparent_70%),radial-gradient(ellipse_50%_60%_at_85%_100%,color-mix(in_oklch,var(--brand-teal)_16%,transparent),transparent_70%)]"
        />

        <div className="relative mx-auto max-w-6xl px-5 py-20">
          {/* header */}
          <div className="mx-auto mb-12 max-w-2xl text-center">
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
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
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

          {/* two products */}
          <div className="grid items-start gap-6 md:grid-cols-2">
            {/* Ethel Insights */}
            <div className="rounded-2xl border border-border bg-card/60 p-7 backdrop-blur">
              <div className="mb-6 flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-brand-blue/15">
                  <Search className="size-5 text-brand-blue" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Ethel Insights</h3>
                  <p className="text-sm text-muted-foreground">An AI analyst for case data</p>
                </div>
              </div>
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                From any EcoReports report, ask plain-language questions across the entire dataset
                and get instant, source-cited answers.
              </p>
              <ul className="space-y-4">
                {insights.map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.problem} className="flex gap-3">
                      <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-brand-teal/15">
                        <Icon className="size-4 text-brand-teal" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{item.problem}</p>
                        <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                          {item.solution}
                        </p>
                      </div>
                    </li>
                  )
                })}
              </ul>
              <p className="mt-6 rounded-lg border border-border/60 bg-secondary/40 px-3 py-2 text-xs text-muted-foreground">
                Scope — isolated to EcoReports and its datasets.
              </p>
              <WatchDemoButton className="btn-anim mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue hover:gap-2.5">
                <PlayCircle className="size-4" />
                See it in action
              </WatchDemoButton>
            </div>

            {/* Ethel Global */}
            <div className="relative overflow-hidden rounded-2xl border border-brand-blue/40 bg-gradient-to-b from-brand-blue/[0.08] to-transparent p-7 backdrop-blur">
              <span className="absolute right-5 top-5 rounded-full border border-brand-teal/30 bg-brand-teal/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-brand-teal">
                Additive
              </span>
              <div className="mb-6 flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-brand-teal/15">
                  <Globe className="size-5 text-brand-teal" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Ethel Global</h3>
                  <p className="text-sm text-muted-foreground">Reasoning across every case</p>
                </div>
              </div>
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                From the case list, a dashboard, or anywhere — Ethel reasons across cases org-wide,
                within your permission scope. Layers on top of both summaries and insights.
              </p>
              <ul className="space-y-4">
                {globalPoints.map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.title} className="flex gap-3">
                      <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-brand-blue/15">
                        <Icon className="size-4 text-brand-blue" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{item.title}</p>
                        <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                          {item.body}
                        </p>
                      </div>
                    </li>
                  )
                })}
              </ul>
              <p className="mt-6 rounded-lg border border-border/60 bg-secondary/40 px-3 py-2 text-xs text-muted-foreground">
                Beta framing — generation focuses on getting the content right; apply your own
                styling and branding on export.
              </p>
              <WatchDemoButton className="btn-anim mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-teal hover:gap-2.5">
                <PlayCircle className="size-4" />
                See it in action
              </WatchDemoButton>
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
