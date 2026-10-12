import * as React from "react"

import { pages } from "@/site/pages"

const modules = import.meta.glob<Record<string, unknown>>("/src/examples/*.tsx")

class Boundary extends React.Component<{ name: string; onFail: (name: string, error: unknown) => void; children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch(error: unknown) {
    this.props.onFail(this.props.name, error)
  }
  render() {
    return this.state.failed ? <p className="text-destructive">{this.props.name} failed</p> : this.props.children
  }
}

/**
 * Development only (/dev/examples): every example the documentation shows, mounted at once, each
 * behind its own boundary. What fails to load or to render is listed at the top and left on
 * `window.__failures`, so one visit says whether a change to the theme or a component broke any.
 */
export function DevExamples() {
  const names = React.useMemo(
    () => {
      // ?q=card,tabs shows only the examples whose names start with one of those.
      const only = new URLSearchParams(window.location.search).get("q")?.split(",")
      const all = [...new Set(pages.flatMap((page) => page.blocks.flatMap((block) => (block.type === "preview" ? [block.name] : []))))].sort()
      return only ? all.filter((name) => only.some((prefix) => name.startsWith(prefix))) : all
    },
    []
  )
  const [loaded, setLoaded] = React.useState<Record<string, React.ComponentType>>({})
  const [failures, setFailures] = React.useState<Record<string, string>>({})
  const fail = React.useCallback((name: string, error: unknown) => {
    setFailures((current) => ({ ...current, [name]: String(error) }))
  }, [])

  // ?theme=light shows them in the light theme, for this visit only.
  React.useEffect(() => {
    const theme = new URLSearchParams(window.location.search).get("theme")
    if (theme) document.documentElement.classList.toggle("dark", theme !== "light")
  }, [])

  // ?hover=button,tr shows what matches as if the pointer were on it: every :hover rule is copied
  // to a class, and the class put on those elements once the examples are in.
  const done = Object.keys(loaded).length + Object.keys(failures).length >= names.length
  React.useEffect(() => {
    const hover = new URLSearchParams(window.location.search).get("hover")
    if (!hover || !done) return
    const copies: string[] = []
    for (const sheet of document.styleSheets) {
      for (const rule of sheet.cssRules) {
        if (rule.cssText.includes(":hover")) copies.push(rule.cssText.replace(/(?<!\\):hover/g, ".__hover"))
      }
    }
    const style = document.createElement("style")
    style.textContent = `* { transition: none !important; }\n${copies.join("\n")}`
    document.head.append(style)
    const timer = window.setTimeout(() => {
      document.querySelectorAll(`[data-examples] :is(${hover})`).forEach((el) => el.classList.add("__hover"))
    }, 300)
    return () => {
      window.clearTimeout(timer)
      style.remove()
    }
  }, [done])

  // ?click=<selector> presses the first match once the examples are in, to look at what it opens.
  React.useEffect(() => {
    const click = new URLSearchParams(window.location.search).get("click")
    if (!click || !done) return
    const timer = window.setTimeout(() => {
      const el = document.querySelector<HTMLElement>(`[data-examples] :is(${click})`)
      if (!el) return
      const at = el.getBoundingClientRect()
      const init = { bubbles: true, cancelable: true, clientX: at.left + at.width / 2, clientY: at.top + at.height / 2, button: 0 }
      el.dispatchEvent(new PointerEvent("pointerdown", { ...init, pointerType: "mouse" }))
      el.dispatchEvent(new MouseEvent("mousedown", init))
      el.dispatchEvent(new PointerEvent("pointerup", { ...init, pointerType: "mouse" }))
      el.dispatchEvent(new MouseEvent("mouseup", init))
      el.dispatchEvent(new MouseEvent("click", init))
    }, 400)
    return () => window.clearTimeout(timer)
  }, [done])

  React.useEffect(() => {
    void Promise.all(
      names.map(async (name) => {
        try {
          const mod = await modules[`/src/examples/${name}.tsx`]()
          const found = mod.default ?? Object.values(mod).find((value) => typeof value === "function")
          if (found) setLoaded((current) => ({ ...current, [name]: found as React.ComponentType }))
          else fail(name, "exports no component")
        } catch (error) {
          fail(name, error)
        }
      })
    ).then(() => {
      ;(window as unknown as { __done: boolean }).__done = true
    })
  }, [names, fail])

  React.useEffect(() => {
    ;(window as unknown as { __failures: Record<string, string> }).__failures = failures
  }, [failures])

  return (
    <div className="container py-8">
      <h1 className="text-xl font-medium">
        {Object.keys(loaded).length} of {names.length} examples mounted, {Object.keys(failures).length} failed
      </h1>
      <pre className="my-4 text-xs text-destructive">{Object.entries(failures).map(([name, error]) => `${name}: ${error}`).join("\n")}</pre>
      <div data-examples className="grid gap-4 md:grid-cols-2">
        {names.map((name) => {
          const Example = loaded[name]
          return (
            <div key={name} className="overflow-hidden rounded-xl border p-4">
              <p className="mb-3 font-mono text-xs text-muted-foreground">{name}</p>
              {Example && (
                <Boundary name={name} onFail={fail}>
                  <Example />
                </Boundary>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
