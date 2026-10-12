"use client"

import * as React from "react"
import { BookOpenCheckIcon, FolderIcon, Link2Icon, PaperclipIcon } from "lucide-react"

import { Tag } from "@/components/ui/tag"

/** The one that is uploading goes from 0 to 100% again and again. */
export default function TagDemo() {
  const [progress, setProgress] = React.useState(0.1)
  React.useEffect(() => {
    const tick = window.setInterval(() => setProgress((value) => (value >= 1 ? 0 : Math.min(1, value + 0.07))), 220)
    return () => window.clearInterval(tick)
  }, [])
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Tag icon={<BookOpenCheckIcon />} onRemove={() => {}}>
        Check references
      </Tag>
      <Tag icon={<Link2Icon />} onRemove={() => {}}>
        page_index.json
      </Tag>
      <Tag icon={<PaperclipIcon />} progress={progress} onRemove={() => {}}>
        results.csv
      </Tag>
      <Tag error="The file is over 64 MB" onRemove={() => {}}>
        checkpoints.zip
      </Tag>
      <Tag icon={<FolderIcon className="text-sky-500/80" />} armed onRemove={() => {}}>
        research
      </Tag>
    </div>
  )
}
