"use client"

import * as React from "react"

import { StepList, type Step } from "@/components/ui/tool-steps"
import { TurnStatus } from "@/components/ui/turn-status"

const steps: Step[] = [
  { id: "1", label: "Searched for “solver timeouts in the retail split”", status: "done", detail: "solver timeouts in the retail split", detailLabel: "Query" },
  { id: "2", label: "Running python rerun.py --timeout 120", status: "running", detail: "python rerun.py --timeout 120", detailLabel: "Command" },
]

export default function TurnStatusSteps() {
  const [since] = React.useState(() => Date.now() - 42_000)
  return (
    <TurnStatus activity="running" label="Running python rerun.py --timeout 120" since={since} tokens={1284} className="w-full max-w-md">
      <StepList steps={steps} />
    </TurnStatus>
  )
}
