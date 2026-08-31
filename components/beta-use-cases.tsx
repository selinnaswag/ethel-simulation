"use client"

import type React from "react"
import { useCallback, useEffect, useState } from "react"
import {
  Globe,
  X,
  Search,
  TrendingUp,
  GitCompare,
  FileDown,
  Columns3,
  Eye,
  Wand2,
  Info,
} from "lucide-react"

const OPEN_EVENT = "ethel:open-usecases"

export function ViewUseCasesButton({
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

type UseCase = {
  icon: typeof Globe
  title: string
  desc: string
  prompt?: string
  chips?: string[]
  note?: boolean
}

const useCases: UseCase[] = [
  {
    icon: TrendingUp,
    title: "Org-wide querying",
    prompt:
      "Are we seeing more harassment complaints out of the Los Angeles location this quarter compared to last?",
    desc: "Ask across your whole organization and get a narrative summary synthesized from every matching case.",
  },
  {
    icon: GitCompare,
    title: "Cross-case similarity search",
    prompt: "Are there any similar cases to this one?",
    desc: "Right inside the case panel, Ethel finds related cases system-wide — matching subjects and overlapping findings.",
  },
  {
    icon: FileDown,
    title: "Document export",
    chips: ["Word", "Excel", "PDF", "PowerPoint"],
    desc: "Export any generation to the format you need, ready to share.",
  },
  {
    icon: Columns3,
    title: "Custom Excel columns",
    desc: "Excel export lets you pick the exact fields — Case Manager, Case Number, Category, Case Status — instead of a fixed template.",
  },
  {
    icon: Eye,
    title: "Preview before download",
    desc: "Generated documents show an expected-output preview in the panel before you commit to downloading.",
  },
  {
    icon: Wand2,
    title: "In-flow revision",
    prompt: "Add an executive summary at the beginning.",
    desc: "Request changes in plain language and Ethel updates the same document rather than starting over.",
  },
  {
    icon: Info,
    title: "About styling in beta",
    note: true,
    desc: "During beta, generation focuses on getting the content right. Export your document and apply your own styling and branding afterward.",
  },
]

export function UseCasesModal() {
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    const onOpen = () => setOpen(true)
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
      aria-label="Ethel Global use cases"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={close}
        className="animate-fade-up absolute inset-0 bg-background/80 backdrop-blur-sm"
      />

      <div className="animate-fade-up relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/50">
        {/* header */}
        <div className="flex items-center gap-3 border-b border-border/70 bg-secondary/40 px-5 py-3">
          <span className="flex size-8 items-center justify-center rounded-lg bg-brand-teal/15">
            <Globe className="size-4 text-brand-teal" />
          </span>
          <div>
            <p className="text-sm font-semibold text-foreground">Ethel Global — use cases</p>
            <p className="text-xs text-muted-foreground">
              Ways teams put org-wide, cross-case reasoning to work
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="btn-anim ml-auto flex size-7 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* grid of use cases */}
        <div className="grid gap-3 overflow-y-auto p-5 sm:grid-cols-2">
          {useCases.map((u) => {
            const Icon = u.icon
            if (u.note) {
              return (
                <div
                  key={u.title}
                  className="flex items-start gap-3 rounded-xl border border-brand-pink/30 bg-brand-pink/[0.06] p-4 sm:col-span-2"
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-brand-pink/15">
                    <Icon className="size-3.5 text-brand-pink" />
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">{u.title}</h4>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{u.desc}</p>
                  </div>
                </div>
              )
            }
            return (
              <div
                key={u.title}
                className="flex flex-col rounded-xl border border-border bg-background/50 p-4 transition-colors hover:border-brand-teal/40"
              >
                <div className="flex items-center gap-2">
                  <span className="flex size-7 items-center justify-center rounded-lg bg-brand-teal/12">
                    <Icon className="size-3.5 text-brand-teal" />
                  </span>
                  <h4 className="text-sm font-semibold text-foreground">{u.title}</h4>
                </div>

                {u.prompt && (
                  <div className="mt-2.5 flex items-start gap-1.5 rounded-lg border border-border/60 bg-secondary/40 px-2.5 py-1.5">
                    <Search className="mt-0.5 size-3 shrink-0 text-brand-blue" />
                    <p className="text-[11.5px] font-medium leading-snug text-foreground">
                      {'"'}
                      {u.prompt}
                      {'"'}
                    </p>
                  </div>
                )}

                {u.chips && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {u.chips.map((c) => (
                      <span
                        key={c}
                        className="rounded-md border border-border/60 bg-secondary/40 px-2 py-0.5 text-[10.5px] font-semibold text-foreground"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                )}

                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{u.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
