"use client"

import { ActivateAgentDialog } from "@/create/cards/activate-agent-dialog"
import { AnalyticsCard } from "@/create/cards/analytics-card"
import { AnomalyAlert } from "@/create/cards/anomaly-alert"
import { BarChartCard } from "@/create/cards/bar-chart-card"
import { BookAppointment } from "@/create/cards/book-appointment"
import { CodespacesCard } from "@/create/cards/codespaces-card"
import { ContributionsActivity } from "@/create/cards/contributions-activity"
import { Contributors } from "@/create/cards/contributors"
import { EnvironmentVariables } from "@/create/cards/environment-variables"
import { FeedbackForm } from "@/create/cards/feedback-form"
import { FileUpload } from "@/create/cards/file-upload"
import { GithubProfile } from "@/create/cards/github-profile"
import { IconPreviewGrid } from "@/create/cards/icon-preview-grid"
import { InviteTeam } from "@/create/cards/invite-team"
import { Invoice } from "@/create/cards/invoice"
import { LiveWaveformCard } from "@/create/cards/live-waveform"
import { NoTeamMembers } from "@/create/cards/no-team-members"
import { NotFound } from "@/create/cards/not-found"
import { ObservabilityCard } from "@/create/cards/observability-card"
import { PieChartCard } from "@/create/cards/pie-chart-card"
import { ReportBug } from "@/create/cards/report-bug"
import { ShippingAddress } from "@/create/cards/shipping-address"
import { Shortcuts } from "@/create/cards/shortcuts"
import { SkeletonLoading } from "@/create/cards/skeleton-loading"
import { SleepReport } from "@/create/cards/sleep-report"
import { StyleOverview } from "@/create/cards/style-overview"
import { TypographySpecimen } from "@/create/cards/typography-specimen"
import { UIElements } from "@/create/cards/ui-elements"
import { UsageCard } from "@/create/cards/usage-card"
import { Visitors } from "@/create/cards/visitors"
import { WeeklyFitnessSummary } from "@/create/cards/weekly-fitness-summary"

export default function PreviewExample() {
  return (
    <div className="overflow-x-auto overflow-y-hidden bg-muted contain-[paint] [--gap:--spacing(4)] 3xl:[--gap:--spacing(12)] md:[--gap:--spacing(10)] dark:bg-background style-lyra:md:[--gap:--spacing(6)] style-mira:md:[--gap:--spacing(6)]">
      <div className="flex w-full min-w-max justify-center">
        <div
          className="grid w-[2400px] grid-cols-7 items-start gap-(--gap) bg-muted p-(--gap) md:w-[3000px] dark:bg-background style-lyra:md:w-[2600px] style-mira:md:w-[2600px] *:[div]:gap-(--gap)"
          data-slot="capture-target"
        >
          <div className="flex flex-col p-px [contain-intrinsic-size:380px_1200px] [content-visibility:auto]">
            <StyleOverview />
            <TypographySpecimen />
            <div className="md:hidden">
              <UIElements />
            </div>
            <CodespacesCard />
            <Invoice />
          </div>
          <div className="flex flex-col p-px [contain-intrinsic-size:380px_1200px] [content-visibility:auto]">
            <IconPreviewGrid />
            <div className="hidden w-full md:flex">
              <UIElements />
            </div>
            <ObservabilityCard />
            <ShippingAddress />
          </div>
          <div className="flex flex-col p-px [contain-intrinsic-size:380px_1200px] [content-visibility:auto]">
            <EnvironmentVariables />
            <BarChartCard />
            <InviteTeam />
            <ActivateAgentDialog />
          </div>
          <div className="flex flex-col p-px [contain-intrinsic-size:380px_1200px] [content-visibility:auto]">
            <SkeletonLoading />
            <PieChartCard />
            <NoTeamMembers />
            <ReportBug />
            <Contributors />
          </div>
          <div className="flex flex-col p-px [contain-intrinsic-size:380px_1200px] [content-visibility:auto]">
            <FeedbackForm />
            <BookAppointment />
            <SleepReport />
            <GithubProfile />
          </div>
          <div className="flex flex-col p-px [contain-intrinsic-size:380px_1200px] [content-visibility:auto]">
            <WeeklyFitnessSummary />
            <FileUpload />
            <AnalyticsCard />
            <UsageCard />
            <Shortcuts />
          </div>
          <div className="flex flex-col p-px [contain-intrinsic-size:380px_1200px] [content-visibility:auto]">
            <AnomalyAlert />
            <LiveWaveformCard />
            <Visitors />
            <ContributionsActivity />
            <NotFound />
          </div>
        </div>
      </div>
    </div>
  )
}
