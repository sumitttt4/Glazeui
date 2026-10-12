import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"
import hljs from "highlight.js/lib/core"
import bash from "highlight.js/lib/languages/bash"
import css from "highlight.js/lib/languages/css"
import json from "highlight.js/lib/languages/json"
import typescript from "highlight.js/lib/languages/typescript"
import xml from "highlight.js/lib/languages/xml"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

hljs.registerLanguage("bash", bash)
hljs.registerLanguage("css", css)
hljs.registerLanguage("json", json)
hljs.registerLanguage("tsx", typescript)
hljs.registerLanguage("xml", xml)

const LANGS: Record<string, string> = { ts: "tsx", typescript: "tsx", jsx: "tsx", js: "tsx", sh: "bash", shell: "bash", html: "xml" }

export function highlight(code: string, lang = "tsx") {
  const language = LANGS[lang] ?? lang
  return hljs.getLanguage(language) ? hljs.highlight(code, { language }).value : hljs.highlight(code, { language: "xml" }).value.replace(/<[^>]+>/g, "")
}

export function CopyButton({ value, className }: { value: string; className?: string }) {
  const [copied, setCopied] = React.useState(false)
  return (
    <Button
      data-slot="copy-button"
      size="icon"
      variant="ghost"
      aria-label={copied ? "Copied" : "Copy"}
      className={cn("absolute top-3 right-2 z-10 size-7 opacity-70 hover:opacity-100 focus-visible:opacity-100", className)}
      onClick={() => {
        void navigator.clipboard?.writeText(value).then(() => {
          setCopied(true)
          window.setTimeout(() => setCopied(false), 1500)
        })
      }}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
    </Button>
  )
}

/** A block of code, as on the documentation site: a quiet ground, an optional file name, a copy button. */
export function CodeBlock({
  code,
  lang = "tsx",
  title,
  className,
  maxHeight = true,
}: {
  code: string
  lang?: string
  title?: string
  className?: string
  maxHeight?: boolean
}) {
  const text = code.replace(/\n$/, "")
  const html = React.useMemo(() => highlight(text, lang), [text, lang])
  return (
    <figure data-slot="code-block" className={cn("relative my-6 overflow-hidden rounded-xl bg-code text-sm", className)}>
      {title && (
        <figcaption className="flex h-11 items-center gap-2 border-b border-border/50 px-4 font-mono text-[13px] text-muted-foreground">
          {title}
        </figcaption>
      )}
      <CopyButton value={text} className={title ? "top-2" : undefined} />
      <pre className={cn("md-code no-scrollbar overflow-auto px-4 py-3.5 font-mono text-[13px] leading-relaxed", maxHeight && "max-h-96")}>
        <code dangerouslySetInnerHTML={{ __html: html }} />
      </pre>
    </figure>
  )
}
