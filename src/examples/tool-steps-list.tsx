import { StepList, type Step } from "@/components/ui/tool-steps"

const steps: Step[] = [
  { id: "search", label: "Searched for “training on CPFS, official docs”", status: "done", detail: "training on CPFS, official docs", detailLabel: "Query", output: "8 results" },
  { id: "fetch", label: "Read github.com/acme-research", status: "done", detail: "https://github.com/acme-research", error: "HTTP 404 Not Found" },
  { id: "run", label: "Running python research.py", status: "running", detail: "python research.py", detailLabel: "Command" },
]

export default function ToolStepsList() {
  return <StepList steps={steps} className="w-full max-w-md" />
}
