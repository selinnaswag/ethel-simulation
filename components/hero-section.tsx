import Image from "next/image"
import { ArrowRight, Clock, Play } from "lucide-react"

export function HeroSection() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-primary/20 opacity-40 blur-[130px]"
      />
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 pt-16 pb-16 sm:pt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:pt-24">
        {/* Left: copy */}
        <div className="text-center lg:text-left">
          <div className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-sm text-muted-foreground lg:mx-0">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full rounded-full bg-primary opacity-75 animate-pulse-ring" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            Now live for every team in myCM
          </div>

          <h1 className="text-balance text-5xl font-bold leading-[1.04] tracking-tight sm:text-6xl">
            Meet <span className="text-gradient">Ethel</span>. Your case, summarized in{" "}
            <span className="text-gradient">30 seconds</span>.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground lg:mx-0">
            Stop re-reading case files just to brief a colleague or update leadership. Ethel — your
            AI Case Summary assistant built into myCM — turns any case into a structured,
            audit-aware summary with a single click.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <a
              href="#demo"
              className="btn-anim btn-anim-primary inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground sm:w-auto"
            >
              <Play className="size-4 fill-current" />
              See what 30 seconds looks like
            </a>
            <a
              href="#roi"
              className="btn-anim inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-card/50 px-6 py-3.5 text-base font-semibold text-foreground hover:bg-card sm:w-auto"
            >
              <Clock className="size-4 text-primary" />
              Calculate your time saved
            </a>
          </div>

          <dl className="mx-auto mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-border/60 pt-8 lg:mx-0">
            {[
              { v: "~30s", l: "to a full case summary" },
              { v: "3", l: "summary types, one click" },
              { v: "0", l: "case files to re-read" },
            ].map((s) => (
              <div key={s.l} className="text-center lg:text-left">
                <dt className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {s.v}
                </dt>
                <dd className="mt-1 text-sm text-muted-foreground text-pretty">{s.l}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Right: isometric myCM visual */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 mx-auto my-auto h-3/4 w-3/4 rounded-full bg-accent/25 opacity-50 blur-[90px]"
          />
          <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-card/30 shadow-2xl shadow-black/50">
            <Image
              src="/mycm-isometric.png"
              alt="Isometric view of the myCM case management dashboard with Ethel AI generating a structured case summary alongside the case list"
              width={1024}
              height={1024}
              priority
              className="h-auto w-full"
            />
            {/* subtle top sheen */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
