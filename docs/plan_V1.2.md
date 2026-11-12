# Hanh's Grad Era — Product & Technical Specification

> **Version:** 1.2 · **Status:** requirements consolidated; implementation NOT started  
> **Project:** Hanh's Grad Era · **Repository:** `https://github.com/junkyedh/Hanh-Grad-Era`  
> **Purpose:** Single source of truth for Codex and contributors. This document **supersedes** V1.1 and earlier chat prompts wherever they conflict.

## 0. How to use this document

- The Next.js starter already exists. **Do not run `create-next-app`, reinitialize Git, or change remotes.**
- This document is the approved target specification, **not evidence that features are implemented**.
- Implement only the requested phase. Avoid re-auditing the reference website, re-designing approved flows, or adding dependencies without a concrete need.
- On each implementation request: read this document, inspect the relevant current files, make the smallest required changes, run relevant checks, and report changes and remaining blockers. No automatic commit/push/deploy.
- UI text must follow the language policy in §3. Code, comments, and technical documentation may be in English.
- If a decision is not specified, choose the simplest maintainable solution; ask only if the choice changes product behavior, privacy, cost, or data safety.

## 1. Current project baseline and source of facts

**Verified by the user's local run:** Next.js starter initialized and `npm run dev` started successfully. Git repository and remote had been set up before this specification was written.

**Reported by Codex Phase 1 (read-only; validate against repository before implementing version-sensitive behavior):**

- Next.js **16.4.6**, React **19.3.0**, Tailwind **4.3.3**, TypeScript strict mode, ESLint **9**, npm.
- `src/app` App Router, `@/*` import alias; dev/build/start/lint scripts; no existing test script.
- `cacheComponents` and `partialPrefetching` enabled; retain the working starter toolchain and Turbopack integration.
- Replace Next.js starter metadata, Geist fonts, and automatic dark-mode styles.
- Treat dynamic `params` as async. Follow the project's installed Next.js guidance for Suspense/Cache Components.
- Use the current Next.js image-loading API (do not blindly use the deprecated `priority` prop).

## 2. Product identity and confirmed event details

| Field | Value |
| --- | --- |
| Brand | **HANH'S GRAD ERA** |
| Graduate | **Dương Hải Hạnh** |
| Campaign tone | **Letter Intro + Fashion Editorial × Playful Elegance** |
| Date | **Saturday, 28 November 2026** |
| Guest meeting / photo session | **10:00–12:00**, `Asia/Ho_Chi_Minh` (UTC+07:00) |
| Venue | **Hội trường Trần Chí Đáo** |
| Building | **Nhà Điều hành Đại học Quốc gia Thành phố Hồ Chí Minh** |
| Hải Hạnh | **0377 912 406** · `tel:+84377912406` |
| Dương Hân | **0336 126 905** · `tel:+84336126905` |

**Do not invent the official ceremony start time, address, map pin, parking, or gate directions.** The 10:00–12:00 window is for guests/photos. Use Google Maps search for the named venue until an exact verified link is supplied.

## 3. Language, tone, and content policy — V1.2 (REQUIRED)

- **All UI copy is in natural, concise English:** headings, paragraphs, buttons, placeholders, validation/success/error feedback, RSVP messages, accounting jokes, and accessibility labels.
- **Exceptions:** Vietnamese proper names, official venue names, and **explicitly configured Vietnamese honorifics in guest display names**, e.g. `Chị Phúc Linh`, `Anh Minh`, `Em Hân`, `Linh`. Do not translate, infer, or auto-prepend the honorific.
- Example of intended greeting: a standalone `Chị Phúc Linh, ♡` followed by an **English** invitation paragraph. Do not write half-English/half-Vietnamese prose.
- Use **one clear headline** and short supporting copy per section. Avoid redundant text, multiple repetitions of the guest's name, and repeated gift/event details.
- Editorial headline suggestions: `SHE DID IT!`, `IT'S A DATE!`, `DON'T GET LOST!`, `GOT SOMETHING TO TELL ME?`, `NO GIFTS, JUST YOU! ♡`.
- Suggested letter copy (modifiable centrally, never hardcoded across components):
  > I'd love for you to join me for a few photos and happy memories on my graduation day. Hope to see you there! ♡
- The gift note must also be in English, e.g. `No gifts needed — having you there for a photo would mean so much to me! ♡`.
- English remains the rule for `customMessage` as well; do not silently auto-translate user-authored custom messages.

## 4. Approved user journey

1. **Open personalized `/[slug]`.** Server resolves the invited guest using an exact slug. Invalid slug → friendly 404. Root `/` → neutral invitation-link guidance, not a public guest directory.
2. **Envelope intro.** Personalized `displayName`, visible `Open Invitation` control, **music preference default Off**. Do not make guests click through multiple intro screens.
3. **Open letter.** User click opens envelope flap and lifts the letter (~700ms). If music was opted into, request playback from that user gesture; failure never blocks opening.
4. **Reveal editorial invitation.** Main content becomes available with accessible focus management; scrolling remains native. Main content must remain reachable when motion is reduced or JS fails.
5. **Read sections in order:** cover → personalized letter → event details → restrained accounting/economics accents → location/contact → optional graduation wish interaction → final note/RSVP.
6. **Optional wish.** When the visitor scrolls to the wish section, show a **question only**; clicking `Of course! ♡` reveals one textarea. Clicking `Maybe later` skips/collapses without submitting. Scroll alone **never opens** the input.
7. **Optional RSVP.** Two choices prepare an SMS draft. The guest must explicitly send it; opening SMS does not record attendance.

## 5. Visual design and assets

**Palette (CSS variables, one source of truth):**

| Token | Hex | Role |
| --- | --- | --- |
| Cream | `#FFF9EF` | Main canvas |
| Cobalt | `#2854D9` | Major typography / primary actions |
| Cherry | `#E5383B` | Selective highlights |
| Blush | `#F3B9C9` | Playful paper surfaces |
| Butter | `#F7E19B` | Subtle accents |
| Ink | Accessible dark neutral | Body text |

**Typography:** `Barlow Condensed` for editorial display, `DM Sans` for body. Optional serif italic only if clear benefit; default to **two font families**, not three. Configure via `next/font`. Verify actual rendering of Vietnamese diacritics (`Dương Hải Hạnh`, `Chị Phúc Linh`, venue names) before acceptance; don't silently substitute unsupported glyphs.

**Responsive:** mobile-first with checks at 360, 390, 430, 768, 1024, and 1440px. One-column mobile; larger desktop cover can pair oversized headline with hero portrait. No horizontal overflow. Readable paragraph width and adequate contrast.

**Photography:** only one hero portrait and optionally one secondary portrait. Until files are provided, show attractive fixed-ratio **CSS placeholders**; never request nonexistent asset URLs. Planned paths: `public/images/hanh-hero.webp`, `public/images/hanh-secondary.webp`. On replacement use `next/image`, responsive `sizes`, appropriate eager/preload for genuinely needed hero, lazy secondary, meaningful `alt`, configurable `object-position`, no layout shift. **Do not download an unrelated person's portrait.**

**Accounting/economics motif:** 3–5 small, original CSS/SVG stickers such as calculator, ledger, coins, bar chart, or a balanced-books stamp; one small playful block at most, e.g.:

> GRADUATION BALANCE SHEET  
> Assets: Good memories · Liabilities: Deadlines · Net Worth: Priceless ♡  
> THE BOOKS ARE CLOSED. SHE GRADUATED!

Keep these as **accents, not a dashboard or long dedicated section**. GIF/animated WebP only if suitable authorized assets are supplied and performance remains acceptable. Don't add a GIF library by default.

**Animation:** opening envelope ~700ms; cover reveal ~250–350ms; short one-time scroll reveals ~200–300ms; small hover/tap micro-interactions; lightweight wish-success icon/heart. Prefer CSS keyframes/transitions and SVG, with Intersection Observer only if needed; no Motion library unless a concrete requirement cannot be met simply. Animate opacity/transform, not expensive scroll hijacking. Respect `prefers-reduced-motion`, keyboard focus, and touch target sizes ~44px.

**Audio:** `public/audio/grad-theme.mp3` when an authorized file is supplied. User-controlled, **Off by default**. Music preference visible in intro; optionally begin on `Open Invitation` if enabled. Persistent single `<audio>` element and Play/Pause control throughout page. Handle absent file, blocked playback, and pauses correctly. No audible autoplay on initial load, no generated/pirated commercial music, and no reinitialization on scroll.

## 6. Invitation sections / minimal UI copy

| Section | Core responsibility | Copy / action |
| --- | --- | --- |
| `EnvelopeIntro` | Opening interaction | `{guest.displayName}` · `Open Invitation` · music toggle |
| `CoverSection` | Editorial portrait/brand | `HANH'S GRAD ERA` · `SHE DID IT!` · `DƯƠNG HẢI HẠNH` · `CLASS OF 2026` |
| `PersonalLetter` | One personal invitation | Display the guest name **once** and a concise English message |
| `EventDetails` | Date/time/location | `IT'S A DATE!` · `Save the Date` |
| `AccountingDecorations` | Light economics/accounting accents | Small ledger / calculator / balance-sheet joke |
| `LocationSection` | Maps / phone | `DON'T GET LOST!` · `Get Directions` · working contact links |
| `GraduationWishForm` | Optional private message | Question first, then textarea on affirmative click; see §8 |
| `FinalNote` / `RsvpActions` | Gift note + attendance SMS | `NO GIFTS, JUST YOU! ♡` · `I'll be there!` / `Sending love from afar!` |
| `MusicPlayer` | Persistent playback | Accessible Play/Pause / On/Off control |

## 7. Personalization and routing

Use Next.js App Router server-rendered `/[slug]`; do not create a separate page per guest.

```ts
type Guest = {
  slug: string;
  name: string;
  displayName: string; // exact intended Vietnamese title + name or just name
  relationship: 'senior' | 'friend' | 'junior';
  customMessage?: string; // optional English override
};
```

Example **demo** record:

```ts
{
  slug: 'demo-senior',
  name: 'Phúc Linh',
  displayName: 'Chị Phúc Linh',
  relationship: 'senior',
}
```

- Generate three demo routes: `/demo-senior`, `/demo-friend`, `/demo-junior`.
- Centralize English default relationship templates. If `customMessage` exists, use it verbatim as the English letter text. Relationship is for selecting copy, **not Vietnamese grammatical fragments**.
- Lookup and the complete guest list stay in server-only code; send only the current guest's needed display data to client components. Never fall back to an unrelated guest.
- Production slugs must be unguessable (prefer cryptographically secure randomness ≥128 bits); do not enumerate, publish a sitemap of, or expose a full list of invitation URLs.
- Use generic Open Graph metadata, `noindex` for personalized pages, and restrictive referrer policy. Slugs are **bearer links, not authentication**: a forwarded URL can be used by others.
- **Repository caveat:** a server-only guest file is still publicly visible if committed to a *public GitHub repository*. Use demo data only in a public repo; keep real guest lists in a private repo or appropriate private deployment storage.

## 8. Graduation wishes — V1.2 interaction (OVERRIDES V1.1)

**No `FROM` title, no sender-name input, no relationship selector, no modal, no auto-opening textarea.** The URL already determines the intended sender. Avoid repeating `{guest.displayName}` in this section unless genuinely needed for clarity.

**Collapsed state (initial and on scroll):**

- Headline: `GOT SOMETHING TO TELL ME?`
- Subtext: `Before you go, is there anything you'd like to say to me?`
- Buttons: `Of course! ♡` and `Maybe later`.

**When user chooses `Of course! ♡`:** expand inline, gently; show **only one textarea**, placeholder `Write me a little something...`, 0–500 character counter, and `Send My Wish ♡`. User input remains while toggling if feasible. Focus textarea **after the click** (not on scroll); keep accessible labels even if visually hidden.

**When user chooses `Maybe later`:** do not send anything; keep/return collapsed and allow scrolling to the next section. The guest can come back to write later.

**Validation:** message required, trimmed 5–500 **Unicode code points**; preserve intentional line breaks. Show short English errors, e.g. `Write a little something first ♡`, `Your message is a bit too long.`, `Something went wrong. Please try again.`

**Submission states:** idle → pending (disable repeat click) → success / validation error / network error / already submitted / service unavailable. Preserve the draft on failure. On a confirmed `201`, replace form with `Your note is saved for Hạnh. Thank you! ♡` and a restrained heart/check animation. No false success if offline or unconfigured. **One successful wish per guest slug** in V1; no overwrite/update and no public guestbook.

**Client request contract:**

```json
{ "guestSlug": "demo-senior", "message": "Congratulations on your graduation!" }
```

A hidden empty spam-trap field may be added internally, but it is **not a visible input** and must not represent the sender. **Never accept `senderName` from the browser.**

## 9. Wishes API, database, privacy

- `POST /api/wishes` in Next.js Route Handler; no separate backend server.
- Minimal persistence: Supabase PostgreSQL, a private `graduation_wishes` table. Hải Hạnh reads messages in **Supabase Table Editor**, optionally exports CSV. No admin app, public feed, or email notifications in V1. (Email notifications are a later opt-in enhancement, not assumed.)
- Schema:

```sql
id          uuid primary key default gen_random_uuid()
guest_slug  text not null unique
sender_name text not null
message     text not null
created_at  timestamptz not null default now()
```

- DB constraints: trimmed `sender_name` 1–60 characters; trimmed `message` 5–500 Unicode characters under an explicitly documented consistent counting convention; unique `guest_slug` prevents concurrent duplicates. In practice, align browser/server/DB checks or choose conservative database checks that never reject valid server-accepted Unicode input.
- Server processing: require `application/json`; cap request body size (e.g. 8KB while reading); validate slug type/format, message, and optional honeypot; normalize Unicode NFC; trim outer whitespace; preserve internal newlines; **resolve `sender_name` from `guest.displayName` on the server**; reject unknown slug; insert once (no upsert); return safe response codes; don't log content.
- Responses: `201` saved, `400` malformed/spam-trap, `404` unknown guest, `409` wish already exists, `413/415` oversized/unsupported request, `422` message invalid, `429` rate-limited, `503` unconfigured/unavailable, `500` unexpected. If request succeeds but response is lost, a retry may return `409`; UI must **not** falsely claim the current draft was saved.
- Supabase RLS enabled; do not grant anonymous browser clients direct table read/write. Use a **server-only** Supabase client with `SUPABASE_URL`, `SUPABASE_SECRET_KEY` (names adapt to installed Supabase client conventions); never prefix secrets with `NEXT_PUBLIC_`. No public read API. Use safe parameterized client operations and render text without raw HTML.
- Protect API with appropriately configured production rate limiting (Vercel firewall if available/appropriate, or another durable solution; **no in-memory serverless counter**), optional origin check, and honeypot. Rate limits must be checked against plan availability/cost before deployment; no hard claim that specific Vercel functionality is enabled.
- If Supabase is unconfigured, display an honest unavailable state and return `503`; **never simulate persistence**. Do not include real keys in prompts or commits.
- A guest slug is not strong identity verification. The invitation holder can submit the one permitted wish; explicitly accept this limited trust model for V1.

## 10. RSVP, calendar, and map

**RSVP is independent from wishes.** Buttons `I'll be there!` / `Sending love from afar!` open an SMS draft to Hải Hạnh at `+84377912406`, with concise English copy and an optional guest display name. Provide a copyable fallback including recipient number because prefilled SMS body support varies by OS/browser. Do not say RSVP was recorded or sent automatically.

**Calendar:** working `.ics` download (route or utility) for **guest meeting / photo time**, 28 Nov 2026, 10:00–12:00 Vietnam (`20261128T030000Z` to `20261128T050000Z` UTC). Include stable UID, DTSTAMP, escaped/folded lines with CRLF, and venue name; do not label it as the ceremony start time.

**Maps:** working `https://www.google.com/maps/search/?api=1&query=...` constructed from only the confirmed venue/building until a verified location URL is provided. **Phone:** valid `tel:` links for both numbers.

## 11. Recommended component and file architecture

**Server-first. Client boundaries only for interactivity.** One reusable page, no global state library.

```text
RootLayout [server]
└─ app/[slug]/page.tsx [server; async params / Suspense as needed]
   └─ InvitationPage [server composition; one guest and event]
      └─ InvitationExperience [client shell; open animation/audio]
         ├─ EnvelopeIntro [client]
         ├─ MusicPlayer [client; mounted once]
         └─ server-rendered children
            ├─ CoverSection
            ├─ PersonalLetter
            ├─ EventDetails
            ├─ AccountingDecorations
            ├─ LocationSection
            ├─ GraduationWishForm [client; collapsed by default]
            └─ FinalNote + RsvpActions [RSVP client only]
```

Suggested **minimal** files (consolidate small static components; don't manufacture empty files):

```text
src/
  app/
    layout.tsx
    globals.css
    page.tsx
    not-found.tsx
    [slug]/page.tsx
    api/wishes/route.ts
    calendar/route.ts
  components/invitation/
    InvitationPage.tsx
    InvitationExperience.tsx
    EnvelopeIntro.tsx
    MusicPlayer.tsx
    InvitationSections.tsx
    GraduationWishForm.tsx
    RsvpActions.tsx
  data/
    event.ts
    guests.ts          # server only
    content.ts         # English templates/UI copy
  lib/
    calendar.ts
    supabase.ts        # server only
    wishes.ts          # server validation/persistence
  types/invitation.ts
supabase/migrations/<timestamp>_graduation_wishes.sql
public/images/           # add real files later
public/audio/            # add authorized track later
docs/PROJECT_SPEC.md     # this document
```

Keep the music element mounted across introduction/main invitation. Avoid importing the guest list into `"use client"` modules. Do not install a component library, animation library, icon pack, ORM, CMS, authentication, or state-management library without a justified need. Native HTML/CSS/SVG and existing dependencies are preferred.

## 12. Implementation sequence — execute one stage per Codex request

| Stage | Deliverable | Checks / exit condition |
| --- | --- | --- |
| **S1. Route + content** | Demo guests, server resolution, English guest text, generic metadata, 404, event config | Correct `displayName`; no full guest list in client; type/lint |
| **S2. UX + responsive UI** | Envelope, cover, letter, event, decorations, location, final note; placeholders | Native scroll, keyboard + reduced motion, six widths |
| **S3. Music + animation** | Controlled audio, open animation, scroll reveal, stickers | No autoplay, graceful missing audio, no scroll interference |
| **S4. Wish interaction** | Collapsed question → single textarea → request client and states | No `FROM`/name field; no scroll autoexpand; full English UI |
| **S5. Wish backend** | Supabase migration/RLS/Route Handler, validation, safe errors | Confirm real persistence with credentials, duplicate protection, no browser secrets; can be completed structurally without credentials |
| **S6. Actions** | ICS download, maps, contacts, SMS RSVP fallback | Real button behavior; correct clock and number |
| **S7. Verification** | Fix lint/type/build, targeted tests, accessibility/mobile review | See acceptance checks below |
| **S8. Deployment** | Vercel environment/setup instructions; deploy only on separate instruction | Secrets and migration configured; rate limiting reviewed; smoke test |

Each stage should preserve current working behavior, avoid unrelated refactors, and stop after a short completion report. Don't continue automatically to the next stage unless requested.

## 13. Acceptance checklist

- [ ] Valid slug shows the exact intended Vietnamese `displayName` and an English-only invitation.
- [ ] Invalid slug is a safe 404; root is neutral; no public guest directory or exposed guest list.
- [ ] Envelope opens by click, remains accessible, and respects reduced motion.
- [ ] Main page is mobile-first, visually coherent and no horizontal overflow at 360/390/430/768/1024/1440px.
- [ ] Hero and optional secondary image use working placeholders; replacing photos needs no component rewrite.
- [ ] Music is Off by default, user-controlled, persistent, and handles missing/blocked audio gracefully.
- [ ] Accounting stickers are restrained, lightweight, and not distracting.
- [ ] Calendar file represents **photo time** 10:00–12:00 on 28 Nov 2026 in Vietnam.
- [ ] Google Maps and two telephone links work.
- [ ] Wish section is **collapsed on arrival**, CTA opens **only one textarea**, **no visible sender input**.
- [ ] Wish validation, pending, success, 409, offline, and unavailable UI states work; user draft survives failures.
- [ ] Server derives sender identity from slug; one successful wish/slug; backend returns actual persistence result.
- [ ] Supabase table is private; sensitive keys remain server-only and outside Git; no public wishes feed.
- [ ] RSVP generates an English SMS draft or usable fallback; never claims a message was sent automatically.
- [ ] Accessibility: keyboard, labels, focus, contrast, motion preferences, audio controls.
- [ ] TypeScript, lint, production build and relevant tests pass; avoid unrelated changes.

## 14. Explicit non-goals and production dependencies

**Do not build:** authentication, guest administration UI, public guestbook, custom CMS, notification emails, analytics, payment/gift service, gallery, automatic autoplay music, 3D/parallax-heavy animations, external backend server, or a second app.

**Needed for production (not required to start UI work):** real guest list and unique slugs; optional Hạnh portraits; authorized MP3; configured Supabase project/table/secrets; confirmation of supported rate limiting and exact Maps link if desired. **Do not pretend unavailable assets/services exist.**

## 15. Change log and resolved conflicts

**V1.2 overrides the earlier Phase 1 report (V1.1) in these exact places:**

1. **Remove** editable `senderName` and the visible `FROM` field from `GraduationWishForm`.
2. **Replace** request `{ guestSlug, senderName, message }` with `{ guestSlug, message }`; derive `sender_name` from the server-resolved guest. An optional hidden honeypot is not a sender field.
3. **Replace** name + salutation assembly with explicit `guest.displayName` (e.g., `Chị Phúc Linh`).
4. **Replace** mixed/Vietnamese body text with concise **English UI**, preserving Vietnamese honorifics/proper nouns.
5. **Replace** always-visible wishes form with **collapsed question + click-to-expand single textarea**. Scroll triggers only section reveal, not form opening.
6. **Retain**: envelope-first UX, editorial design, opt-in music, photo placeholders, minimal accounting motifs, private persistent Supabase wishes, SMS RSVP, calendar/maps/contacts, no admin dashboard.

**Current implementation status:** only the Next.js starter was confirmed running. The attached Codex result is a **Phase 1 plan**, not implemented app features. This document captures the approved design constraints and next steps; it must not be treated as proof of shipped functionality.
