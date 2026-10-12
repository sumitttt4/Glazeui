import { STATUS_FIGURES, StatusGlyph } from "@/components/ui/status-glyph"

export default function StatusGlyphFigures() {
  return (
    <div className="grid w-full max-w-md grid-cols-5 gap-y-8">
      {STATUS_FIGURES.map(({ activity, name, figure }) => (
        <div key={name} className="flex flex-col items-center gap-3">
          <StatusGlyph figure={figure} className="size-10 text-foreground/85" />
          <div className="text-center">
            <p className="font-mono text-xs">{name}</p>
            <p className="text-[11px] text-muted-foreground">{activity}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
