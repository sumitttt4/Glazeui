"use client"

import * as React from "react"
import {
  ArrowUpIcon,
  BellIcon,
  CalculatorIcon,
  CalendarIcon,
  ChevronRightIcon,
  CreditCardIcon,
  FileTextIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  LinkIcon,
  MoreHorizontalIcon,
  PaperclipIcon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
  SmileIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react"
import { Bar, BarChart, XAxis } from "recharts"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Kbd } from "@/components/ui/kbd"
import { Label } from "@/components/ui/label"
import { Panel, PanelRow } from "@/components/ui/panel"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { STATUS_FIGURES, StatusGlyph, type Activity } from "@/components/ui/status-glyph"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tag } from "@/components/ui/tag"
import { Textarea } from "@/components/ui/textarea"
import { TurnStatus } from "@/components/ui/turn-status"

/*
 * The wall under the heading, laid out as on ui.shadcn.com: columns of cards that come in as the
 * window widens, fading out at the bottom. Every card is general-purpose — the things any product
 * is made of — and each is built from the components as they are installed, nothing drawn for the
 * page. What makes them Solid Glass is the material and its habits: glass buttons beside the one
 * that asks to be pressed, a pane of clear glass for whatever is chosen, small type, no colour
 * that does not mean something.
 */

/** The small things: buttons, fields, the controls that are on or off. */
function Elements() {
  return (
    <Card>
      <CardContent className="flex flex-col gap-5">
        <div className="flex flex-wrap gap-2">
          <Button>Button</Button>
          <Button variant="glass">Glass</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute top-2 left-2.5 size-4 text-muted-foreground" />
          <Input placeholder="Search" aria-label="Search" className="pl-8" />
        </div>
        <Textarea placeholder="Message" aria-label="Message" />
        <div className="flex flex-wrap items-center gap-2">
          <Badge>Badge</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <span className="ml-auto flex items-center gap-3">
            <Checkbox defaultChecked aria-label="Checked" />
            <Switch defaultChecked aria-label="On" />
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Tag icon={<LinkIcon />} onRemove={() => {}}>
            notes.md
          </Tag>
          <Tag icon={<PaperclipIcon />} progress={0.6} onRemove={() => {}}>
            report.pdf
          </Tag>
          <span className="ml-auto flex items-center gap-1">
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

const NAV = [
  { label: "Home", icon: HomeIcon },
  { label: "Inbox", icon: InboxIcon, count: 12 },
  { label: "Calendar", icon: CalendarIcon },
  { label: "Team", icon: UsersIcon },
  { label: "Settings", icon: SettingsIcon },
]

/** A list to move about in. The chosen row is a pane of clear glass, not a grey fill. */
function Navigation() {
  const [at, setAt] = React.useState("Inbox")
  return (
    <Panel title="Workspace">
      <div className="flex flex-col gap-px p-1.5 pt-0.5">
        {NAV.map((item) => (
          <PanelRow key={item.label} chosen={item.label === at} onClick={() => setAt(item.label)}>
            <item.icon />
            <span className="truncate">{item.label}</span>
            {item.count && <span className="ml-auto text-[11.5px] text-muted-foreground tabular-nums">{item.count}</span>}
          </PanelRow>
        ))}
      </div>
    </Panel>
  )
}

const PHASES: { activity: Activity; label: string; tokens: number }[] = [
  { activity: "thinking", label: "Thinking", tokens: 320 },
  { activity: "searching", label: "Searching the docs", tokens: 1284 },
  { activity: "running", label: "Running the tests", tokens: 2610 },
  { activity: "writing", label: "Writing the summary", tokens: 4096 },
]

/** Something is still going: three points of light, and a line that says what it is doing. */
function Status() {
  const [at, setAt] = React.useState(0)
  const [since] = React.useState(() => Date.now() - 12_000)
  React.useEffect(() => {
    const turn = window.setInterval(() => setAt((value) => (value + 1) % PHASES.length), 4600)
    return () => window.clearInterval(turn)
  }, [])
  return (
    <Card>
      <CardHeader>
        <CardTitle>Status</CardTitle>
        <CardDescription>Motion means running. A way of moving for each kind of work.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <TurnStatus {...PHASES[at]} since={since} />
        <div className="grid grid-cols-5 gap-y-4">
          {STATUS_FIGURES.map(({ name, figure }) => (
            <div key={name} className="flex flex-col items-center gap-2">
              <StatusGlyph figure={figure} className="size-6 text-foreground/85" />
              <span className="font-mono text-[10px] text-muted-foreground">{name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

const chartData = [
  { day: "Mon", requests: 186 },
  { day: "Tue", requests: 305 },
  { day: "Wed", requests: 237 },
  { day: "Thu", requests: 273 },
  { day: "Fri", requests: 209 },
  { day: "Sat", requests: 114 },
  { day: "Sun", requests: 148 },
]
const chartConfig = { requests: { label: "Requests", color: "var(--chart-2)" } } satisfies ChartConfig

/** A chart, drawn in greys like the rest. */
function Activity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity</CardTitle>
        <CardDescription>Requests over the last 7 days</CardDescription>
        <CardAction>
          <Badge variant="secondary">+12.4%</Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-semibold tracking-tight tabular-nums">1,472</p>
        <ChartContainer config={chartConfig} className="mt-3 h-36 w-full">
          <BarChart accessibilityLayer data={chartData} margin={{ left: 0, right: 0, top: 4, bottom: 0 }}>
            <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="requests" fill="var(--color-requests)" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

const REGIONS = [
  { label: "Select a region", value: null },
  { label: "US East", value: "us-east" },
  { label: "EU West", value: "eu-west" },
  { label: "Asia Pacific", value: "ap" },
]

/** A form: a few fields, one switch, and the two buttons it ends on. */
function CreateProject() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one click.</CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="wall-name">Name</FieldLabel>
            <Input id="wall-name" placeholder="Name of your project" />
          </Field>
          <Field>
            <FieldLabel htmlFor="wall-region">Region</FieldLabel>
            <Select items={REGIONS}>
              <SelectTrigger id="wall-region" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {REGIONS.map((item) => (
                    <SelectItem key={item.label} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
          <Field orientation="horizontal">
            <div className="flex flex-1 flex-col gap-0.5">
              <FieldLabel htmlFor="wall-private">Private</FieldLabel>
              <FieldDescription>Only members can see it.</FieldDescription>
            </div>
            <Switch id="wall-private" defaultChecked />
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="glass">Cancel</Button>
        <Button>Create</Button>
      </CardFooter>
    </Card>
  )
}

/** How much is used, and how much to allow. */
function Storage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Storage</CardTitle>
        <CardDescription>6.2 GB of 10 GB used</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <Progress value={62} />
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between text-sm">
            <Label htmlFor="wall-limit">Upload limit</Label>
            <span className="text-muted-foreground tabular-nums">64 MB</span>
          </div>
          <Slider id="wall-limit" defaultValue={[64]} max={100} step={1} />
        </div>
        <RadioGroup defaultValue="comfortable" className="w-fit">
          {["Default", "Comfortable", "Compact"].map((label) => (
            <div key={label} className="flex items-center gap-3">
              <RadioGroupItem value={label.toLowerCase()} id={`wall-density-${label}`} />
              <Label htmlFor={`wall-density-${label}`}>{label}</Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  )
}

/** A palette of things to go to and do: the thickest glass, with the lit row under the pointer. */
function Palette() {
  return (
    <Command className="rounded-lg bg-popover">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <CalendarIcon />
            Calendar
          </CommandItem>
          <CommandItem>
            <SmileIcon />
            Search emoji
          </CommandItem>
          <CommandItem>
            <CalculatorIcon />
            Calculator
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <UserIcon />
            Profile
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CreditCardIcon />
            Billing
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <SettingsIcon />
            Settings
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

const MEMBERS = [
  { name: "Sofia Davis", email: "sofia@example.com", initials: "SD", role: "Owner" },
  { name: "Jackson Lee", email: "jackson@example.com", initials: "JL", role: "Member" },
  { name: "Isabella Nguyen", email: "isabella@example.com", initials: "IN", role: "Member" },
]

/** People, and a menu on each. */
function Members() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Team members</CardTitle>
        <CardDescription>Invite your team to collaborate.</CardDescription>
        <CardAction>
          <Button variant="glass" size="sm">
            <PlusIcon /> Invite
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {MEMBERS.map((member) => (
          <div key={member.email} className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>{member.initials}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm leading-none font-medium">{member.name}</p>
              <p className="mt-1 truncate text-[12.5px] text-muted-foreground">{member.email}</p>
            </div>
            <Badge variant={member.role === "Owner" ? "secondary" : "outline"}>{member.role}</Badge>
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label={`More for ${member.name}`} className="glass-held" />}>
                <MoreHorizontalIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>{member.name}</DropdownMenuLabel>
                  <DropdownMenuItem>
                    View profile <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Change role</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">Remove</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

/** Two views of one thing. */
function Account() {
  return (
    <Card>
      <CardContent>
        <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="flex flex-col gap-4 pt-3">
            <Field>
              <FieldLabel htmlFor="wall-display">Display name</FieldLabel>
              <Input id="wall-display" defaultValue="Sofia Davis" />
            </Field>
            <Button variant="glass" data-strong className="self-end">
              Save changes
            </Button>
          </TabsContent>
          <TabsContent value="password" className="flex flex-col gap-4 pt-3">
            <Field>
              <FieldLabel htmlFor="wall-password">New password</FieldLabel>
              <Input id="wall-password" type="password" />
            </Field>
            <Button variant="glass" data-strong className="self-end">
              Update password
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

const INVOICES = [
  { id: "INV-001", status: "Paid", amount: "$250.00" },
  { id: "INV-002", status: "Pending", amount: "$150.00" },
  { id: "INV-003", status: "Failed", amount: "$350.00" },
  { id: "INV-004", status: "Paid", amount: "$450.00" },
]
const DOT: Record<string, string> = { Paid: "bg-emerald-500/80", Pending: "bg-muted-foreground/60", Failed: "bg-destructive" }

/** Rows of figures. Hue only for how each one went: a dot, never a coloured row. */
function Invoices() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Invoices</CardTitle>
        <CardDescription>Your last four.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {INVOICES.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.id}</TableCell>
                <TableCell>
                  <span className="flex items-center gap-2">
                    <span aria-hidden className={cn("size-1.5 rounded-full", DOT[invoice.status])} />
                    {invoice.status}
                  </span>
                </TableCell>
                <TableCell className="text-right tabular-nums">{invoice.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

/** A question before something that cannot be undone. */
function Confirm() {
  return (
    <div className="flex flex-col gap-4 rounded-lg bg-popover p-4 text-sm text-popover-foreground">
      <div className="flex flex-col gap-1.5">
        <p className="text-base leading-none font-medium">Delete this project?</p>
        <p className="text-muted-foreground">Its files and history go with it. This cannot be undone.</p>
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="glass">Cancel</Button>
        <Button variant="destructive">Delete</Button>
      </div>
    </div>
  )
}

const NOTIFY = [
  { id: "email", label: "Email", note: "A summary every morning.", on: true },
  { id: "push", label: "Push", note: "When someone mentions you.", on: true },
  { id: "product", label: "Product news", note: "New features, now and then.", on: false },
]

/** A few things that are on or off. */
function Notifications() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Choose what you hear about.</CardDescription>
        <CardAction>
          <BellIcon className="size-4 text-muted-foreground" />
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col">
        {NOTIFY.map((item, index) => (
          <React.Fragment key={item.id}>
            {index > 0 && <Separator className="my-3" />}
            <div className="flex items-center gap-3">
              <div className="min-w-0 flex-1">
                <Label htmlFor={`wall-notify-${item.id}`}>{item.label}</Label>
                <p className="mt-1 text-[12.5px] text-muted-foreground">{item.note}</p>
              </div>
              <Switch id={`wall-notify-${item.id}`} defaultChecked={item.on} />
            </div>
          </React.Fragment>
        ))}
      </CardContent>
    </Card>
  )
}

const FILES = [
  { name: "Documents", folder: true },
  { name: "proposal.md", size: "12 KB", depth: 1 },
  { name: "budget.xlsx", size: "48 KB", depth: 1 },
  { name: "notes.txt", size: "2 KB", depth: 1 },
  { name: "Archive", folder: true, closed: true },
  { name: "readme.md", size: "4 KB" },
]

/** A tree of files in the thinnest pane. */
function Files() {
  const [chosen, setChosen] = React.useState("proposal.md")
  return (
    <Panel title="Files" onClose={() => {}}>
      <div className="flex flex-col gap-px p-1.5 pt-0.5">
        {FILES.map((file) => (
          <PanelRow
            key={file.name}
            chosen={file.name === chosen}
            onClick={() => !file.folder && setChosen(file.name)}
            style={{ paddingLeft: 8 + (file.depth ?? 0) * 16 }}
          >
            {file.folder ? file.closed ? <ChevronRightIcon /> : <FolderIcon /> : <FileTextIcon />}
            <span className="truncate">{file.name}</span>
            {file.size && <span className="ml-auto shrink-0 text-[11px] text-muted-foreground/70 tabular-nums">{file.size}</span>}
          </PanelRow>
        ))}
      </div>
    </Panel>
  )
}

/** Somewhere to write and send. */
function Message() {
  const [text, setText] = React.useState("")
  return (
    <Card>
      <CardHeader>
        <CardTitle>Send a message</CardTitle>
        <CardDescription>Enter sends. Shift and Enter for a new line.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="glass-control ml-auto max-w-[85%] rounded-xl bg-secondary px-3.5 py-2 text-sm leading-relaxed">
          Can you send over the latest numbers?
        </div>
        <div className="flex items-end gap-2">
          <Textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Write a reply..."
            aria-label="Reply"
            className="min-h-9"
          />
          <Button size="icon" aria-label="Send" disabled={!text.trim()} onClick={() => setText("")}>
            <ArrowUpIcon />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

/** Beside the headline: a few of the cards, in two columns that do not line up, fading out below. */
export function HeroStage() {
  const column = "min-w-0 flex-col gap-6 *:shrink-0"
  return (
    <div
      data-slot="demo"
      className="-m-6 grid max-h-[620px] grid-cols-[minmax(0,1fr)] gap-6 overflow-hidden p-6 [mask-image:linear-gradient(to_bottom,black_calc(100%-7rem),transparent)] sm:grid-cols-2"
    >
      <div className={cn(column, "flex")}>
        <Elements />
        <Message />
      </div>
      <div className={cn(column, "hidden pt-12 sm:flex")}>
        <Activity />
        <Palette />
      </div>
    </div>
  )
}

/** The rest of the cards, as a wall: what an application is made of, in the material. */
export function Wall() {
  const column = "min-w-0 flex-col gap-6 *:shrink-0"
  return (
    <div
      data-slot="demo"
      className="-m-6 grid max-h-[760px] grid-cols-[minmax(0,1fr)] gap-6 overflow-hidden p-6 [mask-image:linear-gradient(to_bottom,black_calc(100%-8rem),transparent)] md:grid-cols-2 xl:grid-cols-3"
    >
      <div className={cn(column, "flex")}>
        <Navigation />
        <Status />
        <Notifications />
      </div>
      <div className={cn(column, "hidden md:flex")}>
        <CreateProject />
        <Storage />
        <Confirm />
      </div>
      <div className={cn(column, "hidden xl:flex")}>
        <Members />
        <Account />
        <Invoices />
        <Files />
      </div>
    </div>
  )
}
