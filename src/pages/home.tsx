import * as React from "react"
import { ArrowRightIcon, CheckIcon, CopyIcon } from "lucide-react"
import { Link } from "react-router-dom"

import { cn } from "@/lib/utils"
import { badgeVariants } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { HeroStage, Wall } from "@/home/wall"
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"
import { Compare } from "@/site/compare"

/** The one command that installs the material, with a button that copies it. */
function InstallLine() {
  const { isCopied, copyToClipboard } = useCopyToClipboard()
  const command = `npx shadcn@latest add ${window.location.origin}${import.meta.env.BASE_URL.replace(/\/$/, "")}/r/solid-glass.json`
  return (
    <div className="glass-panel flex h-10 w-full max-w-md items-center gap-2.5 rounded-lg pr-1 pl-3.5 font-mono text-[12.5px]">
      <span className="text-muted-foreground select-none">$</span>
      <span className="min-w-0 flex-1 truncate">{command}</span>
      <Button variant="ghost" size="icon-sm" aria-label="Copy the command" onClick={() => copyToClipboard(command)}>
        {isCopied ? <CheckIcon /> : <CopyIcon />}
      </Button>
    </div>
  )
}

/** A stretch of the page: what it is about on the left, the thing itself on the right. */
function Section({ title, text, action, children }: { title: string; text: React.ReactNode; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="container-wrapper px-6">
      <div className="grid grid-cols-[minmax(0,1fr)] gap-8 border-t py-14 lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] lg:gap-16 lg:py-20">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{text}</p>
          {action && <div className="mt-5">{action}</div>}
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  )
}

const RULES = [
  { title: "The finish is at the edge", text: "A rim of light, a hairline and a shadow. Never a gradient or a highlight across the face." },
  { title: "Heavy, not airy", text: "Neutral grey. The blur softens what is behind a pane without boosting its colour." },
  { title: "Depth is thickness", text: "Panels are thinnest, cards in between, anything that floats is thickest, and thicker is more opaque." },
  { title: "One state", text: "Hovered, chosen and held open all wear the same small pane of clear glass, wherever they are." },
]

export function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="container-wrapper px-6">
        <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-12 py-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:py-16">
          <div className="flex min-w-0 flex-col items-start gap-5">
            <Link to="/docs/components/status-glyph" className={cn(badgeVariants({ variant: "secondary" }), "bg-muted")}>
              New Status Glyph component <ArrowRightIcon />
            </Link>
            <h1 className="text-5xl leading-[1.02] font-semibold tracking-tighter text-primary xl:text-7xl">
              Form with
              <br />
              substance.
            </h1>
            <p className="max-w-md text-base text-foreground sm:text-lg">
              Thick, smoky panes with the weight of a solid surface and the clarity of glass. Every component you already use, in one
              material.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <Link to="/docs/installation" className={cn(buttonVariants(), "h-[35px] px-3")}>
                Get Started
              </Link>
              <Link to="/docs/components" data-slot="button" data-variant="secondary" className={cn(buttonVariants({ variant: "secondary" }), "h-[35px] px-3")}>
                View Components
              </Link>
            </div>
            <InstallLine />
          </div>
          <HeroStage />
        </div>
      </section>

      <Section
        title="Between flat and liquid"
        text="Flat is an opaque block with no finish to speak of. Liquid glass is nearly clear, and the reader fights the background for the words. Solid Glass lets only an outline through: enough to know it is glass, not enough to get in the way of reading."
        action={
          <Link to="/docs/material" className="inline-flex items-center gap-1 text-sm font-medium underline-offset-4 hover:underline">
            How a pane is made <ArrowRightIcon className="size-3.5" />
          </Link>
        }
      >
        <Compare className="my-0" />
      </Section>

      <Section title="Four rules" text="Everything in the material follows from these, and anything added to it is held to them.">
        <div className="grid gap-4 sm:grid-cols-2">
          {RULES.map((rule, index) => (
            <div key={rule.title} className="glass-panel flex flex-col gap-2 rounded-xl p-5">
              <span className="font-mono text-xs text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="font-medium">{rule.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{rule.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Every component, one material"
        text="Forms, tables, menus, dialogs, charts: what an application is made of, as installed and unchanged. The stylesheet finds each part by the names it already carries."
        action={
          <Link to="/docs/components" className="inline-flex items-center gap-1 text-sm font-medium underline-offset-4 hover:underline">
            All components <ArrowRightIcon className="size-3.5" />
          </Link>
        }
      >
        <Wall />
      </Section>
    </div>
  )
}
