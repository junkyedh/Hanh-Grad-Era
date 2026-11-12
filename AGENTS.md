<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project Specification

- The authoritative specification is `docs/PROJECT_SPEC.md`.
- Always follow the latest approved specification.
- Files named `plan_V*.md` are historical references only.
- Do not implement features outside the requested stage.
- Preserve existing staged and unstaged changes.
- Reuse existing components and infrastructure.
- Do not initialize the project again.
- Do not commit, push, or deploy unless explicitly requested.
- Run relevant checks after implementation.