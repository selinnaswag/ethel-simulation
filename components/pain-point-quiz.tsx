"use client"

import { useCallback, useEffect, useState } from "react"
import {
  Clock,
  Layers,
  MessageCircleQuestion,
  FileText,
  ArrowRight,
  ArrowLeft,
  X,
  RefreshCw,
  Check,
} from "lucide-react"

const OPEN_EVENT = "ethel:open-quiz"

type Theme = "recap" | "audiences" | "status" | "leadership"

type Question = {
  q: string
  options: { label: string; theme: Theme }[]
}

const questions: Question[] = [
  {
    q: "What eats the most time in your week?",
    options: [
      { label: "Re-reading long case files", theme: "recap" },
      { label: "Reformatting the same case for different people", theme: "audiences" },
      { label: "Answering “what’s the status?” over and over", theme: "status" },
      { label: "Prepping polished updates for leadership", theme: "leadership" },
    ],
  },
  {
    q: "Where do things slow down most?",
    options: [
      { label: "Getting back up to speed on a case", theme: "recap" },
      { label: "Handing a case off to a colleague", theme: "audiences" },
      { label: "Keeping stakeholders in the loop", theme: "status" },
      { label: "Board and executive reporting", theme: "leadership" },
    ],
  },
  {
    q: "What would move the needle for your team?",
    options: [
      { label: "A one-glance recap of any case", theme: "recap" },
      { label: "Audience-ready summaries on demand", theme: "audiences" },
      { label: "Instant answers without digging", theme: "status" },
      { label: "Polished, audit-ready exec briefs", theme: "leadership" },
    ],
  },
]

const results: Record<
  Theme,
  { icon: typeof Clock; title: string; feature: string; body: string }
> = {
  recap: {
    icon: Clock,
    title: "You lose time getting back up to speed",
    feature: "The 30-second summary",
    body: "Ethel reads the entire case file and returns a structured What Happened / Key Facts / Current Status recap in about 30 seconds — so you never re-read a file just to remember where it stands.",
  },
  audiences: {
    icon: Layers,
    title: "You keep rewriting the same case",
    feature: "Three summary types, one click",
    body: "Ethel reshapes the same case into a Case, Investigation, or Executive summary instantly — the right format for whoever’s asking, without you rewriting a thing.",
  },
  status: {
    icon: MessageCircleQuestion,
    title: "Status questions keep interrupting you",
    feature: "Ask Ethel anything",
    body: "Ethel answers questions grounded in the case record — who’s involved, what’s next, current status — every answer audit-aware, so you stop digging through files to reply.",
  },
  leadership: {
    icon: FileText,
    title: "Leadership updates cost you hours",
    feature: "Executive Summary, audit-aware",
    body: "Ethel generates board-ready, audit-aware executive briefs from any case in seconds, so leadership reporting stops eating your afternoons.",
  },
}

export function OpenQuizButton({
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

export function PainPointQuiz() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Theme[]>([])

  const reset = useCallback(() => {
    setStep(0)
    setAnswers([])
  }, [])

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    const onOpen = () => {
      reset()
      setOpen(true)
    }
    window.addEventListener(OPEN_EVENT, onOpen)
    return () => window.removeEventListener(OPEN_EVENT, onOpen)
  }, [reset])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close()
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, close])

  const isResult = step >= questions.length

  const winningTheme: Theme = (() => {
    const tally = answers.reduce<Record<string, number>>((acc, t) => {
      acc[t] = (acc[t] ?? 0) + 1
      return acc
    }, {})
    let best: Theme = answers[0] ?? "recap"
    let bestN = -1
    for (const t of answers) {
      if (tally[t] > bestN) {
        bestN = tally[t]
        best = t
      }
    }
    return best
  })()

  function choose(theme: Theme) {
    setAnswers((prev) => {
      const next = [...prev]
      next[step] = theme
      return next
    })
    setStep((s) => s + 1)
  }

  const result = results[winningTheme]
  const ResultIcon = result.icon

  return (
    <section id="roi" className="scroll-mt-20 border-y border-border/60 bg-secondary/20">
      <div className="mx-auto max-w-3xl px-5 py-20 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-teal">
          Find your time-sink
        </p>
        <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          Which case-work headache slows you down most?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
          Take the 30-second quiz and we’ll show you exactly how Ethel solves for your biggest pain
          point.
        </p>
        <div className="mt-8 flex justify-center">
          <OpenQuizButton className="btn-anim btn-anim-primary inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to px-7 py-3.5 text-base font-semibold text-primary-foreground">
            Take the pain-point quiz
            <ArrowRight className="size-4" />
          </OpenQuizButton>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Pain point quiz"
        >
          <button
            type="button"
            aria-label="Close quiz"
            onClick={close}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-fade-up"
          />
          <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/50 animate-fade-up">
            {/* progress bar */}
            <div className="h-1 w-full bg-secondary">
              <div
                className="h-full bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  width: `${(Math.min(step, questions.length) / questions.length) * 100}%`,
                }}
              />
            </div>

            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="btn-anim absolute right-3 top-3 flex size-8 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <X className="size-4" />
            </button>

            <div className="p-6 sm:p-8">
              {!isResult ? (
                <div key={step} className="animate-fade-up">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-brand-teal">
                    Question {step + 1} of {questions.length}
                  </p>
                  <h3 className="text-balance text-xl font-bold tracking-tight">
                    {questions[step].q}
                  </h3>
                  <div className="mt-5 space-y-2.5">
                    {questions[step].options.map((opt) => (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => choose(opt.theme)}
                        className="btn-anim group/opt flex w-full items-center justify-between gap-3 rounded-xl border border-border bg-background/60 px-4 py-3 text-left text-sm font-medium text-foreground hover:border-brand-teal/60 hover:bg-primary/10"
                      >
                        {opt.label}
                        <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover/opt:translate-x-0.5 group-hover/opt:text-brand-teal" />
                      </button>
                    ))}
                  </div>
                  {step > 0 && (
                    <button
                      type="button"
                      onClick={() => setStep((s) => s - 1)}
                      className="btn-anim mt-5 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
                    >
                      <ArrowLeft className="size-4" />
                      Back
                    </button>
                  )}
                </div>
              ) : (
                <div className="animate-fade-up text-center">
                  <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-blue/20 to-brand-teal/20">
                    <ResultIcon className="size-6 text-brand-teal" />
                  </div>
                  <p className="text-sm text-muted-foreground">{result.title}</p>
                  <h3 className="mt-1 text-balance text-2xl font-bold tracking-tight">
                    <span className="text-gradient">{result.feature}</span>
                  </h3>
                  <p className="mx-auto mt-4 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
                    {result.body}
                  </p>

                  <ul className="mx-auto mt-6 grid max-w-sm gap-2 text-left">
                    {["Built into myCM", "Audit-aware by design", "Live for every team today"].map(
                      (b) => (
                        <li key={b} className="flex items-center gap-2.5 text-sm text-foreground">
                          <span className="flex size-5 items-center justify-center rounded-full bg-brand-teal/15">
                            <Check className="size-3 text-brand-teal" />
                          </span>
                          {b}
                        </li>
                      ),
                    )}
                  </ul>

                  <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                    <a
                      href="#playground"
                      onClick={close}
                      className="btn-anim btn-anim-primary inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to px-6 py-3 text-sm font-semibold text-primary-foreground sm:w-auto"
                    >
                      See Ethel solve it live
                      <ArrowRight className="size-4" />
                    </a>
                    <button
                      type="button"
                      onClick={reset}
                      className="btn-anim inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-secondary sm:w-auto"
                    >
                      <RefreshCw className="size-4" />
                      Retake
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
