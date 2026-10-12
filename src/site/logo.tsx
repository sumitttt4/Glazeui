import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * The mark, in two layers of Solid Glass. The first is a tile of smoked glass: a low fill, the line
 * of light along its top edge, a hairline round it and its shade underneath. The second lies on it:
 * two strokes of a glint, each a small solid pane with its own lit edge, casting its own shadow on
 * the tile. No gradients — like the material, it is finished at the edges.
 */
export function SolidGlassMark({ className, ...props }: React.ComponentProps<"svg">) {
  const id = React.useId()
  const tile = { x: 1, width: 14, height: 14, rx: 3.9 }
  const long = "M5.3 10.7 10.7 5.3"
  const short = "M8.7 11.3 11.3 8.7"

  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" fill="none" className={cn("size-4 shrink-0 overflow-visible", className)} {...props}>
      <defs>
        {/* What is left of a shape once the same shape, moved down a little, is taken out: its top edge. */}
        <mask id={`${id}tile`} maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
          <rect {...tile} y="1" fill="#fff" />
          <rect {...tile} y="1.75" fill="#000" />
        </mask>
        <mask id={`${id}glint`} maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
          <g stroke="#fff" strokeWidth="1.8" strokeLinecap="round">
            <path d={long} />
            <path d={short} />
          </g>
          <g stroke="#000" strokeWidth="1.8" strokeLinecap="round" transform="translate(0 0.5)">
            <path d={long} />
            <path d={short} />
          </g>
        </mask>
      </defs>

      {/* First layer: the tile. Shade, fill, hairline, line of light. */}
      <rect {...tile} y="1.7" className="fill-[oklch(0.3_0.06_265/22%)] dark:fill-black/55" />
      <rect {...tile} y="1" className="fill-[oklch(0.84_0.006_265)] dark:fill-[oklch(0.37_0_0)]" />
      <rect x="1.3" y="1.3" width="13.4" height="13.4" rx="3.6" strokeWidth="0.6" className="stroke-[oklch(0.3_0.02_265/16%)] dark:stroke-white/10" />
      <rect {...tile} y="1" mask={`url(#${id}tile)`} className="fill-white dark:fill-white/45" />

      {/* Second layer: the glint, two solid panes lying on the tile. Shadow, pane, lit edge. */}
      <g strokeWidth="1.8" strokeLinecap="round" transform="translate(0 0.75)" className="stroke-[oklch(0.25_0.03_265/30%)] dark:stroke-black/50">
        <path d={long} />
        <path d={short} />
      </g>
      <g strokeWidth="1.8" strokeLinecap="round">
        <path d={long} className="stroke-[oklch(0.22_0_0)] dark:stroke-[oklch(0.96_0_0)]" />
        <path d={short} className="stroke-[oklch(0.46_0.004_265)] dark:stroke-[oklch(0.72_0_0)]" />
      </g>
      <g strokeWidth="1.8" strokeLinecap="round" mask={`url(#${id}glint)`} className="stroke-white/45 dark:stroke-white">
        <path d={long} />
        <path d={short} />
      </g>
    </svg>
  )
}
