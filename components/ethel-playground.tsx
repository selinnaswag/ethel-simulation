"use client"

import { useState } from "react"
import { Play, Layers, MessageCircleQuestion, TerminalSquare } from "lucide-react"
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

export function EthelPlayground() {
  const [active, setActive] = useState<TabKey>("demo")
  const current = tabs.find((t) => t.key === active)!
  const activeIndex = tabs.findIndex((t) => t.key === active)

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
        <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-border bg-card/40 shadow-xl shadow-black/20 backdrop-blur">
          {/* sandbox toolbar */}
          <div className="flex flex-col gap-3 border-b border-border/70 bg-secondary/40 px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between">
            {/* window dots + live status */}
            <div className="flex items-center gap-3 pl-1">
              <div className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-destructive/70" />
                <span className="size-2.5 rounded-full bg-brand-pink/70" />
                <span className="size-2.5 rounded-full bg-brand-teal/70" />
              </div>
              <span className="hidden items-center gap-1.5 font-mono text-[11px] text-muted-foreground sm:flex">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full rounded-full bg-brand-teal opacity-75 animate-pulse-ring" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-brand-teal" />
                </span>
                live · sample case CS-4471
              </span>
            </div>

            {/* skinny tab switcher with sliding indicator */}
            <div
              role="tablist"
              aria-label="Explore Ethel"
              className="relative flex w-full rounded-full border border-border bg-background/60 p-1 sm:w-auto"
            >
              {/* sliding pill */}
              <span
                aria-hidden="true"
                className="absolute inset-y-1 rounded-full bg-primary shadow-sm transition-[left] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  width: `calc((100% - 0.5rem) / ${tabs.length})`,
                  left: `calc(0.25rem + ${activeIndex} * (100% - 0.5rem) / ${tabs.length})`,
                }}
              />
              {tabs.map((tab) => {
                const isActive = tab.key === active
                const Icon = tab.icon
                return (
                  <button
                    key={tab.key}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(tab.key)}
                    className={`relative z-10 flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors duration-200 sm:flex-none ${
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
