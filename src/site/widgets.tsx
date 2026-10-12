import * as React from "react"

import { cn } from "@/lib/utils"
import { Compare } from "@/site/compare"

/** The three thicknesses side by side, each lying over the same lines of text. */
function Thickness() {
  const panes = [
    { name: "Panel", use: "glass-panel", token: "--panel", cls: "glass-panel", note: "Thinnest. The columns of a page, code, lists of calls." },
    { name: "Card", use: "bg-card", token: "--card", cls: "bg-card", note: "In between. A composer, a block of content on its own." },
    { name: "Popover", use: "bg-popover", token: "--popover", cls: "bg-popover", note: "Thickest. Menus, dialogs, anything that floats." },
  ]
  return (
    <div className="my-6 grid gap-4 sm:grid-cols-3">
      {panes.map((pane) => (
        <div key={pane.name}>
          <div className="relative flex h-36 items-center justify-center overflow-hidden rounded-xl border bg-transparent">
            {/* what is behind the pane: the thicker the glass, the less of this shows */}
            <p aria-hidden className="absolute inset-x-0 px-3 font-mono text-[13px] leading-[1.35] break-all text-foreground/55 select-none">
              {"solid glass · ".repeat(30)}
            </p>
            <div className={cn("relative flex h-20 w-[78%] items-center justify-center rounded-lg text-[13px]", pane.cls)}>{pane.name}</div>
          </div>
          <p className="mt-2.5 text-[13px]">
            <code className="rounded-md bg-muted px-[0.3rem] py-[0.2rem] font-mono text-[0.8rem]">{pane.use}</code>
            <span className="ml-2 font-mono text-[11.5px] text-muted-foreground">{pane.token}</span>
          </p>
          <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{pane.note}</p>
        </div>
      ))}
    </div>
  )
}

/** What a pane's edge is made of, one layer at a time and then together. */
function Finish() {
  const layers = [
    { name: "Rim", token: "--glass-rim", shadow: "inset 0 1px 0 var(--glass-rim)" },
    { name: "Hairline", token: "--glass-edge", shadow: "0 0 0 1px var(--glass-edge), inset 0 0 0 1px var(--glass-inner)" },
    { name: "Shade", token: "--glass-shade", shadow: "0 1px 2px var(--glass-contact), 0 12px 32px -14px var(--glass-shade)" },
    {
      name: "Together",
      token: "bg-card",
      shadow:
        "inset 0 1px 0 var(--glass-rim), inset 0 0 0 1px var(--glass-inner), 0 0 0 1px var(--glass-edge), 0 1px 2px var(--glass-contact), 0 12px 32px -14px var(--glass-shade)",
    },
  ]
  return (
    <div className="my-6 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4">
      {layers.map((layer) => (
        <div key={layer.name}>
          <div className="flex h-28 items-center justify-center rounded-xl border bg-transparent">
            <div style={{ background: "var(--card)", boxShadow: layer.shadow }} className="h-14 w-[70%] rounded-lg" />
          </div>
          <p className="mt-2.5 text-[13px]">{layer.name}</p>
          <p className="font-mono text-[11.5px] text-muted-foreground">{layer.token}</p>
        </div>
      ))}
    </div>
  )
}

/** The one state, on three different things. */
function OneState() {
  const row = "flex h-7 items-center rounded-sm px-2.5 text-[13px] text-muted-foreground"
  return (
    <div className="my-6 grid gap-4 sm:grid-cols-3">
      <div className="glass-panel rounded-md p-1.5">
        <p className={row}>Sources</p>
        <p className={cn(row, "glass-chosen text-foreground")}>Experiments</p>
        <p className={row}>Draft</p>
      </div>
      <div className="rounded-lg bg-popover p-1">
        <p className={row}>Rename</p>
        <p className={cn(row, "glass-chosen text-foreground")}>Copy link</p>
        <p className={row}>Delete</p>
      </div>
      <div className="flex items-start gap-0.5">
        <p className={row}>Preview</p>
        <p className={cn(row, "glass-chosen text-foreground")}>Code</p>
        <p className={row}>Source</p>
      </div>
    </div>
  )
}

/** The live figures a page of Solid Glass's own documentation can ask for by name. */
export const WIDGETS: Record<string, React.ComponentType> = { Compare, Thickness, Finish, OneState }
