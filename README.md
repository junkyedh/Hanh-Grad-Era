# Hanh's Grad Era

A personalized, bilingual graduation invitation built with Next.js. Guests open an individual link to see the invitation, choose whether they can attend, and optionally send a note.

## Tech stack

- Next.js App Router 16, React 19, TypeScript
- Tailwind CSS 4 and project CSS
- Formspree for the attendance and optional message form

## Main features

- Server-resolved personalized invitation routes with a neutral root page and not-found handling
- Vietnamese and English interface with guest-specific Vietnamese addressing
- Interactive envelope, event and location details, configured contact links, and optional music
- One attendance form with an optional message

## Project structure

- `src/app/` — App Router pages, root layout, and global styles
- `src/components/invitation/` — invitation sections and client interactions
- `src/data/` — event and copy configuration; guest lookup reads private guest data from the environment
- `src/types/` — shared invitation types
- `docs/PROJECT_SPEC.md` — current implementation reference

## Local setup

Requirements: Node.js and npm.

```sh
npm ci
```

Set the environment variables below in a local `.env.local` file, then run `npm run dev` and open `http://localhost:3000`. Do not put real guest records or environment values in Git.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `PRIVATE_GUESTS_JSON` | Private guest records used by server-side lookup and personalized route generation |
| `NEXT_PUBLIC_FORMSPREE_FORM_ID` | Public Formspree form identifier used by the browser form; configure it without committing the actual value |

The public Formspree identifier is included in client-side requests by design. It is not an API credential. Keep guest records in an ignored local environment file or an appropriately restricted deployment environment.

## Available development commands

Commands below are defined in `package.json`:

```sh
npm run dev
npm run lint
npm run build
npm run start
```

TypeScript can be checked with `npx tsc --noEmit`.

## Deployment

The project is a Next.js application suitable for Vercel deployment. Configure the required environment variables in the deployment environment before building. Personalized routes are generated from the configured guest records; deployment access and link handling must reflect their privacy needs. Deployment has not been performed as part of this documentation.

## Privacy notes

Personalized links are not authentication: anyone who obtains a link can view and use that invitation. Search-engine no-index metadata does not restrict access. Guest data is read by server-side code, but each configured personalized route is rendered for delivery and may appear in build or hosting output. Use private repositories and appropriately restricted environment configuration for real guest records. Contact details in event configuration are rendered on the invitation and should be approved for that use.

See [docs/PROJECT_SPEC.md](docs/PROJECT_SPEC.md) for the current application specification and verification checklist.
