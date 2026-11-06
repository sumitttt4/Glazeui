import * as React from "react"

/** Every artwork is drawn on the same canvas; filters use it as their region so nothing is clipped. */
export const W = 640
export const H = 480

/** Ids that stay unique when one artwork appears twice on a page (the master and its card). */
export function useIds(...names: string[]): Record<string, string> {
  const raw = React.useId().replace(/[^a-zA-Z0-9]/g, "")
  return Object.fromEntries(names.map((name) => [name, `ls${raw}${name}`]))
}

/** A filter region covering the whole canvas in the coordinates of the element that uses it. */
export const canvasRegion = (x = 0, y = 0) =>
  ({ filterUnits: "userSpaceOnUse", x: x - 40, y: y - 40, width: W + 80, height: H + 80 }) as const

/** Film grain over the whole canvas: a little texture so large gradients do not band or read as vector. */
export function Grain({ id, opacity = 0.09 }: { id: string; opacity?: number }) {
  return (
    <>
      <filter id={id} {...canvasRegion()}>
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" seed="7" />
        <feColorMatrix values="0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 1.2 -0.25" />
      </filter>
      <rect width={W} height={H} filter={`url(#${id})`} opacity={opacity} style={{ mixBlendMode: "overlay" }} />
    </>
  )
}

/** A soft blur filter, sized to the canvas so a blurred shape is never cut at its own bounding box. */
export function Blur({ id, amount, x, y }: { id: string; amount: number; x?: number; y?: number }) {
  return (
    <filter id={id} {...canvasRegion(x, y)}>
      <feGaussianBlur stdDeviation={amount} />
    </filter>
  )
}

/** Deterministic pseudo-random numbers, so every render and every screenshot is the same picture. */
export function seeded(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}

/** Props every study takes: the master fills its frame; `label` is set only where the picture is the content. */
export type StudyProps = { className?: string; label?: string; still?: boolean }

/** The svg frame: decorative unless labelled, scaled to cover its box. */
export function Canvas({ label, className, children }: { label?: string; className?: string; children: React.ReactNode }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className={className}
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true, focusable: false })}
    >
      {children}
    </svg>
  )
}
