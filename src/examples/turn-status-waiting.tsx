"use client"

import * as React from "react"

import { TurnStatus } from "@/components/ui/turn-status"

export default function TurnStatusWaiting() {
  const [since] = React.useState(() => Date.now())
  return (
    <TurnStatus
      since={since}
      className="w-full max-w-md"
      trailing={<span className="text-[12.5px] text-muted-foreground/80">· 2 background tasks running</span>}
    />
  )
}
