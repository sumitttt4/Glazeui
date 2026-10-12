import { ArrowRightIcon } from "lucide-react"
import { Link } from "react-router-dom"

import { cn } from "@/lib/utils"
import { badgeVariants } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Wall } from "@/home/wall"
import { PageActions, PageHeader, PageHeaderDescription, PageHeaderHeading } from "@/site/page-header"

export function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader>
        <Link to="/docs/components/status-glyph" className={cn(badgeVariants({ variant: "secondary" }), "bg-muted")}>
          New Status Glyph component <ArrowRightIcon />
        </Link>
        <PageHeaderHeading className="max-w-4xl">Form with substance.</PageHeaderHeading>
        <PageHeaderDescription>
          Designed for AI applications: thick, smoky panes with the weight of a solid surface and the clarity of glass.
        </PageHeaderDescription>
        <PageActions>
          <Link to="/docs/installation" className={cn(buttonVariants(), "h-[35px] px-3")}>
            Get Started
          </Link>
          <Link to="/docs/components" data-slot="button" data-variant="secondary" className={cn(buttonVariants({ variant: "secondary" }), "h-[35px] px-3")}>
            View Components
          </Link>
        </PageActions>
      </PageHeader>
      <div className="container-wrapper flex-1 p-0">
        <div className="container overflow-hidden md:px-0 lg:max-w-none">
          <section>
            <Wall />
          </section>
        </div>
      </div>
    </div>
  )
}
