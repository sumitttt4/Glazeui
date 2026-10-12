import * as React from "react"
import { CheckIcon, LinkIcon, RotateCcwIcon, ShuffleIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { code, DEFAULTS, encode, fontFamily, KEYS, OPTIONS, shuffle, type Mode, type OptionKey, type Options } from "@/create/options"
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"
import { CodeBlock } from "@/site/code"

/** What stands at the end of a picker's row, to show the choice without opening it. */
function Sign({ option, value }: { option: OptionKey | "mode"; value: string }) {
  if (option === "heading" || option === "font") {
    return (
      <span style={{ fontFamily: fontFamily(value) }} className="text-base leading-none">
        Aa
      </span>
    )
  }
  if (option === "radius") {
    const corner = { none: "0", small: "3px", default: "6px", large: "9px" }[value] ?? "6px"
    return <span style={{ borderTopLeftRadius: corner }} className="size-4 border-t-2 border-l-2 border-foreground/70" />
  }
  if (option === "chart") {
    const hue = { blue: 250, green: 155, amber: 75, violet: 300 }[value]
    return <span style={{ background: hue === undefined ? "var(--muted-foreground)" : `oklch(0.7 0.14 ${hue})` }} className="size-4 rounded-full" />
  }
  if (option === "tint") {
    const tint = { neutral: "oklch(0.6 0 0)", cool: "oklch(0.6 0.05 262)", warm: "oklch(0.6 0.05 70)" }[value]
    return <span style={{ background: tint }} className="size-4 rounded-full" />
  }
  if (option === "mode") {
    return <span className={cn("size-4 rounded-full border border-foreground/30", value === "dark" ? "bg-[oklch(0.2_0_0)]" : "bg-[oklch(0.95_0_0)]")} />
  }
  // thickness, rim, blur: how far along its scale the choice is
  const choices = OPTIONS[option].choices
  const at = choices.findIndex((choice) => choice.value === value)
  return (
    <span className="flex items-end gap-0.5">
      {choices.map((choice, index) => (
        <span key={choice.value} style={{ height: 6 + index * 3 }} className={cn("w-1 rounded-full", index <= at ? "bg-foreground/70" : "bg-foreground/15")} />
      ))}
    </span>
  )
}

function Picker({
  option,
  label,
  value,
  choices,
  onChange,
}: {
  option: OptionKey | "mode"
  label: string
  value: string
  choices: readonly { value: string; label: string }[]
  onChange: (value: string) => void
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            className="glass-held flex w-36 shrink-0 items-center gap-2 rounded-lg px-2.5 py-2 text-left outline-none hover:bg-muted focus-visible:bg-muted md:w-full"
          />
        }
      >
        <span className="flex min-w-0 flex-col gap-0.5">
          <span className="text-xs leading-none text-muted-foreground">{label}</span>
          <span className="truncate text-sm leading-tight font-medium">{choices.find((choice) => choice.value === value)?.label}</span>
        </span>
        <span className="ml-auto flex shrink-0 items-center">
          <Sign option={option} value={value} />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" align="start" sideOffset={14} className="min-w-44">
        <DropdownMenuRadioGroup value={value} onValueChange={(next) => onChange(String(next))}>
          {choices.map((choice) => (
            <DropdownMenuRadioItem key={choice.value} value={choice.value}>
              <span style={option === "heading" || option === "font" ? { fontFamily: fontFamily(choice.value) } : undefined}>{choice.label}</span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const MODES = [
  { value: "dark", label: "Dark" },
  { value: "light", label: "Light" },
]

// Where a line is drawn between one group of pickers and the next.
const BREAK_AFTER: OptionKey[] = ["chart", "font"]

/** The panel beside the preview: one picker per option, then what to do with the result. */
export function Customizer({
  options,
  onChange,
  mode,
  onMode,
  className,
}: {
  options: Options
  onChange: (options: Options) => void
  mode: Mode
  onMode: (mode: Mode) => void
  className?: string
}) {
  const { isCopied, copyToClipboard } = useCopyToClipboard()
  const preset = encode(options)
  const link = () => `${window.location.origin}${import.meta.env.BASE_URL.replace(/\/$/, "")}/create?preset=${preset}`
  const css = code(options)

  return (
    <div data-slot="customizer" className={cn("glass-panel flex min-h-0 shrink-0 flex-col rounded-2xl md:w-48", className)}>
      <div className="hidden h-12 shrink-0 items-center justify-between border-b px-3.5 md:flex">
        <span className="text-sm font-medium">Tune the glass</span>
        <Button variant="ghost" size="icon-xs" aria-label="Back to the stylesheet as it comes" onClick={() => onChange(DEFAULTS)}>
          <RotateCcwIcon />
        </Button>
      </div>
      <div className="no-scrollbar flex min-h-0 flex-1 gap-1 overflow-x-auto p-2 md:flex-col md:overflow-x-visible md:overflow-y-auto">
        <Picker option="mode" label="Mode" value={mode} choices={MODES} onChange={(value) => onMode(value as Mode)} />
        <span className="my-1 hidden h-px shrink-0 bg-border md:block" />
        {KEYS.map((key) => (
          <React.Fragment key={key}>
            <Picker option={key} label={OPTIONS[key].label} value={options[key]} choices={OPTIONS[key].choices} onChange={(value) => onChange({ ...options, [key]: value })} />
            {BREAK_AFTER.includes(key) && <span className="my-1 hidden h-px shrink-0 bg-border md:block" />}
          </React.Fragment>
        ))}
      </div>
      <div className="flex shrink-0 gap-1.5 border-t p-2 md:flex-col">
        <Button variant="outline" size="sm" className="min-w-0 flex-1 font-mono text-xs md:flex-none" onClick={() => copyToClipboard(link())}>
          {isCopied ? <CheckIcon /> : <LinkIcon />}
          <span className="truncate">{isCopied ? "Link copied" : `--preset ${preset}`}</span>
        </Button>
        <Button variant="outline" size="sm" className="flex-1 md:flex-none" onClick={() => onChange(shuffle())}>
          <ShuffleIcon />
          Shuffle
        </Button>
        <Dialog>
          <DialogTrigger render={<Button size="sm" className="flex-1 md:flex-none" />}>Get Code</DialogTrigger>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle>Your Solid Glass</DialogTitle>
              <DialogDescription>
                Add the stylesheet, then put this after it. It holds only what you tuned; everything else is the stylesheet as it comes.
              </DialogDescription>
            </DialogHeader>
            <div className="flex min-w-0 flex-col gap-3">
              <CodeBlock
                className="my-0"
                lang="bash"
                code={`npx shadcn@latest add ${window.location.origin}${import.meta.env.BASE_URL.replace(/\/$/, "")}/r/solid-glass.json`}
              />
              <CodeBlock className="my-0" lang="css" title="src/index.css" code={`@import "./solid-glass.css";\n\n${css}`} />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
