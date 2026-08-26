import { Clock, Play, Sparkles } from "lucide-react"
import { MyCmGraphic } from "@/components/mycm-graphic"

export function HeroSection() {
  return (
    <section id="top" className="relative overflow-hidden bg-background">
      {/* subtle grid + tri-color top wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,color-mix(in_oklch,var(--border)_55%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklch,var(--border)_55%,transparent)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_75%_60%_at_50%_0%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[linear-gradient(180deg,color-mix(in_oklch,var(--brand-pink)_10%,transparent),color-mix(in_oklch,var(--brand-blue)_8%,transparent)_40%,transparent_80%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-blue/50 to-transparent"
      />

      <div className="relative mx-auto max-w-4xl px-5 pt-16 pb-20 text-center sm:pt-20 lg:pt-24">
        {/* badge */}
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-sm text-foreground backdrop-blur">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full rounded-full bg-brand-teal opacity-75 animate-pulse-ring" />
            <span className="relative inline-flex size-2 rounded-full bg-brand-teal" />
          </span>
          Now live for every team in myCM
        </div>

        {/* headline */}
        <h1 className="mx-auto max-w-3xl text-balance text-5xl font-bold leading-[1.03] tracking-tight sm:text-6xl">
          Meet <span className="text-gradient">Ethel</span>. Your case, summarized in{" "}
          <span className="text-gradient">30 seconds</span>.
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
          Stop re-reading case files just to brief a colleague or update leadership. Ethel — your AI
          Case Summary assistant built into myCM — turns any case into a structured, audit-aware
          summary with a single click.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#playground"
            className="btn-anim btn-anim-primary inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to px-6 py-3.5 text-base font-semibold text-primary-foreground sm:w-auto"
          >
            <Play className="size-4 fill-current" />
            See what 30 seconds looks like
          </a>
          <a
            href="#roi"
            className="btn-anim inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-card/60 px-6 py-3.5 text-base font-semibold text-foreground hover:bg-card sm:w-auto"
          >
            <Clock className="size-4 text-brand-teal" />
            Calculate your time saved
          </a>
        </div>

        {/* SVG showcase */}
        <div className="relative mx-auto mt-16 max-w-3xl">
          {/* tri-color glow behind the frame */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-10 -top-10 bottom-0 rounded-[40px] bg-[radial-gradient(ellipse_at_center,color-mix(in_oklch,var(--brand-blue)_22%,transparent),transparent_70%)] blur-2xl"
          />
          <div className="relative rounded-[calc(var(--radius)+8px)] bg-gradient-to-br from-brand-pink/40 via-brand-blue/30 to-brand-teal/40 p-px shadow-2xl shadow-black/40">
            <div className="relative overflow-hidden rounded-[calc(var(--radius)+7px)] bg-card p-3">
              <MyCmGraphic className="h-auto w-full" />
            </div>

            {/* floating chips */}
            <div className="absolute -left-3 top-8 hidden items-center gap-2 rounded-xl border border-border bg-card/90 px-3 py-2 text-xs font-medium shadow-lg backdrop-blur sm:flex lg:-left-8">
              <span className="flex size-6 items-center justify-center rounded-md bg-brand-pink/15">
                <Sparkles className="size-3.5 text-brand-pink" />
              </span>
              One click, audit-aware
            </div>
            <div className="absolute -right-3 bottom-10 hidden items-center gap-2 rounded-xl border border-border bg-card/90 px-3 py-2 text-xs font-medium shadow-lg backdrop-blur sm:flex lg:-right-8">
              <span className="flex size-6 items-center justify-center rounded-md bg-brand-teal/15">
                <Clock className="size-3.5 text-brand-teal" />
              </span>
              Done in ~30 seconds
            </div>
          </div>
        </div>

        {/* stats */}
        <dl className="mx-auto mt-14 grid max-w-xl grid-cols-3 gap-4 border-t border-border/60 pt-8">
          {[
            { v: "~30s", l: "to a full case summary", c: "text-brand-pink" },
            { v: "3", l: "summary types, one click", c: "text-brand-blue" },
            { v: "0", l: "case files to re-read", c: "text-brand-teal" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <dt className={`text-3xl font-bold tracking-tight sm:text-4xl ${s.c}`}>{s.v}</dt>
              <dd className="mt-1 text-sm text-muted-foreground text-pretty">{s.l}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
