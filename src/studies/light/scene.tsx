import * as React from "react"
import { Calendar03Icon, Idea01Icon, MagicWand01Icon, Mic01Icon, Notification01Icon, Sent02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { cn } from "@/lib/utils"
import { DEMO_MODELS } from "@/lib/demo-ai"
import { AudioWaveform, useSimulatedLevels } from "@/components/ui/audio-waveform"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ModelPicker } from "@/components/ui/model-picker"
import { PromptSuggestions } from "@/components/ui/prompt-suggestions"
import { StreamingText } from "@/components/ui/streaming-text"
import { Switch } from "@/components/ui/switch"
import { TokenCounter } from "@/components/ui/token-counter"
import { VoiceOrb } from "@/components/ui/voice-orb"

/*
 * A live scene: several real Glaze components, in the Glass finish, over one study at a time. Switch
 * the study and the light behind crossfades; turn on "Match accent" and the primary colour takes the
 * study's own (scoped to this scene with inline variables, nothing global changes).
 */

export type SceneStudy = {
  slug: string
  name: string
  Art: React.ComponentType<{ className?: string; label?: string; still?: boolean }>
}

/** Each study's accent, used only when "Match accent" is on. Dark studies use the dark theme. */
const LOOK: Record<string, { accent: string; on: string; dark: boolean }> = {
  genda: { accent: "#e8761e", on: "#ffffff", dark: true },
  mor: { accent: "#2e9f93", on: "#ffffff", dark: true },
  diya: { accent: "#f2a03a", on: "#1f1a15", dark: true },
  kolam: { accent: "#d9ad55", on: "#1f1a15", dark: true },
  bawdi: { accent: "#0f6f6a", on: "#ffffff", dark: false },
}

const REPLY =
  "Here is a plan for the launch week. Monday: publish the docs and the install guide. Tuesday: share the launch film. Wednesday: open issues for feedback, and reply to every one the same day."

const SUGGESTIONS = [
  { title: "Draft the changelog", icon: MagicWand01Icon },
  { title: "Plan the launch week", icon: Calendar03Icon },
  { title: "Ideas for a demo", icon: Idea01Icon },
]

function Assistant() {
  const [model, setModel] = React.useState(DEMO_MODELS[0]?.id ?? "")
  const [run, setRun] = React.useState(0)
  return (
    <Card className="h-full">
      <CardHeader className="gap-3">
        <div className="flex items-center justify-between gap-3">
          <CardTitle>Assistant</CardTitle>
          <ModelPicker models={DEMO_MODELS} value={model} onValueChange={setModel} className="max-w-[60%]" />
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        <p className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-primary px-3.5 py-2 text-sm text-primary-foreground">
          Plan the launch week for Glaze
        </p>
        <div className="min-h-[7.5rem] text-sm leading-relaxed text-foreground/90">
          <StreamingText key={run} text={REPLY} speed={28} />
        </div>
        <PromptSuggestions variant="pills" suggestions={SUGGESTIONS} onSelect={() => setRun((n) => n + 1)} className="justify-start" />
        <form
          className="mt-auto flex items-center gap-2"
          onSubmit={(event) => {
            event.preventDefault()
            setRun((n) => n + 1)
          }}
        >
          <Input aria-label="Message" placeholder="Ask anything" />
          <Button type="submit" size="icon" aria-label="Send">
            <HugeiconsIcon icon={Sent02Icon} strokeWidth={1.8} />
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

function Voice() {
  const [live, setLive] = React.useState(true)
  const levels = useSimulatedLevels(live, 28)
  const level = live ? levels.reduce((a, b) => a + b, 0) / levels.length : 0
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <CardTitle>Voice</CardTitle>
          <Badge variant="secondary">{live ? "Listening" : "Paused"}</Badge>
        </div>
        <CardDescription>Talk through the plan hands-free.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col items-center justify-center gap-5">
        <VoiceOrb state={live ? "listening" : "idle"} level={level} size={132} />
        <AudioWaveform levels={live ? levels : levels.map(() => 0.04)} height={36} className="w-full text-primary" />
        <div className="flex w-full gap-2">
          <Button variant="outline" className="flex-1" onClick={() => setLive((on) => !on)}>
            <HugeiconsIcon icon={Mic01Icon} strokeWidth={1.8} />
            {live ? "Mute" : "Unmute"}
          </Button>
          <Button variant="secondary" className="flex-1">
            End
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function Usage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <CardTitle>Context</CardTitle>
          <TokenCounter
            used={128_400}
            limit={200_000}
            costPerMillion={3}
            parts={[
              { label: "Files", tokens: 74_000 },
              { label: "Conversation", tokens: 54_400 },
            ]}
          />
        </div>
        <CardDescription>128.4k of 200k tokens used this session.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-1.5 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-[64%] rounded-full bg-primary" />
        </div>
      </CardContent>
    </Card>
  )
}

function Settings() {
  const id = React.useId()
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HugeiconsIcon icon={Notification01Icon} strokeWidth={1.8} className="size-4" />
          Notifications
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3.5">
        {[
          ["Replies to my threads", true],
          ["Weekly summary", true],
          ["Product news", false],
        ].map(([label, on], i) => (
          <div key={String(label)} className="flex items-center justify-between gap-3">
            <Label htmlFor={`${id}-${i}`} className="font-normal">
              {label}
            </Label>
            <Switch id={`${id}-${i}`} defaultChecked={Boolean(on)} />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export function LightScene({ studies }: { studies: SceneStudy[] }) {
  const [current, setCurrent] = React.useState(studies[0]?.slug ?? "")
  const [match, setMatch] = React.useState(true)
  const look = LOOK[current] ?? LOOK.genda
  const accent = match ? ({ "--primary": look.accent, "--primary-foreground": look.on, "--ring": look.accent } as React.CSSProperties) : undefined
  const matchId = React.useId()

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div role="radiogroup" aria-label="Backdrop" className="flex flex-wrap gap-1 rounded-full bg-(--ls-ink)/[0.06] p-1">
          {studies.map(({ slug, name }) => (
            <button
              key={slug}
              type="button"
              role="radio"
              aria-checked={current === slug}
              onClick={() => setCurrent(slug)}
              className={cn(
                "h-8 rounded-full px-3.5 text-sm font-medium text-(--ls-ink-muted) transition-colors hover:text-(--ls-ink)",
                current === slug && "bg-(--ls-ivory-card) text-(--ls-ink) shadow-[0_1px_2px_rgb(40_20_10/0.12)]"
              )}
            >
              {name}
            </button>
          ))}
        </div>
        <label htmlFor={matchId} className="flex items-center gap-2.5 text-sm text-(--ls-ink-muted)">
          Match accent to the study
          <input
            id={matchId}
            type="checkbox"
            checked={match}
            onChange={(event) => setMatch(event.target.checked)}
            className="size-4 accent-(--ls-kesar)"
          />
        </label>
      </div>

      <div className={cn("relative mt-4 overflow-hidden rounded-3xl", look.dark && "dark")}>
        {/* every study stays mounted, so switching is a crossfade, not a redraw */}
        {studies.map(({ slug, Art }) => (
          <div
            key={slug}
            aria-hidden
            className="ls-art absolute inset-0 transition-opacity duration-500 ease-(--ls-ease-out) motion-reduce:transition-none"
            style={{ opacity: current === slug ? 1 : 0 }}
          >
            <Art still />
          </div>
        ))}
        <div
          data-material="glass"
          style={accent}
          className="relative grid gap-4 p-4 text-foreground sm:p-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)_minmax(0,1fr)] lg:p-8"
        >
          <Assistant />
          <Voice />
          <div className="flex flex-col gap-4">
            <Usage />
            <Settings />
          </div>
        </div>
      </div>
    </div>
  )
}
