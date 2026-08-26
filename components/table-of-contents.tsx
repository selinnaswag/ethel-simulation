"use client"

import { useEffect, useState } from "react"

const items = [
  { id: "top", label: "Overview" },
  { id: "playground", label: "Simulations" },
  { id: "roi", label: "Pain points" },
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
      aria-label="Table of contents"
      className="group fixed left-0 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
    >
      {/* tiny edge tab */}
      <div className="flex items-center rounded-r-xl border border-l-0 border-border bg-card/80 py-3 pl-2 pr-2.5 shadow-lg backdrop-blur-xl transition-colors group-hover:border-brand-teal/40">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-brand-teal [writing-mode:vertical-rl] rotate-180">
          Table of Contents
        </span>
      </div>

      {/* expandable panel on hover/focus */}
      <div className="pointer-events-none absolute left-full top-1/2 ml-2 w-52 -translate-x-2 -translate-y-1/2 rounded-2xl border border-border bg-card/95 p-3 opacity-0 shadow-2xl backdrop-blur-xl transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-x-0 group-focus-within:opacity-100">
        <p className="mb-2 pl-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          On this page
        </p>
        <ul className="space-y-0.5">
          {items.map((item) => {
            const isActive = active === item.id
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`group/link flex items-center gap-2.5 rounded-r-lg border-l-2 py-1.5 pl-3 pr-3 text-sm transition-colors ${
                    isActive
                      ? "border-brand-teal font-semibold text-foreground"
                      : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`size-1.5 rounded-full transition-colors ${
                      isActive
                        ? "bg-brand-teal"
                        : "bg-muted-foreground/40 group-hover/link:bg-foreground"
                    }`}
                  />
                  {item.label}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
