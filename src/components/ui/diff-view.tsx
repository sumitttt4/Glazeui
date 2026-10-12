import { cn } from "@/lib/utils"

/** Lines added and removed by a unified patch, headers aside. */
function patchStats(patch: string): { added: number; removed: number } {
  let added = 0
  let removed = 0
  for (const line of patch.split("\n")) {
    if (line.startsWith("+++") || line.startsWith("---")) continue
    if (line.startsWith("+")) added++
    else if (line.startsWith("-")) removed++
  }
  return { added, removed }
}

function DiffStats({ added, removed, className }: { added: number; removed: number; className?: string }) {
  return (
    <span data-slot="diff-stats" className={cn("shrink-0 text-[12px] tabular-nums", className)}>
      <span className="text-emerald-600 dark:text-emerald-400">+{added}</span>{" "}
      <span className="text-rose-600 dark:text-rose-400">−{removed}</span>
    </span>
  )
}

/** A patch as a diff: hunks with added and removed lines coloured, headers dropped. */
function DiffView({ patch, className }: { patch: string; className?: string }) {
  const lines = patch
    .replace(/\n$/, "")
    .split("\n")
    .filter((line) => !line.startsWith("+++") && !line.startsWith("---"))
  return (
    <div
      data-slot="diff-view"
      className={cn("glass-panel scrollbar-thin max-h-80 overflow-auto rounded-md py-1 font-mono text-[11.5px] leading-[1.6]", className)}
    >
      {lines.map((line, index) => (
        <div
          key={index}
          className={cn(
            "min-w-fit px-3 whitespace-pre",
            line.startsWith("+") && "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
            line.startsWith("-") && "bg-rose-500/10 text-rose-700 dark:text-rose-300",
            line.startsWith("@@") && "mt-1 text-muted-foreground/70 first:mt-0",
            line.startsWith("...") && "text-muted-foreground/70 italic"
          )}
        >
          {line || " "}
        </div>
      ))}
    </div>
  )
}

export { DiffView, DiffStats, patchStats }
