import * as React from "react"

import { SolidGlassMark } from "@/site/logo"

/**
 * The name, set in the material: each letter a pane of glass. A grey face, the line of light along
 * the top of every stroke, a hairline round it, a thin dark edge underneath and its shadow on the
 * page. No gradient; like a pane, a letter is finished at its edges.
 */
function GlassWordmark({ children }: { children: string }) {
  const id = React.useId()
  const letters = (props: React.SVGProps<SVGTextElement>) => (
    <text x="0" y="36" fontSize="40" fontWeight="600" letterSpacing="-2" {...props}>
      {children}
    </text>
  )
  return (
    <svg width="222" height="48" viewBox="0 0 222 48" role="img" aria-label={children} className="overflow-visible font-sans">
      <defs>
        {/* What is left of the letters once the same letters, moved down a little, are taken out: their top edges. */}
        <mask id={`${id}rim`} maskUnits="userSpaceOnUse" x="-8" y="-8" width="240" height="64">
          {letters({ fill: "#fff" })}
          <g transform="translate(0 1)">{letters({ fill: "#000" })}</g>
        </mask>
      </defs>
      <g transform="translate(0 3.5)" style={{ filter: "blur(3px)" }}>
        {letters({ fill: "#000", fillOpacity: 0.55 })}
      </g>
      <g transform="translate(0 1.1)">{letters({ fill: "oklch(0.3 0 0)" })}</g>
      {letters({ fill: "oklch(0.7 0 0)" })}
      {letters({ fill: "none", stroke: "#fff", strokeOpacity: 0.16, strokeWidth: 0.7 })}
      <g mask={`url(#${id}rim)`}>{letters({ fill: "#fff", fillOpacity: 0.85 })}</g>
    </svg>
  )
}

/**
 * Development only (/dev/banner): the banner at the top of the README, drawn with the theme itself so
 * it cannot drift from the material. It fills an 820 by 200 window; `docs/banner.png` is a
 * screenshot of this page at twice that, with a clear background (the corners are see-through).
 *
 * On the left, the name, in glass. On the right, the three thicknesses, panel under card under
 * popover, and in the popover the one state, worn by the material's own name between the two it
 * stands between.
 */
export function DevBanner() {
  // Nothing behind the banner: its corners are rounded, and what shows past them should be whatever
  // page the picture ends up on.
  React.useEffect(() => {
    const page = [document.documentElement, document.body]
    page.forEach((el) => el.style.setProperty("background", "transparent", "important"))
    return () => page.forEach((el) => el.style.removeProperty("background"))
  }, [])

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-between overflow-hidden rounded-[22px] bg-background px-11 shadow-[inset_0_0_0_1px_var(--glass-edge)]">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3.5">
          <SolidGlassMark className="size-11" />
          <GlassWordmark>Solid Glass</GlassWordmark>
        </div>
        <p className="pl-0.5 text-[17px] text-muted-foreground">Form with substance.</p>
      </div>

      <div className="relative h-[152px] w-[356px] shrink-0 text-[11px] text-muted-foreground">
        <div className="glass-panel absolute top-[46px] left-0 flex h-[106px] w-[180px] items-end rounded-xl p-3">Panel</div>
        <div className="absolute top-[23px] left-[88px] flex h-[106px] w-[180px] items-end rounded-xl bg-card p-3">Card</div>
        <div className="absolute top-0 left-[176px] flex h-[106px] w-[180px] flex-col gap-0.5 rounded-xl bg-popover p-1.5 text-[12px] text-foreground">
          <span className="flex h-[22px] items-center rounded-md px-2 text-muted-foreground">Flat</span>
          <span className="glass-chosen flex h-[22px] items-center rounded-md px-2">Solid Glass</span>
          <span className="flex h-[22px] items-center rounded-md px-2 text-muted-foreground">Liquid glass</span>
          <span className="mt-auto px-1.5 pb-0.5 text-[11px] text-muted-foreground">Popover</span>
        </div>
      </div>
    </div>
  )
}
