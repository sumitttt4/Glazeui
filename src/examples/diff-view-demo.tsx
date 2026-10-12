import { DiffStats, DiffView, patchStats } from "@/components/ui/diff-view"

const PATCH = `--- a/research.py
+++ b/research.py
@@ -12,7 +12,9 @@
 def fetch(url):
-    return requests.get(url)
+    response = requests.get(url, timeout=30)
+    response.raise_for_status()
+    return response
 
@@ -31,3 +33,3 @@
 for url in FETCH_LIST:
-    pages.append(fetch(url))
+    pages.append(fetch(url).text)
`

export default function DiffViewDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <p className="flex items-center gap-2 text-[12.5px] text-muted-foreground">
        Edited research.py <DiffStats {...patchStats(PATCH)} />
      </p>
      <DiffView patch={PATCH} />
    </div>
  )
}
