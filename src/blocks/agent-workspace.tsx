import {
  ArrowLeftIcon,
  ChevronRightIcon,
  FileTextIcon,
  FolderIcon,
  FolderPlusIcon,
  ListChecksIcon,
  PanelLeftIcon,
  PlusIcon,
  RefreshCwIcon,
  SearchIcon,
  SquareIcon,
  SquareTerminalIcon,
  UploadIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { AskCard } from "@/components/ui/ask-card"
import { Button } from "@/components/ui/button"
import { Composer, ComposerFooter, ComposerFooterEnd, ComposerPick } from "@/components/ui/composer"
import { ContextRing } from "@/components/ui/context-ring"
import { Kbd } from "@/components/ui/kbd"
import { Panel, PanelRow } from "@/components/ui/panel"
import { Tag } from "@/components/ui/tag"
import { StepGroup, type Step } from "@/components/ui/tool-steps"

/**
 * Agent workspace: an application where an agent works, whole. Sessions on the left, the thread in
 * the middle (what was asked, the steps taken, the answer, and the question it has for you), and on
 * the right what it has made and what it is still running. The data is made up and lives at the top
 * of the file; replace it with your own.
 */

// What it wrote, as the patch it made: the row for it opens as a diff.
const NOTES = `@@ -0,0 +1,7 @@
+# Interface coatings for sulfide electrolytes
+
+Six papers, three ways forward:
+
+- Coat the cathode: the most data, the quickest check.
+- Change the dopant: a higher ceiling, new samples needed.
+- Benchmark only: nothing new to make, the least to learn.
`

// Each step is one line, and opens to the call itself: what was asked for, and what came back.
const STEPS: Step[] = [
  {
    id: "search",
    label: "Searched for “sulfide electrolytes, interface stability”",
    status: "done",
    detail: "sulfide electrolytes, interface stability",
    detailLabel: "Query",
    output: "14 results, 6 kept\ncoating-review.pdf\nsulfide-interfaces.pdf\ndopant-screening.pdf\ngarnet-stability.pdf\ncycle-life.csv\nbaseline.yaml",
  },
  {
    id: "read",
    label: "Read 6 papers",
    status: "done",
    output: "coating-review.pdf        42 pages\nsulfide-interfaces.pdf    18 pages\ndopant-screening.pdf      11 pages\ngarnet-stability.pdf      23 pages\n2 data files read as tables",
  },
  { id: "write", label: "Wrote survey/notes.md", status: "done", patch: NOTES },
]

const DIRECTIONS = [
  { name: "Coat the cathode.", note: "Data and code exist, and a first check fits in a week." },
  { name: "Change the dopant.", note: "A higher ceiling, but it means new samples: three weeks at least." },
  { name: "Benchmark only.", note: "The lowest risk, and the smallest result." },
]

// The project as a tree: a folder is its chevron, a file a small mark and its size.
type Node = { name: string; size?: string; open?: boolean; chosen?: boolean; children?: Node[] }

const TREE: Node[] = [
  {
    name: "survey",
    open: true,
    children: [
      { name: "sources", children: [] },
      { name: "notes.md", size: "4 KB", chosen: true },
      { name: "report.md", size: "15 KB" },
      { name: "sources.json", size: "57 KB" },
    ],
  },
  {
    name: "research",
    open: true,
    children: [
      { name: "ROADMAP.md", size: "2 KB" },
      { name: "baseline.yaml", size: "2 KB" },
    ],
  },
  { name: "paper", children: [] },
  { name: "rerun.py", size: "5 KB" },
]

// What it started and did not wait for: a board to a task, with its kind, how it stands and for how long.
type Task = { title: string; kind: string; state: string; time: string; tokens?: string; activity?: string; running?: boolean }

const TASKS: Task[] = [
  { title: "Rerun the baseline", kind: "Command", state: "Running", time: "2m 14s", activity: "python rerun.py --timeout 120", running: true },
  { title: "Collect citations", kind: "Subagent", state: "Running", time: "41s", tokens: "3,280 tok", activity: "Reading coating-review.pdf", running: true },
  { title: "Background reading", kind: "Subagent", state: "Completed", time: "18s" },
]

const MODES = [{ value: "ask", label: "Ask first" }]
const MODELS = [{ value: "large", label: "model-large" }]
const EFFORTS = [{ value: "medium", label: "Medium" }]

const INDENT = 12

function Tree({ nodes, depth = 0 }: { nodes: Node[]; depth?: number }) {
  return (
    <ul>
      {nodes.map((node) => (
        <li key={node.name}>
          <div
            style={{ paddingLeft: 6 + depth * INDENT }}
            className={cn("flex w-full items-center gap-1 rounded-sm py-[3px] pr-2", node.chosen && "glass-chosen")}
          >
            {node.children ? (
              <ChevronRightIcon strokeWidth={1.5} className={cn("size-3.5 shrink-0 text-muted-foreground", node.open && "rotate-90")} />
            ) : (
              // where a folder has its chevron, and as light: the name is what is read
              <FileTextIcon strokeWidth={1.5} className="ml-0.5 size-3 shrink-0 text-muted-foreground/70" />
            )}
            <span className="min-w-0 flex-1 truncate text-[12.5px]">{node.name}</span>
            {node.size && <span className="shrink-0 text-[11px] text-muted-foreground/80 tabular-nums">{node.size}</span>}
          </div>
          {node.children && node.open && <Tree nodes={node.children} depth={depth + 1} />}
        </li>
      ))}
    </ul>
  )
}

function TaskBoard({ task }: { task: Task }) {
  return (
    <li className="glass-control rounded-md bg-(--glass-control) px-3 py-2.5">
      <div className="flex items-start gap-2">
        <div className="min-w-0 flex-1">
          <p className="line-clamp-2 text-[13px] leading-snug text-foreground/85">{task.title}</p>
          <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[12px] text-muted-foreground tabular-nums">
            <span>{task.kind}</span>
            <span>{task.state}</span>
            <span>{task.time}</span>
            {task.tokens && <span>{task.tokens}</span>}
          </p>
          {task.activity && <p className="status-shimmer mt-1 truncate font-mono text-[11px]">{task.activity}</p>}
        </div>
        {task.running && (
          <span className="flex size-6 shrink-0 items-center justify-center rounded-sm text-muted-foreground">
            <SquareIcon className="size-3" />
          </span>
        )}
      </div>
    </li>
  )
}

export default function AgentWorkspace() {
  return (
    <div className="flex h-svh min-h-[640px] overflow-hidden bg-background text-[13px] text-foreground">
      {/* sessions */}
      <aside className="hidden w-[216px] shrink-0 flex-col border-r bg-sidebar md:flex">
        {/* The tile is wider than a row's icon, so it is centred on the icons' column and its name starts
            where the rows' words do: one line down the side for the marks, one for the words. */}
        <div className="flex h-12 items-center gap-[5px] pr-3.5 pl-[11px]">
          <span className="glass-chosen flex size-5 items-center justify-center rounded-[6px] text-[10px] font-semibold">R</span>
          <span className="text-sm font-medium">Research</span>
          <PanelLeftIcon className="ml-auto size-4 text-muted-foreground" />
        </div>
        <div className="flex flex-col gap-px px-1.5">
          <PanelRow>
            <SearchIcon /> Search
            <span className="ml-auto flex gap-1">
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </span>
          </PanelRow>
          <PanelRow>
            <PlusIcon /> New chat
          </PanelRow>
        </div>
        <p className="px-3.5 pt-5 pb-1 text-xs text-muted-foreground">Solid electrolytes</p>
        <div className="flex flex-col gap-px px-1.5">
          <PanelRow>Baseline, reproduced</PanelRow>
          <PanelRow chosen>Survey of interface coatings</PanelRow>
        </div>
        <p className="px-3.5 pt-5 pb-1 text-xs text-muted-foreground">Benchmarks</p>
        <div className="flex flex-col gap-px px-1.5">
          <PanelRow>Cycle-life run 12</PanelRow>
          <PanelRow>Notes for the review</PanelRow>
        </div>
        <div className="mt-auto flex items-center gap-[5px] border-t py-3 pr-3.5 pl-[11px]">
          <span className="flex size-5 items-center justify-center rounded-full bg-muted text-[10px] font-medium">A</span>
          <span>Alex</span>
        </div>
      </aside>

      {/* the thread */}
      <main className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-12 shrink-0 items-center gap-2.5 px-4">
          <ArrowLeftIcon className="size-4 text-muted-foreground" />
          <span className="text-sm font-medium">Survey of interface coatings</span>
          <span className="ml-auto flex items-center gap-3.5 text-muted-foreground [&_svg]:size-4">
            <ListChecksIcon />
            <FolderIcon />
            <FileTextIcon />
            <SquareTerminalIcon />
          </span>
        </div>
        <div className="flex min-h-0 flex-1 justify-center overflow-y-auto px-4 pt-5 pb-6 [scrollbar-width:thin] md:px-6">
          <div className="flex h-fit w-full max-w-[600px] flex-col gap-4">
            <div className="glass-control self-end rounded-2xl bg-secondary px-3.5 py-2 text-sm">
              Survey the related work first, then give me a few directions to choose from.
            </div>
            <StepGroup steps={STEPS} defaultOpen />
            <div className="flex flex-col gap-3 text-sm leading-relaxed">
              <p>
                The survey is done; the notes are in <code className="rounded-sm bg-muted px-1 py-0.5 font-mono text-[12.5px]">survey/notes.md</code>.
                Three directions stand out:
              </p>
              <ol className="flex list-decimal flex-col gap-1 pl-5 marker:text-muted-foreground">
                {DIRECTIONS.map((direction) => (
                  <li key={direction.name}>
                    <span className="font-semibold">{direction.name}</span> {direction.note}
                  </li>
                ))}
              </ol>
              <p>I would take the first.</p>
            </div>
            <AskCard
              question="Which direction should I write the proposal for? It goes in research/ROADMAP.md, and the baseline rerun carries on either way."
              options={["Coat the cathode", "Change the dopant", "Benchmark only"]}
              onAnswer={() => {}}
            />
          </div>
        </div>

        <div className="flex shrink-0 justify-center px-4 pb-4 md:px-6">
          <div className="w-full max-w-[600px]">
            <Composer
              value=""
              onValueChange={() => {}}
              placeholder="Keep going, or change direction…"
              leading={
                <Button variant="ghost" size="icon" aria-label="Add" className="shrink-0 text-muted-foreground">
                  <PlusIcon className="size-4.5" />
                </Button>
              }
              tags={
                <Tag className="mb-0.5" icon={<FileTextIcon />} onRemove={() => {}}>
                  notes.md
                </Tag>
              }
            />
            <ComposerFooter>
              <ComposerPick label="Mode" align="start" value="ask" options={MODES} onValueChange={() => {}} />
              <ComposerFooterEnd>
                <ComposerPick label="Model" value="large" options={MODELS} onValueChange={() => {}} />
                <ComposerPick label="Effort" value="medium" options={EFFORTS} onValueChange={() => {}} shown="Effort · Medium" />
                <ContextRing used={86_300} window={200_000} />
              </ComposerFooterEnd>
            </ComposerFooter>
          </div>
        </div>
      </main>

      {/* what it has made, and what it is running */}
      <aside className="hidden w-[272px] shrink-0 flex-col gap-3 py-3 pr-3 lg:flex">
        <Panel
          title="Files"
          className="shrink-0"
          onClose={() => {}}
          actions={
            <span className="flex items-center gap-2.5 pr-1 text-muted-foreground [&_svg]:size-3.5">
              <FolderPlusIcon />
              <UploadIcon />
              <RefreshCwIcon />
            </span>
          }
        >
          <div className="mx-1.5 mb-1 flex h-7 items-center gap-1.5 rounded-sm px-1.5 text-[12.5px] text-muted-foreground">
            <SearchIcon className="size-3.5" /> Search files and folders
          </div>
          <div className="px-1.5 pb-2">
            <Tree nodes={TREE} />
          </div>
        </Panel>
        <Panel title="Background tasks" className="min-h-0 flex-1">
          <p className="px-3 pb-1 text-[11.5px] text-muted-foreground/80">Running</p>
          <ul className="flex flex-col gap-1.5 px-1.5">
            {TASKS.filter((task) => task.running).map((task) => (
              <TaskBoard key={task.title} task={task} />
            ))}
          </ul>
          <p className="flex items-center gap-1 px-3 pt-3 pb-1 text-[11.5px] text-muted-foreground/80">
            Ended 1 <ChevronRightIcon className="size-3 rotate-90" />
          </p>
          <ul className="flex flex-col gap-1.5 px-1.5 pb-2">
            {TASKS.filter((task) => !task.running).map((task) => (
              <TaskBoard key={task.title} task={task} />
            ))}
          </ul>
        </Panel>
      </aside>
    </div>
  )
}
