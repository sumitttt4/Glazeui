import * as React from "react"
import { Link as RouterLink } from "react-router-dom"

/** next/link, for the examples taken from shadcn/ui that use it: a router link, or a plain one for anywhere else. */
export default function Link({ href, ...props }: Omit<React.ComponentProps<"a">, "href"> & { href: string }) {
  if (/^([a-z]+:|#)/i.test(href)) return <a href={href} {...props} />
  return <RouterLink to={href} {...props} />
}
