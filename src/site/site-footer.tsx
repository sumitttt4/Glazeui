export function SiteFooter() {
  return (
    <footer>
      <div className="container-wrapper px-4 xl:px-6">
        <div className="flex h-(--footer-height) items-center justify-between">
          <div className="w-full px-1 text-center text-xs leading-loose text-muted-foreground sm:text-sm">
            Solid Glass is a theme for{" "}
            <a href="https://ui.shadcn.com" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">
              shadcn/ui
            </a>
            . The components and their examples are shadcn/ui's, on{" "}
            <a href="https://base-ui.com" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">
              Base UI
            </a>
            .
          </div>
        </div>
      </div>
    </footer>
  )
}
