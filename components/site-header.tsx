import Image from "next/image"
import { Sparkles, ArrowDown } from "lucide-react"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#top" className="flex items-center gap-2.5">
          <Image
            src="/ethico-logo.png"
            alt="Ethico"
            width={110}
            height={28}
            priority
            className="h-6 w-auto"
          />
          <span className="hidden h-4 w-px bg-border sm:block" aria-hidden="true" />
          <span className="hidden items-center gap-1.5 text-sm font-medium text-muted-foreground sm:flex">
            <Sparkles className="size-3.5 text-primary" />
            Ethel AI
          </span>
        </a>

        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          <a href="#playground" className="transition-colors hover:text-foreground">
            Try it live
          </a>
          <a href="#roi" className="transition-colors hover:text-foreground">
            Pain points
          </a>
          <a href="#how" className="transition-colors hover:text-foreground">
            How it works
          </a>
        </nav>

        <a
          href="#playground"
          className="btn-anim btn-anim-primary group/cta inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          Test Ethel Now
          <ArrowDown className="size-4 transition-transform duration-300 group-hover/cta:translate-y-0.5" />
        </a>
      </div>
    </header>
  )
}
