<!--
Base branch: dev, not main.
Title: one English sentence stating what changes; it becomes the commit on dev.
CONTRIBUTING.md has the details behind every line below.
-->

## Why

## What changes

## How it was checked

<!-- This repository has no unit tests: say what you looked at. Which pages or examples, in which themes, at which widths. Screenshots are welcome. -->

## Before review

<!-- Delete the lines that do not apply. -->

- [ ] Every commit is signed off (`git commit -s`)
- [ ] `npm run typecheck` and `npm run build` pass
- [ ] `/dev/examples` reports `0 failed`
- [ ] What the change touches was looked at in both themes, open states included
- [ ] A fix for a stock component is in `src/solid-glass.css`, not in `src/components/ui/`, and was checked against the component as shadcn/ui ships it
- [ ] Nothing new is a flat fill
- [ ] A component of Solid Glass's own has its example in `src/examples/` and its page in `content/solid/`
- [ ] A block's data is made up, and the block imports only what the registry or shadcn/ui can install
- [ ] A changed picture has a new file name, and the README points at it
