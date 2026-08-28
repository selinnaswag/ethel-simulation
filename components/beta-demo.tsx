"use client"

import type React from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import {
  Search,
  Radar,
  GitCompare,
  FileStack,
  FileDown,
  X,
  Sparkles,
  Send,
  FileText,
  FileSpreadsheet,
  Presentation,
  ArrowUpRight,
  TriangleAlert,
  CheckCircle2,
  Quote,
  Play,
} from "lucide-react"

const OPEN_EVENT = "ethel:open-demo"

/** Button that opens the interactive product demo. */
export function WatchDemoButton({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent(OPEN_EVENT))}
      className={className}
    >
      {children}
    </button>
  )
}

type ChapterKey = "ask" | "radar" | "similar" | "brief" | "export"

const chapters: {
  key: ChapterKey
  label: string
  icon: React.ElementType
  headline: string
  sub: string
}[] = [
  {
    key: "ask",
    label: "Ask anything",
    icon: Search,
    headline: "Query the dataset in plain language",
    sub: "Anyone viewing a report can ask questions directly — no report-building required.",
  },
  {
    key: "radar",
    label: "Pattern radar",
    icon: Radar,
    headline: "Anomalies surface on their own",
    sub: "Category spikes, location clusters, and cross-case links are flagged automatically.",
  },
  {
    key: "similar",
    label: "Cross-case",
    icon: GitCompare,
    headline: "Find related cases org-wide",
    sub: "Match subjects and overlapping findings across every case in your permission scope.",
  },
  {
    key: "brief",
    label: "Multi-case brief",
    icon: FileStack,
    headline: "Meeting prep in seconds",
    sub: "Synthesize attachments, witness statements, and intake forms into one brief.",
  },
  {
    key: "export",
    label: "Export",
    icon: FileDown,
    headline: "Preview, then export anywhere",
    sub: "Word, Excel, PDF, and PowerPoint — with custom Excel columns and in-flow revision.",
  },
]

/** Simple typewriter for the answer stream. */
function useTypewriter(text: string, active: boolean, speed = 14) {
  const [out, setOut] = useState("")
  useEffect(() => {
    if (!active) {
      setOut("")
      return
    }
    setOut("")
    let i = 0
    const id = window.setInterval(() => {
      i += 1
      setOut(text.slice(0, i))
      if (i >= text.length) window.clearInterval(id)
    }, speed)
    return () => window.clearInterval(id)
  }, [text, active, speed])
  return out
}

function AskStage({ active }: { active: boolean }) {
  const answer =
    "Harassment complaints in the LA location rose 38% this quarter (11 cases) vs. last (8). Three share the same implicated manager, suggesting a connected pattern rather than isolated reports."
  const typed = useTypewriter(answer, active)
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center gap-2 rounded-xl border border-border bg-background/70 px-3 py-2.5">
        <Search className="size-4 shrink-0 text-brand-blue" />
        <span className="flex-1 text-sm text-foreground">
          Are harassment complaints up in the LA location this quarter?
        </span>
        <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Send className="size-3.5" />
        </span>
      </div>
      <div className="flex-1 rounded-xl border border-border bg-card/70 p-4">
        <div className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-brand-teal">
          <Sparkles className="size-3.5" />
          Ethel
        </div>
        <p className="text-sm leading-relaxed text-foreground">
          {typed}
          {active && typed.length < answer.length && (
            <span className="ml-0.5 inline-block h-4 w-1.5 translate-y-0.5 animate-pulse bg-brand-teal" />
          )}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {["CS-4471", "CS-4488", "CS-4502"].map((id) => (
            <span
              key={id}
              className="inline-flex items-center gap-1 rounded-md border border-brand-blue/30 bg-brand-blue/10 px-2 py-1 font-mono text-[11px] text-brand-blue"
            >
              <Quote className="size-3" />
              {id}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function RadarStage() {
  const flags = [
    { icon: TriangleAlert, tone: "pink", title: "Category spike", body: "Retaliation reports +52% MoM in West region." },
    { icon: TriangleAlert, tone: "blue", title: "Location anomaly", body: "Denver site: 6 cases from one department in 14 days." },
    { icon: GitCompare, tone: "teal", title: "Cross-case link", body: "4 open cases name the same third-party vendor." },
  ] as const
  return (
    <div className="flex h-full flex-col gap-2.5">
      {flags.map((f, i) => {
        const Icon = f.icon
        const tone =
          f.tone === "pink"
            ? "border-brand-pink/30 bg-brand-pink/10 text-brand-pink"
            : f.tone === "blue"
              ? "border-brand-blue/30 bg-brand-blue/10 text-brand-blue"
              : "border-brand-teal/30 bg-brand-teal/10 text-brand-teal"
        return (
          <div
            key={f.title}
            className="animate-fade-up flex items-start gap-3 rounded-xl border border-border bg-card/70 p-3.5"
            style={{ animationDelay: `${i * 90}ms` }}
          >
            <span className={`flex size-8 shrink-0 items-center justify-center rounded-lg border ${tone}`}>
              <Icon className="size-4" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">{f.title}</p>
              <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
            </div>
            <span className="ml-auto self-center text-muted-foreground">
              <ArrowUpRight className="size-4" />
            </span>
          </div>
        )
      })}
    </div>
  )
}

function SimilarStage() {
  const cases = [
    { id: "CS-3391", match: 94, note: "Same subject, overlapping timeframe" },
    { id: "CS-2874", match: 88, note: "Shared implicated manager" },
    { id: "CS-4102", match: 81, note: "Similar findings, adjacent location" },
  ]
  return (
    <div className="flex h-full flex-col gap-2.5">
      <div className="rounded-xl border border-border bg-background/70 px-3.5 py-2.5 text-sm text-foreground">
        <span className="text-muted-foreground">Viewing</span>{" "}
        <span className="font-mono text-brand-blue">CS-4471</span> — “Any similar cases to this
        one?”
      </div>
      {cases.map((c, i) => (
        <div
          key={c.id}
          className="animate-fade-up flex items-center gap-3 rounded-xl border border-border bg-card/70 p-3.5"
          style={{ animationDelay: `${i * 90}ms` }}
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-teal/15 text-brand-teal">
            <GitCompare className="size-4" />
          </span>
          <div className="min-w-0">
            <p className="font-mono text-sm text-foreground">{c.id}</p>
            <p className="truncate text-sm text-muted-foreground">{c.note}</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="hidden h-1.5 w-20 overflow-hidden rounded-full bg-secondary sm:block">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-blue to-brand-teal"
                style={{ width: `${c.match}%` }}
              />
            </div>
            <span className="text-sm font-semibold text-brand-teal">{c.match}%</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function BriefStage() {
  const sources = ["Intake form", "3 witness statements", "Email attachment", "Interview notes"]
  const lines = [
    "Executive summary — 4 cases, one implicated party, spanning Mar–Jun.",
    "Timeline reconstructed from intake dates and witness accounts.",
    "Key findings with conflicting statements flagged for review.",
    "Recommended next steps with responsible owners.",
  ]
  return (
    <div className="grid h-full gap-3 sm:grid-cols-[0.8fr_1fr]">
      <div className="rounded-xl border border-border bg-background/70 p-3.5">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Sources synthesized
        </p>
        <ul className="space-y-2">
          {sources.map((s, i) => (
            <li
              key={s}
              className="animate-fade-up flex items-center gap-2 text-sm text-foreground"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <FileText className="size-4 shrink-0 text-brand-blue" />
              {s}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border border-border bg-card/70 p-4">
        <div className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-brand-teal">
          <Sparkles className="size-3.5" />
          Generated brief
        </div>
        <ul className="space-y-2.5">
          {lines.map((l, i) => (
            <li
              key={l}
              className="animate-fade-up flex gap-2 text-sm leading-relaxed text-foreground"
              style={{ animationDelay: `${200 + i * 110}ms` }}
            >
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand-teal" />
              {l}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function ExportStage() {
  const formats = [
    { icon: FileText, label: "Word", tone: "blue" },
    { icon: FileSpreadsheet, label: "Excel", tone: "teal", note: "custom columns" },
    { icon: FileText, label: "PDF", tone: "pink" },
    { icon: Presentation, label: "PowerPoint", tone: "blue" },
  ] as const
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {formats.map((f, i) => {
          const Icon = f.icon
          const tone =
            f.tone === "pink"
              ? "text-brand-pink"
              : f.tone === "teal"
                ? "text-brand-teal"
                : "text-brand-blue"
          return (
            <div
              key={f.label}
              className="animate-fade-up flex flex-col items-center gap-1.5 rounded-xl border border-border bg-card/70 p-3 text-center"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <Icon className={`size-6 ${tone}`} />
              <span className="text-xs font-semibold text-foreground">{f.label}</span>
              {"note" in f && f.note && (
                <span className="text-[10px] text-muted-foreground">{f.note}</span>
              )}
            </div>
          )
        })}
      </div>
      <div className="flex-1 rounded-xl border border-dashed border-border bg-background/60 p-4">
        <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          <FileDown className="size-3.5" />
          Preview before download
        </p>
        <div className="space-y-2">
          <div className="h-2.5 w-1/3 rounded bg-secondary" />
          <div className="h-2 w-full rounded bg-secondary/70" />
          <div className="h-2 w-5/6 rounded bg-secondary/70" />
          <div className="h-2 w-2/3 rounded bg-secondary/70" />
        </div>
        <div className="mt-3 rounded-lg border border-brand-teal/30 bg-brand-teal/10 px-3 py-2 text-xs text-brand-teal">
          “Add an executive summary at the top” — revise in-flow, same document.
        </div>
      </div>
    </div>
  )
}

export function BetaDemoModal() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<ChapterKey>("ask")
  const close = useCallback(() => setOpen(false), [])
  const current = chapters.find((c) => c.key === active)!

  useEffect(() => {
    const onOpen = () => {
      setActive("ask")
      setOpen(true)
    }
    window.addEventListener(OPEN_EVENT, onOpen)
    return () => window.removeEventListener(OPEN_EVENT, onOpen)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close()
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, close])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-label="Ethel beta demo"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={close}
        className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-fade-up"
      />

      {/* app window */}
      <div className="animate-fade-up relative z-10 flex h-[560px] max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/50">
        {/* title bar */}
        <div className="flex items-center gap-3 border-b border-border/70 bg-secondary/40 px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-destructive/70" />
            <span className="size-2.5 rounded-full bg-brand-pink/70" />
            <span className="size-2.5 rounded-full bg-brand-teal/70" />
          </div>
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
            <Sparkles className="size-3 text-brand-blue" />
            ethel · beta preview
          </span>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="btn-anim ml-auto flex size-7 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col sm:flex-row">
          {/* chapter sidebar */}
          <nav className="flex shrink-0 gap-1 overflow-x-auto border-b border-border/70 bg-background/40 p-2 sm:w-52 sm:flex-col sm:overflow-visible sm:border-b-0 sm:border-r">
            {chapters.map((c) => {
              const Icon = c.icon
              const isActive = c.key === active
              return (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => setActive(c.key)}
                  className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors duration-200 sm:w-full ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <Icon className="size-4 shrink-0" />
                  {c.label}
                </button>
              )
            })}
          </nav>

          {/* stage */}
          <div className="flex min-h-0 flex-1 flex-col p-4 sm:p-5">
            <div key={active} className="animate-fade-up mb-3">
              <h4 className="text-base font-semibold tracking-tight text-foreground">
                {current.headline}
              </h4>
              <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{current.sub}</p>
            </div>
            <div key={`${active}-stage`} className="animate-fade-up min-h-0 flex-1">
              {active === "ask" && <AskStage active />}
              {active === "radar" && <RadarStage />}
              {active === "similar" && <SimilarStage />}
              {active === "brief" && <BriefStage />}
              {active === "export" && <ExportStage />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
