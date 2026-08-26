"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Sparkles, RotateCcw, Check, FileText } from "lucide-react"
import { sampleCase, summaries } from "@/lib/ethel-data"

type Phase = "idle" | "reading" | "typing" | "done"

// Flatten the "case" summary into a stream of paragraphs to type out.
const steps = summaries.case.flatMap((block, blockIndex) =>
  block.body.map((text, paraIndex) => ({
    blockIndex,
    paraIndex,
    words: text.split(" "),
  })),
)
const blockStartStep = summaries.case.map((_, bi) =>
  steps.findIndex((s) => s.blockIndex === bi),
)

export function ThirtySecondDemo() {
  const [phase, setPhase] = useState<Phase>("idle")
  const [stepIndex, setStepIndex] = useState(0)
  const [wordIndex, setWordIndex] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const startRef = useRef(0)

  const reset = useCallback(() => {
    setPhase("idle")
    setStepIndex(0)
    setWordIndex(0)
    setElapsed(0)
  }, [])

  const run = useCallback(() => {
    setStepIndex(0)
    setWordIndex(0)
    setElapsed(0)
    startRef.current = performance.now()
    setPhase("reading")
  }, [])

  // reading -> typing after a short "reading the case" beat
  useEffect(() => {
    if (phase !== "reading") return
    const t = setTimeout(() => setPhase("typing"), 900)
    return () => clearTimeout(t)
  }, [phase])

  // word-by-word typing
  useEffect(() => {
    if (phase !== "typing") return
    const t = setTimeout(() => {
      const current = steps[stepIndex]
      if (wordIndex < current.words.length) {
        setWordIndex((w) => Math.min(w + 2, current.words.length))
      } else if (stepIndex < steps.length - 1) {
        setStepIndex((s) => s + 1)
        setWordIndex(0)
      } else {
        setPhase("done")
      }
    }, 40)
    return () => clearTimeout(t)
  }, [phase, stepIndex, wordIndex])

  // live timer
  useEffect(() => {
    if (phase !== "reading" && phase !== "typing") return
    const id = setInterval(() => {
      setElapsed(performance.now() - startRef.current)
    }, 83)
    return () => clearInterval(id)
  }, [phase])

  const seconds = (elapsed / 1000).toFixed(1)
  const started = phase !== "idle"

  return (
    <div className="mx-auto max-w-4xl">
      {/* browser chrome */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/40">
        <div className="flex items-center gap-2 border-b border-border bg-secondary/40 px-4 py-3">
          <span className="size-3 rounded-full bg-destructive/70" />
          <span className="size-3 rounded-full bg-primary/60" />
          <span className="size-3 rounded-full bg-accent/60" />
          <div className="ml-3 flex-1 truncate rounded-md bg-background/60 px-3 py-1 text-center text-xs text-muted-foreground">
            app.mycm.com/cases/{sampleCase.id}
          </div>
        </div>

        <div className="grid gap-px bg-border md:grid-cols-2">
          {/* Case record */}
          <div className="bg-card p-6">
            <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <FileText className="size-4" />
              Case record
            </div>
            <h3 className="text-lg font-semibold text-foreground">{sampleCase.title}</h3>
            <p className="mt-1 font-mono text-xs text-muted-foreground">ID: {sampleCase.id}</p>

            <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              {[
                ["Category", sampleCase.category],
                ["Severity", sampleCase.severity],
                ["Status", sampleCase.status],
                ["Assigned to", sampleCase.assignedTo],
                ["Reported via", sampleCase.reportedVia],
                ["Reported on", sampleCase.reportedOn],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-xs text-muted-foreground">{k}</dt>
                  <dd className="mt-0.5 font-medium text-foreground">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 border-t border-border pt-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Intake responses
              </p>
              <ul className="space-y-3">
                {sampleCase.intake.map((item) => (
                  <li key={item.q}>
                    <p className="text-sm font-medium text-foreground">{item.q}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Ethel panel */}
          <div className="relative bg-gradient-to-b from-primary/[0.06] to-transparent p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <span className="flex size-6 items-center justify-center rounded-md bg-primary/15">
                  <Sparkles className="size-3.5 text-primary" />
                </span>
                Ethel
              </div>
              {started && (
                <span className="flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-2.5 py-1 font-mono text-xs text-foreground">
                  <span
                    className={
                      phase === "done" ? "text-primary" : "text-muted-foreground"
                    }
                  >
                    {phase === "done" ? "done in" : "elapsed"}
                  </span>
                  {seconds}s
                </span>
              )}
            </div>

            {phase === "idle" && (
              <div className="flex min-h-[340px] flex-col items-center justify-center text-center">
                <p className="mb-6 max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
                  Ethel reads the full case record — intake, notes and status — and writes a
                  structured summary you can trust.
                </p>
                <button
                  onClick={run}
                  className="btn-anim btn-anim-primary inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
                >
                  <Sparkles className="size-4" />
                  Summarize this case
                </button>
              </div>
            )}

            {phase === "reading" && (
              <div className="min-h-[340px] space-y-3 pt-2">
                <p className="text-sm text-muted-foreground">Ethel is reading the case…</p>
                {[0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-3 animate-pulse rounded bg-muted"
                    style={{ width: `${90 - i * 8}%`, animationDelay: `${i * 90}ms` }}
                  />
                ))}
              </div>
            )}

            {(phase === "typing" || phase === "done") && (
              <div className="min-h-[340px] space-y-5">
                {summaries.case.map((block, bi) => {
                  const started = stepIndex >= blockStartStep[bi] || phase === "done"
                  if (!started) return null
                  return (
                    <div key={block.heading} className="animate-fade-up">
                      <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                        {block.heading}
                      </h4>
                      <div className="space-y-1.5">
                        {block.body.map((para, pi) => {
                          const flatIndex = steps.findIndex(
                            (s) => s.blockIndex === bi && s.paraIndex === pi,
                          )
                          if (phase === "typing" && flatIndex > stepIndex) return null
                          const isCurrent = phase === "typing" && flatIndex === stepIndex
                          const words = para.split(" ")
                          const shown = isCurrent ? words.slice(0, wordIndex).join(" ") : para
                          return (
                            <p
                              key={pi}
                              className={`text-sm leading-relaxed text-foreground/90 ${
                                isCurrent ? "ethel-caret" : ""
                              }`}
                            >
                              {shown}
                            </p>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}

                {phase === "done" && (
                  <div className="flex items-center justify-between border-t border-border pt-4">
                    <span className="flex items-center gap-1.5 text-sm text-primary">
                      <Check className="size-4" />
                      Audit-aware summary ready
                    </span>
                    <button
                      onClick={reset}
                      className="btn-anim inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
                    >
                      <RotateCcw className="size-3.5" />
                      Run again
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
