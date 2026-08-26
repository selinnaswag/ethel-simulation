import { Sparkles, Clock, ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-40 mx-auto h-[420px] max-w-4xl rounded-full bg-primary/20 opacity-40 blur-[120px]"
      />
      <div className="relative mx-auto max-w-4xl px-5 pt-20 pb-16 text-center sm:pt-28">
        <div className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-sm text-muted-foreground">
          <Sparkles className="size-3.5 text-primary" />
          Now live for every team in myCM
        </div>

        <h1 className="text-balance text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
          See what <span className="text-gradient">30 seconds</span> with Ethel looks like
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          Compliance teams spend hours re-reading case files just to brief a colleague or update
          leadership. Ethel — your AI Case Summary assistant inside myCM — turns any case into a
          structured, audit-aware summary with one click.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#demo"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground transition-transform hover:scale-[1.03] sm:w-auto"
          >
            Watch the 30-second demo
            <ArrowRight className="size-4" />
          </a>
          <a
            href="#roi"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-card/50 px-6 py-3.5 text-base font-semibold text-foreground transition-colors hover:bg-card sm:w-auto"
          >
            <Clock className="size-4 text-primary" />
            Calculate your time saved
          </a>
        </div>

        <dl className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-4 border-t border-border/60 pt-8">
          {[
            { v: "~30s", l: "to a full case summary" },
            { v: "3", l: "summary types, one click" },
            { v: "0", l: "case files to re-read" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <dt className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {s.v}
              </dt>
              <dd className="mt-1 text-sm text-muted-foreground text-pretty">{s.l}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
