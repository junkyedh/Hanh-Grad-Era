# Hanh's Grad Era — Project Specification

> **Version:** 1.3  
> **Status:** S1 implemented locally and verified by Codex; **10 uncommitted files reported**. S2–S8 not yet implemented.  
> **Repository:** https://github.com/junkyedh/Hanh-Grad-Era  
> **Intended repository path:** `docs/plan_V1.3.md`  
> **Role:** The single source of truth for requirements, architecture, decisions, implementation scope, and stage acceptance.  
> **Supersedes:** `plan_V1.2.md`, V1.1, Phase 1 planning notes, and earlier chat prompts wherever they conflict.

## 0. Instructions for Codex (read first)

1. **Do not initialize the project again.** Next.js, TypeScript, Tailwind, ESLint, npm, Git and GitHub remote have already been set up.
2. **Preserve S1.** Before changing files, inspect the current working tree and relevant source. Do **not** reset, overwrite, re-create, or revert the 10 existing changes merely because they are uncommitted.
3. **Read §0, §10 and only the sections relevant to the requested stage** (map below). Do not re-read unrelated details, repeat the full reference-site audit, re-plan approved decisions, or jump ahead. This minimizes Codex context use.
4. Prefer small focused modifications. Reuse installed dependencies. Do not introduce Supabase, a custom wishes API, authentication, ORM, UI kit, state manager, or animation library without a newly approved reason.
5. Verify each stage with appropriate lint/type/build checks and explain any failures. Do not commit, push, deploy, or mutate Git remotes unless expressly requested.
6. Treat this as an implementation **target**, not proof that S2–S8 already exist. Confirm the actual state from the local repo before editing. Ask only about blockers that genuinely change cost, security, privacy, or product behavior.
7. Maintain natural **English-only UI copy**, with the explicit Vietnamese proper-name and honorific exceptions in §3. Keep text short; do not add extra form fields or decorative sections.

**Read-by-stage map:** S2 → §§3–5, 9; S3 → §§4–5; S4 → §§3, 7.1; S5 → §§7.2–7.3; S6 → §§2, 8; S7 → §11; S8 → §§7.3, 11–12. Check §1.2 to preserve S1 in every stage.

## 1. Project status and existing code

### 1.1 Existing stack

The user has successfully run the Next.js starter locally. A prior read-only Codex report identified:

- Next.js **16.4.6**, React **19.3.0**, TypeScript strict, Tailwind CSS **4.3.3**, ESLint **9**, npm.
- App Router under `src/app/`, import alias `@/*`.
- `cacheComponents` and `partialPrefetching` enabled at the time of inspection; respect the project's installed Next.js routing guidance, including async route params and suitable Suspense handling.
- Existing Next.js/Turbopack configuration should be preserved. Do not use obsolete image props without checking installed framework behavior.

**These versions and flags come from the earlier Codex report, not a fresh inspection in this document.** Inspect current `package.json` and `next.config.ts` if version-sensitive decisions arise.

### 1.2 S1 completed — do not re-implement

The **most recent Codex S1 completion report** says the following **10 files changed**:

| Existing file | Implemented in S1 (as reported) |
| --- | --- |
| `src/app/[slug]/page.tsx` | Personalized dynamic route |
| `src/app/page.tsx` | Neutral root page |
| `src/app/not-found.tsx` | Safe invitation-not-found content |
| `src/app/layout.tsx` | Generic sharing metadata, `noindex`, restrictive referrer policy |
| `src/data/guests.ts` | Server-only demo guest records |
| `src/data/content.ts` | English relationship templates and custom overrides |
| `src/data/event.ts` | Confirmed graduation event data |
| `src/types/invitation.ts` | Shared typed guest/invitation data |
| `src/components/invitation/InvitationPage.tsx` | Server-rendered invitation template |
| `src/proxy.ts` | Invalid-slug HTTP 404 before streaming begins |

Reported verification passed: ESLint, TypeScript, production build, whitespace checks, three demo routes, exact display names, custom message overrides, event times, invalid-route 404, and no guest list in client JS bundles.

**Working-tree caution:** The user reports all 10 changes are **uncommitted and unpushed**. Do not claim to have inspected them from this specification. A future Codex run should check `git status` and existing files first. Keep the working implementation and make incremental changes. No S1 migration is needed merely because the specification moved from the repository root to `docs/plan_V1.3.md`.

## 2. Product identity and event data (approved)

| Field | Value |
| --- | --- |
| Website | **HANH'S GRAD ERA** |
| Graduate | **Dương Hải Hạnh** |
| Design direction | **Letter Intro + Fashion Editorial × Playful Elegance** |
| Date | **Saturday, 28 November 2026** |
| Guest meeting/photo time | **10:00–12:00**, `Asia/Ho_Chi_Minh` (UTC+07:00) |
| Venue | **Hội trường Trần Chí Đáo** |
| Building | **Nhà Điều hành Đại học Quốc gia Thành phố Hồ Chí Minh** |
| Hải Hạnh | **0377 912 406** / `tel:+84377912406` |
| Dương Hân | **0336 126 905** / `tel:+84336126905` |

The 10:00–12:00 interval is the **guest meeting/photo window**, not a verified official ceremony start time. Do not invent parking, gates, coordinates, or an exact street address. Use a Google Maps search link for the confirmed venue/building until an exact location link is supplied.

## 3. Language, voice and minimal-content rules (approved V1.2, retained)

- **All public UI prose is natural, concise English:** headlines, letter paragraphs, CTA labels, descriptions, RSVP/SMS copy, placeholders, feedback, error messages, accounting jokes and accessible names.
- **Exceptions only:** Vietnamese proper names, official venue names, and the exact, explicitly configured Vietnamese guest title/name: e.g. `Chị Phúc Linh`, `Anh Minh`, `Em Hân`, `Linh`, `Dương Hải Hạnh`.
- Use `guest.displayName` **exactly**. Do not infer gender or automatically prepend `Anh` / `Chị` / `Em`; do not add an English `Dear` if it reads awkwardly with the exact configured title.
- Do not mix Vietnamese narrative paragraphs into English ones. The short address `Chị Phúc Linh, ♡` may precede a fully English invitation paragraph.
- One concise headline per section. Avoid repeated event facts, repeated guest names and long paragraphs. English custom messages should remain authored English; do not auto-translate.
- Voice: warm, playful, personal, slightly editorial; **not** corporate, overly sentimental or childish.

**Suggested editable copy** (store centrally rather than repeating in JSX):

| Placement | Copy |
| --- | --- |
| Cover | `HANH'S GRAD ERA` / `SHE DID IT!` / `DƯƠNG HẢI HẠNH` / `CLASS OF 2026` |
| Letter | `I'd love for you to join me for a few photos and happy memories on my graduation day. Hope to see you there! ♡` |
| Event | `IT'S A DATE!` / `Save the Date` |
| Location | `DON'T GET LOST!` / `Get Directions` |
| Wishes question | `GOT SOMETHING TO TELL ME?` |
| Wishes hint | `Before you go, is there anything you'd like to say to me?` |
| Wishes choices | `Of course! ♡` / `Maybe later` |
| Wishes placeholder | `Write me a little something...` |
| Wishes submit | `Send My Wish ♡` |
| Wishes success | `Your note made it to Hạnh. Thank you! ♡` |
| Final | `NO GIFTS, JUST YOU! ♡` |
| Gift note | `No gifts needed — having you there for a photo would mean so much to me! ♡` |
| RSVP | `I'll be there!` / `Sending love from afar!` |

These are **product copy defaults**, editable through a centralized content file; minimize copy in the final layout.

## 4. Approved guest journey and navigation

1. Guest opens a **unique** invitation URL `/[slug]`. The server resolves the exact guest. Unknown slug => friendly 404. Root `/` stays neutral; do not list all guests.
2. Show **EnvelopeIntro** with the intended `guest.displayName`, `Open Invitation`, and visible **music preference default Off**.
3. On click: animate envelope flap / letter lifting (~700 ms); if music was explicitly enabled, start playback inside that user gesture. Music errors never block opening.
4. Reveal an editorial **single-page scrolling invitation**. Main content is accessible, with correct keyboard focus and reduced-motion fallback; no scroll hijacking.
5. Order: **Cover → Personal Letter → Event Details → restrained accounting accents → Location & Contacts → Graduation Wishes → Final Note + RSVP**.
6. Wishes: reaching the section shows **only a question and choices**; clicking `Of course! ♡` expands one textarea. Scrolling must not expand the form. `Maybe later` skips or collapses it without submission; a visitor can return.
7. RSVP remains **separate**: two choices open a prepared SMS draft. The visitor must send it explicitly.

## 5. Visual system and asset strategy

### 5.1 Tokens and typography

| Token | Color | Use |
| --- | --- | --- |
| Cream | `#FFF9EF` | Main canvas / letter paper |
| Cobalt | `#2854D9` | Large titles and selected buttons |
| Cherry | `#E5383B` | Small highlights / CTA accents |
| Blush | `#F3B9C9` | Letter/cards |
| Butter | `#F7E19B` | Secondary accents |
| Ink | Readable dark neutral | Body copy |

Use centralized CSS variables; ensure contrast. Main font **Barlow Condensed**, body font **DM Sans**, via `next/font`. Default to these **two fonts**. Verify Vietnamese glyph coverage, especially `Dương Hải Hạnh` and `Chị Phúc Linh`, and fix coverage without introducing random fonts.

### 5.2 Responsive design

- Mobile-first; test widths **360, 390, 430, 768, 1024, 1440px** (test sizes, not six mandatory breakpoints).
- No horizontal overflow, readable line lengths, sufficiently large hit areas (~44 px), accessible focus styles.
- Desktop cover may pair oversized typography with portrait; mobile stacks gracefully.

### 5.3 Photography

- **One hero portrait**, at most **one** secondary portrait.
- No real photos yet; use attractive CSS/styled fixed-ratio placeholders without requesting missing files.
- Later place authorized images at `public/images/hanh-hero.webp` and optionally `public/images/hanh-secondary.webp`. Use `next/image` responsively with `sizes`, stable aspect ratio, alt text, configurable crop and lazy loading for secondary photo.
- Do not fetch random people’s pictures or use unrelated stock portraits as stand-ins.

### 5.4 Accounting/economics theme

- **3–5** restrained original CSS/SVG decorative accents: calculator, ledger, coins, simple bar chart, stamp.
- At most one playful micro-block, e.g. `GRADUATION BALANCE SHEET · Assets: Good memories · Liabilities: Deadlines · Net Worth: Priceless ♡`.
- Optionally `THE BOOKS ARE CLOSED. SHE GRADUATED!` as a small stamp.
- Not an accounting dashboard. GIF / animated WebP only when licensed, lightweight assets are supplied. Avoid excessive animation and large GIF libraries.

### 5.5 Motion and audio

- Envelope motion ~700ms; cover reveal 250–350ms; one-time scroll reveals ~200–300ms; gentle hover/tap feedback; a small success check/heart after a wish succeeds.
- Prefer CSS transitions/keyframes and lightweight SVG; Intersection Observer only if needed. Avoid heavy parallax, particles, scroll hijacking and unapproved animation packages. Respect `prefers-reduced-motion`.
- Music asset when supplied: `public/audio/grad-theme.mp3`. **Off by default**. User may opt in before opening, or play/pause later with a discreet persistent controller. Use **one mounted audio element** and do not restart it on section transitions.
- No audible autoplay at page load. Missing/blocked media should not break the invitation. Do not use unauthorized commercial audio.

## 6. Guest personalization and current S1 architecture

```ts
type Guest = {
  slug: string;
  name: string;
  displayName: string; // exact intended address, e.g. 'Chị Phúc Linh'
  relationship: 'senior' | 'friend' | 'junior';
  customMessage?: string; // optional English override
};
```

- Continue using the **S1 server-rendered** guest lookup rather than replacing it. The relationship determines a short default English letter; `customMessage` overrides the default when present.
- Demo routes: `/demo-senior`, `/demo-friend`, `/demo-junior` (verify actual S1 data instead of duplicating it).
- Use a reusable template, **never one page per guest**. Send only the current guest’s required fields to client components.
- Slugs are bearer links, **not authentication**. Production slugs should be hard to guess and not published in a directory, sitemap, or client bundle.
- Existing S1 metadata/noindex/referrer protections and early invalid-route 404 in `src/proxy.ts` should be preserved unless a specific tested issue requires a focused fix.
- **Important public-repository caveat:** a `server-only` module is excluded from client bundles, but any real guest list committed to a **public GitHub repo is visible in source**. Use demo records in public source; keep real guest info in a private repository or another approved private data location. Do not design a database solely for invitations in V1.

## 7. Graduation Wishes — V1.3 UI requirements

### 7.1 Progressive disclosure (approved)

- On scroll into the section, reveal the question gently. **Do not auto-open or auto-focus input.**
- Initial headline: `GOT SOMETHING TO TELL ME?`.
- Small subtitle and actions `Of course! ♡` / `Maybe later`.
- On `Of course! ♡`: expand **one** textarea inline, with a hidden-but-accessible label, English placeholder, character counter, and `Send My Wish ♡`. Focus after the deliberate click.
- **No visible FROM label, name input, email input, relationship selector, or modal.** The guest is already resolved from the invitation URL.
- `Maybe later`: skip/collapse, leave page usable, do not send. Prefer preserving the draft when toggling back.
- Validate a trimmed message length of **5–500 Unicode code points**. Preserve intentional line breaks. Friendly English errors; prevent repeated button clicks while pending.
- On confirmed **successful Formspree response**, replace input with a short thank-you + restrained heart/check animation. On offline/error/unconfigured state, retain the draft and show an honest English error. Do not claim success before service acknowledgement.

### 7.2 V1.3 submission flow — **Formspree, no custom backend**

```text
Guest opens /[slug]
  → S1 server resolves guest.displayName
  → wishes question / click to expand
  → client validates a single message
  → browser submits form fields to Formspree
  → Formspree stores submission and can notify Hạnh's recipient email
  → Hạnh reads via Formspree inbox/dashboard or configured email
```

The browser sends **form metadata** alongside the single visible message. Suggested Formspree field names:

| Submitted field | Value | Visible editable UI? |
| --- | --- | --- |
| `message` | Trimmed visitor wish (5–500 chars) | **Yes: one textarea only** |
| `guest_slug` | Resolved current slug | No |
| `guest_display_name` | Resolved `guest.displayName` | No |
| `_subject` (optional) | `New graduation wish for Hạnh` | No |

**Important distinction from V1.2:** metadata is delivered by the **browser** directly to Formspree, so the guest name/slug can be altered by someone manipulating requests. There is **no server-side identity verification** or authoritative server lookup at the Formspree endpoint. Treat the sender field as *context supplied by an invitation link*, **not verified identity**. Never state otherwise.

**Submission approach:** Prefer a small native `fetch()` request to the Formspree form endpoint with an appropriate JSON response (`Accept: application/json`); it avoids adding a library for one simple form. Use the official React integration **only if** it demonstrably simplifies this exact custom interaction. Keep the endpoint/form ID configurable as `NEXT_PUBLIC_FORMSPREE_FORM_ID` (a form ID is a public integration identifier, **not a secret key**). If absent, disable real submission with an honest non-functional state; **no fake success**.

**Scope boundary:** Formspree V1 **does not guarantee one wish per guest slug**. Disabling repeated clicks while pending and keeping a submitted state during a session are UX protections, not cross-device/database uniqueness. Do not add hidden APIs, cookies or backend solely to enforce a hard one-per-guest constraint. If strict de-duplication ever becomes mandatory, it is a **new feature requiring a separate architecture decision**.

**Privacy and spam:** submitted messages are private to the Formspree account/authorized recipient, **not displayed publicly on the invitation site**. Provider anti-spam options and submission limits depend on settings/plan; configure them in Formspree as needed. Do not claim the public form endpoint is secret or that the invite slug authenticates guests. Avoid logging entire wishes in analytics/console.

### 7.3 Formspree setup (external configuration, not in-repo backend)

1. Hạnh (or the site owner) creates a Formspree form for graduation wishes.
2. Configure **the desired recipient email** in the Formspree Dashboard and complete required verification/notification setup. The recipient address is **not yet provided**; do not invent one.
3. Copy the Form ID from the provider's form URL; set `NEXT_PUBLIC_FORMSPREE_FORM_ID` locally (`.env.local`) and on Vercel. Do not commit environment files. The ID may be visible in client requests; this is expected.
4. Submit **one real test wish** on a demo invitation, verify the Formspree submission inbox and configured email (including spam folder), then remove/label the test entry if needed.
5. Check the provider's **current** quota, spam controls, retention and notification settings before launch; do not hard-code assumed free-plan allowances.
6. If service is unreachable or not configured, the site must remain readable and RSVP/calendar/maps must work. Form error state should preserve the typed wish. Consider a simple copy-message fallback on service failure if unobtrusive.

Official references (consult as needed, no broad research required):
- Formspree Next.js guide: https://formspree.io/guides/nextjs/
- AJAX submission: https://help.formspree.io/articles/building-your-form/submit-forms-with-javascript-ajax
- HTML form fields / storage and target email: https://help.formspree.io/articles/building-your-form/building-an-html-form/
- Spam settings: https://help.formspree.io/articles/troubleshooting/how-to-prevent-spam/

## 8. Event actions and RSVP (no backend)

- **RSVP is separate from graduation wishes.** Two actions `I'll be there!` and `Sending love from afar!` open a prefilled **English** SMS draft addressed to Hải Hạnh at `+84377912406`; include the resolved guest display name when useful.
- SMS body handling varies between devices; provide the recipient number and easy copy-text fallback. Do not claim attendance was recorded or SMS was automatically sent.
- **Calendar:** create a valid downloadable `.ics` (client utility or lightweight route if necessary; **not** a wishes API). Photo window: 2026-11-28 10:00–12:00 Vietnam = `20261128T030000Z`–`20261128T050000Z`. Include stable UID, DTSTAMP, proper line escaping/folding, CRLF, confirmed venue. Do not label as official ceremony time.
- **Maps:** Google Maps search query with known venue/building. **Phone:** functional `tel:+84377912406` and `tel:+84336126905` links.

## 9. Architecture — minimal frontend + Formspree service

**Overall:** One existing Next.js application, server-rendered guest content, a small client interaction shell, **no application database, no self-hosted wishes backend**.

```text
RootLayout [server; exists from S1]
└─ app/[slug]/page.tsx [server; exists from S1]
   └─ InvitationPage [server composition; exists from S1]
      └─ InvitationExperience [client shell; add in S2]
         ├─ EnvelopeIntro [client]
         ├─ MusicPlayer [client; remains mounted]
         └─ server-rendered invitation content
            ├─ CoverSection
            ├─ PersonalLetter
            ├─ EventDetails
            ├─ AccountingDecorations
            ├─ LocationSection
            ├─ GraduationWishForm [client; Formspree]
            └─ FinalNote + RsvpActions [RSVP client actions]

GraduationWishForm → Formspree public submission endpoint
Formspree → private submissions inbox + configured email
```

**Recommended incremental files** (not all need to exist; consolidate simple static sections). Do **not** recreate or remove S1 files:

```text
src/
  app/
    layout.tsx                 # S1 — preserve
    page.tsx                   # S1 — preserve
    not-found.tsx              # S1 — preserve
    [slug]/page.tsx            # S1 — preserve
    globals.css                # refine for V1.3 design
  proxy.ts                     # S1 — preserve invalid-route logic
  components/invitation/
    InvitationPage.tsx         # S1 — extend, do not rewrite blindly
    InvitationExperience.tsx   # new client shell, if needed
    EnvelopeIntro.tsx          # new
    MusicPlayer.tsx            # new
    InvitationSections.tsx     # may consolidate static sections
    GraduationWishForm.tsx     # new; direct Formspree integration
    RsvpActions.tsx            # new only if needed
  data/
    guests.ts                  # S1 — server-only
    content.ts                 # S1 — extend English copy
    event.ts                   # S1 — confirmed info
  types/
    invitation.ts              # S1 — preserve
  lib/
    calendar.ts                # optional .ics helper
public/
  images/                      # real photos added later
  audio/                       # authorized MP3 added later
docs/
  plan_V1.3.md              # this file
```

**Explicitly removed from previous plan:**

- `src/app/api/wishes/route.ts`
- `src/lib/supabase.ts` and `src/lib/wishes.ts` for persistence
- `supabase/migrations/`, SQL schemas, RLS policies and Supabase environment variables
- Custom wishes rate limiter / Vercel firewall project
- Database-level unique guest wish guarantee
- Custom email-sending service and admin dashboard

**Important:** This removal is **from planned scope**. Since S5 was not implemented, do not delete unrelated actual repository files on assumption. Inspect the tree first. A calendar route/helper is acceptable if simple, but it must not be confused with a wishes backend.

## 10. Staged implementation — continue at S2

Execute **one stage per Codex request**. Stage boundaries may be moved only when needed for buildability; do not silently implement later functionality.

| Stage | Status | Goal and exit criteria |
| --- | --- | --- |
| **S1 — Routing and content** | **DONE locally (Codex reported); 10 uncommitted changes** | Three demo slugs, exact `displayName`, English templates, route 404, safe metadata, event config. Do not redo. |
| **S2 — Envelope + editorial UI** | TODO | Integrate client shell; opening envelope, cover, letter, event, discreet accounting accents, location, closing sections, photo placeholders, responsive + keyboard. Real actions may be placeholders only if clearly inactive and assigned to later stages. |
| **S3 — Music and motion** | TODO | Persistent single audio element, default Off, opening/scroll micro-animations, reduced motion, missing-audio handling. |
| **S4 — Wishes interaction** | TODO | Collapsed question, one textarea, form validation/counter/expand-collapse and pending/success/error states. Do not claim submissions work before S5. |
| **S5 — Formspree integration** | TODO | Connect existing form to configurable Formspree ID via client submission; include guest metadata; honest errors; test actual provider only when ID available. **No Supabase or Next.js wishes API.** |
| **S6 — Event actions + RSVP** | TODO | Valid ICS, Maps, `tel:` links, SMS draft + copy fallback; verify actual event time and phone. |
| **S7 — Quality and accessibility** | TODO | Type/lint/build, selected tests, six responsive widths, focus, reduced-motion, Vietnamese fonts, offline and submission failure flows. |
| **S8 — Vercel deployment** | TODO, explicit instruction only | Configure Formspree ID and assets, smoke-test demo/personal invitations, verify Formspree inbox/email, deploy only when asked. |

S2 should proceed from the **existing modified worktree** after verifying the uncommitted S1 state. Do not start a new project, redo Phase 1, or reset Git.

## 11. Acceptance checklist (V1.3)

### Routing / privacy
- [x] S1 reported: valid demo slug, correct guest data, default/custom English messages, invalid 404, no full guest list in browser bundle, lint/type/build passed.
- [ ] Reconfirm S1 still passes after later-stage changes; preserve current 404 and metadata protections.
- [ ] Production uses approved invitation links and does not expose a public guest directory; real guest list is handled appropriately for a public/private repository.

### Editorial experience
- [ ] Envelope opens on explicit click, appropriate focus management, graceful reduced-motion behavior.
- [ ] One-page English editorial invitation; Vietnamese name/honorific exceptions correct; no repeated filler copy.
- [ ] Visual tests at 360, 390, 430, 768, 1024, 1440px; no horizontal scroll.
- [ ] One main portrait placeholder (+ optional second), replaceable later without layout rewrite.
- [ ] Accounting/economics micro-accents are tasteful, responsive and lightweight.
- [ ] Audio Off by default, controllable, persistent, no autoplay on initial load, missing/blocked file handled.

### Wishes / Formspree
- [ ] Wishes section initially collapsed; no textarea opened merely on scroll.
- [ ] `Of course! ♡` reveals **one textarea**, no visible sender name/email/`FROM` field.
- [ ] Validation is 5–500 Unicode code points, accessible error text, counter and loading state.
- [ ] Message submitted to a configured Formspree form with `guest_slug`, `guest_display_name` metadata and `message`.
- [ ] Success appears **only after provider acknowledgement**; offline/missing configuration/provider rejection never show fake success; draft survives failures.
- [ ] A real test submission appears in Formspree dashboard and the configured recipient inbox as intended.
- [ ] No public wish wall, no Supabase dependency, no custom Next.js wishes API.
- [ ] Guest metadata is described as **not authenticated**; no promise of strict one-wish-per-guest enforcement.

### Event actions / release
- [ ] ICS is a valid calendar event for photo time 10:00–12:00 on 28 Nov 2026 (Vietnam), **not** official ceremony time.
- [ ] Map and contact buttons work; SMS RSVP has a reliable copy fallback and no false sent/recorded confirmation.
- [ ] Keyboard interaction, focus visibility, audio labels, reduced-motion, visual contrast and Vietnamese typography are acceptable.
- [ ] TypeScript, ESLint and production build pass. No unrequested Git commit/push/deploy.

## 12. Non-goals, external inputs and known limitations

**Do not build:** Supabase/database, custom wishes API, guest authentication, event admin interface, private messaging inbox, dashboard, public guestbook, outgoing email code, CMS, payments, analytics, guest tracking, user accounts, gallery, 3D/particle animation, heavy motion libraries, or unrelated enhancements.

**Still needed before complete production verification:**

1. **Formspree form ID** and configured, verified **recipient email** for Hạnh; verify current provider quota/retention/spam controls.
2. Real guest data/URLs with correct `displayName` (avoid putting sensitive real records into a public repository).
3. Authorized music MP3 for playback test (site must still function without it).
4. Genuine graduate photos for final visual polish (placeholders are sufficient for development).
5. Optional exact Google Maps place URL if the search query is not precise enough.

**Known limitations accepted for V1:** Formspree direct submission cannot prove the sender is the person named in the invite or guarantee only one submission per guest; an invitation can be forwarded, submitted fields can be edited, and a public form can receive spam or hit provider quotas. These are acceptable trade-offs for the approved **simple, no-custom-backend** scope. Do not solve them by building infrastructure without a new explicit decision.

## 13. V1.3 decision log / conflict resolution

- **V1.1 → V1.2:** English-only UI except Vietnamese names/honorifics/venue, explicit `displayName`, remove FROM/name field, collapse wish form until explicit click, keep envelope-first UX, editorial design, music, photo placeholders, restrained accounting motif and SMS RSVP.
- **S1 after V1.2:** Codex implemented and verified **10 changed files** locally (reported), did not commit or push; the old V1.2 file was used because `docs/plan_V1.3.md` was missing. **Preserve that implementation.**
- **V1.2 → V1.3 (approved):** **Replace Supabase + `POST /api/wishes` + migrations with Formspree direct client submission.** Hạnh reads messages via provider dashboard/recipient email. Client sends noneditable guest metadata with single visible textarea. No hard server-verified guest identity and no strict duplicate constraint. S5 is now **Formspree integration**, not backend/database development.
- This specification is the **new authoritative project document**. Earlier plans are historical references only; do not follow any older instructions to create a database or sender-name field.

## 14. Short reusable Codex prompts

**Continue with S2 (recommended next command):**

> Read §0, §1.2, §10 and the S2 sections of `docs/plan_V1.3.md` (v1.3) as the single source of truth. First inspect `git status` and the S1 files already changed; preserve the uncommitted S1 work. Implement **S2 only** according to §10. Do not re-audit the reference, set up a new project, integrate Formspree, or implement later stages. Run the relevant type/lint/build checks, summarize files changed and issues, then stop. **Do not commit, push, or deploy.**

**For a later stage:**

> Read §0, §1.2, §10 and the sections mapped to S[N] in `docs/plan_V1.3.md` (v1.3). Inspect the current implementation, then implement **S[N] only** as defined in §10. Preserve existing working code, follow the approved UX/language rules, run relevant checks, report concise changes and blockers, then stop. Do not commit/push/deploy.

**Documentation housekeeping:** Put this file at `docs/plan_V1.3.md`. If an older root-level `plan_V1.2.md` exists, mark it superseded or remove it **only with the user's approval** so Codex does not treat two files as competing sources. This housekeeping is separate from app implementation.
