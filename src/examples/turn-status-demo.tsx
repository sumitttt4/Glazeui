"use client"

import * as React from "react"

import type { Activity } from "@/components/ui/status-glyph"
import { TurnStatus } from "@/components/ui/turn-status"

const PHASES: { activity: Activity; label: string; tokens: number }[] = [
  { activity: "thinking", label: "Thinking", tokens: 0 },
  { activity: "searching", label: "Searching for “solver timeouts in the retail split”", tokens: 420 },
  { activity: "running", label: "Running python rerun.py --timeout 120", tokens: 1284 },
  { activity: "writing", label: "Writing paper/method.tex", tokens: 2610 },
]

/** A new kind of work every four seconds, the way a real turn goes. */
export default function TurnStatusDemo() {
  const [at, setAt] = React.useState(0)
  const [since] = React.useState(() => Date.now())
  React.useEffect(() => {
    const turn = window.setInterval(() => setAt((value) => (value + 1) % PHASES.length), 4000)
    return () => window.clearInterval(turn)
  }, [])
  return <TurnStatus {...PHASES[at]} since={since} className="w-full max-w-md" />
}
