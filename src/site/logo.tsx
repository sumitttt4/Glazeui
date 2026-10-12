import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * The mark, in two layers of Solid Glass. The first is a tile of smoked glass: a low fill, the line
 * of light along its top edge, a hairline round it and its shade underneath. The second lies on it:
 * the S of the name, a solid pane with its own lit edge, casting its own shadow on the tile. No
 * gradients — like the material, it is finished at the edges.
 */
export function SolidGlassMark({ className, ...props }: React.ComponentProps<"svg">) {
  const id = React.useId()
  const tile = { x: 1, width: 14, height: 14, rx: 3.9 }
  const letter = "M10.4 6.2C10.1 5.2 9.2 4.5 8 4.5 6.6 4.5 5.6 5.2 5.6 6.4 5.6 8.9 10.4 7.2 10.4 9.7 10.4 10.8 9.4 11.5 8 11.5 6.8 11.5 5.9 10.9 5.6 9.9"
  const stroke = { d: letter, strokeWidth: 1.7, strokeLinecap: "round" as const }

  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" fill="none" className={cn("size-4 shrink-0 overflow-visible", className)} {...props}>
      <defs>
        {/* What is left of a shape once the same shape, moved down a little, is taken out: its top edge. */}
        <mask id={`${id}tile`} maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
          <rect {...tile} y="1" fill="#fff" />
          <rect {...tile} y="1.75" fill="#000" />
        </mask>
        <mask id={`${id}letter`} maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
          <path {...stroke} stroke="#fff" />
          <path {...stroke} stroke="#000" transform="translate(0 0.5)" />
        </mask>
      </defs>

      {/* First layer: the tile. Shade, fill, hairline, line of light. */}
      <rect {...tile} y="1.7" className="fill-[oklch(0.3_0.06_265/22%)] dark:fill-black/55" />
      <rect {...tile} y="1" className="fill-[oklch(0.84_0.006_265)] dark:fill-[oklch(0.37_0_0)]" />
      <rect x="1.3" y="1.3" width="13.4" height="13.4" rx="3.6" strokeWidth="0.6" className="stroke-[oklch(0.3_0.02_265/16%)] dark:stroke-white/10" />
      <rect {...tile} y="1" mask={`url(#${id}tile)`} className="fill-white dark:fill-white/45" />

      {/* Second layer: the letter, a solid pane lying on the tile. Shadow, pane, lit edge. */}
      <path {...stroke} transform="translate(0 0.75)" className="stroke-[oklch(0.25_0.03_265/30%)] dark:stroke-black/50" />
      <path {...stroke} className="stroke-[oklch(0.22_0_0)] dark:stroke-[oklch(0.96_0_0)]" />
      <path {...stroke} mask={`url(#${id}letter)`} className="stroke-white/45 dark:stroke-white" />
    </svg>
  )
}
