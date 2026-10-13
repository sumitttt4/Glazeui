# Security

*[中文版](SECURITY.zh-CN.md)*

Solid Glass is a stylesheet, a set of React components and a static site. It runs no server, keeps no accounts and stores nothing. What can go wrong is narrower than in an application, and it is this:

- **What the registry hands out.** `shadcn add` writes the files under `/r/` into other people's projects. A change that put something unexpected in those files would reach everyone who installs. They are built from this repository by `scripts/build-registry.mjs`, and only from `main`.
- **Dependencies.** The components depend on packages from npm; a compromised one is a problem for whoever installs.
- **The site.** It is static and takes no input that reaches anyone else. The blocks' forms, file pickers and chat boxes keep what is typed in the page and send it nowhere.

## Reporting a vulnerability

Email **security@deeplethe.com** rather than opening a public issue. Include the commit or the registry item, and steps to reproduce. You will get an acknowledgement within a few days, and the release that carries the fix names you unless you ask otherwise.
