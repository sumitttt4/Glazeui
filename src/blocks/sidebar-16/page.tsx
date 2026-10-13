import { AppSidebar } from "@/blocks/sidebar-16/components/app-sidebar"
import { SiteHeader } from "@/blocks/sidebar-16/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Overview } from "@/blocks/shared/overview"

export const iframeHeight = "800px"

export const description = "A sidebar with a header and a search form."

export default function Page() {
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            <div className="flex flex-1 flex-col gap-4 p-4">
              <Overview />
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}
