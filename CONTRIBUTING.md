# Contributing to Solid Glass

[中文](CONTRIBUTING.zh-CN.md)

Welcome. This file covers what is specific to this repository; general open-source etiquette is assumed. How we treat each other is in the [Code of Conduct](CODE_OF_CONDUCT.md).

## Branches and how changes land

| Branch | What it is |
|---|---|
| `main` | What is published. The site and the registry at [deeplethe.github.io/solid-glass](https://deeplethe.github.io/solid-glass) are built from it. Only maintainers merge into it, from `dev` |
| `dev` | Integration branch. Every contribution lands here first |

Your path as a contributor:

```bash
git switch dev && git pull
git switch -c fix/some-thing        # branch off dev, not main
# make changes, commit with -s (see DCO below)
git push -u origin fix/some-thing
```

Then open a PR with **base `dev`, not `main`**. A maintainer merges once CI and review pass.

Merging `dev → main` is done by maintainers on their own schedule; contributors don't need to think about it. Two rules keep the two branches from drifting apart, and both are for maintainers:

- **Back-merge `main` into `dev` right after a release.** The `dev → main` merge commit lives only on `main`, so without this `main` reads as ahead even though the trees are identical, and the gap grows by one every release.
- **Urgent fixes go through `dev` too.** A PR opened straight against `main` is the one thing that makes the two branches genuinely diverge, and then someone has to reconcile them by hand.

A merge into `main` is a release: the site is rebuilt and the registry that `shadcn add` reads changes for everyone. Nothing reaches users before that.

Both branches are protected: pull request required, CI (`web`) must pass, no force pushes, no deletions, and admins are held to the same rules.

## Issue first, or straight to a PR

| Change | What to do |
|---|---|
| Bug fixes, a component the theme missed, docs, examples | Open a PR directly |
| A new component or block, a dependency | Open an [issue](https://github.com/deeplethe/solid-glass/issues) first and describe the use case |
| The material itself (a token's meaning, the four rules, what a state looks like), the registry's addresses or item names | Discuss in an issue before writing code |

The last row is what other people's projects depend on. A variable renamed in `src/solid-glass.css`, or an item renamed in the registry, breaks an installation that was working.

## Local setup

Requires Node 22+ and npm.

```bash
npm install
npm run dev         # http://localhost:5191
```

`/dev/examples` (development only) mounts every example on one page and lists any that fail. It takes `?q=button,card` to show some of them, `?theme=light`, `?hover=<selector>` to show what matches as if the pointer were on it, and `?click=<selector>` to press something and look at what it opens.

## Before you push

CI runs exactly this. Green locally means green in CI:

```bash
npm ci
npm run docs        # the documentation and the registry are generated; the types depend on them
npm run typecheck
npm run build
```

There are no unit tests: what this repository makes is how things look. So a change is checked by looking, and the pull request says what was looked at:

- `/dev/examples` reports `0 failed`.
- The components the change touches, **in both themes**. Dark is the material as designed; light is where a rule written for dark most often goes wrong.
- Open states too: a menu, a dialog, a hovered row. Most of what has been missed was only visible open.

## Things review will send back

**Nothing is a flat fill.** Every surface is finished at its edge: a line of light along the top, a hairline round it, a shadow where it stands off the page. A component that arrives as a plain block of colour is not done. The four rules are on the [Material](https://deeplethe.github.io/solid-glass/docs/material) page; hold a change to them.

**The stylesheet restyles; it does not ask for edits.** `src/solid-glass.css` finds each part of a shadcn/ui component by the `data-slot` and the classes it already carries. A fix that only works after editing a file in `src/components/ui/` does nothing for someone who installed the stock component. Fix it in the stylesheet, and check it against the component as shadcn/ui ships it.

**Lines of light are drawn inside the edge.** An inset shadow sits inside the border. On an element that keeps a border, the border is the hairline, one colour all the way round, and the line of light is an inset shadow just inside it. A border with a brighter top breaks at rounded corners; a border left between an inset line and an outer ring reads as a second edge. Both have been shipped and taken back.

**No colour of its own.** The glass is neutral grey. Hue is for what it says: a status, a failing step, a series in a chart. A pane that takes the colour of what is behind it is liquid glass, which this is not.

**One state.** Hovered, chosen and held open wear the same small pane of clear glass. A new way of showing "this one" needs a reason.

**A component of Solid Glass's own comes whole.** `src/components/ui/<name>.tsx` written like a shadcn/ui component (function components, a `data-slot` on every part, `cn()`), at least one example in `src/examples/`, and its page in `content/solid/`. The registry is built from those three.

**A block must run in a clean project.** Solid Glass's own blocks are single files at the top of `src/blocks/` and are published in the registry. They import only what the registry or shadcn/ui can install, and carry made-up data: no real names, products or addresses.

**A picture that changes gets a new file name.** GitHub serves a README's pictures from one address per file and browsers keep them; `banner-5.webp` becomes `banner-6.webp`, and the README points at the new one. Pictures are WebP.

**Comments explain why.** This repository comments densely and records the traps it fell into ("a white rim on a light fill does not show"). Follow that. A comment restating what the code does will be asked to go.

**Commit messages: one English sentence, stating the motivation.** Skim `git log` for the register.

**Every workflow declares its own `permissions:`.** `contents: read` for anything that just builds.

## What comes from shadcn/ui

The stock components in `src/components/ui/`, the examples in `src/examples/`, the pages in `content/components/`, the preview cards in `src/create/cards/` and the blocks in folders under `src/blocks/` are shadcn/ui's, under the MIT License; [NOTICE.md](NOTICE.md) says which and from which commit. Improvements to those belong upstream, in [shadcn-ui/ui](https://github.com/shadcn-ui/ui). Changes here are for the material.

## DCO: sign off every commit

We use the [DCO](https://developercertificate.org/), not a CLA. You keep the copyright on your code; you are certifying that you have the right to submit it under the MIT License.

Commit with `-s` and git adds the line for you:

```bash
git commit -s -m "Fix the thing"
```

which appends:

```
Signed-off-by: Your Name <your@email>
```

Forgot? `git commit --amend -s` for the last commit, or `git rebase --signoff HEAD~3` for several (adjust the count), then `git push -f`.

Use a consistent identity you answer to — a GitHub account with history under it counts — and an address that reaches you; a noreply address tied to that account is fine. No anonymous or throwaway contributions.

## License

By contributing you agree that your work is released under the [MIT License](LICENSE).
