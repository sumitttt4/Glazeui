import * as React from "react"

import { CreateContext, FONTS as CHOICES } from "@/create/options"

// The preview cards are shadcn/ui's, written against its own Create page. These stand in for what
// they read from it: the fonts, the style's name, and which icon library is in use.

export type IconLibraryName = "lucide" | "tabler" | "hugeicons" | "phosphor" | "remixicon"

export const FONTS = CHOICES.map((font) => ({ value: font.value, name: font.name }))

export const STYLES = [{ name: "solid-glass", title: "Solid Glass" }]

export function useDesignSystemSearchParams() {
  const options = React.useContext(CreateContext)
  return [{ style: "solid-glass", font: options.font, fontHeading: options.heading, iconLibrary: "lucide" as IconLibraryName }] as const
}
