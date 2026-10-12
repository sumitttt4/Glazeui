import { StatusGlyph } from "@/components/ui/status-glyph"

export default function StatusGlyphInline() {
  return (
    <p className="flex items-center gap-2 text-sm text-muted-foreground">
      <StatusGlyph activity="searching" className="text-foreground/85" />
      Checking three sources
    </p>
  )
}
