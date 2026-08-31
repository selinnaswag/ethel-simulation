"use client"

import type React from "react"
import { useCallback, useEffect, useState } from "react"
import {
  Globe,
  X,
  Users,
  MapPin,
  TrendingUp,
  ShieldAlert,
  Scale,
  Building2,
  Languages,
  FileStack,
  Search,
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
  icon: typeof Users
  title: string
  prompt: string
  desc: string
}

const useCases: UseCase[] = [
  {
    icon: Users,
    title: "Repeat subjects",
    prompt: "Where else has this person or vendor appeared?",
    desc: "Link a named individual or third party across every case in the org, even under different spellings or languages.",
  },
  {
    icon: MapPin,
    title: "Location clusters",
    prompt: "Which sites have the most conduct reports this quarter?",
    desc: "Roll cases up by office, region, or business unit to see where risk concentrates.",
  },
  {
    icon: TrendingUp,
    title: "Emerging trends",
    prompt: "What categories are rising fastest vs. last quarter?",
    desc: "Surface category spikes and shifts before they show up in a scheduled report.",
  },
  {
    icon: ShieldAlert,
    title: "Retaliation & repeat risk",
    prompt: "Any follow-on reports tied to this reporter or subject?",
    desc: "Catch connected filings that signal retaliation or an escalating situation.",
  },
  {
    icon: Scale,
    title: "Consistency checks",
    prompt: "How were similar cases resolved and how long did they take?",
    desc: "Compare outcomes and cycle times across similar matters to keep decisions defensible.",
  },
  {
    icon: Building2,
    title: "Executive & board briefs",
    prompt: "Summarize all open bribery cases across EMEA.",
    desc: "Generate a multi-case brief scoped to a region, category, or time window in seconds.",
  },
  {
    icon: FileStack,
    title: "Document synthesis",
    prompt: "What do the attachments and witness statements agree on?",
    desc: "Reconcile intake forms, statements, and attachments across related cases into one view.",
  },
  {
    icon: Languages,
    title: "Cross-language reach",
    prompt: "Find related reports in any submission language.",
    desc: "Query once and match cases filed in any language, with source-cited answers.",
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
            return (
              <div
                key={u.title}
                className="rounded-xl border border-border bg-background/50 p-4 transition-colors hover:border-brand-teal/40"
              >
                <div className="flex items-center gap-2">
                  <span className="flex size-7 items-center justify-center rounded-lg bg-brand-teal/12">
                    <Icon className="size-3.5 text-brand-teal" />
                  </span>
                  <h4 className="text-sm font-semibold text-foreground">{u.title}</h4>
                </div>
                <div className="mt-2.5 flex items-start gap-1.5 rounded-lg border border-border/60 bg-secondary/40 px-2.5 py-1.5">
                  <Search className="mt-0.5 size-3 shrink-0 text-brand-blue" />
                  <p className="text-[11.5px] font-medium leading-snug text-foreground">
                    {'"'}
                    {u.prompt}
                    {'"'}
                  </p>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{u.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
