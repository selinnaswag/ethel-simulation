"use client"

import { useEffect, useState } from "react"

const items = [
  { id: "top", label: "Overview" },
  { id: "playground", label: "Simulations" },
  { id: "roi", label: "Time saved" },
  { id: "how", label: "How it works" },
  { id: "modes", label: "Standard & custom" },
  { id: "activate", label: "Activate Ethel" },
] as const

export function TableOfContents() {
  const [active, setActive] = useState<string>("top")
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    )

    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Hand off from the hero panel to the sticky rail once the hero scrolls away.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 460)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const List = ({ withDots }: { withDots: boolean }) => (
    <ul className="space-y-1">
      {items.map((item) => {
        const isActive = active === item.id
        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`group flex items-center gap-3 rounded-r-lg border-l-2 py-1.5 pl-4 pr-3 text-sm transition-colors ${
                isActive
                  ? "border-brand-teal font-semibold text-foreground"
                  : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
              }`}
            >
              {withDots && (
                <span
                  aria-hidden="true"
                  className={`size-1.5 rounded-full transition-colors ${
                    isActive ? "bg-brand-teal" : "bg-muted-foreground/40 group-hover:bg-foreground"
                  }`}
                />
              )}
              {item.label}
            </a>
          </li>
        )
      })}
    </ul>
  )

  return (
    <>
      {/* Hero panel — visible over the hero, fades out as you scroll */}
      <nav
        aria-label="Table of contents"
        aria-hidden={scrolled}
        className={`fixed left-6 top-32 z-30 hidden w-44 rounded-2xl border border-border bg-card/70 p-4 backdrop-blur-xl transition-all duration-500 2xl:block ${
          scrolled ? "pointer-events-none -translate-y-2 opacity-0" : "opacity-100"
        }`}
      >
        <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-teal">
          <span className="h-px w-4 bg-brand-teal" />
          Table of Contents
        </p>
        <List withDots={false} />
      </nav>

      {/* Sticky rail — fades in once past the hero */}
      <nav
        aria-label="On this page"
        aria-hidden={!scrolled}
        className={`fixed left-6 top-1/2 z-30 hidden w-44 -translate-y-1/2 transition-all duration-500 2xl:block ${
          scrolled ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <p className="mb-4 pl-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          On this page
        </p>
        <List withDots />
      </nav>
    </>
  )
}
