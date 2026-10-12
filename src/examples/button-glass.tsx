import { ArrowUpIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function ButtonGlass() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button variant="glass">Later</Button>
      <Button variant="glass" data-strong>
        Rerun now
      </Button>
      <Button variant="glass" size="icon" aria-label="Send">
        <ArrowUpIcon />
      </Button>
    </div>
  )
}
