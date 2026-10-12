import * as React from "react"

/** next/image, for the examples taken from shadcn/ui that use it: a plain image. */
export default function Image({
  fill,
  priority: _priority,
  ...props
}: React.ComponentProps<"img"> & { fill?: boolean; priority?: boolean }) {
  return <img {...props} style={fill ? { position: "absolute", inset: 0, width: "100%", height: "100%", ...props.style } : props.style} />
}
