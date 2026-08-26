"use client"

import { useEffect, useState } from "react"
import { Mail, X, ArrowRight, Sparkles, Check } from "lucide-react"

const CONTACT_EMAIL = "clientsuccess@ethico.com"

export function ContactCta() {
  const [open, setOpen] = useState(false)

  // Close on Escape and lock body scroll while the popup is open
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open])

  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    "Activating Ethel AI for our team in myCM",
  )}&body=${encodeURIComponent(
    "Hi Client Success team,\n\nWe'd like to learn more about activating Ethel AI (AI Case Summary) for our team in myCM. Could you walk us through enabling it?\n\nThanks,",
  )}`

  return (
    <>
      {/* Fixed side button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="btn-anim btn-anim-primary fixed right-0 top-1/2 z-40 flex -translate-y-1/2 items-center gap-2 rounded-l-2xl bg-primary py-3 pl-4 pr-3 text-sm font-semibold text-primary-foreground shadow-lg"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <Mail className="size-4" />
        <span className="hidden sm:inline">Activate Ethel</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-title"
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close dialog"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-background/70 backdrop-blur-sm"
          />

          {/* Card */}
          <div className="animate-fade-up relative w-full max-w-md overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-2xl">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-primary/20 blur-3xl"
            />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="btn-anim absolute right-4 top-4 inline-flex size-8 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>

            <span className="mb-5 inline-flex size-11 items-center justify-center rounded-2xl bg-primary/15">
              <Sparkles className="size-5 text-primary" />
            </span>

            <h2 id="contact-title" className="text-balance text-2xl font-bold tracking-tight">
              Activate Ethel for your team
            </h2>
            <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
              Ethel is live for every team in myCM. Reach out to Client Success and we&apos;ll help
              you turn it on, tailor summary types, and roll it out to your investigators.
            </p>

            <ul className="mt-5 space-y-2.5">
              {[
                "Guided enablement in your myCM workspace",
                "Standard & custom summary configuration",
                "Rollout tips to drive team adoption",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>

            <a
              href={mailto}
              className="btn-anim btn-anim-primary mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground"
            >
              Email Client Success
              <ArrowRight className="size-4" />
            </a>
            <p className="mt-3 text-center text-sm text-muted-foreground">
              or write to{" "}
              <a
                href={mailto}
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  )
}
