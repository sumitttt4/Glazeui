import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * The mark, in two layers of Solid Glass. The first is a tile of smoked glass: a low fill, the line
 * of light along its top edge, a hairline round it and its shade underneath. The second lies on it:
 * a single angle, ›, itself a pane of clear glass: a bright face, the line of light along its top
 * edges, a hairline round it, a thin dark edge underneath and its shadow on the tile. No gradients
 * — like the material, it is finished at the edges.
 */
export function SolidGlassMark({ className, ...props }: React.ComponentProps<"svg">) {
  const id = React.useId()
  const tile = { x: 1, width: 14, height: 14, rx: 3.9 }
  const angle = { d: "M6.3 4.5 9.8 8 6.3 11.5", strokeWidth: 1.9, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }

  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" fill="none" className={cn("size-4 shrink-0 overflow-visible", className)} {...props}>
      <defs>
        {/* What is left of a shape once the same shape, moved down a little, is taken out: its top edge. */}
        <mask id={`${id}tile`} maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
          <rect {...tile} y="1" fill="#fff" />
          <rect {...tile} y="1.75" fill="#000" />
        </mask>
        <mask id={`${id}angle`} maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
          <path {...angle} stroke="#fff" />
          <path {...angle} stroke="#000" transform="translate(0 0.42)" />
        </mask>
      </defs>

      {/* First layer: the tile. Shade, fill, hairline, line of light. */}
      <rect {...tile} y="1.7" className="fill-[oklch(0.3_0.06_265/22%)] dark:fill-black/55" />
      <rect {...tile} y="1" className="fill-[oklch(0.84_0.006_265)] dark:fill-[oklch(0.37_0_0)]" />
      <rect x="1.3" y="1.3" width="13.4" height="13.4" rx="3.6" strokeWidth="0.6" className="stroke-[oklch(0.3_0.02_265/16%)] dark:stroke-white/10" />
      <rect {...tile} y="1" mask={`url(#${id}tile)`} className="fill-white dark:fill-white/45" />

      {/* Second layer: the angle, a pane of clear glass lying on the tile. Shadow, the dark edge under
          it, hairline, face, lit edge. */}
      <path {...angle} transform="translate(0 0.85)" className="stroke-[oklch(0.25_0.03_265/30%)] dark:stroke-black/55" />
      <path {...angle} transform="translate(0 0.3)" className="stroke-[oklch(0.1_0_0)] dark:stroke-[oklch(0.26_0_0)]" />
      <path {...angle} strokeWidth={2.25} className="stroke-black/10 dark:stroke-white/20" />
      <path {...angle} className="stroke-[oklch(0.24_0_0)] dark:stroke-[oklch(0.86_0_0)]" />
      <path {...angle} mask={`url(#${id}angle)`} className="stroke-white/50 dark:stroke-white" />
    </svg>
  )
}
