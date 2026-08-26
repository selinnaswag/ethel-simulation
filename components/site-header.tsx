import { Sparkles, ArrowRight } from "lucide-react"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="text-lg font-bold tracking-tight">
            ETHIC<span className="text-primary">O</span>
          </span>
          <span className="hidden h-4 w-px bg-border sm:block" aria-hidden="true" />
          <span className="hidden items-center gap-1.5 text-sm font-medium text-muted-foreground sm:flex">
            <Sparkles className="size-3.5 text-primary" />
            Ethel AI
          </span>
        </a>

        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          <a href="#demo" className="transition-colors hover:text-foreground">
            30-second demo
          </a>
          <a href="#summaries" className="transition-colors hover:text-foreground">
            Summary types
          </a>
          <a href="#ask" className="transition-colors hover:text-foreground">
            Ask Ethel
          </a>
          <a href="#roi" className="transition-colors hover:text-foreground">
            Time saved
          </a>
        </nav>

        <a
          href="#demo"
          className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
        >
          Try Ethel in myCM
          <ArrowRight className="size-4" />
        </a>
      </div>
    </header>
  )
}
