/**
 * Build the registry: what a project installs Solid Glass from with the shadcn command line.
 *
 *   node scripts/build-registry.mjs
 *
 * Two things come out of it. `registry.json` at the root of the repository is the source registry
 * (https://ui.shadcn.com/schema/registry.json): it names each item and the files it is made of, and
 * is what `shadcn add <owner>/<repo>/<item>` reads straight from GitHub. `public/r/` is the same
 * registry built by `shadcn build` into one JSON file an item, which the site serves and which
 * `shadcn add <address>/r/<item>.json` and the `@solid-glass` namespace read.
 *
 * Only what is Solid Glass's is published: the stylesheet, and the components that have a page in
 * content/solid/. Everything else in src/components/ui is shadcn/ui's and is installed from there.
 */
import { execFileSync } from "node:child_process"
import { copyFileSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const out = join(root, "public/r")
const read = (path) => readFileSync(join(root, path), "utf8")
// Where the site is served from. Solid Glass's own components name one another by it.
const origin = (process.env.SOLID_GLASS_ORIGIN ?? "https://waylandyang.github.io/solid-glass").replace(/\/$/, "")

const own = readdirSync(join(root, "content/solid"))
  .map((file) => file.replace(/\.mdx$/, ""))
  .sort()

const components = own.map((name) => {
  const content = read(`src/components/ui/${name}.tsx`)
  const front = read(`content/solid/${name}.mdx`)
  const packages = new Set()
  const others = new Set()
  for (const [, source] of content.matchAll(/from "([^"]+)"/g)) {
    if (source === "react" || source === "@/lib/utils") continue
    const used = source.match(/^@\/components\/ui\/(.+)$/)?.[1]
    // One of Solid Glass's own is named by its full address; one of shadcn/ui's by its name.
    if (used) others.add(own.includes(used) ? `${origin}/r/${used}.json` : used)
    else packages.add(source.split("/").slice(0, source.startsWith("@") ? 2 : 1).join("/"))
  }
  return {
    name,
    type: "registry:ui",
    title: front.match(/^title:\s*(.*)$/m)?.[1],
    description: front.match(/^description:\s*(.*)$/m)?.[1],
    dependencies: [...packages].sort(),
    registryDependencies: [...others].sort(),
    files: [{ path: `src/components/ui/${name}.tsx`, type: "registry:ui" }],
  }
})

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "solid-glass",
  homepage: origin,
  items: [
    {
      name: "solid-glass",
      type: "registry:file",
      title: "Solid Glass",
      description:
        "The stylesheet: the whole material in one file. Thick, smoky glass for every shadcn/ui component you already have.",
      files: [{ path: "src/solid-glass.css", type: "registry:file", target: "src/solid-glass.css" }],
    },
    ...components,
  ],
}

writeFileSync(join(root, "registry.json"), `${JSON.stringify(registry, null, 2)}\n`)

rmSync(out, { recursive: true, force: true })
execFileSync("npx", ["shadcn", "build", "registry.json", "--output", "public/r"], { cwd: root, stdio: ["ignore", "ignore", "inherit"] })
// The stylesheet as it is, for whoever would rather copy one file than run a command.
copyFileSync(join(root, "src/solid-glass.css"), join(out, "solid-glass.css"))

console.log(`registry: ${components.length} components and the stylesheet -> registry.json, public/r/`)
