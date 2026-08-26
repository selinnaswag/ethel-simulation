"use client"

import { useState } from "react"
import { Play, Layers, MessageCircleQuestion } from "lucide-react"
import { ThirtySecondDemo } from "@/components/thirty-second-demo"
import { SummaryTypes } from "@/components/summary-types"
import { AskEthel } from "@/components/ask-ethel"

const tabs = [
  {
    key: "demo",
    label: "30-second demo",
    icon: Play,
    title: "One click, a full summary",
    blurb: "Hit summarize and simulate a full 30-second case summary right here.",
  },
  {
    key: "summaries",
    label: "Three summary types",
    icon: Layers,
    title: "The right summary for whoever's asking",
    blurb: "Flip between the three summary types and simulate each audience view here.",
  },
  {
    key: "ask",
    label: "Ask Ethel anything",
    icon: MessageCircleQuestion,
    title: "Question the case directly",
    blurb: "Ask a question about the sample case and simulate Ethel's grounded answer here.",
  },
] as const

type TabKey = (typeof tabs)[number]["key"]

export function EthelPlayground() {
  const [active, setActive] = useState<TabKey>("demo")
  const current = tabs.find((t) => t.key === active)!

  return (
    <section id="playground" className="scroll-mt-16 border-y border-border/60 bg-secondary/20">
      <div className="mx-auto max-w-7xl px-5 py-7">
        {/* overarching header */}
        <div className="mx-auto mb-4 max-w-2xl text-center">
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-brand-pink">
            Interactive simulations
          </p>
          <h2 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">
            Try Ethel yourself — <span className="text-gradient">three simulations</span>
          </h2>
        </div>

        {/* tab switcher */}
        <div
          role="tablist"
          aria-label="Explore Ethel"
          className="mx-auto mb-3 flex w-full max-w-xl flex-col gap-1.5 rounded-2xl border border-border bg-card/60 p-1.5 backdrop-blur sm:flex-row"
        >
          {tabs.map((tab) => {
            const isActive = tab.key === active
            const Icon = tab.icon
            return (
              <button
                key={tab.key}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(tab.key)}
                className={`btn-anim flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="size-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* active panel */}
        <div role="tabpanel" className="animate-fade-up" key={active}>
          <p className="mx-auto mb-3 max-w-2xl text-center text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{current.title}.</span> {current.blurb}
          </p>
          {active === "demo" && <ThirtySecondDemo />}
          {active === "summaries" && <SummaryTypes />}
          {active === "ask" && <AskEthel />}
        </div>
      </div>
    </section>
  )
}
