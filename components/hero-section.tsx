import { Clock, Play, Sparkles, ArrowRight } from "lucide-react"
import { MyCmGraphic } from "@/components/mycm-graphic"

export function HeroSection() {
  return (
    <section id="top" className="relative overflow-hidden bg-background">
      {/* subtle grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,color-mix(in_oklch,var(--border)_55%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklch,var(--border)_55%,transparent)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_80%_70%_at_70%_10%,black,transparent)]"
      />
      {/* blue→teal wash sweeping from the right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-2/3 bg-[radial-gradient(ellipse_60%_80%_at_80%_30%,color-mix(in_oklch,var(--brand-blue)_16%,transparent),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-blue/50 to-transparent"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-[1.05fr_1fr] md:gap-8 md:py-20 lg:py-24">
        {/* Left: copy */}
        <div className="text-center md:text-left">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-sm text-foreground backdrop-blur">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full rounded-full bg-brand-teal opacity-75 animate-pulse-ring" />
              <span className="relative inline-flex size-2 rounded-full bg-brand-teal" />
            </span>
            Now live for every team in myCM
          </div>

          <h1 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Meet <span className="text-gradient">Ethel</span>.
            <br />
            Your case, summarized in <span className="text-gradient">30 seconds</span>.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:mx-0 lg:text-lg">
            Stop re-reading case files just to brief a colleague or update leadership. Ethel — your
            AI Case Summary assistant built into myCM — turns any case into a structured, audit-aware
            summary with a single click.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row md:justify-start">
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

          {/* inline stats */}
          <dl className="mx-auto mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-border/60 pt-6 md:mx-0">
            {[
              { v: "~30s", l: "to a summary", c: "text-brand-blue" },
              { v: "3", l: "summary types", c: "text-brand-teal" },
              { v: "0", l: "files to re-read", c: "text-brand-pink" },
            ].map((s) => (
              <div key={s.l} className="text-center md:text-left">
                <dt className={`text-3xl font-bold tracking-tight ${s.c}`}>{s.v}</dt>
                <dd className="mt-1 text-xs text-muted-foreground text-pretty">{s.l}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Right: SVG showcase */}
        <div className="relative">
          {/* teal→blue glow behind the frame */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-6 rounded-[40px] bg-[radial-gradient(ellipse_at_center,color-mix(in_oklch,var(--brand-teal)_22%,transparent),transparent_70%)] blur-2xl"
          />
          <div className="relative rounded-[calc(var(--radius)+8px)] bg-gradient-to-br from-brand-blue/50 via-brand-blue/20 to-brand-teal/50 p-px shadow-2xl shadow-black/50 lg:rotate-1 lg:transition-transform lg:duration-500 lg:hover:rotate-0">
            <div className="relative overflow-hidden rounded-[calc(var(--radius)+7px)] bg-card p-3">
              <MyCmGraphic className="h-auto w-full" />
            </div>

            {/* floating chips */}
            <div className="absolute -left-3 top-8 hidden items-center gap-2 rounded-xl border border-border bg-card/90 px-3 py-2 text-xs font-medium shadow-lg backdrop-blur sm:flex lg:-left-6">
              <span className="flex size-6 items-center justify-center rounded-md bg-brand-blue/15">
                <Sparkles className="size-3.5 text-brand-blue" />
              </span>
              One click, audit-aware
            </div>
            <div className="absolute -right-3 bottom-10 hidden items-center gap-2 rounded-xl border border-border bg-card/90 px-3 py-2 text-xs font-medium shadow-lg backdrop-blur sm:flex lg:-right-6">
              <span className="flex size-6 items-center justify-center rounded-md bg-brand-teal/15">
                <Clock className="size-3.5 text-brand-teal" />
              </span>
              Done in ~30 seconds
            </div>
          </div>

          {/* caption pill under the graphic */}
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <ArrowRight className="size-4 text-brand-teal" />
            A real myCM case, summarized live below
          </div>
        </div>
      </div>
    </section>
  )
}
