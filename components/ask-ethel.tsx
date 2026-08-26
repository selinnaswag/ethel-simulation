"use client"

import { useEffect, useRef, useState } from "react"
import { Sparkles, CornerDownLeft } from "lucide-react"
import { suggestedPrompts } from "@/lib/ethel-data"

type Msg = { role: "user" | "ethel"; text: string; typing?: boolean }

export function AskEthel() {
  const [messages, setMessages] = useState<Msg[]>([])
  const [used, setUsed] = useState<number[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages])

  function ask(index: number) {
    const prompt = suggestedPrompts[index]
    if (used.includes(index)) return
    setUsed((u) => [...u, index])
    setMessages((m) => [...m, { role: "user", text: prompt.q }])
    // simulate Ethel thinking + answering
    setTimeout(() => {
      setMessages((m) => [...m, { role: "ethel", text: prompt.a, typing: true }])
    }, 550)
    setTimeout(() => {
      setMessages((m) =>
        m.map((msg) => (msg.typing ? { ...msg, typing: false } : msg)),
      )
    }, 1400)
  }

  const remaining = suggestedPrompts
    .map((_, i) => i)
    .filter((i) => !used.includes(i))

  return (
    <div className="mx-auto max-w-2xl overflow-hidden rounded-2xl border border-border bg-card">
        <div className="flex items-center gap-2 border-b border-border bg-secondary/40 px-4 py-3 text-sm font-medium">
          <Sparkles className="size-4 text-primary" />
          Ask Ethel — case {`{`}Expense reimbursement discrepancy{`}`}
        </div>

        <div ref={scrollRef} className="flex h-[320px] flex-col gap-4 overflow-y-auto p-5">
          {messages.length === 0 && (
            <div className="flex h-full items-center justify-center text-center text-sm text-muted-foreground">
              Pick a question below to see how Ethel responds.
            </div>
          )}
          {messages.map((m, i) =>
            m.role === "user" ? (
              <div key={i} className="flex justify-end">
                <p className="max-w-[80%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground">
                  {m.text}
                </p>
              </div>
            ) : (
              <div key={i} className="flex justify-start gap-2.5">
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/15">
                  <Sparkles className="size-3.5 text-primary" />
                </span>
                <p className="max-w-[80%] rounded-2xl rounded-bl-sm bg-secondary px-4 py-2.5 text-sm leading-relaxed text-foreground">
                  {m.typing ? (
                    <span className="inline-flex gap-1 py-1">
                      <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                      <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                      <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground" />
                    </span>
                  ) : (
                    m.text
                  )}
                </p>
              </div>
            ),
          )}
        </div>

        <div className="border-t border-border p-4">
          {remaining.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {remaining.map((i) => (
                <button
                  key={i}
                  onClick={() => ask(i)}
                  className="btn-anim inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-3 py-1.5 text-sm text-foreground hover:border-primary/50 hover:bg-primary/10"
                >
                  {suggestedPrompts[i].q}
                  <CornerDownLeft className="size-3.5 text-muted-foreground" />
                </button>
              ))}
            </div>
          ) : (
            <p className="text-center text-sm text-muted-foreground">
              That&apos;s the demo set — in myCM you can ask anything about the case.
            </p>
          )}
      </div>
    </div>
  )
}
