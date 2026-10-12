// What the examples taken from shadcn/ui use of Next.js, as the stand-ins in this folder provide it
// (see the aliases in vite.config.ts).
declare module "next/link" {
  import type * as React from "react"
  const Link: (props: Omit<React.ComponentProps<"a">, "href"> & { href: string }) => React.JSX.Element
  export default Link
}

declare module "next/image" {
  import type * as React from "react"
  const Image: (props: React.ComponentProps<"img"> & { fill?: boolean; priority?: boolean }) => React.JSX.Element
  export default Image
}
