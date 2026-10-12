import { Check, LoaderCircle } from 'lucide-react'
import { useState, type CSSProperties, type ReactNode } from 'react'

import { cn } from '@/lib/utils'

// The light behind the three panes can be given a colour, to see what each does with one: flat
// takes none of it, Solid Glass next to none, liquid glass all of it.
const LIGHTS = [
  { name: 'Blue', colour: 'oklch(0.7 0.18 250)' },
  { name: 'Violet', colour: 'oklch(0.68 0.21 305)' },
  { name: 'Red', colour: 'oklch(0.68 0.21 20)' },
  { name: 'Orange', colour: 'oklch(0.8 0.16 70)' },
  { name: 'Green', colour: 'oklch(0.8 0.18 155)' },
]

const blur = (value: string): CSSProperties => ({ backdropFilter: value, WebkitBackdropFilter: value })

// Everything here is drawn from the theme's own variables, so the comparison is the material as
// the page around it has it, light or dark, and stays so when the theme is tuned.
//
// Solid Glass is not see-through. On an unlit page its panel is a faint tint; put that same tint
// over a light, as here, and it would turn clear, which the material never is. So the page it lies
// on is put back under it: the page's colour, mostly opaque, beneath the tint.
const SOLID = 'linear-gradient(var(--panel), var(--panel)), color-mix(in oklch, var(--background) 86%, transparent)'

type Kind = { name: string; note: string; panel: CSSProperties; row: CSSProperties; panelClass?: string; rowClass?: string }

const KINDS: Kind[] = [
  {
    name: 'Flat',
    note: 'An opaque block. Whatever is behind it makes no difference.',
    // The same face Solid Glass has, as plain paint: what differs between the two is the edge.
    panel: {},
    row: {},
    panelClass: 'bg-[oklch(0.962_0.005_265)] dark:bg-[oklch(0.225_0_0)]',
    rowClass: 'bg-[oklch(0.925_0.006_265)] dark:bg-[oklch(0.285_0_0)]',
  },
  {
    name: 'Solid Glass',
    note: 'Very little see-through: solid from a distance, and the finish is at the edges.',
    panel: {
      background: SOLID,
      ...blur('blur(26px)'),
      boxShadow:
        'inset 0 1px 0 var(--glass-rim), inset 0 0 0 1px var(--glass-inner), 0 0 0 1px var(--glass-edge), 0 1px 2px var(--glass-contact), 0 12px 32px -14px var(--glass-shade)',
    },
    row: {
      background: 'var(--glass-control)',
      boxShadow: 'inset 0 1px 0 var(--glass-control-rim), 0 0 0 1px var(--glass-edge)',
    },
  },
  {
    name: 'Liquid glass',
    note: 'Nearly clear: all the colour behind comes through, with highlights on the rim.',
    panel: {
      background: 'linear-gradient(135deg, oklch(1 0 0 / 14%), oklch(1 0 0 / 4%) 45%, oklch(1 0 0 / 9%))',
      ...blur('blur(7px) saturate(150%)'),
      boxShadow:
        'inset 1px 1px 0.5px oklch(1 0 0 / 55%), inset -1px -1px 0.5px oklch(1 0 0 / 22%), inset 0 0 18px oklch(1 0 0 / 9%), 0 10px 30px -12px var(--glass-shade)',
    },
    row: {
      background: 'oklch(1 0 0 / 8%)',
      boxShadow: 'inset 0 0 0 1px oklch(1 0 0 / 14%)',
    },
  },
]

function Row({ style, className, icon, children }: { style: CSSProperties; className?: string; icon: ReactNode; children: ReactNode }) {
  return (
    <div style={style} className={cn('flex h-8 items-center gap-2 rounded-[7px] px-2.5 text-[12.5px] text-foreground/90 [&_svg]:size-3.5 [&_svg]:shrink-0', className)}>
      {icon}
      <span className="truncate">{children}</span>
    </div>
  )
}

/**
 * One panel three ways, each over the same light, so the three can be told apart: flat design,
 * Solid Glass, and liquid glass. The stage is the page itself, in whichever theme it is in; the
 * comparison is about what each does with what is behind it.
 */
export function Compare({ className }: { className?: string }) {
  const [light, setLight] = useState(LIGHTS[0])
  return (
    <div className={cn('my-6 overflow-hidden rounded-2xl border bg-background', className)}>
      <div className="flex items-center gap-1.5 border-b px-4 py-2.5">
        <span className="mr-1 text-[12.5px] text-muted-foreground">Light behind</span>
        {LIGHTS.map((entry) => (
          <button
            key={entry.name}
            type="button"
            aria-label={entry.name}
            aria-pressed={entry === light}
            onClick={() => setLight(entry)}
            style={{ background: entry.colour }}
            className={cn(
              'size-4 rounded-full opacity-55 transition-[opacity,box-shadow] outline-none hover:opacity-90 focus-visible:opacity-90',
              entry === light && 'opacity-100 shadow-[0_0_0_2px_var(--background),0_0_0_3.5px_color-mix(in_oklch,var(--foreground)_70%,transparent)]',
            )}
          />
        ))}
      </div>
      <div className="relative isolate overflow-hidden">
        {/* The light: two patches behind every pane, laid under all three at once so that none is cut
            off at the edge of its column. */}
        <div aria-hidden className="absolute inset-0 -z-10 grid sm:grid-cols-3">
          {KINDS.map((kind) => (
            <div key={kind.name} className="relative">
              <span style={{ background: light.colour }} className="absolute top-4 left-2 size-36 rounded-full opacity-70 blur-2xl transition-colors duration-500" />
              <span style={{ background: light.colour }} className="absolute right-4 bottom-16 size-24 rounded-full opacity-50 blur-2xl transition-colors duration-500" />
            </div>
          ))}
        </div>
        <div className="grid sm:grid-cols-3">
          {KINDS.map((kind) => (
            <div key={kind.name} className="px-6 pt-9 pb-6">
              <div style={kind.panel} className={cn('rounded-[14px] p-2.5', kind.panelClass)}>
                <p className="px-1 pt-0.5 pb-2 text-[12.5px] font-medium text-foreground/90">Tasks</p>
                <div className="flex flex-col gap-1.5">
                  <Row style={kind.row} className={kind.rowClass} icon={<LoaderCircle className="animate-spin text-muted-foreground motion-reduce:animate-none" />}>
                    Sync photos
                  </Row>
                  <Row style={kind.row} className={kind.rowClass} icon={<Check className="text-success" />}>
                    Back up notes
                  </Row>
                </div>
              </div>
              <p className="mt-5 text-[13.5px] font-medium text-foreground/90">{kind.name}</p>
              <p className="mt-0.5 text-[12.5px] leading-relaxed text-muted-foreground">{kind.note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
