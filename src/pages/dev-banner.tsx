import * as React from "react"
import { ArrowUpIcon, LinkIcon, PaperclipIcon, SearchIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Kbd } from "@/components/ui/kbd"
import { Slider } from "@/components/ui/slider"
import { StatusGlyph } from "@/components/ui/status-glyph"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tag } from "@/components/ui/tag"
import { SolidGlassMark } from "@/site/logo"

/**
 * Development only (/dev/banner): the banner at the top of the README, drawn with the theme itself so
 * it cannot drift from the material. It fills an 820 by 200 window; `docs/banner.png` is a
 * screenshot of this page at twice that, with a clear background (the corners are see-through).
 *
 * On the left, the name. On the right, a handful of small things in the material, the components as
 * installed: buttons, a field, tabs, badges, a switch, a slider.
 */
export function DevBanner() {
  // Nothing behind the banner: its corners are rounded, and what shows past them should be whatever
  // page the picture ends up on.
  React.useEffect(() => {
    const page = [document.documentElement, document.body]
    page.forEach((el) => el.style.setProperty("background", "transparent", "important"))
    return () => page.forEach((el) => el.style.removeProperty("background"))
  }, [])

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-between overflow-hidden rounded-[22px] bg-background px-11 shadow-[inset_0_0_0_1px_var(--glass-edge)]">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3.5">
          <SolidGlassMark className="size-11" />
          <span className="text-[40px] leading-none font-semibold tracking-tighter">Solid Glass</span>
        </div>
        <p className="pl-0.5 text-[17px] text-muted-foreground">Form with substance.</p>
      </div>

      <div className="flex w-[388px] shrink-0 flex-col gap-3">
        <div className="flex items-center gap-2">
          <Button>Get Started</Button>
          <Button variant="glass">Components</Button>
          <Button variant="outline" size="icon" aria-label="Send">
            <ArrowUpIcon />
          </Button>
          <Tabs defaultValue="dark" className="ml-auto">
            <TabsList>
              <TabsTrigger value="dark">Dark</TabsTrigger>
              <TabsTrigger value="light">Light</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <SearchIcon className="pointer-events-none absolute top-2 left-2.5 size-4 text-muted-foreground" />
            <Input placeholder="Search" aria-label="Search" className="pr-14 pl-8" />
            <span className="absolute top-1.5 right-1.5 flex gap-1">
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </span>
          </div>
          <Checkbox defaultChecked aria-label="Checked" />
          <Switch defaultChecked aria-label="On" />
        </div>
        <div className="flex items-center gap-2">
          <Badge>Badge</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <span className="ml-auto flex items-center gap-2 text-[12.5px] text-muted-foreground">
            <StatusGlyph activity="thinking" />
            Thinking
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Tag icon={<LinkIcon />} onRemove={() => {}}>
            notes.md
          </Tag>
          <Tag icon={<PaperclipIcon />} progress={0.6} onRemove={() => {}}>
            report.pdf
          </Tag>
          <Slider defaultValue={[62]} aria-label="Amount" className="ml-3 flex-1" />
        </div>
      </div>
    </div>
  )
}
