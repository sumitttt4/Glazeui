"use client"

import * as React from "react"
import { FileTextIcon, FolderIcon, RefreshCwIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Panel, PanelRow } from "@/components/ui/panel"

const files = ["sources.md", "research.py", "page_index.json"]

export default function PanelDemo() {
  const [chosen, setChosen] = React.useState(files[0])
  return (
    <Panel
      title="Files"
      className="w-64"
      onClose={() => {}}
      actions={
        <Button variant="ghost" size="icon-xs" aria-label="Refresh" className="text-muted-foreground hover:text-foreground">
          <RefreshCwIcon className="size-3.5" />
        </Button>
      }
    >
      <div className="flex flex-col gap-px p-1.5 pt-0.5">
        <PanelRow>
          <FolderIcon /> research
        </PanelRow>
        {files.map((name) => (
          <PanelRow key={name} chosen={name === chosen} onClick={() => setChosen(name)} className="pl-6">
            <FileTextIcon /> <span className="truncate">{name}</span>
          </PanelRow>
        ))}
      </div>
    </Panel>
  )
}
