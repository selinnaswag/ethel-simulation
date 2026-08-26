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

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top that is intersecting.
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

  return (
    <nav
      aria-label="On this page"
      className="fixed left-6 top-1/2 z-30 hidden -translate-y-1/2 xl:block"
    >
      <p className="mb-4 pl-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        On this page
      </p>
      <ul className="space-y-1">
        {items.map((item) => {
          const isActive = active === item.id
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`group flex items-center gap-3 rounded-r-lg border-l-2 py-1.5 pl-4 pr-3 text-sm transition-colors ${
                  isActive
                    ? "border-brand-pink font-semibold text-foreground"
                    : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`size-1.5 rounded-full transition-colors ${
                    isActive ? "bg-brand-pink" : "bg-muted-foreground/40 group-hover:bg-foreground"
                  }`}
                />
                {item.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
