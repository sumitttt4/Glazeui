import path from "node:path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  // Where the site lives under its host: "/" on a domain of its own, "/solid-glass/" on GitHub Pages.
  base: process.env.SOLID_GLASS_BASE ?? "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(import.meta.dirname, "./src") },
      // The examples taken from shadcn/ui were written for Next.js: these stand in for what they use of it.
      { find: /^next\/link$/, replacement: path.resolve(import.meta.dirname, "./src/site/shims/next-link.tsx") },
      { find: /^next\/image$/, replacement: path.resolve(import.meta.dirname, "./src/site/shims/next-image.tsx") },
      { find: /^next-themes$/, replacement: path.resolve(import.meta.dirname, "./src/site/shims/next-themes.ts") },
    ],
  },
  server: { port: 5191, strictPort: true },
  preview: { port: 5191, strictPort: true },
  build: { chunkSizeWarningLimit: 4000 },
})
