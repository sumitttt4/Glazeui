import { SolidGlassMark } from "@/site/logo"

/**
 * Development only (/dev/banner): the banner at the top of the README, drawn with the theme itself so
 * it cannot drift from the material. It fills an 820 by 200 window; `docs/banner.png` is a
 * screenshot of this page at twice that, with a clear background (the corners are see-through).
 *
 * On the left, the name. On the right, the three thicknesses, panel under card under popover, and in
 * the popover the one state, worn by the material's own name between the two it stands between.
 */
export function DevBanner() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-between overflow-hidden rounded-[22px] bg-background px-11 shadow-[inset_0_0_0_1px_var(--glass-edge)]">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3.5">
          <SolidGlassMark className="size-11" />
          <span className="text-[40px] leading-none font-semibold tracking-tighter">Solid Glass</span>
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
