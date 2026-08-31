"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import {
  Play,
  Layers,
  MessageCircleQuestion,
  TerminalSquare,
  Sparkles,
  ArrowDown,
  X,
} from "lucide-react"
import { ThirtySecondDemo } from "@/components/thirty-second-demo"
import { SummaryTypes } from "@/components/summary-types"
import { AskEthel } from "@/components/ask-ethel"

const tabs = [
  {
    key: "demo",
    label: "30-second demo",
    icon: Play,
    title: "One click, a full summary",
    blurb: "simulate it live below.",
  },
  {
    key: "summaries",
    label: "Three summary types",
    icon: Layers,
    title: "The right summary for every audience",
    blurb: "flip between them below.",
  },
  {
    key: "ask",
    label: "Ask Ethel anything",
    icon: MessageCircleQuestion,
    title: "Question the case directly",
    blurb: "try a grounded answer below.",
  },
] as const

type TabKey = (typeof tabs)[number]["key"]

/** Floating "we're doing more" nudge that points to the beta section. */
function MoreComingPopup() {
  const [show, setShow] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (dismissed) return
    const t = setTimeout(() => setShow(true), 3500)
    return () => clearTimeout(t)
  }, [dismissed])

  const goToBeta = () => {
    document.getElementById("beta")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  if (!show || dismissed) return null

  return (
    <div className="animate-beta-pop absolute bottom-4 left-4 z-30 w-[240px] rounded-xl border border-brand-blue/30 bg-card p-3.5 shadow-2xl shadow-black/30">
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss"
        className="btn-anim absolute right-2 top-2 flex size-5 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground"
      >
        <X className="size-3" />
      </button>
      <div className="flex items-center gap-1.5">
        <span className="flex size-6 items-center justify-center rounded-lg bg-brand-blue/15">
          <Sparkles className="size-3.5 text-brand-blue" />
        </span>
        <p className="text-sm font-bold text-foreground">We&apos;re doing more!</p>
      </div>
      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
        This is just the start — new AI superpowers are in private beta right now.
      </p>
      <button
        type="button"
        onClick={goToBeta}
        className="btn-anim btn-anim-primary mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to px-3 py-2 text-xs font-semibold text-primary-foreground"
      >
        See what&apos;s in beta
        <ArrowDown className="size-3.5" />
      </button>
    </div>
  )
}

export function EthelPlayground() {
  const [active, setActive] = useState<TabKey>("demo")
  const current = tabs.find((t) => t.key === active)!

  const listRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const [indicator, setIndicator] = useState({ left: 0, width: 0 })

  useLayoutEffect(() => {
    const update = () => {
      const el = tabRefs.current[active]
      if (el) setIndicator({ left: el.offsetLeft, width: el.offsetWidth })
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [active])

  return (
    <section id="playground" className="scroll-mt-16 border-y border-border/60 bg-secondary/20">
      <div className="mx-auto max-w-7xl px-5 py-7">
        {/* overarching header */}
        <div className="mx-auto mb-4 max-w-2xl text-center">
          <p className="mb-1.5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-brand-pink">
            <TerminalSquare className="size-3.5" />
            Ethel sandbox
          </p>
          <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">
            Play in the <span className="text-gradient">Ethel sandbox</span>
          </h2>
        </div>

        {/* sandbox window */}
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-border bg-card/40 shadow-xl shadow-black/20 backdrop-blur">
          <MoreComingPopup />
          {/* sandbox title bar */}
          <div className="flex items-center gap-3 border-b border-border/70 bg-secondary/40 px-4 py-2.5">
            <div className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-destructive/70" />
              <span className="size-2.5 rounded-full bg-brand-pink/70" />
              <span className="size-2.5 rounded-full bg-brand-teal/70" />
            </div>
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full rounded-full bg-brand-teal opacity-75 animate-pulse-ring" />
                <span className="relative inline-flex size-1.5 rounded-full bg-brand-teal" />
              </span>
              <span className="truncate">live · sample case CS-4471</span>
            </span>
          </div>

          {/* tab switcher row */}
          <div className="flex justify-center border-b border-border/70 bg-secondary/20 px-4 py-3">
            <div
              ref={listRef}
              role="tablist"
              aria-label="Explore Ethel"
              className="relative flex w-full max-w-md rounded-full border border-border bg-background/60 p-1 sm:w-auto sm:max-w-none"
            >
              {/* sliding pill */}
              <span
                aria-hidden="true"
                className="absolute inset-y-1 rounded-full bg-primary shadow-sm transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ left: indicator.left, width: indicator.width }}
              />
              {tabs.map((tab) => {
                const isActive = tab.key === active
                const Icon = tab.icon
                return (
                  <button
                    key={tab.key}
                    ref={(el) => {
                      tabRefs.current[tab.key] = el
                    }}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(tab.key)}
                    className={`relative z-10 flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors duration-200 sm:flex-none sm:px-4 ${
                      isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="size-3.5 shrink-0" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* sandbox body */}
          <div className="p-4 sm:p-6">
            <div role="tabpanel" className="animate-fade-up" key={active}>
              <p className="mx-auto mb-4 max-w-full truncate text-center text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{current.title}</span> —{" "}
                {current.blurb}
              </p>
              {active === "demo" && <ThirtySecondDemo />}
              {active === "summaries" && <SummaryTypes />}
              {active === "ask" && <AskEthel />}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
