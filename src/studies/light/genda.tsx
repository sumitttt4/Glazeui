import { Blur, Canvas, Grain, H, W, canvasRegion, seeded, useIds, type StudyProps } from "./shared"

/*
 * Genda: a marigold lit from inside. Six rings of translucent petals. Each petal carries its own
 * shading (dark at the base, lit at the rounded end), and the whole bloom sits under one radial
 * mask, so the light runs from a white-hot core to nothing at the outer tips. The outer rings blur
 * as if out of focus; a few sparks drift.
 */

const CX = W / 2
const CY = H / 2

const RINGS = [
  // radius of the petal's middle, count, length, width, focus blur, opacity
  { r: 34, n: 12, len: 34, w: 14, blur: 0, o: 1 },
  { r: 60, n: 17, len: 44, w: 17, blur: 0.25, o: 1 },
  { r: 89, n: 22, len: 52, w: 19, blur: 0.5, o: 1 },
  { r: 121, n: 27, len: 58, w: 21, blur: 0.9, o: 0.95 },
  { r: 155, n: 32, len: 62, w: 22, blur: 1.9, o: 0.84 },
  { r: 190, n: 37, len: 64, w: 23, blur: 3.6, o: 0.64 },
]

/** A drop: narrow where it meets the centre, rounded and full at the outer end. Drawn pointing up. */
function petal(len: number, w: number) {
  const h = w / 2
  return [
    `M0 0`,
    `C ${h * 0.55} ${-len * 0.18} ${h * 1.12} ${-len * 0.55} ${h} ${-len * 0.8}`,
    `C ${h * 0.86} ${-len * 1.04} ${-h * 0.86} ${-len * 1.04} ${-h} ${-len * 0.8}`,
    `C ${-h * 1.12} ${-len * 0.55} ${-h * 0.55} ${-len * 0.18} 0 0 Z`,
  ].join(" ")
}

const random = seeded(11)
/** Small, fixed irregularities per petal, so the bloom is grown rather than stamped. */
const JITTER = RINGS.map((ring) => Array.from({ length: ring.n }, () => ({ a: (random() - 0.5) * 4, s: 0.9 + random() * 0.2 })))
const SPARKS = Array.from({ length: 11 }, () => ({
  x: 70 + random() * (W - 140),
  y: 40 + random() * (H - 80),
  r: 0.9 + random() * 1.6,
  o: 0.35 + random() * 0.45,
  dur: 7 + random() * 6,
  delay: -random() * 8,
  dx: (random() - 0.5) * 14,
  dy: -6 - random() * 12,
})).filter((s) => Math.hypot(s.x - CX, s.y - CY) > 175)
const BOKEH = [
  { x: 118, y: 92, r: 9, o: 0.22 },
  { x: 548, y: 360, r: 12, o: 0.16 },
  { x: 74, y: 300, r: 6, o: 0.2 },
  { x: 515, y: 96, r: 5, o: 0.18 },
]

/** `bare` draws the bloom alone, without its ground, for laying over a light card. */
export function Genda({ className, label, still, bare }: StudyProps & { bare?: boolean }) {
  const id = useIds("bg", "vig", "petal", "fade", "mask", "core", "heart", "glow", "spark", "bokeh", "grain", ...RINGS.map((_, i) => `ring${i}`))
  return (
    <Canvas label={label} className={className}>
      <defs>
        <radialGradient id={id.bg} cx="50%" cy="48%" r="72%">
          <stop offset="0" stopColor="#7c2c12" />
          <stop offset="0.42" stopColor="#4a1513" />
          <stop offset="1" stopColor="#22090d" />
        </radialGradient>
        <radialGradient id={id.vig} cx="50%" cy="50%" r="75%">
          <stop offset="0.55" stopColor="#12030a" stopOpacity="0" />
          <stop offset="1" stopColor="#12030a" stopOpacity="0.6" />
        </radialGradient>
        {/* One petal's own light: shadowed base, saffron body, a lit rounded end. */}
        <linearGradient id={id.petal} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#5e1708" />
          <stop offset="0.3" stopColor="#b2420e" />
          <stop offset="0.62" stopColor="#ef8f23" />
          <stop offset="0.86" stopColor="#ffc35c" />
          <stop offset="1" stopColor="#ffe2a3" />
        </linearGradient>
        {/* The bloom's one gradient of light: full at the core, nothing past the outer tips. */}
        <radialGradient id={id.fade} cx={CX} cy={CY} r="250" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0.95" />
          <stop offset="0.8" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id={id.mask} maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
          <rect width={W} height={H} fill={`url(#${id.fade})`} />
        </mask>
        <radialGradient id={id.core} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#fffaf0" stopOpacity="1" />
          <stop offset="0.3" stopColor="#ffe2a8" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffb25a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={id.heart} cx="45%" cy="40%" r="60%">
          <stop offset="0" stopColor="#ffe6cc" />
          <stop offset="0.55" stopColor="#e99372" />
          <stop offset="1" stopColor="#a8402f" />
        </radialGradient>
        <radialGradient id={id.glow} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#e2701c" stopOpacity="0.55" />
          <stop offset="0.6" stopColor="#b8460f" stopOpacity="0.18" />
          <stop offset="1" stopColor="#b8460f" stopOpacity="0" />
        </radialGradient>
        {/* Per ring: a soft shadow between overlapping petals, and the ring's own focus. */}
        {RINGS.map((ring, i) => (
          <filter key={i} id={id[`ring${i}`]} {...canvasRegion(-CX, -CY)}>
            <feGaussianBlur in="SourceAlpha" stdDeviation={2.6 + ring.blur} result="shade" />
            <feFlood floodColor="#2a0605" floodOpacity="0.55" />
            <feComposite in2="shade" operator="in" result="shadow" />
            <feGaussianBlur in="SourceGraphic" stdDeviation={ring.blur} result="body" />
            <feMerge>
              <feMergeNode in="shadow" />
              <feMergeNode in="body" />
            </feMerge>
          </filter>
        ))}
        <Blur id={id.spark} amount={0.8} />
        <Blur id={id.bokeh} amount={7} />
      </defs>

      {!bare && (
        <>
          <rect width={W} height={H} fill={`url(#${id.bg})`} />
          <circle cx={CX} cy={CY} r="270" fill={`url(#${id.glow})`} />
          {BOKEH.map((b, i) => (
            <circle key={i} cx={b.x} cy={b.y} r={b.r} fill="#f3a646" opacity={b.o} filter={`url(#${id.bokeh})`} />
          ))}
        </>
      )}

      <g mask={`url(#${id.mask})`}>
        <g transform={`translate(${CX} ${CY})`}>
          {/* outermost first, so each inner ring lies over the one behind it */}
          {RINGS.map((ring, i) => ({ ring, i }))
            .reverse()
            .map(({ ring, i }) => {
              const d = petal(ring.len, ring.w)
              const base = ring.r - ring.len * 0.45
              const offset = i % 2 ? 180 / ring.n : 0
              return (
                <g key={i} filter={`url(#${id[`ring${i}`]})`} opacity={ring.o}>
                  {Array.from({ length: ring.n }, (_, k) => (
                    <path
                      key={k}
                      d={d}
                      fill={`url(#${id.petal})`}
                      fillOpacity="0.92"
                      transform={`rotate(${(360 / ring.n) * k + offset + JITTER[i][k].a}) translate(0 ${-base}) scale(${JITTER[i][k].s})`}
                    />
                  ))}
                </g>
              )
            })}
        </g>
      </g>

      {/* the white-hot core, and the small lit heart with its ring of seeds */}
      <circle cx={CX} cy={CY} r="150" fill={`url(#${id.core})`} style={{ mixBlendMode: "screen" }} className={still ? undefined : "ls-breathe"} />
      <circle cx={CX} cy={CY} r="19" fill={`url(#${id.heart})`} />
      {Array.from({ length: 12 }, (_, k) => {
        const a = (k / 12) * Math.PI * 2
        return <circle key={k} cx={CX + Math.cos(a) * 14} cy={CY + Math.sin(a) * 14} r="1.5" fill="#ffe1d2" opacity="0.85" />
      })}

      {!still &&
        SPARKS.map((s, i) => (
          <circle
            key={i}
            cx={s.x}
            cy={s.y}
            r={s.r}
            fill="#ffcb76"
            opacity={s.o}
            filter={`url(#${id.spark})`}
            className="ls-drift"
            style={{ ["--ls-dur" as string]: `${s.dur}s`, ["--ls-delay" as string]: `${s.delay}s`, ["--ls-dx" as string]: `${s.dx}px`, ["--ls-dy" as string]: `${s.dy}px` }}
          />
        ))}

      {!bare && (
        <>
          <rect width={W} height={H} fill={`url(#${id.vig})`} />
          <Grain id={id.grain} />
        </>
      )}
    </Canvas>
  )
}
