import * as React from "react"
import { Navigate, Route, Routes, useLocation } from "react-router-dom"

import { Toaster } from "@/components/ui/sonner"
import { Toaster as ToastToaster } from "@/components/ui/toast"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Home } from "@/pages/home"
import { DevExamples } from "@/pages/dev-examples"
import { ComponentsIndex, DocPage, DocsLayout } from "@/site/docs"
import { SiteFooter } from "@/site/site-footer"
import { SiteHeader } from "@/site/site-header"

/** A new page starts at its top, unless the link was to a place on it. */
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  React.useEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export function App() {
  return (
    <TooltipProvider>
      <ScrollToTop />
      <div data-slot="layout" className="group/layout relative z-10 flex min-h-svh flex-col">
        <SiteHeader />
        <main className="flex min-h-0 flex-1 flex-col">
          <Routes>
            <Route index element={<Home />} />
            <Route path="docs" element={<DocsLayout />}>
              <Route index element={<DocPage section="docs" />} />
              <Route path="components" element={<ComponentsIndex />} />
              <Route path="components/:slug" element={<DocPage section="components" />} />
              <Route path=":slug" element={<DocPage section="docs" />} />
            </Route>
            {import.meta.env.DEV && <Route path="dev/examples" element={<DevExamples />} />}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <SiteFooter />
      </div>
      <Toaster />
      <ToastToaster />
    </TooltipProvider>
  )
}
