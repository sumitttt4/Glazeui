import { Blur, Canvas, Grain, H, W, seeded, useIds, type StudyProps } from "./shared"

/*
 * Mor: a peacock ocellus in the dark. Read as a feather, not an emblem: the eye sits off-centre and
 * tilted at the tip of a shaft, hundreds of soft barbs fan out behind it, and every band of the eye
 * is a blurred sheen rather than a drawn ring. The only crisp point is the glint.
 */

const EX = 352
const EY = 214
const TILT = -13

/** The eye's outline: a full oval drawn to a soft point at the top, as the ocellus is. */
function eye(rx: number, ry: number, dy = 0) {
  const t = -ry + dy
  const b = ry + dy
  return [
    `M0 ${t}`,
    `C ${rx * 1.08} ${t + ry * 0.42} ${rx * 1.04} ${b - ry * 0.18} 0 ${b}`,
    `C ${-rx * 1.04} ${b - ry * 0.18} ${-rx * 1.08} ${t + ry * 0.42} 0 ${t} Z`,
  ].join(" ")
}

const random = seeded(23)
const SHEENS = ["#2e9f93", "#1f7f86", "#c49a45", "#3f8a55", "#5bbfae"]

/** Barbs along the shaft, both sides, sweeping up and out: the body of the feather. */
const SHAFT_BARBS = Array.from({ length: 220 }, (_, i) => {
  const t = random()
  const side = i % 2 ? 1 : -1
  // the shaft runs from under the eye down past the bottom edge, in the tilted frame
  const x0 = (random() - 0.5) * 2
  const y0 = 120 + t * 300
  const len = 120 + random() * 170 * (1 - t * 0.35)
  const lift = 0.5 + random() * 0.5
  const x1 = x0 + side * len
  const y1 = y0 - len * lift
  const cx = x0 + side * len * 0.5
  const cy = y0 - len * lift * 0.15
  return { d: `M${x0} ${y0} Q ${cx} ${cy} ${x1} ${y1}`, c: SHEENS[Math.floor(random() * SHEENS.length)], o: 0.16 + random() * 0.26, w: 0.6 + random() * 0.9 }
})

/** Loose barbs that frame the eye itself, radiating from just inside its rim. */
const RIM_BARBS = Array.from({ length: 90 }, () => {
  const a = random() * Math.PI * 2
  const r0 = 120 + random() * 18
  const len = 30 + random() * 90
  const bend = (random() - 0.5) * 0.5
  const x0 = Math.cos(a) * r0 * 0.82
  const y0 = Math.sin(a) * r0
  const x1 = Math.cos(a + bend) * (r0 + len) * 0.82
  const y1 = Math.sin(a + bend) * (r0 + len)
  return { d: `M${x0} ${y0} L ${x1} ${y1}`, c: SHEENS[Math.floor(random() * SHEENS.length)], o: 0.12 + random() * 0.22, w: 0.5 + random() * 0.7 }
})

const BOKEH = [
  { x: 110, y: 104, r: 16, c: "#2e9f93", o: 0.18 },
  { x: 540, y: 388, r: 22, c: "#c49a45", o: 0.12 },
  { x: 86, y: 382, r: 11, c: "#5bbfae", o: 0.16 },
  { x: 560, y: 120, r: 9, c: "#5bbfae", o: 0.2 },
  { x: 214, y: 54, r: 7, c: "#c49a45", o: 0.2 },
]

export function Mor({ className, label, still }: StudyProps) {
  const id = useIds("bg", "vig", "halo", "gold", "teal", "neel", "kesar", "kernel", "soft", "barbs", "glow", "b1", "b2", "b3", "b4", "glint", "bokeh", "grain")
  return (
    <Canvas label={label} className={className}>
      <defs>
        <radialGradient id={id.bg} cx={EX} cy={EY} r="430" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#24346f" />
          <stop offset="0.45" stopColor="#141c4a" />
          <stop offset="1" stopColor="#080b24" />
        </radialGradient>
        <radialGradient id={id.vig} cx="50%" cy="50%" r="72%">
          <stop offset="0.55" stopColor="#03050f" stopOpacity="0" />
          <stop offset="1" stopColor="#03050f" stopOpacity="0.6" />
        </radialGradient>
        <radialGradient id={id.halo} cx="50%" cy="55%" r="55%">
          <stop offset="0" stopColor="#c99a3e" stopOpacity="0.5" />
          <stop offset="1" stopColor="#c99a3e" stopOpacity="0" />
        </radialGradient>
        {/* sona: bronze to gold, with a lighter sheen high on the left */}
        <linearGradient id={id.gold} x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#f1d38a" />
          <stop offset="0.35" stopColor="#d2a347" />
          <stop offset="0.75" stopColor="#9a6a25" />
          <stop offset="1" stopColor="#c99a45" />
        </linearGradient>
        {/* mor: teal that shifts toward green and back, the iridescence */}
        <linearGradient id={id.teal} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#58c8b2" />
          <stop offset="0.3" stopColor="#1d9488" />
          <stop offset="0.65" stopColor="#0d5f63" />
          <stop offset="1" stopColor="#2f8f6c" />
        </linearGradient>
        <radialGradient id={id.neel} cx="45%" cy="38%" r="62%">
          <stop offset="0" stopColor="#3b55b8" />
          <stop offset="0.55" stopColor="#1b2766" />
          <stop offset="1" stopColor="#0d1442" />
        </radialGradient>
        <radialGradient id={id.kesar} cx="45%" cy="35%" r="65%">
          <stop offset="0" stopColor="#f6c97e" />
          <stop offset="0.5" stopColor="#d9862f" />
          <stop offset="1" stopColor="#8f4a1c" />
        </radialGradient>
        <radialGradient id={id.kernel} cx="40%" cy="35%" r="65%">
          <stop offset="0" stopColor="#5a3a26" />
          <stop offset="1" stopColor="#170c08" />
        </radialGradient>
        <Blur id={id.barbs} amount={0.7} x={-EX} y={-EY} />
        <Blur id={id.glow} amount={5} x={-EX} y={-EY} />
        <Blur id={id.soft} amount={16} x={-EX} y={-EY} />
        <Blur id={id.b1} amount={9} x={-EX} y={-EY} />
        <Blur id={id.b2} amount={6.5} x={-EX} y={-EY} />
        <Blur id={id.b3} amount={4.5} x={-EX} y={-EY} />
        <Blur id={id.b4} amount={2.4} x={-EX} y={-EY} />
        <Blur id={id.glint} amount={1.6} x={-EX} y={-EY} />
        <Blur id={id.bokeh} amount={9} />
      </defs>

      <rect width={W} height={H} fill={`url(#${id.bg})`} />
      {BOKEH.map((b, i) => (
        <circle
          key={i}
          cx={b.x}
          cy={b.y}
          r={b.r}
          fill={b.c}
          opacity={b.o}
          filter={`url(#${id.bokeh})`}
          className={still ? undefined : "ls-drift"}
          style={{ ["--ls-dur" as string]: `${10 + i * 2}s`, ["--ls-dx" as string]: `${i % 2 ? 8 : -6}px`, ["--ls-dy" as string]: `${i % 2 ? -6 : 8}px` }}
        />
      ))}

      <g transform={`translate(${EX} ${EY}) rotate(${TILT})`}>
        {/* the feather behind the eye: a glow pass and a fine pass of the same barbs */}
        <g filter={`url(#${id.glow})`} opacity="0.55">
          {SHAFT_BARBS.map((b, i) => (
            <path key={i} d={b.d} stroke={b.c} strokeWidth={b.w * 3} strokeOpacity={b.o} fill="none" strokeLinecap="round" />
          ))}
        </g>
        <g filter={`url(#${id.barbs})`}>
          {SHAFT_BARBS.map((b, i) => (
            <path key={i} d={b.d} stroke={b.c} strokeWidth={b.w} strokeOpacity={b.o} fill="none" strokeLinecap="round" />
          ))}
          {RIM_BARBS.map((b, i) => (
            <path key={i} d={b.d} stroke={b.c} strokeWidth={b.w} strokeOpacity={b.o} fill="none" strokeLinecap="round" />
          ))}
          <path d="M0 118 Q -4 290 -10 420" stroke="#d9b56a" strokeOpacity="0.32" strokeWidth="2" fill="none" />
        </g>

        {/* the eye, outside in; every band soft-edged and a little translucent, so they blend like sheen */}
        <g transform="scale(0.8)">
        <ellipse cx="0" cy="8" rx="160" ry="196" fill={`url(#${id.halo})`} filter={`url(#${id.soft})`} />
        <path d={eye(112, 150)} fill={`url(#${id.gold})`} filter={`url(#${id.b1})`} opacity="0.85" />
        <path d={eye(92, 126, 6)} fill={`url(#${id.teal})`} filter={`url(#${id.b2})`} opacity="0.92" />
        <path d={eye(68, 96, 16)} fill={`url(#${id.neel})`} filter={`url(#${id.b3})`} opacity="0.95" />
        <path d={eye(36, 54, 34)} fill={`url(#${id.kesar})`} filter={`url(#${id.b4})`} opacity="0.88" />
        <ellipse cx="0" cy="54" rx="13" ry="17" fill={`url(#${id.kernel})`} filter={`url(#${id.glint})`} />
        {/* sheen on the teal band, and the one true glint */}
        <path
          d="M-64 -70 Q -40 -112 6 -118"
          stroke="#c9f5e8"
          strokeOpacity="0.45"
          strokeWidth="7"
          fill="none"
          strokeLinecap="round"
          filter={`url(#${id.b1})`}
          className={still ? undefined : "ls-shimmer"}
        />
        <circle cx="6" cy="45" r="9" fill="#fff6e0" opacity="0.25" filter={`url(#${id.glint})`} />
        <circle cx="6" cy="45" r="3" fill="#fffaf0" />
        </g>
      </g>

      <rect width={W} height={H} fill={`url(#${id.vig})`} />
      <Grain id={id.grain} />
    </Canvas>
  )
}
