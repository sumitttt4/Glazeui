"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { StatusGlyph, type Activity } from "@/components/ui/status-glyph"

const ACTIVITIES: Activity[] = ["thinking", "searching", "running", "writing", "compacting"]

export default function StatusGlyphDemo() {
  const [activity, setActivity] = React.useState<Activity>("thinking")
  return (
    <div className="flex flex-col items-center gap-10">
      <StatusGlyph activity={activity} className="size-20 text-foreground/90" />
      <div className="flex gap-0.5">
        {ACTIVITIES.map((value) => (
          <button
            key={value}
            type="button"
            aria-pressed={value === activity}
            onClick={() => setActivity(value)}
            className={cn(
              "h-7 rounded-sm px-2.5 text-[13px] text-muted-foreground capitalize outline-none hover:text-foreground",
              value === activity && "glass-chosen text-foreground"
            )}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  )
}
