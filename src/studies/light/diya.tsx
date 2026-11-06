import { Blur, Canvas, Grain, H, W, seeded, useIds, type StudyProps } from "./shared"

/*
 * Diya: the lamp as weather. One flame drawn five times, from a wide blurred kesar aura to a small
 * white core; a gold-rimmed bowl; a few embers; and on the floor, a soft pool and a faint upturned
 * reflection. The only light in the frame is the flame's.
 */

const CX = W / 2
const BASE = 290

/** A flame: a soft point at the top, a full round at the bottom. */
function flame(w: number, h: number, base = BASE) {
  const x = CX
  return [
    `M${x} ${base - h}`,
    `C ${x + w * 0.2} ${base - h * 0.7} ${x + w * 0.56} ${base - h * 0.42} ${x + w * 0.5} ${base - h * 0.16}`,
    `C ${x + w * 0.45} ${base + h * 0.05} ${x - w * 0.45} ${base + h * 0.05} ${x - w * 0.5} ${base - h * 0.16}`,
    `C ${x - w * 0.56} ${base - h * 0.42} ${x - w * 0.2} ${base - h * 0.7} ${x} ${base - h} Z`,
  ].join(" ")
}

const random = seeded(5)
const EMBERS = Array.from({ length: 7 }, () => ({
  x: CX + (random() - 0.5) * 70,
  y: 96 + random() * 60,
  r: 0.9 + random() * 1.3,
  o: 0.55 + random() * 0.4,
  dur: 4.5 + random() * 3.5,
  delay: -random() * 6,
}))

export function Diya({ className, label, still }: StudyProps) {
  const id = useIds("bg", "warm", "floor", "outer", "mid", "inner", "core", "bowl", "rim", "aura", "b4", "b3", "b2", "b1", "rimGlow", "pool", "reflect", "ember", "grain")
  return (
    <Canvas label={label} className={className}>
      <defs>
        <linearGradient id={id.bg} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0a0e28" />
          <stop offset="0.7" stopColor="#0b0f2c" />
          <stop offset="1" stopColor="#070a1e" />
        </linearGradient>
        {/* the room the lamp lights: warm near it, falling off fast */}
        <radialGradient id={id.warm} cx={CX} cy="232" r="330" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#c8581a" stopOpacity="0.62" />
          <stop offset="0.28" stopColor="#8a3a24" stopOpacity="0.36" />
          <stop offset="0.62" stopColor="#3a1f3a" stopOpacity="0.12" />
          <stop offset="1" stopColor="#0a0e28" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id.floor} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff9a4a" stopOpacity="0" />
          <stop offset="0.18" stopColor="#ff9a4a" stopOpacity="0.06" />
          <stop offset="1" stopColor="#ff9a4a" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={id.outer} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffb14a" />
          <stop offset="0.55" stopColor="#ee7a1e" />
          <stop offset="1" stopColor="#b6380f" />
        </linearGradient>
        <linearGradient id={id.mid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd06a" />
          <stop offset="1" stopColor="#f39226" />
        </linearGradient>
        <linearGradient id={id.inner} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff0bf" />
          <stop offset="1" stopColor="#ffc25a" />
        </linearGradient>
        <radialGradient id={id.core} cx="50%" cy="60%" r="60%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#fff2cf" />
        </radialGradient>
        <linearGradient id={id.bowl} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d2491d" />
          <stop offset="1" stopColor="#6e1a0e" />
        </linearGradient>
        <linearGradient id={id.rim} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#a6772c" />
          <stop offset="0.5" stopColor="#ffe4a0" />
          <stop offset="1" stopColor="#a6772c" />
        </linearGradient>
        <Blur id={id.aura} amount={26} />
        <Blur id={id.b4} amount={5} />
        <Blur id={id.b3} amount={3} />
        <Blur id={id.b2} amount={2} />
        <Blur id={id.b1} amount={1.1} />
        <Blur id={id.rimGlow} amount={3.5} />
        <Blur id={id.pool} amount={9} />
        <Blur id={id.reflect} amount={7} />
        <Blur id={id.ember} amount={0.6} />
      </defs>

      <rect width={W} height={H} fill={`url(#${id.bg})`} />
      <rect width={W} height={H} fill={`url(#${id.warm})`} className={still ? undefined : "ls-breathe"} />
      <rect y="296" width={W} height={H - 296} fill={`url(#${id.floor})`} />

      {/* on the floor: the bowl's shadow, a pool of light, the flame upside down and faint */}
      <ellipse cx={CX} cy="326" rx="104" ry="9" fill="#020308" opacity="0.6" filter={`url(#${id.b4})`} />
      <ellipse cx={CX} cy="344" rx="120" ry="14" fill="#e8761e" opacity="0.16" filter={`url(#${id.pool})`} />
      <g transform={`translate(0 ${BASE * 2 + 60}) scale(1 -1)`} opacity="0.13" filter={`url(#${id.reflect})`}>
        <path d={flame(110, 150)} fill="#f39226" />
      </g>

      {/* the flame, outside in, breathing very slightly from its base */}
      <g className={still ? undefined : "ls-flicker"}>
        <path d={flame(250, 300, BASE + 26)} fill="#e8761e" opacity="0.42" filter={`url(#${id.aura})`} />
        <path d={flame(120, 176)} fill={`url(#${id.outer})`} filter={`url(#${id.b4})`} opacity="0.95" />
        <path d={flame(84, 128, BASE - 6)} fill={`url(#${id.mid})`} filter={`url(#${id.b3})`} />
        <path d={flame(52, 86, BASE - 12)} fill={`url(#${id.inner})`} filter={`url(#${id.b2})`} />
        <path d={flame(28, 50, BASE - 18)} fill={`url(#${id.core})`} filter={`url(#${id.b1})`} />
      </g>

      {/* the bowl: a shallow crescent, its rim catching the flame */}
      <path d={`M${CX - 86} 298 Q ${CX} 334 ${CX + 86} 298 Q ${CX + 70} 324 ${CX} 328 Q ${CX - 70} 324 ${CX - 86} 298 Z`} fill={`url(#${id.bowl})`} />
      <path d={`M${CX - 88} 297 Q ${CX} 322 ${CX + 88} 297`} stroke="#ffcf73" strokeWidth="6" strokeOpacity="0.5" fill="none" strokeLinecap="round" filter={`url(#${id.rimGlow})`} />
      <path d={`M${CX - 88} 297 Q ${CX} 322 ${CX + 88} 297`} stroke={`url(#${id.rim})`} strokeWidth="2.6" fill="none" strokeLinecap="round" />

      {!still &&
        EMBERS.map((e, i) => (
          <circle
            key={i}
            cx={e.x}
            cy={e.y}
            r={e.r}
            fill="#ffb457"
            opacity={e.o}
            filter={`url(#${id.ember})`}
            className="ls-rise"
            style={{ ["--ls-dur" as string]: `${e.dur}s`, ["--ls-delay" as string]: `${e.delay}s`, ["--ls-o" as string]: e.o }}
          />
        ))}
      {/* in the still version (the small card), two resting embers in place of the rising ones */}
      {still && (
      <g>
        <circle cx={CX - 8} cy="118" r="1.6" fill="#ffb457" opacity="0.7" filter={`url(#${id.ember})`} />
        <circle cx={CX + 14} cy="92" r="1.1" fill="#ffb457" opacity="0.5" filter={`url(#${id.ember})`} />
      </g>
      )}

      <Grain id={id.grain} opacity={0.08} />
    </Canvas>
  )
}
