import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import remarkGfm from "remark-gfm"
import remarkCjkFriendly from "remark-cjk-friendly"

import { cn } from "@/lib/utils"

/**
 * Agent answers are Markdown. Styled element by element rather than with a
 * prose plugin, so type sizes stay on the thread's own scale. Raw HTML in the
 * source is not rendered.
 */
/**
 * The project file a link points at, or undefined for a link out to the web.
 * The agent names files as it knows them: by a path in the project, with or
 * without the /project prefix. Anything with a scheme is somewhere else.
 */
function projectPath(href: string | undefined): string | undefined {
  if (!href || href.startsWith("#") || /^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith("//")) return undefined
  let path = href.split(/[?#]/)[0]
  try {
    path = decodeURIComponent(path)
  } catch {
    // Not percent-encoded after all; the text as written is the path.
  }
  path = path.replace(/^\/project\//, "").replace(/^\.?\//, "")
  return path && !path.split("/").includes("..") ? path : undefined
}

export function MarkdownText({
  children,
  className,
  onOpenFile,
}: {
  children: string
  className?: string
  /** A link to a file in the project was followed. Without this, such a link is a plain link. */
  onOpenFile?: (path: string) => void
}) {
  return (
    <div className={cn("space-y-3 text-[14px] leading-[1.7] text-foreground/90", className)}>
      <Markdown
        // CommonMark only closes ** when what follows looks like the end of
        // a word, which Chinese punctuation followed by a character does not:
        // "**有没有期限？**例如" would show its asterisks. This plugin applies
        // the rule the way CJK text needs it.
        remarkPlugins={[remarkGfm, remarkCjkFriendly]}
        // Colours a fenced block that names its language; one that does not is
        // left alone rather than guessed at.
        rehypePlugins={[rehypeHighlight]}
        components={{
          h1: (p) => <h3 className="mt-6 text-[16px] font-semibold text-foreground first:mt-0" {...p} />,
          h2: (p) => <h3 className="mt-6 text-[15px] font-semibold text-foreground first:mt-0" {...p} />,
          h3: (p) => <h4 className="mt-5 text-[14px] font-semibold text-foreground first:mt-0" {...p} />,
          h4: (p) => <h5 className="mt-4 text-[14px] font-medium text-foreground first:mt-0" {...p} />,
          p: (p) => <p className="whitespace-pre-wrap" {...p} />,
          // A hard break arrives as <br> followed by a newline. The paragraph
          // keeps newlines, so that newline already breaks the line; drawing
          // the <br> as well would leave an empty line under it.
          br: () => null,
          ul: (p) => <ul className="list-disc space-y-0.5 pl-5 marker:text-muted-foreground" {...p} />,
          ol: (p) => <ol className="list-decimal space-y-0.5 pl-5 marker:text-muted-foreground" {...p} />,
          // An item that holds more than a line — a second paragraph, a
          // nested list — gives each part a little room of its own.
          li: (p) => <li className="pl-0.5 [&>ol]:mt-0.5 [&>p+p]:mt-1.5 [&>ul]:mt-0.5" {...p} />,
          strong: (p) => <strong className="font-semibold text-foreground" {...p} />,
          a: ({ href, ...p }) => {
            // A file in the project opens here, in the files panel; only a
            // link out to the web leaves the page.
            const file = onOpenFile && projectPath(href)
            return file ? (
              <a
                className="cursor-pointer text-(--link) underline decoration-(--link)/40 underline-offset-2 hover:decoration-(--link)"
                href={href}
                onClick={(event) => {
                  event.preventDefault()
                  onOpenFile(file)
                }}
                {...p}
              />
            ) : (
              <a
                className="text-(--link) underline decoration-(--link)/40 underline-offset-2 hover:decoration-(--link)"
                href={href}
                target="_blank"
                rel="noreferrer"
                {...p}
              />
            )
          },
          blockquote: (p) => (
            <blockquote className="border-l-2 border-border pl-3 text-muted-foreground" {...p} />
          ),
          hr: () => <hr className="border-border" />,
          // A name in running text — a file, a command, a field — is set in
          // the code face in a warm colour, in a faint box with a hairline
          // round it, so it reads as a thing to type or look up and not as a
          // word. Inside a block the same element is just the block's text.
          code: ({ className: lang, children: code, ...rest }) => (
            <code
              className={cn(
                "rounded-[5px] bg-(--glass-control) px-[0.38em] py-[0.1em] font-mono text-[0.86em] text-(--code-inline) [a_&]:text-(--link)",
                "[pre_&]:border-0 [pre_&]:bg-transparent [pre_&]:p-0 [pre_&]:text-[12.5px] [pre_&]:text-foreground",
                lang
              )}
              {...rest}
            >
              {code}
            </code>
          ),
          pre: (p) => (
            <pre
              className="md-code scrollbar-thin glass-panel overflow-x-auto rounded-md px-4 py-3 leading-relaxed"
              {...p}
            />
          ),
          table: (p) => (
            <div className="scrollbar-thin overflow-x-auto">
              <table className="w-full border-collapse text-[13px]" {...p} />
            </div>
          ),
          th: (p) => <th className="border-b border-border px-2 py-1.5 text-left font-medium" {...p} />,
          td: (p) => <td className="border-b border-border/60 px-2 py-1.5 align-top" {...p} />,
        }}
      >
        {children}
      </Markdown>
    </div>
  )
}
