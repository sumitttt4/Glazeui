import { ContextRing } from "@/components/ui/context-ring"

const parts = [
  { key: "messages", label: "Messages", tokens: 61_400, tint: "bg-blue-500" },
  { key: "tools", label: "Tools", tokens: 14_200, tint: "bg-orange-500" },
  { key: "system", label: "System prompt", tokens: 6_800, tint: "bg-emerald-500" },
  { key: "skills", label: "Skills", tokens: 3_900, tint: "bg-amber-500" },
]

export default function ContextRingDemo() {
  return (
    <div className="flex items-center gap-6">
      <ContextRing used={24_000} window={200_000} />
      <ContextRing used={86_300} window={200_000} parts={parts} />
      <ContextRing used={152_000} window={200_000} />
      <ContextRing used={188_000} window={200_000} />
    </div>
  )
}
