import { StepGroup, type Step } from "@/components/ui/tool-steps"

const PATCH = `@@ -12,7 +12,9 @@
 def fetch(url):
-    return requests.get(url)
+    response = requests.get(url, timeout=30)
+    response.raise_for_status()
+    return response
`

const steps: Step[] = [
  { id: "search", label: "Searched for “training on CPFS, official docs”", status: "done", detail: "training on CPFS, official docs", detailLabel: "Query", output: "8 results" },
  { id: "fetch", label: "Read github.com/acme-research", status: "done", detail: "https://github.com/acme-research", error: "HTTP 404 Not Found" },
  { id: "edit", label: "Edited research.py", status: "done", patch: PATCH },
  { id: "run", label: "Ran python research.py", status: "done", detail: "python research.py", detailLabel: "Command", output: "3 sources checked\n1 address returned 404" },
]

export default function ToolStepsDemo() {
  return (
    <div className="w-full max-w-md">
      <StepGroup steps={steps} />
    </div>
  )
}
