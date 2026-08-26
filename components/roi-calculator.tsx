"use client"

import { useState } from "react"
import { Clock } from "lucide-react"

function Slider({
  label,
  value,
  min,
  max,
  step,
  suffix,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  suffix: string
  onChange: (v: number) => void
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <label className="text-sm font-medium text-foreground">{label}</label>
        <span className="font-mono text-sm text-primary">
          {value}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-primary"
        aria-label={label}
      />
    </div>
  )
}

export function RoiCalculator() {
  const [people, setPeople] = useState(8)
  const [casesPerWeek, setCasesPerWeek] = useState(6)
  const [minutesEach, setMinutesEach] = useState(18)

  // Ethel does it in ~30s; assume ~1 min of review to stay conservative.
  const manualWeekly = people * casesPerWeek * minutesEach
  const ethelWeekly = people * casesPerWeek * 1
  const savedWeeklyMin = Math.max(manualWeekly - ethelWeekly, 0)
  const savedHoursMonth = Math.round((savedWeeklyMin * 4.33) / 60)
  const savedDaysYear = Math.round((savedWeeklyMin * 52) / 60 / 8)

  return (
    <section id="roi" className="scroll-mt-20 border-y border-border/60 bg-secondary/20">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Your time back
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            How many hours is your team re-reading case files?
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Adjust the numbers for your team and see what switching to Ethel gives back.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-6 lg:grid-cols-2">
          <div className="space-y-7 rounded-2xl border border-border bg-card p-6 sm:p-8">
            <Slider
              label="People writing summaries"
              value={people}
              min={1}
              max={50}
              step={1}
              suffix=""
              onChange={setPeople}
            />
            <Slider
              label="Cases summarized per person / week"
              value={casesPerWeek}
              min={1}
              max={40}
              step={1}
              suffix=""
              onChange={setCasesPerWeek}
            />
            <Slider
              label="Minutes spent per summary today"
              value={minutesEach}
              min={5}
              max={60}
              step={1}
              suffix=" min"
              onChange={setMinutesEach}
            />
          </div>

          <div className="flex flex-col justify-center rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/[0.12] to-transparent p-6 text-center sm:p-8">
            <div className="mb-2 flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground">
              <Clock className="size-4 text-primary" />
              With Ethel, your team gets back
            </div>
            <p className="text-6xl font-bold tracking-tight text-gradient sm:text-7xl">
              {savedHoursMonth.toLocaleString()}
            </p>
            <p className="mt-1 text-lg font-medium text-foreground">hours every month</p>
            <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground">
              That&apos;s about{" "}
              <span className="font-semibold text-foreground">{savedDaysYear} working days</span> a
              year handed back to your team — time for the investigation, not the paperwork.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
