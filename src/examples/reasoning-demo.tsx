import { Reasoning } from "@/components/ui/reasoning"

const TEXT =
  "They asked me to check the sources again, not to redo the survey. The last turn made three citations; each should be held against the official docs rather than searched for afresh. The GitHub address was a guess of mine, and this time I should say so."

export default function ReasoningDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-5">
      <Reasoning thinking>{TEXT}</Reasoning>
      <Reasoning defaultOpen>{TEXT}</Reasoning>
    </div>
  )
}
