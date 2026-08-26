import { Sparkles, ArrowRight } from "lucide-react"

export function AdoptionCta() {
  return (
    <section className="relative overflow-hidden px-5 py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 mx-auto h-72 max-w-3xl -translate-y-1/2 rounded-full bg-primary/20 opacity-40 blur-[120px]"
      />
      <div className="relative mx-auto max-w-2xl text-center">
        <span className="mb-6 inline-flex size-12 items-center justify-center rounded-2xl bg-primary/15">
          <Sparkles className="size-6 text-primary" />
        </span>
        <h2 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          Your next case is 30 seconds from summarized.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
          Ethel is already waiting in your myCM case view. Open a case, click summarize, and never
          re-read a file just to brief someone again.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#top"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground transition-transform hover:scale-[1.03] sm:w-auto"
          >
            Open Ethel in myCM
            <ArrowRight className="size-4" />
          </a>
          <a
            href="#demo"
            className="inline-flex w-full items-center justify-center rounded-full border border-border bg-card/50 px-7 py-3.5 text-base font-semibold text-foreground transition-colors hover:bg-card sm:w-auto"
          >
            Replay the demo
          </a>
        </div>
      </div>
    </section>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-10 text-sm text-muted-foreground sm:flex-row">
        <span className="text-base font-bold tracking-tight text-foreground">
          ETHIC<span className="text-primary">O</span>
        </span>
        <p className="text-pretty text-center">
          Ethel — AI Case Summary, built into myCM. Audit-aware by design.
        </p>
        <a href="mailto:sales@ethico.com" className="transition-colors hover:text-foreground">
          sales@ethico.com
        </a>
      </div>
    </footer>
  )
}
