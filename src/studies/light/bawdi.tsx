import { Blur, Canvas, Grain, H, W, useIds, type StudyProps } from "./shared"

/*
 * Bawdi: a stepwell seen from above, lit from the upper left. Eleven square levels step down from
 * chandan daylight. On each level the upper-left wall is in shade and throws a soft shadow onto
 * the tread below it, and the lower-right riser catches the light. At the bottom there is no
 * object: the last level is water, flat and in shadow, with one patch where the shaft of light
 * reaches it.
 */

const CX = W / 2
const CY = H / 2
const LEVELS = 11
const WATER = 50
const STEP = 26

/** Treads from the top (index 0, daylight) down to the level just above the water. */
const TREADS = Array.from({ length: LEVELS - 1 }, (_, i) => {
  const s = WATER + STEP * (LEVELS - 1 - i)
  const t = i / (LEVELS - 2)
  return { s, t }
})

const mix = (a: number[], b: number[], t: number) => a.map((v, i) => Math.round(v + (b[i] - v) * t))
const hex = (c: number[]) => `#${c.map((v) => v.toString(16).padStart(2, "0")).join("")}`
const DAY = [240, 222, 194]
const MID = [176, 128, 86]
const DEEP = [64, 36, 20]
const base = (t: number) => (t < 0.5 ? mix(DAY, MID, t / 0.5) : mix(MID, DEEP, (t - 0.5) / 0.5))
/** A level's colour: daylight at the top, earth in shadow near the water. */
const tone = (t: number) => hex(base(t))
/** The same level where the light falls on it. */
const lighter = (t: number) => hex(mix(base(t), [255, 248, 236], 0.2))

const diamond = (s: number) => `M${CX} ${CY - s} L${CX + s} ${CY} L${CX} ${CY + s} L${CX - s} ${CY} Z`
/** The upper-left edge (in shade) and the lower-right edge (lit) of a level. */
const shadeEdge = (s: number) => `M${CX - s} ${CY} L${CX} ${CY - s} L${CX + s * 0.35} ${CY - s * 0.65}`
const litEdge = (s: number) => `M${CX + s} ${CY} L${CX} ${CY + s}`

export function Bawdi({ className, label, still }: StudyProps) {
  const id = useIds("bg", "dark", "shaft", "water", "patch", "shade", "soft", "shaftBlur", "patchBlur", "waterClip", "grain", ...TREADS.map((_, i) => `clip${i}`), ...TREADS.map((_, i) => `face${i}`))
  return (
    <Canvas label={label} className={className}>
      <defs>
        <linearGradient id={id.bg} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f6e8d2" />
          <stop offset="1" stopColor="#d9b48a" />
        </linearGradient>
        {/* ambient darkness pooling toward the bottom of the well */}
        <radialGradient id={id.dark} cx={CX} cy={CY} r="300" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#140a05" stopOpacity="0.55" />
          <stop offset="0.45" stopColor="#140a05" stopOpacity="0.2" />
          <stop offset="1" stopColor="#140a05" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id.shaft} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff7e6" stopOpacity="0.5" />
          <stop offset="0.6" stopColor="#fff7e6" stopOpacity="0.18" />
          <stop offset="1" stopColor="#fff7e6" stopOpacity="0" />
        </linearGradient>
        {/* mor water in shade: darkest under the shaded wall, opening toward the light */}
        <linearGradient id={id.water} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#061f22" />
          <stop offset="0.55" stopColor="#0b3e3f" />
          <stop offset="1" stopColor="#13615b" />
        </linearGradient>
        <radialGradient id={id.patch} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#8fe3d2" stopOpacity="0.75" />
          <stop offset="0.5" stopColor="#3fa597" stopOpacity="0.35" />
          <stop offset="1" stopColor="#3fa597" stopOpacity="0" />
        </radialGradient>
        {TREADS.map((tread, i) => (
          <linearGradient key={i} id={id[`face${i}`]} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={lighter(tread.t)} />
            <stop offset="1" stopColor={tone(Math.min(1, tread.t + 0.06))} />
          </linearGradient>
        ))}
        {TREADS.map((tread, i) => (
          <clipPath key={i} id={id[`clip${i}`]}>
            <path d={diamond(tread.s)} />
          </clipPath>
        ))}
        <clipPath id={id.waterClip}>
          <path d={diamond(WATER)} />
        </clipPath>
        <Blur id={id.shade} amount={3.2} />
        <Blur id={id.soft} amount={2} />
        <Blur id={id.shaftBlur} amount={22} />
        <Blur id={id.patchBlur} amount={4} />
      </defs>

      <rect width={W} height={H} fill={`url(#${id.bg})`} />

      {/* the treads, top to bottom; each with its shaded wall and its lit riser */}
      {TREADS.map((tread, i) => (
        <g key={i}>
          <path d={diamond(tread.s)} fill={`url(#${id[`face${i}`]})`} />
          <g clipPath={`url(#${id[`clip${i}`]})`}>
            <path d={shadeEdge(tread.s)} stroke="#1c0e06" strokeOpacity={0.26 + tread.t * 0.26} strokeWidth="10" fill="none" filter={`url(#${id.shade})`} />
          </g>
          <path d={litEdge(tread.s)} stroke="#fff4e0" strokeOpacity={0.5 - tread.t * 0.3} strokeWidth="1.4" fill="none" />
        </g>
      ))}

      <rect width={W} height={H} fill={`url(#${id.dark})`} />

      {/* the water: flat, set into the last level, shaded from the upper left */}
      <path d={diamond(WATER)} fill={`url(#${id.water})`} />
      <g clipPath={`url(#${id.waterClip})`}>
        <path d={shadeEdge(WATER)} stroke="#020a0b" strokeOpacity="0.65" strokeWidth="22" fill="none" filter={`url(#${id.shade})`} />
        <g className={still ? undefined : "ls-shimmer"}>
          <ellipse cx={CX + 12} cy={CY + 14} rx="30" ry="15" transform={`rotate(-45 ${CX + 12} ${CY + 14})`} fill={`url(#${id.patch})`} filter={`url(#${id.patchBlur})`} />
        </g>
        {/* faint ripples where the light lands, and the lit wall's reflection along the far edge */}
        <ellipse cx={CX + 12} cy={CY + 14} rx="20" ry="8" transform={`rotate(-45 ${CX + 12} ${CY + 14})`} stroke="#b8f0e3" strokeOpacity="0.22" strokeWidth="0.8" fill="none" />
        <ellipse cx={CX + 12} cy={CY + 14} rx="34" ry="14" transform={`rotate(-45 ${CX + 12} ${CY + 14})`} stroke="#b8f0e3" strokeOpacity="0.12" strokeWidth="0.8" fill="none" />
        <path d={litEdge(WATER - 3)} stroke="#c9efe4" strokeOpacity="0.28" strokeWidth="2.5" fill="none" filter={`url(#${id.soft})`} />
      </g>
      <path d={litEdge(WATER)} stroke="#f2d6ae" strokeOpacity="0.45" strokeWidth="1.2" fill="none" />

      {/* a soft shaft of daylight falling from the upper left onto the water */}
      <path
        d={`M${CX - 360} ${CY - 320} L${CX - 200} ${CY - 320} L${CX + 46} ${CY + 30} L${CX + 4} ${CY + 52} Z`}
        fill={`url(#${id.shaft})`}
        filter={`url(#${id.shaftBlur})`}
        style={{ mixBlendMode: "screen" }}
      />

      <Grain id={id.grain} opacity={0.1} />
    </Canvas>
  )
}
