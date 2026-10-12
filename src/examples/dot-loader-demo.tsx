import { DotLoader } from "@/components/ui/dot-loader"

export default function DotLoaderDemo() {
  return (
    <div className="flex items-center gap-8">
      <DotLoader />
      <DotLoader className="gap-[3px]" dotClassName="size-1" />
      <span className="flex items-center gap-2 text-[12.5px] text-muted-foreground">
        Connecting to the sandbox <DotLoader />
      </span>
    </div>
  )
}
