"use client"

import { Bar, BarChart, XAxis } from "recharts"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { StatusGlyph } from "@/components/ui/status-glyph"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

/**
 * What goes where shadcn/ui's sidebar blocks leave empty boxes: a page of an application, so the
 * sidebar is seen beside something. Figures, a chart, what is running now and what ran last, all
 * made up. It lays itself out by the room it is given, not by the window's width, so it sits as
 * well between two sidebars as beside one.
 */

const FIGURES = [
  { label: "Runs today", value: "1,284", change: "+12.4%" },
  { label: "Median response", value: "840 ms", change: "-6.1%" },
  { label: "Waiting on you", value: "7", change: "3 new" },
]

const WEEK = [
  { day: "Mon", runs: 186 },
  { day: "Tue", runs: 305 },
  { day: "Wed", runs: 237 },
  { day: "Thu", runs: 273 },
  { day: "Fri", runs: 209 },
  { day: "Sat", runs: 114 },
  { day: "Sun", runs: 148 },
]
const chartConfig = { runs: { label: "Runs", color: "var(--chart-2)" } } satisfies ChartConfig

const NOW = [
  { activity: "running" as const, label: "Reindexing the knowledge base", time: "2m 14s" },
  { activity: "searching" as const, label: "Collecting citations", time: "41s" },
  { activity: "writing" as const, label: "Drafting the weekly report", time: "18s" },
]

const RUNS = [
  { id: "run-2048", agent: "Researcher", status: "Completed", time: "1m 12s", tokens: "18,204" },
  { id: "run-2047", agent: "Reviewer", status: "Waiting", time: "4m 03s", tokens: "6,910" },
  { id: "run-2046", agent: "Researcher", status: "Failed", time: "22s", tokens: "1,377" },
  { id: "run-2045", agent: "Writer", status: "Completed", time: "3m 40s", tokens: "42,551" },
  { id: "run-2044", agent: "Writer", status: "Completed", time: "58s", tokens: "9,026" },
]
// Hue only for how each one went: a dot, never a coloured row.
const DOT: Record<string, string> = { Completed: "bg-emerald-500/80", Waiting: "bg-status-interrupted", Failed: "bg-destructive" }

export function Overview({ className }: { className?: string }) {
  return (
    <div className={cn("@container/overview flex flex-col gap-4", className)}>
      <div className="grid gap-4 @2xl/overview:grid-cols-3">
        {FIGURES.map((figure) => (
          <Card key={figure.label} size="sm">
            <CardHeader>
              <CardDescription>{figure.label}</CardDescription>
              <CardAction>
                <Badge variant="secondary">{figure.change}</Badge>
              </CardAction>
            </CardHeader>
            <CardContent className="text-2xl leading-none font-semibold tracking-tight tabular-nums">{figure.value}</CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 @3xl/overview:grid-cols-5">
        <Card className="@3xl/overview:col-span-3">
          <CardHeader>
            <CardTitle>Runs</CardTitle>
            <CardDescription>The last seven days</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-40 w-full">
              <BarChart accessibilityLayer data={WEEK} margin={{ left: 0, right: 0, top: 4, bottom: 0 }}>
                <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Bar dataKey="runs" fill="var(--color-runs)" radius={5} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="@3xl/overview:col-span-2">
          <CardHeader>
            <CardTitle>Running now</CardTitle>
            <CardDescription>Motion means running</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {NOW.map((task) => (
              <div key={task.label} className="flex items-center gap-2.5 text-sm">
                <StatusGlyph activity={task.activity} />
                <span className="min-w-0 flex-1 truncate">{task.label}</span>
                <span className="text-xs text-muted-foreground tabular-nums">{task.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent runs</CardTitle>
          <CardDescription>The last five</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Run</TableHead>
                <TableHead>Agent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Time</TableHead>
                <TableHead className="hidden text-right @xl/overview:table-cell">Tokens</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {RUNS.map((run) => (
                <TableRow key={run.id}>
                  <TableCell className="font-mono text-xs">{run.id}</TableCell>
                  <TableCell>{run.agent}</TableCell>
                  <TableCell>
                    <span className="flex items-center gap-2">
                      <span aria-hidden className={cn("size-1.5 rounded-full", DOT[run.status])} />
                      {run.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">{run.time}</TableCell>
                  <TableCell className="hidden text-right tabular-nums @xl/overview:table-cell">{run.tokens}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
