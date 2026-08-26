import { Check } from "lucide-react"

const modes = [
  {
    name: "Ethel Standard",
    tagline: "Consistent summaries, zero setup",
    features: [
      "One-click Case, Investigation & Executive summaries",
      "Structured What Happened / Key Facts / Current Status format",
      "Audit-aware — grounded only in the case record",
      "Built-in feedback loop that keeps improving",
    ],
    featured: false,
  },
  {
    name: "Ethel Custom",
    tagline: "Tune Ethel to your program",
    features: [
      "Everything in Standard, plus:",
      "Adjust tone, length and the fields Ethel emphasizes",
      "Tailor summaries to your team's templates and language",
      "Ask Ethel Anything — direct Q&A on any case",
    ],
    featured: true,
  },
]

export function ModesSection() {
  return (
    <section className="border-t border-border/60 bg-secondary/20">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Standard or custom
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Start in seconds. Tune it when you&apos;re ready.
          </h2>
        </div>

        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {modes.map((mode) => (
            <div
              key={mode.name}
              className={`rounded-2xl border p-8 ${
                mode.featured
                  ? "border-primary/50 bg-gradient-to-b from-primary/[0.1] to-transparent"
                  : "border-border bg-card"
              }`}
            >
              <h3 className="text-xl font-semibold text-foreground">{mode.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{mode.tagline}</p>
              <ul className="mt-6 space-y-3">
                {mode.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/90">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span className="leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
