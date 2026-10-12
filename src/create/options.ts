import * as React from "react"

/**
 * What can be tuned on the Create page, and what each choice does to the material: a handful of
 * the stylesheet's own variables, per theme. A choice left at its default changes nothing, so the
 * code handed over at the end holds only what was actually tuned.
 */

export type Mode = "dark" | "light"

export const FONTS = [
  { value: "geist", name: "Geist", family: '"Geist Variable", ui-sans-serif, system-ui, sans-serif' },
  { value: "system", name: "System", family: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif' },
  { value: "rounded", name: "Rounded", family: 'ui-rounded, "SF Pro Rounded", system-ui, sans-serif' },
  { value: "serif", name: "Serif", family: 'ui-serif, Georgia, "Times New Roman", serif' },
  { value: "mono", name: "Geist Mono", family: '"Geist Mono Variable", ui-monospace, SFMono-Regular, Menlo, monospace' },
] as const

const fontChoices = FONTS.map((font) => ({ value: font.value, label: font.name }))

/** Every option, in the order the panel shows them and the preset string spells them. */
export const OPTIONS = {
  thickness: {
    label: "Thickness",
    choices: [
      { value: "thin", label: "Thin" },
      { value: "default", label: "Default" },
      { value: "thick", label: "Thick" },
      { value: "opaque", label: "Opaque" },
    ],
    default: "default",
  },
  tint: {
    label: "Tint",
    choices: [
      { value: "neutral", label: "Neutral" },
      { value: "cool", label: "Cool" },
      { value: "warm", label: "Warm" },
    ],
    default: "neutral",
  },
  chart: {
    label: "Chart Color",
    choices: [
      { value: "neutral", label: "Neutral" },
      { value: "red", label: "Red" },
      { value: "orange", label: "Orange" },
      { value: "amber", label: "Amber" },
      { value: "yellow", label: "Yellow" },
      { value: "lime", label: "Lime" },
      { value: "green", label: "Green" },
      { value: "emerald", label: "Emerald" },
      { value: "teal", label: "Teal" },
      { value: "cyan", label: "Cyan" },
      { value: "sky", label: "Sky" },
      { value: "blue", label: "Blue" },
      { value: "indigo", label: "Indigo" },
      { value: "violet", label: "Violet" },
      { value: "purple", label: "Purple" },
      { value: "fuchsia", label: "Fuchsia" },
      { value: "pink", label: "Pink" },
      { value: "rose", label: "Rose" },
    ],
    default: "neutral",
  },
  heading: { label: "Heading", choices: fontChoices, default: "geist" },
  font: { label: "Font", choices: fontChoices, default: "geist" },
  radius: {
    label: "Radius",
    choices: [
      { value: "none", label: "None" },
      { value: "small", label: "Small" },
      { value: "default", label: "Default" },
      { value: "large", label: "Large" },
    ],
    default: "default",
  },
  rim: {
    label: "Rim",
    choices: [
      { value: "soft", label: "Soft" },
      { value: "default", label: "Default" },
      { value: "bright", label: "Bright" },
    ],
    default: "default",
  },
  blur: {
    label: "Blur",
    choices: [
      { value: "none", label: "None" },
      { value: "default", label: "Default" },
      { value: "heavy", label: "Heavy" },
    ],
    default: "default",
  },
} as const

export type OptionKey = keyof typeof OPTIONS
export type Options = Record<OptionKey, string>
export const KEYS = Object.keys(OPTIONS) as OptionKey[]

export const DEFAULTS = Object.fromEntries(KEYS.map((key) => [key, OPTIONS[key].default])) as Options

const TINT: Record<string, Record<Mode, { c: number; h: number }>> = {
  neutral: { dark: { c: 0, h: 0 }, light: { c: 0.005, h: 265 } },
  cool: { dark: { c: 0.014, h: 262 }, light: { c: 0.014, h: 262 } },
  warm: { dark: { c: 0.011, h: 70 }, light: { c: 0.012, h: 80 } },
}

// Fill and how much of it: the pane's lightness, then its opacity at each thickness.
const PANES: Record<Mode, { background: number; card: [number, number[]]; panel: [number, number[]]; popover: [number, number[]]; solid: number[] }> = {
  dark: { background: 0.16, card: [0.31, [30, 46, 68]], panel: [1, [3, 4.5, 7.5]], popover: [0.22, [86, 96, 99]], solid: [0.19, 0.225, 0.22] },
  light: { background: 0.925, card: [0.98, [40, 60, 82]], panel: [0.975, [28, 44, 64]], popover: [0.985, [86, 96, 99]], solid: [0.947, 0.958, 0.98] },
}

/** Where each chart colour sits on the wheel; the five steps of a chart share it and differ in lightness. */
export const CHART_HUE: Record<string, number> = {
  red: 27,
  orange: 50,
  amber: 75,
  yellow: 98,
  lime: 128,
  green: 150,
  emerald: 163,
  teal: 183,
  cyan: 212,
  sky: 235,
  blue: 255,
  indigo: 275,
  violet: 293,
  purple: 307,
  fuchsia: 325,
  pink: 350,
  rose: 12,
}
const CHART_LIGHT: Record<Mode, number[]> = { dark: [0.94, 0.83, 0.69, 0.56, 0.44], light: [0.87, 0.556, 0.439, 0.371, 0.269] }
const CHART_CHROMA = [0.07, 0.13, 0.15, 0.13, 0.1]

const RADIUS: Record<string, [string, string]> = { none: ["0rem", "0rem"], small: ["0.5rem", "0.4rem"], large: ["1.125rem", "0.9rem"] }
const RIM: Record<string, Record<Mode, [number, number]>> = {
  soft: { dark: [8, 5], light: [55, 50] },
  bright: { dark: [32, 22], light: [100, 100] },
}

const colour = (l: number, tint: { c: number; h: number }, alpha?: number) =>
  `oklch(${l} ${tint.c} ${tint.c ? tint.h : 0}${alpha === undefined ? "" : ` / ${alpha}%`})`

/** The variables one theme takes for these options: only the ones that differ from the stylesheet. */
export function overrides(options: Options, mode: Mode): Record<string, string> {
  const vars: Record<string, string> = {}
  const tint = (TINT[options.tint] ?? TINT.neutral)[mode]
  const panes = PANES[mode]

  if (options.tint !== "neutral") vars["--background"] = colour(panes.background, tint)

  if (options.thickness !== "default" || options.tint !== "neutral") {
    if (options.thickness === "opaque") {
      vars["--panel"] = colour(panes.solid[0], tint)
      vars["--card"] = colour(panes.solid[1], tint)
      vars["--popover"] = colour(panes.solid[2], tint)
    } else {
      const at = ["thin", "default", "thick"].indexOf(options.thickness)
      // In dark the panel is a wash of white, whatever the tint: that is what makes it the thinnest.
      vars["--panel"] = mode === "dark" ? `oklch(1 0 0 / ${panes.panel[1][at]}%)` : colour(panes.panel[0], tint, panes.panel[1][at])
      vars["--card"] = colour(panes.card[0], tint, panes.card[1][at])
      vars["--popover"] = colour(panes.popover[0], tint, panes.popover[1][at])
    }
  }

  if (options.chart !== "neutral") {
    const h = CHART_HUE[options.chart]
    CHART_LIGHT[mode].forEach((l, index) => {
      vars[`--chart-${index + 1}`] = `oklch(${l} ${CHART_CHROMA[index]} ${h})`
    })
  }

  if (options.rim !== "default") {
    const [rim, control] = RIM[options.rim][mode]
    vars["--glass-rim"] = `oklch(1 0 0 / ${rim}%)`
    vars["--glass-control-rim"] = `oklch(1 0 0 / ${control}%)`
  }

  return vars
}

/** The variables that are the same in both themes. */
export function shared(options: Options): Record<string, string> {
  const vars: Record<string, string> = {}
  if (options.radius !== "default") {
    vars["--radius"] = RADIUS[options.radius][0]
    vars["--radius-control"] = RADIUS[options.radius][1]
  }
  if (options.blur === "none" || options.thickness === "opaque") {
    vars["--glass-blur"] = "none"
    vars["--glass-blur-control"] = "none"
  } else if (options.blur === "heavy") {
    vars["--glass-blur"] = "blur(48px) saturate(180%)"
    vars["--glass-blur-control"] = "blur(24px)"
  }
  return vars
}

export const fontFamily = (value: string) => (FONTS.find((font) => font.value === value) ?? FONTS[0]).family

const block = (selector: string, vars: Record<string, string>) =>
  Object.keys(vars).length ? `${selector} {\n${Object.entries(vars).map(([name, value]) => `  ${name}: ${value};`).join("\n")}\n}\n` : ""

/** The CSS to put after the stylesheet: what was tuned, and nothing else. */
export function code(options: Options): string {
  const parts = [
    block(":root", { ...shared(options), ...overrides(options, "light") }),
    block(".dark", overrides(options, "dark")),
  ]
  const fonts: Record<string, string> = {}
  if (options.font !== "geist") fonts["--font-sans"] = fontFamily(options.font)
  if (options.heading !== options.font) fonts["--font-heading"] = fontFamily(options.heading)
  parts.push(block("@theme inline", fonts))
  const css = parts.filter(Boolean).join("\n")
  return css || "/* Nothing tuned: the stylesheet as it comes. */\n"
}

/** A preset is the options spelled as one character each, in order: "12000211". */
export const encode = (options: Options) => KEYS.map((key) => OPTIONS[key].choices.findIndex((choice) => choice.value === options[key]).toString(36)).join("")

export function decode(preset: string | null): Options {
  const options = { ...DEFAULTS }
  if (!preset || preset.length !== KEYS.length) return options
  KEYS.forEach((key, index) => {
    const choice = OPTIONS[key].choices[parseInt(preset[index], 36)]
    if (choice) options[key] = choice.value
  })
  return options
}

export const shuffle = (): Options =>
  Object.fromEntries(KEYS.map((key) => [key, OPTIONS[key].choices[Math.floor(Math.random() * OPTIONS[key].choices.length)].value])) as Options

export const CreateContext = React.createContext<Options>(DEFAULTS)
