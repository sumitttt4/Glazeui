import { Blur, Canvas, Grain, H, W, useIds, type StudyProps } from "./shared"

/*
 * Kolam: a filament of light over a dim dot grid. An original study: three continuous looping curves
 * (a wide eight-loop curve, a seven-petal rose and a small five-petal turn), each drawn as a lit filament with a
 * wide glow, a mid glow and a hot core. It is not a canonical pulli kolam construction.
 */

const CX = W / 2
const CY = 228

const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a)

/** A hypotrochoid, closed: one continuous line however many times it loops. */
function loop(R: number, r: number, d: number, scale: number, turn = 0, steps = 900) {
  const laps = r / gcd(R, r)
  const rot = (turn * Math.PI) / 180
  let path = ""
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2 * laps
    const x = (R - r) * Math.cos(t) + d * Math.cos(((R - r) / r) * t)
    const y = (R - r) * Math.sin(t) - d * Math.sin(((R - r) / r) * t)
    const px = CX + scale * (x * Math.cos(rot) - y * Math.sin(rot))
    const py = CY + scale * (x * Math.sin(rot) + y * Math.cos(rot))
    path += `${i ? "L" : "M"}${px.toFixed(1)} ${py.toFixed(1)}`
  }
  return path + "Z"
}

const OUTER = loop(8, 3, 6, 13.6, -90)
const MIDDLE = loop(7, 3, 4, 11.8, -90)
const INNER = loop(5, 2, 3, 7.4, -90 + 36)

const DOTS = (() => {
  const dots: { x: number; y: number }[] = []
  for (let row = -3; row <= 3; row++) for (let col = -5; col <= 5; col++) dots.push({ x: CX + col * 52, y: CY + row * 52 })
  return dots
})()

const STRANDS = [
  { d: OUTER, glow: "#ffc96a", mid: "#ffdc98", core: "#fff7e4", weight: 1 },
  { d: MIDDLE, glow: "#f7b04a", mid: "#ffd27e", core: "#fff1cf", weight: 0.9 },
  { d: INNER, glow: "#e7889f", mid: "#f3aac4", core: "#ffe6ef", weight: 0.8 },
]

export function Kolam({ className, label, still }: StudyProps) {
  const id = useIds("bg", "vig", "halo", "wide", "mid", "dot", "spark", "reflect", "fade", "fadeMask", "grain")
  return (
    <Canvas label={label} className={className}>
      <defs>
        <radialGradient id={id.bg} cx={CX} cy={CY} r="420" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#1c2a66" />
          <stop offset="0.5" stopColor="#111a48" />
          <stop offset="1" stopColor="#070a22" />
        </radialGradient>
        <radialGradient id={id.vig} cx="50%" cy="50%" r="72%">
          <stop offset="0.55" stopColor="#02040e" stopOpacity="0" />
          <stop offset="1" stopColor="#02040e" stopOpacity="0.55" />
        </radialGradient>
        <radialGradient id={id.halo} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#f7b04a" stopOpacity="0.2" />
          <stop offset="1" stopColor="#f7b04a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id.fade} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id={id.fadeMask} maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
          <rect y="380" width={W} height={H - 380} fill={`url(#${id.fade})`} />
        </mask>
        <Blur id={id.wide} amount={6} />
        <Blur id={id.mid} amount={1.6} />
        <Blur id={id.dot} amount={0.6} />
        <Blur id={id.spark} amount={2.2} />
        <Blur id={id.reflect} amount={5} />
      </defs>

      <rect width={W} height={H} fill={`url(#${id.bg})`} />
      <circle cx={CX} cy={CY} r="210" fill={`url(#${id.halo})`} />

      {/* the grid the line is drawn over, barely there */}
      {DOTS.map((dot, i) => (
        <circle key={i} cx={dot.x} cy={dot.y} r="1.7" fill="#a9b6e6" opacity="0.32" filter={`url(#${id.dot})`} />
      ))}

      {/* a dim, squashed reflection below, fading toward the bottom edge */}
      <g mask={`url(#${id.fadeMask})`} opacity="0.09" filter={`url(#${id.reflect})`}>
        <g transform={`translate(0 ${CY + 175}) scale(1 -0.32) translate(0 ${-CY})`}>
          <path d={OUTER} stroke="#ffc96a" strokeWidth="6" fill="none" />
        </g>
      </g>

      {/* each strand three times: wide glow, mid glow, hot core */}
      <g filter={`url(#${id.wide})`} className={still ? undefined : "ls-breathe"}>
        {STRANDS.map((s, i) => (
          <path key={i} d={s.d} stroke={s.glow} strokeOpacity={0.42 * s.weight} strokeWidth={9} fill="none" strokeLinejoin="round" />
        ))}
      </g>
      <g filter={`url(#${id.mid})`}>
        {STRANDS.map((s, i) => (
          <path key={i} d={s.d} stroke={s.mid} strokeOpacity={0.75 * s.weight} strokeWidth={3.6} fill="none" strokeLinejoin="round" />
        ))}
      </g>
      {STRANDS.map((s, i) => (
        <path key={i} d={s.d} stroke={s.core} strokeWidth={1.3} fill="none" strokeLinejoin="round" />
      ))}

      {/* a bead of light travelling the outer line, once every sixteen seconds */}
      {!still && (
        <g filter={`url(#${id.spark})`}>
          <path d={OUTER} pathLength={1} stroke="#fffaf0" strokeWidth="4" strokeLinecap="round" strokeDasharray="0.012 0.988" fill="none" className="ls-trace" />
        </g>
      )}
      <circle cx={CX} cy={CY} r="3" fill="#fff6e4" />

      <rect width={W} height={H} fill={`url(#${id.vig})`} />
      <Grain id={id.grain} opacity={0.08} />
    </Canvas>
  )
}
