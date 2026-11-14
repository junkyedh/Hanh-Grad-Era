<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project Specification

- `docs/PROJECT_SPEC.md` is the sole active project specification. Do not maintain or follow obsolete plans or handoffs.
- Inspect the current source and relevant diffs before modifying code. Preserve all staged and unstaged user changes.
- Preserve working functionality; never reinitialize the Next.js project. Reuse existing components and infrastructure, and avoid unnecessary dependencies.
- Preserve personalized routing and server-side guest resolution, Vietnamese and English behavior, Formspree submission behavior, and existing map, music, and animation behavior.
- Do not expose private guest records or slugs. Do not commit `.env.local` or private guest files. Never hardcode credentials or private environment values.
- Run relevant checks after implementation.
- Never commit, push, deploy, or rewrite Git history without explicit user approval.
