import * as React from "react"
import { Link } from "react-router-dom"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Bawdi } from "./bawdi"
import { Diya } from "./diya"
import { Genda } from "./genda"
import { Kolam } from "./kolam"
import { Mor } from "./mor"
import { LightScene } from "./scene"
import "./light-studies.css"

/*
 * /studies/light: the five light studies side by side, to judge before one becomes a finish.
 * Each has a large master and a small card showing how the motif might touch a component.
 * Isolated: its own ground and scoped tokens, no site header or footer, no existing styles changed.
 */

type Study = {
  slug: string
  name: string
  lead: string
  body: string
  label: string
  caption: string
  Art: React.ComponentType<{ className?: string; label?: string; still?: boolean }>
  Card: React.ComponentType
}

/* Abstract stand-ins for text and a button: the cards show the motif, not a product. */
function Bar({ className }: { className?: string }) {
  return <span aria-hidden className={cn("block h-2.5 rounded-full", className)} />
}

function GendaCard() {
  return (
    <div className="relative size-full bg-(--ls-maroon) p-[8%]">
      <div className="relative size-full overflow-hidden rounded-[14px] border border-(color:--ls-sona)/40 bg-(--ls-ivory-card) shadow-[0_18px_40px_-18px_rgb(0_0_0/0.6)]">
        <div className="absolute -top-[28%] -right-[34%] aspect-[4/3] w-[92%]">
          <Genda still bare />
        </div>
        <div className="absolute inset-x-[9%] top-[17%] flex flex-col gap-2.5">
          <Bar className="h-3 w-[46%] bg-(--ls-sindoor)" />
          <Bar className="mt-1 w-[62%] bg-(--ls-skeleton-warm)" />
          <Bar className="w-[52%] bg-(--ls-skeleton-warm)/70" />
        </div>
        <Bar className="absolute bottom-[12%] left-[9%] h-5 w-[30%] bg-(--ls-mor)" />
      </div>
    </div>
  )
}

function MorCard() {
  return (
    <div className="relative size-full bg-[#090d26] p-[8%]">
      <div className="relative size-full overflow-hidden rounded-[14px] bg-(--ls-neel-raised) shadow-[0_18px_40px_-18px_rgb(0_0_0/0.8)]">
        <div className="absolute inset-0 translate-y-[26%] scale-[1.15]">
          <Mor still />
        </div>
        <div aria-hidden className="absolute inset-0 bg-linear-to-b from-(--ls-neel-raised) via-(--ls-neel-raised)/70 via-35% to-transparent to-60%" />
        <div className="absolute inset-x-[9%] top-[13%] flex flex-col gap-2.5">
          <Bar className="h-3 w-[40%] bg-(--ls-sona)" />
          <Bar className="mt-1 w-[62%] bg-white/30" />
          <Bar className="w-[50%] bg-white/20" />
        </div>
      </div>
    </div>
  )
}

function DiyaCard() {
  return (
    <div className="relative size-full bg-[#090d26] p-[8%]">
      <div className="relative flex size-full flex-col overflow-hidden rounded-[14px] border border-(color:--ls-sona)/40 bg-(--ls-ivory-card) shadow-[0_18px_40px_-18px_rgb(0_0_0/0.8)]">
        <div className="flex h-[30%] items-center gap-[6%] bg-(--ls-neel) px-[5%]">
          <div className="aspect-square h-[78%] overflow-hidden rounded-full ring-1 ring-(color:--ls-sona)/30">
            <div className="ls-art size-full origin-[50%_50%] scale-[2.2]">
              <Diya still />
            </div>
          </div>
          <Bar className="h-3 w-[44%] bg-(--ls-sona)" />
        </div>
        <div className="flex flex-1 flex-col gap-2.5 px-[9%] pt-[11%]">
          <Bar className="w-[74%] bg-(--ls-skeleton-warm)" />
          <Bar className="w-[60%] bg-(--ls-skeleton-warm)/70" />
          <Bar className="mt-auto mb-[13%] h-5 w-[30%] bg-(--ls-kesar)" />
        </div>
      </div>
    </div>
  )
}

function KolamCard() {
  return (
    <div className="relative size-full bg-[#090d26] p-[8%]">
      <div className="relative size-full overflow-hidden rounded-[14px] bg-(--ls-neel-raised) p-[6%] shadow-[0_18px_40px_-18px_rgb(0_0_0/0.8)]">
        <div className="relative flex size-full flex-col items-center overflow-hidden rounded-[10px] border border-(color:--ls-sona)/30">
          <div className="w-full flex-1">
            <Kolam still />
          </div>
          <Bar className="absolute bottom-[10%] w-[44%] bg-white/30" />
        </div>
      </div>
    </div>
  )
}

function BawdiCard() {
  return (
    <div className="relative size-full bg-(--ls-chandan) p-[8%]">
      <div className="relative flex size-full flex-col overflow-hidden rounded-[14px] border border-(color:--ls-sona)/40 bg-(--ls-ivory-card) shadow-[0_18px_40px_-20px_rgb(80_50_20/0.45)]">
        <div className="flex flex-col gap-2.5 px-[9%] pt-[13%]">
          <Bar className="h-3 w-[48%] bg-(--ls-neel-raised)" />
          <Bar className="mt-1 w-[66%] bg-(--ls-skeleton-warm)" />
          <Bar className="w-[54%] bg-(--ls-skeleton-warm)/70" />
        </div>
        <div className="mt-auto h-[56%] w-full [mask-image:linear-gradient(to_bottom,transparent,black_30%)]">
          <Bawdi still />
        </div>
      </div>
    </div>
  )
}

/**
 * Real Glaze components in the Glass finish, laid over a study as their backdrop: how the motif
 * would read behind an actual interface. Dark studies use the dark theme; Bawdi, the light one.
 */
function OnGlaze({ Art, name, dark }: { Art: Study["Art"]; name: string; dark: boolean }) {
  const field = React.useId()
  return (
    <div className={cn("relative overflow-hidden rounded-2xl", dark && "dark")}>
      <div aria-hidden className="ls-art absolute inset-0">
        <Art still />
      </div>
      <div data-material="glass" className="relative flex min-h-[440px] items-center justify-center p-5 text-foreground sm:p-8">
        <Card className="w-full max-w-[340px]">
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <CardTitle>Workspace</CardTitle>
              <Badge variant="secondary">{name}</Badge>
            </div>
            <CardDescription>Invite your team and choose how they are notified.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor={field}>Email</Label>
              <Input id={field} placeholder="maya@studio.com" />
            </div>
            <div className="flex items-center justify-between gap-3">
              <Label htmlFor={`${field}-s`}>Weekly summary</Label>
              <Switch id={`${field}-s`} defaultChecked />
            </div>
          </CardContent>
          <CardFooter className="gap-2">
            <Button variant="outline" className="flex-1">Cancel</Button>
            <Button className="flex-1">Send invite</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

const STUDIES: Study[] = [
  {
    slug: "genda",
    name: "Genda",
    lead: "Marigold lit from inside.",
    body: "Six rings of translucent petals under one light that runs from a white-hot core to nothing at the tips, so the bloom reads as a source of light. The outer rings fall out of focus; a few sparks drift.",
    label: "Genda study: a marigold of translucent saffron petals glowing from a white-hot centre on deep maroon.",
    caption: "In use. An original light study after marigold garlands, not a botanical drawing.",
    Art: Genda,
    Card: GendaCard,
  },
  {
    slug: "mor",
    name: "Mor",
    lead: "Iridescence in the dark.",
    body: "A peacock eye at the tip of a feather: gold and teal sheens around a kesar heart with one true glint. Soft barbs and out-of-focus light carry the depth; there are no hard outlines.",
    label: "Mor study: a soft gold and teal peacock eye at the tip of a feather, its barbs fanning into a deep blue dark.",
    caption: "In use. An original study after the feather, not a naturalist illustration.",
    Art: Mor,
    Card: MorCard,
  },
  {
    slug: "diya",
    name: "Diya",
    lead: "The lamp as weather.",
    body: "Flame within flame, from a blurred kesar aura to a white core, with embers, a gold-rimmed bowl and a faint reflection on the floor. Near-black neel, lit by one lamp.",
    label: "Diya study: a layered flame over a shallow gold-rimmed bowl, lighting a near-black blue room.",
    caption: "In use. Kept abstract: the flame, not iconography.",
    Art: Diya,
    Card: DiyaCard,
  },
  {
    slug: "kolam",
    name: "Kolam",
    lead: "A filament of light.",
    body: "Three continuous looping lines over a dim dot grid: a wide eight-loop curve, a seven-petal rose and a small five-petal turn in gulabi. Each is drawn as a wide glow, a mid glow and a hot core.",
    label: "Kolam study: glowing gold looping lines forming nested rose shapes over a faint grid of dots on deep blue.",
    caption: "In use. An original looping curve in the spirit of threshold drawing, not a traditional kolam construction.",
    Art: Kolam,
    Card: KolamCard,
  },
  {
    slug: "bawdi",
    name: "Bawdi",
    lead: "The stepwell, lit from above.",
    body: "Eleven levels step down from chandan daylight to water in shadow. Shaded walls, lit risers and one soft shaft of light give the depth, and the shaft lands as a single bright patch on the water.",
    label: "Bawdi study: a square stepwell seen from above, sandstone levels darkening toward shadowed teal water with one patch of light.",
    caption: "In use. An original study after stepwell geometry, seen from above; not a specific monument.",
    Art: Bawdi,
    Card: BawdiCard,
  },
]

export default function LightStudies() {
  React.useEffect(() => {
    const before = document.title
    document.title = "Light studies · Glaze"
    return () => {
      document.title = before
    }
  }, [])

  return (
    <div data-light-studies className="min-h-svh">
      <div className="mx-auto max-w-[1200px] px-4 pt-8 pb-20 sm:px-6 sm:pt-12 lg:px-8">
        <Link to="/" className="text-sm font-medium text-(--ls-ink-muted) transition-colors hover:text-(--ls-ink)">
          Glaze
        </Link>
        <header className="mt-8 max-w-[68ch]">
          <h1 className="font-display text-[2rem] leading-[1.1] sm:text-[2.75rem]">Five studies of light</h1>
          <p className="mt-4 text-[15px] leading-relaxed text-(--ls-ink-muted) sm:text-base">
            Concept studies for a possible Glaze finish. Each is one structural form holding real depth, drawn in code in a warm palette of ivory,
            saffron, gold, deep blue and teal. None of them is a finish yet.
          </p>
        </header>

        {/* the five side by side, for a first comparison */}
        <nav aria-label="Studies" className="mt-10 grid grid-cols-5 gap-2 sm:gap-3">
          {STUDIES.map(({ slug, name, Art }, i) => (
            <a
              key={slug}
              href={`#${slug}`}
              className="group relative aspect-[4/3] overflow-hidden rounded-lg outline-offset-2 sm:rounded-xl"
              aria-label={`${i + 1}. ${name}`}
            >
              <span className="ls-art block size-full transition-transform duration-300 ease-(--ls-ease-out) group-hover:scale-[1.03]">
                <Art still />
              </span>
              <span aria-hidden className="absolute top-1.5 left-2 text-[11px] font-medium text-white/80 tabular-nums">
                {i + 1}
              </span>
            </a>
          ))}
        </nav>

        <section aria-labelledby="scene-title" className="mt-16 sm:mt-24">
          <h2 id="scene-title" className="font-display text-[1.5rem] leading-tight sm:text-[1.75rem]">
            A live scene
          </h2>
          <p className="mt-3 max-w-[72ch] text-[15px] leading-relaxed text-(--ls-ink-muted)">
            Assistant, voice, context and settings from the library, working, in the Glass finish. Switch the study behind them, and let the
            accent follow it or stay cobalt.
          </p>
          <div className="mt-6">
            <LightScene studies={STUDIES} />
          </div>
        </section>

        <section aria-labelledby="on-glaze-title" className="mt-16 sm:mt-24">
          <h2 id="on-glaze-title" className="font-display text-[1.5rem] leading-tight sm:text-[1.75rem]">
            On Glaze components
          </h2>
          <p className="mt-3 max-w-[72ch] text-[15px] leading-relaxed text-(--ls-ink-muted)">
            The same card, input, switch and buttons from the library, in the Glass finish, over each study. This is how the light would sit behind
            a real interface.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {STUDIES.map(({ slug, name, Art }) => (
              <OnGlaze key={slug} Art={Art} name={name} dark={slug !== "bawdi"} />
            ))}
          </div>
        </section>

        {STUDIES.map(({ slug, name, lead, body, label, caption, Art, Card }, i) => (
          <section key={slug} id={slug} aria-labelledby={`${slug}-title`} className="mt-16 scroll-mt-8 sm:mt-24">
            <h2 id={`${slug}-title`} className="font-display text-[1.5rem] leading-tight sm:text-[1.75rem]">
              <span className="text-(--ls-ink-muted) tabular-nums">{i + 1}</span> {name}
            </h2>
            <p className="mt-3 max-w-[72ch] text-[15px] leading-relaxed text-(--ls-ink-muted)">
              <strong className="font-semibold text-(--ls-ink)">{lead}</strong> {body}
            </p>
            <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] lg:items-start">
              <figure className="ls-art aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_1px_2px_rgb(40_20_10/0.08),0_24px_48px_-28px_rgb(40_20_10/0.45)]">
                <Art label={label} />
              </figure>
              <figure className="mx-auto w-full max-w-[420px] lg:max-w-none">
                <div
                  role="img"
                  aria-label={`${name} in use: a card with the motif`}
                  className="ls-card aspect-square overflow-hidden rounded-2xl shadow-[0_1px_2px_rgb(40_20_10/0.08),0_18px_40px_-26px_rgb(40_20_10/0.4)]"
                >
                  <Card />
                </div>
                <figcaption className="mt-3 text-[13px] leading-relaxed text-(--ls-ink-muted)">{caption}</figcaption>
              </figure>
            </div>
          </section>
        ))}

        <section aria-labelledby="reading-title" className="mt-24 max-w-[72ch] border-t border-(color:--ls-hairline) pt-10">
          <h2 id="reading-title" className="font-display text-[1.25rem]">
            How to read these
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-(--ls-ink-muted)">
            Each study is a stylised original inspired by a craft tradition and drawn in code, not an authentic construction of that craft. The
            palette names are interpretation. A finish would take one of these forms and build a full component treatment from it: the large studies
            set the mood, and the cards only show how a form might touch a component.
          </p>
        </section>
      </div>
    </div>
  )
}
