import type * as React from "react"

import { Bawdi } from "./bawdi"
import { Diya } from "./diya"
import { Genda } from "./genda"
import { Kolam } from "./kolam"
import { Mor } from "./mor"

/**
 * The light studies as backdrops for real components: each with its art, an accent to tint the
 * primary colour inside it, and whether the cards should take the dark theme over it.
 */
export type LightStage = {
  slug: "genda" | "mor" | "diya" | "kolam" | "bawdi"
  name: string
  note: string
  Art: React.ComponentType<{ className?: string; label?: string; still?: boolean }>
  accent: string
  on: string
  dark: boolean
  swatch: string
}

export const LIGHT_STAGES: LightStage[] = [
  { slug: "genda", name: "Genda", note: "Marigold lit from inside", Art: Genda, accent: "#e8761e", on: "#ffffff", dark: true, swatch: "radial-gradient(circle, #fff1c9, #f2992e 45%, #7c2c12)" },
  { slug: "mor", name: "Mor", note: "Gold and teal in the dark", Art: Mor, accent: "#2e9f93", on: "#ffffff", dark: true, swatch: "radial-gradient(circle, #f2a03a 20%, #2e9f93 45%, #141c4a)" },
  { slug: "diya", name: "Diya", note: "One flame in a dark room", Art: Diya, accent: "#f2a03a", on: "#1f1a15", dark: true, swatch: "radial-gradient(circle at 50% 40%, #fff0bf, #ee7a1e 35%, #0b1030 70%)" },
  { slug: "kolam", name: "Kolam", note: "A filament of light", Art: Kolam, accent: "#d9ad55", on: "#1f1a15", dark: true, swatch: "radial-gradient(circle, #ffdc98 15%, #1c2a66 50%)" },
  { slug: "bawdi", name: "Bawdi", note: "Daylight down to water", Art: Bawdi, accent: "#0f6f6a", on: "#ffffff", dark: false, swatch: "radial-gradient(circle, #13615b 25%, #b08056 50%, #f0dec2)" },
]

/** The scoped colour variables that tint a stage's components with its accent. */
export const stageAccent = (stage: LightStage) =>
  ({
    "--primary": stage.accent,
    "--primary-foreground": stage.on,
    "--ring": stage.accent,
    // Over a study, the page colour some fields fill with is a dark tint, not a solid black hole.
    ...(stage.dark ? { "--background": "oklch(0.12 0.01 40 / 62%)" } : {}),
  }) as React.CSSProperties
