import * as React from "react"

export function useCopyToClipboard({ timeout = 2000 }: { timeout?: number } = {}) {
  const [isCopied, setIsCopied] = React.useState(false)

  const copyToClipboard = (value: string) => {
    if (!value) return
    void navigator.clipboard?.writeText(value).then(() => {
      setIsCopied(true)
      window.setTimeout(() => setIsCopied(false), timeout)
    })
  }

  return { isCopied, copyToClipboard }
}
