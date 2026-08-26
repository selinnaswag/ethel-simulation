import { MousePointerClick, Sparkles, SlidersHorizontal, Share2 } from "lucide-react"

const steps = [
  {
    icon: MousePointerClick,
    title: "Open any case",
    body: "Work as you always do inside the myCM case view — nothing new to learn.",
  },
  {
    icon: Sparkles,
    title: "Click summarize",
    body: "Ethel reads the full record and drafts a structured, audit-aware summary in seconds.",
  },
  {
    icon: SlidersHorizontal,
    title: "Pick the format",
    body: "Choose a Case, Investigation, or Executive summary — or ask Ethel a direct question.",
  },
  {
    icon: Share2,
    title: "Brief & move on",
    body: "Share it upward or hand off to a colleague. The case record stayed visible the whole time.",
  },
]

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
          How it works
        </p>
        <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          Four steps you already know
        </h2>
      </div>

      <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <li key={step.title} className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary/15">
                <step.icon className="size-5 text-primary" />
              </span>
              <span className="font-mono text-sm text-muted-foreground">
                0{i + 1}
              </span>
            </div>
            <h3 className="font-semibold text-foreground">{step.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground text-pretty">
              {step.body}
            </p>
          </li>
        ))}
      </ol>
    </section>
  )
}
