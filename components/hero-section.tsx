import { Clock, Play, Sparkles } from "lucide-react"
import { MyCmGraphic } from "@/components/mycm-graphic"
import { OpenQuizButton } from "@/components/pain-point-quiz"
import { JoinBetaButton } from "@/components/beta-program"

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

      <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-5 py-10 md:grid-cols-[1.05fr_1fr] md:gap-8 md:py-14">
        {/* Left: copy */}
        <div className="text-center md:text-left">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-sm text-foreground backdrop-blur">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full rounded-full bg-brand-teal opacity-75 animate-pulse-ring" />
              <span className="relative inline-flex size-2 rounded-full bg-brand-teal" />
            </span>
            Now live for every team in myCM
          </div>

          <h1 className="text-balance text-4xl font-bold leading-[1.03] tracking-tight sm:text-5xl lg:text-6xl">
            Meet <span className="text-gradient">Ethel</span>.
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-pretty text-sm leading-relaxed text-muted-foreground md:mx-0 lg:text-base">
            Your AI Case Summary assistant built into myCM — turns any case into a structured,
            audit-aware summary with a single click.
          </p>

          <div className="mt-6 flex flex-row flex-nowrap items-center justify-center gap-2.5 md:justify-start">
            <a
              href="#playground"
              className="btn-anim btn-anim-primary inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to px-4 py-2.5 text-[13px] font-semibold text-primary-foreground"
            >
              <Play className="size-3.5 shrink-0 fill-current" />
              See the 30-second demo
            </a>
            <OpenQuizButton className="btn-anim inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-border bg-card/60 px-4 py-2.5 text-[13px] font-semibold text-foreground hover:bg-card">
              <Clock className="size-3.5 shrink-0 text-brand-teal" />
              Take the pain-point quiz
            </OpenQuizButton>
          </div>
        </div>

        {/* Right: SVG showcase — no frame */}
        <div className="relative">
          {/* teal→blue glow behind the graphic */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-6 rounded-[40px] bg-[radial-gradient(ellipse_at_center,color-mix(in_oklch,var(--brand-teal)_20%,transparent),transparent_70%)] blur-2xl"
          />
          <div className="relative lg:rotate-1 lg:transition-transform lg:duration-500 lg:hover:rotate-0">
            <MyCmGraphic className="h-auto w-full drop-shadow-2xl" />

            {/* floating chips */}
            <div className="btn-anim absolute -left-3 top-8 hidden items-center gap-2 rounded-xl border border-border bg-card/90 px-3 py-2 text-xs font-medium shadow-lg backdrop-blur sm:flex lg:-left-6">
              <span className="flex size-6 items-center justify-center rounded-md bg-brand-blue/15">
                <Sparkles className="size-3.5 text-brand-blue" />
              </span>
              One click, audit-aware
            </div>
            <div className="btn-anim absolute -right-3 bottom-6 hidden items-center gap-2 rounded-xl border border-border bg-card/90 px-3 py-2 text-xs font-medium shadow-lg backdrop-blur sm:flex lg:-right-6">
              <span className="flex size-6 items-center justify-center rounded-md bg-brand-teal/15">
                <Clock className="size-3.5 text-brand-teal" />
              </span>
              Done in ~30 seconds
            </div>

            {/* animated pop-out beta CTA */}
            <div className="animate-beta-pop absolute -right-2 -top-4 z-10 lg:-right-8 lg:-top-6">
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-brand-blue/40 blur-md"
              />
              <JoinBetaButton
                count={18}
                className="btn-anim btn-anim-primary inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to px-4 py-2 text-[13px] font-bold text-primary-foreground shadow-xl ring-2 ring-background"
              >
                <Sparkles className="size-3.5" />
                Join the beta
              </JoinBetaButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
