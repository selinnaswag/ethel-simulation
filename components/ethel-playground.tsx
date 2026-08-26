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
    eyebrow: "The 30-second demo",
    title: "One click. A full summary. Your case still in view.",
    blurb:
      "This is a real myCM case view. Hit summarize and watch Ethel work — the case record stays right beside the summary the whole time.",
  },
  {
    key: "summaries",
    label: "Three summary types",
    icon: Layers,
    eyebrow: "Three summaries, one click",
    title: "Same case. The right summary for whoever's asking.",
    blurb:
      "Briefing your team, updating an investigator, or reporting to leadership? Ethel reshapes the same case into the format each audience needs. Flip between them.",
  },
  {
    key: "ask",
    label: "Ask Ethel anything",
    icon: MessageCircleQuestion,
    eyebrow: "Ask Ethel Anything",
    title: "Beyond summaries — question the case directly.",
    blurb:
      "Ethel answers questions grounded in the case record, every answer audit-aware. Try one of the prompts below.",
  },
] as const

type TabKey = (typeof tabs)[number]["key"]

export function EthelPlayground() {
  const [active, setActive] = useState<TabKey>("demo")
  const current = tabs.find((t) => t.key === active)!

  return (
    <section id="playground" className="scroll-mt-20 border-y border-border/60 bg-secondary/20">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            {current.eyebrow}
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            {current.title}
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">{current.blurb}</p>
        </div>

        {/* tab switcher */}
        <div
          role="tablist"
          aria-label="Explore Ethel"
          className="mx-auto mb-10 flex w-full max-w-xl flex-col gap-1.5 rounded-2xl border border-border bg-card/60 p-1.5 backdrop-blur sm:flex-row"
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
          {active === "demo" && <ThirtySecondDemo />}
          {active === "summaries" && <SummaryTypes />}
          {active === "ask" && <AskEthel />}
        </div>
      </div>
    </section>
  )
}
