"use client"

import { useState } from "react"
import { summaries, summaryTabs, type SummaryKey } from "@/lib/ethel-data"

export function SummaryTypes() {
  const [active, setActive] = useState<SummaryKey>("case")
  const activeTab = summaryTabs.find((t) => t.key === active)!

  return (
    <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[280px_1fr]">
          {/* selector */}
          <div className="flex flex-col gap-2">
            {summaryTabs.map((tab) => {
              const isActive = tab.key === active
              return (
                <button
                  key={tab.key}
                  onClick={() => setActive(tab.key)}
                  aria-pressed={isActive}
                  className={`btn-anim rounded-xl border p-4 text-left ${
                    isActive
                      ? "border-primary/50 bg-primary/10"
                      : "border-border bg-card/40 hover:bg-card"
                  }`}
                >
                  <p
                    className={`font-semibold ${isActive ? "text-primary" : "text-foreground"}`}
                  >
                    {tab.label}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {tab.audience}
                  </p>
                </button>
              )
            })}
          </div>

          {/* output */}
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <p className="mb-6 text-pretty text-sm leading-relaxed text-muted-foreground">
              {activeTab.description}
            </p>
            <div className="space-y-6">
              {summaries[active].map((block) => (
                <div key={block.heading} className="animate-fade-up">
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
                    {block.heading}
                  </h3>
                  <div className="space-y-2">
                    {block.body.map((para, i) => (
                      <p key={i} className="text-sm leading-relaxed text-foreground/90">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
    </div>
  )
}
